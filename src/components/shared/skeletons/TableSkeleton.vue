<template>
    <div class="px-5">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50 dark:bg-zinc-800">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Node id</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Nombre</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Linea de Investigación</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase">Area de trabajo</th>
                    </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200 dark:bg-zinc-800 dark:divide-zinc-700 dark:text-gray-100">
                <tr v-for="row in 4" :key="row" class="animate-pulse">
                    <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-10"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-16"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-40"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-48"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-56"></div></td>
                    <td class="px-6 py-4"><div class="h-4 bg-zinc-200 rounded w-40"></div></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>