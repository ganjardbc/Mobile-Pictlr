<template>
    <div>
        <div>
            <frame-menu :nav="'users'"></frame-menu>
        </div>
        <div class="container">
            <frame-user :url="urlGetUser"></frame-user>
        </div>
    </div>
</template>
<script>
import Menu from './Menu';
import FrameUser from '../user/Card';

export default {
    data () {
        return {
            urlGetUser: this.baseUrl+'/api/user/search/'+this.$route.params.ctr,
        }
    },
    components: {
        'frame-menu': Menu,
        'frame-user': FrameUser,
    }
}
</script>

