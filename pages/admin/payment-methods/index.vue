<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-btn
            style=""
            large
            color="primary"
            @click="getPaymentMethods"
            >
            Atualizar
          </v-btn>
           <v-btn
            style=""
            large
            color="success"
            @click="getPaymentMethods"
            to="/admin/payment-methods/register"
            >
            Cadastrar
          </v-btn>  
            <v-card-title>
              Métodos de Pagamento
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
              :items="paymentMethods"
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
  name: 'PaymentMethodsAdminPage',
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
          text: 'Método de Pagamento',
          align: 'center',
          sortable: 'false',
          value: 'name',
        },
        { text: "", value: "actions" }
      ],
      paymentMethods: []
    }
  },

  created () { //executado toda vez que a pagina é carregada
    this.getPaymentMethods();
  },

  methods: {
    async getPaymentMethods () {
      let response = await this.$api.get('http://localhost:5555/payment-method');
      this.paymentMethods = response.data;
      console.log(this.paymentMethods);
    },
    async deletar (paymentMethod) {
      try {
        if (confirm(`Deseja deletar o método de pagamento ${paymentMethod.name} ID - ${paymentMethod.id}`)) {
          let response = await this.$api.post('http://localhost:5555/payment-method/destroy', { id: paymentMethod.id });
          this.$toast.success(response.message);
          this.getPaymentMethods();
        }
        
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async editar (paymentMethod) {
      this.$router.push({
        name: 'admin-registerPaymentMethods',
        params: { id: paymentMethod.id },
      });
    }

  }
}
</script>
