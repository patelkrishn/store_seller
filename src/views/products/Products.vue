<template>
  <v-container>
    <v-card class="mx-auto mt-5">
      <template>
        <v-data-table
            :headers="headers"
            :search="search"
            :items="getAllProducts"
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
              <v-dialog v-model="dialog" max-width="500px" >
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2 ml-5" v-on="on"
                    >Add New</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>

                  <v-form ref="form">
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              label="Product name"
                              type="text"
                              v-model="editedItem.product_name"
                              :rules="[validationRules.required]"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.product_sku"
                              label="Product SKU"
                              :rules="[validationRules.required]"
                              outlined
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12" sm="6" md="6">
                            <v-text-field
                              v-model="editedItem.product_price"
                              label="Product price"
                              :rules="[validationRules.required]"
                              outlined
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>

                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="close"
                        >Cancel</v-btn
                      >
                      <v-btn color="blue darken-1" text @click="save"
                        >Save</v-btn
                      >
                    </v-card-actions>
                  </v-form>
                </v-card>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </template>
    </v-card>
  </v-container>
</template>
<script>
import { mapActions,mapGetters } from 'vuex'
import {
} from "../../api/Products";
export default {
  name: "Products",
  data() {
    return {
      search: '',
      dialog: false,
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
        { text: "Price (₹)", value: "product_price" },
        { text: "Total Sales", value: "product_total_sales" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedIndex: -1,
      editedItem: {
        product_name: null,
        product_sku: "",
        product_price: 0,
      },
      defaultItem: {
        product_name: "",
        product_sku: "",
        product_price: 0,
      },
    };
  },
  methods: {
    ...mapActions(['fetchAllProducts','setLoading','updateProduct','insertProduct','deleteProduct']),
    fetchRemoteProduct() {
      this.fetchAllProducts();
    },
    close() {
      this.dialog = false;
      this.$refs.form.resetValidation()
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
            this.updateProduct(this.editedItem);
        } else {
          this.insertProduct(this.editedItem);
        }
        setTimeout(()=>this.fetchRemoteProduct(),500);
        this.close();
      }
    },

    editItem(item) {
      this.editedIndex = this.getAllProducts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.deleteProduct(item.id);
        setTimeout(()=>this.fetchRemoteProduct(),500);
    },
  },
  computed: {
    getProducts() {
      return this.$store.state.products;
    },
    formTitle() {
      return this.editedIndex === -1 ? "Add New Product" : "Edit Product";
    },
    ...mapGetters(["getAllProducts"])
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  created() {
    this.fetchRemoteProduct();
  },
};
</script>

<style></style>
