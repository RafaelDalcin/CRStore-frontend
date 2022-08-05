<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-btn
            large
            color="primary"
            @click="getAdresses"
            >
            Atualizar
          </v-btn>
           <v-btn
            large
            color="success"
            @click="getAdresses"
            to="/admin/registerAdresses"
            >
            Cadastrar
          </v-btn>  
            <v-card-title>
              Endereços
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
              :items="addresses"
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
  name: 'AdressesAdminPage',

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
          text: 'CEP',
          align: 'center',
          sortable: 'false',
          value: 'zipcode',
        },
                {
          text: 'Estado',
          align: 'center',
          sortable: 'false',
          value: 'uf',
        },
        {
          text: 'Cidade',
          align: 'center',
          sortable: 'false',
          value: 'city',
        },
        {
          text: 'Logradouro',
          align: 'center',
          sortable: 'false',
          value: 'address',
        },
        { text: "", value: "actions" }
      ],
      addresses: []
    }
  },

  created () { //executado toda vez que a pagina é carregada
    this.getAdresses();
  },

  methods: {
    async getAdresses () {
      let response = await this.$axios.$get('http://localhost:5555/addresses');
      this.addresses = response.data;
    },
    async deletar (address) {
      try {
        if (confirm(`Deseja deletar o endereço ${address.address} ID - ${address.id}`)) {
          let response = await this.$axios.$post('http://localhost:5555/addresses/destroy', { id: address.id });
          this.$toast.success(response.message);
          this.getAdresses();
        }
        
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async editar (address) {
      this.$router.push({
        name: 'admin-registerAddresses',
        params: { id: address.id },
      });
    }

  }
}
</script>
