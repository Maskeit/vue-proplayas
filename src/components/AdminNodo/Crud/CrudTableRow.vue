<template>
    <tr>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.id }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.node_id }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.research_line }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.work_area }}</td>
        <!-- <td class="px-6 py-4 whitespace-nowrap">{{ item.activo }}</td> sugerencia -->
        <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-blue-600 hover:text-blue-800 mr-2" @click="$emit('editar', item)">Editar</button>
            <button class="text-red-600 hover:text-red-800" @click="$emit('eliminar', item)">Eliminar</button>
        </td>
    </tr>
</template>

<script setup lang="ts">
import type { Members } from '@/interfaces/Members';

const props = defineProps<{
    item: Members;
}>();

const emits = defineEmits<{
    (e: 'editar', item: Members): void;
    (e: 'eliminar', item: Members): void;
}>();
</script>