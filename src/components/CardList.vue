<template>
    <v-layout class="row wrap pt-5 pl-4 pr-4 pb-4" v-if="items">
        <v-flex xs4 v-for="item in items" :key="item.objectId" class="pl-2 pr-2 mb-3 d-flex">
            <v-card>
                <v-img :src="item.image" aspect-ratio="2.75"></v-img>
                <v-card-title class="d-flex" primary-title><p class="headline text-sm-left mb-0 mr-1">{{item.title}}</p><p class="headline text-sm-right mb-0 ml-1">{{item.price}}₴</p></v-card-title>
                <v-spacer></v-spacer>
                <v-card-text class="text-truncate text-sm-left">{{item.description}}</v-card-text>
                <card-actions :product="item"></card-actions>
                <v-layout class="justify-end">
                    <v-btn flat color="accent">Узнать больше</v-btn>
                </v-layout>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
import CardActions from './CardActions.vue'
export default {
    name: 'CardList',
    props: [ 'items' ],
    components: { CardActions },
}
</script>

<style scoped lang="sass">
.v-card
    display: flex
    flex-direction: column
    justify-content: flex-start
    width: 100%
    .v-image
        height: 250px
        max-height: 250px
</style>
