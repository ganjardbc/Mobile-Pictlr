// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookie from 'vue-cookie'
import axios from 'axios'
import jquery from 'jquery'
import VueMasonry from 'vue-masonry-css'

Vue.config.productionTip = false

Vue.use(VueCookie)
Vue.use(VueMasonry)
Vue.use(require('vue-moment'))

window.axios = axios
window.$ = jquery

/*prototype*/
Vue.prototype.initUrl = window.location.protocol+'//'+window.location.host;
Vue.prototype.baseUrl = 'http://localhost:8000';

Vue.prototype.urlThumbnailProfile = Vue.prototype.baseUrl+'/img/profile/thumbnails/';
Vue.prototype.urlFotoProfile = Vue.prototype.baseUrl+'/img/profile/photos/';
Vue.prototype.urlThumbnailStory = Vue.prototype.baseUrl+'/img/story/thumbnails/';
Vue.prototype.urlFotoStory = Vue.prototype.baseUrl+'/img/story/covers/';


//message popup
Vue.prototype.$hidePopup = function () {
  $('.frame-popup').hide();
};
Vue.prototype.$openMessageYesNo = function (msg, eks = function () {} ) {
  $('#message-yesno').show();
  $('#message-yesno #msg').html(msg);
  $('#message-yesno ul .ml-ch').on('click', function (e) {
      var tr = e.target.attributes[0].value;
      if (tr == "yes") {
          $('#message-yesno').hide();
          return eks();
      } else {
          $('#message-yesno').hide();
      }
  });
};
Vue.prototype.$openMessageLoading = function (stt, msg = '') {
  if (stt == 'open') {
      $('#message-loading').show().find('#msg').html(msg);
  } else {
      $('#message-loading').hide().find('#msg').html('');
  }
};
Vue.prototype.$openMessageBottom = function (stt, msg = '') {
  if (stt == 'open') {
      $('#message-bottom').slideDown().delay(1500).fadeOut(1500);
      $('#message-bottom').find('#msg').html(msg);
  } else {
      $('#message-bottom').hide();
      $('#message-bottom').find('#msg').html('');
  }
};
Vue.prototype.$openMessageOk = function (msg) {
  $('#message-ok').show().find('#msg').html(msg);
};
Vue.prototype.$hideMessage = function () {
  $('.frame-message').hide();
};
Vue.prototype.$goBack = function () {
  if (window.history.length > 1) {
      this.$router.back()
  } else {
      this.$router.push('/')
  }
};

//canvas
//watch
Vue.prototype.saveWatch = function (id, iduser, idcanvas) {
  var vm = this;
  axios.post(
      vm.baseUrl+'/api/watch/save?token='+vm.$cookie.get('jwt'),
      {
          'idcanvas': idcanvas,
          'id': id,
          'iduser': iduser,
      }
  )
  .then(response => {
      if (response.data.status == 'failedadd') 
      {
          $('.watch-'+idcanvas)
          .attr('id', 'unwatch')
          .removeClass('btn-grey2-color')
          .addClass('btn-main-color')
          .find('#icn')
          .removeClass('fa-check')
          .addClass('fa-plus');
          $('.watch-'+idcanvas)
          .find('#ttl')
          .html('Watch');
      }
      if (response.data.status == 'failedremove') 
      {
          $('.watch-'+idcanvas)
          .attr('id', 'watched')
          .removeClass('btn-main-color')
          .addClass('btn-grey2-color')
          .find('#icn')
          .removeClass('fa-plus')
          .addClass('fa-check');
          $('.watch-'+idcanvas)
          .find('#ttl')
          .html('Unwatch');
      }
      if (response.data.status == 'denied') 
      {
          vm.$openMessageOk(response.data.message);
      } 
      else 
      {
          vm.$openMessageBottom('open', response.data.message);
      }
  })
  .catch(e => {
      if (e.response.responseText) 
      {
          vm.$openMessageBottom('open', e.response.responseText);   
      } 
      else 
      {
          vm.$openMessageBottom('open', e.response.statusText);
      }
      console.log(e.response);
      
  });
}

Vue.prototype.$watchPaper = function (id, iduser, idcanvas) {
  if (id == null) 
  {
      this.$openMessageOk('Please login to your account');
  } 
  else 
  {
      var vm = this;
      var tr = $('.watch-'+idcanvas).attr('id');

      this.$openMessageBottom('hide');

      if (tr == 'unwatch') 
      {
          $('.watch-'+idcanvas)
          .attr('id', 'watched')
          .removeClass('btn-main-color')
          .addClass('btn-grey2-color')
          .find('#icn')
          .removeClass('fa-plus')
          .addClass('fa-check');
          $('.watch-'+idcanvas)
          .find('#ttl')
          .html('Unwatch');
          
          this.saveWatch(id, iduser, idcanvas);
      } 
      else 
      {
          this.$openMessageYesNo('Unwatch this canvas?', function () {
              $('.watch-'+idcanvas)
              .attr('id', 'unwatch')
              .removeClass('btn-grey2-color')
              .addClass('btn-main-color')
              .find('#icn')
              .removeClass('fa-check')
              .addClass('fa-plus');
              $('.watch-'+idcanvas)
              .find('#ttl')
              .html('Watch');

              vm.saveWatch(id, iduser, idcanvas);
          });
      }
      
  }
};

//delete
Vue.prototype.$deleteDesign = function (idbookmark) {
  var a = confirm('Delete this design?');
  if (a) {
      //this.$openMessageYesNo('Delete this design?', function () {
      this.$openMessageLoading('open', 'Deleting design');
      axios.post(this.baseUrl+'/api/bookmark/delete?token='+this.$cookie.get('jwt'), {
          'idbookmark': idbookmark,
      })
      .then(response => {
          this.$openMessageLoading('hide');
          if (response.data.status == 'successful') {
              this.$openMessageBottom('open', response.data.message);
          } else {
              this.$openMessageBottom('open', response.data.message);
          }
      })
      .catch(e => {
          this.$openMessageLoading('hide');
          this.$openMessageBottom('open', e.response.statusText);
      });
      //});
  }
}
Vue.prototype.$deletePaper = function (idcanvas) {
  //var vm = this;
  var a = confirm('Delete this canvas permanently?');
  if (a) 
  {
      //this.$openMessageYesNo('Delete this canvas permanently?', function () {
      this.$openMessageLoading('open', 'Deleting canvas');
      axios.post(this.baseUrl+'/api/canvas/delete?token='+this.$cookie.get('jwt'), {
          'idcanvas': idcanvas,
      })
      .then(response => {
          this.$openMessageLoading('hide');
          this.$openMessageOk(response.data.message);
      })
      .catch(e => {
          this.$openMessageLoading('hide');
          this.$openMessageOk(e.response.statusText);
      });
      //});
  }
}

//go back
Vue.prototype.$goBack = function () {
  if (window.history.length > 1) {
      this.$router.back()
  } else {
      this.$router.push('/')
  }
};

//logout
Vue.prototype.$logOut = function () {
  var a = confirm('Logout from your account?');
  if (a) 
  {
      var vm = this;
      vm.$cookie.delete('jwt');
      vm.$cookie.delete('id');
      vm.$cookie.delete('name');
      vm.$cookie.delete('username');
      vm.$cookie.delete('foto');
      window.location = vm.initUrl+'/welcome';
  }
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
