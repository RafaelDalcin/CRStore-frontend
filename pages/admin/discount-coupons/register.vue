<template>
  <v-container>
    <h1>Cadastro de Cupons</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="2"
            >
              <v-text-field
                v-model="discountCoupon.id"
                placeholder="ID"
                label="ID"
                disabled
                outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="5"
          >
            <v-text-field
              v-model="discountCoupon.discountCode"
              placeholder="Código do desconto"
              label="Código do desconto"
              outlined
              :rules="rule"
            />
          </v-col>
          <v-col
            cols="5"
          >
            <v-text-field
              v-model="discountCoupon.discountValue"
              placeholder="Valor do desconto"
              label="Valor do desconto"
              outlined
              :rules="rule"
            />
          </v-col>
            <v-col
              cols="5"
            >
                <v-text-field
                  v-model="discountCoupon.discountType"
                  placeholder="Tipo de desconto"
                  label="Tipo de desconto"
                  outlined
                  :rules="rule"
                />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  <v-container>
      <v-btn
        color="success"
        large
        @click="persist"
      >
        Save
      </v-btn>
      <v-btn
        color="error"
        large
        to="/admin/discount-coupons/"
      >
        Cancel
      </v-btn>  
    </v-container>
  </v-container>
</template>

<script>
export default {

  name: 'RegisterDiscountCouponsPage',
  layout: 'admin',
  data () {
    
    return {
      valid: false,
      discountCoupon: {
        id: null,
        discountCode: null,
        discountValue: null,
        discountType: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],

    }
  },
  created () {
    if (this.$route?.params?.id) {
      this.getById(this.$route.params.id)
    }
  },

  methods: {
    async persist () {
      try {
        //primeiro valida-se se o formulário está preenchido
        if (!this.valid) {
          return this.$toast.warning('Preencha todos os campos obrigatórios')
        }


        let discountCoupon = {
          id: this.discountCoupon.id,
          discountCode: this.discountCoupon.discountCode,
          discountValue: this.discountCoupon.discountValue,
          discountType: this.discountCoupon.discountType
        };

        if (!this.discountCoupon.id) {
          await this.$axios.$post('http://localhost:5555/discountCoupons/persist', discountCoupon);
          this.$toast.success('Cadastro realizado com sucesso!');
          return this.$router.push('/admin/discount-coupons/');
        }
        await this.$axios.$post(`http://localhost:5555/discountCoupons/persist`, discountCoupon);
        this.$toast.success('Cadastro atualizado com sucesso!');
        return this.$router.push('/admin/discount-coupons/');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },

    async getById (id) {
      let response = await this.$axios.$get(`http://localhost:5555/discountCoupons/${id}` );
      
      this.discountCoupon = response.data
      
    },
    
  }
}
</script>
