<template>
    <div id="popup-modal" tabindex="-1" class="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
        <div class="relative p-4 w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-zinc-700">
                <button type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="popup-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
                <div class="p-4 md:p-5 text-center">
                    <template v-if="type === 'success'">
                        <svg class="mx-auto mb-4 text-green-500 w-16 h-16 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    </template>
                    <template v-else-if="type === 'error'">
                        <svg class="mx-auto mb-4 text-red-500 w-16 h-16 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.536-10.95a1 1 0 00-1.414-1.415L10 8.586 7.879 6.465a1 1 0 10-1.414 1.415L8.586 10l-2.121 2.121a1 1 0 001.414 1.415L10 11.414l2.121 2.122a1 1 0 001.414-1.415L11.414 10l2.122-2.121z" clip-rule="evenodd" />
                        </svg>
                    </template>
                    <template v-else-if="type === 'warning'">
                        <svg class="mx-auto mb-4 text-yellow-500 w-16 h-16 dark:text-yellow-400" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.682-1.36 3.447 0l6.516 11.59c.75 1.335-.213 2.99-1.732 2.99H3.473c-1.52 0-2.482-1.655-1.732-2.99l6.516-11.59zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-6a1 1 0 00-.993.883L9 8v3a1 1 0 001.993.117L11 11V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </template>
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{{ message }}</h3>
                    <button @click="$emit('close')" type="button"
                        class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                        Listo
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: {
        type: String,
        default: 'Los cambios se han efectuado con éxito.',
    },
    type: {
        type: String,
        default: 'success', // 'success' | 'error' | 'warning'
    }
});
</script>