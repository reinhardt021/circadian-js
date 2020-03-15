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

const app8 = new Vue({
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