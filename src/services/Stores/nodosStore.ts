import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Nodes, Node, NodeMembers } from '@/interfaces/Nodes';
import { NodosService } from '@/services/Class/NodoService';

const nodosService = new NodosService();

export const useNodosStore = defineStore('nodos', () => {
    const nodos = ref<Nodes[]>([]);
    const nodoMiembros = ref<NodeMembers[]>([]); // Cambiado a NodeMembers
    const nodo = ref<Node | null>(null); // Cambiado a Node
    const cargado = ref(false);

    const setNodos = (lista: Nodes[]) => {
        nodos.value = lista
    }
    const setNodeBio = (node: Node) => {
        nodo.value = node;
    };

    const setNodeMembers = (members: NodeMembers[]) => {
        nodoMiembros.value = members;
    }

    const setNodeMember = (member: NodeMembers) => {
        const index = nodoMiembros.value.findIndex((m) => m.id === member.id);
        if (index !== -1) {
            nodoMiembros.value[index] = member;
        }        
    }

    // Traer lista de los nodos
    const fetchNodos = async () => {
        if (cargado.value && nodos.value.length > 0) {
            return nodos.value
        }
        try {
            const response = await nodosService.getPublicNodes()
            if (response) {
                setNodos(response)
                cargado.value = true
                return nodos.value
            }
        } catch (error) {
            console.error('Error al cargar nodos desde el store:', error)
        }
        return null
    }

    // traer informacion del nodo
    const fetchNodoInfo = async (code: string): Promise<Node | null> => {
        try {
            const nodoBio = await nodosService.getNodeBio(code);
            setNodeBio(nodoBio);
        } catch (error) {
            console.error('Error al obtener y establecer el perfil:', error)
            throw error
        }
    };

    // traer miembros del nodo
    const fetchNodoMembers = async (code: string): Promise<NodeMembers[] | null> => {
        try {
            const members = await nodosService.getNodoMembers(code);
            if (members && Array.isArray(members)) {
                setNodeMembers(members);
            }
        } catch (error) {
            console.error("Error al cargar miembros del nodo desde el store:", error);
        }
        return null;
    };

    const updateNodeBio = async (id: number, editData: Node) => {
        try {
            const { status, message, data } = await nodosService.editNodeBio(id, editData);
            setNodeBio(data);
            return status;
        } catch (error) {
            console.error("Error al editar la biografía del nodo:", error);
        }
    }
    // sube una foto de perfil del nodo
    const uploadNodeImage = async (id: number, file: File) => {
        try {
            const { status, message, data } = await nodosService.uploadNodeProfilePicture(id, file);
            setNodeBio(data);
            return status;
        } catch (error) {
            console.error("Error al subir la foto de perfil del nodo:", error);
        }
    }

    // en relacion con el miembro solo elimina la relacion entre el nodo y el miembro
    const unlinkMember = async (id: number) => {        
        try {
            const { status, message, data } = await nodosService.deleteMember(id);
            //setNodeMember(data); Se espera que el backend devuelva el miembro actualizado correctamente
            return status;
        } catch (error) {
            console.error("Error al eliminar miembro del nodo:", error);
        }
    }
    
    // activa o desactiva el miembro del nodo
    const toggleNodeMemberStatus = async (id: number) => {
        try {
            const { status, message, data } = await nodosService.toggleMemberStatus(id);
            //setNodeMember(data); Se espera que el backend devuelva el miembro actualizado correctamente
            return status;
        } catch (error) {
            console.error("Error al cargar miembros del nodo desde el store:", error);
        }
    }
    
    return {
        nodo,
        nodos,
        nodoMiembros,
        cargado,
        //actions
        setNodeBio,
        setNodeMembers,
        setNodeMember,
        setNodos,
        fetchNodos,
        fetchNodoInfo,
        fetchNodoMembers,
        updateNodeBio,
        uploadNodeImage, // sube una foto de perfil 
        unlinkMember, // eliminar miembro del nodo
        toggleNodeMemberStatus, // activar o desactivar miembro
    };
});
