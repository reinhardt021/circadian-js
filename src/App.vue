<template>
    <div id="timer" class="site">
        <h2>
            <i class="fas fa-bug"></i>
            <span v-text="currentFlow.title"></span>
        </h2>
        <AppModal v-if="showPlaylistModal" @close="showPlaylistModal = false">
            <h3 slot="header">
                <i class="fa fa-crosshairs" aria-hidden="true"></i>
                Focus Playlist
            </h3>
            <div slot="body">
                <div class="settings-card">
                    <i class="fa fa-circle" aria-hidden="true"></i>
                    Default Playlist
                </div>
                <div class="settings-card">
                    <i class="fa fa-circle-o" aria-hidden="true"></i>
                    Flex Playlist
                </div>

                <div class="settings-options">
                    <div class="settings-card">
                        <i class="fa fa-plus" aria-hidden="true"></i>
                        Add Playlist
                    </div>
                </div>
                
            </div>
        </AppModal>
        <AppModal v-if="showDefaultsModal" @close="showDefaultsModal = false">
            <h3 slot="header">
                <i class="fa fa-cog" aria-hidden="true"></i>
                Defaults
            </h3>
            <div slot="body">
                <div class="settings-card">
                    <span>
                        <i class="fa fa-volume-up" aria-hidden="true"></i>
                        Master Volume
                    </span>
                    <span>
                        <input class='volume-input' type='range' min='0' max='100' v-model="currentTask.volume" @input='changeVolume'/>
                    </span>
                </div>
                <div class="settings-options">
                    <div class="settings-card">
                        <span>
                            <i class="fa fa-volume-up" aria-hidden="true"></i>
                            Task Ending Audio
                        </span>
                        <span>
                            <input class='volume-input' type='range' min='0' max='100'/>
                        </span>
                    </div>

                    <div class="settings-card">
                        <span>
                            <i class="fa fa-volume-up" aria-hidden="true"></i>
                            Focus Ambient Audio
                        </span>
                        <span>
                            <input class='volume-input' type='range' min='0' max='100'/>
                        </span>
                    </div>
                </div>
            </div>
        </AppModal>
        <AppTimer 
            :is-timer-active='isTimerActive'
            :current-task='currentTask' 
            @toggle-timer='toggleTimer'
        />
        <AppControls
            @reset-timer='resetTimer'
            @open-settings='toggleSettings'
        />
        <AppSettings 
            :is-timer-active='isTimerActive'
            :current-flow='currentFlow'
            :current-task='currentTask'
            :tasks='tasks'
            :settings='settings'
            v-show='settings.isOpen'
            @open-playlist-modal='openPlaylistModal'
            @open-defaults-modal='openDefaultsModal'
            @task-change='updateTask'
            @task-remove='deleteTask'
            @task-add='createTask'
            @close-settings='toggleSettings'
        />
    </div>
</template>

<script>
import AppModal from './components/AppModal.vue'
import AppTimer from './components/AppTimer.vue'
import AppControls from './components/AppControls.vue'
import AppSettings from './components/AppSettings.vue'

import { showTime, formatTime, updateCurrentTask } from './helpers.js'

import WindMp3 from './audio/Wind-Mark_DiAngelo.mp3'
import MetalGongMp3 from './audio/Metal_Gong-Dianakc.mp3'

const templateTask = {
    title: 'New Task',
    type: 'break',
    hours: 0,
    minutes: 0,
    seconds: 0,
    time: showTime(0, 0, 0),
    view: formatTime(0, 0, 0),
    nextTask: null,
    audioFile: '',
};

const task01 = {
    id: 21,
    title: 'Warm Up',
    type: 'break',
    hours: 0,
    minutes: 0,
    seconds: 30,
    audioFile: '',
};
const task02 = {
    id: 11,
    title: 'WORK',
    type: 'focus',
    hours: 0,
    minutes: 25,
    seconds: 0,
    audioFile: WindMp3,
};
const task03 = {
    id: 31,
    title: 'Break',
    type: 'break',
    hours: 0,
    minutes: 13,
    seconds: 0,
    audioFile: '',
};

const appState = {
    isTimerActive: false,
    showPlaylistModal: false,
    // showPlaylistModal: true, // for testing TODO: remove

    // showDefaultsModal: false,
    showDefaultsModal: true, // for testing TODO: remove

    // todo: move this to UserTimerSettings
    currentFlow: {
        id: 13,
        title: 'Pomodoro Flow'
    },

    // todo: move this to UserTimerSettings
    currentTask: {
        firstTask: task01.id,
        ...task01,
        time: showTime(task01.hours, task01.minutes, task01.seconds),
        view: formatTime(task01.hours, task01.minutes, task01.seconds),
        nextTask: task02.id,
        timer: null, // used to keep track of interval of counting down
        audio: null, // used to keep track of Audio files being played
        volume: 75, // default to 75% audio
    },

    // todo: get this from API for UserTimerSettings
    settings: {
        isOpen: false,
        autoPlayTasks: true,
        taskOrder: [task01.id, task02.id, task03.id], // todo: move this to currentFlow
        loopTasks: true,
        timerAudioFile: MetalGongMp3,
        audio: null,
    },

    flows: {},

    tasks: {
        [task01.id]: {
            ...task01,
            time: showTime(task01.hours, task01.minutes, task01.seconds),
            view: formatTime(task01.hours, task01.minutes, task01.seconds),
            nextTask: task02.id,
        },
        [task02.id]: {
            ...task02,
            time: showTime(task02.hours, task02.minutes, task02.seconds),
            view: formatTime(task02.hours, task02.minutes, task02.seconds),
            nextTask: task03.id,
        },
        [task03.id]: {
            ...task03,
            time: showTime(task03.hours, task03.minutes, task03.seconds),
            view: formatTime(task03.hours, task03.minutes, task03.seconds),
            nextTask: null,
        },
    },
};

function playAudio(filePath, volumePercent, loop) {
    if (filePath == '') {
        return null;
    }
    var audio = new Audio(filePath);
    audio.loop = loop ? loop : false;
    audio.volume = volumePercent / 100;
    audio.play();
    
    return audio;
}

function getTimeLeft(task) {
    let times = [];
    if (task.hours > 0) {
        times.push(`${task.hours}h`);
    }
    if (task.minutes > 0) {
        times.push(`${task.minutes}m`);
    }
    if (task.seconds > 0) {
        times.push(`${task.seconds}s`);
    }

    return times.join(' ');
}

function showNotification(task) {
    if (!("Notification" in window)) {
        return;
    }

    const timeLeft = getTimeLeft(task);
    const notificationMessage = `Time for: ${task.title} (${timeLeft})`;
    if (Notification.permission === 'granted') {
        new Notification(notificationMessage);
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(notificationMessage);
            }
        });
    }
}

function countdownTimeLoop(app) {
    const { tasks, $data, currentTask, settings } = app;
    const hours = Number($data.currentTask.hours);
    const minutes = Number($data.currentTask.minutes);
    const seconds = Number($data.currentTask.seconds);

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

    if (seconds == 1 && minutes == 0 && hours ==0) {
        if (app.currentTask.audio) {
            app.currentTask.audio.pause();
        }
        app.settings.audio = playAudio(app.settings.timerAudioFile, currentTask.volume);
    }

    if (seconds == 0 && minutes == 0 && hours ==0) {
        app.isTimerActive = false;
        clearInterval(currentTask.timer);

        if (!settings.autoPlayTasks) {
            return;
        }

        if (!currentTask.nextTask && !settings.loopTasks) {
            return;
        }

        const nextTask = currentTask.nextTask 
            ? tasks[currentTask.nextTask]
            : tasks[currentTask.firstTask];

        app.currentTask = updateCurrentTask(currentTask, nextTask);
        app.isTimerActive = true;
        app.currentTask.timer = setInterval(countdownTimeLoop, 1000, app);
        app.currentTask.audio = playAudio(nextTask.audioFile, currentTask.volume, true);
        showNotification(app.currentTask);
    }

    currentTask.time = showTime(currentTask.hours, currentTask.minutes, currentTask.seconds);
    currentTask.view = formatTime(currentTask.hours, currentTask.minutes, currentTask.seconds);
}

export default {
    data: function () {
        //todo: find out proper styling for this to be consistent
        return appState;
    },
    methods: {
        toggleTimer() {
            const self = this;

            // toggle Timer play and pause button
            self.isTimerActive = !self.isTimerActive;

            // start or stop the timer countdown if Timer is clicked
            if (self.isTimerActive) {
                if (self.currentTask.audio) {
                    self.currentTask.audio.play();
                } else {
                    self.currentTask.audio = playAudio(self.currentTask.audioFile, self.currentTask.volume, true);
                }
                self.currentTask.timer = setInterval(countdownTimeLoop, 1000, self);
            } else {
                if (self.currentTask.audio) {
                    self.currentTask.audio.pause();
                }
                clearInterval(self.currentTask.timer);
            }
        },
        resetTimer() {
            const { currentTask, tasks } = this;
            if (currentTask.audio) {
                currentTask.audio.pause();
            }
            clearInterval(this.currentTask.timer);
            this.isTimerActive = false;
            
            // if currentTask.firstTask == null OR there are no more tasks
            // then just reset to the currentTask
            // or reset to the first task in the flow
            const nextTask = (currentTask.firstTask === null)
                ? currentTask
                : tasks[currentTask.firstTask];
            
            this.currentTask = updateCurrentTask(currentTask, nextTask);
        },
        toggleSettings() {
            this.settings.isOpen = !this.settings.isOpen;
        },
        openPlaylistModal(type) {
            // todo: use the type to open for FOCUS or BREAK
            this.showPlaylistModal = true;
        },
        openDefaultsModal() {
            this.showDefaultsModal = true;
        },
        createTask() {
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                
                return Math.floor(Math.random() * (max - min)) + min;
            }
            const { currentTask, settings:{ taskOrder } } = this;
            const newTaskId = getRandomInt(500, 1000);
            
            // if there are no more tasks in the flow 
            if (taskOrder.length === 0) {
                // then update the currentTask.firstTask to the new task
                this.currentTask.firstTask = newTaskId;
            }

            if (taskOrder.length > 0) {
                const previousTask = taskOrder[taskOrder.length - 1];
                this.tasks[previousTask].nextTask = newTaskId;
            }

            // if the current task comes before this new task 
            if (currentTask.nextTask == null) {
                // then update currentTask.nextTask to the new task
                this.currentTask.nextTask = newTaskId;
            }

            const newTask = {
                id: newTaskId,
                ...templateTask,
            };
            this.tasks[newTaskId] = newTask;
            this.settings.taskOrder = taskOrder.concat([newTaskId]);            
        },
        deleteTask(taskId) {
            const { isTimerActive, currentTask, settings:{ taskOrder }, tasks } = this;
            const thisTaskIndex = taskOrder.indexOf(taskId);
            const taskToDelete = tasks[taskId];

            // if the taskToDelete is the first task then update the firstTask
            if (thisTaskIndex == 0) {
                this.currentTask.firstTask = taskToDelete.nextTask;
            }

            if (thisTaskIndex > 0) {
                // update the Tasks linked list pointer in the previous Task
                this.tasks[taskOrder[thisTaskIndex - 1]].nextTask = taskToDelete.nextTask;
            }

            // update the currentTask.nextTask if this points to the task to be deleted
            if (currentTask.nextTask == taskId) {
                this.currentTask.nextTask = taskToDelete.nextTask;
            }

            // if the currentTask is deleted then update if timer is inactive
            if (currentTask.id == taskId && !isTimerActive && taskToDelete.nextTask) {
                this.currentTask = updateCurrentTask(currentTask, tasks[taskToDelete.nextTask]);
            }
            
            // remove Task from taskOrder list and from Tasks linked list
            this.settings.taskOrder = taskOrder.filter(task => task != taskId);
            delete this.tasks[taskId];
        },
        updateTitle(newTask) {
            this.tasks[newTask.id] = newTask;
            if (newTask.id == this.currentTask.id && !this.isTimerActive) {
                this.currentTask = updateCurrentTask(this.currentTask, newTask);
            }
        },
        updateTask(newTasks, newCurrentTask) {
            this.tasks = newTasks;
            this.currentTask = newCurrentTask;
        },
    },
    components: {
        AppModal,
        AppTimer,
        AppControls,
        AppSettings,
    },
};
</script>

<style scoped>

</style>