<template>
    <!-- panel de projects -->
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Proyecto v-for="project in parsedProjects" :key="project.id" v-bind="project" />
    </div>
</template>
<script setup lang="ts">
import Proyecto from '@/components/Public/Content/Cards/Proyecto.vue'
import projects from '@/utils/json/projects.json'
const parsedProjects = projects.map(p => ({
    ...p,
    date: new Date(p.date)
}));
</script>