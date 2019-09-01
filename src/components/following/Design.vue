<template>
    <div class="container">
        <div>
            <frame-menu></frame-menu>
        </div>
        <div v-if="$cookie.get('jwt')">
            <frame-design :url="urlGetDesign"></frame-design>
        </div>
    </div>
</template>
<script>
import Menu from './Menu';
import FrameDesign from '../post/Card';

export default {
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/following?token='+this.$cookie.get('jwt'),
        }
    },
    components: {
        'frame-menu': Menu,
        'frame-design': FrameDesign,
    }
}
</script>
