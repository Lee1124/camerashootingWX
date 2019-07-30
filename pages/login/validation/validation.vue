<!-- 认证界面 -->
<template>
	<view class="validationView">
		<!-- 加载 -->
		<uni-load-more status="loading" :show-icon='isShowLoading' :content-text="{contentrefresh:'正在加载...'}"></uni-load-more>

		<!-- 模态框 -->
		<myModal :show="modalData.isShowModal" @close="cancel_modal" :title="modalData.modalTitle" @cancel="cancel_modal"
		 @confirm="confirm_modal">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<input class="tel-input" cursor-spacing='80px' placeholder-style="color:#BBB" type="number" v-model="modalData.inputValue"
				 placeholder="输入手机号码" />
			</view>
		</myModal>
		<!-- /模态框 -->

		<!-- 提示框 -->
		<myTipsLayer2 ref="anRef" timer="10" autoClose="true"></myTipsLayer2>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowLoading: false,
				openid: '',
				modalData: {
					isShowModal: false,
					modalTitle: '身份验证',
					inputValue: '',

				},
				/* 分享意向表 */
				shareObj: {
					orderId: '',
					url: '',
				},
				/* 分享订单列表 */
				shareOrderObj: {
					url: ''
				},
				/* 分享状态列表 */
				shareOrderStateObj: {
					orderId: '',
					orderType: '',
					url: '',
				},
				/* 分享类型 */
				shareType: '',
				noCanLookShareUrl: '',
			}
		},
		methods: {

			/* login获取code */
			getCode() {
				this.isShowLoading = true;
				let that = this;
				uni.login({
					provider: 'weixin',
					success: loginRes => {
						that.getOpenId(loginRes.code);
					}
				})
			},
			/* 根据code获取openID */
			getOpenId(code) {
				let that = this;
				let url = this.$manjs.loginApi + '/xlapi/CameraManage/CameraMiniUserManage/GetCameraChatInfo/GetOpenID';
				let data = {
					loginCode: code
				}
				uni.request({
					method: 'GET',
					url: url,
					data: data,
					success(res) {
						let keyAndOpenId = JSON.parse(res.data);
						that.getIsHaveUser(keyAndOpenId);
						that.$store.commit('keepOpenId', keyAndOpenId.openid);
						that.openid = keyAndOpenId.openid;
					}
				})
			},
			/* 判断用户是否存在(不存在返回false 存在返回数据) */
			getIsHaveUser(keyAndOpenId) {
				let that = this;
				let url = this.$manjs.loginApi + '/xlapi/CameraManage/CameraMiniUserManage/CameraMiniUserInfo/IsHavingThisOpenId';
				let data = {
					openid: keyAndOpenId.openid
				}
				uni.request({
					url: url,
					method: 'GET',
					data: data,
					success: (res) => {
						this.isShowLoading = false;
						// console.log(res.data.data);
						let isHaving = res.data.data.IsHaving;
						if (res.data.data.ChatUserInfoModel != null) {
							let userType = res.data.data.ChatUserInfoModel.UserType;
							if (isHaving && userType == 0) {
								/* 有授权但未登陆 */
								if (that.shareType == 'yixiangbiao') {
									this.modalData.isShowModal = true;
									this.noCanLookShareUrl = '/pages/login/login?type=yixiangbiao&orderId='+that.shareObj.orderId+'&url='+that.shareObj.url;
								} else if (that.shareType == 'orderList') { /* 分享订单列表 */
									uni.redirectTo({
										url: '/pages/login/login?shareOrderList=true&type=orderList&url=' + that.shareOrderObj.url
									});
								} else if (that.shareType == 'orderState') {
									uni.redirectTo({
										url: '/pages/login/login?shareOrderState=true&type=orderState&url=' + that.shareOrderStateObj.url +
											'&orderType=' + that.shareOrderStateObj.orderType + '&orderId=' + that.shareOrderStateObj.orderId
									});
								} else { //不是分享就跳登录
									uni.redirectTo({
										url: '/pages/login/login'
									});
								}
							} else if (isHaving && userType == 5) { //有授权且是员工
								if (that.shareType == 'yixiangbiao') {
									let redirectToUrl = that.shareObj.url + '?orderId=' + that.shareObj.orderId
									uni.redirectTo({
										url: redirectToUrl
									});
								} else if (that.shareType == 'orderList') {
									/* 成功后跳转首页 */
									uni.switchTab({
										url: that.shareOrderObj.url
									});
								} else if (that.shareType == 'orderState') {
									let url = that.shareOrderStateObj.url + '?orderId=' + that.shareOrderStateObj.orderId + '&orderType=' +
										that.shareOrderStateObj.orderType
									uni.redirectTo({
										url: url
									});
								} else {
									/* 成功后跳转首页 */
									uni.switchTab({
										url: '/pages/dingdan/index'
									});
								}
							
							}
						}
						if (!isHaving) { /* 未授权 */
							if (that.shareType == 'yixiangbiao') {
								this.modalData.isShowModal = true;
								this.noCanLookShareUrl = '/pages/login/power/power?type=yixiangbiao&orderId='+that.shareObj.orderId+'&url='+that.shareObj.url;
							}else if(that.shareType == 'orderState'){
								let url='/pages/login/power/power?type=orderState&orderType='+this.shareOrderStateObj.orderType+'&orderId='+that.shareOrderStateObj.orderId+'&url='+this.shareOrderStateObj.url;
								uni.redirectTo({
									url: url
								});
							}else{//包括分享订单列表页面
								uni.redirectTo({
									url: '/pages/login/power/power'
								});
							}
						}
					}
				});
			},
			confirm_modal() {
				let that = this;
				let url = this.$manjs.loginApi + '/xlapi/CameraManage/CameraMiniUserManage/CameraMiniUserInfo/IsCameraOrderUser';
				let data = {
					OpenId: this.openid,
					OrderId: this.shareObj.orderId,
					Phone: this.modalData.inputValue
				}
				if (data.Phone == '') {
					this.$refs.anRef.show('电话号码不能为空');
					return false;
				}
				uni.request({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						console.log(res)
						if (res.data.data.IsCanLook) { //验证了为客户就进入意向表页面
							uni.setStorage({
								key: 'userInfo',
								data: res.data.data.AuthorizationStr.keyModelStr,
								success() {
									let redirectToUrl = that.shareObj.url + '?orderId=' + that.shareObj.orderId + '&&isKF=true'
									uni.redirectTo({
										url: redirectToUrl
									});
								}
							});

						} else {
							uni.redirectTo({
								url: that.noCanLookShareUrl
							});
						}
						that.modalData.isShowModal = false;
					}
				})

			},
			cancel_modal() {
				this.modalData.isShowModal = false;
			},

		},
	
		onLoad(options) {
			console.log(options)
			if (options.share == 'true') {
				this.shareType = 'yixiangbiao'
				this.shareObj.orderId = options.orderId;
				this.shareObj.url = '/pages/dingdan/pages/yixiangbiao/' + options.url;
			} else if (options.shareOrderList == 'true') {
				this.shareType = options.type;
				this.shareOrderObj.url = '/' + options.url;
				console.log(this.shareOrderObj.url)
			} else if (options.shareOrderState == 'true') {
				this.shareOrderStateObj.orderId = options.orderId;
				this.shareOrderStateObj.orderType = options.orderType;
				this.shareOrderStateObj.url = '/' + options.url;
				this.shareType = options.type;
			} else {
				
			}
			this.getCode();
		}
	}
</script>

<style scoped>
	.validationView {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.tel-input {
		width: 450upx;
		height: 88upx;
		background: rgba(238, 238, 238, 1);
		border-radius: 44upx;
		padding: 0 45upx;
		box-sizing: border-box;
		margin: 20upx auto;
	}
</style>
