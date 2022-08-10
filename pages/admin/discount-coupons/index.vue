<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-btn
            style=""
            large
            color="primary"
            @click="getDiscountCoupons"
            >
            Atualizar
          </v-btn>
           <v-btn
            style=""
            large
            color="success"
            @click="getDiscountCoupons"
            to="/admin/discount-coupons/register"
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
              :items="discountCoupons"
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
  name: 'DiscountCouponsAdminPage',
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
          text: 'Código de desconto',
          align: 'center',
          sortable: 'false',
          value: 'discountCode',
        },
        {
          text: 'Valor do desconto',
          align: 'center',
          sortable: 'false',
          value: 'discountValue',
        },
        {
          text: 'Tipo de desconto',
          align: 'center',
          sortable: 'false',
          value: 'discountType',
        },
        { text: "", value: "actions" }
      ],
      discountCoupons: []
    }
  },

  created () { //executado toda vez que a pagina é carregada
    this.getDiscountCoupons();
  },

  methods: {
    async getDiscountCoupons () {
      let response = await this.$axios.$get('http://localhost:5555/discountCoupons');
      this.discountCoupons = response.data;
    },
    async deletar (discountCoupon) {
      try {
        if (confirm(`Deseja deletar o cupom ${discountCoupon.discountCode} ID - ${discountCoupon.id}`)) {
          let response = await this.$axios.$post('http://localhost:5555/discountCoupons/destroy', { id: discountCoupon.id });
          this.$toast.success(response.message);
          this.getDiscountCoupons();
        }
        
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },

    async editar (discountCoupon) {
      this.$router.push({
        name: 'admin-registerDiscountCoupons',
        params: { id: discountCoupon.id },
      });
    }

  }
}
</script>
