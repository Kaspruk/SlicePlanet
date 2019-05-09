<template>
    <section class="d-flex" v-if="categories">
        <v-flex class="sidebar" xs2>
            <v-navigation-drawer dark>
                <div class="pa-4">
                    <p class="subheading font-weight-bold text-sm-left white--text">Выберите категорию:</p>
                    <v-select
                            :items="categories"
                            label="Категории"
                            item-text="title"
                            item-value="objectId"
                            v-model="categoriesSelect"
                            @change="changeCategory('category', $event.objectId)"
                            return-object>
                    </v-select>
                </div>
                <v-divider></v-divider>
                <div v-if="categoriesSelect && categoriesSelect.manufactures_filter" class="pa-4">
                    <p class="subheading font-weight-bold text-sm-left white--text">Выберите производителя:</p>
                    <v-checkbox
                            label="Все производители"
                            @change="updateQuery('manufacture', null); manufacturesValue = []"
                            hide-details>
                    </v-checkbox>
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
                    } else if(!_.isArray(value) && value.length){
                        whereClause.push(`${key}='${value}'`);
                    }
                });
                whereClause = whereClause.join(' and ');
                queryBuilder.setWhereClause(whereClause);
            }
            this.API.Data.of('products').find(queryBuilder.setPageSize(30)).then((res) => {
                this.products = res
            });
        },
        setCurrentCategory() {
            [this.categoriesSelect] = _.filter(this.categories, (c) => {
                return c.objectId === this.$route.query.category
            });
            this.setCurrentManufacture()
        },
        setCurrentManufacture() {
            if (this.categoriesSelect) {
                this.manufacturesValue = _.map(_.filter(this.categoriesSelect.manufactures_filter, (f) => {
                    if (_.isArray(this.$route.query.manufacture)) {
                        return _.find(this.$route.query.manufacture, (m) => {
                            return m === f.objectId
                        })
                    } else if(!_.isArray(this.$route.query.manufacture)) {
                        return f.objectId === this.$route.query.manufacture
                    }
                }), c => c.objectId);
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
            return this.$store.getters.CATEGORIES;
        }
    },
    watch: {
        categories() {
            console.log('create');
            this.setCurrentCategory();
        }
    },
    created() {
        this.getProducts();
        this.setCurrentCategory();
    }
}
</script>

<style scoped lang="sass">
    section
        height: 100%
    .sidebar
        height: 100%
        background-color: #424242
    .v-navigation-drawer
        height: auto !important
        position: sticky
</style>
