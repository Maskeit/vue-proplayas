<template>
    <!-- panel de Events -->
    <div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Event v-for="event in events" :key="event.id" v-bind="event" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import Event from '@/components/Public/Content/Cards/Event.vue'
import { useContentStore } from '@/services/Stores/ContentStore';

// estados
const contentStore = useContentStore();
const events = computed(() => contentStore.events);
const isLoading = ref(true);
onMounted(async () => {
  isLoading.value = true;
  await contentStore.fetchEvents();
  isLoading.value = false;
});

</script>