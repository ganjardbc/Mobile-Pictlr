<template>
    <div class="story-popup normal">
        <div class="frame-compose">

            <!-- Choose Paper -->
            <div v-if="choosePaper">
                <div class="app-panel normal">
                    <div class="sc-header">
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
                                        Save Design
                                    </h3>
                                </div>
                                <div class="sc-col-3 txt-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fc-canvas">
                    <div class="fccc-mid">
                        <div class="with-pad border-bottom margin-bottom-10px">
                            <div class="fc-add-pict">
                                <div class="fc-image">
                                    <div 
                                        class="image image-full image-radius" 
                                        :style="{'background-image': 'url('+$cookie.get('design')+')'}">
                                    </div>
                                    <div class="txt-site txt-11 txt-thin txt-danger padding-top-5px">
                                        {{ messageFile }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="frameSmallPaperEmpty">
                            <div class="padding-20px">
                                <div class="padding-20px"></div>
                                <div class="frame-empty">
                                    <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                                    <div class="txt-site txt-bold txt-20 txt-primary">
                                        Paper Empty
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="frameSmallPaperContent">
                            <div class="with-pad">
                                <p class="ttl txt-site txt-11 txt-primary">
                                    Choose canvas
                                </p>
                            </div>
                            <div v-for="pp in paper">
                                <div 
                                    class="frame-small-paper" 
                                    :id="'small-paper-'+pp.idcanvas">
                                    <div 
                                        class="cover" 
                                        :data-key="pp.idcanvas"
                                        @click="doSave(pp.idcanvas)"></div>
                                    <div class="grid-1">
                                        <div v-if="pp.cover">
                                            <div 
                                                class="image image-45px image-radius"
                                                :data-key="baseUrl + '/img/story/thumbnails/' + pp.cover"
                                                :style="{'background-image': 'url('+baseUrl + '/img/story/thumbnails/' + pp.cover+')'}">
                                            </div>
                                        </div>
                                        <div v-else>
                                            <div 
                                                class="image image-45px image-radius"
                                                data-key="empty">
                                                <span class="icn fa fa-lg fa-th-large"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="grid-2">
                                        <div class="ttl txt-site txt-main txt-11 txt-bold">{{ pp.title }}</div>
                                    </div>
                                    <div class="grid-3">
                                        <div v-if="dt.idcanvas == pp.idcanvas">
                                            <button 
                                                class="chk btn btn-circle btn-primary-color selected" 
                                                :data-key="pp.idcanvas"
                                                @click="doSave(pp.idcanvas)"
                                                type="button">
                                                <span class="fa fa-lg fa-bookmark"></span>
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button 
                                                class="chk btn btn-circle btn-primary-color" 
                                                :data-key="pp.idcanvas"
                                                @click="doSave(pp.idcanvas)"
                                                type="button">
                                                <span class="fa fa-lg fa-bookmark"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="fccc-bot">
                        <div class="frame-small-paper" @click="showCreatePaper">
                            <div class="grid-1">
                                <button 
                                    class="chk btn btn-circle btn-main-color" 
                                    type="button"
                                    @click="showCreatePaper">
                                    <span class="fa fa-lg fa-plus"></span>
                                </button>
                            </div>
                            <div class="grid-2">
                                <div class="ttl txt-site txt-11 txt-main txt-bold">
                                    Create Canvas
                                </div>
                            </div>
                            <div class="grid-3"></div>
                        </div>
                    </div>
                </div>
            </div>


            <!-- Create Canvas -->
            <div v-if="createPaper">
                <div class="app-panel">
                    <div class="sc-header">
                        <div class="sc-place no-pad">
                            <div class="sc-grid sc-grid-3x" style="height: 45px;">
                                <div class="sc-col-1"></div>
                                <div class="sc-col-2">
                                    <h3 class="ttl-head ttl-sekunder-color">
                                        Create Canvas
                                    </h3>
                                </div>
                                <div class="sc-col-3 txt-right">
                                    <button 
                                        class="btn btn-grey2-color btn-circle" 
                                        @click="cancelCreatePaper()">
                                        <span class="fa fa-lg fa-times"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fc-canvas" style="margin-top: 60px;">
                    <form @submit.prevent="doCreatePaper()">
                        <div class="fccc-mid with-pad">
                            <div class="margin-10px">
                                <label class="ttl txt-site txt-11 txt-thin txt-primary">
                                    Title [required]
                                </label>
                            </div>
                            <input 
                                type="text" 
                                name="title-paper" 
                                id="title-paper" 
                                class="tg txt txt-primary-color" 
                                placeholder="Such as Robot, Mobile Design etc."
                                v-model="titlePaper"
                                required>
                        </div>
                        <div class="fccc-bot with-pad">
                            <div class="margin-top-10px" style="text-align: right;">
                                <input 
                                    type="button" 
                                    value="Cancel" 
                                    class="btn btn-grey2-color"
                                    @click="cancelCreatePaper">
                                <input 
                                    type="submit" 
                                    value="Create" 
                                    class="btn btn-main-color">
                            </div>
                        </div>
                    </form>
                </div>
            </div>


        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            urlDesign: this.baseUrl+'/api/bookmark/save?token='+this.$cookie.get('jwt'),
            urlCheckDesign: this.baseUrl+'/api/bookmark/check?token='+this.$cookie.get('jwt'),
            urlGetPaper: this.baseUrl+'/api/canvas/get?token='+this.$cookie.get('jwt'),
            urlCreatePaper: this.baseUrl+'/api/canvas/create?token='+this.$cookie.get('jwt'),
            paper: [],
            titlePaper: '',
            placeTitlepaper: 'Choose Canvas',
            placeIdcanvas: '',
            placePictPaper: 'empty',
            icnPlus: true,
            txtMessage: false,
            messageFile: '',
            basicInfo: false,
            choosePaper: true,
            createPaper: false,
            frameSmallPaperContent: false,
            frameSmallPaperEmpty: false,
            refreshSmallPaper: true,
            framePaperMessage: false,
            paperMessage: '',
            dt: {
                title: '',
                description: '',
                tags: '',
                idcanvas: ''
            },
        }
    },
    created: function () {
        this.doCheck();
        this.fetchDataPaper();
    },
    methods: {
        cancelDesign: function () {
            this.icnPlus = true;
            this.txtMessage = false;
            $('#add-design').hide();
        },
        showChoosePaper: function () {
            this.basicInfo = false;
            this.choosePaper = true;
            if (this.refreshSmallPaper == true) 
            {
                this.fetchDataPaper();
                this.refreshSmallPaper = false;
            }
        },
        cancelChoosePaper: function () {
            this.basicInfo = true;
            this.choosePaper = false;
        },
        showCreatePaper: function () {
            this.basicInfo = false;
            this.choosePaper = false;
            this.createPaper = true;
        },
        cancelCreatePaper: function () {
            this.choosePaper = true;
            this.createPaper = false;
            this.basicInfo = false;
        },
        doneChoosePaper: function () {
            this.basicInfo = true;
            this.choosePaper = false;
            this.createPaper = false;
            this.framePaperMessage = false;
            this.icnSelect = 'select place-paper';
        },
        doCheck () {
            var idimage = this.$cookie.get('idimage');
            axios.post(
                this.urlCheckDesign,
                {
                    'idimage': idimage,
                }
            )
            .then(response => {
                if (response.data.status == 'bookmark') {
                    this.txtMessage = true;
                    this.messageFile = response.data.message;
                    this.dt.idcanvas = response.data.idcanvas;
                }
            })
            .catch(e => {
                this.$openMessageBottom('open', e.response.message);
                console.log(e.response);
            });
        },
        doSave (idcanvas) {
            var id = this.$cookie.get('id');
            var idimage = this.$cookie.get('idimage');
            var idbookmark = this.$cookie.get('idbookmark');
            axios.post(
                this.urlDesign,
                {
                    'id': id,
                    'idbookmark': idbookmark,
                    'idimage': idimage,
                    'idcanvas': idcanvas,
                    'description': this.dt.description
                }
            )
            .then(response => {
                if (response.data.status == 'bookmark') 
                {
                    this.$openMessageBottom('open', response.data.message);
                    this.$goBack();
                }
                else 
                {
                    this.$openMessageBottom('open', response.data.message);
                    this.txtMessage = false;
                    this.messageFile = '';
                }
            })
            .catch(e => {
                this.$openMessageBottom('open', e.response.message);
                console.log(e.response);
            });
        },
        doCreatePaper: function () {
            if (this.titlePaper) 
            {
                axios.post(this.urlCreatePaper, {
                    'title': this.titlePaper,
                    'content': '',
                })
                .then(response => {
                    this.placeTitlepaper = response.data.title;
                    this.placeIdcanvas = response.data.idcanvas;
                    this.dt.idcanvas = response.data.idcanvas;
                    this.refreshSmallPaper = true;
                    this.titlePaper = '';
                    this.cancelCreatePaper();
                    this.fetchDataPaper();
                    this.doSave(this.dt.idcanvas);
                })
                .catch(e => {
                    this.$openMessageOk(e.response.data.error);
                });
            } 
            else 
            {
                $('#title-paper').focus();
            }
        },
        fetchDataPaper: function () {
            var vm = this;
            vm.frameSmallPaperEmpty = false;
            vm.frameSmallPaperContent = false;
            axios.get(this.urlGetPaper)
            .then(response => {
                if (response.data.canvas && response.data.canvas.length) 
                {
                    vm.frameSmallPaperEmpty = false;
                    vm.frameSmallPaperContent = true;
                    vm.paper = response.data.canvas;
                } 
                else 
                {
                    vm.frameSmallPaperEmpty = true;
                    vm.frameSmallPaperContent = false;
                }
            })
            .catch(e => {
                if (e.response.data.error) 
                {
                    this.$openMessageOk(e.response.data.error);
                } 
                else 
                {
                    this.$openMessageOk(e.response.statusText);
                }
            });
        }
    }
}
</script>
