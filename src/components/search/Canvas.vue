<template>
    <div>
        <div>
            <frame-menu-user :nav="'canvas'"></frame-menu-user>
        </div>
        <div class="container">
            <frame-canvas :url="urlGetCanvas"></frame-canvas>
        </div>
    </div>
</template>
<script>
import Menu from './Menu.vue';
import FrameCanvas from '../canvas/Card';

export default {
    data () {
        return {
            urlGetCanvas: this.baseUrl+'/api/canvas/search/'+this.$route.params.ctr,
        }
    },
    components: {
        'frame-menu-user': Menu,
        'frame-canvas': FrameCanvas,
    }
}
</script>

