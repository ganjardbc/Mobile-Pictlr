<template>
    <div>
        <div class="app-panel">
            <frame-search></frame-search>
        </div>
        <div v-if="$cookie.get('jwt')" class="container">
            <div class="width width-750px width-center">
                <card-design :url="urlGetDesign"></card-design>
            </div>
        </div>
    </div>
</template>
<script>
import CardDesign from '../post/CardList'
import FrameSearch from '../main/FrameSearch'

export default {
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/feeds?token='+this.$cookie.get('jwt'),
        }
    },
    created: function () {
        if (!this.$cookie.get('jwt')) 
        {
            this.$router.push('/welcome');
        }
    },
    beforeCreate: function () {
        if (!this.$cookie.get('jwt')) {
            this.$router.push('/welcome');
        }
    },
    components: {
        'card-design': CardDesign,
        'frame-search': FrameSearch
    }
}
</script>
