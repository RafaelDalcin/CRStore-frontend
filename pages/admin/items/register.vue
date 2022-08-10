<template>
  <v-container>
    <h1>Cadastro de Itens</h1>
    <hr>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col
            cols="2"
          >
            <v-text-field
              v-model="item.id"
              placeholder="ID"
              label="ID"
              disabled
              outlined
            />
          </v-col>
        </v-row>
        <v-row
        cols="2"
        >
          <v-col>
            <v-text-field
              v-model="item.price"
              placeholder="Price"
              label="Price"
              required
              :rules="rule"
              outlined
            />
            <v-text-field
              v-model="item.amount"
              placeholder="Amount"
              label="Amount"
              required
              :rules="rule"
              outlined
            />
          </v-col>
          <v-col>
            <v-text-field
              v-model="item.name"
              placeholder="Name"
              label="Name"
              required
              :rules="rule"
              outlined
            />
            </v-col>
            <v-col
              cols="3"
            >
              <v-autocomplete
                v-model="item.idCategory"
                :items="categories"
                outlined
                label="Items"
                item-text="name"
                item-value="id"
                required
                :rules="rule"
              ></v-autocomplete>
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
        to="/admin/items/"
      >
        Cancel
      </v-btn>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: 'RegisterItemsPage',
  layout: 'admin',
  
  data () {
    return {
      valid: false,
      item: {
        id: null,
        name: null,
        price: null,
        amount: null,
        idCategory: null
      },
      rule: [
        v => !!v || 'Esse campo é obrigatório'
      ],
      categories: [],
      items: [],
    }
  },
  created () {
    if (this.$route?.params?.id) {
      this.getById(this.$route.params.id)
    }
    this.getCategories();
    this.getItems() ;
  },

  methods: {
    async persist () {
      try {
        //primeiro valida-se se o formulário está preenchido
        if (!this.valid) {
          return this.$toast.warning('Preencha todos os campos obrigatórios')
        }


        let item = {
          id: this.item.id,
          name: this.item.name,
          price: this.item.price,
          amount: this.item.amount,
          idCategory: this.item.idCategory

        };

        if (!this.item.id) {
          await this.$axios.$post('http://localhost:5555/items/persist', item);
          this.$toast.success('Cadastro realizado com sucesso!');
          return this.$router.push('/admin/items/');
        }
        await this.$axios.$post(`http://localhost:5555/items/persist`, item);
        this.$toast.success('Cadastro atualizado com sucesso!');
        return this.$router.push('/admin/items/');
      } catch (error) {
        this.$toast.error('Ocorreu um erro ao realizar o cadastro!');
      }
    },
    async getById (id) {
      console.log(id);
      let response = await this.$axios.$get(`http://localhost:5555/items/${id}` );
      this.item = response.data;
    },

    async getCategories () {
      let response = await this.$axios.$get('http://localhost:5555/categories');
      this.categories = response.data;

    },
    async getItems () {
      let response = await this.$axios.$get('http://localhost:5555/items');
      this.items = response.data;
    },
    
  }
}
</script>
