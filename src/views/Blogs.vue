<template>
  <div class="blog-card-wrap">
    <div v-if="getUser" class="toggles">
      <div class="search-input">
        <label for="search">Search</label>
        <input type="search" id="search" v-model="searchText" aria-label="Search blogs"/>
      </div>
      <div>
      </div>
      <div class="toggle-edit" v-if="getBlogPosts && this.getBlogPosts.length>0">
        <span>Toggle Editing Post</span>
        <input type="checkbox" v-model="editPost">
      </div>
      <div class="toggle-filter" v-if="this.getBlogPosts && this.getBlogPosts.length>0">
        <span>Show Only My Blogs</span>
        <input type="checkbox" v-model="showOnlyMyPosts">
      </div>
    </div>
    <div class="blog-cards container">
      <blog-card :post="post" :showIcons="true" v-for="(post,index) in posts" :key="index"/>
    </div>
    <div class="container no-result" v-if="posts && posts.length===0">
      <p>No Blogs Found....</p>
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
      showOnlyMyPosts: false,
      searchText: ''
    }
  },
  computed: {
    ...mapGetters(['getBlogPosts', 'getEditPost', 'getUser', 'getProfile']),
    editPost: {
      get() {
        return this.getEditPost;
      },
      set(value) {
        this.actionUpdateEditPost(value);
      }
    },
    posts() {
      let blogs = [];
      for (let blog of this.getBlogPosts) {
        if (((blog.profileId === this.getProfile.id && this.showOnlyMyPosts) || !this.showOnlyMyPosts) &&
            blog.blogTitle.toLowerCase().includes(this.searchText.toLowerCase())) {
          blogs.push(blog);
        }
      }
      return blogs;
    },
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
}

.toggle-filter {
  display: flex;
  align-items: center;
}

.toggle-edit span, .toggle-filter span {
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

.toggles {
  position: relative;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 3rem;
  gap: 1rem;
  margin-right: 2rem;
  flex-wrap: wrap;
}

.blog-card-wrap {
  position: relative;
  padding: 1rem 1rem;
  background-color: white;
}

.search-input label {
  margin-right: 16px;
}

.search-input input {
  outline: 0;
  border-width: 0 0 1px;
}

.container.no-result {
  height: 400px;
}

@media all and (max-width: 760px) {
  .toggles {
    justify-content: center;
    margin-top: 1rem;
  }
}
</style>