<template>
    <div id="app" class="app">
        <!-- <div class="app-top"></div> -->

        <div class="app-mid">
            <transition>
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
            <transition>
                <keep-alive>
                    <router-view name="content" :key="$route.fullPath"></router-view>
                </keep-alive>
            </transition>
            <transition>
                <keep-alive>
                    <router-view name="design" :key="$route.fullPath"></router-view>
                </keep-alive>
            </transition>
            <transition>
                <router-view name="fresh" :key="$route.fullPath"></router-view>
            </transition>

            <!--frame message-->
            <frame-message-ok></frame-message-ok>
            <frame-message-yesno></frame-message-yesno>
            <frame-message-loading></frame-message-loading>
            <frame-message-bottom></frame-message-bottom>

        </div>
        <div class="app-bot">
            <div class="app-nav">
                <ul>
                    <li>
                        <router-link :to="{name: 'home'}" :class="navHome">
                            <div class="an-icn">
                                <i class="txt-site txt-16 fa fa-lg fa-home"></i>
                                <!-- <div class="txt-site txt-9">Home</div> -->
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{name: 'trendings'}" :class="navTrend">
                            <div class="an-icn">
                                <i class="txt-site txt-16 fas fa-lg fa-compass"></i>
                                <!-- <div class="txt-site txt-9">Trendings</div> -->
                            </div>
                        </router-link>
                    </li>
                    <li @click="openMenu">
                        <div class="an-icn">
                            <i class="txt-site txt-16 fas fa-lg fa-plus-circle"></i>
                            <!-- <div class="txt-site txt-9">Create</div> -->
                        </div>
                    </li>
                    <li>
                        <router-link :to="{name: 'notifications'}" :class="navNotif">
                            <div class="an-icn">
                                <i class="txt-site txt-16 fas fa-lg fa-bell"></i>
                                <!-- <div class="txt-site txt-9">Notifications</div> -->
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{
                                name: 'user', 
                                params: {
                                    username: $cookie.get('username')
                                }
                            }"
                            :class="navAccount">
                            <div class="an-icn">
                                <i class="txt-site txt-16 fas fa-lg fa-user"></i>
                                <!-- <div class="txt-site txt-9">Account</div> -->
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div v-if="navMenu">
            <div class="frame-popup">
                <ul class="menu-list">
                    <li class="ml-list head bdr-bottom">Create</li>
                    <router-link :to="{name: 'compose-post'}">
                        <li class="ml-list" @click="closeMenu">
                            <span class="fa fa-lg fa-camera"></span>
                            Create Post
                        </li>
                    </router-link>
                    <router-link :to="{name: 'compose-canvas'}">
                        <li class="ml-list" @click="closeMenu">
                            <span class="fa fa-lg fa-th-large"></span>
                            Create Canvas
                        </li>
                    </router-link>
                    <li class="ml-list cancel" @click="closeMenu">Cancel</li>
                </ul>
            </div>
        </div>

    </div>
</template>
<script>
import FrameMessageOk from '@/components/main/message/Ok';
import FrameMessageYesNo from '@/components/main/message/YesNo';
import FrameMessageLoading from '@/components/main/message/Loading';
import FrameMessageBottom from '@/components/main/message/Bottom';

export default {
    data () {
        return {
            navHome: '',
            navTrend: '',
            navNotif: '',
            navAccount: '',
            navMenu: false,
        }
    },
    components: {
        'frame-message-ok': FrameMessageOk,
        'frame-message-yesno': FrameMessageYesNo,
        'frame-message-loading': FrameMessageLoading,
        'frame-message-bottom': FrameMessageBottom,
    },
    watch: {
        '$route': 'pullMainNav',
    },
    created: function () {
        this.pullMainNav()
    },
    methods: {
        openMenu () {
            this.navMenu = true
        },
        closeMenu () {  
            this.navMenu = false
        },
        pullMainNav () {
            if (this.$route.name == 'home') 
            {
                this.navHome = 'active'
                this.navTrend = ''
                this.navNotif = ''
                this.navAccount = ''
            } 
            if  (
                    this.$route.name == 'trendings' ||
                    this.$route.name == 'fresh' ||
                    this.$route.name == 'populars' ||
                    this.$route.name == 'topics'
                ) 
            {
                this.navHome = ''
                this.navTrend = 'active'
                this.navNotif = ''
                this.navAccount = ''
            }
            if (this.$route.name == 'notifications') 
            {
                this.navHome = ''
                this.navTrend = ''
                this.navNotif = 'active'
                this.navAccount = ''
            } 
            if (this.$route.params.username == this.$cookie.get('username')) 
            {
                this.navHome = ''
                this.navTrend = ''
                this.navNotif = ''
                this.navAccount = 'active'
            } 
        }
    }
}
</script>

<style>
    /* @import url('./assets/icons/fontawesome/css/all.min.css'); */
    @import url('https://use.fontawesome.com/releases/v5.7.2/css/all.css');
	@import url('./assets/sass/app.css');
</style>
