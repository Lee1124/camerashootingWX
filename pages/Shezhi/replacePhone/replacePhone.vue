<template>
	<view class="change-psd">
		<view class="psd-item">
			<text>旧手机</text>
			<input v-model="oldPhone" disabled="true" placeholder="请输入旧手机" />
		</view>
		<view class="psd-item">
			<text>新手机</text>
			<input v-model="newPhone" placeholder="请输入新手机" />
		</view>
		<view class="change-btn">
			<button @click="updateUserBasicPhone">保存</button>
		</view>
		<myTipsLayer ref="anRef" timer="3" :type="msgType">
			<text>{{message}}</text>
		</myTipsLayer>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldPhone: '',
				newPhone: '',
				message: '',
				msgType: 'warn'
			}
		},
		methods: {
			/**
			 * 修改手机号码
			 */
			updateUserBasicPhone() {
				if (!this.$manjs.checkPhone(this.newPhone)) {
					this.message = '电话号码格式不正确';
					this.msgType = 'warn';
					this.$refs.anRef.show();
					return;
				}
				this.$axios({
					method: "POST",
					url: `/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/UpdateUserBasicPhone`,
					data: {
						UserId: this.$manjs.getkevalue().userid,
						Phone: this.newPhone
					},
					success(res) {
						if (res.data.status) {
							//成功
							console.log("修改成功");
							this.message = '修改成功';
							this.msgType = 'success';
							this.$refs.anRef.show();
							setTimeout(() => {
								uni.navigateBack({
									delta: 1
								});
							}, 1500)

						} else {
							this.message = res.data.msg;
							this.msgType = 'error';
							this.$refs.anRef.show();
						}
					},
					error(err) {
						this.message = '修改失败';
						this.msgType = 'error';
						this.$refs.anRef.show();
					}
				});
			}
		},
		onLoad(options) {
			uni.hideShareMenu();//隐藏分享按钮
			this.oldPhone = options.phone;
			uni.setNavigationBarTitle({
				title: '更换手机号'
			});
		}
	}
</script>

<style>
	.change-psd {
		width: 670upx;
		margin: auto;
	}

	.psd-item {
		width: 100%;
		height: 105upx;
		display: flex;
		justify-content: space-between;
		border-bottom: 1upx solid #DDDDDD;
	}

	.psd-item text {
		font-size: 26upx;
		font-weight: 400;
		color: #666666;
		line-height: 106upx;
	}

	.psd-item input {
		width: 540upx;
		height: 105upx;
		font-size: 26upx;
		font-weight: 400;
		color: #666666;
		line-height: 105upx;
	}

	.psd-item input::-webkit-input-placeholder {
		color: #BBBBBB;
	}

	.change-btn {
		margin-top: 165upx;
	}

	.change-btn button {
		width: 360upx;
		height: 91upx;
		font-size: 34upx;
		color: #FFFFFF;
		font-weight: bold;
		background: #75BAFF;
		border-radius: 46upx;
	}
</style>
