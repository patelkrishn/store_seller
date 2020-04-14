<template>
  <v-container>
    <h1>{{ welcome }}</h1>
  </v-container>
</template>

<script>
export default {
  name: 'Home',
  computed : {
    welcome() {
      return 'Welcome to dashboard';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
