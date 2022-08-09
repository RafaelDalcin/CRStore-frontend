<template>
  <v-container>
    <v-container style="display: flex; width: 50%">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Endereços</v-card-title>
              <v-card-text>{{addresses[0].address}}</v-card-text>
                <v-container>
                  <v-card-action>
                    <v-btn>Excluir</v-btn>
                    <v-btn>Editar</v-btn>
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
      
      addresses: []
      
    }
  },

  created () {
    this.getAddresses();
  },

  methods: {
    async getAddresses() {
      this.addresses = await this.$api.$post('/addresses/user').then((res => res.data)) ;
      
      
    }
  }
}
</script>

<style>

</style>