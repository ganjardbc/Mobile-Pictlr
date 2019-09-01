<template>
    <div class="story-popup normal">
        <div class="frame-compose">
            
            <!-- Basic Info -->
            <div v-if="basicInfo">
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
                                        Add Design
                                    </h3>
                                </div>
                                <div class="sc-col-3 txt-right"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fc-canvas">
                    <form @submit.prevent="doPublishDesign">
                        <div class="fccc-mid with-pad">
                            <div class="fc-add-pict">
                                <input 
                                type="file" 
                                name="picture" 
                                class="fc-picture"
                                id="picture"
                                ref="file"
                                accept="image/*"
                                @change="rvwFoto">
                                <label for="picture" style="width: 150px;">
                                    <div>
                                        <div 
                                            class="fc-add-pict-place image" 
                                            :style="{
                                                'background-image': 'url('+foto+')',
                                                'cursor': 'pointer'
                                            }"
                                            title="Browse design">
                                            <div 
                                                v-if="icnPlus" 
                                                class="icn fas fa-2x fa-plus"></div>
                                        </div>
                                    </div>
                                </label>
                                <div 
                                    v-if="txtMessage" 
                                    class="txt-site txt-11 txt-thin txt-danger padding-top-5px">
                                    {{ messageFile }}
                                </div>
                            </div>
                            <div class="fc-block no-margin-top">
                                <div class="fcb-top">
                                    <p class="ttl txt-site txt-10 txt-thin txt-primary">
                                        Canvas [required]
                                    </p>
                                </div>
                                <div :class="icnSelect" id="selected-paper">
                                    <input 
                                        type="hidden" 
                                        name="id-canvas" 
                                        id="id-canvas" 
                                        required="true" 
                                        v-model="placeIdcanvas">
                                    <div class="main-select" @click="showChoosePaper">
                                        <div class="grid-1">
                                            <div 
                                                class="image image-40px image-radius"
                                                id="cover-paper"
                                                :style="{'background-image': 'url('+placePictPaper+')'}"
                                                >
                                                <span v-if="placePictPaper == 'empty'">
                                                    <span class="icn fa fa-lg fa-th-large"></span>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="grid-2">
                                            <div 
                                                class="ttl txt-site txt-11 txt-primary txt-bold" 
                                                id="title-paper">
                                                {{ placeTitlepaper }}
                                            </div>
                                        </div>
                                        <div class="grid-3"></div>
                                    </div>
                                </div>
                                <div 
                                    v-if="framePaperMessage" 
                                    class="txt-site txt-11 txt-thin txt-danger padding-top-5px">
                                    {{ paperMessage }}
                                </div>
                            </div>
                            <div class="fc-block">
                                <div class="fcb-top">
                                    <p class="ttl txt-site txt-10 txt-thin txt-primary">
                                        Detail [optional]
                                    </p>
                                </div>
                                <div class="fcb-mid">
                                    <input 
                                        type="text" 
                                        name="tags" 
                                        id="tags-design" 
                                        class="tg txt txt-primary-color" 
                                        placeholder="Title"
                                        v-model="dt.title">
                                    <div class="padding-top-10px"></div>
                                    <textarea
                                        name="write-design" 
                                        id="write-design" 
                                        class="txt edit-text txt-primary-color ctn-main-font ctn-thin" 
                                        maxlength="250"
                                        placeholder="Descriptions"
                                        v-model="dt.description"></textarea>
                                </div>
                            </div>
                            <div class="fc-block">
                                <div class="fcb-top">
                                    <p class="ttl txt-site txt-10 txt-thin txt-primary">
                                        Tags [optional]
                                    </p>
                                </div>
                                <div class="fcb-mid">
                                    <input 
                                        type="text" 
                                        name="tags" 
                                        id="tags-design" 
                                        class="tg txt txt-primary-color" 
                                        placeholder="Tags1, Tags2, Tags N..."
                                        v-model="dt.tags">
                                </div>
                            </div>
                        </div>
                        <div class="fccc-bot with-pad">
                            <div 
                                class="margin-top-10px" 
                                style="text-align: right;">
                                <button 
                                    class="btn btn-grey2-color btn-focus" 
                                    type="button"
                                    @click="$goBack()">
                                    <span>Cancel</span>
                                </button>
                                <input 
                                    type="submit" 
                                    name="save" 
                                    class="btn btn-main-color " 
                                    value="Upload" 
                                    id="btn-publish">
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Choose Paper -->
            <div v-if="choosePaper">
                <div class="app-panel">
                    <div class="sc-header">
                        <div class="sc-place no-pad">
                            <div class="sc-grid sc-grid-3x" style="height: 45px;">
                                <div class="sc-col-1"></div>
                                <div class="sc-col-2">
                                    <h3 class="ttl-head ttl-sekunder-color">
                                        Choose Canvas
                                    </h3>
                                </div>
                                <div class="sc-col-3 txt-right">
                                    <button 
                                        class="btn btn-grey2-color btn-circle" 
                                        @click="cancelChoosePaper()">
                                        <span class="fa fa-lg fa-times"></span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="fc-canvas" style="margin-top: 65px;">
                    <div class="fccc-mid">
                        <div v-if="frameSmallPaperEmpty">
                            <div class="padding-20px">
                                <div class="padding-20px"></div>
                                <div class="frame-empty">
                                    <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                                    <div class="txt-site txt-14 txt-thin txt-primary txt-bold">
                                        Paper Empty
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="frameSmallPaperContent">
                            <div v-for="pp in paper">
                                <div class="frame-small-paper" :id="'small-paper-'+pp.idcanvas">
                                    <div 
                                        class="cover" 
                                        :data-key="pp.idcanvas"
                                        @click="chooseIt"></div>
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
                                        <div class="ttl txt-site txt-11 txt-main txt-bold">{{ pp.title }}</div>
                                    </div>
                                    <div class="grid-3">
                                        <div v-if="placeIdcanvas == pp.idcanvas">
                                            <button 
                                                class="chk btn btn-circle btn-primary-color selected" 
                                                :data-key="pp.idcanvas"
                                                @click="chooseIt"
                                                type="button">
                                                <span class="fa fa-lg fa-check"></span>
                                            </button>
                                        </div>
                                        <div v-else>
                                            <button 
                                                class="chk btn btn-circle btn-primary-color" 
                                                :data-key="pp.idcanvas"
                                                @click="chooseIt"
                                                type="button">
                                                <span class="fa fa-lg fa-check"></span>
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
                <div class="fc-canvas" style="margin-top: 65px;">
                    <form @submit.prevent="doCreatePaper()">
                        <div class="fccc-mid with-pad">
                            <div class="margin-5px">
                                <label class="ttl txt-site txt-10 txt-thin txt-primary">
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
            urlGetPaper: this.baseUrl+'/api/canvas/get?token='+this.$cookie.get('jwt'),
            urlCreatePaper: this.baseUrl+'/api/canvas/create?token='+this.$cookie.get('jwt'),
            urlPublishDesign: this.baseUrl+'/api/design/publish?token='+this.$cookie.get('jwt'),
            paper: [],
            foto: '',
            titlePaper: '',
            placeTitlepaper: 'Choose Canvas',
            placeIdcanvas: '',
            placePictPaper: 'empty',
            icnPlus: true,
            txtMessage: false,
            messageFile: 'Browse one design',
            basicInfo: true,
            choosePaper: false,
            createPaper: false,
            frameSmallPaperContent: false,
            frameSmallPaperEmpty: false,
            refreshSmallPaper: true,
            framePaperMessage: false,
            paperMessage: '',
            icnBrowse: 'image image-all bdr-dashed',
            icnSelect: 'select place-paper',
            dt: {
                file: '',
                title: '',
                description: '',
                tags: '',
                idcanvas: ''
            },
        }
    },
    created: function () {
        //this.fetchDataPaper();
    },
    methods: {
        rvwFoto: function () {
            var vm = this;
            var OFReader = new FileReader();
            OFReader.readAsDataURL(document.getElementById("picture").files[0]);
            OFReader.onload = function (oFREvent) {
                vm.foto = oFREvent.target.result;
            }
            this.icnPlus = false;
            this.txtMessage = true;
            this.messageFile = 'To change design, just click it here again';
            this.icnBrowse = 'browse image image-all bdr-dashed';
            this.dt.file = this.$refs.file.files[0];
        },
        cancelDesign: function () {
            this.foto = '';
            this.icnPlus = true;
            this.txtMessage = false;
            $('#add-design').hide();
        },
        showChoosePaper: function () {
            this.basicInfo = false;
            this.choosePaper = true;
            if (this.refreshSmallPaper == true) {
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
            this.choosePaper = false;
            this.createPaper = false;
            this.basicInfo = true;
        },
        doneChoosePaper: function () {
            this.basicInfo = true;
            this.choosePaper = false;
            this.createPaper = false;
            this.framePaperMessage = false;
            this.icnSelect = 'select place-paper';
        },
        chooseIt: function (e) {
            var key = e.target.attributes[0].value;
            var title = $('#small-paper-'+key).find('.ttl').text();
            var pict = $('#small-paper-'+key).find('.image').attr('data-key');
            this.placeTitlepaper = title;
            this.placeIdcanvas = key;
            this.placePictPaper = pict;
            this.dt.idcanvas = key;
            this.doneChoosePaper();
        },
        doCreatePaper: function () {
            if (this.titlePaper) {
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
                    this.doneChoosePaper();
                })
                .catch(e => {
                    this.$openMessageOk(e.response.data.error);
                    console.log(e.response);
                });
            } else {
                $('#title-paper').focus();
            }
        },
        fetchDataPaper: function () {
            var vm = this;
            vm.frameSmallPaperEmpty = false;
            vm.frameSmallPaperContent = false;
            axios.get(this.urlGetPaper)
            .then(response => {
                if (response.data.status == 'success') {
                    vm.frameSmallPaperEmpty = false;
                    vm.frameSmallPaperContent = true;
                    vm.paper = response.data.canvas;
                } else {
                    vm.frameSmallPaperEmpty = true;
                    vm.frameSmallPaperContent = false;
                }
            })
            .catch(e => {
                if (e.response.data.error) {
                    this.$openMessageOk(e.response.data.error);
                } else {
                    this.$openMessageOk(e.response.statusText);
                }
                console.log(e.response);
                
            });
        },
        doPublishDesign: function () {
            if (this.dt.file == '' || this.dt.file == null) 
            {
                this.txtMessage = true;
                this.messageFile = 'Please select one design';
                this.icnBrowse = 'browse image image-all bdr-dashed error';
            } 
            else if (this.dt.idcanvas == '' || this.dt.idcanvas == null) 
            {
                this.framePaperMessage = true;
                this.paperMessage = 'Please choose a canvas';
                this.icnSelect = 'select place-paper error';
            } 
            else 
            {
                let formData = new FormData();
                formData.append('image', this.dt.file);
                formData.append('title', this.dt.title);
                formData.append('description', this.dt.description);
                formData.append('tags', this.dt.tags);
                formData.append('idcanvas', this.dt.idcanvas);

                this.$openMessageLoading('open', 'Publishing Design');

                axios.post(this.urlPublishDesign, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                })
                .then(response => {
                    //console.log(response.data);
                    this.$openMessageLoading('hide');
                    if (response.data.status == 'successful') 
                    {
                        $('#add-design').hide();
                        var vm = this;
                        this.foto = '';
                        this.icnPlus = true;
                        this.txtMessage = false;
                        this.dt.file = '';
                        this.dt.title = '';
                        this.dt.description = '';
                        this.dt.tags = '';
                        this.$openMessageYesNo('Design published, view now?', function () {
                            //vm.$router.push('/design/'+response.data.idbookmark);
                            window.location = '/post/'+response.data.idbookmark;
                        });
                    } 
                    else 
                    {
                        this.$openMessageOk(response.data.message);
                    }
                })
                .catch(e => {
                    this.$openMessageLoading('hide');
                    this.$openMessageOk(e.response.statusText);
                    console.log(e.response);
                });
            }
        }
    }
}
</script>
