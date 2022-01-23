<template>
  <div class="modal" ref="modal" v-if="showModal">
    <div class="modal-content">
      <close @click="$emit('close')" class="icon" />
      <div class="post-view">
        <div class="container quillWrapper">
          <h2>{{ blogTitle }}</h2>
          <div class="quillWrapperDiv">
            <img :src="blogCoverPhoto" alt="content-img" v-if="blogCoverPhoto"/>
            <img :src="require('../../assets/placeholder.png')" alt="placeholder-img" v-else/>
          </div>
          <div class="post-content ql-editor" v-html="blogHTML"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import close from "../../assets/Icons/times-circle-light.svg";
import placeholder from '../../assets/placeholder.png'
export default {
  components: {
    close,
    placeholder
  },
  props: {
    blogTitle: String,
    blogCoverPhoto: String,
    blogHTML: String,
    showModal: Boolean
  },
};
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 99;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;

  .modal-content {
    display: flex;
    justify-content: center;
    position: relative;
    border-radius: 12px;
    background-color: #fff;
    height: 600px;
    width: 900px;
    overflow-y: auto;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .icon {
      width: 24px;
      height: auto;
      cursor: pointer;
      font-size: 24px;
      position: absolute;
      top: 15px;
      right: 15px;
      color: #303030;
    }

    img {
      margin-top: 16px;
      display: block;
      width: 250px;
      height: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
.post-view {
  min-height: 100%;

  .container {
    max-width: 1000px;
  }

  .ql-editor {
    padding: 1rem 2rem;
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
}
.quillWrapperDiv{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>