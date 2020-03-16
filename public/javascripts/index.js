function ensurePadding(count) {
    return (count < 10 ? `0${count}` : count);
}

function showTime(hours, minutes, seconds) {
    return `${ensurePadding(hours)}:${ensurePadding(minutes)}:${ensurePadding(seconds)}`;
}

Vue.component('app-main', {
    props: [
        'hours',
        'minutes',
        'seconds',
        'time',
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
            this.$emit('open-settings');
        },
    },
});

Vue.component('app-settings', {
    props: [
        'task',
        'tasks',
    ],
    template: '#app-settings',
    methods: {
        closeSettings() {
            this.$emit('close-settings');
        },
    },
    components: {
        'task': {
            props: [
                'task'
            ],
            template: '#task',
            beforeUpdate: function() {
                const { hours, minutes, seconds } = this.task;
            
                this.task.hours = Number(hours);
                this.task.minutes = Number(minutes);
                this.task.seconds = Number(seconds);
                this.task.time = showTime(hours, minutes, seconds);
            },
            methods: {
                // handleRangeChange(event) {
                //     // todo: one time change event to make API call once new time is decided
                //     // console.log('>>> Vue.component app-settings methods handleRangeChange() event', event);
                //     // const data = { 'something': 21 };
                //     // this.$emit('change-time', data);
                // },
            },
        },
    },
});

const defaultHours = 0;
const defaultMinutes = 0;
const defaultSeconds = 5;

const app8 = new Vue({
    el: '#app-8',
    data: {
        // Settings
        initialHours: defaultHours,
        initialMinutes: defaultMinutes,
        initialSeconds: defaultSeconds,
        
        // figure this part out #TODO
        initShortBreak: 5,
        isBreakTime: false,

        // App state
        timer: null, // used to keep track of interval of counting down
        hours: defaultHours,
        minutes: defaultMinutes,
        seconds: defaultSeconds,
        time: showTime(defaultHours, defaultMinutes, defaultSeconds),
        isTimerActive: false, // should show Play button
        
        isSettingsOpen: false,
        task: {
            id: 1,
            title: 'Work',
            time: showTime(defaultHours, defaultMinutes, defaultSeconds),
            hours: defaultHours,
            minutes: defaultMinutes,
            seconds: defaultSeconds,
        },
        tasks: {
            11: {
                id: 11,
                title: 'Warm Up',
                time: showTime(0, 5, 0),
                hours: 0,
                minutes: 5,
                seconds: 0,
            },
            21: {
                id: 21,
                title: 'Work',
                time: showTime(defaultHours, defaultMinutes, defaultSeconds),
                hours: defaultHours,
                minutes: defaultMinutes,
                seconds: defaultSeconds,
            },
            31: {
                id: 31,
                title: 'Break',
                time: showTime(0, 1, 7),
                hours: 0,
                minutes: 1,
                seconds: 7,
            },
        },
    },
    methods: {
        toggleTimer: function() {
            const self = this;

            function countdownTime() {
                const hours = Number(self.$data.hours);
                const minutes = Number(self.$data.minutes);
                const seconds = Number(self.$data.seconds);

                if (seconds > 0) {
                    self.seconds--;
                } 

                if (seconds == 0 && minutes > 0) {
                    self.minutes--;
                    self.seconds = 59;
                }

                if (seconds == 0 && minutes == 0 && hours > 0) {
                    self.hours--;
                    self.minutes = 59;
                    self.seconds = 59;
                }

                self.time = showTime(self.hours, self.minutes, self.seconds);
                console.log(`>>> the time is: ${self.time}`);
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
            // todo: will have to reset this to the first task in the flow
            self.hours = self.initialHours;
            self.minutes = self.initialMinutes;
            self.seconds = self.initialSeconds;
            self.time = showTime(self.hours, self.minutes, self.seconds);

            // if TIMER is reset then set to the first task in flow
        },
        toggleSettings: function() {
            const self = this;
            self.isSettingsOpen = !self.isSettingsOpen;
        },
        changeTaskTime(data) {
            // todo: to use for API call later
            // const self = this;
            console.log('>>> app new Vue methods changeTaskTime() data:', data);

            // if TIMER is NOT active then update from settings
            // if TIMER is active then don't activate until reset
        }
    },
});