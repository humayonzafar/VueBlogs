<template>
  <div>
    <app-modal :show-modal="showModal" :message="modalMessage" @closeModal="showModal=false">
      <template v-slot:body-content>
      </template>
    </app-modal>
    <loading v-if="loading"/>
    <div class="reset-password">
      <div class="form-wrap">
        <validation-observer class="auth-form" v-slot="{ invalid }">
        <form class="reset">
          <p class="login-register">
            Back to
            <router-link class="router-link" :to="{name:'Login'}">Login</router-link>
          </p>
          <h2>Reset Password</h2>
          <p>Forgot your password? Enter your email to reset it.</p>
          <div class="inputs">
            <validation-provider class="input" rules="required|email" v-slot="{ errors }">
              <label for="email">Email</label>
              <input id="email" type="text" placeholder="Email" v-model="email"/>
              <email class="icon"/>
              <span class="input-error-message">{{ errors[0] }}</span>
            </validation-provider>
          </div>
          <button :class="{'disabled':invalid}" :disabled="invalid" @click.prevent="resetPassword">Reset</button>
          <div class="angle"></div>
        </form>
        </validation-observer>
        <div class="background"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Email from '../assets/Icons/envelope-regular.svg';
import AppModal from "@/components/Base/AppModal";
import Loading from "@/components/Base/Loading";
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required, email} from 'vee-validate/dist/rules';
import firebase from "firebase/app";
import "firebase/auth";
extend('required', required);
extend('email', email);
export default {
  name: "Register",
  components: {
    AppModal,
    Email,
    Loading,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: null,
      showModal: false,
      loading: false,
      modalMessage: '',
    }
  },
  methods:{
    resetPassword(){
      this.loading = true;
      firebase.auth().sendPasswordResetEmail(this.email)
      .then(()=>{
        this.modalMessage = 'Email Sent Successfully.';
      })
      .catch((e)=>{
        this.modalMessage = e.message;
        this.$router.push({name: 'Login'});
      })
      .finally(()=>{
        this.loading = false;
        this.showModal = true;
      });
    }
  }
}
</script>

<style scoped src="../assets/css/auth/auth.css">
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