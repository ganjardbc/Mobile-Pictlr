<template>
    <div>
        <div class="app-panel">
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
                                Profile
                            </h3>
                        </div>
                        <div class="sc-col-3 txt-right"></div>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div v-if="loading">
                <frame-loading></frame-loading>
            </div>
            <div v-if="emptyProfile">
                <div class="frame-empty">
                    <div class="ctn-main-font ctn-sek-color ctn-big">
                        <div class="fa fa-lg fa-thermometer-empty"></div>
                    </div>
                    <div class="ttl padding-15px">{{ message }}</div>
                </div>
            </div>
            <div v-if="frameProfile">
                <form @submit.prevent="doSave">
                    <div class="container-2">
                        <div class="margin-bottom-15px">
                            <div class="change" id="change">
                                <div 
                                    class="foto image image-100px image-circle" 
                                    id="place-picture" 
                                    :style="{'background-image': 'url('+pp.foto+')'}"></div>
                                <div id="btn-save-foto">
                                    <input 
                                        type="file" 
                                        name="change-picture" 
                                        id="change-picture"
                                        ref="file"
                                        accept="image/*"
                                        @change="rvwFoto">
                                    <label for="change-picture">
                                        <div class="btn btn-div btn-primary-color btn-radius margin-top-10px" >
                                            <span class="ttl">Change Picture</span>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="margin-15px">
                            <div class="txt-site txt-10 txt-thin txt-primary margin-bottom-5px">
                                Full name
                            </div>
                            <div class="pe-2">
                                <input 
                                    type="text" 
                                    name="edit-name" 
                                    class="txt txt-primary-color" 
                                    id="edit-name" 
                                    required="true" 
                                    v-model="pp.name"
                                    placeholder="Full Name">
                            </div>
                        </div>
                        <div class="margin-15px">
                            <div class="txt-site txt-10 txt-thin txt-primary margin-bottom-5px">
                                Username
                            </div>
                            <div class="pe-2">
                                <input 
                                    type="text" 
                                    name="edit-username" 
                                    class="txt txt-primary-color" 
                                    id="edit-username" 
                                    required="true" 
                                    v-model="pp.username"
                                    placeholder="Username">
                            </div>
                        </div>
                        <div class="margin-15px">
                            <div class="txt-site txt-10 txt-thin txt-primary margin-bottom-5px"></div>
                            <div style="text-align: right;">
                                <input 
                                    type="button" 
                                    name="edit-cancel" 
                                    class="btn btn-grey2-color" 
                                    value="Cancel"
                                    @click="$goBack()">
                                <input 
                                    type="submit" 
                                    name="edit-save" 
                                    class="btn btn-main-color" 
                                    value="Save">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>
<script>
import FrameLoading from '../../main/FrameLoading';

export default {
    data () {
        return {
            url: this.baseUrl+'/api/user/'+this.$cookie.get('username'),
            urlSave: this.baseUrl+'/api/me/profile?token='+this.$cookie.get('jwt'),
            pp: {
                foto: '',
                file: '',
                name: '',
                username: ''
            },
            placeImage: '',
            loading: false,
            frameProfile: false,
            emptyProfile: false,
            message: ''
        }
    },
    components: {
        'frame-loading': FrameLoading,
    },
    created: function () {
        this.fetchData();
    },
    methods: {
        rvwFoto: function () {
            var vm = this;
            var OFReader = new FileReader();
            OFReader.readAsDataURL(document.getElementById("change-picture").files[0]);
            OFReader.onload = function (oFREvent) {
                vm.pp.foto = oFREvent.target.result;
            }
            this.pp.file = this.$refs.file.files[0];
            
        },
        doSave: function () {
            let formData = new FormData();
            formData.append('foto', this.pp.file);
            formData.append('name', this.pp.name);
            formData.append('username', this.pp.username);
            
            this.$openMessageLoading('open', 'Saving informations');
            axios.post(this.urlSave,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(response => {
                this.$openMessageLoading('hide');
                if (response.data.status == 'successfull') {
                    this.$openMessageOk(response.data.message);
                    this.$cookie.set('foto', response.data.foto, 2);
                } else {
                    this.$openMessageOk(response.data.message);
                }
            })
            .catch(e => {
                this.$openMessageLoading('hide');
                this.$openMessageOk(e.response.data.error);
            });
        },
        fetchData: function () {
            this.frameProfile = false;
            this.emptyProfile = false;
            this.loading = true;
            axios.get(this.url)
            .then(response => {
                if (response.data && response.data.length) {
                    this.frameProfile = true;
                    this.pp.name = response.data[0].name;
                    this.pp.username = response.data[0].username;
                    this.pp.foto = this.urlThumbnailProfile+response.data[0].foto;
                } else {
                    this.message = 'User Empty';
                    this.emptyProfile = true;
                }
                this.loading = false;
            })
            .catch(e => {
                this.message = 'There is an error';
                this.loading = false;
            });
        }
    }
}
</script>

