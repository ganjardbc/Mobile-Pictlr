<template>
    <div>
        <div>
            <frame-menu-user :nav="'designs'"></frame-menu-user>
        </div>
        <div class="container">
            <div 
                v-if="$route.params.username == $cookie.get('username')" 
                class="txt-site txt-center margin-top-20px">
				<router-link :to="{name: 'compose-post'}">
                    <button class="btn btn-main2-color btn-radius">
                        <span class="fas fa-lg fa-plus-circle txt-site txt-16"></span>
                        <span class="ttl">Create Post</span>
                    </button>
                </router-link>
			</div>
            <div class="margin-top-20px">
                <frame-design :url="urlGetDesign" :col="5"></frame-design>
            </div>
        </div>
    </div>
</template>
<script>
import FrameDesign from '../post/Card';
import Menu from './Menu';

export default {
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/user/'+this.$route.params.username+'?token='+this.$cookie.get('jwt'),
        }
    },
    components: {
        'frame-design': FrameDesign,
        'frame-menu-user': Menu,
    }
}
</script>

