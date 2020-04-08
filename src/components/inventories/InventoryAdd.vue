<template>

  <v-container>
    <v-snackbar
        v-model="snackbar.value"
        top right=""
        :color="snackbar.color"
      >
        {{snackbar.data}}
        <v-btn
          color="white"
          text
          @click="snackbar.value = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    <v-form ref="form">
      <template v-if="getProducts.length == 0">
        <v-data-table
          item-key="name"
          :headers="headers"
          class="elevation-1"
          loading
          loading-text="Loading... Please wait"
        >
        <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Products</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                    dense=""
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details>
                </v-text-field>
            </v-toolbar>
          </template>
        </v-data-table>
      </template>
      <template v-else>
      <v-data-table
            :headers="headers"
            :items="getProducts"
            sort-by="calories"
            class="elevation-1"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Products</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
              dense=""
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
              
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
              <v-btn color="blue darken-1" outlined="" text @click="inventory.product = item"
                        >Select this</v-btn
                      >
          </template>
        </v-data-table>
      </template>
    <v-card 
      class="pt-5 pl-5 pr-5 mt-5"
      outlined> 
      <v-text-field
        v-model="inventory.product.product_name"
        :rules="[validationRules.required]"
        outlined
        label="Selected product"
        readonly
      ></v-text-field>
      <!-- <v-card-text class="justify-center display-1 font-weight-bold black--text">
        {{inventory.product.product_name}}
      </v-card-text> -->
    </v-card>
    <v-row class="mt-5">
      <v-col cols="6">
      <v-card 
      class="pt-5 pl-5 pr-5"
      outlined>
      <v-text-field
        v-model="inventory.stock_quantity"
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
        v-model="inventory.principle_amount"
        label="Product price"
        :rules="[validationRules.required]"
        outlined
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
import { getAllProducts } from "../../api/Products";
import { addInventories } from "../../api/inventories";
export default {
  name: "InventoryAdd",
  data() {
    return {
      snackbar : {
        value : false,
        color : null,
        data : null
      },
      isEditing: false,
      search : '',
      model: null,
      products : ['foo', 'bar', 'fizz', 'buzz'],
      inventory: {
        product: '',
        stock_quantity : '',
        principle_amount:''
      },
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
        { text: "Stock", value: "product_stock_quantity" },
        { text: "Actions", value: "actions", sortable: false },
      ]
    };
  },
  methods: {
    fetchRemoteProduct() {
      getAllProducts()
        .then((res) => {
          this.$store.commit("products", res);
        })
        .catch((error) => {
          this.$store.commit("errorMessage", { error });
        });
    },
    submitInventory(){
      if (this.$refs.form.validate()) {
        let credentials={
          product_id : this.inventory.product.id,
          stock_quantity : this.inventory.stock_quantity,
          principle_amount : this.inventory.principle_amount
        }
        addInventories(credentials)
            .then((res) => {
              // console.log(res);
              this.$store.commit("successMessage", res.data.message);
              this.snackbar={
                color:'success',
                data:this.$store.state.success_message,
                value: true
              };
              this.$refs.form.reset();
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response);
                this.$store.commit("errorMessage", error.response.message);
                this.snackbar={
                  color:'danger',
                  data:this.$store.state.error_message,
                  value: true
                };
                this.$refs.form.reset();
              }
            });
      }
    }
  },
  computed: {
    getProducts() {
      return this.$store.getters.products;
    },
  },
  created() {
    this.fetchRemoteProduct();
  },
};
</script>

<style></style>
