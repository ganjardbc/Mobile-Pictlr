<template>
    <div>
        <div v-if="placeDesign">
            <div v-for="dg in designs" class="margin-20px">

                <div class="frame-post" :key="dg.idbookmark">
                    <div class="fpt-col-2">

                        <div class="mid">
                            <div class="top-tool margin-bottom-10px">
                                <div class="tt-col-1">
                                    <router-link :to="{name: 'user', params: {username: dg.username}}">
                                        <div 
                                            class="image image-45px image-circle"
                                            :style="{
                                                'background-image': 'url('+urlThumbnailProfile+dg.foto+')'
                                            }"></div>
                                    </router-link>
                                </div>
                                <div class="tt-col-2">
                                    <div>
                                        <router-link 
                                            class="txt-site txt-12 txt-bold txt-main txt-main-hover"
                                            :to="{name: 'user', params: {username: dg.username}}">
                                            {{ dg.name }}
                                        </router-link>
                                    </div>

                                    <div class="grid grid-2x-col7">
                                        <div class="column-1">
                                            <div>
                                                <span class="txt-site txt-10 txt-thin txt-primary">Posted on</span>
                                                <router-link 
                                                    class="txt-site txt-10 txt-main txt-bold txt-main-hover"
                                                    :to="{
                                                    name: 'visit-canvas', 
                                                    params: {
                                                        username: dg.username, 
                                                        idcanvas: dg.idcanvas
                                                        }
                                                    }">
                                                    {{ dg.title }}
                                                </router-link>
                                            </div>
                                        </div>
                                        <div class="column-2 content-right">
                                            <div class="txt-site txt-10 txt-thin txt-primary txt-right">
                                                <span>{{ dg.created | moment('from', 'now') }}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mid-tool no-max-height">
                                <div 
                                    class="place-pict" 
                                    >
                                    <router-link :to="{name: 'visit-post', params: {idbookmark: dg.idbookmark}}">
                                        <div class="private-story"></div>
                                        <img :src="urlFotoStory+dg.cover">
                                    </router-link>
                                </div>
                            </div>
                        </div>

                        <div class="mid">
                            <div 
                                v-if="dg.title_design" 
                                class="txt-site txt-16 txt-bold txt-main txt-bold margin-5px">
                                    {{ dg.title_design }}
                            </div>
                            <div
                                v-if="dg.description_design" 
                                class="txt-site txt-12 txt-thin txt-main txt-thin txt-font-2 margin-5px">
                                {{ dg.description_design }}
                            </div>
                        </div>

                        <div class="mid margin-top-10px">
                            <div class="oth-tool">
                                <div class="ot-col-1">
                                    <button class="btn btn-circle btn-main2-color">
                                        <span class="icn fas fa-lg fa-share-alt"></span>
                                    </button>
                                    <router-link :to="{name: 'visit-post', params: {idbookmark: dg.idbookmark}}">
                                        <button class="btn btn-circle btn-main2-color">
                                            <span class="icn far fa-lg fa-comment-alt"></span>
                                        </button>
                                    </router-link>
                                    <router-link :to="{name: 'edit-post', params: {idbookmark: dg.idbookmark}}">
                                        <button 
                                            class="btn btn-circle btn-main2-color"
                                            v-if="$cookie.get('id') == dg.id">
                                            <span class="icn fa fa-lg fa-pencil-alt"></span>
                                        </button>
                                    </router-link>
                                    <button 
                                            class="btn btn-circle btn-main2-color"
                                            @click="openMenu(dg.idbookmark, dg.id)">
                                            <span class="fas fa-lg fa-ellipsis-h"></span>
                                    </button>
                                </div>
                                <div class="ot-col-2">
                                    <button 
                                        class="btn btn-main-color"
                                        @click="doSave(
                                            dg.idbookmark,
                                            dg.idimages,
                                            urlThumbnailStory+dg.cover,
                                            dg.title_design
                                        )">
                                        <span class="icn fa fa-lg fa-bookmark"></span>
                                        <span>Save</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>

        <div v-if="emptyDesign">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">{{ emptyMessage }}</div>
            </div>
        </div>

        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="loadMore" class="frame-more padding-15px">
            <button class="btn btn-main2-color btn-radius" @click="moreDesign">
                <span>Load More</span>
            </button>
        </div>

        <!--menu
        <frame-design-menu></frame-design-menu>
        -->
        <div v-if="frameDesignMenu">
            <div class="frame-popup">
                <ul class="menu-list">
                    <li class="ml-list head bdr-bottom">Options</li>
                    <li class="ml-list bdr-bottom" @click="sharedDesign">
                        Shared to Your Friends
                    </li>
                    <!-- <li class="ml-list bdr-bottom">
                        Save Post
                    </li> -->
                    <div v-if="importantMenu">
                        <li class="ml-list sekunder bdr-bottom" @click="editDesign">
                            Edit Design
                        </li>
                        <li class="ml-list danger bdr-bottom" @click="deleteDesign">
                            Delete Design
                        </li>
                    </div>
                    <li class="ml-list cancel" @click="closeMenu">Cancel</li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';

export default {
    props: ['col', 'url'],
    data () {
        return {
            loading: false,
            emptyDesign: false,
            placeDesign: false,
            frameDesignMenu: false,
            importantMenu: false,
            loadMore: false,
            emptyMessage: 'Posts Empty',
            idbookmarkMenu: 0,
            defaultCol: 5,
            limit: 5,
            offset: 0,
            designs: [],
        }
    },
    created: function () {
        this.fetchDesign();
        if (this.col) {
            this.defaultCol = this.col;
        } else {
            this.defaultCol = 5;
        }
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        closeMenu () {
            this.frameDesignMenu = false;
        },
        openMenu (idbookmark, id) {
            this.frameDesignMenu = true;
            if (idbookmark != 0) {
                this.idbookmarkMenu = idbookmark;
                if (this.$cookie.get('id') == id) {
                    this.importantMenu = true;
                } else {
                    this.importantMenu = false;
                }
            }
        },
        moreDesign () {
            this.fetchDesign();
        },
        fetchDesign () {
            this.loading = true;
            this.loadMore = false;
            //console.log(this.url+'&limit='+this.limit+'&offset='+this.offset);
            
            axios.get(this.url+'&limit='+this.limit+'&offset='+this.offset)
            .then(response => {
                this.loading = false;
                if (response.data.design.length < this.limit) {
                    this.loadMore = false;
                } else {
                    this.loadMore = true;
                }
                if (response.data.design && response.data.design.length) {
                    this.placeDesign = true;
                    for (let i = 0; i < response.data.design.length; i++) {
                        this.designs.push(response.data.design[i]);
                    }
                    this.offset += this.limit;
                } else {
                    if (this.offset == 0) {
                        this.emptyDesign = true;
                    }
                }
            })
            .catch(e => {
                this.loading = false;
                this.emptyDesign = true;
                this.emptyMessage = e.response.statusText;
                //this.$openMessageOk('design: '+e.response.statusText);
            })
        },
        sharedDesign () {
            this.closeMenu();
            this.$openMessageBottom('open', 'still builded');
        },
        editDesign () {
            this.closeMenu();
            this.$router.push({name: 'edit-post', params: {idbookmark: this.idbookmarkMenu}});
        },
        deleteDesign () {
            this.closeMenu();
            this.$deleteDesign(this.idbookmarkMenu);
        },
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
                this.$router.push({name: 'save-post', params: {idbookmark: idbookmark}});
            }
        }
    }
}
</script>
