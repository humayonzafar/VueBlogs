<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation v-if="navigation" />
      <router-view />
      <Footer v-if="navigation" />
    </div>
  </div>
</template>

<script>
//components
import Navigation from "@/components/Nav/Navigation";
import Footer from "@/components/Footer/Footer"
export default {
  name: "app",
  components: {
    Footer,
    Navigation
  },
  data() {
    return {
      navigation : false
    };
  },
  mounted() {},
  methods: {},
  watch: {
    $route:{
      immediate: true,
      handler(route) {
        this.navigation = (route.name==null) ? false:  !['Login', 'Register', 'ForgotPassword'].includes(route.name);
      }
    }
  },
};
</script>

<style>

</style>
