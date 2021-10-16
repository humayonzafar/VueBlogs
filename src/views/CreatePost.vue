<template>
  <div class="create-post">
    <blog-cover-preview v-show="blogPhotoPreview" />
    <loading v-if="loading"/>
    <div class="container">
      <div :class="{'invisible': !error}" class="err-message">
        <p><span>Error</span>{{ errorMsg }}</p>
      </div>
      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle"/>
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo"  @change="fileChange" accept=".png,.jpg,.jpeg"/>
          <button @click="openPreview" class="preview" :class="{'button-inactive': !photoFileUrl}">Preview Photo</button>
          <span>File Chosen: {{ blogPhotoName }}</span>
        </div>
      </div>
      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler @image-added="imageHandler"/>
      </div>
      <div class="blog-actions">
        <button @click="uploadBlog">Publish Blog</button>
        <router-link class="router-button" :to="{ name: 'BlogPreview' }">Post Preview</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Quill from 'quill';
import BlogCoverPreview from "@/components/Blog/BlogCoverPreview";

window.Quill = Quill;
const ImageResize = require('quill-image-resize-module').default;
Quill.register('module/imageResize', ImageResize);
import firebase from "firebase/app";
import "firebase/storage";
import db from "../firebase/firestoreInit";
import Loading from "@/components/Base/Loading";
export default {
  name: "CreatePost",
  components: {Loading, BlogCoverPreview},
  data() {
    return {
      error: null,
      errorMsg: null,
      loading: false,
      file: null,
      editorSettings: {
        modules: {
          imageResize: {}
        }
      }
    }
  },
  computed: {
    profileId() {
      return this.$store.state.profile.id;
    },
    blogCoverPhotoName() {
      return this.$store.state.blogDefault.photoName;
    },
    photoFileUrl() {
      return this.$store.state.blogDefault.photoFileUrl;
    },
    blogPhotoName() {
      return this.$store.state.blogDefault.photoName;
    },
    blogTitle: {
      get() {
        return this.$store.state.blogDefault.title;
      },
      set(payload) {
        this.$store.commit("mutateBlogTitle", payload);
      },
    },
    blogHTML: {
      get() {
        return this.$store.state.blogDefault.html;
      },
      set(payload) {
        this.$store.commit("mutateBlogHtml", payload);
      },
    },
    blogPhotoPreview(){
        return this.$store.state.blogDefault.photoPreview;
    }
  },
  methods:{
    fileChange() {
      this.file = this.$refs.blogPhoto.files[0];
      const fileName = this.file.name;
      this.$store.commit("mutateFileNameChange", fileName);
      this.$store.commit("mutateCreateFileURL", URL.createObjectURL(this.file));
    },
    openPreview(){
      this.$store.commit("mutatePhotoPreview");
    },
    imageHandler(file, Editor, cursorLocation, resetUploader) {
      const storageRef = firebase.storage().ref();
      const docRef = storageRef.child(`documents/blogPostPhotos/${file.name}`);
      docRef.put(file).on(
          "state_changed",
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
          },
          async () => {
            const downloadURL = await docRef.getDownloadURL();
            Editor.insertEmbed(cursorLocation, "image", downloadURL);
            resetUploader();
          }
      );
    },
    uploadBlog() {
      if (this.blogTitle.length !== 0 && this.blogHTML.length !== 0) {
        if (this.file) {
          this.loading = true;
          const storageRef = firebase.storage().ref();
          const docRef = storageRef.child(`documents/BlogCoverPhotos/${this.blogPhotoName}`);
          docRef.put(this.file).on(
              "state_changed",
              (snapshot) => {
                console.log(snapshot);
              },
              (err) => {
                console.log(err);
                this.loading = false;
              },
              async () => {
                const downloadURL = await docRef.getDownloadURL();
                const timestamp = await Date.now();
                const dataBase = await db.collection("blogPosts").doc();

                await dataBase.set({
                  blogID: dataBase.id,
                  blogHTML: this.blogHTML,
                  blogCoverPhoto: downloadURL,
                  blogCoverPhotoName: this.blogCoverPhotoName,
                  blogTitle: this.blogTitle,
                  profileId: this.profileId,
                  date: timestamp,
                });
                await this.$store.dispatch("actionGetPost");
                this.loading = false;
                this.$router.push({ name: "ViewBlog", params: { blogId: dataBase.id } });
              }
          );
          return;
        }
        this.error = true;
        this.errorMsg = "Please ensure you uploaded a cover photo!";
        setTimeout(() => {
          this.error = false;
        }, 5000);
        return;
      }
      this.error = true;
      this.errorMsg = "Please ensure Blog Title & Blog Post has been filled!";
      setTimeout(() => {
        this.error = false;
      }, 5000);
      return;
    },
  }
}
</script>

<style lang="scss">
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    all: unset;
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  // error styling
  .invisible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: 0.5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 300px;
    }

    input {
      transition: 0.5s ease-in-out all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center;
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;

    .quillWrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .ql-container {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: scroll;
    }

    .ql-editor {
      padding: 20px 16px 30px;
    }
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>