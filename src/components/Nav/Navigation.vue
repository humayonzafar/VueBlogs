<template>
  <header>
    <nav class="container">
      <div>
        <router-link class="logo" :to="{name:'Home'}">VueBlogs</router-link>
      </div>
      <ul class="nav-list">
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Home</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Blogs'}">Blogs</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Create Post</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Login/Register</router-link>
        </li>
      </ul>
      <menu-icon class="bars-regular" @click="toggleMenu"/>
    </nav>
    <transition name="mobile-nav">
      <ul class="mobile-nav-list" v-if="mobileMenuOpen">
        <li class="list-item list-item__X">
          <span @click="toggleMenu">X</span>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Home</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Blogs</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Create Post</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Login/Register</router-link>
        </li>
      </ul>
    </transition>
  </header>
</template>

<script>
//svg
import MenuIcon from "../../assets/Icons/bars-regular.svg";

export default {
  name: "Navigation",
  data() {
    return {
      mobileMenuOpen: false,
    }
  },
  components: {
    MenuIcon
  },
  created() {
    window.addEventListener("click", this.closeNavBar);
  },
  beforeDestroy() {
    window.removeEventListener("click", this.closeNavBar);
  },
  methods: {
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeNavBar(e) {
      if (!this.$el.contains(e.target)) {
        this.mobileMenuOpen= false;
      }
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

  &:hover{
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
  &:hover{
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
.list-item__X{
  color: white;
  text-align: right;
  font-size: 1.2rem;

  &>span:hover{
    cursor: pointer;
    color: var(--lightGreen);
    transition: .5s color ease;
  }
}
.mobile-nav-enter-active,.mobile-nav-leave-active{
  transition: all 1s ease;
}
.mobile-nav-enter{
  transform: translateX(-250px);
}
.mobile-nav-enter-to{
  transform: translateX(0);
}
.mobile-nav-leave-to{
  transform: translateX(-250px);
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
  .logo{
    font-size: var(--fontBig);
  }
}
</style>