<template>
  <v-container style="background-color:#ec8a29">
    <v-row>
        <v-card
          v-for="item in items" :key="item.id"
          class="mx-auto"
          max-width="400"
          style="background-color: orange; margin-bottom: 5%; margin-top: 5%;"
          >
          <v-img
            class="white--text align-end"
            height="200px"
            :src="item.image"
            style="opacity: "
          >
          </v-img>
        <v-card-title style="color: black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">{{item.name}}</v-card-title>
        <v-card-title> R$ {{item.price}} </v-card-title>
        <v-card-actions>
          <template>
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
                    small
                    class="mx-2"
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
                <span class="text-h5">Seu pedido</span>
                  </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            cols="12"
                            sm="6"
                            md="4"
                          >
                          <v-select
                            :items="items"
                            label="Outlined style"
                            outlined
                            :rules="rule"
                            required
                            >
                            </v-select>
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
                          outlined
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Logradouro"
                          required
                          :rules="rule"
                          outlined
                        />
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          label="Cidade"
                          required
                          :rules="rule"
                          outlined
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
          </template>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'UserPage',
  layout: 'users',

  data () {
    return {

      items: [],
      addresses: [],
      dialog: false,
      valid: false,


      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ]
    }
  },

  created () {
    this.getItems();
    this.getAddresses();
  },

  methods: {
    async getItems () {
      let response = await this.$api.get('items/');
      this.items = response.data;
    },
    async getAddresses () {
      let response = await this.$api.get('addresses/');
      this.addresses = response.data;
    },
  }
}


</script>

<style>

</style>