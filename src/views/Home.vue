<template>
  <v-container class="home" v-if="categories.length">
    <div class="d-block mb-5" v-for="category in categories" :key="category.objectId">
      <v-layout class="row align-center">
        <span class="headline font-weight-medium">{{category.name}}</span>
        <v-spacer></v-spacer>
        <router-link :to="{ name: 'catalog', query: { category: category.objectId } }" class="title text--accent">Смотреть все товары</router-link>
      </v-layout>
      <v-divider class="mt-2 mb-3"></v-divider>
      <card-list :items="category.products"></card-list>
    </div>
  </v-container>
</template>

<script>
import CardList from '../components/CardList.vue'

export default {
  name: 'home',
  components: { CardList },
  data(){
    return {
      categories: [],
      product: [],
    }
  },
  methods: {
    getCategories() {
      this.API.Data.of('categories').find(this.dataQueryBuilderSort).then((res) => {
        this.categories = _.map(res, (r) => {
        this.getProductsByCategories(r.objectId);
        return {
            objectId: r.objectId,
            name: r.title,
            products: []
          };
        });
      })
    },
    getProductsByCategories(categoryId) {
      const queryBuilder = this.API.DataQueryBuilder.create().setWhereClause(`category='${categoryId}'`).setPageSize(3);
      this.API.Data.of('products').find(queryBuilder).then((res) => {
        _.find(this.categories, {objectId: categoryId}).products = res
      });
    }
  },
  created() {
    this.getCategories()
  },
}
</script>
