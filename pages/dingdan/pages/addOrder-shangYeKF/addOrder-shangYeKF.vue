<template>
	<view class="hunQingKF">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<!-- /导航栏阴影 -->
		<!--公司 -->
		<view class="list">
			<view class="list-left-label">公 <view class="twoWord"></view>司</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_gongsi" :myInputObj='mygongsiNameInputObj' ref='myinput_gongsi'></myinput>
			</view>
		</view>
		<!-- / 公司-->

		<!-- 联系人 -->
		<view class="list">
			<view class="list-left-label">联<view class="oneWord"></view>系<view class="oneWord"></view>人</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_lianxiren" :myInputObj='myLXRNameInputObj' ref='myinput_lianxiren'></myinput>
			</view>
		</view>
		<!-- /联系人 -->
		<!-- 联系电话 -->
		<view class="list">
			<view class="list-left-label">联系电话</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_tel" :myInputObj='myTelInputObj' ref='myinput_tel'></myinput>
			</view>
		</view>
		<!-- /联系电话 -->
		<!-- 邮箱 -->
		<view class="list">
			<view class="list-left-label">邮<view class="twoWord"></view>箱</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_mail" :myInputObj='myMailInputObj' ref='myinput_mail'></myinput>
			</view>
		</view>
		<!-- /邮箱 -->
		<!-- 邮寄地址 -->
		<view class="list">
			<view class="list-left-label">邮寄地址</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_mailAddress" :myInputObj='myMailAddressInputObj' ref='myinput_mailAddress'></myinput>
			</view>
		</view>
		<!-- /邮寄地址 -->
		<!-- 客户说明-->
		<view class="list">
			<view class="list-left-label">客户说明</view>
			<view class="list-right-form textAreaBox">
				<view class="textArea" @click="openEditModal('KHRemark')">
					<input type="text" placeholder-style="color:#BBB;" v-if="KHRemarkObj.textAreaValue==''" disabled="true"
					 placeholder="请输入客户说明...">
					{{KHRemarkObj.textAreaValue}}
				</view>
			</view>
		</view>
		<!-- /客户说明 -->

		<!-- 客户说明模态框 -->
		<myModal :show="KHRemarkObj.isShowModal" @close="cancel_modal" title="填写客户说明" @cancel="cancel_modal" @confirm="confirm_modal('KHRemark')">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' placeholder-style="color:#BBB;" v-show="KHRemarkObj.isShowModal" v-model="KHRemarkObj.modalTextAreaValue"
				 placeholder="请输入客户说明..." style="background: #F5F5F5;width: 430upx;height:190upx;margin: 0 auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /客户说明模态框 -->
		<!-- 按钮 -->
		<view class="btnBox" v-if="type=='add'">
			<button class='btn btn1' @click="prevStep">上一步</button>
			<button class='btn btn2' :class="{btnPassStyle:btnShowPassColor}" @click="confirm">完成</button>
		</view>
		<button v-else class="comoon-order-btn order-btn" :class="{btnPassStyle:btnShowPassColor}" @click="confirm">保存</button>
		<!-- /按钮 -->

		<!-- 提示框 -->
		<myTipsLayer2 ref="anRef" timer="10" autoClose="true"></myTipsLayer2>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnShowPassColor: false,
				controlArr: ['', '', ''],
				customerId: '', //用户类型id
				/* 提交限流 */
				submitFlag: true,
				/* 订单id */
				orderId: '',
				/* add/update */
				type: '',
				/* 提示文字 */
				message: '',
				/* 拍摄类型 */
				orderType: '',
				/* 公司 */
				mygongsiNameInputObj: {
					myIputPlaceholder: '请输入商业公司名',
					inputValue: '', //输入的文本
				},
				/* 联系人 */
				myLXRNameInputObj: {
					myIputPlaceholder: '请输入公司联系人名字',
					inputValue: '', //输入的文本
				},
				/* 联系电话 */
				myTelInputObj: {
					myIputPlaceholder: '请输入联系人电话号码',
					inputValue: '', //输入的文本
				},
				/* 邮箱 */
				myMailInputObj: {
					myIputPlaceholder: '请输入电子邮箱',
					inputValue: '', //输入的文本
				},
				/* 邮寄地址 */
				myMailAddressInputObj: {
					myIputPlaceholder: '请输入邮寄地址',
					inputValue: '', //输入的文本
				},
				/* 客户说明 */
				KHRemarkObj: {
					textAreaValue: '',
					isShowModal: false,
					modalTextAreaValue: '',
				},
			}
		},
		methods: {
			showTip(msg, type = 'error') {
				this.$refs.anRef.show(msg, {
					type: type
				});
			},
			/* 获取默认数据 */
			getDefafultData() {
				this.$show('正在加载');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderInfoByCustomerInfoList';
				let data = {
					OrderId: this.orderId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.$hide();
							// console.log(res.data.data)
							let getObj = res.data.data;
							this.customerId = this.nullKong(getObj.CustomerModel.CustomerId);
							if (this.customerId == '') {
								this.type = 'update_add';
							} else {
								this.type = 'update';
							}
							this.$refs.myinput_gongsi.inputText = this.nullKong(getObj.CustomerModel.CompanyName); //公司
							this.mygongsiNameInputObj.inputValue = this.nullKong(getObj.CustomerModel.CompanyName); //新郎名字

							this.$refs.myinput_lianxiren.inputText = this.nullKong(getObj.CustomerModel.ContactName); //联系人
							this.myLXRNameInputObj.inputValue = this.nullKong(getObj.CustomerModel.ContactName); //联系人

							this.$refs.myinput_tel.inputText = this.nullKong(getObj.CustomerModel.ContactPhone); //联系电话
							this.myTelInputObj.inputValue = this.nullKong(getObj.CustomerModel.ContactPhone); //联系电话

							this.$refs.myinput_mail.inputText = this.nullKong(getObj.CustomerModel.OrderEmail); //邮箱
							this.myMailInputObj.inputValue = this.nullKong(getObj.CustomerModel.OrderEmail); //邮箱

							this.$refs.myinput_mailAddress.inputText = this.nullKong(getObj.CustomerModel.OrderMailAddress); //邮寄地址
							this.myMailAddressInputObj.inputValue = this.nullKong(getObj.CustomerModel.OrderMailAddress); //邮寄地址

							this.KHRemarkObj.textAreaValue = this.nullKong(getObj.CustomerModel.Remark); //说明
							this.KHRemarkObj.modalTextAreaValue = this.nullKong(getObj.CustomerModel.Remark); //说明
						}
					}
				})
			},
			/* 判断是否为null  为null 返回空 */
			nullKong(str) {
				if (!str) {
					return ''
				} else {
					return str;
				}
			},
			/* 确认完成 */
			confirm() {
				let shangyegongsi = this.mygongsiNameInputObj.inputValue;
				let lianxiren = this.myLXRNameInputObj.inputValue;
				let lianxiTel = this.myTelInputObj.inputValue;
				let remark = this.KHRemarkObj.textAreaValue;
				let mail = this.myMailInputObj.inputValue;
				let mailAddress = this.myMailAddressInputObj.inputValue;
				console.log()
				if (shangyegongsi == '' || !shangyegongsi || (shangyegongsi.length > 0 && shangyegongsi.trim().length == 0)) {
					this.showTip('请输入公司名字');
					return false;
				} else if (lianxiren === '' || !lianxiren || (lianxiren.length > 0 && lianxiren.trim().length == 0)) {
					this.showTip('请输入联系人姓名');
					return false;
				} else if (lianxiTel === '' || !lianxiTel || (lianxiTel.length > 0 && lianxiTel.trim().length == 0)) {
					this.showTip('请输入联系人电话号码');
					return false;
				}
				if (mail != '') {
					if (!(/\w+((-w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+/.test(mail))) {
						this.message = '请输入正确的邮箱'
						this.$refs.anRef.show();
						return false;
					}
				}
				let data;
				if (this.type == 'add') {
					data = {
						OrderId: this.orderId,
						CompanyName: shangyegongsi,
						ContactName: lianxiren,
						ContactPhone: lianxiTel,
						Remark: remark,
						Type: this.type,
						OrderEmail: mail,
						OrderMailAddress: mailAddress,
					};
				}
				if (this.type == 'update') {
					data = {
						OrderId: this.orderId,
						CompanyName: shangyegongsi,
						ContactName: lianxiren,
						ContactPhone: lianxiTel,
						Remark: remark,
						Type: this.type,
						CustomerId: this.customerId,
						OrderEmail: mail,
						OrderMailAddress: mailAddress,
					};
				}
				if (this.type == 'update_add') {
					data = {
						OrderId: this.orderId,
						CompanyName: shangyegongsi,
						ContactName: lianxiren,
						ContactPhone: lianxiTel,
						Remark: remark,
						Type: 'add',
						OrderEmail: mail,
						OrderMailAddress: mailAddress,
					};
				}

				if (this.submitFlag) {
					this.submitFlag = false;
					this.addOrderRequest2(data);
				}
			},
			//完成请求
			addOrderRequest2(data) {
				this.$show('正在保存');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/AddCameraCustomerInfo';
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.$hide();
							this.submitFlag = true;
							if (this.type == 'add') {
								uni.navigateTo({
									url: '../addSuccessPage/addSuccessPage?orderId=' + this.orderId + '&&orderType=' + this.orderType
								});
							} else {
								uni.navigateBack({
									delta: 1
								});
								this.$store.commit('keepBackPageType', 'editKeHu')
							}
						}
					}
				})
			},
			/* 上一步 */
			prevStep() {
				uni.navigateBack({
					delta: 1
				});
			},
			/* input输入文本--公司 */
			inputTextChange_gongsi(val) {
				this.mygongsiNameInputObj.inputValue = val;
				this.controlArr.splice(0, 1, val);
			},
			/* input输入文本--联系人 */
			inputTextChange_lianxiren(val) {
				this.myLXRNameInputObj.inputValue = val;
				this.controlArr.splice(1, 1, val);
			},
			/* input输入文本--联系人电话 */
			inputTextChange_tel(val) {
				this.myTelInputObj.inputValue = val;
				this.controlArr.splice(2, 1, val);
			},

			/* input输入文本--邮箱 */
			inputTextChange_mail(val) {
				this.myMailInputObj.inputValue = val;
			},
			/* input输入文本--邮寄地址 */
			inputTextChange_mailAddress(val) {
				this.myMailAddressInputObj.inputValue = val;
			},

			/* 打开弹框 */
			openEditModal(type) {
				if (type == 'KHRemark') {
					this.KHRemarkObj.modalTextAreaValue = this.KHRemarkObj.textAreaValue;
					this.KHRemarkObj.isShowModal = true;
				}
			},
			/* 确认酒店地址 */
			confirm_modal(type) {
				if (type == 'KHRemark') {
					this.KHRemarkObj.isShowModal = false;
					this.KHRemarkObj.textAreaValue = this.KHRemarkObj.modalTextAreaValue;
				}
			},
			/* 关闭模态框 */
			cancel_modal() {
				this.KHRemarkObj.isShowModal = false;
				this.KHRemarkObj.modalTextAreaValue = '';
			},
		},
		onLoad(option) {
			uni.hideShareMenu();//隐藏分享按钮
			this.orderType = option.orderType; // 1.婚礼拍摄 2.活动拍摄
			this.orderId = option.orderId;
			this.type = option.type;
			if (this.type == 'update') {
				this.getDefafultData();
				uni.setNavigationBarTitle({
					title: '修改订单-商业客户'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '添加订单-商业客户'
				});
			}

		},
		onShow() {
			this.submitFlag = true;
		},
		watch: {
			controlArr(val) {
				if (val[0] != '' && val[1] != '' && val[2] != '') {
					this.btnShowPassColor = true;
				} else {
					this.btnShowPassColor = false;
				}
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

		},
		onPageScroll() {

		},
	}
</script>

<style scoped>
	.hunQingKF {
		padding: 10upx 40upx 140upx;
	}

	.btnBox {
		margin-top: 240upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btnBox .btn {
		width: 230upx;
		height: 84upx;
		border-radius: 42upx;
		font-size: 30upx;
		padding: 0;
		margin: 0;
	}

	.btnBox .btn1 {
		border: 1upx solid rgba(49, 150, 250, 1);
		color: #3196FA;
		background: #FFF;
		margin-right: 80upx;
	}

	.btnBox .btn2 {
		background: #75baff;
		color: #fff;
	}
</style>
