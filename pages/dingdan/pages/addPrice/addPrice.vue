<!-- 添加金额 -->
<template>
	<view class="addPrice">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<!-- /导航栏阴影 -->
		<!-- 订单标题 -->
		<view class="list">
			<view class="list-left-label">订 <view class="twoWord"></view>单</view>
			<view class="list-right-form">
				<myinput :myInputObj='myOrderTitleInputObj' ref='myinput_orderTitle'></myinput>
			</view>
		</view>
		<!-- /订单标题 -->

		<!-- 编号 -->
		<view class="list">
			<view class="list-left-label">编 <view class="twoWord"></view>号</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_NO" :myInputObj='myNoInputObj' ref='myinput_No'></myinput>
			</view>
		</view>
		<!-- /编号 -->

		<!-- 选择金额类型 -->
		<view class="list">
			<view class="list-left-label">类 <view class="twoWord"></view>型</view>
			<view class="list-right-form">
				<mySelect :mySelectObj='myTypeSelectObj' @selectConfirm='getValue_type'></mySelect>
			</view>
		</view>
		<!-- /选择金额类型 -->

		<!-- 选择转入账号 -->
		<view class="list">
			<view class="list-left-label">账 <view class="twoWord"></view>号</view>
			<view class="list-right-form">
				<mySelect :mySelectObj='myNumberSelectObj' @selectConfirm='getValue_number'></mySelect>
			</view>
		</view>
		<!-- /选择转入账号 -->

		<!-- 输入金额 -->
		<view class="list">
			<view class="list-left-label">金 <view class="twoWord"></view>额</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_price" :myInputObj='myPriceInputObj' ref='myinput_price'></myinput>
			</view>
		</view>
		<!-- /输入金额 -->

		<!-- 说明-->
		<view class="list">
			<view class="list-left-label">说 <text class="twoWord"></text>明</view>
			<view class="list-right-form textAreaBox">
				<view class="textArea" @click="openEditModal">
					<input type="text" placeholder-style="color:#BBB;" v-if="priceRemarkObj.textAreaValue==''" disabled="true" placeholder="想要说点什么...">
					{{priceRemarkObj.textAreaValue}}
				</view>
			</view>
		</view>
		<!-- /说明 -->

		<!-- 说明模态框 -->
		<myModal :show="priceRemarkObj.isShowModal" @close="cancel_modal" title="填写金额说明" @cancel="cancel_modal" @confirm="confirm_modal('hunQingRemark')">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="priceRemarkObj.isShowModal" v-model="priceRemarkObj.modalTextAreaValue" placeholder="想要说点什么..."
				 style="background: #F5F5F5;width: 430upx;height:190upx;margin: 0 auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /说明模态框 -->

		<!-- 按钮 -->
		<button class="comoon-order-btn order-btn" :class="{btnPassStyle:btnShowPassColor}" @click="comfirm">保存</button>
		<!-- /按钮 -->

		<!-- 提示框 -->
		<myTipsLayer ref="anRef" timer="3" :type="tipType">
			<text>{{message}}</text>
		</myTipsLayer>
		
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				comfirmFlag:true,
				message: '',
				tipType: '',
				/* 订单id */
				orderId: '',
				/* 订单标题 */
				// orderTitle:'',
				btnShowPassColor: false,
				controlArr: ['', '', '', ''],
				myOrderTitleInputObj: {
					myIputPlaceholder: '请输入订单',
					inputValue: '',
				},
				/* 编号 */
				myNoInputObj: {
					myIputPlaceholder: '请输入编号',
					inputValue: '',
				},
				/* 类型 */
				myTypeSelectObj: {
					mySelectPlaceholder: '请选择金额类型',
					array: [],
					index: 0,
					isSelectedObj: {},
				},
				/* 账号 */
				myNumberSelectObj: {
					mySelectPlaceholder: '请选择转入账号',
					array: [],
					index: 0,
					isSelectedObj: {},
				},
				/* 金额 */
				myPriceInputObj: {
					myIputPlaceholder: '请输入金额',
					inputValue: '',
				},
				/* 说明 */
				priceRemarkObj: {
					textAreaValue: '',
					isShowModal: false,
					modalTextAreaValue: '',
				},
			}
		},
		methods: {
			/* 保存 */
			comfirm() {
				this.$show('正在保存');
				let orderId = this.orderId; //订单id
				let orderTitle = this.myOrderTitleInputObj.inputValue; //订单标题
				let NO = this.myNoInputObj.inputValue; //编号
				let priceType = this.myTypeSelectObj.isSelectedObj; //金额类型（label value）
				let number = this.myNumberSelectObj.isSelectedObj; //账号（label value）
				let price = this.myPriceInputObj.inputValue; //金额
				let remark = this.priceRemarkObj.textAreaValue; //说明
				if (NO == '') {
					this.message = '请输入编号'
					this.tipType = 'error'
					this.$refs.anRef.show();
					return false;
				} else if (priceType.value == undefined) {
					this.message = '请选择金额类型'
					this.tipType = 'error'
					this.$refs.anRef.show();
					return false;
				} else if (number.value == undefined) {
					this.message = '请选择账号'
					this.tipType = 'error'
					this.$refs.anRef.show();
					return false;
				} else if (price == '') {
					this.message = '请填写金额'
					this.tipType = 'error'
					this.$refs.anRef.show();
					return false;
				}

				let data = {
					actiontype: "add",
					address: number.value,
					amount: price,
					no: NO,
					order: orderId,
					orderremark: orderTitle,
					remark: remark,
					type: priceType.value,
				}
				
				if(this.comfirmFlag){
					this.comfirmFlag=false;
					this.comfirmRepuest(data);
				}
			},
			/* 保存请求 */
			comfirmRepuest(data){
				let url = '/xlapi/CameraManage/AmountManage/AmountOrder/addorderamount';
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						this.comfirmFlag=true;
						this.$hide();
						uni.navigateBack({
							delta: 1
						});
						this.$store.commit('keepBackPageType','addPrice');
					}
				})
			},
			/* 编号 */
			inputTextChange_NO(val) {
				this.myNoInputObj.inputValue = val;
				this.controlArr.splice(0, 1, val);
			},
			/* 确认类型 */
			getValue_type(val) {
				this.myTypeSelectObj.isSelectedObj = val;
				this.controlArr.splice(1, 1, val);
			},
			/* 确认账号 */
			getValue_number(val) {
				this.myNumberSelectObj.isSelectedObj = val;
				this.controlArr.splice(2, 1, val);
			},
			/* 金额 */
			inputTextChange_price(val) {
				this.myPriceInputObj.inputValue = val;
				this.controlArr.splice(3, 1, val);
			},
			/* 打开弹框 */
			openEditModal() {
				this.priceRemarkObj.modalTextAreaValue = this.priceRemarkObj.textAreaValue;
				this.priceRemarkObj.isShowModal = true;
			},

			/* 关闭模态框 */
			cancel_modal() {
				this.priceRemarkObj.isShowModal = false;
				this.priceRemarkObj.modalTextAreaValue = '';
			},
			/* 确认说明 */
			confirm_modal() {
				this.priceRemarkObj.isShowModal = false;
				this.priceRemarkObj.textAreaValue = this.priceRemarkObj.modalTextAreaValue;
			},
			/* 根据订单获取订单标题 */
			getOrderTitle() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderTitleByOrderId';
				let data = {
					OrderId: this.orderId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.myOrderTitleInputObj.inputValue = res.data.data;
							this.$refs.myinput_orderTitle.inputText = res.data.data;
						}
					}
				})
			},
			/* 获取金额类型 */
			getPriceType() {
				let url = '/xlapi/CameraManage/AmountManage/AmountOrder/getamounttype';
				this.$axios({
					method: 'GET',
					url: url,
					success(res) {
						// console.log(res)
						if (res.statusCode == 200) {
							let newRes = res.data.map(item => {
								return {
									label: item.name,
									value: item.id,
								}
							})
							this.myTypeSelectObj.array = newRes;
						}
					}
				})
			},
			/* 获取账号 */
			getNumber() {
				let url = '/xlapi/CameraManage/AmountManage/AmountOrder/getamountinaddress';
				this.$axios({
					method: 'GET',
					url: url,
					success(res) {
						console.log(res)
						if (res.statusCode == 200) {
							let newRes = res.data.map(item => {
								return {
									label: item.name,
									value: item.id,
								}
							})
							this.myNumberSelectObj.array = newRes;
						}
					}
				})
			},
		},
		onLoad(options) {
			uni.hideShareMenu();//隐藏分享按钮
			this.comfirmFlag=true;
			this.orderId = options.orderId;
			uni.setNavigationBarTitle({
				title: '添加金额'
			});
			this.getOrderTitle();
			this.getPriceType();
			this.getNumber();
		},
		watch: {
			controlArr(val) {
				// console.log(val)
				if (val[0] != '' && val[1] != '' && val[2] != '' && val[3] != '') {
					this.btnShowPassColor = true;
				} else {
					this.btnShowPassColor = false;
				}
			},
		}
	}
</script>

<style scoped>
	.addPrice {
		padding: 10upx 40upx 140upx;
	}

	.order-btn {
		margin-top: 230upx;
	}
</style>
