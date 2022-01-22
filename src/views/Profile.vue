<template>
  <div class="profile">
    <app-modal :show-modal="modalActive" message="Changes Saved Successfully" @closeModal="closeModal"/>
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ getProfile.initials }}</div>
        <div class="admin-badge">
          <adminIcon class="icon"/>
          <span>User</span>
        </div>
        <div class="input">
          <label for="first_name">First Name:</label>
          <input type="text" id="first_name" v-model="getProfile.first_name" @input="updateLocalState($event)"/>
        </div>
        <div class="input">
          <label for="last_name">Last Name:</label>
          <input type="text" id="last_name" v-model="getProfile.last_name" @input="updateLocalState($event)"/>
        </div>
        <div class="input">
          <label for="user_name">Username:</label>
          <input type="text" id="user_name" v-model="getProfile.user_name" @input="updateLocalState($event)"/>
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="getProfile.email" @input="updateLocalState($event)"/>
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
import AppModal from "@/components/Base/AppModal";
import adminIcon from "../assets/Icons/user-crown-light.svg";
import {mapGetters,mapActions} from 'vuex';

export default {
  name: "Profile",
  components: {AppModal, adminIcon},
  data() {
    return {
      modalActive: false,
      localProfile: {}
    }
  },
  computed: {
    ...mapGetters(['getProfile']),
  },
  methods: {
    ...mapActions(['actionUpdateProfile']),
    closeModal() {
      this.modalActive = false;
    },
    updateProfile() {
        this.actionUpdateProfile(this.localProfile);
        this.modalActive= true;
    },
    updateLocalState(e) {
      this.$set(this.localProfile, e.target.id, e.target.value);
    }
  }
}
</script>

<style scoped>

.container {
  max-width: 1000px;
  padding: 60px 25px;
}

h2 {
  text-align: center;
  margin-bottom: 16px;
  font-weight: 300;
  font-size: 32px;
}

.profile-info {
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 32px;
  background-color: #f1f1f1;
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: 32px auto;
}

.initials {
  position: initial;
  width: 80px;
  height: 80px;
  font-size: 32px;
  background-color: #303030;
  color: #fff;
  display: flex;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.admin-badge {
  display: flex;
  align-self: center;
  color: #fff;
  font-size: 14px;
  padding: 8px 24px;
  border-radius: 8px;
  background-color: #303030;
  margin: 16px 0;
  text-align: center;
  text-transform: capitalize;
}

.icon {
  width: 14px;
  height: auto;
  margin-right: 8px;
}

.input {
  margin: 16px 0;
}

label {
  font-size: 14px;
  display: block;
  padding-bottom: 6px;
}

input {
  width: 100%;
  border: none;
  background-color: #f2f7f6;
  padding: 8px;
  height: 50px;

}

button {
  align-self: center;
}

@media (min-width: 900px) {
  input:focus {
    outline: none;
  }
}
</style>