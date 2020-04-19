<template>
<div>
  <v-app>
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm8
            md4
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Dashboard Registration</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>

                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="person"
                    type="text"
                v-model="form.name"
                  ></v-text-field>

                  <v-text-field
                    label="Mobile"
                    name="mobile"
                    prepend-icon="person"
                    type="text"
                v-model="form.mobile"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="person"
                    type="text"
                    v-model="form.email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="form.password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange" to="/login">Login</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="authenticate">Register</v-btn>
              </v-card-actions>
              <div class="form-group" v-if="authError">
                <p class="red lighten-4 red--text">{{authError}}</p>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>

</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "Register",
  data() {
    return {
      form: {
        name: "",
        email: "",
        mobile: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
  ...mapActions(['userRegistration']),
    authenticate() {
      this.userRegistration(this.form);
    },
  },
computed : {
    authError(){
        return this.$store.getters.authError;
    }
}
};
</script>

<style scoped></style>
