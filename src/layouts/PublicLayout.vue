<template>
    <div class="flex flex-col min-h-screen">
        <header>
            <Navbar />
        </header>
        <main class="flex-1 pt-22 pb-10">
            <router-view />
        </main>
        <Footer />
    </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Public/Navbar.vue';
import Footer from '@/components/Public/Footer.vue';
</script>