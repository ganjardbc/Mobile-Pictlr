<template>
    <div>
        <div class="app-panel">
            <div class="app-place">
                <div>
                    <frame-search :text="ctrSearch"></frame-search>
                </div>
                <div>
                    <button 
                        class="btn btn-grey3-color btn-circle" 
                        @click="$goBack()">
                        <span class="fa fa-lg fa-times"></span>
                    </button>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="margin-20px">
                <h1 class="txt-site txt-big txt-center txt-main txt-bold txt-capital">
                    Results for {{ ctrSearch }}
                </h1>
                <p class="txt-site txt-11 txt-primary txt-center">
                    Explore 100k more designs everyday!
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import FrameSearch from '../main/FrameSearch'

export default {
    data () {
        return {
            ctrSearch: this.$route.params.ctr.replace('+', ' '),
        }
    },
    components: {
        'frame-search': FrameSearch
    }
}
</script>
