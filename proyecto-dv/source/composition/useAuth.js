import { ref, onMounted, onUnmounted } from 'vue';
import { suscribeToAuth } from './../services/auth';

export function useAuth () {
    const user = ref({
        id: null,
        email: null,
        rol: null,
        displayName: null,
        fullProfileLoaded: false,
    });
    let unsuscribeAuth;
    
    onMounted(() => unsuscribeAuth = suscribeToAuth(newUser => user.value = {...newUser}));
    onUnmounted(() => unsuscribeAuth());

    return { user };
}