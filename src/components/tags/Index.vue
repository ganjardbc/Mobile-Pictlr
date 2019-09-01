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
                                Tags
                            </h3>
                        </div>
                        <div class="sc-col-3 txt-right"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="margin-20px">
                <h1 class="txt-site txt-big txt-center txt-main txt-bold txt-capital">
                    {{ tag.replace('+', ' ') }}
                </h1>
                <p class="txt-site txt-11 txt-primary txt-center">
                    Explore 100k more designs everyday!
                </p>
            </div>
            <div class="margin-top-20px">
                <frame-design :url="urlGetDesign"></frame-design>
            </div>
        </div>
    </div>
</template>
<script>
import FrameDesign from '../post/Card'
import FrameSearch from '../main/FrameSearch'

export default {
    data () {
        return {
            tag: this.$route.params.ctr,
            urlGetDesign: this.baseUrl+'/api/design/tag/'+this.$route.params.ctr+'?token='+this.$cookie.get('jwt'),
        }
    },
    components: {
        'frame-design': FrameDesign,
        'frame-search': FrameSearch
    },
    watch: {
        '$route': 'pullPath',
    }
}
</script>
