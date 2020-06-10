<template>
    <transition name="modal">
        <div class="modal-mask" @click="$emit('close')">
            <div class="modal-wrapper">
                <div class="modal-container">

                    <div class="modal-header">
                        <span>
                            <slot name="header">
                                Default Header
                            </slot>
                        </span>
                        <span>
                            <button class="settings-button" id="settings-close" @click="$emit('close')">
                                <span class="settings-button-text">Close</span>
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </button> 
                        </span>
                    </div>
                    <div class="modal-body">
                        <slot name="body">
                            Default Body
                        </slot>
                    </div>
                    <div class="modal-footer">
                        <slot name="footer">
                            Default Footer
                        </slot>
                    </div>
            
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>