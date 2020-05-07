<template>

  <v-container>
    <v-form ref="form">
        
    <v-card 
      class="pt-5 pl-5 pr-5 mt-5"
      outlined> 
      <v-autocomplete
              v-model="selectedProductId"
              :items="getAllProducts"
              outlined=""
              label="Select Product"
              item-value="id"
              item-text="product_name"
              :rules="[validationRules.required]"
            ></v-autocomplete>
    </v-card>
    <v-row class="mt-5">
      <v-col cols="6">
      <v-card 
      class="pt-5 pl-5 pr-5"
      outlined>
      <v-text-field
        v-model="stock_quantity"
        label="Product quantity"
        :rules="[validationRules.required]"
        outlined
      ></v-text-field>
    </v-card>
    </v-col>
    <v-spacer></v-spacer>
    <v-col cols="6">
    <v-card 
      class="pt-5 pl-5 pr-5"
      outlined>
      <v-text-field
        v-model="principle_amount"
        label="Product price"
        :rules="[validationRules.required]"
        outlined
        @keyup.enter="submitInventory"
      ></v-text-field>
    </v-card>
    </v-col>
    </v-row>
    <v-card-actions class="justify-center">
      <v-btn text class="cyan accent-4 mx-auto" @click="submitInventory">
        
        <v-icon left>add_box</v-icon>
        <span>Add Inventory</span>
      </v-btn>
    </v-card-actions>
    </v-form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "InventoryAdd",
  data() {
    return {
      search : '',
      model: null,
      selectedProductId: null,
      stock_quantity : '',
      principle_amount:'',
      validationRules: {
        required: (value) => !!value || "Required.",
      },
      headers: [
        {
          text: "Product Name",
          align: "start",
          sortable: true,
          value: "product_name",
        },
        { text: "SKU", value: "product_sku" },
        { text: "Product Price", value: "product_price" },
        { text: "Stock", value: "product_stock_quantity" },
        { text: "Actions", value: "actions", sortable: false },
      ]
    };
  },
  methods: {
    ...mapActions(['fetchAllProducts','insertInventory']),
    submitInventory(){
      if (this.$refs.form.validate()) {
        let credentials={
          product_id : this.selectedProductId,
          stock_quantity : this.stock_quantity,
          principle_amount : this.principle_amount
        };
        this.insertInventory(credentials);
        this.$refs.form.reset();
        this.$refs.form.resetValidation()
        this.fetchAllProducts()
        // setTimeout(()=>this.fetchAllProducts(),500);
      }
    }
  },
  computed: {
    ...mapGetters(['getAllProducts'])
  },
  created(){
    this.fetchAllProducts();
  },
};
</script>

<style></style>
