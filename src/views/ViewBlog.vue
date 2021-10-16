<template>
  <div class="post-view" v-if="currentBlog">
    <div class="container quillWrapper">
      <h2>{{ currentBlog[0].blogTitle }}</h2>
      <h4>Posted on: {{ new Date(currentBlog[0].blogDate).toLocaleString("en-us", { dateStyle: "long" }) }}</h4>
      <img :src="currentBlog[0].blogCoverPhoto" alt="" class="img"/>
      <div class="post-content ql-editor" v-html="currentBlog[0].blogHTML"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "ViewBlog",
  data() {
    return {
    };
  },
  computed:{
    ...mapGetters(['getBlogPosts']),
    currentBlog(){
      return this.getBlogPosts.filter((post) => {
        return post.blogID === this.$route.params.blogId;
      });
    }
  },
};
</script>

<style>
  h4 {
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 24px;
  }
.img{
  width: 350px;
  margin: 0 auto;
}
</style>