<template>
    <div class="story-popup normal">
        
        <div class="frame-compose">
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
                                    Create Canvas
                                </h3>
                            </div>
                            <div class="sc-col-3 txt-right"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fc-canvas">
                <form @submit.prevent="doCreatecanvas">
                    <div class="fccc-mid with-pad">
                        <div class="fc-block no-margin-top">
                            <div class="fcb-top">
                                <p class="ttl txt-site txt-11 txt-thin txt-primary">
                                    Title
                                </p>
                            </div>
                            <div class="fcb-mid">
                                <input 
                                    type="text" 
                                    name="title" 
                                    id="title-design" 
                                    class="tg txt txt-primary-color" 
                                    placeholder="Such as Robot, Mobile Design etc."
                                    required="true"
                                    v-model="dt.title">
                            </div>
                        </div>
                        <div class="fc-block">
                            <div class="fcb-top">
                                <p class="ttl txt-site txt-11 txt-thin txt-primary">
                                    Description [optional]
                                </p>
                            </div>
                            <div class="fcb-mid">
                                <textarea
                                    name="write-design" 
                                    id="write-design" 
                                    class="txt edit-text txt-primary-color ctn ctn-main ctn-sans-serif"
                                    maxlength="250"
                                    placeholder="About your canvas"
                                    v-model="dt.description"></textarea>
                            </div>
                        </div>
                        <div class="fc-block">
                            <div class="fcb-top">
                                <p class="ttl txt-site txt-11 txt-thin txt-primary">
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
                                value="Create" 
                                id="btn-publish">
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>
<script>
export default {
    data () {
        return {
            urlCreatecanvas: this.baseUrl+'/api/canvas/create/all?token='+this.$cookie.get('jwt'),
            dt: {
                title: '',
                description: '',
                tags: '',
            },
            idcanvas: '',
        }
    },
    methods: {
        doCreatecanvas: function () { 
            this.$openMessageLoading('open', 'Creating Daper');
            axios.post(this.urlCreatecanvas, {
                'title': this.dt.title,
                'description': this.dt.description,
                'tags': this.dt.tags,
            })
            .then(response => {
                this.$openMessageLoading('hide');
                if (response.data.status == 'successful') {
                    var vm = this;
                    this.dt.title = '';
                    this.dt.description = '';
                    this.dt.tags = '';
                    this.idcanvas = response.data.idcanvas;
                    this.$openMessageYesNo('Canvas created, visit now?', function () {
                        // vm.$router.push('/'+vm.$cookie.get('username')+'/canvas/'+vm.idcanvas);
                        window.location = '/'+vm.$cookie.get('username')+'/canvas/'+vm.idcanvas;
                    });
                } else {
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
</script>
