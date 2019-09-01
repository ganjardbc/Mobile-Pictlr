<template>
    <div>
        <div class="frame-popup frame-message" id="message-ok">
            <ul class="menu-list">
                <li class="ml-list head-2">Message</li>
                <li class="ml-list msg bdr-bottom">
                    <div class="ctn-main-font ctn-thin ctn-16px ctn-sek-color ctn-center" id="msg">
                        This is message
                    </div>
                </li>
                <li class="ml-list sekunder bdr-bottom ml-ch" @click="$hideMessage()">
                    Ok
                </li>
            </ul>
        </div>
    </div>
</template>
