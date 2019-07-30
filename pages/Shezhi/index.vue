<template>
	<view class="setting-main">
		<view class="user-info">
			<view class="info-left">
				<text class="user-name">{{userInfo.RealName}}</text>
				<text class="user-post">{{userInfo.DepartmentName}} · {{userInfo.DutyName}}</text>
				<text class="user-time">你已经在岗{{userInfo.workingTimeStr}}啦！</text>
			</view>
			<view class="info-right">
				<view @click="replaceImg">
					<image :src="userInfo.ImgSrc"></image>
					<text>点击更换</text>
				</view>
			</view>
		</view>
		<view class="user-spill">

		</view>
		<view class="user-form">
			<view class="form-item" @click="goReplacePhone">
				<text>更换手机</text>
				<view>
					<text class="edit-icon">{{userInfo.Phone}}</text>
					<text class="iconfont edit-icon">&#xe64a;</text>
				</view>
			</view>
			<view class="form-item" @click="goChangePswView">
				<text>更改密码</text>
				<text class="iconfont edit-icon">&#xe64a;</text>
			</view>
		</view>
		<view class="login-out">
			<text @click="removeLogin">注销登录</text>
		</view>
		<!--提示-->
		<myTipsLayer ref="anRef" timer="3" :type="msgType">
			<text>{{message}}</text>
		</myTipsLayer>
		<!-- 底部滑出 -->
		<myBottomSlideIn ref="as"></myBottomSlideIn>

		<!-- 模态框 -->
		<myModal :show="modalData.isShowModal" @close="cancel_modal" :title="modalData.modalTitle" @cancel="cancel_modal"
		 @confirm="confirm_modal">
			<view style="min-height: 90upx;padding: 32upx 24upx;text-align: center;line-height: 80upx;">
				您确定退出登录？
			</view>
		</myModal>
		<!-- /模态框 -->

	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					workingTimeStr: "0个月"
				},
				msgType: 'warn',
				message: '',
				modalData: {
					isShowModal: false,
					modalTitle: '提示',
				},
			}
		},
		methods: {
			cancel_modal() {
				this.modalData.isShowModal = false;
			},
			confirm_modal() {
				let that = this;
				let url = this.$manjs.loginApi + '/xlapi/CameraManage/CameraUserInfoManage/UserLogin/UserCancelLogin'
				let data = {
					OpenId: this.$store.state.openid
				}
				uni.request({
					url: url,
					method: 'POST',
					data: data,
					success: (res) => {
						that.modalData.isShowModal = false;
						// console.log(res)
					}
				})
				uni.removeStorage({
					key: 'userInfo',
					success(res) {
						uni.redirectTo({
							url: '/pages/login/login'
						});
					}
				});
			},
			/* 注销登录 */
			removeLogin() {
				this.modalData.isShowModal = true;
			},
			//选择头像图片
			replaceImg() {
				this.$refs.as.handleShow({
					actions: [{
							name: '拍照',
							color: '#444'
						},
						{
							name: '从手机相册选择',
							color: '#444'
						},

					],
					success: (res) => {
						switch (res.id) {
							// -1代表取消按钮
							case -1:
								// console.log(res)
								break
							case 0:
								{
									let that = this;
									uni.chooseImage({
										count: 1, //默认9
										sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
										sourceType: ['camera'], //拍照										
										success: function(res) {
											const tempFilePaths = res.tempFilePaths;
											that.$uploadTasks({
												files: res.tempFiles,
												key: "Camera/HeadImg",
												guid: true,
												callback(a, b) {
													let url = b.headers.Location.split('com')[1];
													if (url[0] == "/")
														url = url.substring(1, url.length)
													that.userInfo.ImgUrl = url;
													that.updateUserHeadImgUrl();
												}
											})
										}
									});
									break;
								}
							case 1:
								{
									let that = this;
									uni.chooseImage({
										count: 1, //默认9
										sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
										sourceType: ['album'], //从相册选择
										success: function(res) {
											const tempFilePaths = res.tempFilePaths;
											// console.log("file", tempFilePaths);
											that.$uploadTasks({
												files: res.tempFiles,
												key: "Camera/HeadImg",
												guid: true,
												callback(a, b) {
													let url = b.headers.Location.split('com')[1];
													if (url[0] == "/")
														url = url.substring(1, url.length);
													that.userInfo.ImgUrl = url;
													that.updateUserHeadImgUrl();
												}
											})
										}
									});
									break;
								}
						}
					}
				})

			},
			//进入密码修改页面
			goChangePswView() {
				uni.navigateTo({
					url: "/pages/Shezhi/changePassWord/changePassWord"
				});
			},
			//进入更换手机号码页面
			goReplacePhone() {
				uni.navigateTo({
					url: `/pages/Shezhi/replacePhone/replacePhone?phone=${this.userInfo.Phone}`
				});
			},
			//获取用户信息			 
			getMyUserInfoDetail() {
				let that = this;
				this.$axios({
					method: "POST",
					url: `/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/GetMyUserInfoDetail`,
					data: {
						UserId: this.$manjs.getkevalue().userid
					},
					success(res) {
						if (res.data.status) {
							this.userInfo = res.data.data;
							this.userInfo.ImgSrc = this.$manjs.cosIp + this.userInfo.ImgUrl;
							// console.log("cosIp", this.$manjs.cosIp);
							this.userInfo.AddTime = this.$manjs.getFormatTime(res.data.data.AddTime, ".");
							this.userInfo.workingTimeStr = '0个月'
							this.workingTime();
						}
					},
					error(err) {
						console.log(err);
					}
				});
			},
			/**
			 * 修改头像
			 */
			updateUserHeadImgUrl() {
				if (!this.userInfo.ImgUrl || this.userInfo.ImgUrl == "") {
					this.message = '请上传头像';
					this.msgType = 'warn';
					this.$refs.anRef.show();
					return;
				}
				this.$axios({
					method: "POST",
					url: `/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/UpdateUserHeadImgUrl`,
					data: {
						UserId: this.$manjs.getkevalue().userid,
						ImgUrl: this.userInfo.ImgUrl
					},
					success(res) {
						if (res.data.status) {
							this.getMyUserInfoDetail();
							this.message = '操作成功';
							this.msgType = 'success';
							this.$refs.anRef.show();
						} else {
							this.message = '操作失败';
							this.msgType = 'error';
							this.$refs.anRef.show();
						}
					},
					error(err) {
						this.message = '操作失败';
						this.msgType = 'error';
						this.$refs.anRef.show();
					}
				});
			},
			//计算在岗时间
			workingTime() {
				let addTime = this.$manjs.getFormatTime(this.userInfo.AddTime, "-");
				let nowDate = this.$manjs.getFormatTime(new Date(), "-");
				let workingMonth = this.$manjs.MonthsBetw(addTime, nowDate);
				if (workingMonth) {
					this.userInfo.workingTimeStr = "";
					let year = parseInt(workingMonth / 12);
					let month = workingMonth % 12;
					if (year > 0)
						this.userInfo.workingTimeStr = `${year}年`;
					this.userInfo.workingTimeStr += `${month}个月`;
				}
			}
		},
		onLoad() {
			uni.hideShareMenu();//隐藏分享按钮
			uni.setNavigationBarTitle({
				title: ''
			});
		},
		onShow() {
			this.getMyUserInfoDetail();
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
	.setting-main {
		width: 667upx;
		height: 100%;
		margin: auto;
	}

	.user-info {
		height: 340upx;
		display: flex;
		justify-content: space-between;
		padding: 0 45upx;
		border-bottom: #E4E4E4 2upx solid;
	}

	.info-left {
		height: 270upx;
	}

	.user-name {
		width: 100%;
		display: inline-block;
		font-size: 48upx;
		font-weight: bold;
		color: #444444;
		line-height: 150upx;
	}

	.user-post {
		width: 100%;
		display: inline-block;
		font-size: 28upx;
		font-weight: bold;
		color: #4c4c4c;
		line-height: 85upx;
	}

	.user-time {
		width: 100%;
		display: inline-block;
		font-size: 26upx;
		font-weight: bold;
		color: #999999;
	}

	.info-right {
		width: 95upx;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		height: 270upx;
	}

	.info-right image {
		width: 94upx;
		height: 94upx;
		border-radius: 10upx;
	}

	.info-right text {
		width: 100%;
		display: inline-block;
		text-align: center;
		margin-top: 11upx;
		font-size: 18upx;
		font-weight: 400;
		color: #999999;
	}

	.user-spill {
		width: 100%;
		height: 1upx;
		margin-top: 4upx;
		background: #EEEEEE;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/fonts/iconfont.ttf');
	}

	.iconfont {
		font-family: iconfont;
	}

	.user-form {
		margin-top: 20upx;
	}

	.form-item {
		padding: 0 45upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 90upx;
	}

	.form-item text {
		font-size: 27upx;
		font-weight: 400;
		color: #444444;
	}

	.login-out {
		width: 667upx;
		text-align: center;
		font-size: 24upx;
		font-weight: 400;
		color: #BBBBBB;
		line-height: 20upx;
		position: absolute;
		bottom: 84upx;
	}
</style>
