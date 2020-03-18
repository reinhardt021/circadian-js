function ensurePadding(count) {
    return (count < 10 ? `0${count}` : count);
}

function showTime(hours, minutes, seconds) {
    return `${ensurePadding(hours)}:${ensurePadding(minutes)}:${ensurePadding(seconds)}`;
}

function updateCurrentTask(currentTask, updatedTask) {
    currentTask.title = updatedTask.title;
    currentTask.hours = updatedTask.hours;
    currentTask.minutes = updatedTask.minutes;
    currentTask.seconds = updatedTask.seconds;
    currentTask.time = updatedTask.time;

    return currentTask;
}

Vue.component('app-main', {
    props: [
        'isTimerActive',
        'currentTask',
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
        'isTimerActive',
        'currentTask',
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
                'isTimerActive',
                'currentTask',
                'task',
            ],
            template: '#task',
            beforeUpdate: function() {
                const { id, hours, minutes, seconds } = this.task;
            
                this.task.hours = Number(hours);
                this.task.minutes = Number(minutes);
                this.task.seconds = Number(seconds);
                this.task.time = showTime(hours, minutes, seconds);
                
                if (id == this.currentTask.id && !this.isTimerActive) {
                    this.currentTask = updateCurrentTask(this.currentTask, this.task);
                }
            },
            methods: {
                onTitleUpdate: function(e) {
                    this.task.title = e.target.innerText.trim();
                },
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
        // App state
        isTimerActive: false, // should show Play button
        currentTask: {
            id: 21,
            title: 'Work',
            hours: defaultHours,
            minutes: defaultMinutes,
            seconds: defaultSeconds,
            time: showTime(defaultHours, defaultMinutes, defaultSeconds),  
            timer: null, // used to keep track of interval of counting down
        },
        
        autoPlayTasks: true, // TODO
        isSettingsOpen: false,
        tasks: {
            11: {
                id: 11,
                title: 'Warm Up',
                hours: 0,
                minutes: 5,
                seconds: 0,
                time: showTime(0, 5, 0),
            },
            21: {
                id: 21,
                title: 'Work',
                hours: defaultHours,
                minutes: defaultMinutes,
                seconds: defaultSeconds,
                time: showTime(defaultHours, defaultMinutes, defaultSeconds),
            },
            31: {
                id: 31,
                title: 'Break',
                hours: 0,
                minutes: 1,
                seconds: 7,
                time: showTime(0, 1, 7),
            },
        },
    },
    methods: {
        toggleTimer: function() {
            const self = this;

            function countdownTime(dataTask, currentTask) {
                const hours = Number(dataTask.hours);
                const minutes = Number(dataTask.minutes);
                const seconds = Number(dataTask.seconds);

                if (seconds > 0) {
                    currentTask.seconds--;
                } 

                if (seconds == 0 && minutes > 0) {
                    currentTask.minutes--;
                    currentTask.seconds = 59;
                }

                if (seconds == 0 && minutes == 0 && hours > 0) {
                    currentTask.hours--;
                    currentTask.minutes = 59;
                    currentTask.seconds = 59;
                }

                if (seconds == 0 && minutes == 0 && hours ==0) {
                    clearInterval(currentTask.timer);
                    self.isTimerActive = !self.isTimerActive;
                }

                currentTask.time = showTime(
                    currentTask.hours,
                    currentTask.minutes,
                    currentTask.seconds
                );
                console.log(`>>> the time is: ${currentTask.time}`);

                
                // if timer reaches 00:00:00 then stop all count down? #TODO
                // don't start until press play again? or reset
                // do something to check if it is break time (or next task) #TODO
            }

            // toggle Timer play and pause button
            self.isTimerActive = !self.isTimerActive;

            // start or stop the timer countdown if Timer is clicked
            if (self.isTimerActive) {
                self.currentTask.timer = setInterval(
                    countdownTime, 
                    1000, 
                    self.$data.currentTask, 
                    self.currentTask
                );
            } else {
                clearInterval(self.currentTask.timer);
            }
        },
        resetTimer: function() {
            const self = this;

            clearInterval(self.currentTask.timer);
            self.isTimerActive = false;
            self.currentTask = updateCurrentTask(self.currentTask, self.tasks[self.currentTask.id]);
            // if TIMER is reset then set to the first task in flow? #todo
        },
        toggleSettings: function() {
            const self = this;
            self.isSettingsOpen = !self.isSettingsOpen;
        },
        changeTaskTime(data) {
            // to use for API call later #todo
            // const self = this;
            console.log('>>> app new Vue methods changeTaskTime() data:', data);
        }
    },
});