<template>
    <div class="max-w-100 p-8">
        <h2 class="text-xl font-semibold dark:text-gray-200 text-gray-600 text-center mb-4">
            {{ currentStep === 1 ? "Información Personal" : "Información del Nodo" }}
        </h2>

        <form @submit.prevent="handleSubmit">
            <!-- PASO 1: Información Personal -->
            <div v-if="currentStep === 1">
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

                <div class="mb-4">
                    <label class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        Área de Trabajo
                    </label>
                    <div class="relative mt-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <BriefcaseIcon class="size-6 dark:text-gray-200 text-gray-600" />
                        </span>
                        <input v-model="formData.expertise_area" type="text" name="expertise_area"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        Trabajo de Investigación
                    </label>
                    <div class="relative mt-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <DocumentTextIcon class="size-6 dark:text-gray-200 text-gray-600" />
                        </span>
                        <input v-model="formData.research_work" type="text" name="research_work"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <button type="button" @click="nextStep"
                    class="bg-[var(--color-eastern-blue-600)] hover:bg-[var(--color-eastern-blue-700)] text-white px-4 py-2 rounded-md transition w-full">Siguiente</button>
            </div>

            <!-- PASO 2: Información del Nodo -->
            <div v-if="currentStep === 2">
                <div class="mb-4">
                    <label class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        Tipo de Nodo:
                    </label>
                    <div class="relative mt-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <LifebuoyIcon class="size-6 dark:text-gray-200 text-gray-600" />
                        </span>
                        <input v-model="formData.node_type" type="text" name="node_type"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            required readonly/>
                    </div>
                </div>
                <div class="mb-4">
                    <label class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        Nombre del Nodo:
                    </label>
                    <div class="relative mt-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <AtSymbolIcon class="size-6 dark:text-gray-200 text-gray-600" />
                        </span>
                        <input v-model="formData.node_name" type="text" name="node_name"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        Descripción:
                    </label>
                    <div class="relative mt-1">
                        <textarea v-model="formData.about" name="about"
                            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"></textarea>
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        País:
                    </label>
                    <div class="relative mt-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <GlobeAmericasIcon class="size-6 dark:text-gray-200 text-gray-600" />
                        </span>
                        <input v-model="formData.country" type="text" name="country"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <div class="mb-4">
                    <label class="block dark:text-gray-200 text-gray-600 text-sm font-medium">
                        Ciudad:
                    </label>
                    <div class="relative mt-1">
                        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                            <BuildingOfficeIcon class="size-6 dark:text-gray-200 text-gray-600" />
                        </span>
                        <input v-model="formData.city" type="text" name="city"
                            class="dark:text-gray-200 text-gray-600 w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
                            required />
                    </div>
                </div>

                <div class="flex justify-between">
                    <button type="button" @click="prevStep"
                        class="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition">Anterior</button>
                    <button type="submit"
                        class="bg-[var(--color-eastern-blue-600)] hover:bg-[var(--color-eastern-blue-700)] text-white px-4 py-2 rounded-md transition">Registrarse</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, defineEmits } from "vue";
import type { RegisterNodeLeader } from "@interfaces/Invitations.ts";
import { LockClosedIcon, AtSymbolIcon, EyeIcon, EyeSlashIcon, UserIcon, 
    GlobeAmericasIcon, BriefcaseIcon, DocumentTextIcon, LifebuoyIcon, BuildingOfficeIcon } from '@heroicons/vue/24/solid'

const currentStep = ref(1);
const props = defineProps<{ initialData: Partial<RegisterNodeLeader> }>();

const formData = ref<RegisterNodeLeader>({
    token: "",
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    expertise_area: "",
    research_work: "",
    node_type: "",
    node_name: "",
    about: "",
    country: "",
    city: "",
});
const showPassword = ref(false);
const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};
const nextStep = () => {
    if (currentStep.value < 2) currentStep.value++;
};

const prevStep = () => {
    if (currentStep.value > 1) currentStep.value--;
};

// Actualizar los campos prellenados cuando se reciban de `initialData`
watch(() => props.initialData, (newData) => {
    formData.value.name = newData.name || "";
    formData.value.email = newData.email || "";
    formData.value.node_type = newData.node_type || "";
}, { immediate: true });

const emits = defineEmits(["register"]);

const handleSubmit = () => {
    emits("register", formData.value);
};
</script>