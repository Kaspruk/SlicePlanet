<template>
    <v-card-actions>
        <v-layout class="align-center">
            <v-text-field
                    v-model="countItem"
                    class="mt-0 pt-0 pr-2"
                    min="1"
                    hide-details
                    single-line
                    type="number"
            ></v-text-field>
            <v-btn
                    flat class="ml-2"
                    color="primary"
                    @click="addItemToCart">
                <span v-if="this.$route.name === 'cart-page'">Изменить количество</span>
                <span v-else>Добавить в корзину</span>
            </v-btn>
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
                this.product.count = +this.countItem;
                const vuexAction = (this.$route.name === 'cart-page') ? 'CHANGE_PRODUCT_COUNT' : 'ADD_PRODUCT_TO_CART';
                this.$store.dispatch(vuexAction, this.product);
            },
        },
        created() {
            if(this.product.count){
                this.countItem = this.product.count
            }
        }
    }
</script>

<style scoped>

</style>
