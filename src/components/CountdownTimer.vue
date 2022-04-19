<template>
    <main class="site-content">
        <div class="container">
            <div class="countdown-view">
                <span>
                    <span v-show="currentTask.type === 'break'">
                        <i class="fa fa-coffee" aria-hidden="true"></i>
                    </span>
                    <span v-show="currentTask.type === 'focus'">
                        <i class="fa fa-crosshairs" aria-hidden="true"></i>
                    </span>
                    <span class="timer-session js-session" v-text="currentTask.title"></span>
                </span>
<!--                <span v-if="currentTask.audioFile != ''" v-text="currentTask.audioFile"></span>-->
                <span class="timer-countdown js-countdown" v-text="currentTask.time"></span>
                <button class="button btn-timer" @click='toggleTimer'>
                    <span class="flex-center" v-if='isTimerActive'>
                        <svg width='14' height='18' xmlns='http://www.w3.org/2000/svg'>
                            <path fill='#FFF' fill-rule='non-zero' d='M8.016.016H12v13.968H8.016V.016zM0 13.984V.016h3.984v13.968H0z'/>
                        </svg>
                    </span>
                    <span class="flex-center" v-else>
                        <svg width='14' height='18' xmlns='http://www.w3.org/2000/svg'>
                            <path fill='#FFF' fill-rule='non-zero' d='M0 0l14 9-14 9z'/>
                        </svg>
                    </span>
                </button>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: {
        isTimerActive: Boolean,
        currentTask: Object,
    },
    methods: {
        toggleTimer() {
            this.$emit('toggle-timer');
        },
    },
}
</script>

<style scoped>

</style>
