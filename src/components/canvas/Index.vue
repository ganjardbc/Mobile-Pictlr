<template>
    <div>

        <div class="app-panel">
            <div class="sc-header">
                <div class="sc-place no-pad">
                    <div class="sc-grid sc-grid-2x">
                        <div class="sc-col-1">
                            <button 
                                class="btn btn-grey2-color btn-circle" 
                                @click="$goBack()">
                                <span class="fa fa-lg fa-chevron-left"></span>
                            </button>
                            <span v-if="this.$cookie.get('id') == pp.id">
                                <router-link :to="{
                                    name: 'edit-canvas',
                                    params: {
                                        username: this.$route.params.username,
                                        idcanvas: this.$route.params.idcanvas
                                    }}">
                                    <button class="btn btn-grey2-color btn-circle">
                                        <span class="fas fa-lg fa-pencil-alt"></span>
                                    </button>
                                </router-link>
                            </span>
                        </div>
                        <div class="sc-col-2 txt-right">
                            <span v-if="this.$cookie.get('id') == pp.id">
                                <router-link :to="{name: 'compose-post'}">
                                    <button class="btn btn-grey2-color btn-radius">
                                        <span class="fas fa-lg fa-plus-circle"></span>
                                        <span>Create Post</span>
                                    </button>
                                </router-link>
                            </span>
                            <span v-else>
                                <div v-if="iswatch == '0'">
                                    <button 
                                        :class="['btn btn-main-color watch-'+pp.idcanvas]" 
                                        @click="$watchPaper($cookie.get('id'), pp.id, pp.idcanvas)"
                                        id="unwatch">
                                        <span id="icn" class="fas fa-lg fa-plus"></span>
                                        <span id="ttl">Watch</span>
                                    </button>
                                </div>
                                <div v-else>
                                    <button 
                                        :class="['btn btn-grey2-color watch-'+pp.idcanvas]" 
                                        @click="$watchPaper($cookie.get('id'), pp.id, pp.idcanvas)"
                                        id="watched">
                                        <span id="icn" class="fas fa-lg fa-check"></span>
                                        <span id="ttl">Unwatch</span>
                                    </button>
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="emptyPaper">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">{{ emptyPaperMessage }}</div>
            </div>
        </div>

        <div v-if="detailCanvas">
            <div>
                <div class="paper-cover">
                    <div class="pl-cover">
                        <div class="pl-profile">
                            <div class="txt-site txt-white txt-center">
                                <router-link 
                                    :to="{name: 'user', params: {username: pp.username}}" 
                                    style="display: inline-block; vertical-align: top;">
                                    <div class="image image-80px image-circle" 
                                    :style="{
                                        'background-image': 'url('+pp.foto+')',
                                        'margin': 'auto',
                                    }"></div>
                                </router-link>
                            </div>
                            <div>
                                <h1 class="txt-site txt-mikro txt-white txt-center">
                                    {{ pp.title }}
                                </h1>
                            </div>
                            <div class="txt-site txt-11 txt-thin txt-white txt-center">
                                <p>
                                    <span>{{ pp.about }}</span> |
                                    <span>Created on {{ pp.created | moment('from', 'now') }}</span>
                                </p>
                                <div class="menu-val">
                                    <ul>
                                        <li>
                                            <div class="txt-site txt-white txt-center">{{ pp.visited }}</div>
                                            <div class="txt-site txt-white txt-center">Visited</div>
                                        </li>
                                        <li>
                                            <div class="txt-site txt-white txt-center">{{ pp.designs }}</div>
                                            <div class="txt-site txt-white txt-center">Designs</div>
                                        </li>
                                        <li>
                                            <div class="txt-site txt-white txt-center">{{ pp.watchs }}</div>
                                            <div class="txt-site txt-white txt-center">Watchs</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="pp.designs >= 3" class="pl-icn pl-image">
                        <div 
                            class="bg-image image image-all" 
                            :style="{'background-image': 'url('+urlThumbnailStory+pp.cover1+')'}" 
                            alt="design"></div>
                        <div 
                            class="bg-image image image-all" 
                            :style="{'background-image': 'url('+urlThumbnailStory+pp.cover2+')'}" 
                            alt="design"></div>
                        <div 
                            class="bg-image image image-all" 
                            :style="{'background-image': 'url('+urlThumbnailStory+pp.cover3+')'}" 
                            alt="design"></div>
                    </div>
                    <div v-if="pp.designs >= 0" class="pl-icn">
                        <div 
                            class="bg-image image image-all" 
                            :style="{'background-image': 'url('+urlFotoStory+pp.cover1+')'}" 
                            alt="design"></div>
                    </div>
                </div>
                <div>
                    <div v-if="tagPaper && tagPaper.length">
                        <div class="padding-10px">
                            <span v-for="tag in tagPaper">
                                <router-link :to="{'path': '/tags/'+tag.tag}" class="frame-top-tag no-margin">
                                    {{tag.tag}}
                                </router-link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container margin-top-10px">
                <frame-design :url="urlGetDesign"></frame-design>
            </div>

        </div>

    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading'
import FrameDesign from '../post/Card'

export default {
    data () {
        return {
            urldetailCanvas: this.baseUrl+'/api/canvas/detail/'+this.$route.params.idcanvas+'?token='+this.$cookie.get('jwt'),
            urlGetDesign: this.baseUrl+'/api/design/canvas/'+this.$route.params.idcanvas+'?token='+this.$cookie.get('jwt'),
            emptyPaper: false,
            emptyPaperMessage: '',
            loading: false,
            detailCanvas: false,
            tagPaper: [],
            iswatch: '0',
            pp: {
                idcanvas: '',
                id: '',
                title: '',
                about: '',
                visited: '0',
                designs: '0',
                watchs: '0',
                foto: '',
                username: '',
                created: '',
                cover1: '',
                cover2: '',
                cover3: '',
            }
        }
    },
    created: function () {
        this.fetchdetailCanvas();
    },
    components: {
        'frame-loading': FrameLoading,
        'frame-design': FrameDesign,
    },
    watch: {
        '$route': 'pullPath',
    },
    methods: {
        pullPath () {
            if (this.$route.params.idcanvas) {
                this.urldetailCanvas = this.baseUrl+'/api/canvas/detail/'+this.$route.params.idcanvas+'?token='+this.$cookie.get('jwt');
            }
            if (this.pp.idcanvas != this.$route.params.idcanvas) {
                this.fetchdetailCanvas();
            }
        },
        fetchdetailCanvas () {
            //this.loading = true;
            this.detailCanvas = false;
            this.emptyPaper = false;
            axios.get(this.urldetailCanvas)
            .then(response => {
                if (response.data.detail && response.data.detail.length) {
                    //this.loading = false;
                    this.detailCanvas = true;
                    this.pp.idcanvas = response.data.detail[0].idcanvas;
                    this.pp.id = response.data.detail[0].id;
                    this.pp.title = response.data.detail[0].title;
                    this.pp.about = response.data.detail[0].description;
                    this.pp.visited = response.data.detail[0].views;
                    this.pp.watchs = response.data.detail[0].ttl_watch;
                    this.pp.designs = response.data.detail[0].ttl_design;
                    this.pp.foto = this.urlThumbnailProfile+response.data.detail[0].foto;
                    this.pp.username = response.data.detail[0].username;
                    this.pp.created = response.data.detail[0].created;
                    this.pp.cover1 = response.data.detail[0].cover1;
                    this.pp.cover2 = response.data.detail[0].cover2;
                    this.pp.cover3 = response.data.detail[0].cover3;
                    this.iswatch = response.data.iswatch;
                    this.tagPaper = response.data.tags;
                } else {
                    this.detailCanvas = false;
                    this.emptyPaper = true;
                    this.emptyPaperMessage = 'Canvas Empty';
                }
            })
            .catch(e => {
                //this.loading = false;
                this.detailCanvas = false;
                this.emptyPaper = true;
                this.emptyPaperMessage = e.response.statusText;
            });
        }
    }
}
</script>

