<template>
    <div>
        <template v-if="isLoading">
            <BioSkeleton />
            <TableSkeleton />
        </template>
        <template v-else>
            <NodoBio v-if="nodeData" :name="nodeData.name" :profile_picture="nodeData.profile_picture"
            :about="nodeData.about" :social_media="nodeData.social_media" :joined_in="nodeData.joined_in" />
            <NodoDetalle v-if="nodeData":code="code" :items="registrosFiltrados" @editar="editarRegistro" @eliminar="confirmarEliminacion"
            @nuevo-registro="abrirFormulario" @search="filtrar" />
            <NotFound v-else />
        </template>
    </div>
</template>

<script setup lang="ts">
import NodoBio from "@/components/Public/Nodos/NodoBio.vue";
import NodoDetalle from "@/components/AdminRoot/nodo/NodoDetalle.vue";
import BioSkeleton from "@/components/shared/skeletons/BioSkeleton.vue";
import TableSkeleton from "@/components/shared/skeletons/TableSkeleton.vue";
import NotFound from "@/components/shared/Error/NotFound.vue";

import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import { NodosService } from "@/services/Class/NodoService";
import type { Member } from "@interfaces/Members";
import type { Node } from "@interfaces/Nodes";


// Servicios y rutas
const route = useRoute();
const nodosService = new NodosService();

// Estados
const ID = ref<number | null>(null);
const code = route.params.code as string;
const nodeData = ref<Node | null>(null);
const isLoading = ref(true);

// Simulación de miembros (puede reemplazarse por llamada a API real si es necesario)
import members from "@/utils/json/members.json";
const registros = ref<Member[]>(members);
const searchTerm = ref('');


const registroSeleccionado = ref<Member | null>(null);
// Al montar el componente, cargar los datos de la BioNodo
onMounted(async () => {
    const paramId = Number(code);
    if (isNaN(paramId)) {
        console.error("El ID en la URL no es válido:", code);
        return;
    }
    ID.value = paramId;
    try {
        const response = await nodosService.getNodeById(paramId);
        if (response) {
            nodeData.value = response.data;
            console.log("Datos del nodo cargados:", response);
        } else {
            console.error("El nodo no fue encontrado en la API.");
        }
    } catch (error) {
        console.error("Error al obtener datos del nodo:", error);
    } finally {
        isLoading.value = false;
    }
});

// Computed para filtrar los registros relacionados con el nodo
const registrosFiltrados = computed(() => {
    if (!nodeData.value) return [];
    return registros.value.filter(member =>
        member.node_id === ID.value &&
        (!searchTerm.value || member.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
    );
});

function abrirFormulario() {
    registroSeleccionado.value = null;
    mostrarModal.value = true;
}

function editarRegistro(registro: Member) {
    registroSeleccionado.value = registro;
    mostrarModal.value = true;
}

function confirmarEliminacion(registro: Member) {
    // Lógica para confirmar y eliminar
    registros.value = registros.value.filter(r => r.id !== registro.id);
}

function guardarRegistro(nuevoRegistro: Member) {
    // Si el id es 0, se trata de una creación
    if (nuevoRegistro.id === 0) {
        nuevoRegistro.id = Date.now(); // Ejemplo para asignar un id único
        registros.value.push(nuevoRegistro);
    } else {
        // Actualización: busca y actualiza el registro
        const index = registros.value.findIndex(r => r.id === nuevoRegistro.id);
        if (index !== -1) {
            registros.value[index] = nuevoRegistro;
        }
    }
    mostrarModal.value = false;
}

function cerrarModal() {
    mostrarModal.value = false;
}

function filtrar(term: string) {
    searchTerm.value = term;
}

</script>