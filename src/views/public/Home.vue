<template>
    <div>
        <Hero />
        <AnimatedSection>
            <About />
        </AnimatedSection>
        <AnimatedSection>
            <Estructura />
        </AnimatedSection>
    </div>
</template>

<script setup lang="ts">
import Hero from '@/components/Public/Home/Hero.vue';
import Mision from '@/components/Public/Home/Mision.vue';
import About from '@/components/Public/Home/About.vue';
import Estructura from '@/components/Public/Home/Estructura.vue';
import AnimatedSection from '@/components/shared/animations/AnimatedSection.vue';
</script>