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
            'minutes',
            'seconds',
            'isTimerActive',
            'isBreakTime',
        ],
        template: '#app-main',
        methods: {
            toggleTimer() {
                this.$emit('toggle-timer');
            },
        },
    });

    Vue.component('app-controls', {
        props: [],
        template: '#app-controls',
        methods: {
            resetTimer() {
                this.$emit('reset-timer');
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
            minutes: 25,
            seconds: '00',
            isBreakTime: false,
            // isTimerActive: true, // should show Pause button
            isTimerActive: false, // should show Play button
        },
        methods: {
            toggleTimer: function() {
                const self = this;
                const isBreakTime = self.isBreakTime;
                console.log('>>> toggleTimer isBreakTime: ', isBreakTime);

                // toggle Timer play and pause button
                self.isTimerActive = !self.isTimerActive;
            },
            resetTimer: function() {
                const self = this;
                console.log('>>> resetTimer self: ', self);
            },
            toggleSidebar: function() {
                const self = this;
                console.log('>>> toggleSidebar self: ', self);
            },
        },
    });

// })();