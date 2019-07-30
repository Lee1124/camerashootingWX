<!-- 金额 -->
<template>
	<view class="price order4News">
		<!-- 头部 -->
		<view class="my-header">
			<view class="header-title">金额</view>
			<!-- <view class="header-edit">
				<text class="edit-icon"></text>
				<text class="edit-text">编辑</text>
			</view> -->
		</view>
		<!-- /头部 -->
		<!-- 内容区 -->
		<view class="content">
			<view class="price-top">
				<view class="price1andprice2">
					<view class="price1 priceBox">
						<text class="label">合同金额：</text>
						<text class="ct1">{{orderPriceObj.amout}}</text>
					</view>
					<view class="price2 priceBox">
						<text class="label">已交金额：</text>
						<text class="ct1">{{orderPriceObj.Payment}}</text>
					</view>
				</view>
				<view class="price3 priceBox">
					<text class="label">未交金额：</text>
					<text class="ct1" style="color: #FF0000;">{{noPayPrice}}</text>
				</view>
			</view>

			<view class="price-bottom">
				<view class="price-bottom-header">
					<view class="label">【金额明细】</view>
					<view class="label" style="color: #3196FA;" @click="addPrice">＋添加金额</view>
				</view>
				<view class="price-bottom-list">
					<template v-for="(items,index) in orderPriceObj.objlist">
						<view class="price-bottom-list-inner" :key='index'>
							<view class="price-bottom-list-inner-top">
								<view class="title">{{items.typename}}</view>
								<view class="state" style="color: #FF0000;" v-if="items.satename=='待审核'">{{items.satename}} <text class="iconfont"
									 style="color: #CCCCCC;margin-left: 10upx;">&#xe64a;</text></view>
								<view class="state" style="color: #00B30D;" v-if="items.satename=='已审核'">已审核 <text>></text></view>
							</view>
							<view class="price-bottom-list-inner-bottom">
								<view class="price commonFont">
									<text class="price-name">金额：</text>
									<text class="price-text">{{items.amount}}</text>
								</view>
								<view class="personAndTime commonFont">
									<text class="person" style="margin-right: 5upx;">{{items.username}}</text>
									<text>{{items.addtime|addTimeStr}}</text>
								</view>
							</view>
						</view>
					</template>
				</view>
			</view>
		</view>
		<!-- /内容区 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: '', //订单ID
				orderType: '', //订单类型
				priceData: {
					price1: '10000.00',
					price2: '5000.00',
					data: [{
							name: '一期款',
							state: '待审核',
							price: '1000.00',
							person: '周杰伦',
							addTime: '2019.01.01'
						},
						{
							name: '二期款',
							state: '待审核',
							price: '1000.00',
							person: '周杰伦',
							addTime: '2019.01.01'
						}
					]
				},
				/*===订单金额===*/
				orderPriceObj: {
					amout: '', //合同金额
					Payment: '', //已支付金额
					objlist: [] //交款明细列表
				},
			}
		},
		methods: {
			/* 添加金额 */
			addPrice(){
				uni.navigateTo({
					url: '../addPrice/addPrice?type=add&&orderId=' + this.orderId
				});
			},
			/*根据订单获取订单金额*/
			getOrderPrice(orderId) {
				let url = '/xlapi/CameraManage/AmountManage/AmountOrder/showorderamount';
				let data = {
					strorderid: orderId
				};
				this.$axios({
					method: 'GET',
					url: url,
					data: data,
					success(res) {

						if (res.statusCode == 200) {
							this.orderPriceObj = res.data;
						}
					}
				})
			}
		},
		created() {
			this.orderId = this.$parent.orderId;
			this.orderType = this.$parent.orderType;
		},
		computed: {
			//未支付金额计算
			noPayPrice() {
				return this.orderPriceObj.amout - this.orderPriceObj.Payment
			},
		},
		filters: {
			addTimeStr(val) {
				return val.replace(/\//g, '.')
			}
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/fonts/iconfont.ttf');
	}

	.iconfont {
		font-family: iconfont;
	}

	.price-top {
		border-bottom: 1upx dashed #DDD;
		padding-bottom: 45upx;
	}

	.price1andprice2 {
		display: flex;
		justify-content: space-between;
		margin-bottom: 22upx;
	}

	.price-top .priceBox {
		display: flex;
		align-items: center;
	}

	.price-bottom {
		padding: 48upx 0;
	}

	.price-bottom-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.price-bottom-list-inner {
		width: 100%;
		height: 185upx;
		background: #F6F6F6;
		border-radius: 5upx;
		padding: 0 35upx;
		box-sizing: border-box;
		margin-top: 35upx;
	}

	.price-bottom-list-inner-top {
		border-bottom: 1upx solid #DDD;
	}

	.price-bottom-list-inner-top,
	.price-bottom-list-inner-bottom {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 50%;
	}

	.price-bottom-list-inner-top .title {
		font-size: 26upx;
		color: #666;
		font-weight: 700;
	}

	.price-bottom-list-inner-top .state {
		font-size: 22upx;
	}

	.price-bottom-list-inner-bottom {
		font-size: 24upx;
	}

	.price-bottom-list-inner-bottom .price {
		color: #666666;
	}

	.price-bottom-list-inner-bottom .price-text {
		font-weight: 700;
	}

	.price-bottom-list-inner-bottom .personAndTime {
		color: #999999;
	}
</style>
