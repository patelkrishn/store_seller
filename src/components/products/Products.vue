<template>
  <v-container>
    <v-card class="mx-auto mt-5">
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
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on }">
                <v-btn color="primary" dark class="mb-2" v-on="on"
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
                            v-model="editedItem.product_stock_quantity"
                            label="Product stock"
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
                    <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                  </v-card-actions>
                </v-form>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { getAllProducts, addProduct, deleteProduct, updateProduct } from "../../api/Products";
export default {
  name: "Products",
  data() {
    return {
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
        product_stock_quantity: 0,
        product_price: 0,
      },
      defaultItem: {
        product_name: "",
        product_sku: "",
        product_stock_quantity: 0,
        product_price: 0,
      },
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
    close() {
      this.dialog = false;
      this.$refs.form.reset();
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedIndex > -1) {
          updateProduct(this.editedItem)
            .then((res) => {
                // console.log(res);
              this.$store.commit(
                "successMessage",
                res.data.message
              );
            this.fetchRemoteProduct();
            this.close();
            })
            .catch((error) => {
              if (error.response) {
                 console.log(error.response);
              }
            });
        } else {
          // this.desserts.push(this.editedItem)
          addProduct(this.editedItem)
            .then((res) => {
                // console.log(res);
              this.$store.commit(
                "successMessage",
                res.data.message
              );
            this.fetchRemoteProduct();
            this.close();
            })
            .catch((error) => {
              if (error.response) {
                 console.log(error.response);
              }
            });
        }
      }
    },

    editItem(item) {
      this.editedIndex = this.getProducts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        deleteProduct(item.id)
            .then((res) => {
                console.log(res);
              this.$store.commit(
                "successMessage",
                res.data.message
              );
              this.fetchRemoteProduct();
            })
            .catch((error) => {
                 console.log(error);
              if (error.response) {
                 console.log(error.response);
              }
            });
    },
  },
  computed: {
    getProducts() {
      return this.$store.state.products;
    },
    formTitle() {
      return this.editedIndex === -1 ? "Add New Product" : "Edit Product";
    },
  },

  watch: {
    dialog(val) {
      // console.log(val);
      val || this.close();
    },
  },
  created() {
    this.fetchRemoteProduct();
  },
};
</script>

<style></style>
