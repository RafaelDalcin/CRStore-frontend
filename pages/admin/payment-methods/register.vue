<template>
  <v-container>
    <h1>Cadastro de Métodos de Pagamento</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="2"
          >
            <v-text-field
              v-model="paymentMethod.id"
              placeholder="ID"
              label="ID"
              disabled
              outlined  
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="paymentMethod.name"
              placeholder="Name"
              label="Name"
              required
              :rules="rule"
              outlined
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-container>
      <v-btn
        color="success"
        style="float: right;"
        large
        @click="persist"
      >
      Save
      </v-btn>
      <v-btn
        color="error"
        large
        to="/admin/payment-methods"
      >
        Cancel
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterPaymentMethodsPage',
  layout: 'admin',
  data () {
    return {
      valid: false,
      paymentMethod: {
        id: null,
        name: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ]
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
        //montamos a variárel categoria para enviar nos posts
        let paymentMethod = {
          id: this.paymentMethod.id,
          name: this.paymentMethod.name,
        };
        //caso não tenha ID na tela, significa que é um cadastro NOVO
        //por isso ele vai apenas com o objeto da categoria para o cadastro
        //como no final tem um RETURN, ele vai cair fora da função PERSISTIR
        if (!this.paymentMethod.id) {
          await this.$api.post('http://localhost:5555/payment-method/persist', paymentMethod);
          this.$toast.success('Cadastro realizado com sucesso!');
          return this.$router.push('/admin/payment-methods/');
        }
        await this.$api.post(`http://localhost:5555/payment-method/persist`, paymentMethod);
        this.$toast.success('Cadastro atualizado com sucesso!');
        return this.$router.push('/admin/payment-methods/');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },
    async getById (id) {
      let response = await this.$api.get(`http://localhost:5555/payment-method/${id}`);
      this.paymentMethod = response.data
    }
  }
}
</script>