<template>
  <div class="home">
    <blog-post v-if="!getUser" :post="welcomeScreen" />
    <blog-post :post="post" v-for="(post,index) in getBlogPostsFeed" :key="index"/>
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <blog-card :post="post" :showIcons="false" v-for="(post,index) in getBlogPostsCards" :key="index"/>
        </div>
      </div>
    </div>
    <div v-if="!getUser" class="updates">
      <div class="container updates-container">
        <h2>Never miss a post. Register your free account today.</h2>
        <router-link class="router-button" to="#">Register for FireBlogs <arrow class="arrow"/></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import BlogPost from "@/components/Blog/BlogPost";
import BlogCard from "@/components/Blog/BlogCard";
import Arrow from "../assets/Icons/arrow-right-light.svg";
import {mapGetters} from 'vuex';
export default {
  name: "Home",
  components: {BlogCard, BlogPost,Arrow},
  data() {
    return {
      welcomeScreen: {
        title: 'Welcome!',
        blogPost: 'MY dummy blog Site for vue js. Just a small practical example of code for vue js and a working github repository',
        welcomeScreen: true,
        photo: 'coding'
      },
      sampleBlogPost:[]
    }
  },
  created() {
    this.$store.dispatch('actionGetPost');
  },
  computed: {
    ...mapGetters(['getBlogPostsFeed','getUser','getBlogPostsCards']),
  }
}
</script>

<style scoped>
.container{
  /*padding: 2em 0;*/
}

.blog-card-wrap h3{
  font-weight: 300;
  font-size: 1.3rem;
  margin-bottom: 2em;
}
.arrow{
  width: 12px;
}
.updates-container {
  display: flex;
  padding: 0 0 4rem 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.router-button {
  background-color: var(--darkGrey);
  color: white;
  padding: 1em 2em;
  border-radius: 24px;
}
.updates-container a:hover{
  color: var(--lightGreen);
}
h2{
  font-weight: 300;
  font-size: 2rem;
  max-width: 425px;
  width: 100%;
  text-align: center;
  text-transform: uppercase ;
}
@media all and (min-width: 760px) {
  .updates-container {
    flex-direction: row;
    align-items: center;
    padding: 0 0 4.5rem 0;
    justify-content: space-between;
  }
  .router-button{
    margin-left: auto;
  }
  h2{
    text-align: left;
  }
}
</style>