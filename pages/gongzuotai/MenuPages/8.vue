<template>
	<view class="div-device">
		<view class="div-search ">
			<input v-model="searchText" @change="getEquiInfoList" placeholder="搜索" />
		</view>
		<view class="device-list">
			<view class="list-left">
				<view class="device-item" @click="goDetail(device)" v-for="(device,index) of deviceData" v-if="index%2==0" :key="index">
					<view>
						<image mode="widthFix" :src="device.banner?(cosIp+device.banner):'/static/img/device/noneimg.png'"></image>
					</view>
					<text>{{device.name}}</text>
				</view>
			</view>
			<view class="list-right">
				<view class="device-item" @click="goDetail(device)" v-for="(device,index) of deviceData" v-if="index%2==1" :key="index">
					<view>
						<image mode="widthFix" :src="device.banner?(cosIp+device.banner):'/static/img/device/noneimg.png'"></image>
					</view>
					<text>{{device.name}}</text>
				</view>
			</view>
			<myTipsLayer ref="anRef" timer="3" :type="msgType">
				<text>{{message}}</text>
			</myTipsLayer>
		</view>
	</view>
</template>

<script>
	import mSearch from '@/components/my-search/search.vue';
	export default {
		data() {
			return {
				searchText: '',
				message: '',
				cosIp: this.$manjs.cosIp + '/',
				msgType: 'warn',
				deviceData: []
			}
		},
		methods: {
			//跳转到详情页面
			goDetail(device) {
				uni.navigateTo({
					url: `/pages/gongzuotai/MenuPages/deviceDetail/deviceDetail?id=${device.id}&name=${device.name}`
				});
			},
			/**
			 * 获取设备列表
			 */
			getEquiInfoList() {
				let url = "/xlapi/CameraManage/EquiManage/EquiBase/GetEquiInfoList";
				this.$axios({
					method: "POST",
					data: {
						page: 1,
						size: 10000,
						typeid: 0,
						like: this.searchText
					},
					url: url,
					success(res) {
						if (res.statusCode == 200) {
							this.deviceData = res.data;
						} else {
							this.message = '查询失败';
							this.msgType = 'error';
							this.$refs.anRef.show();
						}
					},
					error(err) {
						this.message = '查询失败';
						this.msgType = 'error';
						this.$refs.anRef.show();
					}
				});
			},
		},
		components: {
			mSearch
		},
		onLoad() {
			uni.hideShareMenu(); //隐藏分享按钮
		},
		onShow() {
			this.getEquiInfoList();
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

	.div-search {
		width: 100%;
		height: 70upx;
		background: #F8F8F8;
		text-align: center;
		font-size: 26upx;
		line-height: 70upx;
		border-radius: 35upx;
	}

	.div-search input {
		height: 70upx;
		background: #F8F8F8;
		text-align: center;
		font-size: 26upx;
		line-height: 70upx;
		border-radius: 35upx;
		color: #222222;
	}

	.div-search input::-webkit-input-placeholder {
		color: #BBBBBB;
	}

	.device-list {
		width: 606upx;
		display: flex;
		margin: auto;
		margin-top: 50upx;
		justify-content: space-between;
	}

	.device-item {
		width: 270upx;
		text-align: center;
		;
	}


	.device-item view {
		width: 100%;
		height: auto;
		background: #FFFFFF;
		border-radius: 10px;
	}

	.device-item image {
		max-width: 270upx;
	}

	.device-item text {
		font-size: 26upx;
		display: inline-block;
		width: 270upx;
		color: #222222;
		font-weight: bold;
		line-height: 70upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
