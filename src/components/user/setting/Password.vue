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
                                Basic
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
                            <div class="txt-site txt-10 txt-thin txt-primary margin-bottom-5px">
                                Old password
                            </div>
                            <div class="pe-2">
                                <input 
                                    type="password" 
                                    name="old-password" 
                                    class="txt txt-primary-color" 
                                    id="old-password" 
                                    required="true" 
                                    placeholder="Old Password">
                            </div>
                        </div>
                        <div class="margin-15px">
                            <div class="txt-site txt-10 txt-thin txt-primary margin-bottom-5px">
                                New password
                            </div>
                            <div class="pe-2">
                                <input 
                                    type="password" 
                                    name="new-password" 
                                    class="txt txt-primary-color" 
                                    id="new-password" 
                                    required="true" 
                                    placeholder="New Password">
                            </div>
                        </div>
                        <div class="margin-15px">
                            <div class="txt-site txt-10 txt-thin txt-primary margin-bottom-5px">
                                Confirm password
                            </div>
                            <div class="pe-2">
                                <input 
                                    type="password" 
                                    name="renew-password" 
                                    class="txt txt-primary-color" 
                                    id="renew-password" 
                                    required="true" 
                                    placeholder="Confirm Password">
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
            loading: false,
            frameProfile: true,
            emptyProfile: false,
        }
    },
    components: {
        'frame-loading': FrameLoading,
    },
    created: function () {
        //this.fetchData();
    },
    methods: {
        doSave: function () {
            this.$openMessageOk('still builded');
        },
        fetchData: function () {
            this.frameProfile = false;
            this.emptyProfile = false;
            this.loading = true;
            axios.get(this.url)
            .then(response => {
                if (response.data && response.data.length) {
                    this.frameProfile = true;
                    this.pp.email = response.data[0].email;
                    this.pp.about = response.data[0].about;
                    this.pp.website = response.data[0].website;
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
