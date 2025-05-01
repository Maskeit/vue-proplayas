<template>
    <!-- Contenedor principal -->
    <div class="flex flex-col md:flex-row bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden">
        <div class="absolute z-10 top-5 left-5">
            <router-link to="/" class="mt-6">
                <button class="p-2 hover:scale-120 transition">
                    <ArrowLeftCircleIcon class="size-10 text-gray-400" />
                </button>
            </router-link>
        </div>
        <!-- Login container -->
        <div class="flex items-center justify-around h-screen m-auto">
            <!-- Formulario -->
            <div class="min-w-100">
                <h2 class="text-center text-2xl font-semibold dark:text-gray-200 text-[var(--color-eastern-blue-700)] mb-6">
                    Inicia Sesión
                </h2>
                <form @submit.prevent="handleLogin">
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
                        <p v-if="errors.email" class="text-red-500 text-sm mt-1">
                            {{ errors.email }}
                        </p>
                    </div>

                    <!-- Campo Contraseña -->
                    <div class="mb-4">
                        <label for="password" class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                            Contraseña
                        </label>
                        <div class="relative mt-1">
                            <!-- Icono de candado a la izquierda -->
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <LockClosedIcon class="size-6 dark:text-gray-200 text-gray-600" />
                            </span>

                            <!-- Input de contraseña -->
                            <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password"
                                class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                placeholder="Contraseña" />

                            <!-- Botón para alternar la visibilidad -->
                            <button type="button" @click="togglePasswordVisibility"
                                class="absolute inset-y-0 right-0 flex items-center pr-3 dark:text-gray-200 text-gray-600 hover:text-gray-700">
                                <EyeIcon v-if="!showPassword" class="size-6" />
                                <EyeSlashIcon v-else class="size-6" />
                            </button>
                        </div>
                        <p v-if="errors.password" class="text-red-500 text-sm mt-1">
                            {{ errors.password }}
                        </p>
                    </div>

                    <!-- Checkbox "Recordarme" -->
                    <div class="mb-4 flex items-center">
                        <input id="remember" type="checkbox" class="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                        <label for="remember" class="ml-2 text-sm dark:text-gray-200 text-gray-600">Recordarme</label>
                    </div>

                    <!-- Mensaje de error -->
                    <p v-if="errorMessage" class="text-red-500 text-center text-sm mb-2">
                        {{ errorMessage }}
                    </p>

                    <!-- Botón de inicio de sesión -->
                    <button type="submit"
                        class="w-full bg-[var(--color-eastern-blue-600)] hover:bg-[var(--color-eastern-blue-800)] dark:bg-zinc-600 dark:hover:bg-zinc-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                        :disabled="loading">
                        <Loader v-if="loading" />
                        <span v-if="!loading">Iniciar sesión</span>
                        <span v-else>Cargando...</span>
                    </button>

                    <!-- Enlace de recuperación de contraseña -->
                    <div class="text-center mt-4">
                        <router-link to="/RecoverPassword" class="text-sm text-blue-500 cursor-pointer hover:underline">
                            Olvidé mi contraseña
                        </router-link>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { validateAuthForm, Login } from '@/utils/validators/AuthVal';
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

const errors = ref<Login>({});
const errorMessage = ref('');

const handleLogin = async () => {
    errors.value = validateAuthForm(email.value, password.value);

    if (Object.keys(errors.value).length === 0) {
        try {
            loading.value = true; // Activa el loader
            const authService = new Authentication();
            const { token, route } = await authService.login({ email: email.value, password: password.value });
            if (token && route) {
                router.push(route); // Redirigir al usuario según su rol
            } else {
                errorMessage.value = "No se pudo determinar la ruta de acceso.";
            }
        } catch (error) {
            errorMessage.value = 'Failed to fetch';
        } finally {
            loading.value = false; // Desactiva el loader
        }
    }
};
</script>