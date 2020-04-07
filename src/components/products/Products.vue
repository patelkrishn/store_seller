<template>
  <v-card
      class="mx-auto mt-5"
      max-width="1300">
      <v-data-table :headers="headers" :items="getProducts" sort-by="calories" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Products</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Add new product</span>
              </v-card-title>
  
              <v-form ref="form">
                  <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.product_name" label="Product name" :rules="[validationRules.required]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.product_sku" label="Product SKU" :rules="[validationRules.required]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.product_stock_quantity" label="Product stock" :rules="[validationRules.required]"></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field v-model="editedItem.product_price" label="Product price" :rules="[validationRules.required]"></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
  
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import {getAllProducts} from '../../api/Products'
export default {
  name: "Products",
  data() {
      return {
        dialog: false,
        validationRules:{
            required: value => !!value || 'Required.',
        },
        headers: [
        {
            text: 'Product Name',
            align: 'start',
            sortable: false,
            value: 'product_name',
        },
        { text: 'SKU', value: 'product_sku' },
        { text: 'Stock', value: 'product_stock_quantity' },
        { text: 'Price (₹)', value: 'product_price' },
        { text: 'Total Sales', value: 'product_total_sales' },
        { text: 'Actions', value: 'actions', sortable: false },
        ],
        editedItem: {
            product_name: '',
            product_sku: '',
            product_stock_quantity: 0,
            product_price: 0,
        },
      };
  },
  methods : {
      
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
        if (this.$refs.form.validate()) {
            if (this.editedIndex > -1) {
                // Object.assign(this.desserts[this.editedIndex], this.editedItem)
                console.log('this is if part');
                console.log(this.editedItem);
            } else {
                // this.desserts.push(this.editedItem)
                console.log('this is else part');
                console.log(this.editedItem);
            }
            this.close()
        }
      
    },
  },
  computed: {
    getProducts() {
        return this.$store.state.products;
    }
  },
  
  watch: {
    dialog (val) {
      val || this.close(),
      this.$refs.form.reset()
    },
  }, 
  created() {
    getAllProducts()
        .then((res)=>{
            this.$store.commit('products',res);
        })
        .catch((error)=>{
            this.$store.commit('errorMessage',{error});
        })
  }
};
</script>

<style></style>

