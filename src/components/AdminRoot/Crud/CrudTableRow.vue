<template>
    <tr>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.id }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.code }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.type }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.country }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.city }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.name }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.members_count }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.email }}</td>
        <td class="px-6 py-4 whitespace-nowrap">{{ item.activity_level }}</td>
        <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-blue-600 hover:text-blue-800 mr-2" @click="$emit('editar', item)">Editar</button>
            <button class="text-red-600 hover:text-red-800" @click="$emit('eliminar', item)">Eliminar</button>
        </td>
    </tr>
</template>

<script setup lang="ts">
import type { Nodes } from '@/interfaces/Nodes';

const props = defineProps<{
    item: Nodes;
}>();

const emits = defineEmits<{
    (e: 'editar', item: Nodes): void;
    (e: 'eliminar', item: Nodes): void;
}>();
</script>