<template>
  <router-link
    :to="to"
    class="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-500 cursor-pointer transition-colors">
    <component :is="icon" class="w-5 h-5 dark:text-gray-100 text-gray-600" />
    <span class="dark:text-gray-100 text-gray-600">{{ showText ? text : null }}</span>
  </router-link>
</template>

<script setup lang="ts">
defineProps<{
  icon: any
  text: string
  showText: boolean
  to: string
}>()
</script>
