<!-- 订单状态===有7步骤 -->
<template>
	<view class="orderOptionPage">
		<view class="tabChange">
			<template v-for="(items,index) in tabData">
				<view class="tabChange-name" :key='index' :class="{tabChangeNameSelected:items.isSelected}" @click="choiceThisTab(items)">{{items.name}}</view>
			</template>
		</view>
		<!-- 状态 -->
		<scroll-view scroll-y='true' class="orderStateBox" v-show="thisPage==1">
			<orderState></orderState>
		</scroll-view>
		<!-- /状态 -->

		<!-- 客户/基本信息/人员安排/金额 -->
		<view class="newsBox" v-show="thisPage==2">
			<scroll-view class="scrollBox" enable-back-to-top='true' scroll-with-animation='true' scroll-y='true'
			 :scroll-into-view='scrollIntoView'>
				<view class="newsList kehu">
					<view class="position-view" id="c2"></view>
					<kehu ref='keHu'></kehu>
				</view>
				<view class="newsList baseNews">
					<view class="position-view" id="c3"></view>
					<baseNews ref='baseNewsRef'></baseNews>
				</view>
				<view class="newsList person">
					<view class="position-view" id="c4"></view>
					<person ref='personRef'></person>
				</view>
				<view class="newsList price" v-show="IsCanUpdateAmountInfo">
					<view class="position-view" id="c5"></view>
					<price ref='priceRef'></price>
				</view>
				<view style="height: 200upx;"></view>
			</scroll-view>
		</view>
		<!-- /客户 -->

		<!-- 返回订单列表图标 -->
		<view class="returnList" @click="returnOrderList">首页</view>
		<!-- 提示框 -->
		<myTipsLayer ref="anRef" timer="3" :type="tipType">
			<text>{{message}}</text>
		</myTipsLayer>
	</view>
</template>

<script>
	import orderState from '../components/orderState.vue';
	import kehu from '../components/kehu.vue';
	import baseNews from '../components/baseNews.vue';
	import person from '../components/person.vue';
	import price from '../components/price.vue';
	export default {
		data() {
			return {
				IsCanUpdateBasicInfo: false,
				IsCanUpdateAmountInfo: false,
				message: '',
				tipType: '',
				/* 订单id */
				orderId: '',
				/* 订单类型 */
				orderType: '',
				/* 锚点定位 */
				scrollIntoView: '',
				thisPage: 1,
				tabData: [{
						name: '状态',
						isSelected: true,
						id: 1
					},
					{
						name: '客户',
						isSelected: false,
						id: 2
					},
					{
						name: '基本信息',
						isSelected: false,
						id: 3
					},
					{
						name: '人员',
						isSelected: false,
						id: 4
					},
					{
						name: '金额',
						isSelected: false,
						id: 5
					}
				]
			}
		},
		components: {
			orderState,
			kehu,
			baseNews,
			person,
			price
		},
		methods: {
			returnOrderList() {
				uni.switchTab({
					url: '/pages/dingdan/index'
				});
			},
			choiceThisTab(itemObj) {
				this.tabData.forEach(item => {
					item.isSelected = false;
				})
				itemObj.isSelected = true;
				this.scrollIntoView = itemObj.id;
				switch (itemObj.id) {
					// -1代表取消按钮
					case 1:
						this.thisPage = 1;
						this.scrollIntoView = '';
						break
					case 2:
						this.thisPage = 2;
						this.scrollIntoView = 'c2';
						this.$refs.keHu.isShowPhoneTip = true;
						break
					case 3:
						this.thisPage = 2;
						this.scrollIntoView = 'c3';
						break
					case 4:
						this.thisPage = 2;
						this.scrollIntoView = 'c4';
						break
					case 5:
						this.thisPage = 2;
						this.scrollIntoView = 'c5';
						break
				}
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
							uni.setNavigationBarTitle({
								title: res.data.data
							});
						}
					}
				})
			},
			/*判断用户是否有新增编辑基本信息修改金额权限*/
			getUserPower() {
				let url = '/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/GetBranchUserUpdateBasicInfoPermission';
				let data = {
					SearchUserId: this.$manjs.getkevalue().userid
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						// console.log(res)
						if (res.data.status) {
							this.IsCanUpdateBasicInfo = res.data.data.IsCanUpdateBasicInfo;
							this.IsCanUpdateAmountInfo = res.data.data.IsCanUpdateAmountInfo;
							if (!this.IsCanUpdateAmountInfo) {
								this.tabData.forEach((item, index, arr) => {
									if (item.id == 5) {
										this.tabData.splice(index, 1)
									}
								})
							}
							this.$refs.baseNewsRef.setPower(this.IsCanUpdateBasicInfo);
						}
					}
				})
			},
		},
		onLoad(options) {
			this.getUserPower();
			this.orderId = options.orderId;
			this.orderType = options.orderType;
		},
		onShow() {
			let backPageType = this.$store.state.backPageType;
			this.getOrderTitle();
			/* 请求客户数据 */
			this.$refs.keHu.getKeHuData(this.orderId);
			/* 请求基本信息数据 */
			this.$refs.baseNewsRef.getBaseInformation(this.orderId);
			/* 请求人员数据 */
			this.$refs.personRef.getPersonManageList(this.orderId);
			/* 请求金额数据 */
			this.$refs.priceRef.getOrderPrice(this.orderId);

			if (backPageType == 'addPrice') {
				this.message = '添加成功';
				this.tipType = 'success';
				this.$refs.anRef.show();
				this.$store.commit('keepBackPageType', '');
			} else if (backPageType == 'editBaseNews') {
				this.message = '编辑基本信息成功';
				this.tipType = 'success';
				this.$refs.anRef.show();
				this.$store.commit('keepBackPageType', '');
			} else if (backPageType == 'editKeHu') {
				this.message = '编辑客户信息成功';
				this.tipType = 'success';
				this.$refs.anRef.show();
				this.$store.commit('keepBackPageType', '');
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
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			let path = "/pages/login/validation/validation?shareOrderState=true&type=orderState&url=" + page.route + '&orderId=' +
				this.orderId + '&orderType=' + this.orderType;
			let imageUrl = "http://xilai99.com/camerashootingWXIMG/share.png"
			return {
				title: '订单状态及其他信息',
				path: path,
				imageUrl: imageUrl
			}
		},
		onPageScroll() {

		},
	}
</script>

<style scoped>
	.orderStateBox {
		position: absolute;
		top: 83upx;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.tabChange {
		width: 100%;
		height: 83upx;
		background: rgba(244, 244, 244, 1);
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #666666;
		font-size: 28upx;
		padding: 0 78upx;
		box-sizing: border-box;
	}

	.tabChangeNameSelected {
		color: #3196FA;
		position: relative;
	}

	.tabChangeNameSelected::before {
		content: '';
		width: 100%;
		height: 2upx;
		background: #3196FA;
		position: absolute;
		bottom: 0;
		left: 0;
	}

	.tabChange-name {
		height: 83upx;
		line-height: 83upx;
	}

	/* 列表 */

	.scrollBox {
		box-sizing: border-box;
		width: 100%;
		position: absolute;
		top: 83upx;
		bottom: 0;
	}

	.newsList.kehu {}

	.newsList {
		width: 630upx;
		height: auto;
		margin: 0 auto;
		margin-top: 47upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 0 21px 0 rgba(0, 0, 0, 0.14);
		border-radius: 10px;
		padding: 44upx 43upx;
		box-sizing: border-box;
		position: relative;
	}

	.position-view {
		position: absolute;
		top: -45upx;
		left: 0;
		right: 0;
		height: 47upx;
	}

	.returnList {
		width: 130rpx;
		height: 130rpx;
		line-height: 130rpx;
		text-align: center;
		position: fixed;
		z-index: 20191;
		bottom: 80rpx;
		right: 50rpx;
		border-radius: 50%;
		-webkit-box-shadow: 0 0 3rpx #000000;
		box-shadow: 0 0 20rpx #ccc;
		font-size: 30rpx;
		background: #fff;
		color: #444;

	}

	.returnList image {
		width: 100%;
		height: 100%;
	}
</style>
