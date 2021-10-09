import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sampleBlogCards: [
            {blogTitle: 'Blog Card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021',},
            {blogTitle: 'Blog Card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021',},
            {blogTitle: 'Blog Card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021',},
            {blogTitle: 'Blog Card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021',}
        ],
        editPost: false
    },
    mutations: {
        mutateEditPost:(state,updatedValue) =>(state.editPost = updatedValue),
    },
    getters: {
        getSampleBlogCards: state => state.sampleBlogCards,
        getEditPost: state => state.editPost
    },
    actions: {
        actionUpdateEditPost(context, updatedValue){
             context.commit('mutateEditPost',updatedValue);
        }
    },
    modules: {}
})
