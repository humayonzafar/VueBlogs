<template>
  <div class="post-view">
    <div class="container quillWrapper">
      <p @click="goBack" class="go-back"> <span>←</span> Go Back </p>
      <h2>{{ blogTitle }}</h2>
      <img :src="blogCoverPhoto" alt="cover" />
      <div class="post-content ql-editor" v-html="blogHTML"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  computed: {
    blogTitle() {
      return this.$store.state.blogPreview.title;
    },
    blogHTML() {
      return this.$store.state.blogPreview.html;
    },
    blogCoverPhoto() {
      return this.$store.state.blogPreview.photoFileUrl;
    },
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss">
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
    padding: 60px 25px;
  }

  .ql-editor {
    padding: 0;
  }

  h2 {
    margin-bottom: 16px;
    font-weight: 300;
    font-size: 32px;
  }

  img {
    width: 100%;
    margin-bottom: 32px;
  }
  .go-back{
    cursor: pointer;
    color: blue;
    font-size: 14px;
  }
  .go-back span{
    font-size: 20px;
  }
}
</style>