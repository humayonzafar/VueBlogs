<template>
  <div class="app-wrapper">
    <div class="app">
      <Navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
//components
import Navigation from "@/components/Nav/Navigation";
export default {
  name: "app",
  components: {
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
