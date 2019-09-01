<template>
    <div class="container">
        <div>
            <frame-menu></frame-menu>
        </div>
        <div v-if="$cookie.get('jwt')">
            <frame-canvas :url="urlGetCanvas"></frame-canvas>
        </div>
    </div>
</template>
<script>
import Menu from './Menu';
import Canvas from '../canvas/Card';

export default {
    data () {
        return {
            urlGetCanvas: this.baseUrl+'/api/canvas/following?token='+this.$cookie.get('jwt'),
        }
    },
    components: {
        'frame-menu': Menu,
        'frame-canvas': Canvas,
    }
}
</script>
