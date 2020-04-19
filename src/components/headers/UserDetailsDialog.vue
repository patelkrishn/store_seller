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
          <v-stepper-items v-if="editData == false">
            <v-stepper-content
              v-for="n in steps"
              :key="`${n}-content`"
              :step="n"
            >
              <v-card v-if="n == 1" class="mb-5" height="225">
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
                        <v-chip label="" style="text-transform: uppercase">{{
                          currentUser.name
                        }}</v-chip>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">
                        <span>Email: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip label="">{{ currentUser.email }}</v-chip>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">
                        <span>Mobile: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip label="">{{ currentUser.mobile }}</v-chip>
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
              <v-card v-if="n == 2" class="mb-5" height="225">
                <v-row class="mx-auto">
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="4">
                        <span>Shop No.: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="shopAddress.shop_no != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ shopAddress.shop_no }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                          >not defined</v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <span>Street: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="shopAddress.street != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ shopAddress.street }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                          >not defined</v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <span>Landmark: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="shopAddress.landmark != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ shopAddress.landmark }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                          >not defined</v-chip
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="6">
                    <v-row>
                      <v-col cols="4">
                        <span>City: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="shopAddress.city != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ shopAddress.city }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                          >not defined</v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <span>State: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="shopAddress.state != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ shopAddress.state }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                          >not defined</v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <span>Pincode: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="shopAddress.pincode != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ shopAddress.pincode }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                          >not defined</v-chip
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
              <v-card v-if="n == 3" class="mb-5" height="225">
                <v-row class="mx-auto">
                  <v-col cols="8">
                    <v-row>
                      <v-col cols="4">
                        <span>Shop Name: </span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="legalInformation.shop_name != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ legalInformation.shop_name }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                        >
                          not defined
                        </v-chip>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <span>Shop PAN No.: </span>
                        <span>(Optional)</span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="legalInformation.shop_pan != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ legalInformation.shop_pan }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                          >Not defined</v-chip
                        >
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <span>Shop GSTIN No.: </span>
                        <span>(Optional)</span>
                      </v-col>
                      <v-col cols="8">
                        <v-chip
                          v-if="legalInformation.shop_gstin != null"
                          label=""
                          style="text-transform: uppercase"
                          >{{ legalInformation.shop_gstin }}</v-chip
                        >
                        <v-chip
                          v-else
                          label=""
                          style="text-transform: uppercase"
                          >not defined</v-chip
                        >
                      </v-col>
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
              <v-row class="mx-auto">
                <v-col cols="2">
                  <v-btn @click="editData = true" color="info" class="ml-1"
                    >Edit</v-btn
                  >
                </v-col>
                <v-col cols="6"></v-col>
                <v-col cols="2">
                  <!-- <v-btn v-if="n == 3" color="primary" @click="submitEditableData()">Submit</v-btn> -->
                  <v-btn
                    v-if="n == 1 || n == 2"
                    color="primary"
                    @click="nextStep(n)"
                    >Continue</v-btn
                  >
                </v-col>
                <v-col cols="2">
                  <v-btn text @click="dialog = false" class="ml-1"
                    >Cancel</v-btn
                  >
                </v-col>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
          <v-stepper-items v-else>
            <v-stepper-content
              v-for="n in steps"
              :key="`${n}-content`"
              :step="n"
            >
              <v-form ref="form" v-model="valid" lazy-validation>
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
                          <v-text-field
                            label="Your name"
                            type="text"
                            v-model="currentUser.name"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2">
                          <span>Email: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="Your email"
                            type="text"
                            v-model="currentUser.email"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="2">
                          <span>Mobile: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="Your mobile"
                            type="text"
                            v-model="currentUser.mobile"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card v-if="n == 2" class="mb-5">
                  <v-row class="mx-auto">
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="4">
                          <span>Shop No.: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="Shop no."
                            type="text"
                            v-model="shopAddress.shop_no"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <span>Street: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="Street"
                            type="text"
                            v-model="shopAddress.street"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <span>Landmark: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="Landmark"
                            type="text"
                            v-model="shopAddress.landmark"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                    <v-col cols="6">
                      <v-row>
                        <v-col cols="4">
                          <span>City: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="City"
                            type="text"
                            v-model="shopAddress.city"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <span>State: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="State"
                            type="text"
                            v-model="shopAddress.state"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <span>Pincode: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="Pincode"
                            type="text"
                            v-model="shopAddress.pincode"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                <v-card v-if="n == 3" class="mb-5">
                  <v-row class="mx-auto">
                    <v-col cols="10">
                      <v-row>
                        <v-col cols="4">
                          <span>Shop Name: </span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="Shop name"
                            type="text"
                            v-model="legalInformation.shop_name"
                            :rules="[validationRules.required]"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <span>Shop PAN No.: </span>
                          <span>(Optional)</span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="PAN No."
                            type="text"
                            v-model="legalInformation.shop_pan"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="4">
                          <span>Shop GSTIN No.: </span>
                          <span>(Optional)</span>
                        </v-col>
                        <v-col cols="8">
                          <v-text-field
                            label="GSTIN No."
                            type="text"
                            v-model="legalInformation.shop_gstin"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-card>
                <v-row class="mx-auto">
                  <v-col cols="2">
                    <v-btn @click="editData = true" color="info" class="ml-1"
                      >Edit</v-btn
                    >
                  </v-col>
                  <v-col cols="6"></v-col>
                  <v-col cols="4">
                    <v-btn
                      v-if="n == 3"
                      color="primary"
                      @click="submitEditableData()"
                      >Submit</v-btn
                    >
                    <v-btn v-else color="primary" @click="nextStep(n)"
                      >Continue</v-btn
                    >
                    <v-btn text @click="dialog = false" class="ml-1"
                      >Cancel</v-btn
                    >
                  </v-col>
                </v-row>
              </v-form>
            </v-stepper-content>
          </v-stepper-items>
        </template>
      </v-stepper>
    </v-container>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "UserDetailsDialog",
  data() {
    return {
      valid: true,
      e1: 1,
      steps: 3,
      dialog: false,
      editData: false,
      validationRules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    ...mapActions([
      "updateShopAddress",
      "updateLegalInformation",
      "fetchShopAddress",
      "fetchLegalInformation",
      "updateSellerData",
      "setLoading"
    ]),
    nextStep(n) {
      if (n === this.steps) {
        this.e1 = 1;
      } else {
        this.e1 = n + 1;
      }
    },
    submitEditableData() {
      if (
        this.$refs.form[0].validate() &&
        this.$refs.form[1].validate() &&
        this.$refs.form[2].validate()
      ) {
          this.setLoading(true);
          this.updateLegalInformation(this.legalInformation);
          this.updateShopAddress(this.shopAddress);
          this.updateSellerData(this.currentUser);
      }
      this.dialog = false;
      this.editData = false;
      this.e1 = 1;
    }
  },
  computed: mapState({
    currentUser: state => state.auth.currentUser,
    shopAddress: state => state.auth.shop_address,
    legalInformation: state => state.auth.legal_information
  }),
  watch: {
    steps(val) {
      if (this.e1 > val) {
        this.e1 = val;
      }
    }
  },
  created(){
    this.fetchShopAddress();
    this.fetchLegalInformation();
  }
};
</script>

<style></style>
