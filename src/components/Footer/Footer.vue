<template>
  <footer>
    <div class="container">
      <div class="footer_social">
        <router-link class="footer-logo" :to="{name:'Home'}">VueBlogs</router-link>
        <div>
          <instagram class="social-icons"/>
          <linkedin class="social-icons"/>
          <github class="social-icons"/>
        </div>
      </div>
      <ul class="footer-nav-list">
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Home</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Blogs</router-link>
        </li>
        <li class="list-item">
          <router-link class="nav-item" :to="{name:'Home'}">Login/Register</router-link>
        </li>
      </ul>
      <div class="copyright">
        <p>Copyright 2021 All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import Instagram from '../../assets/Icons/instagram-brands.svg';
import Linkedin from '../../assets/Icons/linkedin-brands.svg';
import Github from '../../assets/Icons/iconmonstr-github-1.svg';

export default {
  name: "Footer.vue",
  components: {
    Instagram,
    Linkedin,
    Github
  }
}
</script>

<style scoped>

footer {
  background-color: var(--darkGrey);
  padding: 1em;
}
.footer-logo{
  font-size: var(--fontBig);
}
footer,.footer-logo,.nav-item{
  color: white;
}
.social-icons {
  width: 25px;
  margin: 1em;
}
.footer_social{
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  padding: 1em;
}
.footer-nav-list{
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em;
}
.copyright{
  text-align: center;
}
@media all and (min-width: 760px) {
  .footer_social{
    flex-basis: 35%;
  }
  .container{
    display: flex;
    align-items: center;
  }
  .footer-nav-list{
    flex-basis: 35%;
  }
  .copyright{
    margin-left: auto;
    flex-basis: 25%;
  }
}
</style>