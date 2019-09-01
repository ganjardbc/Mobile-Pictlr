<template>
    <div :class="frameLoad">
		<div class="btn btn-no-color btn-circle">
			<div class="icn fas fa-2x fa-spin fa-circle-notch"></div>
		</div>
	</div>
</template>
<script>
export default {
	props: ['post'],
	data () {
		return {
			frameLoad: 'frame-load-circle center',
		}
	},
	created: function () {
		if (this.post == 'center') {
			this.frameLoad = 'frame-load-circle center';
		} else {
			this.frameLoad = 'frame-load-circle';
		}
	}
}
</script>

