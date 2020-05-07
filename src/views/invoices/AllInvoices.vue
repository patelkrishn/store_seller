<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :search="search"
      :items="getAllInvoice"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Invoices</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            dense
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:item.invoice_name="{ item }">
        <a @click="loadSingleInvoice(item.invoice_name)"
              >#00{{ item.invoice_name }}</a
            >
      </template>
      <template v-slot:item.invoice_amount="{ item }"
        >₹{{ item.invoice_amount }}</template
      >
      <template v-slot:item.created_at="{ item }">
        <span>{{ new Date(item.created_at).toLocaleString() }}</span>
      </template>
      <template v-slot:item.updated_at="{ item }">
        <span>{{ new Date(item.updated_at).toLocaleString() }}</span>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title primary-title class="headline grey lighten-2">
              <h3>#00{{ invoice_name }}</h3>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-simple-table fixed-header height="300px">
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">Product Name</th>
                        <th class="text-left">Product Price</th>
                        <th class="text-left">Quantity</th>
                        <th class="text-left">Total Amount</th>
                        <th class="text-left">Created At</th>
                        <th class="text-left">Updated At</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="item in getSingleInvoice"
                        :key="item.product_name"
                      >
                        <td>{{ item.product_name }}</td>
                        <td>{{ item.product_price }}</td>
                        <td>{{ item.invoice_quantity }}</td>
                        <td>{{ item.total_amount }}</td>
                        <td>
                          {{ new Date(item.created_at).toLocaleString() }}
                        </td>
                        <td>
                          {{ new Date(item.updated_at).toLocaleString() }}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="4"></td>
                        <th style="font-size:20px">Total:</th>
                        <th v-if="getSingleInvoice.length == 0">0 ₹</th>
                        <th v-else style="font-size:20px">
                          {{ getSingleInvoice[0].total_payable_amount }} ₹
                        </th>
                      </tr>
                    </tfoot>
                  </template>
                </v-simple-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
              <v-spacer></v-spacer>
              <v-btn
                outlined
                class="light-blue darken-1 white--text"
                @click="editInvoice(invoice_name)"
              >
                Edit Invoice
                <v-icon right>edit</v-icon>
              </v-btn>
              <v-btn
                outlined
                class="green darken-4 white--text"
                @click="printInvoice(invoice_name)"
              >
                Print Invoice
                <v-icon right>print</v-icon>
              </v-btn>
            </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AllInvoices",
  data() {
    return {
      search: "",
      dialog: false,
      invoice_name: "",
      headers: [
        {
          text: "Invoice Id",
          align: "start",
          sortable: true,
          value: "invoice_name",
        },
        { text: "Invoice Amount", value: "invoice_amount" },
        { text: "Created At", value: "created_at" },
        { text: "Updated At", value: "updated_at" },
      ],
    };
  },
  methods: {
    ...mapActions(["fetchAllInvoices", "fetchSingleInvoice"]),
    loadSingleInvoice(invoice_name) {
      this.fetchSingleInvoice(invoice_name);
      this.invoice_name = invoice_name;
      this.dialog = true;
    },
    close() {
      this.dialog = false;
    },
    printInvoice(invoice_name) {
      window.open(this.getApiUrl + "/invoices/print/" + invoice_name);
    },
    editInvoice(invoice_name) {
      console.log(invoice_name);
    },
  },
  computed: {
    ...mapGetters(["getAllInvoice", "getSingleInvoice", "getApiUrl"]),
  },
  created() {
    this.fetchAllInvoices();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
};
</script>

<style></style>
