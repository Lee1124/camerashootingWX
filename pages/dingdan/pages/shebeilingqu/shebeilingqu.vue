<template>
	<view class="shebeilingqu">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<view class="noData" v-if="isShowNoDataIcon">
			<image src="http://xilai99.com/camerashootingWXIMG/noData.png"></image>
			<view class="noDataText">暂无设备领取记录</view>
		</view>
		<scroll-view scroll-y class="scrollView" v-if="!isShowNoDataIcon">
			<view class="content-top">
				<view class="content-title">领取时间</view>
				<view class="content-top-list">
					<template v-for="(items,index) in contentTopList">
						<view :key='index' class="box">
							<text class="label">{{items.name}}</text>
							<text class="ct">{{items.ct}}</text>
						</view>
					</template>
				</view>
			</view>
			<view class="content-bottom">
				<view class="content-title">领取设备</view>
				<view class="content-bottom-list">
					<template v-for="(items,index) in contentBottomList">
						<view class="content-bottom-list-inner" :key='index'>
							<view class="title-name">
								{{items.equiName}}
								<text v-if="items.State==0" style="color: #ff0000;">（{{items.ToState}}）</text>
								<text v-if="items.State==1" style="color: #3196FA;">（{{items.ToState}}）</text>
								<text v-if="items.State==2" style="color: #3196FA;">（{{items.ToState}}）</text>
								<view class="time-icon" @click="openDetials(items)" :class="{iconDisplay:items.isDisplay}">
									<text class="text">日志</text>
									<text class="iconfont">&#xe784;</text>
								</view>
							</view>

							<view class="display-content-box" :class="{displayBox:items.isDisplay}">
								<template v-for="(items2,index2) in recordData">
									<view class="display-content-inner" :key='index2'>
										<view class="display-content-inner-01">{{items2.title}}</view>
										<view class="display-content-inner-02"></view>
										<view class="display-content-inner-03">
											<view class="name">{{items2.name}}</view>
											<view class="time">{{items2.time}}</view>
										</view>
									</view>
								</template>
							</view>
						</view>
					</template>
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowNoDataIcon: false,
				orderId: '',
				orderType: '',
				contentTopList: [{
						name: '领取时间：',
						ct: '2019.04.22',
						id: 1
					},
					{
						name: '归还时间：',
						ct: '2019.04.22',
						id: 2
					}
				],
				contentBottomList: [], //设备列表数据
				recordData: [{
						title: '申请',
						name: '',
						time: ''
					},
					{
						title: '领取',
						name: '',
						time: ''
					},
					{
						title: '归还',
						name: '',
						time: ''
					},
				] //设备日志
			}
		},
		methods: {
			/* 展开 */
			openDetials(itemObj) {
				itemObj.isDisplay = !itemObj.isDisplay
				let url = '/xlapi/CameraManage/EquiManage/EquiOrder/GetEquiOrderlibLogo';
				let data = {
					equilid: itemObj.Equid,
				};
				this.$axios({
					method: 'GET',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							if (res.data.data.applyname != '') {
								this.recordData.forEach(item => {
									if (item.title == '申请') {
										item.name = res.data.data.applyname;
										item.time = res.data.data.applytime;
									}
								})
							} else {
								this.recordData.forEach(item => {
									if (item.title == '申请') {
										item.name = '--';
										item.time = '--';
									}
								})
							}

							if (res.data.data.outuser != '') {
								this.recordData.forEach(item => {
									if (item.title == '领取') {
										item.name = res.data.data.outuser;
										item.time = res.data.data.outtime;
									}
								})
							} else {
								this.recordData.forEach(item => {
									if (item.title == '领取') {
										item.name = '--';
										item.time = '--';
									}
								})
							}
							if (res.data.data.retuser != '') {
								this.recordData.forEach(item => {
									if (item.title == '归还') {
										item.name = res.data.data.retuser;
										item.time = res.data.data.rettime;
									}
								})
							} else {
								this.recordData.forEach(item => {
									if (item.title == '归还') {
										item.name = '--';
										item.time = '--';
									}
								})
							}
						}
					}
				})
			},
			/*获取订单详情中的设备列表*/
			getOrderSheBeiList() {
				let url = '/xlapi/CameraManage/EquiManage/EquiOrder/GetEquiOrder';
				let data = {
					orderid: this.orderId,
					type: ''
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.Orderlibs.length == 0) {
							this.isShowNoDataIcon = true;
						} else {
							this.isShowNoDataIcon = false;
							this.contentTopList.forEach(item => {
								if (item.id == 1) {
									item.ct = res.data.Receivedate.split('T')[0].replace(/-/g, '.');
								} else if (item.id == 2) {
									item.ct = res.data.Returndate.split('T')[0].replace(/-/g, '.');
								}
							})

							res.data.Orderlibs.forEach(item => {
								item.isDisplay = false;
							})
							this.contentBottomList = res.data.Orderlibs;
						}
					}
				})
			}
		},
		onLoad(options) {
			uni.hideShareMenu();//隐藏分享按钮
			this.orderId = options.orderId;
			this.orderType = options.orderType;
			uni.setNavigationBarTitle({
				title: '设备领取'
			});
		},
		onShow() {
			this.getOrderSheBeiList();
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

	.scrollView {
		position: fixed;
		top: 2upx;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.content-top,
	.content-bottom {
		padding: 40upx 30upx;
		box-sizing: border-box;
	}

	.content-title {
		color: #3196FA;
		font-size: 28upx;
		font-weight: 700;
		position: relative;
		margin-left: 22upx;
		margin-bottom: 32upx;
	}

	.content-title::before {
		content: '';
		width: 6upx;
		height: 28upx;
		background: rgba(49, 150, 250, 1);
		position: absolute;
		left: -22upx;
		top: 50%;
		transform: translateY(-50%);
	}

	.content-top-list {
		background: rgba(249, 249, 249, 1);
		border: 1upx dashed rgba(204, 204, 204, 1);
		border-radius: 5upx;
		padding: 40upx 30upx;
		box-sizing: border-box;
		font-size: 28upx;
	}

	.content-top-list .label {
		color: #999999;
	}

	.content-top-list .ct {
		color: #222222;
	}

	.content-top-list .box {
		margin-bottom: 17upx;
	}

	.content-top-list .box:last-of-type {
		margin-bottom: 0;
	}

	.content-bottom-list-inner {
		padding: 34upx 40upx;
		box-sizing: border-box;
		background: #F9F9F9;
		border: 1upx dashed rgba(204, 204, 204, 1);
		margin-bottom: 20upx;

		/* display: flex;
		justify-content: space-between;
		align-items: center; */
	}

	.content-bottom-list-inner .title-name {
		color: #222222;
		font-size: 28upx;
		width: 100%;
		position: relative;
	}

	.content-bottom-list-inner .time-icon {
		font-size: 26upx;
		color: #999999;
		position: absolute;
		right: 0;
		top: 50%;
		transform: translateY(-50%);

	}

	.content-bottom-list-inner .time-icon .text {
		margin-right: 10upx;
	}

	.content-bottom-list-inner .time-icon .iconfont {
		transition: all .2s;
	}

	.iconDisplay {
		color: #3196FA !important;
	}

	.iconDisplay .iconfont {
		transform: rotate(180deg);
		display: inline-block;
	}

	.display-content-box {
		height: 0;
		overflow: hidden;
		opacity: 0;
		transition: all .2s;
	}

	.display-content-box.displayBox {
		height: auto;
		opacity: 1;
	}

	.display-content-box .display-content-inner {
		display: flex;
		padding: 20upx 40upx;
	}

	.display-content-box .display-content-inner .display-content-inner-01 {
		color: #999999;
		font-size: 24upx;
		margin-top: 5rpx;
	}

	.display-content-box .display-content-inner .display-content-inner-02 {
		width: 15upx;
		height: 15upx;
		background: rgba(187, 187, 187, 1);
		border-radius: 50%;
		margin: 12upx 16upx;
		position: relative;
	}

	.display-content-box .display-content-inner .display-content-inner-02::before {
		content: '';
		width: 2upx;
		height: 50upx;
		background: rgba(187, 187, 187, 1);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
		top: -25upx;
	}

	.display-content-box .display-content-inner .display-content-inner-02::after {
		content: '';
		width: 2upx;
		height: 120upx;
		background: rgba(187, 187, 187, 1);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		z-index: 99;
		top: 0;
	}

	.display-content-box .display-content-inner .display-content-inner-03 .name {
		color: #222222;
		font-size: 28upx;
		margin-bottom: 10upx;
	}

	.display-content-box .display-content-inner .display-content-inner-03 .time {
		color: #999999;
		font-size: 24upx;
	}

	.noData {
		margin-top: 300upx;
		text-align: center;
	}

	.noData image {
		width: 211upx;
		height: 186upx;
	}

	.noData .noDataText {
		color: #CFD5E1;
		font-size: 30upx;
		margin-top: 30upx;
	}
</style>
