import Vue from 'vue'
import Router from 'vue-router'

import Welcome from "@/components/Welcome"
import Home from "@/components/home/IndexList"

//auth
import AuthLogin from "@/components/auth/Login"
import AuthRegister from "@/components/auth/Register"

//post
import ViewPost from "@/components/post/Index"
import EditPost from "@/components/post/Edit"
import CreatePost from "@/components/post/Create"
import SavePost from "@/components/post/Save"

//canvas
import ViewCanvas from "@/components/canvas/Index"
import CreateCanvas from "@/components/canvas/Create"
import EditCanvas from "@/components/canvas/Edit"

//explore
import Explore from "@/components/explore/Index"
import ExploreDesign from "@/components/explore/Design"
import ExploreNews from "@/components/explore/News"

//user
import User from "@/components/user/Index"
import UserDesign from "@/components/user/Design"
import UserCanvas from "@/components/user/Canvas"

//notifications
import Notifications from "@/components/notification/Index"

//setting
import Setting from "@/components/user/setting/Index"
import SettingBasic from "@/components/user/setting/Basic"
import SettingProfile from "@/components/user/setting/Profile"
import SettingPassword from "@/components/user/setting/Password"

//tags
import TagDesign from '../components/tags/Index'
import MoreTopics from '../components/tags/More'

//search
import Search from '../components/search/Index'
import SearchField from '../components/search/Field'
import SearchDesign from '../components/search/Design'
import SearchCanvas from '../components/search/Canvas'
import SearchUser from '../components/search/User'

// following
import Following from '../components/following/Index'
import FollowingPost from '../components/following/Design'
import FollowingCanvas from '../components/following/Canvas'

Vue.use(Router)

export default new Router ({
  routes: [


      // welcome page
      {
          path: '/',
          name: 'home',
          component: Home
      },
      {
          path: '/more-topics',
          name: 'more-topics',
          component: MoreTopics
      },
      {
          path: '/welcome',
          name: 'welcome',
          component: Welcome
      },

      
      // setting
      {
          path: '/setting',
          name: 'setting',
          component: Setting
      },
      {
          path: '/setting/basic',
          name: 'setting-basic',
          component: SettingBasic
      },
      {
          path: '/setting/profile',
          name: 'setting-profile',
          component: SettingProfile
      },
      {
          path: '/setting/password',
          name: 'setting-password',
          component: SettingPassword
      },


      // notifications
      {
          path: '/notifications',
          name: 'notifications',
          component: Notifications
      },


      // compose
      {
          path: '/compose',
          name: 'compose',
          component: CreatePost
      },
      {
          path: '/compose/post',
          name: 'compose-post',
          component: CreatePost
      },
      {
          path: '/compose/canvas',
          name: 'compose-canvas',
          component: CreateCanvas
      },


      // auth
      {
          path: '/login',
          name: 'login',
          component: AuthLogin
      },
      {
          path: '/register',
          name: 'register',
          component: AuthRegister
      },



      // explore
      {
          path: '/trendings',
          name: 'trendings',
          components: {
              default: Explore,
              content: ExploreDesign
          }
      },
      {
          path: '/fresh',
          name: 'fresh',
          components: {
              default: Explore,
              content: ExploreDesign
          }
      },
      {
          path: '/populars',
          name: 'populars',
          components: {
              default: Explore,
              content: ExploreDesign
          }
      },
      {
          path: '/timelines',
          name: 'timelines',
          components: {
              default: Explore,
              content: ExploreDesign
          }
      },



      // search
      {
          path: '/search',
          name: 'search',
          components: {
              default: SearchField,
          }
      },
      {
          path: '/search/posts/:ctr',
          name: 'search-post',
          components: {
              content: Search,
              design: SearchDesign
          }
      },
      {
          path: '/search/canvas/:ctr',
          name: 'search-canvas',
          components: {
              content: Search,
              design: SearchCanvas
          }
      },
      {
          path: '/search/users/:ctr',
          name: 'search-user',
          components: {
              content: Search,
              design: SearchUser
          }
      },



      // tags
      {
          path: '/tags/:ctr',
          name: 'view-tags',
          components: {
              content: TagDesign
          }
      },



      // news
      {
          path: '/news/:ctr',
          name: 'topics',
          components: {
              default: Explore,
              content: ExploreNews
          }
      },



      // posts
      {
          path: '/post/:idbookmark',
          name: 'visit-post',
          components: {
              content: ViewPost,
          }
      },
      {
          path: '/post/:idbookmark/save',
          name: 'save-post',
          components: {
              fresh: SavePost
          }
      },
      {
          path: '/post/:idbookmark/edit',
          name: 'edit-post',
          components: {
              content: EditPost,
          }
      },


      // following
      {
          path: '/following',
          name: 'following',
          redirect: {name: 'post-following'}
      },
      {
          path: '/following/posts',
          name: 'post-following',
          components: {
              default: Following,
              content: FollowingPost,
          }
      },
      {
          path: '/following/canvas',
          name: 'canvas-following',
          components: {
              default: Following,
              content: FollowingCanvas,
          }
      },


      // account
      {
          path: '/:username',
          name: 'user',
          components: {
              default: User,
              content: UserDesign,
          }
      },
      {
          path: '/:username/designs',
          name: 'user-post',
          components: {
              default: User,
              content: UserDesign,
          }
      },
      {
          path: '/:username/canvas',
          name: 'user-canvas',
          components: {
              default: User,
              content: UserCanvas,
          }
      },
      {
          path: '/:username/canvas/:idcanvas',
          name: 'visit-canvas',
          components: {
              content: ViewCanvas,
          }
      },
      {
          path: '/:username/canvas/:idcanvas/edit',
          name: 'edit-canvas',
          component: EditCanvas
      },
      {
          path: '/:username/canvas/:idcanvas/post/:idbookmark',
          name: 'visit-post-full',
          components: {
              content: ViewPost,
          }
      },
      {
          path: '/:username/canvas/:idcanvas/post/:idbookmark/edit',
          name: 'edit-post-full',
          components: {
              content: EditPost,
          }
      },



  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
          return savedPosition
      } else {
          return {x: 0, y: 0}
      }
  }
})
