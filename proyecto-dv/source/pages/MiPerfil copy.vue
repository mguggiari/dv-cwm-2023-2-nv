<script>
import {subscribeToAuthChanges, updateUserProfile} from "../services/auth.js";

export default {
    name: "MiPerfil",
    data: () => ({
        form: {
            displayName: '',
        },
        user: {
            id: null,
            email: null,
            displayName: null,
        },
        status: {
            type: 'info',
            text: '',
        },
        unsubscribeFn: () => {},
    }),
    methods: {
        handleProfileUpdate() {
            // TODO: Validación...

            updateUserProfile({
                displayName: this.form.displayName,
            })
                .then(() => {
                    this.status = {
                        type: 'success',
                        text: 'La información del perfil se actualizó correctamente.',
                    }
                })
                .catch(err => {
                    // Preparamos el mensaje de error de feedback.
                    this.status = {
                        type: 'danger',
                        text: err,
                    };
                });
        },
        handleNotificationClose() {
            this.status.text = '';
        }
    },
    mounted() {
        this.unsubscribeFn = subscribeToAuthChanges(newUserData => this.user = newUserData);
        this.form.displayName = this.user.displayName;
    },
    unmounted() {
        this.unsubscribeFn();
    }
};
</script>

<template>
    <section>
        <h1 class="mb-3">Perfil</h1>

        <AlertNotification
            v-if="status.text !== ''"
            :type="status.type"
            closable
            @close="handleNotificationClose"
        >
            {{ status.text }}
        </AlertNotification>

        <dl class="mb-3">
            <dt>Email</dt>
            <dd>{{ user.email }}</dd>
            <dt>Nombre de usuario</dt>
            <dd>
                <template v-if="user.displayName">
                    {{ user.displayName }}
                </template>
                <template v-else>
                    <span class="fst-italic">No especificado</span>
                </template>
            </dd>
        </dl>

        <hr>

        <section>
            <h2 class="mb-3">Actualizar mi información de perfil</h2>

            <form
                action="#"
                method="post"
                @submit.prevent="handleProfileUpdate"
            >
                <div class="mb-3">
                    <label for="displayName" class="form-label">Nombre de usuario</label>
                    <input
                        type="text"
                        id="displayName"
                        class="form-control"
                        v-model="form.displayName"
                    >
                </div>
                <button type="submit" class="btn btn-primary">Actualizar</button>
            </form>
        </section>
    </section>
</template> 