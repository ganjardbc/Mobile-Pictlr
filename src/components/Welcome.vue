<template>
    <div class="welcome">
        <div class="w-top">
            <div class="w-col w-bg-1 w-col-1">
                <div class="w-info">
                    <div class="margin-10px">
                        <h1 class="txt-site txt-white txt-big txt-bold">
                            Built for Creators
                        </h1>
                    </div>
                    <div class="margin-10px">
                        <h1 class="txt-site txt-white txt-12 txt-thin">
                            What you can do?
                        </h1>
                    </div>
                    <ul>
                        <li>
                            <div class="icn fas fa-lg fa-image"></div>
                            <div class="ttl txt-site txt-white txt-11 txt-thin">
                                Post much images.
                            </div>
                        </li>
                        <li>
                            <div class="icn fas fa-lg fa-star"></div>
                            <div class="ttl txt-site txt-white txt-11 txt-thin">
                                Give a rates to posts.
                            </div>
                        </li>
                        <li>
                            <div class="icn fas fa-lg fa-comment-alt"></div>
                            <div class="ttl txt-site txt-white txt-11 txt-thin">
                                Commenting on a posts.
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="w-col w-col-2">
                <div class="w-info" style="text-align: center;">
                    <div class="w-cover">
                        <div class="image image-all">
                            <img src="@/assets/img/Pictlr/9.png">
                        </div>
                    </div>
                    <div class="margin-30px">
                        <p class="txt-site txt-13 txt-bold txt-main">
                            An virtual canvas.
                        </p>
                    </div>
                    <div>
                        <p class="txt-site txt-12 txt-thin txt-main">
                            Join pictlr today.
                        </p>
                    </div>
                    <div>
                        <router-link to="/login">
                            <button class="btn btn-sekunder-color btn-width-all margin-5px">
                                <span class="ttl-post">Login</span>
                            </button>
                        </router-link>
                        <router-link to="/register">
                            <button class="btn btn-main-color btn-width-all margin-5px">
                                <span class="ttl-post">Register</span>
                            </button>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-bot">
            <ul class="txt-site txt-11 txt-main txt-center">
                <li>
                    <router-link to="/trendings">Trendings</router-link>
                </li>
                <li>
                    <router-link to="/fresh">Fresh</router-link>
                </li>
                <li>
                    <router-link to="/populars">Populars</router-link>
                </li>
                <li>
                    <a href="#">About Us</a>
                </li>
                <li>
                    <a href="#">Privacy</a>
                </li>
                <li>
                    <a href="#">Terms</a>
                </li>
                <li>
                    <a href="#">Policy</a>
                </li>
                <li>
                    <a href="#">FAQ</a>
                </li>
                <li>
                    <a href="#">Jobs</a>
                </li>
                <li>
                    <a href="#">Help</a>
                </li>
            </ul>
        </div>
    </div>
</template>