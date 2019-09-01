<template>
    <div>
        <div class="app-panel">
            <div class="app-place-2" v-if="$cookie.get('username') == $route.params.username">
                <div>
                    <frame-search></frame-search>
                </div>
                <div style="text-align: right;">
                    <router-link :to="{name: 'following'}">
                        <button class="btn btn-grey3-color btn-circle">
                            <span class="fa fa-lg fa-users"></span>
                        </button>
                    </router-link>
                    <router-link :to="{name: 'setting'}">
                        <button class="btn btn-grey3-color btn-circle">
                            <span class="fa fa-lg fa-cog"></span>
                        </button>
                    </router-link>
                </div>
            </div>

            <div class="sc-header" v-if="$cookie.get('username') != $route.params.username">
                <div class="sc-place no-pad">
                    <div class="sc-grid sc-grid-3x" style="height: 45px;">
                        <div class="sc-col-1">
                        <button 
                            class="btn btn-grey2-color btn-circle" 
                            @click="$goBack()">
                            <span class="fa fa-lg fa-chevron-left"></span>
                        </button>
                        </div>
                        <div class="sc-col-2">
                            <h3 class="ttl-head ttl-sekunder-color">
                                Profile
                            </h3>
                        </div>
                        <div class="sc-col-3 txt-right"></div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="loading">
			<frame-loading></frame-loading>
		</div>
        
        <div>

            <div v-if="emptyProfile">
                <div class="frame-empty">
                    <div class="txt-site txt-small txt-primary">
                        <div class="fa fa-lg fa-thermometer-empty"></div>
                    </div>
                    <div class="ttl padding-15px">{{ emptyProfileMessage }}</div>
                </div>
            </div>

            <div v-if="frameProfile">
                <div class="margin-20px">
                    <div class="frame-profile">
                        <div class="profile">
                            <div class="info">
                                <div>
                                    <h1>
                                        <router-link 
                                            class="txt-site txt-big txt-main txt-bold txt-main-hover" 
                                            :to="{name: 'user', params: {username: pp.username}}">
                                            {{ pp.name }}
                                        </router-link>
                                    </h1>
                                    <span class="txt-site txt-16 txt-main txt-bold">
                                        <router-link 
                                            :to="{name: 'user', params: {username: pp.username}}">
                                            {{ pp.username }}
                                        </router-link>
                                    </span>
                                </div>
                                <div class="padding-bottom-5px">
                                    <span 
                                        class="txt-site txt-12 txt-thin txt-main"
                                        v-if="pp.about">
                                        <!-- <span style="position: relative; top: -2.5px; font-size: 4pt;">
                                            <span class="fa fa-lw fa-circle"></span>
                                        </span> -->
                                        {{ pp.about }}
                                    </span>
                                </div>
                                <div class="txt-site txt-init txt-12 txt-bold">
                                    <a :href="pp.website" target="_blank">{{ pp.website }}</a>
                                </div>
                                <div class="menu-val">
                                    <ul>
                                        <li>
                                            <router-link :to="{name: 'user-post', params: {username: pp.username}}">
                                                <div class="val">{{ pp.ttl_designs }}</div>
                                                <div class="ttl">Designs</div>
                                            </router-link>
                                        </li>
                                        <li>
                                            <router-link :to="{name: 'user-canvas', params: {username: pp.username}}">
                                                <div class="val">{{ pp.ttl_canvas }}</div>
                                                <div class="ttl">Canvas</div>
                                            </router-link>
                                        </li>
                                        <li v-if="$cookie.get('username') == $route.params.username">
                                            <router-link :to="{name: 'canvas-following'}">
                                                <div class="val">{{ pp.ttl_watchs }}</div>
                                                <div class="ttl">Watchs</div>
                                            </router-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="foto">
                                <router-link :to="{name: 'user', params: {username: pp.username}}">
                                    <div 
                                        class="image image-130px image-circle" 
                                        id="place-picture" 
                                        :style="{
                                            'background-image': 'url('+pp.foto+')',
                                        }"></div>
                                </router-link>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
        
    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';
import FrameSearch from '../main/FrameSearch'

export default {
    data () {
        return {
            url: this.baseUrl+'/api/user/'+this.$route.params.username,
            pp: {
                id: '0',
                foto: '',
                name: '',
                username: '',
                ttl_canvas: '0',
                ttl_designs: '0',
                ttl_saved: '0',
                ttl_watchs: '0',
                about: '',
                website: ''
            },
            profile: [],
            loading: false,
            frameProfile: true,
            emptyProfile: false,
            emptyProfileMessage: '',
            sttAppPlace: 'app-place',
        }
    },
    components: {
        'frame-loading': FrameLoading,
        'frame-search': FrameSearch
    },
    created: function () {
        this.fetchProfile();
    },
    watch: {
        '$route': 'pullPath',
    },
    methods: {
        pullPath () {
            if (this.$route.params.username) {
                this.url = this.baseUrl+'/api/user/'+this.$route.params.username;
            }
            if (this.pp.username != this.$route.params.username) {
                this.fetchProfile();
            }

            if (this.$route.params.username == this.$cookie.get('username')) 
            {
                this.sttAppPlace = 'app-place';
            } 
            else 
            {
                this.sttAppPlace = '';
            }

            console.log('ttt: '+this.sttAppPlace);
            
        },
        fetchProfile () {
            this.loading = true;
            this.frameProfile = false;
            this.emptyProfile = false;
            axios.get(this.url)
            .then(response => {
                this.loading = false;
                this.frameProfile = true;
                this.emptyProfile = false;
                this.pp.id = response.data[0].id;
                this.pp.foto = this.urlThumbnailProfile+response.data[0].foto;
                this.pp.name = response.data[0].name;
                this.pp.username = response.data[0].username;
                this.pp.ttl_canvas = response.data[0].ttl_canvas;
                this.pp.ttl_designs = response.data[0].ttl_designs;
                this.pp.ttl_saved = response.data[0].ttl_saved;
                this.pp.ttl_watchs = response.data[0].ttl_watchs;
                this.pp.about = response.data[0].about;
                this.pp.website = response.data[0].website;
            })
            .catch(e => {
                this.loading = false;
                this.frameProfile = false;
                this.emptyProfile = true;
                this.emptyProfileMessage = e.response.statusText;
            });
        }
    }
}
</script>
