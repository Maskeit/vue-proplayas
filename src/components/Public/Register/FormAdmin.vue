<template>
    <div class="max-w-100 p-8">
        <h2 class="text-xl font-semibold dark:text-gray-200 text-gray-600 text-center mb-4">
            Registro de Administrador
        </h2>

        <form @submit.prevent="handleSubmit">
            <!-- PASO 1: Información Personal -->
            <div>
                <div class="mb-4">
                    <label for="name" class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        Nombre
                    </label>
                    <div class="relative mt-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <UserIcon class="size-6 dark:text-gray-200 text-gray-600" />
                        </span>
                        <input v-model="formData.name" type="text" id="name" name="name"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <div class="mb-4">
                    <label for="email" class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        Correo electrónico
                    </label>
                    <div class="relative mt-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <AtSymbolIcon class="size-6 dark:text-gray-200 text-gray-600" />
                        </span>
                        <input v-model="formData.email" type="email" id="email" name="email"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            placeholder="Correo electrónico" required readonly/>
                    </div>
                </div>

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
                        <input v-model="formData.password" :type="showPassword ? 'text' : 'password'" id="password" name="password"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            placeholder="Contraseña" />

                        <!-- Botón para alternar la visibilidad -->
                        <button type="button" @click="togglePasswordVisibility"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 dark:text-gray-200 text-gray-600 hover:text-gray-700">
                            <EyeIcon v-if="!showPassword" class="size-6" />
                            <EyeSlashIcon v-else class="size-6" />
                        </button>
                    </div>
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
                        <input v-model="formData.confirm_password" :type="showPassword ? 'text' : 'password'"
                            id="confirm_password" name="confirm_password"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-10 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            placeholder="Contraseña" />

                        <!-- Botón para alternar la visibilidad -->
                        <button type="button" @click="togglePasswordVisibility"
                            class="absolute inset-y-0 right-0 flex items-center pr-3 dark:text-gray-200 text-gray-600 hover:text-gray-700">
                            <EyeIcon v-if="!showPassword" class="size-6" />
                            <EyeSlashIcon v-else class="size-6" />
                        </button>
                    </div>
                </div>
                <div class="flex justify-between">
                    <button type="submit"
                        class="bg-[var(--color-eastern-blue-600)] hover:bg-[var(--color-eastern-blue-700)] text-white px-4 py-2 rounded-md transition w-full">Registrarse</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import type { RegisterAdmin } from "@interfaces/Invitations.ts";
import { LockClosedIcon, AtSymbolIcon, EyeIcon, EyeSlashIcon, UserIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{ initialData: Partial<RegisterAdmin> }>();

const formData = ref<RegisterAdmin>({
    token: "",
    name: "",
    email: "",
    password: "",
    confirm_password: "",
});
const showPassword = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};


// Actualizar los campos prellenados cuando se reciban de `initialData`
watch(() => props.initialData, (newData) => {
    formData.value.name = newData.name || "";
    formData.value.email = newData.email || "";
}, { immediate: true });

const emits = defineEmits(["register"]);

const handleSubmit = () => {
    emits("register", formData.value);
};
</script>