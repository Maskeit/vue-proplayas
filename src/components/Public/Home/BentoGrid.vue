<template>
    <div class="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 
        dark:from-zinc-800 dark:to-zinc-800 
        flex flex-col gap-8 py-12 px-5">

        <h1 class="text-3xl lg:text-5xl text-center font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200 max-w-6xl mx-auto">
            Conocimientos y experiencias para fortalecer la gestión sostenible de las playas.
        </h1>

        <!-- Grid principal con Bento Layout -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto max-w-6xl w-full">
            
            <!-- Tarjeta más grande que ocupa 2 columnas en pantallas grandes -->
            <router-link to="/Content/Proyectos" class="bento-box sm:col-span-2 lg:col-span-2">
                <h3 class="text-xl text-gray-600 dark:text-gray-100 font-semibold">Proyectos Colaborativos De Bajo Costo</h3>
                <p class="text-gray-500 dark:text-gray-100 mb-3">Participa y colabora en proyectos y obten recompensas.</p>
                <img src="/src/assets/images/home/content/projects.svg" alt="Proyectos Colaborativos" 
                     class="w-full h-52 md:h-60 object-cover rounded-lg">
            </router-link>

            <router-link to="/Content/WebSeries" class="bento-box">
                <h3 class="text-xl text-gray-600 dark:text-gray-100 font-semibold">Web Series</h3>
                <p class="text-gray-500 dark:text-gray-100 mb-3">Noticias y videos sobre la comunidad.</p>
                <img src="/src/assets/images/home/content/webserie.svg" alt="Web Series" 
                     class="w-full h-48 object-cover rounded-lg">
            </router-link>

            <router-link to="/Content/Webinars" class="bento-box">
                <h3 class="text-xl text-gray-600 dark:text-gray-100 font-semibold">Webinars</h3>
                <p class="text-gray-500 dark:text-gray-100 mb-3">Talleres impartidos por profesionales.</p>
                <img src="/src/assets/images/home/content/webinars.svg" alt="Webinars" 
                     class="w-full h-48 object-cover rounded-lg">
            </router-link>

            <router-link to="/Content/Articulos" class="bento-box">
                <h3 class="text-xl text-gray-600 dark:text-gray-100 font-semibold">Artículos</h3>
                <p class="text-gray-500 dark:text-gray-100 mb-3">Información de investigadores.</p>
                <img src="/src/assets/images/home/content/article.svg" alt="Artículos" 
                     class="w-full h-48 object-cover rounded-lg">
            </router-link>

            <router-link to="/Content/Libros" class="bento-box">
                <h3 class="text-xl text-gray-600 dark:text-gray-100 font-semibold">Libros</h3>
                <p class="text-gray-500 dark:text-gray-100 mb-3">Accede a libros de la comunidad.</p>
                <img src="/src/assets/images/home/content/books.svg" alt="Libros" 
                     class="w-full h-48 object-cover rounded-lg">
            </router-link>

        </div>
    </div>
</template>

<style scoped>
.bento-box {
    background-color: rgba(227, 227, 227, 0.265);
    padding: 1.5rem;
    border-radius: 1rem;
    backdrop-filter: blur(.4rem);
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
    display: flex;
    flex-direction: column;
}

.bento-box:hover {
    transform: scale(1.02);
}
</style>