<template>
  <div class="modal-wrapper" v-show="showModal"> <!-- overflow-hidden -->
    <div class="modal-content" :class="classes">
      <p v-if="message">{{message}}</p>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModal",
  props: {
    showModal: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
    },
    classes:{
      type: String
    }
  },
  watch: {
    value: {
      handler(value) {
        let isModalOpen = value ? "addClass" :'';
        this.toggleBodyClass(isModalOpen, "overflow-hidden");
      }
    }
  },
  methods:{
    close() {
      this.$emit("closeModal", true);
    },
    toggleBodyClass(addRemoveClass, className) {
      const el = document.body;
      if (addRemoveClass === "addClass") {
        el.classList.add(className);
      } else {
        el.classList.remove(className);
      }
    }
  }
}
</script>
<style scoped>
 .modal-wrapper{
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 99;
   position: absolute;
   width: 100%;
   height: 100%;
   top:0;
   background-color: rgba(0,0,0,0.7);
 }
 .modal-content{
  display: flex;
   flex-direction: column;
   justify-content: center;
   border-radius: 8px;
   width: 300px;
   padding: 40px 30px;
   background-color: white;
 }
 p{
   text-align: center;
 }
 button{
   align-self: center;
 }
</style>