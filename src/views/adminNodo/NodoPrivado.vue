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
                @update="updateNodeBio"
                @uploadImg="uploadImg"
                />
            <NodoDetalle 
                :code="code"
                :items="registrosFiltrados"
                @toggle="toggleStatus"
                @deleteMember="confirmarEliminacion"
                @nuevo-registro="guardarRegistro"
                @search="filtrar" />
        </template>
        <Confirmation v-if="showConfirmation" :message="confirmationMessage" :type="confirmationType" @close="showConfirmation = false" />
    </div>
</template>
<script setup lang="ts">
import NodoBio from "@/components/AdminNodo/nodo/NodoBio.vue";
import BioSkeleton from "@/components/shared/skeletons/BioSkeleton.vue"
import NodoDetalle from "@/components/AdminNodo/nodo/NodoDetalle.vue";
import { useRoute } from 'vue-router';
import Confirmation from '@/components/shared/modales/Confirmation.vue';
import type { NodeMembers } from "@interfaces/Nodes";
import type { InviteNodeMember } from '@interfaces/Invitations';
import { useNodosStore } from '@stores/nodosStore';
import InvitationsService from "@/services/Class/InvitationService";

import { ref, computed, onMounted } from 'vue';

// servicios y rutas
const route = useRoute();
const nodosStore = useNodosStore();
const invitationsService = new InvitationsService();

// estados
const code = route.params.code as string;
const nodeData = computed(() => nodosStore.nodo);
const registros = computed(() => nodosStore.nodoMiembros);
const isLoading = ref(true);
const registroSeleccionado = ref<NodeMembers | null>(null);

const searchTerm = ref('');
const mostrarModal = ref(false);
const showConfirmation = ref(false);
const confirmationMessage = ref('');
const confirmationType = ref<'success' | 'error' | 'warning'>('success');

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
            confirmationMessage.value = 'Cambios confirmados y guardados';
            confirmationType.value = 'success';
            showConfirmation.value = true;
        }
    } catch (error) {
        console.error("Error al actualizar datos del nodo:", error);
    }finally {
        isLoading.value = false;
    }
}

const uploadImg = async (imageFile: File | string) => {
    try {
        isLoading.value = true;
        if (typeof imageFile !== 'string') {
            const formData = new FormData();
            formData.append("image", imageFile);
            const { status, data } = await nodosStore.uploadNodeImage(formData);
            if (status === 200 && data?.profile_picture) {
                nodeData.value.profile_picture = data.profile_picture;
                confirmationMessage.value = 'Imagen actualizada correctamente';
                confirmationType.value = 'success';
                showConfirmation.value = true;
            }
        } else {
            nodeData.value.profile_picture = imageFile;
        }
    } catch (error) {
        console.error("Error al actualizar la imagen del nodo:", error);
    } finally {
        isLoading.value = false;
    }
};

const guardarRegistro = async (nuevoRegistro: InviteNodeMember) => {
    try {
        const { status, message, data } = await invitationsService.createInvitationToNodeMember(nuevoRegistro);
        if (status && status === 201) {
            confirmationMessage.value = 'Invitación enviada correctamente';
            confirmationType.value = 'success';
            showConfirmation.value = true;
            mostrarModal.value = false;
        } else {
            confirmationMessage.value = 'Error al enviar la invitación';
            confirmationType.value = 'error';
            showConfirmation.value = true;
        }
    } catch (error) {
        console.error("Error al enviar la invitación:", error);
    }
}

const toggleStatus = async (item: NodeMembers) => {
    try {
        const status = await nodosStore.toggleNodeMemberStatus(item);
        if (status === 200) {
            confirmationMessage.value = 'Estado actualizado correctamente';
            confirmationType.value = 'success';
            showConfirmation.value = true;
        }else {
            confirmationMessage.value = 'Error al cambiar el estado';
            confirmationType.value = 'error';
            showConfirmation.value = true;
        }
    } catch (error) {
        console.error("Error al actualizar el estado del miembro:", error);
    }
}

const filtrar = (term: string) => {
    searchTerm.value = term;
}
</script>