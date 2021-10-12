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
        mutateUserProfile(state,payload){
            Object.keys(payload).forEach(key => {
                state.profile[key] = payload[key];
            });
        }
    },
    getters: {
        getSampleBlogCards: state => state.sampleBlogCards,
        getEditPost: state => state.editPost,
        getProfile: state => state.profile,
        getUser: state => state.user,
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
        async actionUpdateProfile({commit,getters},payload) {
            const dataBase = await db.collection('users').doc(getters.getProfile.id);
            await dataBase.update({
                first_name: getters.getProfile.first_name,
                last_name: getters.getProfile.last_name,
                user_name: getters.getProfile.user_name,
            });
            commit('mutateUserProfile', payload);
            commit('mutateProfileInitials');
        },
    },
    modules: {}
})
