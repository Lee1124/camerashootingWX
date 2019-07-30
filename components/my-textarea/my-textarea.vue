<template>
	<view class="my-textarea">
		<textarea :placeholder="myTextareaObj.textareaPlaceholder" style="width: 100%;" auto-height="true" ></textarea>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props:['myTextareaObj']
	}
</script>

<style scoped>
	.my-textarea textarea {
		color: #222;
		font-size: 26upx;
		width: 100%;
		line-height: 26upx;
		min-height: 32upx;
		height: auto;
	}

	.my-textarea textarea::-webkit-input-placeholder {
		color: #BBB;
	}
</style>
