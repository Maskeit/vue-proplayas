<script setup lang="ts">
import { useDarkMode } from "@/composables/useDarkMode";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";

const { isDark, toggleDarkMode } = useDarkMode();
</script>

<template>
    <button @click="toggleDarkMode" aria-label="Toggle Dark Mode">
        <span v-if="isDark">
            <MoonIcon class="w-6 h-6 text-gray-600 dark:text-gray-100"/>
        </span>
        <span v-else>
            <SunIcon class="w-6 h-6 text-gray-600"/>
        </span>
    </button>
</template>