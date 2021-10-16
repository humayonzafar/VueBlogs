<template>
  <div class="app-wrapper">
    <div class="app" v-if="getPostLoaded">
      <Navigation :showLinks="navigation"/>
      <router-view/>
      <Footer v-if="navigation"/>
    </div>
  </div>
</template>

<script>
//components
import {mapActions, mapGetters} from 'vuex';
import Navigation from "@/components/Nav/Navigation";
import Footer from "@/components/Footer/Footer"
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: "app",
  components: {
    Footer,
    Navigation
  },
  data() {
    return {
      navigation: false
    };
  },
  computed:{
    ...mapGetters(['getPostLoaded']),
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.actionUpdateUser(user);
      if (user) {
        this.actionGetCurrentUser();
      }
    });
    this.actionGetPost();
  },
  methods: {
    ...mapActions(['actionUpdateUser', 'actionGetCurrentUser','actionGetPost'])
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.navigation = (route.name == null) ? false : !['Login', 'Register', 'ForgotPassword'].includes(route.name);
      }
    }
  },
};
</script>

<style>

</style>
