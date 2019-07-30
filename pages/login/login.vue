<template>
	<view class="loginBox">
		<view class="logo-box"></view>
		<view class="login-box">
			<view class="inputBox userBox">
				<view class="left-icon user-icon"></view>
				<input type="text" cursor-spacing='80px' v-model="loginNewsObj.userName" placeholder="账号" placeholder-style="color:#CCC;">
			</view>
			<view class="inputBox pwdBox">
				<view class="left-icon pwd-icon"></view>
				<input type="password" cursor-spacing='80px' v-model="loginNewsObj.passWord" placeholder="密码" placeholder-style="color:#CCC;">
			</view>
			<view class="msg">{{errMsg}}</view>
		</view>
		<view class="login-btn">
			<button @click="login">确定</button>
		</view>

		<!-- 加载器 -->
		<uni-load-more status="loading" :show-icon='isShowListLoading' content-text=''></uni-load-more>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowListLoading: false,
				errMsg: '',
				loginNewsObj: {
					userName: '',
					passWord: ''
				},
				/* 分享意向表 */
				shareObj: {
					share: false,
					orderId: '',
					url: '',
				},
				/* 分享订单列表 */
				shareOrderObj: {
					url: ''
				},
				/* 分享状态状态 */
				shareOrderStateObj: {
					orderId: '',
					orderType: '',
					url: ''
				},
				/* 分享类型 */
				shareType: '',
			}
		},
		methods: {

			login() {
				let that = this;
				if (this.loginNewsObj.userName == '') {
					this.errMsg = '请输入账号！';
					return false;
				} else if (this.loginNewsObj.passWord == '') {
					this.errMsg = '请输入密码！';
					return false;
				}
				this.isShowListLoading = true;
				let url = this.$manjs.loginApi + '/xlapi/CameraManage/CameraUserInfoManage/UserLogin/UserLoginCamera';
				let data = {
					Account: this.loginNewsObj.userName,
					PassWord: this.loginNewsObj.passWord,
					OpenId: this.$store.state.openid
				};
				uni.request({
					url: url,
					method: 'POST',
					data: data,
					success: (res) => {
						// console.log(res.data);
						if (res.data.status) {
							that.$manjs.cosIp = res.data.CosIp;
							uni.setStorage({
								key: 'cosIp',
								data: res.data.CosIp
							})
							uni.setStorage({
								key: 'userInfo',
								data: res.data.data.AuthorizationStr,
								success() {
									// 配置config
									that.$config().then(res => {
										that.$store.state.config = res.data.data
									})
									if (that.shareType=='yixiangbiao') { //是分享的页面就跳转分享的页面
										let redirectToUrl = that.shareObj.url + '?orderId=' + that.shareObj.orderId
										uni.redirectTo({
											url: redirectToUrl
										});
									}
									//  else if (that.shareType == 'orderList') { //是分享的订单首页
									// 	/* 成功后跳转首页 */
									// 	uni.switchTab({
									// 		url: that.shareOrderObj.url /* '/pages/dingdan/index' */
									// 	});
									// } 
									else if (that.shareType == 'orderState') {
										let url = that.shareOrderStateObj.url + '?orderId=' + that.shareOrderStateObj.orderId + '&orderType=' +
											that.shareOrderStateObj.orderType
										uni.redirectTo({
											url: url
										});
									} else { //不是分享的页面就正常跳转
										/* 成功后跳转首页 */
										uni.switchTab({
											url: '/pages/dingdan/index'
										});
									}
									that.isShowListLoading = false;
								}
							});
							for (var key in res.data.data.Authorization) {
								uni.setStorage({
									key: key,
									data: res.data.data.Authorization[key],
									success() {}
								});
							}
						} else {
							that.isShowListLoading = false;
							this.errMsg = res.data.msg + '!';
							return false;
						}
					}
				});
			},
		},
		onLoad(options) {
			if (options.type == 'yixiangbiao') {
				this.shareType = options.type;
				this.shareObj.orderId = options.orderId;
				this.shareObj.url = options.url;
			} else if (options.type == 'orderList') {
				this.shareType = options.type;
				this.shareOrderObj.url = options.url;
			} else if (options.type == 'orderState') {
				this.shareType = options.type;
				this.shareOrderStateObj.orderId = options.orderId;
				this.shareOrderStateObj.orderType = options.orderType;
				this.shareOrderStateObj.url = options.url;
				this.shareType = options.type;
			}
		},
		onShow() {
			
		},
		watch: {
			loginNewsObj: {
				deep: true,
				handler(val) {
					this.errMsg = '';
				}
			}
		}
	}
</script>

<style scoped>
	.loginBox {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: url('http://xilai99.com/camerashootingWXIMG/login.png') no-repeat center center;
		background-size: cover;
	}

	.loginBox {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.loginBox .logo-box {
		width: 354upx;
		height: 354upx;
		background: url('http://xilai99.com/camerashootingWXIMG/hongniu-logo.png') no-repeat center center;
		background-size: 100%, 100%;
	}

	.loginBox .login-box {
		margin: 95rpx 0 200rpx;
		position: relative;
	}

	.msg {
		color: #ff0000;
		font-size: 28upx;
		position: absolute;
		bottom: -90upx;
	}

	.loginBox .login-box .inputBox {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 470upx;
	}

	.loginBox .login-box .inputBox.userBox {
		margin-bottom: 50upx;
	}

	.loginBox .login-box .inputBox {
		border-bottom: 1upx solid #fff;
	}

	.loginBox .login-box .inputBox input {
		margin-left: 35upx;
		font-size: 30upx;
		color: #FFF;
		padding: 20upx 0;
	}

	.loginBox .login-box .left-icon {
		width: 40upx;
		height: 40upx;
	}

	.loginBox .login-box .user-icon {
		background: url('../../static/img/login/user-icon.png') no-repeat center center;
		background-size: 100% 100%;
	}

	.loginBox .login-box .pwd-icon {
		background: url('../../static/img/login/pwd-icon.png') no-repeat center center;
		background-size: 100% 100%;
	}

	.loginBox .login-btn button {
		width: 470upx;
		height: 100upx;
		line-height: 100upx;
		background: rgba(49, 150, 250, 1);
		color: #fff;
		font-size: 33upx;
		border-radius: 50upx;
	}
</style>
