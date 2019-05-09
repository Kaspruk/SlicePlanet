<template>
    <v-toolbar dark color="primary">
        <v-toolbar-title><router-link :to="{ name: 'home' }" class="white--text">Мой интернет магазин</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="!user" class="light-blue white--text font-weight-bold" outline @click="openDialog">Войти</v-btn>
        <v-menu v-else offset-y >
            <template v-slot:activator="{ on }">
                <v-btn color="white" size="50" v-on="on" outline v-if="user.firstName">
                    {{user.firstName}} {{user.lastName}}
                </v-btn>
            </template>
            <v-card>
                <v-list class="v-list-header">
                    <v-list-tile @click="logOut">
                        <v-list-tile-title>Sign out</v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-card>
        </v-menu>
        <v-badge
                class="ml-3"
                color="white"
                overlap
        >
            <template v-slot:badge>
                <span class="primary--text">1</span>
            </template>
            <v-btn class="ma-0 basket" text fab color="transparent">
                <v-icon color="white">fas fa-shopping-basket</v-icon>
            </v-btn>
        </v-badge>
    </v-toolbar>
</template>

<script>
import {EventBus} from './../event-bus.js'

export default {
    name: 'header-component',
    methods: {
        openDialog() {
            EventBus.$emit('open-dialog', true);
        },
        logOut() {
            this.API.UserService.logout()
                .then(() => {
                    this.$store.commit('SET_USER', null);
                    localStorage.removeItem('Backendless');
                });
        },
    },
    computed: {
        user() {
            return this.$store.getters.USER;
        }
    }
}
</script>

<style scoped lang="sass">
a
    text-decoration: none
.v-menu__content
    padding-top: 8px
.basket
    width: 40px
    height: 40px
    .v-icon
        font-size: 18px
</style>
