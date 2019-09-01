<template>
    <div>
        <div class="app-search as-hover">
            <router-link :to="{name: 'search'}">
                <div class="app-search-grid-2">
                    <div class="col-1">
                        <span class="loc-1 fa fa-lg fa-search"></span>
                    </div>
                    <div class="col-2">
                        <span class="loc-2">
                            {{ searchResult }}
                        </span>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    props: ['text'],
    data () {
        return {
            searchResult: 'Search...'
        }
    },
    created: function () {
        if (this.text) 
        {
            this.searchResult = this.text
        } 
        else 
        {
            this.searchResult = 'Search...'
        }
    }
}
</script>
