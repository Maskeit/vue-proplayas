<template>
    <div>
        <BioSkeleton v-if="isLoading" />
        <template v-else>
            <NodoBio 
                :name="nodeData?.name" 
                :profilePicture="nodeData?.profile_picture" 
                :about="nodeData?.about"
                :social_media="nodeData?.social_media" 
                :joined_in="nodeData?.joined_in"
                :country="nodeData?.country"
                :city="nodeData?.city"
                @updateNodeData="handleUpdateNode"/>
            <NodoDetalle 
                :code="code"
                :items="registrosFiltrados"
                @editar="editarRegistro"
                @eliminar="confirmarEliminacion"
                @nuevo-registro="abrirFormulario"
                @search="filtrar" />
            <CrudModal :visible="mostrarModal" @cerrar="cerrarModal">
                <CrudForm 
                    :model="registroSeleccionado" 
                    @guardar="guardarRegistro" 
                    @cancelar="cerrarModal" />                    
            </CrudModal>
        </template>
    </div>
</template>

<script setup lang="ts">
import NodoBio from "@/components/AdminNodo/nodo/NodoBio.vue";
import BioSkeleton from "@/components/shared/skeletons/BioSkeleton.vue"
import NodoDetalle from "@/components/AdminNodo/nodo/NodoDetalle.vue";
import CrudForm from '@/components/AdminNodo/Crud/CrudForm.vue';
import CrudModal from '@/components/AdminNodo/Crud/CrudModal.vue';
import { useRoute } from 'vue-router';

import type { Member } from "@interfaces/Members";
import type { Node, NodeMembers } from "@interfaces/Nodes";
import type { InviteNodeMember } from '@interfaces/Invitations';
import type { SocialLink } from "@interfaces/Profile";

import { useNodosStore } from '@stores/nodosStore';
import InvitationsService from "@/services/Class/nodo/Invitations";

import { ref, computed, onMounted } from 'vue';

const nodosStore = useNodosStore();
const invitationsService = new InvitationsService();

const route = useRoute();
const code = route.params.code as string;
const ID = ref<number | null>(null);
const nodeData = ref<Node | null>(null);
const registros = ref<NodeMembers[]>([]);
const registroSeleccionado = ref<NodeMembers | null>(null);
const isLoading = ref(true);

const searchTerm = ref('');
const mostrarModal = ref(false);

onMounted(async () => {
  isLoading.value = true;
  nodeData.value = await nodosStore.fetchNodoInfo(Number(code));
  registros.value = await nodosStore.fetchNodoMembers(Number(code)) || [];
  isLoading.value = false;
});

const registrosFiltrados = computed(() => {
  return registros.value.filter(member =>
    !searchTerm.value || member.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

function handleUpdateNode(updatedData: { name: string; about: string; profile_picture: string; social_media?: SocialLink[] }) {
    if (!ID.value) return;

    nodosService.editNodeBio(ID.value, {
        ...updatedData,
        social_media: typeof updatedData.social_media === "string"
            ? updatedData.social_media
            : JSON.stringify(updatedData.social_media),
    }).then(() => {
        if (nodeData.value) {
            nodeData.value = { ...nodeData.value, ...updatedData };
        }
    }).catch(error => {
        console.error("Error al actualizar el nodo:", error);
    });
}
async function guardarRegistro(nuevoRegistro: InviteNodeMember) {
    try {
        await invitationsService.createInvitation(nuevoRegistro);
        alert("Invitación enviada correctamente");
        mostrarModal.value = false;
    } catch (error) {
        alert("Error al enviar la invitación. Revisa la consola.");
    }
}
function abrirFormulario() {
    registroSeleccionado.value = null;
    mostrarModal.value = true;
}
function editarRegistro(registro: Member) {
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