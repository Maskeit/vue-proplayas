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
                :leader="nodeData.leader"
                :country="nodeData?.country"
                :city="nodeData?.city"
                @update="updateNodeBio"/>
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
        <Confirmation v-if="showConfirmation" @close="showConfirmation = false" />        
    </div>
</template>

<script setup lang="ts">
import NodoBio from "@/components/AdminNodo/nodo/NodoBio.vue";
import BioSkeleton from "@/components/shared/skeletons/BioSkeleton.vue"
import NodoDetalle from "@/components/AdminNodo/nodo/NodoDetalle.vue";
import CrudForm from '@/components/AdminNodo/Crud/CrudForm.vue';
import CrudModal from '@/components/AdminNodo/Crud/CrudModal.vue';
import { useRoute } from 'vue-router';
import Confirmation from '@/components/shared/modales/Confirmation.vue';
import type { NodeMembers } from "@interfaces/Nodes";
import type { SocialLink } from "@interfaces/Profile";
import type { InviteNodeMember } from '@interfaces/Invitations';

import { useNodosStore } from '@stores/nodosStore';
import InvitationsService from "@/services/Class/InvitationService";

import { ref, computed, onMounted } from 'vue';

const nodosStore = useNodosStore();

const invitationsService = new InvitationsService();

const route = useRoute();
const code = route.params.code as string;
const nodeData = computed(() => nodosStore.nodo);
const registros = computed(() => nodosStore.nodoMiembros);

const registroSeleccionado = ref<NodeMembers | null>(null);
const isLoading = ref(true);

const searchTerm = ref('');
const mostrarModal = ref(false);
const showConfirmation = ref(false);

const ID = ref<number | null>(null);
onMounted(async () => {
  isLoading.value = true;
  await nodosStore.fetchNodoInfo(code);
  ID.value = nodeData.value?.id || null; // se utiliza para tenerlo en context
  await nodosStore.fetchNodoMembers(code) || [];
  isLoading.value = false;
});
const registrosFiltrados = computed(() => {
  return registros.value.filter(member =>
    !searchTerm.value || member.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// metodo para editar el nodo descripción
const updateNodeBio = async (updatedData: any) =>  {
    try {
        isLoading.value = true;
        const status = await nodosStore.updateNodeBio(ID.value, updatedData);
        if (status === 200) {
            showConfirmation.value = true;
        }
    } catch (error) {
        console.error("Error al actualizar datos del nodo:", error);
    }finally {
        isLoading.value = false;
    }
}


async function guardarRegistro(nuevoRegistro: InviteNodeMember) {
    try {
        await invitationsService.createInvitationToNodeMember(nuevoRegistro);
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
function cerrarModal() {
    mostrarModal.value = false;
}
function filtrar(term: string) {
    searchTerm.value = term;
}
</script>