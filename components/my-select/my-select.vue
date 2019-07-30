<template>
	<view class="my-select">
		<input type="text" :placeholder="mySelectObj.mySelectPlaceholder" placeholder-style='color:#BBB' @click="showSinglePicker" disabled="disabled"
		 v-model="pickerText" class="pickerText" style="height: 100%;">
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</view>
</template>

<script>
	import mpvuePicker from '../mp-vue-Picker/mpvuePicker.vue';
	export default {
		components: {
			mpvuePicker
		},
		data() {
			return {
				pickerSingleArray: [],
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#75BAFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray: []
			};
		},

		props: ['mySelectObj'],
		methods: {
			onConfirm(e) {
				this.pickerText = e.label;
				let resData = {
					label: e.label,
					value: e.value[0],
					otherValue:e.otherValue,
				}
				this.$emit('selectConfirm', resData)
			},
			// 单列
			showSinglePicker() {
				this.pickerValueArray = this.mySelectObj.array;
				this.$parent.isShowTextArea=false;
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show();
			},
		}
	}
</script>

<style scoped>
	.my-select {
		height: 100%;
	}

	.uni-input {
		color: #222;
		font-size: 26upx;
	}

	.pickerText::-webkit-input-placeholder {
		color: #BBB;
		font-size: 26upx;
		font-weight: 700;
	}
</style>
