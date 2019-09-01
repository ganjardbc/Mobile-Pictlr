<template>
    <div>
        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="emptyNotif">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">{{ messageNotif }}</div>
            </div>
        </div>

        <div v-if="placeNotif">
            <div v-for="dt in notifs">

                <div v-if="dt.type == 'watch'">
                    <div class="frame-notif grid-3x">
						<div class="notif-sid">
                            <router-link :to="{name: 'user', params: {username: dt.username}}">
								<div 
                                    class="image image-45px image-circle" 
                                    :style="{'background-image': 'url('+urlThumbnailProfile+dt.foto+')'}" ></div>
							</router-link>
						</div>
						<div class="notif-mid">
							<div class="ntf-mid">
								<div class="desc">
                                    <span class="txt-site txt-11 txt-main">Your canvas</span>
                                    <router-link 
                                        class="txt-site txt-11 txt-main txt-bold txt-main-hover"
                                        :to="{
                                            name: 'visit-canvas', 
                                            params: {
                                                username: dt.username, 
                                                idcanvas: dt.idcanvas
                                            }
                                        }">
                                        {{ dt.title }}
                                    </router-link>
                                    <span class="txt-site txt-11 txt-main">was watched by</span>
									<router-link 
                                        class="txt-site txt-11 txt-main txt-bold txt-main-hover"
                                        :to="{name: 'user', params: {username: dt.username}}">
                                        {{ dt.name }}
									</router-link>
								</div>
								<div class="desc date">
									{{ dt.created | moment("from", "now") }}
								</div>
							</div>
						</div>
                        <div class="notif-rig">
                            <router-link 
                                :to="{
                                    name: 'visit-canvas', 
                                    params: {
                                        username: dt.username, 
                                        idcanvas: dt.idcanvas
                                    }
                                }">
                                <button class="btn btn-grey2-color">
                                    Visit
                                </button>
                            </router-link>
                        </div>
					</div>
                </div>
                
                <div v-if="dt.type == 'bookmark'">
                    <div class="frame-notif grid-3x">
						<div class="notif-sid">
                            <router-link :to="{name: 'visit-post', params: {idbookmark: dt.idbookmark}}">
                                <div 
                                    class="image image-45px image-radius" 
                                    :style="{
                                        'background-image': 'url('+urlThumbnailStory+dt.images+')',
                                    }" ></div>
                            </router-link>
						</div>
						<div class="notif-mid">
							<div class="ntf-mid">
								<div class="desc">
                                    <span class="txt-site txt-11 txt-main">Your design from </span>
                                    <router-link 
                                        class="txt-site txt-11 txt-main txt-bold txt-main-hover"
                                        :to="{
                                            name: 'visit-canvas', 
                                            params: {
                                                username: dt.username, 
                                                idcanvas: dt.idcanvas
                                            }
                                        }">
                                        {{ dt.title }}
                                    </router-link>
                                    <span class="txt-site txt-11 txt-main">was saved by</span>
									<router-link 
                                        class="txt-site txt-11 txt-main txt-bold txt-main-hover"
                                        :to="{name: 'user', params: {username: dt.username}}">
                                        {{ dt.name }}
									</router-link>
								</div>
								<div class="desc date">
									{{ dt.created | moment("from", "now") }}
								</div>
							</div>
						</div>
                        <div class="notif-rig">
                            <router-link :to="{name: 'visit-post', params: {idbookmark: dt.idbookmark}}">
                                <button class="btn btn-main2-color btn-circle">
                                    <span class="fas fa-lg fa-bookmark"></span>
                                </button>
                            </router-link>
                        </div>
					</div>
                </div>

                <!-- <div v-if="dt.type == 'likes'">
                    <div class="frame-notif grid-3x">
						<div class="notif-sid">
                            <router-link :to="{name: 'user', params: {username: dt.username}}">
								<div 
                                    class="image image-45px image-circle" 
                                    :style="{'background-image': 'url('+urlThumbnailProfile+dt.foto+')'}" ></div>
							</router-link>
						</div>
						<div class="notif-mid">
							<div class="ntf-mid">
								<div class="desc">
									<strong class="txt-site txt-11 txt-primary txt-bold">
									    <router-link :to="{name: 'user', params: {username: dt.username}}">
                                            {{ dt.name }}
									    </router-link>
                                    </strong>
									<span>
                                        <span class="txt-site txt-11 txt-primary">
                                            Liked your design
                                        </span>
                                    </span>
								</div>
								<div class="desc date">
									{{ dt.created | moment("from", "now") }}
								</div>
							</div>
						</div>
                        <div class="notif-rig">
                            <router-link :to="{path: '/'+dt.username+'/canvas/'+dt.idcanvas+'/design/'+dt.idimages}">
                                <div 
                                    class="image image-45px image-radius" 
                                    :style="{
                                        'background-image': 'url('+urlThumbnailStory+dt.images+')',
                                        'float': 'right',
                                    }" ></div>
                            </router-link>
                        </div>
					</div>
                </div> -->

                <div v-if="dt.type == 'comment'">
                    <div class="frame-notif grid-3x">
						<div class="notif-sid">
                            <router-link :to="{name: 'user', params: {username: dt.username}}">
								<div 
                                    class="image image-45px image-circle" 
                                    :style="{'background-image': 'url('+urlThumbnailProfile+dt.foto+')'}" ></div>
							</router-link>
						</div>
						<div class="notif-mid">
							<div class="ntf-mid">
								<div class="desc">
									<router-link 
                                        class="txt-site txt-11 txt-main txt-bold txt-main-hover"
                                        :to="{name: 'user', params: {username: dt.username}}">
                                        {{ dt.name }}
									</router-link>
									<span>
                                        <span class="txt-site txt-11 txt-main">
                                            send a response on your design
                                        </span>
                                    </span>
								</div>
                                <div class="padding-5px">
                                    <span class="txt-site txt-11 txt-main txt-bold">"{{ dt.description }}"</span>
                                </div>
								<div class="desc date">
									{{ dt.created | moment("from", "now") }}
								</div>
							</div>
						</div>
                        <div class="notif-rig">
                            <router-link :to="{name: 'visit-post', params: {idbookmark: dt.idbookmark}}">
                                <div 
                                    class="image image-45px image-radius" 
                                    :style="{
                                        'background-image': 'url('+urlThumbnailStory+dt.images+')',
                                        'float': 'right',
                                    }" ></div>
                            </router-link>
                        </div>
					</div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';
export default {
    props: ['url'],
    data () {
        return {
            loading: false,
            emptyNotif: false,
            placeNotif: false,
            messageNotif: '',
            notifs: [],
        }
    },
    created: function () {
        this.fetchDataNotif();
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        fetchDataNotif: function () {
            var vm = this;
            this.loading = true;
            this.emptyNotif = false;
            this.placeNotif = false;
            axios.get(this.url)
            .then(response => {
                this.loading = false;
                if (response.data.notif && response.data.notif.length) {
                    this.emptyNotif = false;
                    this.placeNotif = true;
                    vm.notifs = response.data.notif;
                } else {
                    vm.emptyNotif = true;
                    vm.messageNotif = 'Notifications Empty';
                }
            })
            .catch(e => {
                vm.loading = false;
                vm.emptyNotif = true;
                if (e.response.responseText) {
                    vm.messageNotif = e.response.responseText;
                } else {
                    vm.messageNotif = e.response.statusText;
                }
                console.log(e.response);
                
            });
        }
    }
}
</script>
