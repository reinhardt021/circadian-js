// (function () {

    // var app = new Vue({
    //     el: '#app',
    //     data: {
    //         message: 'Hello Vue!'
    //     }
    // })
    // var app2 = new Vue({
    //     el: '#app-2',
    //     data: {
    //         message: 'You loaded this page on ' + new Date().toLocaleString()
    //     }
    // })
    // var app3 = new Vue({
    //     el: '#app-3',
    //     data: {
    //         seen: true
    //     }
    // })
    // var app4 = new Vue({
    //     el: '#app-4',
    //     data: {
    //         todos: [
    //             { text: 'Learn JavaScript' },
    //             { text: 'Learn Vue' },
    //             { text: 'Build something awesome' },
    //         ]
    //     }
    // })
    // var app5 = new Vue({
    //     el: '#app-5',
    //     data: {
    //         message: 'Hellooo Nurse!'
    //     },
    //     methods: {
    //         reverseMessage: function () {
    //             this.message = this.message.split('').reverse().join('')
    //         }
    //     }
    // })
    // var app6 = new Vue({
    //     el: '#app-6',
    //     data: {
    //         message: 'Hello Vue!'
    //     }
    // })
    // Vue.component('todo-item', {
    //     // The todo-item component now accepts a 
    //     // 'prop', which is like a custom attribute.
    //     // This prop is called todo.
    //     props: ['todo'],
    //     template: '<li>{{ todo.text }}</li>'
    // })
    // var app7 = new Vue({
    //     el: '#app-7',
    //     data: {
    //         groceryList: [
    //             { id: 1, text: 'Bananas' },
    //             { id: 2, text: 'Eggs' },
    //             { id: 3, text: 'Bread' },
    //         ]
    //     }
    // })

    Vue.component('app-main', {
        props: [
            'isBreakTime',
            'minutes',
            'seconds',
        ],
        template: '#app-main',
    });

    Vue.component('app-controls', {
        props: [
            'isTimerActive',
        ],
        template: '#app-controls',
        methods: {
            resetTimer() {
                this.$emit('reset-timer');
            },
            toggleTimer() {
                this.$emit('toggle-timer');
            },
            toggleSidebar() {
                this.$emit('toggle-sidebar');
            },
        },
    });

    let app8 = new Vue({
        el: '#app-8',
        data: {
            // Settings
            initWork: 25,
            initShortBreak: 5,

            // App state
            isBreakTime: false,
            minutes: 25,
            seconds: '00',

            // isTimerActive: true, // should show Pause button
            isTimerActive: false, // should show Play button
        },
        methods: {
            resetTimer: function() {
                const self = this;
                console.log('>>> resetTimer self: ', self);
            },
            toggleTimer: function() {
                const self = this;
                console.log('>>> toggleTimer self: ', self);
            },
            toggleSidebar: function() {
                const self = this;
                console.log('>>> toggleSidebar self: ', self);
            },
        },
    });

// })();