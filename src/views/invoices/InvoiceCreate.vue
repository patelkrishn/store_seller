<template>
  <div>
    <v-container>
      <v-form ref="form">
        <v-row>
          <v-col cols="5">
            <v-autocomplete
              v-model="selectedProductId"
              :items="getAllProducts"
              outlined=""
              label="Select Product"
              item-value="id"
              item-text="product_name"
              @change="findItemInAllProduct"
              :rules="[validationRules.required]"
            ></v-autocomplete>
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined=""
              label="Product Price"
              disabled=""
              v-model="selectedProductData.selectedProductPrice"
            >
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined=""
              label="Enter Product Quantity"
              v-model="selectedProductData.selectedProductQuantity"
              :rules="[validationRules.required]"
              @change="chnageQuantity"
            >
            </v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              outlined=""
              label="Payable Amount"
              v-model="selectedProductData.selectedProductPayableAmount"
              :rules="[validationRules.required]"
              @keyup.enter="addItemToInvoice"
            >
            </v-text-field>
          </v-col>
          <v-col cols="1">
            <v-btn outlined="" large="" @click="addItemToInvoice">Add</v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-data-table :headers="headers" :items="invoiceData" height="350">
        <template v-slot:item.invoice_quantity="props">
          <v-edit-dialog
            :return-value.sync="props.item.invoice_quantity"
            large
            persistent
            @save="save(props.item.product_id)"
            @cancel="cancel"
            @open="open"
            @close="close"
          >
            <div>{{ props.item.invoice_quantity }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update</div>
            </template>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.invoice_quantity"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.total_amount="props">
          <v-edit-dialog
            :return-value.sync="props.item.total_amount"
            large
            persistent
            @save="paybleAmount_save(props.item.product_id)"
            @cancel="paybleAmount_cancel"
            @open="paybleAmount_open"
            @close="paybleAmount_close"
          >
            <div>{{ props.item.total_amount }}</div>
            <template v-slot:input>
              <div class="mt-4 title">Update</div>
            </template>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.total_amount"
                :rules="[max25chars]"
                label="Edit"
                single-line
                counter
                autofocus
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
        </template>
      </v-data-table>
      <v-snackbar v-model="snack" :timeout="3000" :color="snackColor">
        {{ snackText }}
        <v-btn text @click="snack = false">Close</v-btn>
      </v-snackbar>

      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="2">Total:</v-col>
        <v-col cols="2">{{ totalPayableAmount }} ₹</v-col>
      </v-row>
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="2"></v-col>
        <v-col cols="2">
          <v-btn class="primary" @click="submitInvoice()">
            Checkout
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "InvoiceCreate",
  data: () => ({
    validationRules: {
      required: (value) => !!value || "Required.",
    },
    totalPayableAmount: 0,
    selectedProductId: null,
    selectedProduct: null,
    selectedProductData: {
      selectedProductPrice: null,
      selectedProductQuantity: null,
      selectedProductPayableAmount: null,
    },
    invoiceData: [],

    snack: false,
    snackColor: "",
    snackText: "",
    max25chars: (v) => v.length <= 25 || "Input too long!",
    pagination: {},
    headers: [
      {
        text: "Product Name",
        align: "start",
        sortable: false,
        value: "product_name",
      },
      { text: "Product Price", value: "product_price" },
      { text: "Invoice Quantity", value: "invoice_quantity" },
      { text: "Total Payable Amount", value: "total_amount" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  methods: {
    ...mapActions(["fetchAllProducts","insertInvoice"]),
    submitInvoice(){
      this.insertInvoice(this.invoiceData);
      this.$refs.form.resetValidation();
      this.invoiceData=[]
        this.totalPayableAmount = 0;
    },
    findItemInAllProduct() {
      this.getAllProducts.forEach((value) => {
        if (value.id == this.selectedProductId) {
          this.selectedProduct = value;
        }
      });
      this.selectedProductData.selectedProductPrice = this.selectedProduct.product_price;
      this.selectedProductData.selectedProductQuantity = 1;
      this.selectedProductData.selectedProductPayableAmount =
        this.selectedProductData.selectedProductPrice *
        this.selectedProductData.selectedProductQuantity;
    },
    chnageQuantity() {
      this.selectedProductData.selectedProductPayableAmount =
        this.selectedProductData.selectedProductPrice *
        this.selectedProductData.selectedProductQuantity;
    },
    addItemToInvoice() {
      if (this.$refs.form.validate()) {
        let invoice_index = null;
        this.invoiceData.forEach((value, index) => {
          if (value.product_id == this.selectedProduct.id) {
            invoice_index = index;
          }
        });
        if(invoice_index!=null){
           let params = {
            product_name: this.invoiceData[invoice_index].product_name,
            product_id: this.invoiceData[invoice_index].product_id,
            product_price: this.invoiceData[invoice_index].product_price,
            invoice_quantity: parseFloat(this.invoiceData[invoice_index].invoice_quantity)+parseFloat(this.selectedProductData.selectedProductQuantity),
            total_amount: parseFloat(this.invoiceData[invoice_index].total_amount)+parseFloat(this.selectedProductData.selectedProductPayableAmount),
          };
        this.invoiceData.splice(invoice_index, 1, params);
        }else{
          let params = {
            product_name: this.selectedProduct.product_name,
            product_id: this.selectedProduct.id,
            product_price: this.selectedProduct.product_price,
            invoice_quantity: parseFloat(this.selectedProductData.selectedProductQuantity),
            total_amount: parseFloat(this.selectedProductData.selectedProductPayableAmount),
          };
          this.invoiceData.push(params);
        }
        this.totalPayableAmount = 0;
        this.invoiceData.forEach((value) => {
          this.totalPayableAmount =
            parseFloat(this.totalPayableAmount + value.total_amount);
        });
      }
    },
    save(product_id) {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";

      let array_index;
      let updateProductData;
      this.invoiceData.forEach((value, index) => {
        if (value.product_id == product_id) {
          updateProductData = value;
          array_index = index;
        }
      });
      updateProductData.total_amount =
        parseFloat(updateProductData.product_price) * parseFloat(updateProductData.invoice_quantity);
      this.invoiceData.splice(array_index, 1, updateProductData);
      this.totalPayableAmount = 0;
      this.invoiceData.forEach((value) => {
        this.totalPayableAmount = parseFloat(this.totalPayableAmount + value.total_amount);
      });
    },
    deleteItem: function(delete_data) {
      const delete_data_index = this.invoiceData.indexOf(delete_data);
      this.invoiceData.splice(delete_data_index, 1);
      this.totalPayableAmount = 0;
      this.invoiceData.forEach((value) => {
        this.totalPayableAmount = parseFloat(this.totalPayableAmount + value.total_amount);
      });
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },
    paybleAmount_save(product_id) {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
      let array_index;
      let updateProductData;
      this.invoiceData.forEach((value, index) => {
        if (value.product_id == product_id) {
          updateProductData = value;
          array_index = index;
        }
      });
      updateProductData.total_amount = parseFloat(updateProductData.total_amount);
      this.invoiceData.splice(array_index, 1, updateProductData);
      
      this.totalPayableAmount = 0;
      this.invoiceData.forEach((value) => {
        this.totalPayableAmount = parseFloat(this.totalPayableAmount + value.total_amount);
      });
    },
    paybleAmount_cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    paybleAmount_open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    paybleAmount_close() {
      console.log("Dialog closed");
    },
  },
  computed: {
    ...mapGetters(["getAllProducts"]),
  },
  created() {
    this.fetchAllProducts();
  },
};
</script>

<style></style>
