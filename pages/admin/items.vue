<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-btn
            style=""
            large
            color="primary"
            @click="getItems"
            >
            Atualizar
          </v-btn>
            <v-card-title>
              Items
              <v-spacer></v-spacer>
              <v-text-field
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                >
              </v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers"
              :items="items"
            >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AdminItemsPage',

  data () {
    return {
      headers: [
        {
          text: 'Código',
          align: 'center',
          sortable: 'false',
          value: 'id',
        },
        {
          text: 'Item',
          align: 'center',
          sortable: 'false',
          value: 'name',
        },
        {
          text: 'Category',
          align: 'center',
          sortable: 'false',
          value: 'category.name',
        },
        {
          text: 'Amount',
          align: 'center',
          sortable: 'false',
          value: 'amount',
        },
        {
          text: 'Price',
          align: 'center',
          sortable: 'false',
          value: 'price',
        },
      ],
      items: [],  
      categories: []
    }
  },

  created () { //executado toda vez que a pagina é carregada
    this.getItems()
  },

  methods: {
    async getItems () {
      let response = await this.$axios.$get('http://localhost:5555/items');
      this.items = response.data
      
      
    },
        async getCategories () {
      let response = await this.$axios.$get('http://localhost:5555/categories');
      this.categories = response.data
      console.log(response.data);
    },
  }
}
</script>
