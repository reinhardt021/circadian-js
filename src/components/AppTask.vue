<style scoped>
</style>

<template>
    <div class='task settings-card'>
        <div class="task-header">
            <span>
                <span class="task-type" v-show="task.type === 'break'" @click="toggleTaskType">
                    <i class="fa fa-coffee" aria-hidden="true"></i>
                </span>
                <span class="task-type" v-show="task.type === 'focus'" @click="toggleTaskType">
                    <i class="fa fa-crosshairs" aria-hidden="true"></i>
                </span>
                <span class='task-title' contenteditable='true' v-text='task.title' @blur='changeTitle'></span>
            </span>
            <span>
                <i class="fa fa-bars" aria-hidden="true"></i>
            </span>
        </div>
        <div class='task-content'>
            <div class="task-time">
                <TimeItem 
                    v-for='(timeValue, timeType) in task.view'
                    :timeValue='timeValue'
                    :timeLabel='timeType'
                    :key='timeType'
                    @increase-time='timeIncrease(task, timeType)'
                    @decrease-time='timeDecrease(task, timeType)'
                />
            </div>
            <input class='task-input' type='range' min='0' max='24' data-type='task-hours' v-model='task.hours' @input='changeTime'/>
            <input class='task-input' type='range' min='0' max='59' data-type='task-minutes' v-model='task.minutes' @input='changeTime'/>
            <input class='task-input' type='range' min='0' max='59' data-type='task-seconds' v-model='task.seconds' @input='changeTime'/>
        </div>
        <div class='button task-delete' @click='removeTask(task.id)'>
            <i class="fa fa-trash" aria-hidden="true"></i>
            <span class="settings-button-text">Delete task</span>
        </div>
    </div>
</template>

<script>
    import TimeItem from "./TimeItem.vue";
    import { showTime, formatTime } from '../helpers.js'

    function buildNewTask(oldTask, timePeriod, newValue) {
        const newTask = {
            ...oldTask,
            [timePeriod]: Number(newValue),
        };
        newTask.time = showTime(newTask.hours, newTask.minutes, newTask.seconds);
        newTask.view = formatTime(newTask.hours, newTask.minutes, newTask.seconds);
        
        return newTask;
    }

    export default {
        props: {
            task: Object,
        },
        methods: {
            removeTask(taskId) {
                this.$emit('remove-task', taskId);
            },
            changeTitle(e) {
                const newTask = {
                    ...this.task,
                    title: e.target.innerText.trim(),
                };
                this.$emit('change-task', newTask);
            },
            toggleTaskType() {
                const taskToggleMap = {
                    'break': 'focus',
                    'focus': 'break',
                };
                const newTask = {
                    ...this.task,
                    type: taskToggleMap[this.task.type]
                }
                this.$emit('change-task', newTask);
            },
            timeIncrease(task, timeType) {
                const maxTimeMap = {
                    'hours': 24,
                    'minutes': 59,
                    'seconds': 59,
                };
                const newValue = task[timeType] + 1;
                if (newValue <= maxTimeMap[timeType]) {
                    const newTask = buildNewTask(task, timeType, newValue);
                    this.$emit('change-task', newTask);
                }
            },
            timeDecrease(task, timeType) {
                const newValue = task[timeType] - 1;
                if (0 <= newValue) {
                    const newTask = buildNewTask(task, timeType, newValue);
                    this.$emit('change-task', newTask);
                }
            },
            changeTime(e) {
                const { dataset:{ type }, value } = e.target;
                const timePeriod = type.replace('task-', '');
                const newTask = buildNewTask(this.task, timePeriod, value);
                this.$emit('change-task', newTask);
            },
        },
        components: {
            TimeItem,
        },
    }
</script>
