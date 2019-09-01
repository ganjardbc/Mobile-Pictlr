<template>
    <div class="sign">
        <div class="s-info">
            <div class="w-cover">
                <router-link to="/welcome">
                    <div class="image image-all">
                        <img src="@/assets/img/Pictlr/9.png">
                    </div>
                </router-link>
            </div>
            <div class="margin-20px">
                <form @submit.prevent="doLogin()">
                    <div class="margin-10px" v-if="frameErr">
                        <div class="txt-site txt-11 txt-danger">
                            {{ message }}
                        </div>
                    </div>

                    <div class="margin-10px">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Your e-mail"
                            required
                            v-model="user.email"
                            class="txt txt-primary-color">
                        <div class="margin-top-10px" v-if="frameErrEmail">
                            <div class="txt-site txt-11 txt-danger">
                                {{ messageEmail }}
                            </div>
                        </div>
                    </div>

                    <div class="margin-10px">
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password"
                            required
                            v-model="user.password"
                            class="txt txt-primary-color">
                        <div class="margin-top-10px" v-if="frameErrPass">
                            <div class="txt-site txt-11 txt-danger">
                                {{ messagePass }}
                            </div>
                        </div>
                    </div>

                    <div class="margin-10px">
                        <input 
                            type="submit"
                            :value="valLogin" 
                            :disabled="disLogin"
                            class="btn btn-main-color btn-width-all margin-5px">
                    </div>
                </form>
                <div class="txt-site txt-12 txt-primary margin-top-20px">
                    <router-link to="/register">
                        Register
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            url: this.baseUrl+'/api/auth/login',
            message: '',
            messageEmail: '',
            messagePass: '',
            valLogin: 'Login',
            disLogin: false,
            frameErr: false,
            frameErrEmail: false,
            frameErrPass: false,
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        doLogin () {
            var vm = this;
            this.frameErr = false;
            this.frameErrEmail = false;
            this.frameErrPass = false;
            this.valLogin = 'Please Wait...';
            this.disLogin = true;
            axios.post(this.url, {
                'email': this.user.email,
                'password': this.user.password
            })
            .then(response => {
                //console.log(response.data);
                if (response.data.status === 'unauthorized') 
                {
                    vm.frameErr = true;
                    vm.message = e.response.responseText;
                    vm.valLogin = 'Try Again';
                    vm.disLogin = false;
                }
                if (response.data.status === 'email-invalide') 
                {
                    vm.valLogin = 'Try again';
                    vm.disLogin = false;
                    if (response.data.message) 
                    {
                        vm.frameErrEmail = true;
                        vm.messageEmail = response.data.message;
                    }
                }
                if (response.data.status === 'password-invalide') 
                {
                    vm.valLogin = 'Try again';
                    vm.disLogin = false;
                    if (response.data.message) 
                    {
                        vm.frameErrPass = true;
                        vm.messagePass = response.data.message;
                    }
                }
                if (response.data.status === 'success') 
                {
                    vm.valLogin = 'Success';
                    vm.disLogin = true;
                    this.$cookie.set('jwt', response.data.me.access_token, 2);
                    this.$cookie.set('id', response.data.me.id, 2);
                    this.$cookie.set('name', response.data.me.name, 2);
                    this.$cookie.set('username', response.data.me.username, 2);
                    this.$cookie.set('foto', response.data.me.foto, 2);
                    window.location = vm.initUrl;
                }
            })
            .catch(e => {
                //main error
                if (e.response.status === 405) 
                {
                    var msg = e.response.statusText;
                }
                vm.frameErr = true;
                vm.message = msg;
                vm.valLogin = 'Try Again';
                vm.disLogin = false;
                console.log(e.response);
                
            });
        }
    },
    created: function () {
        if (this.$cookie.get('jwt')) 
        {
            this.$router.push('/');
        }
    },
    beforeCreate: function () {
        if (this.$cookie.get('jwt')) 
        {
            this.$router.push('/');
        }
    }
}
</script>
