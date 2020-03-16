Vue.component('app-main', {
    props: [
        'hours',
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
        openSettings() {
            console.log('>>> Vue.component app-controls methods openSettings()');
            // calls what is passed into the main app declaration
            this.$emit('open-settings');
        },
    },
});

Vue.component('app-settings', {
    props: [
        'task',
    ],
    template: '#app-settings',
    methods: {
        handleRangeChange(event) {
            console.log('>>> Vue.component app-settings methods handleRangeChange() event', event);

            const data = { 'something': 21 };
            this.$emit('change-time', data);
        },
        closeSettings() {
            console.log('>>> Vue.component app-settings methods closeSettings()');
            //  03> we then call the method name that was passed in
            // note that we $emit the method name passed into this component
            this.$emit('close-settings');
        },
    },
});

const defaultHours = '00';
const defaultMinutes = '01';
const defaultSeconds = '02';

let tasks = [
    {
        id: 1,
        time: `${defaultHours}:${defaultMinutes}:${defaultSeconds}`,
        hours: defaultHours,
        minutes: defaultMinutes,
        seconds: defaultSeconds,
    },
];

const app8 = new Vue({
    el: '#app-8',
    data: {
        // Settings
        initialHours: defaultHours,
        initialMinutes: defaultMinutes,
        initialSeconds: defaultSeconds,
        
        // figure this part out #TODO
        initShortBreak: '05',
        isBreakTime: false,

        // App state
        timer: null, // used to keep track of interval of counting down
        hours: defaultHours,
        minutes: defaultMinutes,
        seconds: defaultSeconds,
        isTimerActive: false, // should show Play button
        
        isSettingsOpen: false,
        task: {
            time: `${defaultHours}:${defaultMinutes}:${defaultSeconds}`,
            hours: defaultHours,
            minutes: defaultMinutes,
            seconds: defaultSeconds,
        },
    },
    methods: {
        toggleTimer: function() {
            const self = this;

            function ensurePadding(count) {
                return (count < 10 ? `0${count}` : count);
            }

            function countdownTime() {
                const hours = Number(self.$data.hours);
                const minutes = Number(self.$data.minutes);
                const seconds = Number(self.$data.seconds);

                if (seconds > 0) {
                    self.seconds--;
                    self.seconds = ensurePadding(self.seconds);
                    return;
                } 

                if (seconds == 0 && minutes > 0) {
                    self.minutes--;
                    self.seconds = 59;
                    self.minutes = ensurePadding(self.minutes);
                    return;
                }

                if (seconds == 0 && minutes == 0 && hours > 0) {
                    self.hours--;
                    self.minutes = 59;
                    self.seconds = 59;
                    self.hours = ensurePadding(self.hours);
                    return;
                }

                console.log(`>>> the time is: ${hours}:${minutes}:${seconds}`);
                // if timer reaches 00:00:00 then stop all count down #TODO
                // don't start until press play again? or reset

                // do something to check if it is break time (or next task) #TODO
            }

            // toggle Timer play and pause button
            self.isTimerActive = !self.isTimerActive;

            // start or stop the timer countdown if Timer is clicked
            if (self.isTimerActive) {
                self.timer = setInterval(countdownTime, 1000);
            } else {
                clearInterval(self.timer);
            }

        },
        resetTimer: function() {
            const self = this;

            clearInterval(self.timer);
            self.isTimerActive = false;
            self.hours = self.initialHours;
            self.minutes = self.initialMinutes;
            self.seconds = self.initialSeconds;

        },
        // 01> method created
        toggleSettings: function() {
            console.log('>>> app new Vue methods toggleSettings()');
            const self = this;
            self.isSettingsOpen = !self.isSettingsOpen;
        },
        changeTaskTime(data) {
            const self = this;
            console.log('>>> app new Vue methods changeTaskTime() data:', data);
        }
    },
});