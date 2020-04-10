<template>
  <nav v-if="currentUser">
    <v-app-bar app class="cyan accent-4" flat dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text"></v-app-bar-nav-icon>
      <v-toolbar-title class="text-uppercase white--text">
        <!-- <span class="font-weight-light">Store </span> -->
        <span>{{ this.$router.app._route.name }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!-- <v-toolbar-items class="hidden-sm-and-down"> -->
      <v-toolbar-items>
        <v-btn v-if="this.$store.state.currentUser.is_verified == 0" text style="color:#ff0000">
          <span>Unverified!</span>
          <v-icon right>warning</v-icon>
        </v-btn>
        <v-btn text class="white--text">
          <span>{{ currentUser.name }}</span>
          <v-icon right>account_box</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app width="261">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <span class="font-weight-light">Store </span>
            <span>Dashboard</span>
          </v-list-item-title>
          <!-- <v-list-item-subtitle>
              subtext
            </v-list-item-subtitle> -->
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item router to="/">
          <v-list-item-icon>
            <v-icon>dashboard</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Dashboard</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="view_module">
          <template v-slot:activator>
            <v-list-item-title>Products</v-list-item-title>
          </template>

          <v-list-item link router to="/products">
            <v-list-item-title>Your Products</v-list-item-title>
            <v-list-item-icon>
              <v-icon>view_list</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-group no-action sub-group>
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Inventory</v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="(inventory, i) in inventories"
              :key="i"
              link
              router
              :to="inventory[2]"
            >
              <v-list-item-title v-text="inventory[0]"></v-list-item-title>
              <v-list-item-icon>
                <v-icon v-text="inventory[1]"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <v-list-item router to="/invoice-create">
          <v-list-item-icon>
            <v-icon>receipt</v-icon>
          </v-list-item-icon>

          <v-list-item-title>Create Invoice</v-list-item-title>
        </v-list-item>
      </v-list>
      <template v-slot:append >
        <div class="pa-2">
          <v-btn 
          block 
          outlined 
          class="red accent-4  white--text" 
          @click.prevent="logout">
            Logout 
          <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>
<script>
import { userLogout } from "../helpers/auth";

export default {
  name: "Header",
  data() {
    return {
      currentPath: this.$router.app.$router.app._route.path,
      activeClass: "nav-item nav-link active",
      errorClass: "nav-item nav-link",
      drawer: false,
      inventories: [
        ["Show Inventory", "view_list", "/inventories"],
        ["Add Inventory", "add_box", "/inventories-add"],
        ["Inventory Report", "equalizer", "/inventories-report"],
      ],
    };
  },
  methods: {
    logout() {
      this.$store.commit("loading", true);
      userLogout().then((res) => {
        this.$store.commit("logout");
        this.$store.commit("successMessage", res.message);
        this.$router.push("/login");
      });
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
};
</script>

<style></style>
