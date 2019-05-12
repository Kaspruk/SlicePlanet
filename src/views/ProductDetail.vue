<template>
    <v-container v-if="product">
        <v-layout class="mb-4">
            <v-flex xs6>
                <v-img class="product_image" aspect-ratio="1.4" :src="product.image" contain></v-img>
            </v-flex>
            <v-flex class="pl-5" xs6>
                <v-layout class="mb-4 justify-space-between align-center">
                    <p class="headline text-sm-left mb-0 mr-1">{{product.title}}</p>
                    <p class="headline text-sm-right mb-0 ml-1">{{product.price}}₴</p>
                </v-layout>
                <card-actions :product="product"></card-actions>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-card-text class="text-sm-left">{{product.description}}</v-card-text>
        </v-layout>
    </v-container>
</template>

<script>
import CardActions from '../components/CardActions.vue'
export default {
    name: 'product-page',
    components: { CardActions },
    data() {
        return {
            product: null,
        }
    },
    methods: {
        getCourse() {
            const queryBuilder = this.API.DataQueryBuilder.create().setWhereClause(`objectId='${this.$route.params.objectId}'`);
            this.API.Data.of('products').find(queryBuilder).then((res) => {
                this.product = res[0]
            });
        }
    },
    created() {
        this.getCourse()
    }
}
</script>

<style scoped lang="sass">
.product_image
    max-height: 50vh
    width: 100%
</style>
