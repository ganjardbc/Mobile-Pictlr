<template>
    <div class="story-popup">
        
        <div v-if="loading">
            <frame-loading :post="center"></frame-loading>
        </div>

        <div v-if="emptyDesign">
            <div class="frame-empty width width-500px width-center">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">
                    We can not find this post, let's create one.
                </div>
                <router-link :to="{name: 'compose-post'}">
                    <button class="btn btn-main-color btn-radius">
                        <span class="fas fa-lg fa-plus"></span>
                        <span>Create Post</span>
                    </button>
                </router-link>
            </div>
        </div>

        <div v-if="placeDesign">

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
                                <span v-if="$cookie.get('id') == dg.id">
                                    <router-link :to="{
                                        name: 'edit-post', 
                                        params: {
                                            idbookmark: $route.params.idbookmark
                                        }}">
                                        <button class="btn btn-circle btn-grey2-color btn-no-focus">
                                            <span class="fas fa-lg fa-pencil-alt"></span>
                                        </button>
                                    </router-link>
                                </span>
                            </div>
                            <div class="sc-col-2 txt-right">
                                <button class="btn btn-grey2-color">
                                    <span class="fas fa-lg fa-share-alt"></span>
                                    <span>Share</span>
                                </button>
                                <button 
                                        class="btn btn-main-color"
                                        @click="doSave(
                                            dg.idbookmark,
                                            dg.idimages,
                                            urlThumbnailStory+dg.images,
                                            dg.title_design
                                        )">
                                        <span class="fas fa-lg fa-bookmark"></span>
                                        <span>Save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="frame-story">
                <!-- <div class="fs-top"></div> -->
                <div class="fs-mid fs-col">
                    <div class="fs-col-1">
                        <div 
                            class="fs-main-pict" 
                            :style="{
                                'padding-bottom': ((dg.height / dg.width) * 100)+'%',
                            }">
                            <div class="private-story"></div>
                            <img 
                                class="fs-pict"
                                :src="urlFotoStory+dg.images">
                        </div>
                    </div>

                    <div class="fs-col-2">
                        <div class="fs-block">
                            <!--title-->
                            <div v-if="dg.title_design">
                                <h1 class="txt-site txt-micro txt-main txt-bold">
                                    {{ dg.title_design }}
                                </h1>
                            </div>

                            <div class="fs-profile">
                                <div class="fsp-col-1">
                                    <router-link :to="{name: 'user', params: {username: dg.username}}">
                                        <div 
                                            class="image image-full image-circle" 
                                            :style="{
                                                'background-image': 'url('+urlThumbnailProfile+dg.foto+')'
                                            }"></div>
                                    </router-link>
                                </div>
                                <div class="fsp-col-2">
                                    <div class="txt-site txt-top txt-11 txt-thin">
                                        <span class="txt-site txt-thin">Posted by</span>
                                        <router-link 
                                            class="txt-site txt-bold txt-main txt-main-hover"
                                            :to="{name: 'user', params: {username: dg.username}}">
                                            {{ dg.name }}
                                        </router-link>
                                        <span class="txt-site txt-thin">
                                            on {{ dg.created | moment('from', 'now') }}
                                        </span>
                                    </div>
                                    <!-- <div class="txt-site txt-12 txt-primary txt-bold">
                                        <router-link :to="{name: 'user', params: {username: dg.username}}">
                                            {{ dg.name }}
                                        </router-link>
                                    </div>
                                    <div class="txt-site txt-10 txt-primary">
                                        <span>{{ dg.created | moment('from', 'now') }}</span>
                                    </div> -->
                                </div>
                            </div>

                            <!--description-->
                            <div v-if="dg.description" class="margin-5px">
                                <p class="txt-site txt-12 txt-main txt-thin txt-font-2">
                                    {{ dg.description }}
                                </p>
                            </div>

                        </div>

                        <div class="fs-block">
                            <!--tags-->
                            <div class="txt-site txt-11 txt-bold txt-main margin-bottom-5px">
                                Tags
                            </div>
                            <div v-if="tagDesign && tagDesign.length" class="margin-5px">
                                <span v-for="tag in tagDesign">
                                    <router-link :to="{
                                        name: 'view-tags', 
                                        params: {
                                            ctr: tag.tag.toLowerCase().replace(/ /g, '+')
                                        }}"
                                        class="frame-top-tag no-margin">
                                        {{tag.tag}}
                                    </router-link>
                                </span>
                            </div>
                        </div>

                        <div class="fs-block">
                            <div class="txt-site txt-11 txt-bold txt-main margin-bottom-5px">
                                Rates
                            </div>
                            <div class="txt-site txt-primary txt-10 txt-thin">
                                Give a rate to this posts?
                            </div>

                            <div class="padding-5px"></div>

                            <frame-rate 
                                :idbookmark="dg.idbookmark" 
                                :ttl="ttlRate" 
                                :rates="ratesDesign"></frame-rate>

                        </div>

                        <div class="fs-block" v-if="$cookie.get('id') == dg.id">
                            <div class="txt-site txt-11 txt-bold txt-main margin-bottom-5px">
                                Detail Posts
                            </div>
                            <div class="grid grid-2x txt-site txt-11 txt-primary margin-10px">
                                <div class="column-1 txt-site txt-thin">Views</div>
                                <div class="column-2 content-right txt-site txt-bold">{{ dg.views }} x</div>
                            </div>
                            <div class="grid grid-2x txt-site txt-11 txt-primary margin-10px">
                                <div class="column-1 txt-site txt-thin">Bookmarks</div>
                                <div class="column-2 content-right txt-site txt-bold">{{ dg.ttl_bookmarks }} x</div>
                            </div>
                            <div class="grid grid-2x txt-site txt-11 txt-primary margin-10px">
                                <div class="column-1 txt-site txt-thin">Likes</div>
                                <div class="column-2 content-right txt-site txt-bold">{{ dg.ttl_likes }} x</div>
                            </div>
                            <div class="grid grid-2x txt-site txt-11 txt-primary margin-10px">
                                <div class="column-1 txt-site txt-thin">Reponse</div>
                                <div class="column-2 content-right txt-site txt-bold">{{ dg.ttl_comments }} x</div>
                            </div>
                        </div>

                        <div class="fs-block">
                            <div v-if="canvasDesign && canvasDesign.length">
                                <div class="txt-site txt-11 txt-main txt-bold margin-bottom-5px">
                                    Saved on canvas
                                </div>
                                <div class="fs-place-canvas">
                                    <div class="fs-main-canvas">
                                        <div class="fs-canvas" v-for="canvas in canvasDesign">
                                            <router-link :to="{
                                                name: 'visit-canvas', 
                                                params: {
                                                    username: canvas.username,
                                                    idcanvas: canvas.idcanvas
                                                }}">
                                                <div 
                                                    class="image image-all image-circle" 
                                                    :style="{'background-image': 'url('+urlThumbnailStory+canvas.cover1+')'}"></div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="fs-block">
                            <div class="txt-site txt-11 txt-main txt-bold margin-bottom-5px">
                                Response
                            </div>
                            <form @submit.prevent="doResponse">
                                <input 
                                    type="text" 
                                    class="txt txt-primary-color txt-no-shadow margin-bottom-10px" 
                                    placeholder="Post your response"
                                    v-model="response"
                                    required>
                            </form>
                            <div v-if="restDesign && restDesign.length">
                                <div v-for="(rest, index) in restDesign">
                                    <div class="fs-profile">
                                        <div class="fsp-col-1">
                                            <router-link :to="{name: 'user', params: {username: rest.username}}">
                                                <div 
                                                    class="image image-full image-circle" 
                                                    :style="{
                                                        'background-image': 'url('+urlThumbnailProfile+rest.foto+')'
                                                    }"></div>
                                            </router-link>
                                        </div>
                                        <div class="fsp-col-2">
                                            <div class="txt-site txt-12 txt-main txt-bold">
                                                <router-link :to="{name: 'user', params: {username: rest.username}}">
                                                    {{ rest.name }}
                                                </router-link>
                                            </div>
                                            <div class="txt-site txt-10 txt-primary">
                                                <span>{{ rest.created | moment('from', 'now') }}</span>
                                            </div>
                                            <div class="txt-site txt-12 txt-main">
                                                {{ rest.description }}
                                            </div>
                                        </div>
                                        <div v-if="$cookie.get('id') == rest.id" class="fsp-col-3">
                                            <div class="fs-del" @click="deleteResponse(rest.idcomment, index)">
                                                <span class="fa fa-lg fa-times"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div 
                                    v-if="moreResponse" 
                                    style="text-align: center; margin: 10px 0;">
                                    <input 
                                        @click="fetchGetResponse(dg.idimages, 'resume')"
                                        class="btn btn-main2-color btn-radius txt-site txt-10"
                                        type="button" 
                                        :value="valResponse">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- <div class="container">
            <frame-design :url="urlGetDesign" :col="5"></frame-design>
        </div> -->
    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading'
import FrameRate from '..//main/FrameRate'
import FrameDesign from './Card'

export default {
    data () {
        return {
            urlPostResponse: this.baseUrl+'/api/response/save?token='+this.$cookie.get('jwt'),
            urlDeleteResponse: this.baseUrl+'/api/response/delete?token='+this.$cookie.get('jwt'),
            urlGetResponse: this.baseUrl+'/api/response/get/'+this.$route.params.idbookmark+'?token='+this.$cookie.get('jwt'),
            urlGetDesign: this.baseUrl+'/api/design/other/'+this.$route.params.idbookmark+'?token='+this.$cookie.get('jwt'),
            urlDetailDesign: this.baseUrl+'/api/bookmark/detail/'+this.$route.params.idbookmark+'?token='+this.$cookie.get('jwt'),
            dg: [],
            restDesign: [],
            tagDesign: [],
            otherDesign: [],
            canvasDesign: [],
            ratesDesign: [],
            isRate: 0,
            ttlRate: 0,
            loading: false,
            emptyDesign: false,
            placeDesign: false,
            response: '',
            center: 'center',
            status: false,
            storyPopup: 'story-popup popup',
            limitResponse: 3,
            offsetResponse: 0,
            moreResponse: false,
            valResponse: 'More Response'
        }
    },
    created () {
        this.fetchDetailDesign();
        //this.storyPopup = "story-popup";
        /*if (window.history.length > 1) {
            this.storyPopup = "story-popup popup";
        } else {
            this.storyPopup = "story-popup";
        }*/
    },
    components: {
        'frame-loading': FrameLoading,
        'frame-design': FrameDesign,
        'frame-rate': FrameRate
    },
    methods: {
        doSave (idbookmark, idimage, design, desc) {
            if (!this.$cookie.get('jwt')) 
            {
                this.$router.push('/login');
            }
            else
            {
                this.$cookie.set('idbookmark', idbookmark, 1);
                this.$cookie.set('idimage', idimage, 1);
                this.$cookie.set('design', design, 1);
                this.$cookie.set('desc', desc, 1);
                this.$router.push({name: 'save-post', params: {username: idbookmark}});
            }
        },
        deleteResponse (idcomment, idx) {
            var a = confirm('delete this response?');
            if (a) 
            {
                axios.post(this.urlDeleteResponse, {
                    'idcomment': idcomment
                })
                .then(response => {
                    if (response.data.status == 'success') 
                    {
                        //this.restDesign.splice(this.restDesign.indexOf(idx), 1);
                        this.fetchGetResponse(this.dg.idimages, 'new');
                    }
                    else 
                    {
                        this.$openMessageOk(response.data.message);
                    }
                })
                .catch(e => {
                    this.$openMessageOk(e.response.statusText);
                    console.log(e.response);
                });   
            }
        },
        doResponse () {
            axios.post(this.urlPostResponse, {
                'response': this.response,
                'idimages': this.dg.idimages,
                'idbookmark': this.$route.params.idbookmark
            })
            .then(response => {
                if (response.data.status == 'success') 
                {
                    this.response = '';
                    if (this.restDesign.length > 0) 
                    {
                        this.fetchGetResponse(this.dg.idimages, 'new');
                    } 
                    else 
                    {
                        this.fetchGetResponse(this.dg.idimages, 'resume');
                    }
                } 
                else 
                {
                    this.$openMessageOk(response.data.message);
                }
            })
            .catch(e => {
                this.$openMessageOk(e.response.statusText);
                console.log(e.response);
                
            })
        },
        fetchGetResponse: function (idimage, stt = 'new') {
            var urlGet = this.baseUrl+'/api/response/get/'+idimage+'?token='+this.$cookie.get('jwt');
            if (stt == 'new') 
            {
                var urlR = urlGet+'&limit='+this.offsetResponse+'&offset=0';
            }
            if (stt == 'resume') 
            {
                var urlR = urlGet+'&limit='+this.limitResponse+'&offset='+this.offsetResponse;
            }
            this.valResponse = 'Please Wait...';
            axios.get(urlR)
            .then(response => {
                //console.log(response.data);
                this.valResponse = 'Load More';
                if (response.data.response.length >= this.offsetResponse) 
                {
                    this.moreResponse = true;
                }
                if (response.data.response.length < this.limitResponse) 
                {
                    this.moreResponse = false;
                }
                if (response.data.response.length < this.offsetResponse) 
                {
                    this.moreResponse = false;
                }
                if (response.data.response && response.data.response.length) 
                {
                    if (stt == 'new') 
                    {
                        this.restDesign = response.data.response;
                    } 
                    else 
                    {
                        for (let i = 0; i < response.data.response.length; i++) 
                        {
                            this.restDesign.push(response.data.response[i]);
                        }
                        this.offsetResponse += this.limitResponse;
                    }
                }
            })
            .catch(e => {
                this.valResponse = 'Load More';
                this.$openMessageBottom(e.response.statusText);
                //console.log(e.response);
            });
        },
        fetchDetailDesign () {
            this.placeDesign = false;
            this.emptyDesign = false;
            this.loading = true;
            axios.get(this.urlDetailDesign)
            .then(response => {
                if (response.data.status == 'successful') 
                {
                    this.dg = response.data.detail[0];
                    this.tagDesign = response.data.tags;
                    this.canvasDesign = response.data.canvas;
                    this.ratesDesign = response.data.rates;
                    this.ttlRate = response.data.ttl_rate; 
                    this.isRate = response.data.is_rate;
                    //this.otherDesign = response.data.others;
                    this.loading = false;
                    this.placeDesign = true;
                    this.fetchGetResponse(this.dg.idimages, 'resume');
                } 
                else 
                {
                    this.loading = false;
                    this.placeDesign = false;
                    this.emptyDesign = true;
                }
            })
            .catch(e => {
                this.loading = false;
                this.placeDesign = false;
                this.emptyDesign = true;
                this.$openMessageBottom(e.response.statusText);
            });
        },
		toLeft: function (event) {
			event.preventDefault()
			var wd = $('#ctn-wall').width()
			var sc = $('#ctn-wall').scrollLeft()
            if (sc >= 0) 
            {
				$('#ctn-wall').animate({scrollLeft: (sc - wd)}, 500)
			}
		},
		toRight: function (event) {
			event.preventDefault()
			var wd = $('#ctn-wall').width()
			var sc = $('#ctn-wall').scrollLeft()
            if (true) 
            {
				$('#ctn-wall').animate({scrollLeft: (sc + wd)}, 500)
			}
		}
    }
}
</script>

