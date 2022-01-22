<template>
  <div class="blog-card">
    <div class="icons" v-if="showIcons && editPost && getBlogBelongsToUser(post)">
      <div @click="editBlog" class="icon">
        <Edit class="edit" />
      </div>
      <div @click="deletePost" class="icon">
        <Delete class="delete" />
      </div>
    </div>
    <img :src="post.blogCoverPhoto" alt="blog-cover-photo" @click="openBlog"/>
    <div class="info">
      <h4>{{ post.blogTitle }}</h4>
      <h6>Posted on : {{ new Date(post.blogDate).toLocaleString('en-us', {dateStyle: "long"}) }}</h6>
      <router-link class="link" :to="{name:'ViewBlog',params:{blogId: post.blogID}}">
        View The Post
        <arrow class="arrow"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import Arrow from "../../assets/Icons/arrow-right-light.svg"
import Edit from "../../assets/Icons/edit-regular.svg"
import Delete from "../../assets/Icons/trash-regular.svg"
import {mapGetters,mapActions} from "vuex";

export default {
  name: "BlogCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
    showIcons:{
      default:false
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['actionDeletePost']),
    deletePost() {
      this.actionDeletePost(this.post.blogID);
    },
    editBlog() {
      this.$router.push({ name: "EditBlog", params: { blogId: this.post.blogID } });
    },
    openBlog(){
      this.$router.push({ name:'ViewBlog',params:{blogId: this.post.blogID} });
    }
  },
  computed: {
    ...mapGetters(['getEditPost', 'getBlogBelongsToUser']),
    editPost() {
      return this.getEditPost;
    }
  },
  components: {
    Arrow,
    Edit,
    Delete
  }
}
</script>

<style scoped>

.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  background-color: white;
  min-height: 350px;
  transition: 0.5s ease all;
  flex-direction: column;
}

.blog-card:hover {
  transform: rotateZ(-1deg) scale(1.01);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.icons {
  display: flex;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 999;
}

.icon {
  display: flex;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: white;
  transition: 0.5s ease all;
}

.icon:hover {
  background-color: var(--lightGreen);
  color: white;
}

.edit:hover, .delete:hover {
  background-color: var(--lightGreen);
}

a:hover {
  color: var(--lightGreen);
}

.icon:nth-child(1) {
  margin-right: 0.5em;
}

.edit, .delete, .arrow {
  fill: white;
}

.arrow {
  width: 10px;
  margin-left: 0.3rem;
}

.edit, .delete {
  pointer-events: none;
  height: 15px;
  width: auto;
}

img {
  border-radius: 8px 8px 0 0;
  z-index: 1;
  height: 200px;
  object-fit: cover;
}

.info {
  padding: 1em;
}

a {
  color: black;
}

.link {
  font-size: 0.9rem;
  margin-top: auto;
  font-weight: 500;
}

h4 {
  font-size: 1.4rem;
  font-weight: 800;
}

h6 {
  font-size: 1rem;
  font-weight: 400;
}
</style>