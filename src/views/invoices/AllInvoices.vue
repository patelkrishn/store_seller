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
              dense=""
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
            </v-toolbar>
          </template>
          <template v-slot:item.invoice_name="{ item }">
              <a href="#" @click="loadSingleInvoice(item.invoice_name)">#00{{item.invoice_name}}</a>
          </template>
          <template v-slot:item.invoice_amount="{ item }">
            ₹{{item.invoice_amount}}
          </template>
          <template v-slot:item.created_at="{ item }">
              <span>{{new Date(item.created_at).toLocaleString()}}</span>
          </template>
          <template v-slot:item.updated_at="{ item }">
              <span>{{new Date(item.updated_at).toLocaleString()}}</span>
          </template>
        </v-data-table>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AllInvoices",
  data() {
    return {
      search: '',
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
    loadSingleInvoice(invoice_name){
        this.fetchSingleInvoice(invoice_name);
    }
  },
  computed: {
    ...mapGetters(["getAllInvoice", "getSingleInvoice"]),
  },
  created() {
    this.fetchAllInvoices();
  },
};
</script>

<style></style>
