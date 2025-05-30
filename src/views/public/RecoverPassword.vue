<template>
    <div class="flex flex-col md:flex-row bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden">
        <div class="absolute z-10 top-5 left-5">
            <router-link to="/Login" class="mt-6">
                <button class="p-2 hover:scale-120 transition">
                    <ArrowLeftCircleIcon class="size-10 text-gray-400" />
                </button>
            </router-link>
        </div>
        <!-- Recover password -->
        <div class="flex items-center justify-around h-screen m-auto">
            <div class="min-w-100 max-w-100">
                <h2
                    class="text-center text-2xl font-semibold dark:text-gray-200 text-[var(--color-eastern-blue-700)] mb-6">
                    Recuperar Cuenta
                </h2>
                <div class="p-4 mb-5 dark:bg-gray-600 bg-gray-300 rounded-lg">
                    <p class="text-center">Se enviará un correo de confirmación para verificar que la cuenta te
                        pertenece.</p>
                </div>
                <form @submit.prevent="handleRecoverPassword">
                    <!-- Campo Email -->
                    <div class="mb-4">
                        <label for="email" class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                            Correo electrónico
                        </label>
                        <div class="relative mt-1">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <AtSymbolIcon class="size-6 dark:text-gray-200 text-gray-600" />
                            </span>
                            <input v-model="email" type="email" id="email"
                                class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                placeholder="Correo electrónico" />
                        </div>
                        <p v-if="errors" class="text-red-500 text-sm mt-1">
                            {{ errors }}
                        </p>
                    </div>

                    <!-- Botón de enviar -->
                    <!-- Botón de inicio de sesión -->
                    <button type="submit"
                        class="w-full bg-[var(--color-eastern-blue-600)] hover:bg-[var(--color-eastern-blue-800)] dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 cursor-pointer"
                        :disabled="loading">
                        <Loader v-if="loading" />
                        <span v-if="!loading">Enviar</span>
                        <span v-else>Cargando...</span>
                    </button>
                </form>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { validateEmail } from '@/utils/validators/AuthVal';
import { Authentication } from '@/services/Class/Authentication';
import { LockClosedIcon, AtSymbolIcon, ArrowLeftCircleIcon, EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'
import Loader from '@/components/shared/Loader.vue';
import { useRouter } from "vue-router";

const router = useRouter();
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
const errors = ref({});
const errorMessage = ref('');

const handleRecoverPassword = async () => {
    errors.value = validateEmail(email.value);
    if (Object.keys(errors.value).length === 0) {
        try {
            loading.value = true;
            const authService = new Authentication();
            const { status, message } = await authService.recoverPassword(email.value);
            if (status === 200) {
                errorMessage.value = 'Correo de recuperación enviado. Revisa tu bandeja de entrada.';
                setTimeout(() => {
                    router.push('/SetPassword');
                }, 3000);
            } else {
                errorMessage.value = message;
            }
        } catch (error) {
            errorMessage.value = 'Error al enviar el correo de recuperación.';
        } finally {
            loading.value = false;
        }
    }
};

</script>