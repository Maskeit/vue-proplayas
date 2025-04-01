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

    // Traer lista de los nodos
    const fetchNodos = async () => {
        if (cargado.value && nodos.value.length > 0) {
            // Ya están cargados, no hacer petición
            return nodos.value;
        }
        try {
            const response = await nodosService.getPublicNodes();
            if (response) {
                nodos.value = response;
                cargado.value = true;
                return nodos.value;
            }
        } catch (error) {
            console.error("Error al cargar nodos desde el store:", error);
        }
        return null;
    };

    // traer informacion del nodo
    const fetchNodoInfo = async (code: string): Promise<Node | null> => {
        try {
            const response = await nodosService.getNodeBioCode(code);
            if (response) {
                nodo.value = response;
                cargado.value = true;
                return nodo.value;
            }
        } catch (error) {
            console.error("Error al cargar nodo:", error);
        }
        return null;
    };

    // traer miembros del nodo
    const fetchNodoMembers = async (id: number): Promise<NodeMembers[] | null> => {
        try {
            const members = await nodosService.getNodoMembers(id);
            if (members && Array.isArray(members)) {
                nodoMiembros.value = members;
                return members;
            }
        } catch (error) {
            console.error("Error al cargar miembros del nodo desde el store:", error);
        }
        return null;
    };

    return {
        nodo,
        nodos,
        nodoMiembros,
        cargado,
        fetchNodos,
        fetchNodoInfo,
        fetchNodoMembers,
    };
});
