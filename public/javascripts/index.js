function ensurePadding(count) {
    return (count < 10 ? `0${count}` : count);
}

function showTime(hours, minutes, seconds) {
    return `${ensurePadding(hours)}:${ensurePadding(minutes)}:${ensurePadding(seconds)}`;
}

function updateCurrentTask(currentTask, updatedTask) {
    currentTask.id = updatedTask.id;
    currentTask.title = updatedTask.title;
    currentTask.hours = updatedTask.hours;
    currentTask.minutes = updatedTask.minutes;
    currentTask.seconds = updatedTask.seconds;
    currentTask.time = updatedTask.time;
    currentTask.nextTask = updatedTask.nextTask;

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

const taskComponent = {
    props: [
        'isTimerActive',
        'currentTask',
        'task',
        'taskRemove',
    ],
    template: '#task',
    beforeUpdate() {
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
        onTitleUpdate(e) {
            this.task.title = e.target.innerText.trim();
        },
        removeTask(taskId) {
            // need to delete the current task I think from the task list
            console.log('>>> settings task removeTask', taskId);
            this.$emit('remove-task', taskId);
        }
        // handleRangeChange(event) {
        //     // todo: one time change event to make API call once new time is decided
        //     // console.log('>>> Vue.component app-settings methods handleRangeChange() event', event);
        //     // const data = { 'something': 21 };
        //     // this.$emit('change-time', data);
        // },
    },
};

Vue.component('app-settings', {
    props: [
        'isTimerActive',
        'currentTask',
        'tasks',
        'deleteTask',
        'taskOrder',
    ],
    template: '#app-settings',
    methods: {
        closeSettings() {
            this.$emit('close-settings');
        },
        taskRemove(data) {
            console.log('>>> app-settings taskRemove(data) ', data);
            this.$emit('task-remove', data);
        },
    },
    components: {
        'task': taskComponent,
    },
});

const defaultHours = 0;
const defaultMinutes = 0;
const defaultSeconds = 5;
const appState = {
    isTimerActive: false,
    currentTask: {
        firstTask: 21,
        id: 21,
        title: 'Work',
        hours: defaultHours,
        minutes: defaultMinutes,
        seconds: defaultSeconds,
        time: showTime(defaultHours, defaultMinutes, defaultSeconds),  
        timer: null, // used to keep track of interval of counting down
        nextTask: 11,
    },
    
    autoPlayTasks: true,
    loopTasks: false,
    isSettingsOpen: false,

    taskOrder: [21, 11, 31],
    tasks: {
        11: {
            id: 11,
            title: 'Warm Up',
            hours: 0,
            minutes: 0,
            seconds: 21,
            time: showTime(0, 0, 21),
            nextTask: 31,
        },
        21: {
            id: 21,
            title: 'Work',
            hours: defaultHours,
            minutes: defaultMinutes,
            seconds: defaultSeconds,
            time: showTime(defaultHours, defaultMinutes, defaultSeconds),
            nextTask: 11,
        },
        31: {
            id: 31,
            title: 'Break',
            hours: 0,
            minutes: 0,
            seconds: 7,
            time: showTime(0, 0, 7),
            nextTask: null,
        },
    },
};


const app8 = new Vue({
    el: '#app-8',
    data: appState,
    methods: {
        toggleTimer() {
            const self = this;

            function countdownTimeLoop(dataTask, currentTask, autoPlayTasks, loopTasks) {
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
                    console.log('>>> I am going to stop timer now');
                    // #todo: fix to limit this scope 03
                    self.isTimerActive = false;
                    clearInterval(currentTask.timer);

                    if (!autoPlayTasks) {
                        return;
                    }

                    if (!currentTask.nextTask && !loopTasks) {
                        return;
                    }

                    const nextTask = currentTask.nextTask ? 
                        self.tasks[currentTask.nextTask] : 
                        self.tasks[currentTask.firstTask];
                    // #todo: fix to limit this scope
                    self.currentTask = updateCurrentTask(currentTask, nextTask);
                    self.isTimerActive = true;
                    self.currentTask.timer = 
                        setInterval(countdownTimeLoop, 1000, self.currentTask, self.currentTask, autoPlayTasks, loopTasks);
                }

                currentTask.time = showTime(currentTask.hours, currentTask.minutes, currentTask.seconds);
                console.log(`>>> the time is ${currentTask.time} for ${currentTask.title}`);
            }

            // toggle Timer play and pause button
            self.isTimerActive = !self.isTimerActive;

            // start or stop the timer countdown if Timer is clicked
            if (self.isTimerActive) {
                self.currentTask.timer = 
                    setInterval(countdownTimeLoop, 1000, self.$data.currentTask, self.currentTask, self.autoPlayTasks, self.loopTasks);
            } else {
                clearInterval(self.currentTask.timer);
            }
        },
        resetTimer() {
            const self = this;

            clearInterval(self.currentTask.timer);
            self.isTimerActive = false;
            // resets to the first task in the Flow
            self.currentTask = updateCurrentTask(self.currentTask, self.tasks[self.currentTask.firstTask]);
        },
        toggleSettings() {
            const self = this;
            self.isSettingsOpen = !self.isSettingsOpen;
        },
        // changeTaskTime(data) {
        //     // to use for API call later #todo
        //     // const self = this;
        //     console.log('>>> app new Vue methods changeTaskTime() data:', data);
        // },
        createTask() {
            console.log('>> createTask');
            // #todo: add to taskOrder
            // #todo: add to tasks
            // #todo: update nextTask of last Task
        },
        deleteTask(taskId) {
            console.log('>>> taskId', taskId);
            const self = this;
            const { taskOrder, tasks } = self;
            const thisTaskIndex = taskOrder.indexOf(taskId);
            console.log('>>> thisTaskIndex', thisTaskIndex);
            
            // update previous task's nextTask && filter taskOrder && remove from self.tasks
            //>> this works
            self.tasks[taskOrder[thisTaskIndex - 1]].nextTask = tasks[taskId].nextTask;
            
            console.log('>>> self.taskOrder before', self.taskOrder);
            console.log('>>> taskOrder ', taskOrder);
            self.taskOrder = taskOrder.filter(task => {
                console.log(`>>> task.id=${task.id} && taskId=${taskId}`);
                return task != taskId;
            });
            console.log('>>> self.taskOrder after', self.taskOrder);

            //>> this works
            delete self.tasks[taskId];

            // check if matching currentTask
            // if currently going (isTimerActive) then dont update >> nah just update
            // if paused then need to updateCurrentTask() with nextTask

            // else check if firstTask & not currentTask >> update currentTask.firstTask

        }
    },
});