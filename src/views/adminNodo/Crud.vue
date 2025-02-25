<template>
    <div class="p-4">
        <CrudHeader @nuevo-registro="abrirFormulario" @search="filtrar" />
        <CrudTable :items="registrosFiltrados" @editar="editarRegistro" @eliminar="confirmarEliminacion" />
        <CrudModal :visible="mostrarModal" @cerrar="cerrarModal">
            <CrudForm :model="registroSeleccionado" @guardar="guardarRegistro" @cancelar="cerrarModal" />
        </CrudModal>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import CrudHeader from '@/components/AdminNodo/Crud/CrudHeader.vue';
import CrudTable from '@/components/AdminNodo/Crud/CrudTable.vue';
import CrudForm from '@/components/AdminNodo/Crud/CrudForm.vue';
import CrudModal from '@/components/AdminNodo/Crud/CrudModal.vue';
import type { Members } from '@/interfaces/Members';
import members from '@/utils/json/members.json';

// Accedemos a la ruta para obtener el node_id dinámico
const route = useRoute();
const registros = ref<Members[]>([]); // Inicializa vacío para que reaccione al cambio de ruta
const searchTerm = ref('');
const mostrarModal = ref(false);
const registroSeleccionado = ref<Members | null>(null);

// Computed property para filtrar registros según la ruta (node_id)
const registrosFiltrados = computed(() => {
    if (!searchTerm.value) return registros.value;
    return registros.value.filter(r =>
        r.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.research_line.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.work_area.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});
// Filtra los miembros cuando cambia la ruta
watch(() => route.params.node_id, (nodeId) => {
    const id = parseInt(nodeId as string, 10);
    registros.value = members.filter(member => member.node_id === id);
}, { immediate: true });

function abrirFormulario() {
    registroSeleccionado.value = null;
    mostrarModal.value = true;
}

function editarRegistro(registro: Members) {
    registroSeleccionado.value = registro;
    mostrarModal.value = true;
}

function confirmarEliminacion(registro: Members) {
    registros.value = registros.value.filter(r => r.id !== registro.id);
}

function guardarRegistro(nuevoRegistro: Members) {
    if (nuevoRegistro.id === 0) {
        nuevoRegistro.id = Date.now();
        registros.value.push(nuevoRegistro);
    } else {
        const index = registros.value.findIndex(r => r.id === nuevoRegistro.id);
        if (index !== -1) {
            registros.value[index] = nuevoRegistro;
        }
    }
    mostrarModal.value = false;
}

function cerrarModal() {
    mostrarModal.value = false;
}

function filtrar(term: string) {
    searchTerm.value = term;
}
</script>