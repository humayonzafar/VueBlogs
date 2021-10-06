<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation />
      <router-view />
      <Footer />
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
    return {};
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style>

</style>
