<template>
    <div>
        <NodoBio 
            :name="nodeData.name" 
            :profilePicture="nodeData.profile_picture" 
            :about="nodeData.about"
            :social_media="nodeData.social_media" 
            :joined_in="nodeData.joined_in"
            :country="nodeData.country"
            :city="nodeData.city"
            @updateNodeData="handleUpdateNode"/>
        <NodoDetalle 
            :code="code" 
            :items="registrosFiltrados" 
            @editar="editarRegistro" 
            @eliminar="confirmarEliminacion"
            @nuevo-registro="abrirFormulario" 
            @search="filtrar" />
        <!-- Modal para crear/editar registros -->
        <CrudModal :visible="mostrarModal" @cerrar="cerrarModal">
            <CrudForm 
                :model="registroSeleccionado" 
                @guardar="guardarRegistro" 
                @cancelar="cerrarModal" />
        </CrudModal>
    </div>
</template>

<script setup lang="ts">
import NodoBio from "@/components/AdminNodo/nodo/NodoBio.vue";
import NodoDetalle from "@/components/AdminNodo/nodo/NodoDetalle.vue";
import CrudForm from '@/components/AdminNodo/Crud/CrudForm.vue';
import CrudModal from '@/components/AdminNodo/Crud/CrudModal.vue';
import { useRoute, useRouter } from 'vue-router';
import members from "@/utils/json/members.json";

import type { Member } from "@interfaces/Members";
import type { Node } from "@interfaces/Nodes";
import type { InviteNodeMember } from '@interfaces/Invitations';
import { ref, computed, watchEffect } from 'vue';
import { NodosService } from "@/services/Class/nodo/NodoService";
import InvitationsService from "@/services/Class/nodo/Invitations";


const route = useRoute();
const router = useRouter();
const nodosService = new NodosService();
const invitationsService = new InvitationsService()
const code = route.params.code as string;
const registros = ref<Member[]>(members);
const searchTerm = ref('');
const nodeData = ref<Node>("");


const registroSeleccionado = ref<Member | null>(null);

const mostrarModal = ref(false);

const ID = ref<number | null>(null); // Definir ID como reactivo y número


watchEffect(() => {
    const paramId = route.params.code;
    if (paramId && !isNaN(Number(paramId))) {
        ID.value = Number(paramId);
    } else {
        console.error("El ID en la URL no es válido:", paramId);
    }
});

// Hacer la petición cuando `ID` tenga un valor válido
watchEffect(async () => {
    if (ID.value !== null) {
        try {
            const response = await nodosService.getPrivateNodeById(ID.value);
            if (response) {
                nodeData.value = response; // Asegurar que asignamos los datos correctamente
            } else {
                console.error("El nodo no fue encontrado en la API.");
            }
        } catch (error) {
            console.error("Error al obtener datos del nodo:", error);
        }
    }
});

const registrosFiltrados = computed(() => {
    if (nodeData.value === null) return [];
    return registros.value.filter(member =>
        member.node_id === ID.value &&
        (!searchTerm.value || member.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
    );
});

// Función para manejar la actualización desde el hijo
const handleUpdateNode = async (updatedData: { name: string; about: string; profile_picture: string; social_media?: SocialLink[] }) => {
    if (!ID.value) return;
    console.log(ID.value);
    try {
        await nodosService.editNodeBio(ID.value, {
            ...updatedData,
            social_media: typeof updatedData.social_media === "string" ? updatedData.social_media : JSON.stringify(updatedData.social_media),
        });
        // Actualizar localmente los datos para evitar otra petición innecesaria
        if (nodeData.value) {
            nodeData.value = { ...nodeData.value, ...updatedData };
        }
    } catch (error) {
        console.error("Error al actualizar el nodo:", error);
    }
};

const guardarRegistro = async (nuevoRegistro: InviteNodeMember) => {
    console.log(nuevoRegistro);
    try {
        const response = await invitationsService.createInvitation(nuevoRegistro);
        alert("Invitación enviada correctamente");
        mostrarModal.value = false;
    } catch (error) {
        alert("Error al enviar la invitación. Revisa la consola.");
    }
};


function abrirFormulario() {
    registroSeleccionado.value = null;
    mostrarModal.value = true;
}

function editarRegistro(registro: Nodes) {
    registroSeleccionado.value = registro;
    mostrarModal.value = true;
}

function cerrarModal() {
    mostrarModal.value = false;
}

function filtrar(term: string) {
    searchTerm.value = term;
}

</script>