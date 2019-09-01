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
                <form @submit.prevent="doRegister()">
                    <div class="margin-10px" v-if="frameErr">
                        <div class="txt-site txt-11 txt-danger">
                            {{ message }}
                        </div>
                    </div>

                    <div class="margin-10px">
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Full name"
                            required
                            v-model="user.name"
                            class="txt txt-primary-color">
                        <div class="margin-top-10px" v-if="frameErrName">
                            <div class="txt-site txt-11 txt-danger">
                                {{ messageName }}
                            </div>
                        </div>
                    </div>
                    
                    <div class="margin-10px">
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="E-mail address"
                            required
                            v-model="user.email"
                            class="txt txt-primary-color">
                        <div class="padding-top-10px" v-if="frameErrEmail">
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
                            placeholder="Create password"
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
                            type="number" 
                            name="name" 
                            id="name" 
                            placeholder="Age"
                            max="100"
                            min="0"
                            required
                            class="txt txt-primary-color">
                    </div>
                    <div class="margin-10px">
                        <input 
                            type="submit"
                            :value="valRegister" 
                            :disabled="disRegister"
                            class="btn btn-main-color btn-width-all margin-5px">
                    </div>
                </form>
                <div class="txt-site txt-12 txt-primary margin-top-20px">
                    <router-link to="/login">
                        Login
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
            url: this.baseUrl+'/api/auth/register',
            message: '',
            messageName: '',
            messageEmail: '',
            messagePass: '',
            valRegister: 'Register',
            disRegister: false,
            frameErr: false,
            frameErrName: false,
            frameErrEmail: false,
            frameErrPass: false,
            user: {
                name: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        doRegister () {
            var vm = this;
            this.frameErr = false;
            this.frameErrName = false;
            this.frameErrEmail = false;
            this.frameErrPass = false;
            this.valRegister = 'Please Wait...';
            this.disRegister = true;
            axios.post(this.url, {
                'name': this.user.name,
                'email': this.user.email,
                'password': this.user.password
            })
            .then(response => {
                if (response.data.status == 'unlogin') 
                {
                    vm.frameErr = true;
                    vm.message = e.response.responseText;
                    vm.valRegister = 'Success';
                    vm.disRegister = true;
                }
                if (response.data.status == 'unauthorized') 
                {
                    vm.frameErr = true;
                    vm.message = e.response.responseText;
                    vm.valRegister = 'Try Again';
                    vm.disRegister = false;
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
                if (response.data.status == 'success') 
                {
                    vm.valRegister = 'Success';
                    vm.disRegister = true;
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
                vm.frameErr = true;
                vm.message = e.response.responseText;
                vm.valRegister = 'Try Again';
                vm.disRegister = false;
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
