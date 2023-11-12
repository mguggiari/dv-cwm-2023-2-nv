import { ref, onMounted } from 'vue';
import { getUserProfileById } from '../services/user.js';

export function usuarioPerfil(id) {
    const usuarioCargando = ref(true);
    const usuario = ref({
        id: null,
        email: null,
    });

    onMounted(async () => {
        usuarioCargando.value = true;
        usuario.value = await getUserProfileById(id);
        usuarioCargando.value = false;
    });

    return {
        usuario,
        usuarioCargando,
    }
}