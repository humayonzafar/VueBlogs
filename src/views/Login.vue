<template>
  <div class="form-wrap">
    <validation-observer class="auth-form" v-slot="{ invalid }">
      <form class="login">
        <p class="login-register">
          Don't have an account?
          <router-link class="router-link" :to="{name:'Register'}">Register</router-link>
        </p>
        <h2>Login to VueBlog</h2>
        <div class="inputs">
          <validation-provider class="input" rules="required|email" v-slot="{ errors }">
            <label for="email">Email</label>
            <input id="email" type="text" name="email" placeholder="Email" v-model="email"/>
            <emailIcon class="icon"/>
            <span class="input-error-message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider class="input" rules="required|min:6|max:12" v-slot="{ errors }">
            <label for="password">Password</label>
            <input id="password" type="password" name="Password" placeholder="Password" v-model="password"/>
            <password class="icon"/>
            <span class="input-error-message">{{ errors[0] }}</span>
          </validation-provider>
          <p v-if="error" class="error-text">{{ errorMessage }}</p>
        </div>
        <router-link class="forgot-password" :to="{name:'ForgotPassword'}">Forgot Your Password?</router-link>
        <button :class="{'disabled':invalid}" :disabled="invalid" type="submit" @click.prevent="login">Sign in
        </button>
        <div class="angle"></div>
      </form>
    </validation-observer>
    <div class="background"></div>
  </div>
</template>

<script>
import emailIcon from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required, email, min, max} from 'vee-validate/dist/rules';
import firebase from 'firebase/app';
import 'firebase/auth';

extend('required', required);
extend('email', email);
extend('min', min);
extend('max', max);
export default {
  name: "Login",
  components: {
    emailIcon,
    password,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      email: null,
      password: null,
      error: false,
      errorMessage: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(() => {
        this.$router.push({name: 'Home'});
      }).catch((e) => {
        this.error = true;
        this.errorMessage = e.message;
      });
    }
  }
}
</script>

<style scoped>
</style>