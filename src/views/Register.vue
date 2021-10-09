<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Already have an account?
        <router-link class="router-link" :to="{name:'Login'}">Login</router-link>
      </p>
      <h2>Create Your Account</h2>
      <div class="inputs">
        <div class="input">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" placeholder="First Name" v-model="firstName"/>
          <user class="icon"/>
        </div>
        <div class="input">
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" placeholder="Last Name" v-model="lastName"/>
          <user class="icon"/>
        </div>
        <div class="input">
          <label for="user-name">Username</label>
          <input id="user-name" type="text" placeholder="Username" v-model="userName"/>
          <user class="icon"/>
        </div>
        <div class="input">
          <label for="email">Email</label>
          <input id="email" type="text" placeholder="Email" v-model="email"/>
          <email class="icon"/>
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input id="password" type="password" placeholder="Password" v-model="password"/>
          <password class="icon"/>
        </div>
      </div>
      <button>Sign up</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script>
import email from '../assets/Icons/envelope-regular.svg';
import password from '../assets/Icons/lock-alt-solid.svg';
import user from '../assets/Icons/user-alt-light.svg';

export default {
  name: "Register",
  components: {
    email,
    password,
    user
  },
  data() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      userName: null,
    }
  }
}
</script>

<style scoped>
.register h2{
  max-width: 350px;
}
</style>