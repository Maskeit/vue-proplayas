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
            <component 
                :is="selectedFormComponent" 
                v-if="selectedFormComponent" 
                :initialData="initialData"
                :errors="errors"
                :error-message="errorMessage"
                @register="handleRegister" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import InvitationService from '@/services/Class/InvitationService';
import { ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'
import { validateRegisterLeader, validateMemberRegisterForm } from '@utils/validators/AuthVal';
import FormAdmin from '@/components/Public/Register/FormAdmin.vue';
import FormNode from '@/components/Public/Register/FormNodes.vue';
import FormMember from '@/components/Public/Register/FormMember.vue';
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const errors = ref({})
const errorMessage = ref('');
let decodedData: any = null;
let role: string = '';
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
            role = decodedData.role_type; // Asigna el rol
        }
    } else {
        errorMessage.value = "Invitación inválida o ausente."; // Informa al usuario
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

const handleRegister = async (formData: any) => {
    // Limpia los errores previos antes de validar
    errors.value = {};
    errorMessage.value = '';
    // Validar según el tipo de usuario
    if (role === 'member') {
        errors.value = validateMemberRegisterForm(formData);
    } else if (role === 'node_leader') {
        errors.value = validateRegisterLeader(formData);
    }

    // Verifica si hay errores de validación
    if (Object.keys(errors.value).length > 0) {
        console.error("Errores de validación:", errors.value);
        return;
    }
    errors.value = {};
    errorMessage.value = '';
    
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