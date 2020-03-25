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
    props: {
        isTimerActive: Boolean,
        currentTask: Object,
    },
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
    props: {
        isTimerActive: Boolean,
        currentTask: Object,
        task: Object,
    },
    template: '#task-item',
    methods: {
        removeTask(taskId) {
            this.$emit('remove-task', taskId);
        },
        changeTitle(e) {
            const newTask = this.task;
            newTask.title = e.target.innerText.trim();
            this.$emit('change-task', newTask);
        },
        changeTime(e) {
            const newTask = this.task;
            const { dataset:{ type }, value } = e.target;
            const timePeriod = type.replace('task-', '');
            newTask[timePeriod] = Number(value);
            newTask.time = showTime(newTask.hours, newTask.minutes, newTask.seconds);
            this.$emit('change-task', newTask);
        },
    },
};

Vue.component('app-settings', {
    props: {
        isTimerActive: Boolean,
        currentTask: Object,
        tasks: Object,
        taskOrder: Array,
    },
    template: '#app-settings',
    methods: {
        taskChange(newTask) {
            this.$emit('task-change', newTask);
        },
        taskRemove(data) {
            this.$emit('task-remove', data);
        },
        taskAdd() {
            this.$emit('task-add');
        },
        closeSettings() {
            this.$emit('close-settings');
        },
    },
    components: {
        'task-item': taskComponent,
    },
});

const task01 = {
    id: 21,
    title: 'Warm Up',
    hours: 0,
    minutes: 0,
    seconds: 5,
};
const task02 = {
    id: 11,
    title: 'WORK',
    hours: 0,
    minutes: 1,
    seconds: 0,
};
const task03 = {
    id: 31,
    title: 'Break',
    hours: 0,
    minutes: 0,
    seconds: 30,
};

const appState = {
    isTimerActive: false,
    currentTask: {
        firstTask: task01.id,
        ...task01,
        time: showTime(task01.hours, task01.minutes, task01.seconds),
        timer: null, // used to keep track of interval of counting down
        nextTask: task02.id,
    },
    
    autoPlayTasks: true,
    loopTasks: false,
    isSettingsOpen: true,

    taskOrder: [task01.id, task02.id, task03.id],
    tasks: {
        [task01.id]: {
            ...task01,
            time: showTime(task01.hours, task01.minutes, task01.seconds),
            nextTask: task02.id,
        },
        [task02.id]: {
            ...task02,
            time: showTime(task02.hours, task02.minutes, task02.seconds),
            nextTask: task03.id,
        },
        [task03.id]: {
            ...task03,
            time: showTime(task03.hours, task03.minutes, task03.seconds),
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
        createTask() {
            console.log('>> createTask');
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                
                return Math.floor(Math.random() * (max - min)) + min;
            }
            const self = this;
            const { taskOrder } = self;
            // create unique ID
            const newTaskId = getRandomInt(500,1000);
            const lastTask = taskOrder[taskOrder.length - 1];
            self.tasks[lastTask].nextTask = newTaskId;
            const newTask = {
                id: newTaskId,
                title: 'New Task',
                hours: 0,
                minutes: 0,
                seconds: 0,
                time: showTime(0, 0, 0),
                nextTask: null,
            };
            self.tasks[newTaskId] = newTask;
            self.taskOrder = taskOrder.concat([newTaskId]);            
        },
        deleteTask(taskId) {
            const self = this;
            const { isTimerActive, currentTask, taskOrder, tasks } = self;
            const thisTaskIndex = taskOrder.indexOf(taskId);
            const taskToDelete = tasks[taskId];

            // if the taskToDelete is the first task then update the firstTask
            if (thisTaskIndex == 0) {
                self.currentTask.firstTask = taskToDelete.nextTask;
            }

            if (thisTaskIndex > 0) {
                // update the Tasks linked list pointer in the previous Task
                self.tasks[taskOrder[thisTaskIndex - 1]].nextTask = taskToDelete.nextTask;
            }

            // update the currentTask.nextTask if this points to the task to be deleted
            if (currentTask.nextTask == taskId) {
                self.currentTask.nextTask = taskToDelete.nextTask;
            }

            // if the currentTask is deleted then update if timer is inactive
            if (currentTask.id == taskId && !isTimerActive && taskToDelete.nextTask) {
                self.currentTask = updateCurrentTask(currentTask, tasks[taskToDelete.nextTask]);
            }
            
            // remove Task from taskOrder list and from Tasks linked list
            self.taskOrder = taskOrder.filter(task => task != taskId);
            delete self.tasks[taskId];
        },
        updateTitle(newTask) {
            this.tasks[newTask.id] = newTask;
            if (newTask.id == this.currentTask.id && !this.isTimerActive) {
                this.currentTask = updateCurrentTask(this.currentTask, newTask);
            }
        },
        updateTask(newTask) {
            // it looks like the data / app state doesn't update unless somehting either than the tasks updates
            // so the current task 
            // or the timer starting and going
            this.tasks = {
                ...this.tasks,
                [newTask.id]: newTask,
            };
            // this works a bit better
            // but still doesn't seem to update the time in the task component for some reason
            
            // still figuring out why updates not working on task props/ component 

            //#todo figure out why this is not working in flow
            // data at root doesn't seem to update either
            // NOT SURE WHY IT DOESNT Work 
            // the props don't update for the Task component
            // but they work for the current task
            // maybe it is 
            // it only seems to work for the first Task in the list but any new tasks in the list
            // scratch that it is only the current task
            // so there must be some disconnect when updating the task 
            // 2> it also seems to have a bigger issue of the time just not being update in general

            


            if (newTask.id == this.currentTask.id && !this.isTimerActive) {
                this.currentTask = updateCurrentTask(this.currentTask, newTask);
            }
        },
    },
});