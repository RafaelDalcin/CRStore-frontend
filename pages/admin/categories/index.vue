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
            to="/admin/categories/register"
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
  name: 'CategoriesAdminPage',
  layout: 'admin',

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
        { text: "", value: "actions" }
      ],
      categories: []
    }
  },

  created () { //executado toda vez que a pagina é carregada
    this.getCategories();
  },

  methods: {
    async getCategories () {
      let response = await this.$axios.$get('http://localhost:5555/categories');
      this.categories = response.data;
    },
    async deletar (category) {
      try {
        if (confirm(`Deseja deletar a categoria ${category.name} ID - ${category.id}`)) {
          let response = await this.$axios.$post('http://localhost:5555/categories/destroy', { id: category.id });
          this.$toast.success(response.message);
          this.getCategories();
        }
        
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async editar (category) {
      this.$router.push({
        name: 'admin-registerCategories',
        params: { id: category.id },
      });
    }

  }
}
</script>
