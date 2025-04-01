<template>
    <div>
        <template v-if="isLoading">
            <BioSkeleton />
            <TableSkeleton />
        </template>
        <template v-else>
            <NodoBio v-if="nodeData" 
              :name="nodeData.name" 
              :profile_picture="nodeData.profile_picture"
              :about="nodeData.about" 
              :social_media="nodeData.social_media" 
              :joined_in="nodeData.joined_in"
              :leader="nodeData.leader"
              :country="nodeData.country"
              :city="nodeData.city"/>

            <NodoDetalle v-if="nodeData" :items="registrosFiltrados" :code="code" />
            <NotFound v-else />
        </template>
    </div>
</template>

<script setup lang="ts">
import NodoBio from "@/components/Public/Nodos/NodoBio.vue";
import NodoDetalle from "@/components/Public/Nodos/NodoDetalle.vue";
import BioSkeleton from "@/components/shared/skeletons/BioSkeleton.vue";
import TableSkeleton from "@/components/shared/skeletons/TableSkeleton.vue";
import NotFound from "@/components/shared/Error/NotFound.vue";

import { onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

import { useNodosStore } from '@stores/nodosStore';

import type { Node, NodeMembers } from "@interfaces/Nodes";

// Servicios y rutas
const route = useRoute();
const nodosStore = useNodosStore();

// Estados
const code = route.params.code as string;
const ID = ref<number | null>(null);
const nodeData = ref<Node | null>(null);
const registros = ref<NodeMembers[]>([]);
const isLoading = ref(true);
const searchTerm = ref('');

onMounted(async () => {
  isLoading.value = true;
  nodeData.value = await nodosStore.fetchNodoInfo(code);
  const id = nodeData.value.id;
  registros.value = await nodosStore.fetchNodoMembers(id) || [];
  isLoading.value = false;
});

// Computed para filtrar los registros relacionados con el nodo
const registrosFiltrados = computed(() => {
  return registros.value.filter(member =>
    !searchTerm.value || member.name.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});
</script>