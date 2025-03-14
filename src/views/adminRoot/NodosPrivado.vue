<template>
    <div>
        <!-- Otros componentes y elementos del CRUD -->
        <NodosTable :items="registrosFiltrados" @editar="editarRegistro" @eliminar="confirmarEliminacion" @nuevo-registro="abrirFormulario" @search="filtrar" />

        <!-- Modal para crear/editar registros -->
        <CrudModal :visible="mostrarModal" @cerrar="cerrarModal">
            <CrudForm :model="registroSeleccionado" @guardar="guardarRegistro" @cancelar="cerrarModal" />
        </CrudModal>
    </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import NodosTable from '@/components/AdminRoot/nodo/NodosTable.vue';
import CrudForm from '@/components/AdminRoot/Crud/CrudForm.vue';
import CrudModal from '@/components/AdminRoot/Crud/CrudModal.vue';
import type { Nodes } from '@/interfaces/Nodes';
import type { InviteNodeLeader } from '@interfaces/Invitations';
import InvitationService from "@/services/Class/admin/Invitation.ts";
import { NodosService } from "@/services/Class/public/NodoService";

const invitationsService = new InvitationService();
const nodosService = new NodosService();

const registros = ref<Nodes[]>();
const searchTerm = ref('');
const registroSeleccionado = ref<Nodes | null>(null);
const mostrarModal = ref(false);
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