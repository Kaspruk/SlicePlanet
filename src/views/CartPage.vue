<template>
    <v-container>
        <v-layout>
            <v-flex class="pr-3" xs9>
                <v-layout class="column">
                    <v-flex v-for="item in cartItems" :key="item.objectId" class="mb-3 carts-item" xs12>
                        <v-card class="pa-2 d-flex">
                            <v-flex xs4>
                                <v-img :src="item.image" aspect-ratio="2.75"></v-img>
                            </v-flex>
                            <v-flex class="v-card--description pl-2" xs8>
                                <v-card-title class="d-flex" primary-title><p class="headline text-sm-left mb-0 mr-1">{{item.title}}</p><p class="headline text-sm-right mb-0 ml-1">{{item.price}}₴</p></v-card-title>
                                <card-actions :product="item"></card-actions>
                                <v-spacer></v-spacer>
                                <v-layout class="justify-space-between">
                                    <v-btn flat color="accent">Узнать больше</v-btn>
                                    <v-btn flat color="danger" @click="deleteItem(item.objectId)">Удалить элемент</v-btn>
                                </v-layout>
                            </v-flex>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs3>
                <v-card class="carts-item-sum">
                    <v-flex class="pa-3">
                        <p class="headline text-sm-center mb-0 mr-1">Общая сума: {{itemsSum}}₴</p>
                        <v-divider class="my-4"></v-divider>
                        <v-btn class="accent" @click="deleteAllItem()">Очистить корзину</v-btn>
                    </v-flex>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import CardActions from '../components/CardActions.vue'
export default {
    name: 'cart-page',
    components: { CardActions },
    data() {
        return {
            itemsSum: 0
        }
    },
    methods: {
        getSum(val) {
            this.itemsSum = 0;
            _.forEach(val, (p) => {
                this.itemsSum += (+p.price * p.count);
            })
        },
        deleteItem(itemId) {
            const local = _.reject(this.cartItems, { objectId: itemId });
            this.$store.commit('SET_USER_CART', local);
        },
        deleteAllItem() {
            this.$store.commit('SET_USER_CART', []);
            localStorage.removeItem('localCart');
        }
    },
    computed: {
        cartItems() {
            return this.$store.getters.USER_CART
        }
    },
    watch: {
        cartItems(val) {
            if(val) this.getSum(val)
        },
    },
    created() {
        this.getSum(this.$store.getters.USER_CART)
    }
}
</script>

<style scoped lang="sass">
.carts-item
    min-height: 230px
    .v-card
        height: 100%
    &:last-child
        margin-bottom: 0 !important
    .v-image
        height: 100%
    .v-card--description
        display: flex
        flex-direction: column
        flex-wrap: wrap
.carts-item-sum
    height: 100%
    position: relative
    .flex
        position: sticky
        bottom: 10px

</style>
