<template>
    <TalbeNodosSkeleton v-if="isLoading" />
    <div v-else-if="registros.length === 0" class="text-gray-400 flex justify-center align-center mt-10">No se encontraron nodos...</div>
    <NodosTable v-else @search="filtrar" :items="registrosFiltrados" />
</template>

<script setup lang="ts">
import NodosTable from "@/components/Public/Nodos/NodosTable.vue";
import TalbeNodosSkeleton from "@/components/shared/skeletons/TableNodosSkeleton.vue";
import { ref, computed, onMounted } from 'vue';
import type { Nodes } from '@interfaces/Nodes';
import { useNodosStore } from '@stores/nodosStore';

// servicios y rutas
const nodosStore = useNodosStore();

// Estados
const registros = computed(() => nodosStore.nodos);
const isLoading = ref(true);
const searchTerm = ref('');

onMounted(async () => {
    isLoading.value = true;
    await nodosStore.fetchNodos();
    isLoading.value = false;
});

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

function filtrar(term: string) {
    searchTerm.value = term;
}
</script>
