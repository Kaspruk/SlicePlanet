<template>
  <v-app class="mt-0">
    <header-component></header-component>
    <v-container class="pa-0" fluid>
      <router-view/>
    </v-container>
    <footer-component></footer-component>
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
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

export default{
  components: { HeaderComponent, FooterComponent },
  created() {
    this.API.Data.of('categories').find(this.dataQueryBuilderSort).then((result) => {
      const arr = result;
      arr.unshift({
        objectId: null,
        title: 'Все товары',
      });
      this.$store.commit('SET_CATEGORIES', arr)
    });
    this.$store.dispatch('GET_USER_CART_FROM_LOCALSTORAGE');
    const cache = this.API.LocalCache.getAll();
    if (cache.stayLoggedIn) {
      if (this.API.UserService.isValidLogin()) {
        this.API.UserService.getCurrentUser().then((user) => {
          this.$store.commit('SET_USER', user);
        });
      } else {
        this.API.LocalCache.clear();
      }
    }
  },
}
</script>
