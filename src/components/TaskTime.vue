<template>
    <div class="time-view">
        <TimeItem 
            v-for='(timeValue, timeType) in time'
            :timeValue='timeValue'
            :timeLabel='timeType'
            :key='timeType'
        />
    </div>
</template>

<script>
    import TimeItem from "./TimeItem.vue";

    export default {
        props: {
            time: Object,
        },
        methods: {
            
        },
        components: {
            TimeItem,
        },
    }
</script>
