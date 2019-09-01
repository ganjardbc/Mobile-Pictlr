<template>
    <div>
        <div v-if="loading">
            <frame-loading></frame-loading>
        </div>

        <div v-if="emptyTopic">
            <div class="frame-empty">
                <div class="icn fa fa-lg fa-thermometer-empty btn-main-color"></div>
                <div class="ttl padding-15px">Topics Empty</div>
            </div>
        </div>

        <div v-if="placeTopic">
            <masonry 
                :cols="{default: 5, 1000: 4, 800: 3, 540: 2, 340: 1}"
                :gutter="{default: 0, 1000: 0, 340: 0}">
                <div v-for="tag in topics">
                    <router-link 
                        :to="{
                            name: 'view-tags', 
                            params: {
                                ctr: tag.tag.toLowerCase().replace(/ /g, '+')
                            }
                        }">
                        <div class="frame-topic-big">
                            <div 
                                class="bg-cover"
                                :style="{
                                    'background-image': 'url('+urlThumbnailStory+tag.images+')'
                                }">
                                <div class="bg-black"></div>
                            </div>
                            <div class="topic-title">
                                <div class="txt-site txt-12 txt-bold txt-white">
                                    {{ tag.tag }}
                                </div>
                            </div>
                        </div>
                    </router-link>
                </div>
            </masonry>
        </div>

    </div>
</template>
<script>
import FrameLoading from '../main/FrameLoading';
export default {
    props: ['msg', 'url'],
    data () {
        return {
            loading: false,
            emptyTopic: false,
            placeTopic: false,
            topics: [],
        }
    },
    created: function () {
        this.fetchTopic();
    },
    components: {
        'frame-loading': FrameLoading,
    },
    methods: {
        fetchTopic () {
            this.loading = true;
            axios.get(this.url)
            .then(response => {
                this.loading = false;
                if (response.data.tags && response.data.tags.length) {
                    this.placeTopic = true;
                    this.topics = response.data.tags;
                } else {
                    this.placeTopic = true;
                    this.emptyTopic = true;
                }
            })
            .catch(e => {
                this.placeTopic = true;
                this.loading = false;
                console.log(e);
            })
        }
    }
}
</script>
