<template>
  <v-container>
    <v-data-table
            :headers="headers"
            :items="getAllInventories"
            sort-by="calories"
            class="elevation-1"
            :search="search"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>All Inventories</v-toolbar-title>
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
          
          <template v-slot:item.created_at="{ item }">
              <span>{{new Date(item.created_at).toLocaleString()}}</span>
          </template>
          <template v-slot:item.updated_at="{ item }">
              <span>{{new Date(item.updated_at).toLocaleString()}}</span>
          </template>
          <template v-slot:item.actions="{  }">
            <v-icon small class="mr-2"
              >mdi-pencil</v-icon
            >
            <v-icon small>mdi-delete</v-icon>
          </template>
        </v-data-table>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    name:'Inventories',
    data(){
      return {
      search: '',
        headers: [
        {
          text: "Product Name",
          align: "start",
          sortable: true,
          value: "product_name",
        },
        { text: "SKU", value: "product_sku" },
        { text: "Stock", value: "stock_quantity" },
        { text: "Totl Stock", value: "total_stock_quantity" },
        { text: "Created", value: "created_at" },
        { text: "Updated", value: "updated_at" },
        { text: "Actions", value: "actions", sortable: false },
      ],

      };
    },
    methods:{
      ...mapActions(['fetchAllInventories'])
    },
    computed:{
      ...mapGetters(['getAllInventories'])
    },
    created(){
      this.fetchAllInventories()
    }
}
</script>

<style>

</style>