<template>
  <footer>
    <div class="container">
      <div class="footer-left">
        <div class="footer_text">
          <div class="footer__logo">
            <router-link class="footer-logo" :to="{name:'Home'}">VueBlogs</router-link>
          </div>
          <div class="footer-links">
            <ul class="social-icons-list">
              <li><a href="#">
                <linkedin class="social-icons"/>
              </a></li>
              <li><a href="#">
                <github class="social-icons"/>
              </a></li>
              <li><a href="#">
                <instagram class="social-icons"/>
              </a></li>
            </ul>
          </div>
        </div>
        <div class="footer__social_icons">
          <ul class="footer-nav-list">
            <li class="list-item">
              <router-link class="nav-item" :to="{name:'Home'}">Home</router-link>
            </li>
            <li class="list-item">
              <router-link class="nav-item" :to="{name:'Blogs'}">Blogs</router-link>
            </li>
            <li v-if="!getUser" class="list-item" >
              <router-link class="nav-item" :to="{name:'Login'}">Login/Register</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer-right">
        <p>&copy; {{ date }} All Rights Reserved</p>
      </div>
    </div>
  </footer>
</template>

<script>
import Instagram from '../../assets/Icons/instagram-brands.svg';
import Linkedin from '../../assets/Icons/linkedin-brands.svg';
import Github from '../../assets/Icons/iconmonstr-github-1.svg';
import {mapGetters} from 'vuex';
export default {
  name: "Footer.vue",
  components: {
    Instagram,
    Linkedin,
    Github
  },
  data(){
    return {
      date: new Date().getFullYear()
    }
  },
  computed:{
    ...mapGetters(['getUser'])
  }
}
</script>

<style scoped>

footer {
  background-color: var(--darkGrey);
  padding: 1em;
}

.footer-logo {
  font-size: var(--fontMed);
}

footer, .footer-logo, .nav-item {
  color: white;
}

.social-icons {
  width: 25px;
  color: white;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
  padding: 3em 0;
}

.container > *, .footer-left > * {
  flex-basis: 100%;
}

.footer-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.footer_text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}

.footer-nav-list {
  display: flex;
  gap: 1em;
  flex-wrap: wrap;
  justify-content: center;
}

.social-icons-list {
  display: flex;
  gap: 2em;
}

.footer-right > p {
  margin: 0;
  text-align: center;
}

@media all and (min-width: 760px) {
  .container {
    flex-direction: row;
    align-items: end;
  }

  .footer-left {
    flex-direction: row;
    align-items: normal;
  }

  .footer-nav-list {
    flex-direction: column;
  }

  .footer-right {
    display: flex;
    justify-content: flex-end;
  }

  .footer-logo {
    font-size: var(--fontBig);
  }

  .footer_text {
    align-items: flex-start;
  }

  .footer-links {
    margin-top: auto;
  }
}
</style>