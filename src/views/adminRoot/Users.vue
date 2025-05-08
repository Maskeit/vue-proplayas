<template>
    <UsersTable 
        :items="registrosFiltrados" 
        @toggle="toggleStatus" 
        @deleteUser="deleteNode" 
        @search="filtrar"
        />
</template>

<script setup lang="ts">
import UsersTable from "@/components/AdminRoot/Users/UsersTable.vue";
import { useUserStore } from "@stores/usersStore";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";


// estados
const userStore = useUserStore();
const registros = computed(() => userStore.users);
const isLoading = ref(true);
const searchTerm = ref('');

onMounted(async() => {
    isLoading.value = true;
    await userStore.fetchUsers();
    isLoading.value = false;
});

// Computed para filtrar los registros relacionados con el nodo
const camposBusqueda = ['name', 'username', 'email', 'member_code', 'research_line'];

const registrosFiltrados = computed(() => {
  if (!searchTerm.value) return registros.value;
  const term = searchTerm.value.toLowerCase();

  return registros.value.filter(m =>
    camposBusqueda.some(campo =>
      (m[campo as keyof typeof m] || '').toLowerCase().includes(term)
    )
  );
});

const filtrar = (term: string) => {
    searchTerm.value = term;
}
</script>