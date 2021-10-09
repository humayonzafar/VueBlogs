<template>
  <div class="blog-wrapper no-user">
    <div class="blog-content">
      <div class="blog-content-cont">
        <h2 v-if="isWelcomeScreen">{{ post.title }}</h2>
        <h2 v-else>{{ post.title }}</h2>
        <p v-if="isWelcomeScreen">{{ post.blogPost }}</p>
        <p v-else class="content-preview">{{ post.blogHtml }}</p>
        <router-link v-if="isWelcomeScreen" to="#" class="link">
          Login/Register
          <arrow class="arrow arrow-light"/>
        </router-link>
        <router-link v-else to="#" class="link">
          View The Post
          <arrow class="arrow"/>
        </router-link>
      </div>
    </div>
    <div class="blog-photo">
      <img v-if="isWelcomeScreen" :src="require(`../../assets/blogPhotos/${post.photo}.jpg`)" alt="blog-photo"/>
      <img v-else :src="require(`../../assets/blogPhotos/${post.blogCoverPhoto}.jpg`)" alt="blog-cover-photo"/>
    </div>
  </div>
</template>

<script>
import Arrow from "../../assets/Icons/arrow-right-light.svg";

export default {
  name: "BlogPost",
  components: {Arrow},
  props: ["post"],
  data() {
    return {
      isWelcomeScreen: this.post.welcomeScreen ?? false
    }
  },
}
</script>

<style scoped>

.blog-wrapper {
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.blog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 4;
  order: 2;
}

.blog-wrapper:nth-child(even) > .blog-content {
  order: 2;
}

.blog-wrapper:nth-child(even) > .blog-photo {
  order: 1;
}

.blog-photo {
  order: 1;
  flex: 4;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.blog-photo > img {
  height: 100%;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
}

.blog-content-cont {
  max-width: 375px;
  padding: 4em 1.4em;
}

h2 {
  font-size: 24px;
  font-weight: 300;
  text-transform: uppercase;
}

p {
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.7;
}

a {
  color: black;
}

.content-preview {
  font-size: 13px;
  width: 250px;
  /*max-height: 24px;*/
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.link {
  display: inline-flex;
  align-items: center;
  /*margin-top: 1.4em;*/
  padding-bottom: 4px;
  border-bottom: 1px solid transparent;
  transition: 0.5s ease-in all;
}

.link:hover {
  border-bottom-color: var(--darkGrey);
}

.no-user:first-child {
  background-color: var(--darkGrey);
  color: white;
}

.no-user:first-child a {
  color: white;
}

.no-user:first-child a:hover {
  color: var(--lightGreen);
  border-bottom-color: white;
}

@media all and (min-width: 760px) {
  .blog-wrapper {
    flex-direction: row;
    min-height: 650px;
    max-height: 650px;
  }

  .blog-content {
    order: 1;
    flex: 3;
  }

  .blog-content-cont {
    padding: 0 1.5em;
  }

  h2 {
    font-size: 42px;
  }

  p {
    /*font-size: 1.2rem;*/
  }

  .content-preview {
    font-size: 1.5rem;
    width: 270px;
    /*max-height: 30px;*/
  }

  .link {
    font-size: 1.2rem;
  }
}
</style>