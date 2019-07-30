<!-- 输入框  支持返回数据后搜索选择(非一次性将数据返回完，每次规定返20条信息，支持筛选) -->
<template>
	<view class="myInputSearch">
		<input type="text" v-model="inputSearch1Text" placeholder-style='color:#BBB' focus @blur="inputSearch1Bocus" :placeholder="myInputSearch1Obj.myIputPlaceholder" @focus.stop="inputFocus"
		 @click.stop="inputFocus">
		<view class="list-show-box" :class="{'list-show-box-top':myInputSearch1Obj.site=='top','list-show-box-bottom':myInputSearch1Obj.site=='bottom'}">
			<view class="list-show commonScrollStyle" v-show="myInputSearch1Obj.isShowListBox">
				<uni-load-more status="loading" :show-icon='myInputSearch1Obj.showLoading' content-text=''></uni-load-more>
				<view class="title title0" v-if="myInputSearch1Obj.isShowCreated">没有合适的{{myInputSearch1Obj.createName}}？ <text class="add-btn" @click.stop="createEvent">立即创建</text>
				</view>
				<template v-for="(items,index) in myInputSearch1Obj.listData">
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
				inputSearch1Text: '',
				choiceObj: {},
			};
		},
		props: ['myInputSearch1Obj'],
		methods: {
			/* 获取焦点 */
			inputFocus() {
				this.$emit('inputSearch1Focus', {
					val: this.inputSearch1Text
				});
			},
			// 失去焦点
			inputSearch1Bocus(){
				this.$emit('inputSearch1Bocus', {
					val: this.inputSearch1Text
				});
			},
			/* 选择当前 */
			choiceThis(itemObj) {
				this.inputSearch1Text = itemObj.name;
				this.choiceObj = itemObj;
				this.$emit('choiceThis', {
					itemObj: this.choiceObj,
					flag: true
				});
			},
			/* 创建 */
			createEvent() {
				this.$emit('createEvent')
			}
		},
		watch: {
			inputSearch1Text(val,b) {
				console.log(this.inputSearch1Text)
				this.$emit('inputSearch1Focus', {
					val: val,
					index:this.myInputSearch1Obj.index
				}); //通过该方法进行数据请求

				if (val == '') { /* ||val!=this.choiceObj.name */
					this.$emit('inputSearch1Focus', {
						val: val,
					});
				}
				if (val != this.choiceObj.name && this.choiceObj.name != '') {
					this.$emit('choiceThis', {
						itemObj: {},
						flag: false
					});
				}
			}
		}
	}
</script>

<style scoped>
	.myInputSearch {
		height: 100%;
		position: relative;
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

	.list-show-box {
		position: absolute;
		width: 100%;
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
		left: 0;
		z-index: 88;
		width: 100%;
		border: 1px solid rgba(49, 150, 250, 1);
		border-top: 0;
	}

	.list-show-box-top {
		top: -2upx;
	}

	.list-show-box-top .list-show {
		border: 1px solid rgba(49, 150, 250, 1);
		border-bottom: 0;
		bottom: -100%;
	}

	.list-show-box-bottom .list-show {
		top: 2upx;
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
