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
                <v-toolbar-title>Dashboard Login</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="person"
                    type="email"
                    v-model="form.email"
                    outlined
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="form.password"
                    outlined
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn color="orange" to="/register">Register</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="authenticate">Login</v-btn>
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
name: 'login',
data() {
    return {
        form: {
            email : '',
            password : ''
        },
        error : ''
    };
},
methods: {
  ...mapActions(['userLogin']),
    authenticate() {
        this.userLogin(this.form);
        // this.$router.push('/')
    }
},
computed : {
    authError(){
        return this.$store.getters.authError;
    }
}
}
</script>

<style scoped>

</style>