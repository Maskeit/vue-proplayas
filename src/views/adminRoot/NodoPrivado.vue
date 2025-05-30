<template>
    <div>
        <template v-if="isLoading">
            <BioSkeleton />
            <TableSkeleton />
        </template>
        <template v-else>
            <NodoBio :code="code" />
            <NodoDetalle 
                v-if="nodeData"
                :code="code" 
                :items="registrosFiltrados" 
                @toggle="toggleStatus"
                @unlinkUser="unlikMemberFromNode"
                @search="filtrar" />
        </template>
        <Confirmation v-if="showConfirmation" :message="confirmationMessage" :type="confirmationType" @close="showConfirmation = false" />
    </div>
</template>

<script setup lang="ts">
import NodoBio from "@/components/Public/Nodos/NodoBio.vue";
import NodoDetalle from "@/components/AdminNodo/nodo/NodoDetalle.vue";
// Loader and skeletons
import BioSkeleton from "@/components/shared/skeletons/BioSkeleton.vue";
import TableSkeleton from "@/components/shared/skeletons/TableSkeleton.vue";
import Confirmation from '@/components/shared/modales/Confirmation.vue';

import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import type { Member, Node,NodeMembers } from "@interfaces/Nodes";
import { useNodosStore } from '@stores/nodosStore';

// Servicios y rutas
const route = useRoute();
const nodosStore = useNodosStore();

// Estados
const code = route.params.code as string;
const nodeData = computed(() => nodosStore.nodo);
const registros = computed(() => nodosStore.nodoMiembros);
const isLoading = ref(true);
const registroSeleccionado = ref<Member | null>(null);

const searchTerm = ref('');
const mostrarModal = ref(false);
const showConfirmation = ref(false);
const confirmationMessage = ref('');
const confirmationType = ref<'success' | 'error' | 'warning'>('success');

// Al montar el componente, cargar los datos de la BioNodo
onMounted(async () => {
  isLoading.value = true;
  await nodosStore.fetchNodoMembers(code) || [];
  isLoading.value = false;
});

// Computed para filtrar los registros relacionados con el nodo
const registrosFiltrados = computed(() => {
  if (!searchTerm.value) return registros.value;
  return registros.value.filter(m =>
    m.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    m.member_code.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    m.research_line.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const filtrar = (term: string) => {
    searchTerm.value = term;
}

const toggleStatus = async (item: NodeMembers) => {
    try {
        const status = await nodosStore.toggleNodeMemberStatus(item.id);
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

const unlikMemberFromNode = async (item: NodeMembers) => {
    // Lógica para desvincular al usuario del nodo
    console.log(`Desvinculando al usuario ${item.name} del nodo:`, item.node_id);
}


</script>