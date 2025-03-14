<template>
    <div>
        <NodoDetalle @search="filtrar" :items="registrosFiltrados" :code="code" />
    </div>
</template>

<script setup lang="ts">
import NodoDetalle from "@/components/Public/Nodos/NodoDetalle.vue";
import { useRoute, useRouter } from 'vue-router';
import members from "@/utils/json/members.json";
import type { Member } from "@interfaces/Members";
import { ref, computed } from 'vue';

const route = useRoute();
const router = useRouter();
const code = route.params.code as string;
const registros = ref<Member[]>(members);

const searchTerm = ref<('')>;

const registroSeleccionado = ref<Member | null>(null);
const nodeId = computed(() => {
    const nodo = registros.value.find(member => member.member_code === code);
    return nodo ? nodo.node_id : null;
});

const registrosFiltrados = computed(() => {

    if (nodeId.value === null) return [];

    return registros.value
        .filter(member => member.node_id === nodeId.value) // Filtro por node_id
        .filter(member => {
            if (!searchTerm.value) return true;
            const term = searchTerm.value.toLowerCase();
            return (
                member.name.toLowerCase().includes(term) ||
                member.email.toLowerCase().includes(term) ||
                member.research_line.toLowerCase().includes(term) ||
                member.work_area.toLowerCase().includes(term)
            );
        });
});


function filtrar(term: string) {
    searchTerm.value = term;
}
const volverALista = () => {
    router.push('/root/nodos'); // Redirige a la lista de nodos
};
</script>