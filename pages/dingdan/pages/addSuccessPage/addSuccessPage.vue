<template>
	<view class="addSuccess">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<!-- 提示文字区域 -->
		<view class="successTip">
			<view class="icon-box"></view>
			<text class="success-tip-text">订单添加成功</text>
		</view>
		<!-- /提示文字区域 -->
		<!-- 订单标题区域 -->
		<view class="order-title-box">
			<view class="order-title">
				{{orderTitle}}
			</view>
			<view class="order-type">
				(<span style='color: #FF0000;'>{{this.$store.state.orderIsFast|orderIsFastStr}}</span><span v-if='this.$store.state.orderIsFast'>-</span> {{orderTypeTitle}})
			</view>
		</view>
		<!-- /订单标题区域 -->
		<!-- 按钮 -->
		<button class="sendYXB" @click="yixiangbiao" v-if="orderType==1">发送意向表</button>
		<!-- /按钮 -->
		<!-- 返回订单列表按钮 -->
		<view class="returnList" @click="returnListPage">返回订单列表</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 订单id */
				orderId: '',
				/* 拍摄类型 */
				orderType: '',
				/* 标题 */
				orderTitle: '',
				/* 类型名 */
				orderTypeTitle: '',
			}
		},
		methods: {
			yixiangbiao(){
				if(this.orderType==1){
					uni.navigateTo({
						url: '../yixiangbiao/yixiangbiao?orderId=' + this.orderId
					});
				}
			},
			/* 返回列表 */
			returnListPage() {
				uni.switchTab({
					url: '/pages/dingdan/index'
				});
			},
			/*根据订单获取订单标题*/
			getOrderTitle() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderTitleByOrderId';
				let data = {
					OrderId: this.orderId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.orderTitle = res.data.data;
						}
					}
				})
			},
		},
		onLoad(option) {
			uni.hideShareMenu();//隐藏分享按钮
			this.orderId = option.orderId;
			this.orderType = option.orderType;
			this.orderTypeTitle = this.orderType == 1 ? '婚礼拍摄' : '活动拍摄';
			uni.setNavigationBarTitle({
				title: '添加订单-提示'
			});
		},
		onShow() {
			this.getOrderTitle();
		},
		filters:{
			orderIsFastStr(val){
				if(val){
					return '加急'
				}else {
					return ''
				}
			}
		},
		onReady() {

		},
		onHide() {

		},
		onUnload() {

		},
		onPullDownRefresh() {

		},
		onReachBottom() {

		},
		onShareAppMessage() {

		},
		onPageScroll() {

		},
	}
</script>

<style scoped>
	.successTip .icon-box {
		width: 102upx;
		height: 102upx;
		background: url('http://xilai99.com/camerashootingWXIMG/success-icon1.png') no-repeat center center;
		background-size: 100% 100%;
	}

	.successTip {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 115upx;
	}

	.successTip .success-tip-text {
		color: #222222;
		font-size: 38upx;
		font-weight: 700;
		margin-top: 50upx;
	}

	.order-title-box {
		color: #222222;
		font-size: 24upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 85upx;
	}

	.order-type {
		margin-top: 22upx;
	}

	button.sendYXB {
		width: 360upx;
		height: 90upx;
		line-height: 90upx;
		border: 1upx solid rgba(49, 150, 250, 1);
		border-radius: 45upx;
		color: #3196FA;
		font-size: 30upx;
		background: #fff;
		margin-top: 230upx;
	}

	.returnList {
		text-align: center;
		color: #999999;
		font-size: 24upx;
		text-decoration: underline;
		margin-top: 230upx;
	}
</style>
