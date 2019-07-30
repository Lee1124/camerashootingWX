<template>
	<view class="device-detail">
		<view class="device-imgs">
			<swiper class="swiper" :indicator-dots="true" :autoplay="true">
				<swiper-item v-for="(devImg,index) of imgList" :key="index">
					<view class="device-item">
						<image mode="aspectFit" :src="devImg.isNone?devImg.filepath:cosIp+devImg.filepath"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<view class="device-info">
			<text class="device-name">{{curDevice.name}}</text>
			<view class="info-item">
				<text class="item-title">设备编号：</text>
				<text>{{curDevice.code}}</text>
			</view>
			<view class="info-item">
				<text class="item-title">设备类型：</text>
				<text>{{curDevice.equitypeName}}</text>
			</view>
			<view class="info-item">
				<text class="item-title">购买日期：</text>
				<text>{{curDevice.buytime}}</text>
			</view>
			<view class="info-item">
				<text class="item-title">使用价格：</text>
				<text>{{curDevice.useprice}}</text>
			</view>
			<view class="info-item">
				<text class="item-title">设备说明：</text>
				<text class="info-remark">{{curDevice.remark}}</text>
			</view>
		</view>
		<myTipsLayer ref="anRef" timer="3" :type="msgType">
			<text>{{msgType}}</text>
		</myTipsLayer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				curDevice: {},
				msgType: '',
				cosIp: this.$manjs.cosIp + '/',
				msgType: 'warn',
				imgList: []
			}
		},
		methods: {
			/**
			 * 获取设备图片集合
			 */
			getEquiImgs() {
				let url = "/xlapi/CameraManage/EquiManage/EquiBase/GetEquiImgs";
				this.$axios({
					method: "GET",
					data: {
						eid: this.curDevice.id
					},
					url: url,
					success(res) {
						if (res.statusCode == 200) {
							this.imgList = res.data;
							if (this.imgList.length == 0) {
								//暂无图片
								this.imgList.push({
									filepath: '/static/img/device/noneimg.png',
									isNone: true
								});
							}
						} else {
							this.message = '获取设备图片失败';
							this.msgType = 'error';
							this.$refs.anRef.show();
						}
					},
					error(err) {
						this.message = '获取设备图片失败';
						this.msgType = 'error';
						this.$refs.anRef.show();
					}
				});
			},
			/**
			 * 获取设备详情
			 */
			getEquiInfo() {
				let url = "/xlapi/CameraManage/EquiManage/EquiBase/GetEquiInfo";
				this.$axios({
					method: "GET",
					data: {
						id: this.curDevice.id
					},
					url: url,
					success(res) {
						if (res.statusCode == 200) {
							this.curDevice = res.data;
							this.curDevice.buytime = this.$manjs.getFormatTime(this.curDevice.buytime, ".");
						} else {
							this.message = '获取设备详情失败';
							this.msgType = 'error';
							this.$refs.anRef.show();
						}
					},
					error(err) {
						this.message = '获取设备详情失败';
						this.msgType = 'error';
						this.$refs.anRef.show();
					}
				});
			}

		},
		onLoad(options) {
			uni.hideShareMenu();//隐藏分享按钮
			this.curDevice.id = options.id;
			uni.setNavigationBarTitle({
				title: options.name
			});
		},
		onShow() {
			this.getEquiInfo();
			this.getEquiImgs();
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

		}
	}
</script>

<style>
	.div-device {
		width: 680upx;
		margin: auto;
	}

	.swiper {
		height: 428upx;
	}

	.device-item {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		border-radius: 10px;
	}

	.device-item image {
		max-height: 428upx;
	}


	.info-item text {
		display: inline-block;
		max-width: 520upx;
		color: #222222;
		font-size: 26upx;
		line-height: 65upx;
	}

	.info-item {
		line-height: 65upx;
		display: flex;
	}

	.info-remark {
		max-width: 520upx;
		word-break: keep-all;
		word-wrap: break-word;
	}

	.item-title {
		color: #999999 !important;
	}

	.device-info {
		width: 650upx;
		margin: auto;
	}


	.device-name {
		width: 100%;
		display: inline-block;
		text-align: left;
		font-size: 34upx;
		font-weight: bold;
		color: #222222;
		line-height: 96upx;
		max-width: 650upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
