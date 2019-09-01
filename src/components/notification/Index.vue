<template>
    <div>
        <div class="app-panel">
            <frame-search></frame-search>
        </div>

        <div class="container">
            <frame-notifications :url="urlGetNotif"></frame-notifications>
        </div>
    </div>
</template>
<script>
import FrameNotifications from './Card'
import FrameSearch from '../main/FrameSearch'

export default {
    data () {
        return {
            urlGetNotif: this.baseUrl+'/api/notifications/all?token='+this.$cookie.get('jwt'),
        }
    },
    created: function () {
        //mounted
    },
    components: {
        'frame-notifications': FrameNotifications,
        'frame-search': FrameSearch
    }
}
</script>
