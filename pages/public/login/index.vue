<template>
  <v-container style="padding: 10%;">
  <v-container style="margin-left: -55%; width: 100%">
      <v-row style="margin-left: 32%; margin-top: 5%;">
        <h1>Bem-vindo a <v-span style="color: rgb(42, 114, 201)">CRStore</v-span>, primeira vez por aqui? Cadastre-se para continuar</h1>
      </v-row>
      <v-row style="margin-left: 32%; margin-top: 5%">
          <v-btn
            color="blue"
            depressed
            elevation="7"
            large
            to="/public/register/"
          >
            Cadastre-se aqui
        </v-btn>
      </v-row>
  </v-container>
  <v-form v-model="valid">
    <v-container style="margin-left: 40%;">
        <v-col
          style="margin-left: 20%; margin-top: -5%;"
          cols="7"
        >
          <v-text-field
            v-model="user.username"
            color="blue"
            outlined
            label="Username"
            prepend-inner-icon="mdi-account"
            :rules="rule"
            required
          >
          </v-text-field>
          <v-text-field
            :append-icon="show? 'mdi-eye' : 'mdi-eye-off'"
            v-model="user.password"
            color="blue"
            outlined
            label="Password"
            prepend-inner-icon="mdi-lock"
            :rules="rule"
            required
            @click:append="show = !show"
            :type="show ? 'text' : 'password'"
          >
        </v-text-field>
          <v-btn
            @click="login"
            color="blue"
            depressed
            elevation="7"
            large
          >
            Entrar
          </v-btn>
        </v-col>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
export default {
  layout: 'login',
  name: 'LoginPage',
  
  data () {
    return {
      show: false,
      valid: false,
      user: {
        username: null,
        password: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
    }
  },

  methods: {
    async login () {
      try {
        if (!this.valid) {
          return this.$toast.warning('Preencha todos os campos obrigatórios')
        }

        let response = await this.$api.$post(`http://localhost:5555/users/login/`, this.user);
        let token = response.token;
        let role = response.userRole;

        if (!token) {
          return this.$toast.warning('O token é inválido')
        } else {

          if (role === 'customer') {
            localStorage.setItem('crstore-api-token', token);
            this.$toast.success(response.message);
            return this.$router.push('/public/user/');
          }
          else if (role === 'admin') {
            localStorage.setItem('crstore-api-token', token);
            this.$toast.success(response.message);
            return this.$router.push('/admin/');
          }
          else if (role === 'deliveryman') {
            localStorage.setItem('crstore-api-token', token);
            this.$toast.success(response.message);
            return this.$router.push('/public/deliveryman/');
          }
        } 

      } catch (error) { 
        this.$toast.error('Ocorreu um erro ao realizar o login!');
      }
    },
  }
}
  
</script>
