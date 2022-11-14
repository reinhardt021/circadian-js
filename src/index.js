import Vue from 'vue'
import './stylesheets/style.css'
import App from './App.vue'

new Vue({
    el: '#timer',
    data: {
        message: "Hello, vue!",
        list: [1,2,3],
        //list: undefined, // test for if nothing passed
    },
    template: "<App :list='list' />",
    components: { App }
})
