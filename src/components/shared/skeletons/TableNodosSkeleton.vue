<template>
    <div class="px-5">
                <!-- header -->
        <div class="flex justify-between items-center p-4">
            <h1 class="text-3xl font-semibold text-gray-600 dark:text-gray-100">Nodos</h1>
        </div>
        <div class="overflow-x-auto w-full">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-zinc-800">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Code</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Nombre</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Tipo</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">País</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Ciudad</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Miembros</th>
                            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Se unio en</th>
                        </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:bg-zinc-800 dark:divide-zinc-700 dark:text-gray-100">
                    <tr v-for="row in 8" :key="row" class="animate-pulse">
                        <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-4"></div></td>
                        <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-6"></div></td>
                        <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-32"></div></td>
                        <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-12"></div></td>
                        <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-12"></div></td>
                        <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-12"></div></td>
                        <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-12"></div></td>
                        <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-12"></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>