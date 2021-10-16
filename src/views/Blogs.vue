<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div class="toggle-edit">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost">
      </div>
      <blog-card :post="post" :showIcons="true" v-for="(post,index) in getBlogPosts" :key="index"/>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import BlogCard from "@/components/Blog/BlogCard";

export default {
  name: "Blogs",
  components: {BlogCard},
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['getBlogPosts','getEditPost']),
    editPost:{
      get(){
        return this.getEditPost;
      },
      set(value){
         this.actionUpdateEditPost(value);
      }
    }
  },
  methods: {
    ...mapActions(['actionUpdateEditPost'])
  }
}
</script>

<style scoped>
.blog-cards {
  position: relative;
}

.toggle-edit {
  display: flex;
  align-items: center;
  position: absolute;
  top: -60px;
  right: 0;
}
.toggle-edit span{
  margin-right: 16px;
}

input[type="checkbox"] {
  position: relative;
  border: none;
  --webkit-appearancew: none;
  background-color: white;
  outline: none;
  width: 80px;
  height: 30px;
  appearance: none;
  border-radius: 20px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input[type="checkbox"]:before {
  content: "";
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 20px;
  top: 0;
  left: 0;
  background-color: gray;
  transform: scale(1.1);
  transition: 1s ease all;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

input:checked[type="checkbox"]:before {
  background-color: var(--darkGrey);
  left: 52px;
}
</style>