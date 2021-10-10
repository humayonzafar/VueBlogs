import "./firebase/firebaseInit";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Vue2Editor from "vue2-editor";
import '../src/assets/css/app.css';
import firebase from 'firebase/app';
import 'firebase/auth';
Vue.use(Vue2Editor);
Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged(()=>{
   if(!app){     // if app not already initialized
     new Vue({
       router,
       store,
       render: (h) => h(App),
     }).$mount("#app");
   }
});


