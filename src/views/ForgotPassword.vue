<template>
  <div>
    <app-modal :show-modal="showModal" message="Email Sent Successfully." @closeModal="showModal=false">
      <template v-slot:body-content>
      </template>
    </app-modal>
    <loading v-if="loading"/>
    <div class="reset-password">
      <div class="form-wrap">
        <form class="reset">
          <h2>Reset Password</h2>
          <p>Forgot your password? Enter your email to reset it.</p>
          <div class="inputs">
            <div class="input">
              <label for="email">Email</label>
              <input id="email" type="text" placeholder="Email" v-model="email"/>
              <email class="icon"/>
            </div>
          </div>
          <button @click.prevent="showModal=true">Reset</button>
          <div class="angle"></div>
        </form>
        <div class="background"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Email from '../assets/Icons/envelope-regular.svg';
import AppModal from "@/components/Base/AppModal";
import Loading from "@/components/Base/Loading";
export default {
  name: "Register",
  components: {
    AppModal,
    Email,
    Loading
  },
  data() {
    return {
      email: null,
      showModal: false,
      loading: false
    }
  }
}
</script>

<style scoped>
.reset-password {
  position: relative;
}

h2 {
  margin-bottom: 8px;
}

p {
  text-align: center;
  margin-bottom: 32px;
}
</style>