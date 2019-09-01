<template>
    <div>
        <div class="app-panel">
            <div class="sc-header">
                <div class="sc-place no-pad">
                    <div class="sc-grid sc-grid-3x" style="height: 45px;">
                        <div class="sc-col-1">
                        <button 
                            class="btn btn-grey2-color btn-circle" 
                            @click="$goBack()">
                            <span class="fa fa-lg fa-chevron-left"></span>
                        </button>
                        </div>
                        <div class="sc-col-2">
                            <h3 class="ttl-head ttl-sekunder-color">
                                Settings
                            </h3>
                        </div>
                        <div class="sc-col-3 txt-right"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-2">
            <div class="big-menu">
                <div class="txt-site txt-10 txt-thin txt-primary">Setting</div>
                <ul>
                    <router-link :to="{name: 'setting-basic'}">
                        <li>
                            <div class="ed-1 txt-site txt-11 txt-main txt-bold">
                                Basic Informations
                            </div>
                            <div class="ed-2"></div>
                        </li>
                    </router-link>
                    <router-link :to="{name: 'setting-profile'}">
                        <li>
                            <div class="ed-1 txt-site txt-11 txt-main txt-bold">
                                Profile
                            </div>
                            <div class="ed-2"></div>
                        </li>
                    </router-link>
                    <router-link :to="{name: 'setting-password'}">
                        <li>
                            <div class="ed-1 txt-site txt-11 txt-main txt-bold">
                                Change Password
                            </div>
                            <div class="ed-2"></div>
                        </li>
                    </router-link>
                </ul>
            </div>
            <div class="big-menu">
                <div class="txt-site txt-10 txt-thin txt-primary">Others</div>
                <ul>
                    <li @click="$openMessageOk('Under constructions')">
                        <div class="ed-1 txt-site txt-11 txt-danger txt-bold">
                            Delete this Account
                        </div>
                        <div class="ed-2"></div>
                    </li>
                    <li @click="$logOut()">
                        <div class="ed-1 txt-site txt-11 txt-safe txt-bold">
                            Logout
                        </div>
                        <div class="ed-2"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
