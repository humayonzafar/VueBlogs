<template>
  <header>
    <nav class="container">
      <div>
        <router-link class="logo" :to="{name:'Home'}">VueBlogs</router-link>
      </div>
      <ul class="nav-list" v-if="showLinks">
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Home</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Blogs'}">Blogs</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Create Post</router-link>
        </li>
        <li v-if="!getUser" class="list-item">
          <router-link class="nav-item" :to="{name:'Login'}">Login/Register</router-link>
        </li>
        <li v-if="getUser">
          <div @click="toggleProfileMenu($event)" class="profile" ref="profile">
            {{ getProfile.initials }}
            <div class="profile-menu" v-if="showProfileMenu">
              <div class="info">
                <p class="initials"> <span>{{ getProfile.initials }}</span></p>
                <div class="right">
                  <p>{{ profileFullName }}</p>
                  <p>{{ getProfile.user_name }}</p>
                  <p>{{ getProfile.email }}</p>
                </div>
              </div>
              <div class="options">
                <div class="option">
                  <router-link class="option" to="#">
                    <user-icon class="icon"/>
                    <p>Profile</p>
                  </router-link>
                </div>
                <div class="option">
                  <router-link class="option" to="#">
                    <admin-icon class="icon"/>
                    <p>Admin</p>
                  </router-link>
                </div>
                <div @click='signOut' class="option sign-out">
                    <sign-out-icon class="icon"/>
                    <p>Sign out</p>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <menu-icon v-if="showLinks" class="bars-regular" @click="toggleMenu"/>
    </nav>
    <transition name="mobile-nav" v-if="showLinks">
      <ul class="mobile-nav-list" v-if="mobileMenuOpen">
        <li class="list-item list-item__X">
          <span @click="toggleMenu">X</span>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Home</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Blogs'}">Blogs</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Create Post</router-link>
        </li>
        <li v-if="!getUser" class="list-item">
          <router-link class="nav-item" :to="{name:'Login'}">Login/Register</router-link>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script>
//svg
import MenuIcon from "../../assets/Icons/bars-regular.svg";
import UserIcon from "../../assets/Icons/user-alt-light.svg";
import AdminIcon from "../../assets/Icons/user-crown-light.svg";
import SignOutIcon from "../../assets/Icons/sign-out-alt-regular.svg";
import {mapGetters} from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
  name: "Navigation",
  props: {
    showLinks: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      mobileMenuOpen: false,
      showProfileMenu: false
    }
  },
  computed: {
    ...mapGetters(['getProfile','getUser']),
    profileFullName() {
      return this.getProfile.first_name + ' ' + this.getProfile.last_name
    },
  },
  components: {
    MenuIcon,
    UserIcon,
    AdminIcon,
    SignOutIcon
  }
  ,
  created() {
    window.addEventListener("click", this.closeNavBar);
    window.addEventListener("click", this.closeProfileMenu);
  }
  ,
  beforeDestroy() {
    window.removeEventListener("click", this.closeNavBar);
    window.removeEventListener("click", this.closeProfileMenu);
  }
  ,
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    toggleProfileMenu(e){
      if(e.target===this.$refs.profile) this.showProfileMenu = !this.showProfileMenu;
    },
    closeNavBar(e) {
      if (!this.$el.contains(e.target)) {
        this.mobileMenuOpen = false;
      }
    },
    closeProfileMenu(e) {
      console.log(this.$el,e.target);
      if (!this.$el.contains(e.target)) {
        this.showProfileMenu = false;
      }
    },
    signOut(){
      firebase.auth().signOut();
      window.location.reload();
    }
  }
}
</script>

<style scoped lang="scss">

header {
  padding: 1em 1em;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 99;
  flex-wrap: wrap;
}

.container {
  justify-content: space-between;
  display: flex;
  align-items: center;
}

.logo {
  font-size: var(--fontMed);
  font-weight: 800;
  color: black;
}

.nav-item {
  color: white;

  &:hover {
    color: var(--lightGreen);
    transition: .5s color ease;
  }
}

.list-item {
  font-weight: 700;
  padding: 1em;
}

.bars-regular {
  color: black;
  width: 1.3rem;
  cursor: pointer;

  &:hover {
    color: var(--lightGreen);
    transition: .5s color ease;
  }
}

.nav-list {
  display: none;
}

.mobile-nav-list {
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #303030;
  height: 100%;
  left: 0;
  top: 0;
  min-width: 250px;
  max-width: 300px;
  padding: 1em;
  z-index: 99;
}

.list-item__X {
  color: white;
  text-align: right;
  font-size: 1.2rem;

  & > span:hover {
    cursor: pointer;
    color: var(--lightGreen);
    transition: .5s color ease;
  }
}

.mobile-nav-enter-active, .mobile-nav-leave-active {
  transition: all 1s ease;
}

.mobile-nav-enter {
  transform: translateX(-250px);
}

.mobile-nav-enter-to {
  transform: translateX(0);
}

.mobile-nav-leave-to {
  transform: translateX(-250px);
}

.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: white;
  background-color: var(--darkGrey);
  border-radius: 50%;
  &:hover{
    cursor: pointer;
    color: var(--lightGreen);
    transition: .5s color ease;
  }
}

.profile-menu {
  cursor: default;
  position: absolute;
  top: 63px;
  right: 0;
  width: 250px;
  background-color: var(--darkGrey);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.info {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid white;
}

.initials {
  position: initial;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--darkGrey);
  background-color: white;
  border-radius: 50%;

  span:hover{
    cursor: pointer;
    color: var(--lightGreen);
    transition: .5s color ease;
  }
}

.right {
  flex: 1;
  margin-left: 24px;
  color: white;
}

.right p:nth-child(1) {
  font-size: 0.8rem;
}

.right p:nth-child(2), p:nth-child(3) {
  font-size: 0.6rem;
}

.options {
  padding: 15px;
}

.option {
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.option:last-child {
  margin-bottom: 0;
}

.icon {
  width: 18px;
  height: auto;
}

p {
  font-size: 14px;
  margin-left: 12px;
}
.sign-out{
  cursor: pointer;
  &:hover{
    color: var(--lightGreen);
    transition: .5s color ease;
  }
}
@media all and (min-width: 700px) {
  .mobile-nav-list {
    display: none;
  }
  .bars-regular {
    display: none;
  }
  .nav-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .nav-item {
    color: black;
  }
  .logo {
    font-size: var(--fontBig);
  }
}
</style>