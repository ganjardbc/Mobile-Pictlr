<template>
    <div class="app-panel">
        <div class="app-place">
            <div class="app-search">
                <form 
                    v-on:submit.prevent="doSearch" 
                    method="GET" 
                    class="app-search-grid">
                    <button 
                        type="submit" 
                        class="btn btn-circle btn-grey2-color btn-radius btn-no-focus">
                        <span class="fa fa-lg fa-search"></span>
                    </button>
                    <input 
                        type="text" 
                        id="search"
                        class="txt txt-trans-color txt-no-shadow"
                        placeholder="Search"
                        v-model="txtSearch"
                        required
                        autofocus>
                </form>
            </div>
            <div>
                <button 
                    class="btn btn-grey3-color btn-circle" 
                    @click="$goBack()">
                    <span class="fa fa-lg fa-times"></span>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            txtSearch: ''
        }
    },
    methods: {
        doSearch () {
            this.$router.push({
                name: 'search-post',
                params: {
                    ctr: this.txtSearch.toLowerCase().replace(/ /g, '+'),
                }
            });
        }
    }
}
</script>
