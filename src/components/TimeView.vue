<template>
    <div class="time-view">
        <span class="time-hours">
            <div class="task-times" v-text="time.hours"></div>
            <div class="time-labels">hours</div>
        </span>
        <span class="time-minutes">
            <div class="task-times" v-text="time.minutes"></div>
            <div class="time-labels">minutes</div>
        </span>
        <span class="time-seconds">
            <div class="task-times" v-text="time.seconds"></div>
            <div class="time-labels">seconds</div>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            time: Object,
        },
    }
</script>
