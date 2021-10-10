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
        editPost: false,
        user: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUserName: null,
        profileId: null,
        profileInitials: null,
    },
    mutations: {
        mutateEditPost: (state, updatedValue) => (state.editPost = updatedValue),
        mutateUser(state, payload) {
            state.user = payload;
        },
        mutateProfileInfo(state, doc) {
            state.profileId = doc.id;
            state.profileEmail = doc.data().email;
            state.profileFirstName = doc.data().first_name;
            state.profileLastName = doc.data().last_name;
            state.profileUserName = doc.data().user_name;
        },
        mutateProfileInitials(state) {
            state.profileInitials = state.profileFirstName.match(/(\b\S)?/g).join("") +   //get first and last name initials
                state.profileLastName.match(/(\b\S)?/g).join("");
        }
    },
    getters: {
        getSampleBlogCards: state => state.sampleBlogCards,
        getEditPost: state => state.editPost
    },
    actions: {
        actionUpdateEditPost({commit}, updatedValue) {
            commit('mutateEditPost', updatedValue);
        },
        async actionGetCurrentUser({commit}) {
            const dataBase = await db.collection('users').doc(firebase.auth().currentUser.uid);
            const results = await dataBase.get();
            console.log(results,'results');
            await commit('mutateProfileInfo', results);
            await commit('mutateProfileInitials');
        },
        actionUpdateUser({commit}, data) {
            commit('mutateUser', data);
        }
    },
    modules: {}
})
