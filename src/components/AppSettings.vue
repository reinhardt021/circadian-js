<style scoped>
</style>

<template>
    <transition name='settings' enter-active-class='settings-show'>
        <div class="settings">
            <div class="settings-header">
                <button class="settings-button" id="settings-flows">
                    <i class="fa fa-list-ul" aria-hidden="true"></i>
                    <span class="settings-button-text">Flows</span>
                </button>
                <button class="settings-button" id="settings-close" @click='closeSettings'>
                    <span class="settings-button-text">Close</span>
                    <i class="fa fa-times" aria-hidden="true"></i>
                </button>
            </div>

            <div class="settings-content">
                <!-- <FlowDetails />--><!-- todo: -->
                <h2 class="flow-title" v-text="currentFlow.title"></h2>
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

            <div class="settings-options">
                <!-- # Flow list -->
                <!--                    <div class="settings-card">-->
                <!--                        <i class="fa fa-plus" aria-hidden="true"></i>-->
                <!--                        Add flow-->
                <!--                         <i class="fa fa-trash" aria-hidden="true"></i>-->
                <!--                        Delete flow-->
                <!-- (delete if selected one) -todo -->
                <!--                    </div>-->
                <!-- # Flow Details -->
                <div class="settings-card settings-button" @click="taskAdd">
                    <i class="fa fa-plus" aria-hidden="true"></i>
                    Add task
                </div>
                <div class="settings-card settings-button" @click="setPlaylist('focus')">
                    <i class="fa fa-crosshairs" aria-hidden="true"></i>
                    Focus playlist
                    <i class="fa fa-music" aria-hidden="true"></i>
                </div>
                <div class="settings-card settings-button" @click="setPlaylist('break')">
                    <i class="fa fa-coffee" aria-hidden="true"></i>
                    Break playlist
                    <i class="fa fa-music" aria-hidden="true"></i>
                </div>
                <div class="settings-card">
                    <span @click="openDefaults">
                        <i class="fa fa-cog" aria-hidden="true"></i>
                        Defaults
                    </span>
                    <span>
                        <input class='volume-input' type='range' min='0' max='100' v-model="currentTask.volume" @input='changeVolume'/>
                    </span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import AppTask from './AppTask.vue'
    import { updateCurrentTask } from '../helpers.js'

    export default {
        props: {
            isTimerActive: Boolean,
            currentFlow: Object,
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
            setPlaylist(type) {
                this.$emit('open-playlist-modal', type);
            },
            openDefaults() {
                this.$emit('open-defaults-modal');
            },
            changeVolume() {
                const newVolume = Number(this.currentTask.volume);
                if (this.currentTask.audio) {
                    this.currentTask.audio.volume = newVolume / 100;
                }
                if (this.settings.audio) {
                    this.settings.audio.volume = newVolume / 100;
                }
            },
        },
        components: {
            AppTask,
        },
    }
</script>
