<template>
    <div>
        <!-- Le paso a la tabla los registros -->
        <NodosTable @search="filtrar" :items="registrosFiltrados"/>
    </div>
</template>
<script setup lang="ts">
import NodosTable from "@/components/Public/Nodos/NodosTable.vue";
import { ref, computed, onMounted } from 'vue';
import type { Nodes } from '@/interfaces/Nodes';
import nodes from '@/utils/json/nodes.json';
import { NodosService } from "@/services/Class/public/NodoService";

const nodosService = new NodosService();

const registros = ref<Nodes[]>([]); // aqui rellenar los registros con los datos de nodos traidos
const searchTerm = ref('');

const getNodes = async () => {
    try {
        const response = await nodosService.getPublicNodes();        
        if (response) {
            registros.value = response; // Asignar datos solo si la respuesta es válida
        }
    } catch (error) {
        console.error("Error cargando nodos:", error);
    }
};
onMounted(getNodes);
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


function filtrar(term: string) {
    searchTerm.value = term;
}
</script>