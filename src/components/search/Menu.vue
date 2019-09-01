<template>
    <div class="margin-bottom-20px">
        <div class="container-2">
            <div class="navigator nav-3x nav-theme-3" id="user-nav">
                <ul>
                    <router-link :to="{name : 'search-post', query: {q: $route.query.q}}">
                        <li :class="userDesigns">
                            <div class="icn">Posts</div>
                        </li>
                    </router-link>
                    <router-link :to="{name : 'search-canvas', query: {q: $route.query.q}}">
                        <li :class="userPapers">
                            <div class="icn">Canvas</div>
                        </li>
                    </router-link>
                    <router-link :to="{name : 'search-user', query: {q: $route.query.q}}">
                        <li :class="userUsers">
                            <div class="icn">Users</div>
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
            userPapers: '',
            userDesigns: '',
            userUsers: '',
            txtSearch: this.$route.query.q,
            ctrSearch: this.$route.name,
        }
    },
    created: function () {
        if (this.nav == 'design') {
            this.userPapers = '';
            this.userDesigns = 'active';
            this.userUsers = '';
        }
        if (this.nav == 'canvas') {
            this.userPapers = 'active';
            this.userDesigns = '';
            this.userUsers = '';
        }
        if (this.nav == 'users') {
            this.userPapers = '';
            this.userDesigns = '';
            this.userUsers = 'active';
        }
    }
}
</script>
