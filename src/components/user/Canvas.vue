<template>
    <div>
		<div>
            <frame-menu-user :nav="'canvas'"></frame-menu-user>
        </div>
        <div class="container">
			<div 
				v-if="$route.params.username == $cookie.get('username')"  
				class="txt-site txt-center margin-top-20px">
				<router-link :to="{name: 'compose-canvas'}">
                    <button class="btn btn-main2-color btn-radius">
                        <span class="fas fa-lg fa-plus-circle txt-site txt-16"></span>
                        <span class="ttl">Create Canvas</span>
                    </button>
                </router-link>
			</div>
			<div class="margin-top-20px">
				<frame-canvas :url="urlGetCanvas"></frame-canvas>
			</div>
        </div>
    </div>
</template>
<script type="text/javascript">
import Canvas from '../canvas/Card';
import Menu from './Menu';

export default {
	data () {
		return {
			urlGetCanvas: this.baseUrl+'/api/canvas/user/'+this.$route.params.username,
		}
	},
	components: {
		'frame-canvas': Canvas,
		'frame-menu-user': Menu,
	}
}
</script>
