<template>
    <UsersTable 
        :items="registrosFiltrados" 
        @toggle="toggleStatus" 
        @deleteUser="deleteUser" 
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
const camposBusqueda = ['name', 'email','role' , 'node_id','node_code'];
const registrosFiltrados = computed(() => {
  if (!searchTerm.value) return registros.value;
  const term = searchTerm.value.toLowerCase();

  return registros.value.filter(m =>
    camposBusqueda.some(campo => {
      const valor = m[campo as keyof typeof m];
      return typeof valor === 'string' && valor.toLowerCase().includes(term);
    })
  );
});

const filtrar = (term: string) => {
    searchTerm.value = term;
}
const toggleStatus = (item: any) => {
    console.log('Toggle status for:', item);
}
const deleteUser = (node_code: string) => {
    console.log('Delete user with code:', node_code);
}
</script>