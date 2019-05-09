<template>
    <section class="d-flex">
        <v-flex xs2>
            <v-navigation-drawer dark>
                <div class="pa-4">
                    <p class="subheading font-weight-bold text-sm-left white--text">Выберите категорию:</p>
                    <v-select
                            :items="categories"
                            label="Категории"
                            item-text="title"
                            item-value="objectId"
                            v-model="categoriesSelect"
                            @change="changeCategory('category', categoriesSelect.objectId)"
                            return-object>
                    </v-select>
                </div>
                <v-divider></v-divider>
                <div v-if="categoriesSelect && categoriesSelect.manufactures_filter" class="pa-4">
                    <p class="subheading font-weight-bold text-sm-left white--text">Выберите производителя:</p>
                    <v-flex v-for="filter in categoriesSelect.manufactures_filter" :key="filter.objectId" >
                        <v-checkbox
                                v-model="manufacturesValue"
                                :label="filter.name"
                                :value="filter.objectId"
                                @change="updateQuery('manufacture', manufacturesValue)"
                                hide-details>
                        </v-checkbox>
                    </v-flex>
                </div>
            </v-navigation-drawer>
        </v-flex>
        <v-flex v-if="products" class="pl-4" xs10>
            <card-list :items="products"></card-list>
        </v-flex>
    </section>
</template>

<script>
    import CardList from '../components/CardList.vue'

    export default {
        name: 'catalog',
        components: {CardList},
        data() {
            return {
                categoriesSelect: null,
                manufacturesValue: [],
                products: null,
            }
        },
        methods: {
            getProducts() {
                const queryBuilder = this.API.DataQueryBuilder.create();
                let whereClause = [];
                if (!_.isEmpty(this.$route.query)) {
                    _.forEach(this.$route.query, (value, key) => {
                        if(_.isArray(value) && value.length) {
                            whereClause.push(`${key} IN ('${value.join("', '")}')`);
                        } else if(value.length){
                            whereClause.push(`${key}='${value}'`);
                        }
                    });
                    whereClause = whereClause.join(' and ');
                    queryBuilder.setWhereClause(whereClause).setPageSize(50);
                }
                this.API.Data.of('products').find(queryBuilder).then((res) => {
                    this.products = res;
                });
            },
            setCurrentCategory() {
                [this.categoriesSelect] = _.filter(this.categories, (c) => {
                    return c.objectId === this.$route.query.category
                });
                this.setCurrentManufacture()
            },
            setCurrentManufacture() {
                if(this.categoriesSelect){
                    this.manufacturesValue = _.map(_.forEach(this.$route.query.manufacture, (f) => {
                        return _.filter(this.categoriesSelect.manufactures_filter, (m) => {
                            return f.objectId === m.manufacture;
                        })
                    }),v => v.objectId);
                }
            },
            changeCategory(name, value) {
                this.manufacturesValue = [];
                delete this.$route.query.manufacture;
                this.updateQuery(name, value)
            },
            updateQuery (name, value) {
                let query = this.$route.query;
                if(value){
                    query = {
                        ...this.$route.query,
                        [name]: value
                    }
                } else {
                    delete query[name];
                }
                this.$router.replace({query});
                this.getProducts();
            }
        },
        computed: {
            categories() {
                let arr;
                if (this.$store.getters.CATEGORIES) {
                    arr = this.$store.getters.CATEGORIES;
                    arr.unshift({
                        objectId: null,
                        title: 'Все товары',
                    });
                }
                return arr;
            }
        },
        watch: {
            categories() {
                this.setCurrentCategory();
            },
        },
        created() {
            this.getProducts();
        },
    }
</script>

<style scoped lang="sass">
    section
        height: 100%
    .v-navigation-drawer
        height: 100%
</style>
