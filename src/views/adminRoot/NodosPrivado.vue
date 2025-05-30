<template>
    <div>
        <TalbeNodosSkeleton v-if="isLoading" />
        <template v-else>
            <!-- Otros componentes y elementos del CRUD -->
            <NodosTable 
                :items="registrosFiltrados"         
                @deleteNode="confirmarEliminacion"
                @guardar="guardarRegistro" 
                @search="filtrar" />
        </template>
        <Confirmation v-if="showConfirmation" :message="confirmationMessage" :type="confirmationType"
            @close="showConfirmation = false" />
    </div>
</template>
<script setup lang="ts">
import NodosTable from '@/components/AdminRoot/nodo/NodosTable.vue';
import TalbeNodosSkeleton from "@/components/shared/skeletons/TableNodosSkeleton.vue";
import Confirmation from '@/components/shared/modales/Confirmation.vue';
import type { Nodes } from '@/interfaces/Nodes';
import type { InviteNodeLeader } from '@interfaces/Invitations';
import { useNodosStore } from '@stores/nodosStore';
import InvitationsService from "@/services/Class/InvitationService";
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// servicios y rutas
const route = useRoute();
const nodosStore = useNodosStore();
const invitationsService = new InvitationsService();

// Estados
const registros = computed(() => nodosStore.nodos);
const isLoading = ref(true);
const searchTerm = ref('');

const mostrarModal = ref(false);
const showConfirmation = ref(false);
const confirmationMessage = ref('');
const confirmationType = ref<'success' | 'error' | 'warning'>('success');

onMounted(async () => {
    isLoading.value = true;
    await nodosStore.fetchNodos();
    isLoading.value = false;
});


// Filtrado basado en la propiedad 'name' (asegúrate de que el JSON use el mismo nombre de propiedad)
const registrosFiltrados = computed(() => {
    if (!searchTerm.value) return registros.value;
    return registros.value.filter(r =>
        r.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.code.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.country.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.city.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});


const guardarRegistro = async (nuevoRegistro: InviteNodeLeader) => {
    try {
        const { status, message, data } = await invitationsService.createInvitationToNodeLeader(nuevoRegistro);
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

const confirmarEliminacion = async (item: Nodes) => {
    
    if(!confirm(`¿Estás seguro de que deseas eliminar el nodo ${item.name}?`)) return;
    try {
        const status = await nodosStore.deleteNode(item.id);
        if (status && status === 200) {
            confirmationMessage.value = 'Nodo eliminado correctamente';
            confirmationType.value = 'success';
        } else {
            confirmationMessage.value = 'Error al eliminar el nodo';
            confirmationType.value = 'error';
        }
    } catch (error) {
        console.error("Error al eliminar el nodo:", error);
        confirmationMessage.value = 'Error al eliminar el nodo';
        confirmationType.value = 'error';
    } finally {
        showConfirmation.value = true;
    }
}
const filtrar = (term: string) => {
    searchTerm.value = term;
}
</script>