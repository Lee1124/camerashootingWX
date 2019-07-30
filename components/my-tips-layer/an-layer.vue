<template>
	<view>
		<view v-show="zShow" class="an-layer">

		</view>
		<view ref="popRef" class="an-message" :style="_location">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'an-layer',
		model: {
			prop: "showPop",
			event: "change"
		},
		props: {
			showPop: {
				type: Boolean,
				default: false, //是否显示遮盖层
			},
			direction: {
				type: String,
				default: 'top' // 弹出方向  top，bottom，left，right 
			},
			autoClose: {
				type: Boolean,
				default: true //是否自动关闭
			},
			time: {
				type: Number,
				default: 2 //如果为自动关闭，可以设置多少秒后自动关闭，秒数定义
			},
			type: {
				type: String,
				default: 'info' //提示类型，对应着提示的颜色 info:#2d8cf0 success: #19be6b warn: #ff9900 error: #ed3f14
			}
		},
		data() {
			return {
				zShow: false, // 是否展示,
				translateValue: '-100%', // 位移距离
				site: 0,
				bgColor: {
					info: '#2d8cf0',
					success: '#19be6b',
					warn: '#ff9900',
					error: '#ed3f14'
				},
				opacity: 0
			};
		},
		computed: {
			_translate() {
				const transformObj = {
					'top': 'transform:translateY(' + this.translateValue + ')',
					'bottom': 'transform:translateY(' + this.translateValue + ')',
					'left': 'transform:translateX(' + this.translateValue + ')',
					'right': 'transform:translateX(' + this.translateValue + ')'
				};
				return transformObj[this.direction]
			},
			_location() {
				const positionValue = {
					'bottom': 'bottom:0px;width:100%;background-color:' + this.bgColor[this.type] + ';opacity:' + this.opacity + ';',
					'top': 'top:0px;width:100%;background-color:' + this.bgColor[this.type] + ';opacity:' + this.opacity + ';',
					'right': 'right:0px;top:0;height:100%;color:#000;padding: 20upx;opacity:' + this.opacity + ';',
					'left': 'left:0px;top:0;height:100%;color:#000;padding: 20upx;opacity:' + this.opacity + ';'
				};
				return positionValue[this.direction] + this._translate;
			}
		},
		methods: {
			show() {
				this.opacity = 1;
				this.translateValue = '0';
				if (this.showPop) {
					this.zShow = true;
				}
				let that = this;
				setTimeout(function() {
					that.opacity = 0;
					that.translateValue = '-100%';
					if (that.showPop) {
						that.zShow = false;
					}
				}, that.time * 1000)
			},
			close() {
				this.zShow = false;
				this.msgShow = false;
			}
		}
	}
</script>

<style lang="scss">
	.an-layer {
		position: fixed;
		z-index: 99999999;
		background: rgba(0, 0, 0, .3);
		height: 100%;
		width: 100%;
		top: 0px;
		left: 0px;
		overflow: hidden;
	}

	.an-message {
		position: fixed;
		z-index: 1000000;
		background: #FFFFFF;
		transition: all .4s ease-in-out;
		overflow: hidden;
		font-size: 14px;
		text-align: center;
		color: #FFFFFF;
		height: 60upx;
		line-height: 60upx;
		width: 100%;
		left: 0;
		font-size: 28upx
	}
</style>
