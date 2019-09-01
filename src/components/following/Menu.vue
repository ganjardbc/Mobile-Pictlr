<template>
    <div class="col-full padding-bottom-20px">
        <div class="width width-center width-350px">
            <div class="navigator nav-2x nav-theme-3" id="following-nav">
                <ul>
                    <router-link :to="{name: 'post-following'}">
                        <li :class="followingPosts">
                            <div class="icn">Posts</div>
                        </li>
                    </router-link>
                    <router-link :to="{name: 'canvas-following'}">
                        <li :class="followingPapers">
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
    data () {
        return {
            followingPapers: '',
            followingPosts: '',
            txtfollowing: this.$route.query.q,
            ctrfollowing: this.$route.name,
        }
    },
    created: function () {
        if (this.ctrfollowing == 'post-following' || this.ctrfollowing == 'index-following') {
            this.followingPapers = '';
            this.followingPosts = 'active';
        }
        if (this.ctrfollowing == 'canvas-following') {
            this.followingPapers = 'active';
            this.followingPosts = '';
        }
    }
}
</script>
