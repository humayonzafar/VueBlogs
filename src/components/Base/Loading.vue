<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<script>
export default {
  name: "Loading"
}
</script>

<style scoped>
.loading {
  top: 0;
  z-index: 99;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  animation-duration: 3s;
  animation-name: spin;
}
@keyframes spin {
  to{
    transform: rotateZ(360deg);
  }
}
span{
  display: block;
  width: 60px;
  height: 60px;
  margin: 0 auto;
  border: 3px solid transparent;
  border-top-color: white;
  border-bottom-color: white;
  border-radius: 50%;
  animation: spin ease 1000ms infinite;
}
</style>