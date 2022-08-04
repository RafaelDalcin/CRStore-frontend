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
          <v-btn
            large
            color="success"
            @click="getItems"
            to="/admin/registerItems"
            >
            Cadastrar
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
            <template v-slot:item.actions="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editar(item)"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                small
                @click="deletar(item)"
              >
                mdi-delete
              </v-icon>
            </template>
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
        { text: "", value: "actions" }
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
    },

    async deletar (item) {
      try {
        if (confirm(`Deseja deletar o item ${item.category.name} ID - ${item.id}`)) {
          let response = await this.$axios.$post('http://localhost:5555/items/destroy', { id: item.id });
          this.$toast.success(response.message);
          this.getItems();
        }
        
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async editar (item) {
      this.$router.push({
        name: 'admin-registerItems',
        params: { id: item.id },
      });
    }

  }
}
</script>
