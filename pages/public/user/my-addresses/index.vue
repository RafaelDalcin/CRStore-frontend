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
                ></v-text-field>
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
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Logradouro"
                  required
                  :rules="rule"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Cidade"
                  type="password"
                  required
                  :rules="rule"
                ></v-text-field>
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
            @click="dialog = false"
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
          <v-row v-for="(address, i) in addresses" :key="i">
            <v-col>
              <v-card color="white" shaped>
                <v-card-title style="color:black;">Endereço {{i+1}}</v-card-title>
                  <v-card-text style="font-size: medium; color: black">{{addresses[i].address}}, {{addresses[i].city}}</v-card-text>
                    <v-container>
                      <v-card-action>
                          <v-btn @click="excluir(address.id)" class="mr-2" color="red">Excluir</v-btn>
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

      valid: false,
      dialog: false,
      addresses: [],

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
      this.addresses = await this.$api.get('/addresses/get').then((res => res.data));
      console.log(this.addresses);
    },
    // async excluir (address) {
    //   try {
    //     if (confirm(`Deseja deletar este endereço?`)) {
    //       let response = await this.$api.$post('addresses/destroy', { id: address });
    //       this.$toast.success(response.message);
    //       this.getAddresses();
    //     }
        
    //   } catch (error) {
    //     this.$toast.error('Ocorreu um erro ao deletar o registro');
    //   }
    // },
  }
}

</script>

<style>

</style>