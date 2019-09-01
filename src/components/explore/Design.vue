<template>
    <div class="container">
        <frame-design :url="urlGetDesign"></frame-design>
    </div>
</template>
<script>
import FrameDesign from '../post/Card'

export default {
    data () {
        return {
            urlGetDesign: this.baseUrl+'/api/design/'+this.$route.name+'?token='+this.$cookie.get('jwt'),
        }
    },
    components: {
        'frame-design': FrameDesign,
    },
    created: function () {
        $('#explore-nav ul li').each(function () {
            $(this).removeClass('active');
        });
        $('#explore-nav ul .'+this.$route.params.ctr).addClass('active');
    }
}
</script>
