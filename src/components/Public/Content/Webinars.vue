<template>
    <!-- panel de webinars -->
    <div class="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Webinar v-for="webinar in parsedWebinars" :key="webinar.id" v-bind="webinar" />
    </div>
</template>

<script setup lang="ts">
import Webinar from '@/components/Public/Content/Cards/Webinar.vue'
import webinars from '@/utils/json/webinars.json'
const parsedWebinars = webinars.map(w => ({
    ...w,
    date: new Date(w.date)
}));
</script>