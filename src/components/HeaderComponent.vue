<template>
    <v-toolbar dark color="primary">
        <v-toolbar-title><router-link :to="{ name: 'home' }" class="white--text">Мой интернет магазин</router-link></v-toolbar-title>
        <v-spacer></v-spacer>
    </v-toolbar>
</template>

<script>
export default {
  name: 'header-component'
}
</script>

<style scoped lang="sass">
a
    text-decoration: none
</style>
