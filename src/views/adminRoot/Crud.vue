<template>
    <div class="p-4">
        <!-- Otros componentes y elementos del CRUD -->
        <CrudHeader @nuevo-registro="abrirFormulario" @search="filtrar" />
        <CrudTable :items="registrosFiltrados" @editar="editarRegistro" @eliminar="confirmarEliminacion" />

        <!-- Modal para crear/editar registros -->
        <CrudModal :visible="mostrarModal" @cerrar="cerrarModal">
            <CrudForm :model="registroSeleccionado" @guardar="guardarRegistro" @cancelar="cerrarModal" />
        </CrudModal>
    </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import CrudHeader from '@/components/AdminRoot/Crud/CrudHeader.vue';
import CrudTable from '@/components/AdminRoot/Crud/CrudTable.vue';
import CrudForm from '@/components/AdminRoot/Crud/CrudForm.vue';
import CrudModal from '@/components/AdminRoot/Crud/CrudModal.vue';
import type { Nodes } from '@/interfaces/Nodes';
import nodes from '@/utils/json/nodes.json';

// Aquí usamos el archivo JSON para inicializar la variable 'registros'
// Asegúrate de que las propiedades en el JSON sean compatibles con la interface Nodes.
const registros = ref<Nodes[]>(nodes);

const searchTerm = ref('');
const mostrarModal = ref(false);
const registroSeleccionado = ref<Nodes | null>(null);

// Filtrado basado en la propiedad 'name' (asegúrate de que el JSON use el mismo nombre de propiedad)
const registrosFiltrados = computed(() => {
    if (!searchTerm.value) return registros.value;
    return registros.value.filter(r =>
        r.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.code.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.type.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.country.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.city.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        r.activity_level.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

function abrirFormulario() {
    registroSeleccionado.value = null;
    mostrarModal.value = true;
}

function editarRegistro(registro: Nodes) {
    registroSeleccionado.value = registro;
    mostrarModal.value = true;
}

function confirmarEliminacion(registro: Nodes) {
    // Lógica para confirmar y eliminar
    registros.value = registros.value.filter(r => r.id !== registro.id);
}

function guardarRegistro(nuevoRegistro: Nodes) {
    // Si el id es 0, se trata de una creación
    if (nuevoRegistro.id === 0) {
        nuevoRegistro.id = Date.now(); // Ejemplo para asignar un id único
        registros.value.push(nuevoRegistro);
    } else {
        // Actualización: busca y actualiza el registro
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