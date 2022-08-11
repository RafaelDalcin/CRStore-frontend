<template>
  <v-container>
    <v-container style="margin:auto">
      <template>
        <v-row>
          <v-dialog
            v-model="dialog"
            persistent
            max-width="600px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="success"
                dark
                fab
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
            <v-card v-model="valid">
              <v-card-title>
                <span class="text-h5">Cadastro de Endereço</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        label="CEP"
                        :rules="rule"
                        v-model="addresses.zipcode"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        label="UF"
                        required
                        :rules="rule"
                        v-model="addresses.uf"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Logradouro"
                        required
                        :rules="rule"
                        v-model="addresses.address"
                      />
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Cidade"
                        required
                        :rules="rule"
                        v-model="addresses.city"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="dialog = false"
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="cadastrar()"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>  
      </template>
    </v-container>
    <v-container style="width: 100%;">
      <v-row v-for="(address, i) in address" :key="i">
        <v-col>
          <v-card shaped>
            <v-card-title>Endereço {{i+1}}</v-card-title>
              <v-card-text style="font-size: medium; ">
                {{address.address}}, {{address.uf}} 
              </v-card-text>
              <v-container>
                <v-card-action>
                  <v-btn @click="excluir(address.id)" class="mr-2" color="red">
                    Excluir
                    </v-btn>
                </v-card-action>
              </v-container>
            </v-card>
        </v-col>
      </v-row>  
    </v-container>
  </v-container>
</template>

<script>

export default {
  layout: 'users',
  data () {
    return {
      addresses: {
        id:null,
        city: null,
        uf: null,
        address: null,
        zipcode: null
      },

      valid: false,
      dialog: false,
      address: [],

      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ]

    }

  },

  created () {
    this.getAddresses();
  },

  methods: {
    async getAddresses() {
      let response = await this.$api.get('/addresses');
      console.log(response)
      this.address = response.data
    },

    async excluir (address) {
      try {
        if (confirm(`Deseja deletar este endereço?`)) {
          let response = await this.$api.post('addresses/destroy', { id: address });
          this.$toast.success(response.message);
          this.getAddresses();
        }
        
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao deletar o registro');
      }
    },
    
    async cadastrar () {

      try {
        //primeiro valida-se se o formulário está preenchido
        if (!this.valid) {
          return this.$toast.warning('Preencha todos os campos obrigatórios')
        }
        //montamos a variárel categoria para enviar nos posts
        let addresses = {
          city: this.addresses.city,
          address: this.addresses.address,
          uf: this.addresses.uf,
          zipcode: this.addresses.zipcode,
        };

        let id = this.addresses.id || '';
        await this.$api.post(`/addresses/persist/${id}`, addresses);
        this.$toast.success('Cadastro realizado com sucesso!');
        this.dialog = false;
        this.getAddresses()
        
      } catch (error) {
        console.log(error.message);
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },
  }
}


</script>

<style>

</style>