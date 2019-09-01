<template>
    <div>
        <div>
            <frame-menu-user :nav="'design'"></frame-menu-user>
        </div>
        <div class="container">
            <frame-design :url="urlGetDesign"></frame-design>
        </div>
    </div>
</template>
<script>
import FrameDesign from '../post/Card'
import Menu from './Menu'

export default {
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/search/'+this.$route.params.ctr+'?token='+this.$cookie.get('jwt'),
        }
    },
    components: {
        'frame-design': FrameDesign,
        'frame-menu-user': Menu,
    }
}
</script>

