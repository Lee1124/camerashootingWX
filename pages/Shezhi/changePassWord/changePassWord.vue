<template>
	<view class="change-psd">
		<view class="psd-item">
			<text>旧密码</text>
			<input v-model="oldPsw" type="password" placeholder="请输入旧密码" />
		</view>
		<view class="psd-item">
			<text>新密码</text>
			<input v-model="newPsw" type="password" placeholder="请输入新密码" />
		</view>
		<view class="psd-item">
			<text>再一次</text>
			<input v-model="againPsd" type="password" placeholder="请再一次输入新密码" />
		</view>
		<view class="change-btn">
			<button @click="updateUserBasicPassword">保存</button>
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
				oldPsw: '',
				newPsw: '',
				againPsd: '',
				message: '',
				msgType: 'warn'
			}
		},
		methods: {
			//修改密码
			updateUserBasicPassword() {

				if (!this.oldPsw || this.oldPsw == "") {
					this.message = '请输入旧密码';
					this.msgType = 'warn';
					this.$refs.anRef.show();
					return;
				}
				if (
					this.oldPsw.indexOf(" ") != -1 ||
					this.againPsd.indexOf(" ") != -1 ||
					this.newPsw.indexOf(" ") != -1
				) {
					this.message = '密码不能包含空格';
					this.msgType = 'warn';
					this.$refs.anRef.show();
					return;
				}
				if (this.newPsw != this.againPsd) {
					this.message = '两次密码不一致';
					this.msgType = 'warn';
					this.$refs.anRef.show();
				} else {
					this.$axios({
						method: "POST",
						url: `/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/UpdateUserBasicPassword`,
						data: {
							UserId: this.$manjs.getkevalue().userid,
							OldPassWord: this.oldPsw,
							NewPassWord: this.newPsw
						},
						success(res) {
							if (res.data.status) {
								this.message = '操作成功';
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
							this.message = res.data.msg;
							this.msgType = 'error';
							this.$refs.anRef.show();
						}
					});
				}
			}
		},
		onLoad() {
			uni.hideShareMenu();//隐藏分享按钮
			uni.setNavigationBarTitle({
				title: '更换密码'
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
