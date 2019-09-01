<template>
    <div>
        <div v-if="placeDesign">
            <masonry 
                :cols="{default: defaultCol, 1000: 4, 800: 3, 540: 2, 340: 1}"
                :gutter="{default: 0, 1000: 0}">
                <div v-for="dg in designs">
                    <div class="frame-post" :key="dg.idbookmark">
                        <div class="mid">
                            <div class="mid-tool">
                                <div 
                                    class="place-pict" 
                                    :style="{
                                        'padding-bottom': ((dg.height / dg.width) * 100)+'%'
                                    }">
                                    <router-link :to="{
                                        name: 'visit-post', 
                                        params: {
                                            idbookmark: dg.idbookmark
                                            }
                                        }">
                                        <div class="private-story"></div>
                                        <img 
                                            class="place-pict-image" 
                                            :src="urlThumbnailStory+dg.cover">
                                    </router-link>
                                </div>
                            </div>
                        </div>
                        <div class="mid">
                            <div class="oth-tool">
                                <div class="ot-col-1 margin-5px">
                                    <div class="txt-site txt-10 txt-thin txt-primary">
                                        {{ dg.created | moment('from', 'now') }}
                                    </div>
                                    <div 
                                        v-if="dg.title_design" 
                                        class="txt-site txt-11 txt-bold txt-main margin-top-5px">
                                            {{ dg.title_design }}
                                    </div>
                                </div>
                                <div class="ot-col-2 right">
                                    <button 
                                            class="icn-circle btn btn-circle btn-grey4-color btn-no-focus"
                                            @click="openMenu(dg.idbookmark, dg.id)">
                                            <span class="fas fa-lw fa-ellipsis-h"></span>
                                    </button>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </masonry>
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
                    <li class="ml-list" @click="sharedDesign">
                        Shared to Your Friends
                    </li>
                    <div v-if="importantMenu">
                        <li class="ml-list sekunder" @click="editDesign">
                            Edit Design
                        </li>
                        <li class="ml-list danger" @click="deleteDesign">
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
            defaultCol: 4,
            limit: 15,
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
            // this.$router.push('/design/'+this.idbookmarkMenu+'/edit');
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
                this.$cookie.set('idimage', idimage, 1);
                this.$cookie.set('design', design, 1);
                this.$cookie.set('desc', desc, 1);
                this.$router.push('/design/'+idbookmark+'/save');
            }
        }
    }
}
</script>
