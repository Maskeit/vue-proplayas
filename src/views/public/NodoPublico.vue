<template>
    <div>
        <NodoBio 
            v-if="nodeData" 
            :name="nodeData.name" 
            :profile_picture="nodeData.profile_picture" 
            :about="nodeData.about" 
            :social_media="nodeData.social_media" 
            :joined_in="nodeData.joined_in" 
        />
        <NodoDetalle v-if="nodeData" :items="registrosFiltrados" :code="code" />
        <p v-else>Cargando nodo...</p>
    </div>
</template>

<script setup lang="ts">
import NodoBio from "@/components/Public/Nodos/NodoBio.vue";
import NodoDetalle from "@/components/Public/Nodos/NodoDetalle.vue";
import { useRoute } from 'vue-router';
import { ref, computed, watchEffect } from 'vue';
import { NodosService } from "@/services/Class/public/NodoService";
import members from "@/utils/json/members.json";
import type { Member } from "@interfaces/Members";
import type { Node } from "@interfaces/Nodes";

const route = useRoute();
const nodosService = new NodosService();
const registros = ref<Member[]>(members);
const nodeData = ref<Node | null>(null);
const searchTerm = ref('');

const ID = ref<number | null>(null); // Definir ID como reactivo y número

// Extraer el ID de la URL y asegurarnos de que es un número válido
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
            console.log(`Obteniendo nodo con ID: ${ID.value}`);
            const response = await nodosService.getNodeById(ID.value);
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

// Filtrar miembros pertenecientes al nodo
const registrosFiltrados = computed(() => {
    if (nodeData.value === null) return [];
    return registros.value.filter(member =>
        member.node_id === ID.value &&
        (!searchTerm.value || member.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
    );
});
</script>