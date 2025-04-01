<template>
    <!-- Contenedor principal -->
    <div
    class="flex flex-col md:flex-row bg-white dark:bg-zinc-900 shadow-lg rounded-lg overflow-hidden">
        <div class="absolute z-10 top-5 left-5">
            <router-link to="/" class="mt-6">
                <button class="p-2 hover:scale-120 transition">
                    <ArrowLeftCircleIcon class="size-10 text-gray-400" />
                </button>
            </router-link>
        </div>
        <!-- Seccion derecha - Formulario Register container -->
        <div class="flex items-center justify-around h-screen m-auto">
            <component :is="selectedFormComponent" v-if="selectedFormComponent" :initialData="initialData"
                @register="handleRegister" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import InvitationService from '@/services/Class/InvitationService';
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'
import { validateRegisterForm, ValidationRegisterErrors, validateMemberRegisterForm } from '@/utils/validators/AuthVal';
import FormAdmin from '@/components/public/Register/FormAdmin.vue';
import FormNode from '@/components/public/Register/FormNodes.vue';
import FormMember from '@/components/public/Register/FormMember.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const errors = ref<ValidationRegisterErrors>({})
const errorMessage = ref('');
let decodedData: any = null;

const decodeJWT = (token: string) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(c =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
        ).join(''));

        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        return null;
    }
};

const initialData = ref({
    name: '',
    email: '',
    node_type: '',
    role_type: ''
});

onMounted(() => {
    const token = route.query.token as string; 
    if (token) {
        decodedData = decodeJWT(token); // Asigna el valor a la variable global
        if (decodedData) {
            initialData.value = {
                name: decodedData.name || '',
                email: decodedData.email || '',
                node_type: decodedData.node_type || '',
                role_type: decodedData.role_type || '',
            };
        }
    } else {
        console.error("No se encontró un token en la URL");
    }
});

const selectedFormComponent = computed(() => {
    if (!initialData.value.role_type) return null; // Evita asignar un componente si no hay rol
    const formMap: Record<string, any> = {
        admin: FormAdmin,
        node_leader: FormNode,
        member: FormMember
    };
    return formMap[initialData.value.role_type] || null;
});

const handleRegister = async (formData: any, role: string) => {
    // Validar según el tipo de usuario
    if (role === 'member') {
        errors.value = validateMemberRegisterForm(formData);
    } else {
        errors.value = validateRegisterForm(
            formData.email,
            formData.password,
            formData.confirm_password,
            formData.name
        );
    }

    if (Object.keys(errors.value).length > 0) {
        console.error("Errores de validación:", errors.value);
        return;
    }

    try {
        const invitationService = new InvitationService();
        const token = route.query.token as string;

        if (!token) {
            console.error("No se encontró un token en la URL");
            errorMessage.value = "Error: No se encontró un token válido.";
            return;
        }

        // Codificar contraseñas y enviar según rol
        const payload = {
            ...formData,
            token,
            password: btoa(formData.password),
            confirm_password: btoa(formData.confirm_password)
        };

        const response = await invitationService.registerNewUser(payload);

        console.log("Respuesta de la API:", response);
        if (response === 201) {
            router.push('/Login');
        } else {
            errorMessage.value = response.message || "Error desconocido en el registro";
        }
    } catch (error) {
        console.error("Error en la petición de registro:", error);
        errorMessage.value = "Fallo al registrarse. Inténtalo de nuevo.";
    }
};
</script>