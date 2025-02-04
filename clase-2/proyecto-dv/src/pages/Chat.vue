<script>
import {chatSubscribeToMessages, chatSaveMessage} from "../services/chat.js";
import { dateToString } from '../helpers/date.js';
import BaseButton from "../components/BaseButton.vue";
import BaseLabel from "../components/BaseLabel.vue";
import BaseInput from "../components/BaseInput.vue";
import BaseTextarea from "../components/BaseTextarea.vue";
import Loader from "../components/Loader.vue";

export default {
    name: "Chat",
    components: { BaseButton, BaseLabel, BaseInput, BaseTextarea, Loader },
    data() {
        return {
            messagesLoading: true,
            messages: [],
            newMessageSaving: false,
            newMessage: {
                user: '',
                message: '',
            }
        };
    },
    methods: {
        sendMessage() {
            if(this.newMessageSaving) return;

            this.newMessageSaving = true;
            chatSaveMessage({
                user: this.newMessage.user,
                message: this.newMessage.message,
                // ...this.newMessage // Podríamos haberlo escrito así, también.
            })
                .then(() => {
                    this.newMessage.message = '';
                    this.newMessageSaving = false;
                });
        },

        formatDate(date) {
            return dateToString(date);
        }
    },
    mounted() {
        this.messagesLoading = true;
        chatSubscribeToMessages(messages => {
            this.messages = messages;
            this.messagesLoading = false;
        });
    },
};
</script>

<template>
    <h1 class="mb-4 font-bold text-3xl">Intro a Firestore</h1>

    <p class="mb-3">Leyendo los mensajes del chat, ahora en tiempo real</p>

    <div class="flex justify-between gap-4">
        <div>
            <template v-if="!messagesLoading">
                <div 
                    v-for="message in messages"
                    :key="message.id"
                    class="mb-2"
                >
                    <div><b>Usuario:</b> {{ message.user }}</div>
                    <div><b>Mensaje:</b> {{ message.message }}</div>
                    <div class="text-right">{{ formatDate(message.created_at) }}</div>
                </div>
            </template>
            <template v-else>
                <Loader />
            </template>
        </div>

        <form
            action="#"
            @submit.prevent="sendMessage"
        >
            <div class="mb-3">
                <BaseLabel for="user">Usuario</BaseLabel>
                <BaseInput
                    type="text"
                    id="user"
                    v-model="newMessage.user"
                />
            </div>
            <div class="mb-3">
                <BaseLabel for="message">Mensaje</BaseLabel>
                <BaseTextarea
                    id="message"
                    v-model="newMessage.message"
                ></BaseTextarea>
            </div>
            <BaseButton
                :loading="newMessageSaving"
            />
            <!-- <button 
                class="w-full p-1.5 rounded bg-blue-700 text-white"
                type="submit"
            >Enviar</button> -->
        </form>
    </div>
</template>
