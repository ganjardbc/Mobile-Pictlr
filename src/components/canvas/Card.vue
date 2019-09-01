<template>
    <div>

        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="emptyCanvas">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">Canvas Empty</div>
            </div>
        </div>

        <div v-if="placeCanvas">
            <div class="post-flex" id="nav-canvas">
                <span v-for="pp in canvas">
                    <div class="frame-paper">
                        <div class="top">
                            <router-link :to="{
                                name: 'visit-canvas', 
                                params:{
                                    username: pp.username, 
                                    idcanvas: pp.idcanvas
                                }}">
                                <div v-if="pp.ttl_design != 0">
                                    <div class="pl-image-big">
                                        <div class="image-main">
                                            <div 
                                                class="bg-image image image-all" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+pp.cover1+')'}" 
                                                alt="design"></div>
                                        </div>
                                        <div class="image-sekunder">
                                            <div 
                                                class="bg-image image image-all image-sekunder" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+pp.cover2+')'}" 
                                                alt="design"></div>
                                            <div 
                                                class="bg-image image image-all image-sekunder" 
                                                :style="{'background-image': 'url('+urlThumbnailStory+pp.cover3+')'}" 
                                                alt="design"></div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else>
                                    <div class="pl-icn" style="border-radius: 5px;">
                                        <span class="mn-icn fas fa-lg fa-th-large"></span>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                        <div class="mid">
                            <div class="padding-5px">
                                <h3>
                                    <router-link 
                                        class="txt-site txt-16 txt-main txt-bold txt-main-hover"
                                        :to="{
                                            name: 'visit-canvas', 
                                            params:{
                                                username: pp.username, 
                                                idcanvas: pp.idcanvas
                                            }}">
                                        {{ pp.title }}
                                    </router-link>
                                </h3>
                                <p class="txt-site txt-12">
                                    <span class="txt-site txt-primary txt-thin">
                                        Created by
                                    </span>
                                    <router-link 
                                        class="txt-site txt-main txt-bold txt-main-hover"
                                        :to="{
                                            name: 'visit-canvas', 
                                            params:{
                                                username: pp.username, 
                                                idcanvas: pp.idcanvas
                                            }}">
                                        {{ pp.username }}
                                    </router-link>
                                </p>
                            </div>
                            <div class="menu-val">
                                <ul>
                                    <li>
                                        <div class="val">{{ pp.views }}</div>
                                        <div class="ttl">Visited</div>
                                    </li>
                                    <li>
                                        <div class="val">{{ pp.ttl_design }}</div>
                                        <div class="ttl">Designs</div>
                                    </li>
                                    <li>
                                        <div class="val">{{ pp.ttl_watch }}</div>
                                        <div class="ttl">Watchs</div>
                                    </li>
                                    <li class="right">
                                        <router-link :to="{
                                            name: 'user', 
                                            params:{
                                                username: pp.username
                                            }}">
                                            <div 
                                                class="image image-40px image-circle" 
                                                :style="{'background-image': 'url('+urlThumbnailProfile+pp.foto+')'}" 
                                                :alt="pp.username"></div>
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </span>
            </div>
        </div>

    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';

export default {
    props: ['msg', 'url'],
    data () {
        return {
            loading: false,
            emptyCanvas: false,
            placeCanvas: false,
            canvas: [],
        }
    },
    created: function () {
        this.fetchCanvas();
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        fetchCanvas: function () {
            this.loading = true;
            axios.get(this.url)
            .then(response => {
                this.loading = false;
                if (response.data.canvas && response.data.canvas.length) {
                    this.placeCanvas = true;
                    this.canvas = response.data.canvas;
                } else {
                    this.emptyCanvas = true;
                }
            })
            .catch(e => {
                this.loading = false;
                console.log(e);
            })
        }
    }
}
</script>