<template>
    <div>
        <template v-if="isLoading">
            <BioSkeleton />
            <TableSkeleton />
        </template>
        <template v-else>
            <NodoBio v-if="nodeData" :name="nodeData.name" :profile_picture="nodeData.profile_picture"
                :about="nodeData.about" :social_media="nodeData.social_media" :joined_in="nodeData.joined_in" />
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

import { NodosService } from "@/services/Class/NodoService";
import type { Member } from "@interfaces/Members";
import type { Node } from "@interfaces/Nodes";

// Servicios y rutas
const route = useRoute();
const nodosService = new NodosService();

// Estados
const ID = ref<number | null>(null);
const code = route.params.code as string;
const nodeData = ref<Node | null>(null);
const isLoading = ref(true);

// Simulación de miembros (puede reemplazarse por llamada a API real si es necesario)
import members from "@/utils/json/members.json";
const registros = ref<Member[]>(members);
const searchTerm = ref('');

// Al montar el componente, cargar los datos del nodo
onMounted(async () => {
    const paramId = Number(code);
    if (isNaN(paramId)) {
        console.error("El ID en la URL no es válido:", code);
        return;
    }
    ID.value = paramId;
    try {
        const response = await nodosService.getNodeById(paramId);
        if (response) {
            console.log(response)
            nodeData.value = response;
        } else {
            console.error("El nodo no fue encontrado en la API.");
        }
    } catch (error) {
        console.error("Error al obtener datos del nodo:", error);
    } finally {
        isLoading.value = false;
    }
});

// Computed para filtrar los registros relacionados con el nodo
const registrosFiltrados = computed(() => {
    if (!nodeData.value) return [];
    return registros.value.filter(member =>
        member.node_id === ID.value &&
        (!searchTerm.value || member.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
    );
});
</script>