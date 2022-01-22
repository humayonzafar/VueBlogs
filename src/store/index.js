import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';
import 'firebase/auth';
import db from "../firebase/firestoreInit";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        sampleBlogCards: [
            {blogTitle: 'Blog Card #1', blogCoverPhoto: 'stock-1', blogDate: 'May 1, 2021',},
            {blogTitle: 'Blog Card #2', blogCoverPhoto: 'stock-2', blogDate: 'May 1, 2021',},
            {blogTitle: 'Blog Card #3', blogCoverPhoto: 'stock-3', blogDate: 'May 1, 2021',},
            {blogTitle: 'Blog Card #4', blogCoverPhoto: 'stock-4', blogDate: 'May 1, 2021',}
        ],
        profile: {
            id: null,
            email: null,
            first_name: null,
            last_name: null,
            user_name: null,
            initials: null,
        },
        blogDefault: {
            html: "Write your blog title here",
            title: "",
            photoName: "",
            photoFileUrl: "",
            photoPreview: "",
        },
        blogPosts:[],
        postLoaded: null,
        editPost: false,
        user: null
    },
    mutations: {
        mutateEditPost: (state, updatedValue) => (state.editPost = updatedValue),
        mutateUser(state, payload) {
            state.user = payload;
        },
        mutateProfileInfo(state, doc) {
            state.profile.id = doc.id;
            state.profile.email = doc.data().email;
            state.profile.first_name = doc.data().first_name;
            state.profile.last_name = doc.data().last_name;
            state.profile.user_name = doc.data().user_name;
        },
        mutateProfileInitials(state) {
            state.profile.initials = state.profile.first_name.match(/(\b\S)?/g).join("") +   //get first and last name initials
                state.profile.last_name.match(/(\b\S)?/g).join("");
        },
        mutateUserProfile(state, payload) {
            Object.keys(payload).forEach(key => {
                state.profile[key] = payload[key];
            });
        },
        mutateBlogTitle(state, payload) {
            state.blogDefault.title = payload;
        },
        mutateBlogHtml(state, payload) {
            state.blogDefault.html = payload;
        },
        mutateFileNameChange(state, payload) {
            state.blogDefault.photoName = payload;
        },
        mutateCreateFileURL(state, payload) {
            state.blogDefault.photoFileUrl = payload;
        },
        mutatePhotoPreview(state) {
            state.blogDefault.photoPreview = !state.blogDefault.photoPreview;
        },
        mutateFilterBlogPost(state,payload){
            state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
        },
        mutateBlogState(state, payload) {
            state.blogDefault.title = payload.blogTitle;
            state.blogDefault.html = payload.blogHTML;
            state.blogDefault.photoFileUrl = payload.blogCoverPhoto;
            state.blogDefault.photoName = payload.blogCoverPhotoName;
        },
    },
    getters: {
        getSampleBlogCards: state => state.sampleBlogCards,
        getEditPost: state => state.editPost,
        getProfile: state => state.profile,
        getUser: state => state.user,
        getBlogDefault: state => state.blogDefault,
        getBlogPosts: state => state.blogPosts,
        getPostLoaded: state => state.postLoaded,
        getBlogPostsFeed: state => state.blogPosts.slice(0, 2),
        getBlogPostsCards: state => state.blogPosts.slice(2, 6),
        getBlogBelongsToUser: state => (blog)=> blog.profileId===state.profile.id
    },
    actions: {
        actionUpdateEditPost({commit}, updatedValue) {
            commit('mutateEditPost', updatedValue);
        },
        async actionGetCurrentUser({commit}) {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
            const results = await dataBase.get();
            await commit('mutateProfileInfo', results);
            await commit('mutateProfileInitials');
        },
        actionUpdateUser({commit}, data) {
            commit('mutateUser', data);
        },
        async actionUpdateProfile({commit, getters}, payload) {
            const dataBase = await db.collection('users').doc(getters.getProfile.id);
            await dataBase.update({
                first_name: getters.getProfile.first_name,
                last_name: getters.getProfile.last_name,
                user_name: getters.getProfile.user_name,
            });
            commit('mutateUserProfile', payload);
            commit('mutateProfileInitials');
        },
        async actionGetPost({ state }) {
            const dataBase = await db.collection("blogPosts").orderBy("date", "desc");
            const dbResults = await dataBase.get();
            dbResults.forEach((doc) => {
                if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
                    const data = {
                        blogID: doc.data().blogID,
                        blogHTML: doc.data().blogHTML,
                        blogCoverPhoto: doc.data().blogCoverPhoto,
                        blogTitle: doc.data().blogTitle,
                        blogDate: doc.data().date,
                        blogCoverPhotoName: doc.data().blogCoverPhotoName,
                        profileId: doc.data().profileId,
                    };
                    state.blogPosts.push(data);
                }
            });
            state.postLoaded = true;
        },
        async updateUserSettings({ commit, state }) {
            const dataBase = await db.collection("users").doc(state.profileId);
            await dataBase.update({
                firstName: state.profileFirstName,
                lastName: state.profileLastName,
                username: state.profileUsername,
            });
            commit("setProfileInitials");
        },
        async actionDeletePost({commit},payload){
            const getPost = await db.collection("blogPosts").doc(payload);
            await getPost.delete();
            commit("mutateFilterBlogPost", payload);
        },
        async actionUpdatePost({ commit, dispatch }, payload) {
            commit("mutateFilterBlogPost", payload);
            await dispatch("actionGetPost");
        },
    }
    ,
    modules: {}
})
