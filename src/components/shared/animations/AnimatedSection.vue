<template>
    <section ref="sectionRef"
        :class="['opacity-0 translate-y-10 will-change-opacity', isVisible ? 'animate-fade' : '']">
        <slot />
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const sectionRef = ref<HTMLElement | null>(null);
const isVisible = ref(false);

const onIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    if (entries[0].isIntersecting) {
        isVisible.value = true;
        observer.unobserve(entries[0].target); // Solo dejar de observar esta sección
    }
};

let observer: IntersectionObserver;

onMounted(() => {
    observer = new IntersectionObserver(onIntersection, {
        root: null,
        threshold: 0.3, // Se activa cuando al menos el 30% del elemento es visible
    });

    if (sectionRef.value) {
        observer.observe(sectionRef.value);
    }
});

onUnmounted(() => {
    if (observer) {
        observer.disconnect();
    }
});
</script>

<style>
.will-change-opacity {
    will-change: opacity, transform;
}
</style>