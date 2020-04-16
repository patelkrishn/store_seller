<template>
  <v-app>
    <v-snackbar
      :value="snackbar.value"
      top
      right=""
      :color="snackbar.color"
    >
      {{ snackbar.data }}
      <v-btn color="white" text @click="hideSnackbar">
        Close
      </v-btn>
    </v-snackbar>
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-layout align-center justify-space-around wrap>
      <v-dialog v-model="loading" hide-overlay persistent width="300">
        <v-card color="primary" dark>
          <v-card-text>
            Please stand by
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>

      <!-- <v-dialog v-model="this.$store.state.loading" max-width="290" lazy>
        <v-card>
          <v-card-text class="text-xs-center">
            <v-progress-circular
              :size="70"
              indeterminate
              class="primary--text"
            />
          </v-card-text>
        </v-card>
      </v-dialog> -->
    </v-layout>
  </v-app>
</template>

<script>
import Header from "./views/Header";
// import { createNamespacedHelpers } from 'vuex'
// const { mapState,mapMutations,mapGetters } = createNamespacedHelpers('alert')
import {mapActions,mapGetters} from 'vuex'

export default {
  name: "App",
  data(){
    return {
    };
  },
  components: {
    Header,
  },
  methods:{
    hideSnackbar(){
      this.setSnackbar({data:null,value:false,color:null});
    },
    ...mapActions(['setSnackbar'])
  },
  computed: mapGetters(["loading","snackbar"]),
  created(){
    // console.log(mapGetters(['loading']));
  }
};
</script>

<style></style>
