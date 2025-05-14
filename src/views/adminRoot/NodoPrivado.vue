<template>
    <div>
        <template v-if="isLoading">
            <BioSkeleton />
            <TableSkeleton />
        </template>
        <template v-else>
            <NodoBio 
                :name="nodeData?.name" 
                :profilePicture="nodeData?.profile_picture" 
                :about="nodeData?.about"
                :social_media="nodeData?.social_media" 
                :joined_in="nodeData?.joined_in"
                :leader="nodeData.leader"
                :country="nodeData?.country"
                :city="nodeData?.city"/>
            <NodoDetalle 
                v-if="nodeData"
                :code="code" 
                :items="registrosFiltrados" 
                @toggleStatus="toggleStatus"
                @unlinkUser="unlinkUserFromNode"
                @search="filtrar" />
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
import Confirmation from '@/components/shared/modales/Confirmation.vue';
import type { NodeMembers } from "@interfaces/Nodes";

import type { Node } from "@interfaces/Nodes";
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
  await nodosStore.fetchNodoInfo(code);
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
function abrirFormulario() {
    registroSeleccionado.value = null;
    mostrarModal.value = true;
}

const toggleStatus = (memberId: Member) => {
    // Lógica para activar/desactivar el registro
    nodosStore.toggleNodeMemberStatus(memberId);
}

const unlinkUserFromNode = (memberId: Member) => {
    // Lógica para desvincular al usuario del nodo
    nodosStore.unlinkMember(memberId);
}

function cerrarModal() {
    mostrarModal.value = false;
}


</script>