<template>
  <div class="form-wrap">
    <loading v-if="loading"/>
    <app-modal :message="message" :showModal="showModal" :classes="classes" @closeModal="closeModal"/>
    <validation-observer class="auth-form" v-slot="{ invalid }">
      <form>
        <p class="login-register">
          Already have an account?
          <router-link class="router-link" :to="{name:'Login'}">Login</router-link>
        </p>
        <h2>Create Your Account</h2>
        <div class="inputs">
          <validation-provider class="input" rules="required|alpha" v-slot="{ errors }">
            <label for="first-name">First Name</label>
            <input id="first-name" name="First Name" type="text" placeholder="First Name" v-model="form.first_name"
                   :class="{'input-error':errors.length>0}"/>
            <user class="icon"/>
            <span class="input-error-message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider class="input" rules="required|alpha" v-slot="{ errors }">
            <label for="last-name">Last Name</label>
            <input id="last-name" type="text" name="Last Name" placeholder="Last Name" v-model="form.last_Name"
                   :class="{'input-error':errors.length>0}"/>
            <user class="icon"/>
            <span class="input-error-message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider class="input" rules="required" v-slot="{ errors }">
            <label for="user-name">Username</label>
            <input id="user-name" name="Username" type="text" placeholder="Username" v-model="form.user_name"
                   :class="{'input-error':errors.length>0}"/>
            <user class="icon"/>
            <span class="input-error-message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider class="input" :rules="{required: true, email: true}" v-slot="{ errors }">
            <label for="email">Email</label>
            <input id="email" type="text" name="Email" placeholder="Email" v-model="form.email"
                   :class="{'input-error':errors.length>0}"/>
            <email-icon class="icon"/>
            <span class="input-error-message">{{ errors[0] }}</span>
          </validation-provider>
          <validation-provider class="input" rules="required|min:6|max:12" v-slot="{ errors }">
            <label for="password">Password</label>
            <input id="password" type="password" name="Password" placeholder="Password" v-model="form.password"
                   :class="{'input-error':errors.length>0}"/>
            <password class="icon"/>
            <span class="input-error-message">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <button :class="{'disabled':invalid}" :disabled="invalid" @click.prevent="registerUser">Sign up</button>
        <div class="angle"></div>
      </form>
    </validation-observer>
    <div class="background"></div>
  </div>
</template>

<script>
import EmailIcon from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import user from '../assets/Icons/user-alt-light.svg';
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firestoreInit";
import {ValidationProvider, ValidationObserver, extend} from 'vee-validate';
import {required, email, min, max, alpha} from 'vee-validate/dist/rules';
import Loading from "@/components/Base/Loading";
import AppModal from "@/components/Base/AppModal";

extend('required', required);
extend('email', email);
extend('min', min);
extend('max', max);
extend('alpha', alpha);
export default {
  name: "Register",
  components: {
    AppModal,
    Loading,
    EmailIcon,
    password,
    user,
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    form: {
      first_name: '',
      last_Name: '',
      email: '',
      password: '',
      user_name: ''
    },
    loading: false,
    message: '',
    showModal: false,
    classes: ''
  }),
  methods: {
    async registerUser() {
      try {
        this.loading = true;
        const fireBaseAuth = await firebase.auth();
        const createUser = await fireBaseAuth.createUserWithEmailAndPassword(this.form.email, this.form.password);
        const result = await createUser;
        const database = db.collection("users").doc(result.user.uid);
        await database.set({
          first_name: this.form.first_name,
          last_name: this.form.last_Name,
          user_name: this.form.user_name,
          email: this.form.email,
        });
        this.classes = 'success-text';
        this.message = `Account created successfully for ${this.form.email}`;
      } catch (e) {
        this.message = e.message;
        this.classes = 'error-text';
      } finally {
        this.showModal = true;
        this.loading = false;
      }
    },
    closeModal() {
      if (this.classes === 'success-text') {
        this.$router.push({name: 'Home'});
      }
      this.showModal = false;
      this.message = '';
      this.classes = '';
    }
  }
}
</script>

<style scoped src="../assets/css/auth/auth.css">
.register h2 {
  max-width: 350px;
}

</style>