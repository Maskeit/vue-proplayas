<template>
    <section class="min-h-screen flex items-center justify-center">
        <div class="px-6 max-w-6xl flex flex-col lg:flex-row items-center gap-14">
            <div class="lg:w-1/2 text-center lg:text-left animate-fade-up">
                <h1 class="text-4xl lg:text-6xl font-bold text-[var(--color-eastern-blue-800)] dark:text-gray-200">
                    Estructura Organizativa (Nodos)
                </h1>
                <p class="mt-4 text-lg text-gray-700 dark:text-gray-200 ">
                    Nuestra red se construye sobre nodos dinámicos que integran diversos sectores: científico, empresarial, público y sociedad civil.
                </p>
                <button @click=""
                    class="mt-6 px-6 py-3 bg-[var(--color-eastern-blue-600)] text-white rounded-lg shadow-lg hover:bg-[var(--color-eastern-blue-800)]">
                    Nodos
                </button>
            </div>
            <div class="lg:w-1/2 flex justify-center">
                <div class="lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 gap-8 text-gray-700 dark:text-gray-200">
                    <div class="my-3 gap-3">
                        <h3 class="text-2xl font-bold">Sistema de nodos</h3>
                        <p>Explicación del sistema de nodos dinámicos que integran diversos sectores.</p>
                    </div>
                    <div class="my-3 gap-3">
                        <h3 class="text-2xl font-bold">Requisitos</h3>
                        <p>Grupos mínimo de 3 personas para formar parte de un nodo.</p>
                    </div>
                    <div class="my-3 gap-3">
                        <h3 class="text-2xl font-bold">Tipos de Participantes</h3>
                        <ol>
                            <li>Científicos</li>
                            <li>Empresarial</li>
                            <li>Función Pública</li>
                            <li>Activista/Sociedad Civil</li>                            
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>