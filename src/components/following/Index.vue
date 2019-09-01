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
                                Following
                            </h3>
                        </div>
                        <div class="sc-col-3 txt-right"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <h1 class="txt-site txt-big txt-center txt-main txt-bold">
                Discover Your Following and Watchs
            </h1>
            <p class="txt-site txt-11 txt-primary txt-center">
                Only you can see this page
            </p>
            <div class="padding-10px"></div>
        </div>
    </div>
</template>
<script>
export default {
    beforeCreate: function () {
        if (!this.$cookie.get('jwt')) {
            this.$router.push('/welcome');
        }
    }
}
</script>
