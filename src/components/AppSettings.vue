<template>
    <transition name='settings' enter-active-class='settings-show'>
        <div class="settings">
            <div class="flow">
                <h2 class="flow-title">Flow</h2>
                <div class="tasks">
                    <AppTask
                        v-for='(taskId, index) in settings.taskOrder'
                        :task='tasks[taskId]'
                        :index='index'
                        :key='taskId'
                        @change-task='taskChange'
                        @remove-task='taskRemove'
                    />
                </div>
            </div>
            <div class="options">
                <button class="settings-btn" @click='taskAdd'>
                    <svg width='24' height='22' xmlns='http://www.w3.org/2000/svg'>
                        <path fill='#333' fill-rule='evenodd' d='M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z'/>
                    </svg>
                </button>
                <button class="settings-btn" @click='closeSettings'>
                    <svg width='14' height='14' xmlns='http://www.w3.org/2000/svg'>
                        <path fill='#333' fill-rule='evenodd' d='M5.586 7L.636 2.05A1 1 0 0 1 2.05.636L7 5.586l4.95-4.95a1 1 0 0 1 1.414 1.414L8.414 7l4.95 4.95a1 1 0 0 1-1.414 1.414L7 8.414l-4.95 4.95A1 1 0 0 1 .636 11.95L5.586 7z'/>
                    </svg>
                </button>
            </div>
        </div>
    </transition>
</template>

<script>
import AppTask from './AppTask.vue'

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

export default {
    props: {
        isTimerActive: Boolean,
        currentTask: Object,
        tasks: Object,
        settings: Object,
    },    
    methods: {
        taskChange(newTask) {
            const newTasks = {
                ...this.tasks,
                [newTask.id]: newTask,
            };
            const newCurrentTask = (newTask.id == this.currentTask.id && !this.isTimerActive)
                ? updateCurrentTask(this.currentTask, newTask)
                : this.currentTask;
            this.$emit('task-change', newTasks, newCurrentTask);
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
        AppTask,
    },
}
</script>

<style scoped>

</style>