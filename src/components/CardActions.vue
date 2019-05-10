<template>
    <v-card-actions>
        <v-layout class="align-center">
            <v-text-field
                    v-model="countItem"
                    class="mt-0 pt-0 pr-2"
                    hide-details
                    single-line
                    type="number"
            ></v-text-field>
            <v-btn flat class="ml-2" color="primary" @click="addItemToCart">Добавить в корзну</v-btn>
        </v-layout>
    </v-card-actions>
</template>

<script>
    export default {
        name: 'card-actions',
        props: ['product'],
        data() {
            return{
                countItem: 1
            }
        },
        methods: {
            addItemToCart() {
                this.product.count = this.countItem;
                this.$store.dispatch('ADD_PRODUCT_TO_CART', this.product);
            }
        },
    }
</script>

<style scoped>

</style>
