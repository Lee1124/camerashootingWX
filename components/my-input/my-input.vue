<template>
	<view class="myInput">
		<input :type="inputType" @blur='myInputBlur' :placeholder="myInputObj.myIputPlaceholder" placeholder-style='color:#BBB'
		 v-model="inputText">
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputText: '',
			};
		},
		methods: {
			myInputBlur() {
				this.$emit('myInputBlur')
			}
		},
		props: {
			myInputObj:{
				type:Object,
				default(){
					return {}
				}
			},
			inputType:{
				type:String,
				default(){
					return 'text'
				}
			}
		},
		watch: {
			inputText(val) {
				this.$emit('inputTextChange', val)
			}
		}
	}
</script>

<style>
	.myInput {
		height: 100%;
	}

	.myInput input {
		width: 100%;
		height: 100%;
		color: #222;
		font-size: 26upx;
	}

	.myInput input {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>
