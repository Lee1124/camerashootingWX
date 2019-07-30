<!-- 输入框  支持返回数据后搜索选择(一次性将数据返回完，支持筛选) -->
<template>
	<view class="myInputSearch">
		<input type="text" v-model="inputSearch2Text" placeholder-style='color:#BBB' :placeholder="myInputSearch2Obj.myIputPlaceholder"
		 @focus.stop="inputFocus" @click.stop="inputFocus" @input="inputFocus">
		<view style="position: relative;">
			<view class="list-show commonScrollStyle" v-show="myInputSearch2Obj.isShowListBox">
				<uni-load-more status="loading" :show-icon='myInputSearch2Obj.showLoading' content-text=''></uni-load-more>
				<!-- <view class="title title0">没有合适的酒店？ <text class="add-btn">立即创建</text> </view> -->
				<template v-for="(items,index) in myInputSearch2Obj.listData">
					<view class="title" :key='index' @click.stop="choiceThis(items)" :class="{selectedName:items.isSelected}">{{items.name}}</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputSearch2Text: '',
				choiceObj: {},
			};
		},
		props: ['myInputSearch2Obj'],
		methods: {
			/* 获取焦点 */
			inputFocus() {
				this.$emit('inputSearch2Focus', {
					val: this.inputSearch2Text,
					type: 'inputFocus'
				});
				if (this.inputSearch2Text == '') {
					this.$emit('choiceThis', {
						itemObj: {}
					});
				}
				if(this.inputSearch2Text!=this.choiceObj.name&&this.choiceObj.name!=''){
					this.$emit('choiceThis', {
						itemObj: {},
						flag:false
					});
				}
			},
			/* 选择当前 */
			choiceThis(itemObj) {
				this.inputSearch2Text = itemObj.name;
				this.choiceObj = itemObj;
				this.$emit('choiceThis', {
					itemObj: this.choiceObj,
					flag: true
				});
			}
		},
		watch: {
			inputSearch2Text(val) {
			
			}
		}
	}
</script>

<style scoped>
	.myInputSearch {
		height: 100%;
	}

	.myInputSearch input {
		width: 100%;
		height: 100%;
		color: #222;
		font-size: 26upx;
	}

	.myInputSearch input::-webkit-input-placeholder {
		color: #BBB;
	}

	.list-show {
		max-height: 300upx;
		overflow: auto;
		font-size: 26upx;
		padding: 35upx;
		box-sizing: border-box;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 9px 16px 0px rgba(0, 0, 0, 0.2);
		border-bottom-left-radius: 5upx;
		border-bottom-right-radius: 5upx;
		position: absolute;
		top: 2upx;
		left: 0;
		z-index: 88;
		width: 100%;
		border: 1px solid rgba(49, 150, 250, 1);
		border-top: 0;
	}

	.list-show .title {
		height: 60rpx;
		line-height: 60rpx;
		color: #222222;
	}

	.list-show .title .add-btn {
		text-decoration: underline;
		color: #3196FA;
	}

	.list-show .selectedName {
		color: #3196FA;
	}
</style>
