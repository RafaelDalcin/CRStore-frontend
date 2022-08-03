<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-btn
            style=""
            large
            color="primary"
            @click="getCategories"
            >
            Atualizar
          </v-btn>
           <v-btn
            style=""
            large
            color="success"
            @click="getCategories"
            to="/admin/registerCategories"
            >
            Cadastrar
          </v-btn>  
            <v-card-title>
              Categorias
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
              :items="categories"
            >
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CategoriesAdminPage',

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
          text: 'Category',
          align: 'center',
          sortable: 'false',
          value: 'name',
        },
      ],
      categories: []
    }
  },

  created () { //executado toda vez que a pagina é carregada
    this.getCategories()
  },

  methods: {
        async getCategories () {
      let response = await this.$axios.$get('http://localhost:5555/categories');
      this.categories = response.data
    },
  }
}
</script>
}

</script>

<style>

</style>