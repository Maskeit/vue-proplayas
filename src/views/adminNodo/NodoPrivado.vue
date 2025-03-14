<template>
    <div class="p-4">
        <NodoDetalle :code="code" :items="registrosFiltrados" @editar="editarRegistro" @eliminar="confirmarEliminacion"
            @nuevo-registro="abrirFormulario" @search="filtrar" />
    </div>
</template>

<script setup lang="ts">
import NodoDetalle from "@/components/AdminRoot/nodo/NodoDetalle.vue";
import { useRoute, useRouter } from 'vue-router';
import members from "@/utils/json/members.json";
import type { Member } from "@interfaces/Members";
import { ref, computed } from 'vue';

const route = useRoute();
const router = useRouter();
const code = route.params.code as string;
const registros = ref<Member[]>(members);

const searchTerm = ref('');

const registroSeleccionado = ref<Member | null>(null);
const nodeId = computed(() => {
    const nodo = registros.value.find(member => member.member_code === code);
    return nodo ? nodo.node_id : null;
});

const registrosFiltrados = computed(() => {
    if (nodeId.value === null) return [];

    return registros.value
        .filter(member => member.node_id === nodeId.value) // Filtro por node_id
        .filter(member => {
            if (!searchTerm.value) return true;
            const term = searchTerm.value.toLowerCase();
            return (
                member.name.toLowerCase().includes(term) ||
                member.email.toLowerCase().includes(term) ||
                member.research_line.toLowerCase().includes(term) ||
                member.work_area.toLowerCase().includes(term)
            );
        });
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

const volverALista = () => {
    router.push('/root/nodos'); // Redirige a la lista de nodos
};
</script>