<template>
  <div>
    <v-container>
        
    </v-container>
  </div>
</template>

<script>
export default {
  name: "InvoiceCreate",
  data() {
    return {};
  },
  methods: {},
  computed: {
    getProducts() {
      return this.$store.state.products;
    },
  },
  created() {
    this.fetchRemoteProduct();
  },
};
</script>

<style></style>
