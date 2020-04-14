<template>
  <v-app>
    <v-snackbar
      v-model="getSnackbar.value"
      top
      right=""
      :color="getSnackbar.color"
    >
      {{ getSnackbar.data }}
      <v-btn color="white" text @click="hideSnackbar">
        Close
      </v-btn>
    </v-snackbar>
    <Header />
    <v-content>
      <router-view></router-view>
    </v-content>

    <v-layout align-center justify-space-around wrap>
      <v-dialog v-model="getLoading" hide-overlay persistent width="300">
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
// import {mapState} from 'vuex'

export default {
  name: "App",
  components: {
    Header,
  },
  methods:{
    hideSnackbar(){
      this.$store.commit('snackbar',{data:null,value:false,color:null});
    }
  },
  computed:{
    getSnackbar(){
      return this.$store.state.snackbar;
    },
    getLoading(){
      return this.$store.state.loading;
    },
    // ...mapState('auth',['mode'])
  },
  created() {
    // console.log(auth);
  }
};
</script>

<style></style>
