<template>
    <!-- Contenedor principal -->
    <div class="flex flex-col md:grid md:grid-cols-2 bg-white dark:bg-[var(--color-eastern-blue-800)] shadow-lg rounded-lg overflow-hidden">
        <div class="absolute z-10 top-5 left-5">
            <router-link to="/" class="mt-6">
                <button class="p-2 rounded-full md:shadow-md hover:scale-120 transition">
                    <ArrowLeftCircleIcon class="size-10 md:text-gray-50 text-gray-400" />
                </button>
            </router-link>
        </div>
        <!-- Sección izquierda - Imagen -->
        <div class="relative hidden md:block">
            <!-- Imagen de fondo -->
            <img src="@/assets/images/registro.jpeg" alt="Fondo Proplayas"
                class="h-screen w-full shadow-[10px_5px_5px_rgb(204,204,204)] object-cover box-border rounded-tr-[100px] rounded-br-[100px]" />

            <!-- Contenedor del logo y texto -->
            <div
                class="absolute top-1/2 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-4 z-20 p-6">
                <img src="@/assets/icons/proplayas_logo.svg" alt="Logo Proplayas" class="w-16 md:w-40" />
                <span class="text-white font-poppins text-xl md:text-4xl font-poppins">
                    Red Iberoamericana <br /> Proplayas
                </span>
            </div>
        </div>

        <!-- Register container -->
        <div class="flex items-center justify-around h-screen m-auto">
            <!-- Formulario -->
            <div class="w-full p-8 ">
                <h2 class="text-center text-2xl font-semibold dark:text-gray-200 text-[var(--color-eastern-blue-700)] mb-6">
                    Registro con invitación
                </h2>

                <form @submit.prevent="handleRegister">
                    <!-- Campo Nombre completo -->
                    <div class="mb-4">
                        <label for="email" class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                            Nombre
                        </label>
                        <div class="relative mt-1">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <UserIcon class="size-6 dark:text-gray-200 text-gray-600" />
                            </span>
                            <input v-model="fullName" type="text" id="name"
                                class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                placeholder="" />
                        </div>
                        <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                            {{ errors.name }}
                        </p>
                    </div>
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
                    <div class="mb-4">
                        <label for="password" class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                            Confirmar Contraseña
                        </label>
                        <div class="relative mt-1">
                            <!-- Icono de candado a la izquierda -->
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <LockClosedIcon class="size-6 dark:text-gray-200 text-gray-600" />
                            </span>

                            <!-- Input de contraseña -->
                            <input v-model="confirmPassword" :type="showPassword ? 'text' : 'password'" id="password"
                                class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                                placeholder="Contraseña" />

                            <!-- Botón para alternar la visibilidad -->
                            <button type="button" @click="togglePasswordVisibility"
                                class="absolute inset-y-0 right-0 flex items-center pr-3 dark:text-gray-200 text-gray-600 hover:text-gray-700">
                                <EyeIcon v-if="!showPassword" class="size-6" />
                                <EyeSlashIcon v-else class="size-6" />
                            </button>
                        </div>
                        <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
                            {{ errors.confirmPassword }}
                        </p>
                    </div>


                    <!-- Mensaje de error -->
                    <p v-if="errorMessage" class="text-red-500 text-center text-sm mb-2">
                        {{ errorMessage }}
                    </p>

                    <!-- Botón de inicio de sesión -->
                    <button type="submit"
                        class="w-full bg-[var(--color-eastern-blue-600)] hover:bg-[var(--color-eastern-blue-800)] text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
                        :disabled="loading">
                        <Loader v-if="loading" />
                        <span v-if="!loading">Registrarme</span>
                        <span v-else>Cargando...</span>
                    </button>

                    <!-- Enlace de recuperación de contraseña -->
                    <router-link to="/login">
                        <p class="text-center text-sm text-blue-500 mt-4 cursor-pointer hover:underline">
                            Ya tengo una cuenta
                        </p>
                    </router-link>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Authentication } from '@/services/Class/Authentication';
import { LockClosedIcon, AtSymbolIcon, ArrowLeftCircleIcon, EyeIcon, EyeSlashIcon, UserIcon } from '@heroicons/vue/24/solid'
import { validateRegisterForm, ValidationRegisterErrors } from '@/utils/validators/AuthVal';
import Loader from '@/components/shared/Loader.vue';

import { useRouter } from "vue-router";

const router = useRouter();
const email = ref('') // inicializado con el token
const fullName = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false);
const loading = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const errors = ref<ValidationRegisterErrors>({})
const errorMessage = ref('');

const handleRegister = async () => {
    errors.value = validateRegisterForm(email.value, password.value, confirmPassword.value, fullName.value)
    if (Object.keys(errors.value).length > 0) {
        console.log("Errores de validación:", errors.value);
        return;
    }
    if (Object.keys(errors.value).length === 0) {
        try {
            loading.value = true;
            const authService = new Authentication();
            console.log("Llamando al auth service");
            const response = await authService.register({ email: email.value, password: password.value, name: fullName.value });
            // Redirección a página de login
            console.log('Estado del registro: ', response);
        } catch (error) {
            errorMessage.value = "Fallo al registrarse";
        } finally {
            loading.value = false;
        }
    }
}
</script>