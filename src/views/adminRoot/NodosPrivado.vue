<template>
    <TalbeNodosSkeleton v-if="isLoading" />
    <!-- Otros componentes y elementos del CRUD -->
    <NodosTable v-else
        :items="registrosFiltrados" 
        @editar="editarRegistro" 
        @eliminar="confirmarEliminacion" 
        @nuevo-registro="abrirFormulario" 
        @search="filtrar" />

    <!-- Modal para crear/editar registros -->
    <CrudModal :visible="mostrarModal" @cerrar="cerrarModal">
        <CrudForm 
            :model="registroSeleccionado" 
            @guardar="guardarRegistro" 
            @cancelar="cerrarModal" />
    </CrudModal>
</template>
<script setup lang="ts">
import NodosTable from '@/components/AdminRoot/nodo/NodosTable.vue';
import TalbeNodosSkeleton from "@/components/shared/skeletons/TableNodosSkeleton.vue";
import CrudForm from '@/components/AdminRoot/Crud/CrudForm.vue';
import CrudModal from '@/components/AdminRoot/Crud/CrudModal.vue';
import { ref, computed, onMounted } from 'vue';
import type { Nodes } from '@/interfaces/Nodes';
import type { InviteNodeLeader } from '@interfaces/Invitations';
import { useNodosStore } from '@stores/nodosStore';
import InvitationService from "@/services/Class/admin/Invitation";
import { NodosService } from "@/services/Class/NodoService";

const invitationsService = new InvitationService();
const nodosStore = useNodosStore();
const registros = ref<Nodes[]>([]);
const searchTerm = ref('');
const isLoading = ref(true);

const registroSeleccionado = ref<Nodes | null>(null);
const mostrarModal = ref(false);

const getNodes = async () => {
    try {
        await nodosStore.fetchNodos();
        registros.value = nodosStore.nodos;
    } catch (error) {
        console.error("Error cargando nodos:", error);
    } finally {
        isLoading.value = false;
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

function abrirFormulario() {
    registroSeleccionado.value = null;
    mostrarModal.value = true;
}

function editarRegistro(registro: Nodes) {
  registroSeleccionado.value = {
    code: registro.code[0], // Asegura que solo sea la letra inicial
    node_type: registro.type,
    name: registro.name,
    email: '', // <- no lo tienes en el nodo, así que lo dejas vacío
  };
  mostrarModal.value = true;
}

function confirmarEliminacion(registro: Nodes) {
    // Lógica para confirmar y eliminar
    registros.value = registros.value.filter(r => r.id !== registro.id);
}

const guardarRegistro = async (nuevoRegistro: InviteNodeLeader) => {
    try {
        const response = await invitationsService.createInvitation(nuevoRegistro);
        console.log(response);
        alert("Invitación enviada correctamente");
        mostrarModal.value = false;
    } catch (error) {
        alert("Error al enviar la invitación. Revisa la consola.");
    }
};

function cerrarModal() {
    mostrarModal.value = false;
}

function filtrar(term: string) {
    searchTerm.value = term;
}
</script>