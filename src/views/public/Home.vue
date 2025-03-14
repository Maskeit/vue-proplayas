<template>
    <div>
        <Hero />
        <AnimatedSection>
            <About />
        </AnimatedSection>
        <AnimatedSection>
            <Estructura />
        </AnimatedSection>
        <AnimatedSection>
            <BentoGrid/>
        </AnimatedSection>
        <AnimatedSection>
            <SocialMedia />
        </AnimatedSection>
    </div>
</template>

<script setup lang="ts">
import Hero from '@/components/Public/Home/Hero.vue';
import Mision from '@/components/Public/Home/Mision.vue';
import About from '@/components/Public/Home/About.vue';
import Estructura from '@/components/Public/Home/Estructura.vue';
import BentoGrid from '@/components/Public/Home/BentoGrid.vue';
import SocialMedia from '@/components/Public/Home/SocialMedia.vue';
import AnimatedSection from '@/components/shared/animations/AnimatedSection.vue';
</script>