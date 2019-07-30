<template>
	<view class="powerPage">
		<view class="user-header">
			<!-- <view class="img-box" :style="{background:'url('+userInfoObj.userHDUrl+')'}">
				
			</view> -->
			<view class="img-box">
				<open-data type="userAvatarUrl"></open-data>
			</view>
			<view class="user-name">
				<open-data type="userNickName"></open-data>
			</view>
		</view>
		<view class="power-tips">
			<view class="tip-title1">微信授权</view>
			<view class="tip-title2">获得您的公开信息（昵称、头像等）</view>
		</view>
		<view class="power-btn">
			<!-- <button open-type="getUserInfo">确定</button> -->
			<button open-type="getUserInfo" @getuserinfo="getuserinfo">确 定</button>
		</view>
		<!-- 加载器 -->
		<uni-load-more status="loading" :show-icon='isShowListLoading'></uni-load-more>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowListLoading: false,
				/* 获取的用户信息 */
				userInfoObj: {
					userHDUrl: '',
					userName: ''
				},
				/* 分享意向表 */
				shareObj: {
					orderId: '',
					url: '',
				},
				/* 分享状态列表 */
				shareOrderStateObj: {
					orderId: '',
					orderType: '',
					url: '',
				},
				/* 分享类型 */
				shareType: '',
			}
		},
		methods: {
			/* 保存微信用户基础数据 */
			confirmValidation(data) {
				let that = this;
				this.isShowListLoading = true;
				let url = this.$manjs.loginApi + '/xlapi/CameraManage/CameraMiniUserManage/CameraMiniUserInfo/SaveChatUserInfo';
				uni.request({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						that.isShowListLoading = false;
						console.log(res)
						/* 有授权但未登陆 */
						if(that.shareType == 'yixiangbiao'){
							let url = '/pages/login/login?type=yixiangbiao&url=' + that.shareObj.url +'&orderId=' + that.shareObj.orderId
							uni.redirectTo({
								url: url
							});
						}else if (that.shareType == 'orderState') {
							let url = '/pages/login/login?type=orderState&url=' + that.shareOrderStateObj.url +
								'&orderType=' + that.shareOrderStateObj.orderType + '&orderId=' + that.shareOrderStateObj.orderId
							uni.redirectTo({
								url: url
							});
						} else {
							uni.redirectTo({
								url: '/pages/login/login'
							});
						}

					}
				})
			},

			/* 获取用户信息到授权页面 */
			getuserinfo(res) {
				let resInfo = res.detail.userInfo
				/* WeChatIcon	是	string	微信头像地址
				NickName	是	string	微信昵称
				OpenId	是	string	openid
				WeChatGender	是	int	性别 1男 2女
				Location	是	string	地区 Sichuan-Chengdu */
				let data = {
					WeChatIcon: resInfo.avatarUrl,
					NickName: resInfo.nickName,
					OpenId: this.$store.state.openid,
					WeChatGender: resInfo.gender,
					Location: resInfo.province + '-' + resInfo.city,
				}
				this.confirmValidation(data);
			},
		},
		onLoad(options) {
			if (options.type == 'yixiangbiao') {
				this.shareType = options.type;
				this.shareObj.orderId=options.orderId;
				this.shareObj.url=options.url;
			} else if (options.type == 'orderState') {
				this.shareType = options.type;
				this.shareOrderStateObj.orderId = options.orderId;
				this.shareOrderStateObj.orderType = options.orderType;
				this.shareOrderStateObj.url = options.url;
			}
		},
		onShow() {

		}
	}
</script>

<style scoped>
	.powerPage {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.user-header {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.user-header .img-box {
		width: 140upx;
		height: 140upx;
		border-radius: 50%;
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover !important;
		text-align: center;
	}

	.user-header .img-box image {
		width: 100%;
		height: 100%;
	}

	.user-header .user-name {
		color: #000;
		font-size: 42upx;
		margin-top: 40upx;
		font-weight: 700;
		text-align: center;
	}

	.power-tips {
		margin: 150upx 0;
	}

	.power-tips .tip-title1 {
		color: #4c4c4c;
		font-size: 33upx;
	}

	.power-tips .tip-title2 {
		color: #808080;
		font-size: 25upx;
		margin-top: 20upx;
	}

	.power-btn button {
		width: 380upx;
		height: 100upx;
		background: rgba(49, 150, 250, 1);
		margin: 0;
		padding: 0;
		line-height: 100upx;
		text-align: center;
		color: #FFF;
		border-radius: 50upx;
	}
</style>
