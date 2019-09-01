<template>
    <div>
        <div class="container-2">
            <div class="navigator nav-2x nav-theme-3" id="user-nav">
                <ul>
                    <router-link :to="{name: 'user-post', params: {username: $route.params.username}}">
                        <li :class="userDesigns">
                            <div class="icn">Posts</div>
                        </li>
                    </router-link>
                    <router-link :to="{name: 'user-canvas', params: {username: $route.params.username}}">
                        <li :class="userCanvas">
                            <div class="icn">Canvas</div>
                        </li>
                    </router-link>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['nav'],
    data () {
        return {
            userCanvas: '',
            userDesigns: '',
            userSaved: '',
            userOverviews: '',
        }
    },
    created: function () {
        if (this.nav == 'designs') {
            this.userCanvas = '';
            this.userDesigns = 'active';
            this.userSaved = '';
        }
        if (this.nav == 'canvas') {
            this.userCanvas = 'active';
            this.userDesigns = '';
            this.userSaved = '';
        }
        if (this.nav == 'saved') {
            this.userCanvas = '';
            this.userDesigns = '';
            this.userSaved = 'active';
        }
    }
}
</script>
