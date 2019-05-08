<template>
  <v-app class="mt-0">
    <header-component></header-component>
    <v-container class="pa-0" fluid>
      <router-view/>
    </v-container>
  </v-app>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<script>
import headerComponent from '@/components/HeaderComponent.vue'

export default{
  components: { headerComponent },
  created() {
    this.API.Data.of('categories').find(this.dataQueryBuilderSort).then((result) => {
        this.$store.commit('SET_CATEGORIES', result)
      });
  },
}
</script>
