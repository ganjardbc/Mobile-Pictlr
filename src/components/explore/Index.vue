<template>
    <div>
        <div class="app-panel">
            <frame-search :text="''"></frame-search>
        </div>
        <div class="navigator-wrap no-pad">
            <div class="nw-place">
                <div class="grid-1 btn-nav" @click="toLeft('nav-topic')">
                    <div class="icn fas fa-lg fa-angle-left"></div>
                </div>
                <div class="grid-2 place-nav" id="nav-topic">
                    <frame-news :url="urlGetTopic"></frame-news>
                </div>
                <div class="grid-3 btn-nav" @click="toRight('nav-topic')">
                    <div class="icn fas fa-lg fa-angle-right"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FrameSearch from '../main/FrameSearch';
import frameNews from '../explore/Topic';

export default {
    data () {
        return {
            urlGetDesign: '',
            urlGetTopic: this.baseUrl+'/api/tag/top',
            title: this.$route.name,
            tags: [],
            loading: false,
            discover: false,
        }
    },
    created: function () {
        if (this.title == 'Explore') {
            this.urlGetDesign = this.baseUrl+'/api/design/fresh?token='+this.$cookie.get('jwt')
        }
        if (this.title == 'Favorite') {
            this.urlGetDesign = this.baseUrl+'/api/design/'+this.$route.params.ctr+'?token='+this.$cookie.get('jwt')
        }
        if (this.title == 'News') {
            this.urlGetDesign = this.baseUrl+'/api/design/news/'+this.$route.params.idtags+'?token='+this.$cookie.get('jwt')
        }
    },
    components: {
        'frame-news': frameNews,
        'frame-search': FrameSearch
    },
    methods: {
        toLeft: function (path) {
			var wd = $('#'+path).width()
			var sc = $('#'+path).scrollLeft()
			if (sc >= 0) {
				$('#'+path).animate({scrollLeft: (sc - wd)}, 500)
			}
		},
		toRight: function (path) {
			var wd = $('#'+path).width()
			var sc = $('#'+path).scrollLeft()
			if (true) {
				$('#'+path).animate({scrollLeft: (sc + wd)}, 500)
			}
		}
    }
}
</script>

