<template>
  <v-container>
    <h2>{{ welcome }}</h2>
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
