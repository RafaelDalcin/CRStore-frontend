<template>
  <v-container style="background-color:burlywood">
    
    <v-row>
        <v-card
      v-for="item in items" :key="item.id"
      class="mx-auto"
      max-width="400"
      style="background-color: orange; margin-bottom: 5%"
    >
      <v-img
        class="white--text align-end"
        height="200px"
        :src="item.image"
        style="opacity: "
      >
      </v-img><v-card-title style="color: white; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">{{item.name}}</v-card-title>

      <v-card-actions>
        <v-btn
        class="mx-16"
        fab
        dark
        small
        color="orange"
        >
          <v-icon>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-btn
        class="mx-16"
        fab
        dark
        small
        color="orange"
        
        >
          <v-icon>
            mdi-minus
          </v-icon>
        </v-btn>
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

    }
  },

  created () {
    this.getItems()
  },

  methods: {
    async getItems () {
      let response = await this.$api.get('http://localhost:5555/items');
      this.items = response.data
      console.log(this.items);
    },
  }
}


</script>

<style>

</style>