<template>
    <section
        class="flex flex-col lg:flex-row items-center justify-center h-screen bg-gradient-to-b from-[var(--color-eastern-blue-600)] via-[var(--color-eastern-blue-700)] to-[var(--color-eastern-blue-950)] gap-10 p-6">
        <img src="@/assets/icons/proplayas_logo.svg"
            class="animate-wiggle drop-shadow-md w-56 h-56 md:w-56 md:h-56 lg:w-60 lg:h-60" alt="">

        <div class="flex flex-col items-center lg:items-start text-white">
            <p class="text-4xl md:text-5xl lg:text-6xl">En Red somos</p>
            
            <!-- Contenedor de la animación -->
            <section class="relative overflow-hidden h-10 md:h-12 lg:h-16 text-4xl md:text-5xl lg:text-6xl">
                <div class="animate-slide">
                    <div class="h-10 md:h-12 lg:h-16 flex items-center bg-[#3c8b0e] px-6">Ambiente</div>
                    <div class="h-10 md:h-12 lg:h-16 flex items-center bg-[#cd921e] px-6">Sociales</div>
                    <div class="h-10 md:h-12 lg:h-16 flex items-center bg-[#20a7d8] px-6">Proplayas</div>
                </div>
            </section>
        </div>
    </section>
</template>

<style scoped>

/* Ajuste de animación en función de los diferentes tamaños */
@media (width > 1024px) {
    @keyframes transition-animation {
        0%, 10% { transform: translateY(0); }
        20%, 30% { transform: translateY(-4rem); } /* md */
        40%, 50% { transform: translateY(-8rem); } /* lg */
        60%, 70% { transform: translateY(-4rem); } /* md */
        80%, 90% { transform: translateY(0); }
        100% { transform: translateY(0); }
    }

    .animate-slide {
    animation: transition-animation 12s infinite;
    }
}
@media (768px <= width <= 1024px) {
    @keyframes transition-animation {
        0%, 10% { transform: translateY(0); }
        20%, 30% { transform: translateY(-3rem); } /* md */
        40%, 50% { transform: translateY(-6rem); } /* lg */
        60%, 70% { transform: translateY(-3rem); } /* md */
        80%, 90% { transform: translateY(0); }
        100% { transform: translateY(0); }
    }

    .animate-slide {
    animation: transition-animation 12s infinite;
    }
}
@media (width < 768px) {
    @keyframes transition-animation {
        0%, 10% { transform: translateY(0); }
        20%, 30% { transform: translateY(-2.5rem); } /* md */
        40%, 50% { transform: translateY(-5rem); } /* lg */
        60%, 70% { transform: translateY(-2.5rem); } /* md */
        80%, 90% { transform: translateY(0); }
        100% { transform: translateY(0); }
    }

    .animate-slide {
    animation: transition-animation 12s infinite;
    }
}
</style>