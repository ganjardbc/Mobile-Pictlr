<template>
    <div>
        <div class="app-panel">
            <div class="sc-header">
                <div class="sc-place no-pad">
                    <div class="sc-grid sc-grid-3x" style="height: 45px;">
                        <div class="sc-col-1">
                        <button 
                            class="btn btn-grey2-color btn-circle" 
                            @click="$goBack()">
                            <span class="fa fa-lg fa-chevron-left"></span>
                        </button>
                        </div>
                        <div class="sc-col-2">
                            <h3 class="ttl-head ttl-sekunder-color">
                                Topics
                            </h3>
                        </div>
                        <div class="sc-col-3 txt-right"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="padding-bottom-20px">
                <h1 class="txt-site txt-big txt-center txt-main txt-bold txt-capital">
                    Discover Topics
                </h1>
                <p class="txt-site txt-11 txt-primary txt-center">
                    Explore 100k more designs everyday!
                </p>
            </div>
            <div>
                <frame-topic :url="urlGetTopic"></frame-topic>
            </div>
        </div>
    </div>
</template>
<script>
import FrameSearch from '../main/FrameSearch';
import FrameTopic from './Card';

export default {
    data () {
        return {
            urlGetTopic: this.baseUrl+'/api/topic/top',
        }
    },
    components: {
        'frame-topic': FrameTopic,
        'frame-search': FrameSearch
    }
}
</script>
