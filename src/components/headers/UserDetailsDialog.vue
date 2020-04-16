<template>
  <v-dialog v-model="dialog" persistent max-width="800px">
          <template v-slot:activator="{ on }">
            <v-btn text class="white--text" v-on="on">
              <!-- <span>{{ currentUser.name }}</span> -->
              <v-icon right>account_box</v-icon>
            </v-btn>
          </template>
              <v-container>
    <v-stepper v-model="e1">
      <template>
        <v-stepper-header>
          <template>
            <v-stepper-step :complete="e1 > 1" :step="1" editable
              >Your Details</v-stepper-step
            >

            <v-divider v-if="1 !== steps"></v-divider>
          </template>
          <template>
            <v-stepper-step :complete="e1 > 2" :step="2" editable
              >Shop Legal Information</v-stepper-step
            >

            <v-divider v-if="2 !== steps"></v-divider>
          </template>
          <template>
            <v-stepper-step :complete="e1 > 3" :step="3" editable
              >Shop Address</v-stepper-step
            >

            <v-divider v-if="3 !== steps"></v-divider>
          </template>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content v-for="n in steps" :key="`${n}-content`" :step="n">
            <v-card v-if="n == 1" class="mb-5">
              <v-row class="mx-auto">
                <v-col cols="4">
                  <v-avatar class="profile" color="grey" size="164" tile>
                    <v-img
                      src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-business-male-icon-vector-png-image_4187852.jpg"
                    ></v-img>
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                    <v-row>
                        <v-col cols="2">
                            <span>Name: </span>
                        </v-col>
                        <v-col cols="8">
                            <v-chip label="" style="text-transform: uppercase">{{currentUser.name}}</v-chip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <span>Email: </span>
                        </v-col>
                        <v-col cols="8">
                            <v-chip label="">{{currentUser.email}}</v-chip>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="2">
                            <span>Mobile: </span>
                        </v-col>
                        <v-col cols="8">
                            <v-chip label="">{{currentUser.mobile}}</v-chip>
                        </v-col>
                    </v-row>
            </v-col>
              </v-row>
            </v-card>
            <v-card v-if="n == 2" class="mb-5">step 2</v-card>
            <v-card v-if="n == 3" class="mb-5">step 3</v-card>

            <v-btn v-if="n == 3" color="primary" @click="nextStep(n)"
              >Submit</v-btn
            >
            <v-btn v-else color="primary" @click="nextStep(n)">Continue</v-btn>
            <v-btn text @click="dialog = false" class="ml-1">Cancel</v-btn>
          </v-stepper-content>
        </v-stepper-items>
      </template>
    </v-stepper>
  </v-container>
        </v-dialog>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "UserDetailsDialog",
  data() {
    return {
      e1: 1,
      steps: 3,
      dialog: false,
    };
  },
  methods: {
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
  },
  computed: mapState({
    currentUser:state=>state.auth.currentUser
  }),
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    },
  },
};
</script>

<style></style>
