<style scoped>
</style>

<template>
    <span :class="['time-item', 'time-' + timeLabel]">
        <button class="button btn-sm" title='up-arrow' @click='increaseTime'>
            <svg 
                version="1.1" 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlns:xlink="http://www.w3.org/1999/xlink" 
                x="0px" 
                y="0px"
                viewBox="0 0 330.002 330.002" 
                style="enable-background:new 0 0 330.002 330.002;" 
                xml:space="preserve"
            >
                <path 
                    class="time-increase" 
                    d="M324.371,213.287l-150.004-120c-5.479-4.382-13.262-4.381-18.741,0.001l-149.996,120
          c-4.974,3.979-6.893,10.667-4.784,16.678c2.108,6.011,7.784,10.035,14.154,10.035h300c6.371,0,12.046-4.024,14.154-10.035
          C331.264,223.954,329.346,217.267,324.371,213.287z"/>
            </svg>
        </button>
        <div class="time-values" v-text="timeValue"></div>
        <div class="time-labels" v-text="timeLabel"></div>
        <button class="button btn-sm" title='down-arrow' @click='decreaseTime'>
            <svg 
                version="1.1" 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlns:xlink="http://www.w3.org/1999/xlink" 
                x="0px" 
                y="0px"
                viewBox="0 0 330.002 330.002" 
                style="enable-background:new 0 0 330.002 330.002;" 
                xml:space="preserve"
            >
                <path 
                    class="time-decrease" 
                    d="M329.155,100.036c-2.108-6.011-7.784-10.035-14.154-10.035h-300c-6.371,0-12.046,4.024-14.154,10.035
                    c-2.109,6.011-0.19,12.699,4.784,16.678l150.004,120c2.739,2.191,6.055,3.287,9.37,3.287c3.316,0,6.631-1.096,9.371-3.287
                    l149.996-120C329.346,112.734,331.264,106.047,329.155,100.036z"/>
            </svg>
        </button>
    </span>

</template>

<script>
    export default {
        props: {
            timeValue: String,
            timeLabel: String,
        },
        methods: {
            increaseTime() {
                this.$emit('increase-time');
            },
            decreaseTime() {
                this.$emit('decrease-time');
            },
        },
    }
</script>

