<template>
  <h1>AQUI É A PAGINA DE USUARIO</h1>
</template>

<script>
export default {
  layout: 'users',
  generate: {
    routes() {
      return axios.get('http://localhost:5555/users/').then((res) => {
        return res.data.map((user) => {
          return `/public/users/${user.id}`;
        });
      });
    },
  },
}
</script>

<style>

</style>