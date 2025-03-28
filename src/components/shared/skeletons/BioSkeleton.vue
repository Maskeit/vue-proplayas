<template>
    <div class="p-5 lg:p-10 animate-pulse">
        <div class="bg-white dark:bg-zinc-700 shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-[300px_minmax(600px,_1fr)] gap-6 relative">
            <!-- Perfil: Foto y Nombre -->
            <div class="flex flex-col items-center md:items-start">
                <!-- Imagen de Perfil -->
                <div class="md:w-48 md:h-48 w-32 h-32 rounded-full border-2 bg-gray-200 object-cover border-none"></div>
                <div class="my-3 bg-gray-200 h-8 w-50 rounded-lg">
                </div>
                <div class="max-w-lg">
                    <div class="my-1 bg-gray-200 h-8 w-50 rounded-lg"></div>
                </div>
            </div>
            <!-- Información sobre el nodo -->
            <div class="flex flex-col justify-between">
                <div class="bg-gray-200 h-6 w-100 rounded-lg"></div>
                <div class="bg-gray-200 h-6 w-100 rounded-lg"></div>
                <div class="bg-gray-200 h-6 w-100 rounded-lg"></div>
                <div class="bg-gray-200 h-6 w-100 rounded-lg"></div>
                <!-- Redes Sociales -->
                <div class="bg-gray-200 h-10 w-100 rounded-lg mt-6 flex flex-wrap items-center gap-4">
                    <div class="flex flex-wrap gap-3 bg-gray-200 h-8 w-100 rounded-lg"></div>
                </div>
            </div>
        </div>
    </div>
</template>