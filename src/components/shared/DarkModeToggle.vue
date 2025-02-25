<script setup lang="ts">
import { useDarkMode } from "@/composables/useDarkMode";
import { SunIcon, MoonIcon } from "@heroicons/vue/24/outline";
const { isDark, toggleDarkMode } = useDarkMode();
</script>

<template>
    <button @click="toggleDarkMode"        
        aria-label="Toggle Dark Mode">
        <span v-if="isDark">
            <MoonIcon class="w-6 h-6 text-gray-600 dark:text-gray-100"/>
        </span>
        <span v-else>
            <SunIcon class="w-6 h-6 text-gray-600"/>
        </span>
    </button>
</template>

<style scoped>
    button{
        padding: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
        border-radius: 100%;
    }
    button:hover{
        background-color: rgb(180, 180, 180);
    }
</style>