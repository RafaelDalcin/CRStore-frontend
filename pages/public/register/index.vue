<template>
  <v-form v-model="valid">
    <v-container style="margin-top: 15%">
      <v-row justify="center">
        <v-col
          cols="6"
        >
          <v-text-field
            outlined
            v-model="user.username"
            :rules="rule"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="user.name"
            :rules="rule"
            label="Full Name"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="user.password"
            :rules="rule"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            outlined
            v-model="user.phone"
            :rules="rule"
            label="Phone"
            required
          ></v-text-field>
          <v-btn
          outlined
          @click="register"
          >
          Cadastrar
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  layout: 'register',
  name: 'UsersRegisterPage',

  data () {
    return {

      valid: false,

      user: {
        username: null,
        name: null,
        password: null,
        phone: null,
      },

      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
    }
  },

  methods: {
  async register () {
    try {
       if (!this.valid) {
          return this.$toast.warning('Preencha todos os campos obrigatórios')
        }

      let user = {
        username: this.user.username,
        name: this.user.name,
        password: this.user.password,
        phone: this.user.phone
      }

      await this.$api.post('http://localhost:5555/users/register', user);
      this.$toast.success('Cadastro realizado com sucesso!');
      return this.$router.push('/public/login/');
      
      } catch (error) {
      this.$toast.error('Ocorreu um erro ao realizar o login!');
      }
    }
  }
}
</script>

<style>

</style>