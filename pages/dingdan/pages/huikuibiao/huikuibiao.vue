<template>
	<view class="huikuibiao">
		<!-- 日期选择 -->
		<senSetPicker ref="setpicker" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></senSetPicker>
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y class="scrollView">
			<view class="repayTable-hd">
				<view class="noEditShadow" v-if="isReadonly"></view>
				<view class="repayTable-title">客户信息</view>
				<view class="repayTable-hd-ct">
					<view v-if="orderType==1">
						<view class="list">
							<view class="list-left-label">客<view class="oneWord"></view>户<view class="oneWord"></view>一</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入客户一姓名'}" @myInputBlur="myInputBlur('name1')" ref='name1'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">联系电话</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入联系电话'}" @myInputBlur="myInputBlur('tel1')" ref='tel1'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">客<view class="oneWord"></view>户<view class="oneWord"></view>二</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入客户二姓名'}" @myInputBlur="myInputBlur('name2')" ref='name2'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">联系电话</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入联系电话'}" @myInputBlur="myInputBlur('tel2')" ref='tel2'></myinput>
							</view>
						</view>
					</view>

					<view v-if="orderType==2">
						<view class="list">
							<view class="list-left-label">公<view class="twoWord"></view>司</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入公司名称'}" @myInputBlur="myInputBlur('name1')" ref='name1'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">联<view class="oneWord"></view>系<view class="oneWord"></view>人</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入联系人'}" @myInputBlur="myInputBlur('name2')" ref='name2'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">联系电话</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入联系电话'}" @myInputBlur="myInputBlur('tel2')" ref='tel2'></myinput>
							</view>
						</view>
					</view>

					<view class="list">
						<view class="list-left-label">拍摄日期</view>
						<view class="list-right-form">
							<input type="text" :value="timeValue1" disabled="true" style="height: 100%;" @click="openTimeSelect(1)">
						</view>
					</view>
					<view class="list" v-if="orderType==1">
						<view class="list-left-label">酒<view class="twoWord"></view>店</view>
						<view class="list-right-form">
							<myinput :myInputObj="{myIputPlaceholder:'请输入酒店'}" @myInputBlur="myInputBlur('hotel')" ref='hotel'></myinput>
						</view>
					</view>
				</view>
			</view>
			<view class="repayTable-bt">
				<view class="noEditShadow" v-if="isReadonly"></view>
				<view class="repayTable-title">回馈内容</view>
				<view class="repayTable-bt-ct">
					<view class="list">
						<view class="list-left-label">拍摄质量</view>
						<view class="list-right-form">
							<myinput :myInputObj="{myIputPlaceholder:'拍摄质量如何'}" @myInputBlur="myInputBlur('paishezhiliang')" ref='paishezhiliang'></myinput>
						</view>
					</view>
					<view class="list">
						<view class="list-left-label">备<view class="oneWord"></view>份<view class="oneWord"></view>盘</view>
						<view class="list-right-form">
							<myinput :myInputObj="{myIputPlaceholder:'请输入备份盘'}" @myInputBlur="myInputBlur('beifenpan')" ref='beifenpan'></myinput>
						</view>
					</view>
					<view class="list">
						<view class="list-left-label">备<view class="oneWord"></view>份<view class="oneWord"></view>机</view>
						<view class="list-right-form">
							<myinput :myInputObj="{myIputPlaceholder:'请输入备份机'}" @myInputBlur="myInputBlur('beifenji')" ref='beifenji'></myinput>
						</view>
					</view>
					<view class="list">
						<view class="list-left-label">备份日期</view>
						<view class="list-right-form">
							<input type="text" :value="timeValue2" disabled="true" style="height: 100%;" @click="openTimeSelect(2)">
						</view>
					</view>

					<view v-if="orderType==1">
						<view class="list">
							<view class="list-left-label">迎<view class="twoWord"></view>亲</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入迎亲部分备份人员'}" @myInputBlur="myInputBlur('yingqing')" ref='yingqing'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">迎<view class="twoWord"></view>宾</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入迎宾部分备份人员'}" @myInputBlur="myInputBlur('yingbing')" ref='yingbing'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">仪<view class="twoWord"></view>式</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入仪式部分备份人员'}" @myInputBlur="myInputBlur('yishi')" ref='yishi'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">敬<view class="twoWord"></view>酒</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入敬酒部分备份人员'}" @myInputBlur="myInputBlur('jingjiu')" ref='jingjiu'></myinput>
							</view>
						</view>
						<view class="list">
							<view class="list-left-label">婚<view class="twoWord"></view>前</view>
							<view class="list-right-form">
								<myinput :myInputObj="{myIputPlaceholder:'请输入婚前部分备份人员'}" @myInputBlur="myInputBlur('hunqian')" ref='hunqian'></myinput>
							</view>
						</view>
					</view>
					<view class="list">
						<view class="list-left-label">航<view class="twoWord"></view>拍</view>
						<view class="list-right-form">
							<myinput :myInputObj="{myIputPlaceholder:'请输入航拍部分备份人员'}" @myInputBlur="myInputBlur('hangpai')" ref='hangpai'></myinput>
						</view>
					</view>

					<view class="textArea-ct" style="margin-bottom:50upx;">
						<template v-for="(items,index) in qtNewsData">
							<view class="list2" :key='index' style="position: relative;">
								<!-- <view class="noEdit-shadow" v-if="isReadonly"></view> -->
								<label class="list-top">{{items.name}}</label>
								<view class="list-bottom" @click="openModal(items)">
									<input type="text" placeholder-style='color:#BBB;' v-if="items.textAreaValue==''" disabled="true" :placeholder="items.placeholderText">
									<text class="ct-text">{{items.textAreaValue}}</text>
								</view>
							</view>
						</template>
					</view>
				</view>
			</view>
			<button class="submit-btn" v-if="!isReadonly" @click="submit">提交</button>
		</scroll-view>

		<!-- 模态框 -->
		<myModal :show="textAreaObj.isShowModal" @close="cancel_modal" :title="modalTitle" @cancel="cancel_modal" @confirm="confirm_modal">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="textAreaObj.isShowModal" v-model="textAreaObj.modalTextAreaValue" :placeholder="modalPlaceholder"
				 style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /模态框 -->
		
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
				tipType: '',
				message: '',
				flag: true,
				isReadonly: false,
				shixian: false,
				timeValue1: '2019.01.01',
				timeValue2: '2019.01.01',
				timeType: 0,
				orderId: '',
				orderType: 0,
				modalTitle: '', //模态框文字
				modalPlaceholder: '', //模态框提示文字
				openId: 0,
				textAreaObj: {
					textAreaValue: '',
					isShowModal: false,
					modalTextAreaValue: ''
				},
				qtNewsData: [{
					name: '总监',
					id: 1,
					placeholderText: '对于本次拍摄有什么想说的...',
					textAreaValue: ''
				}, {
					name: '摄影师',
					id: 2,
					placeholderText: '对于本次拍摄有什么想说的...',
					textAreaValue: ''
				}, {
					name: '助理',
					id: 3,
					placeholderText: '对于本次拍摄有什么想说的...',
					textAreaValue: ''
				}, {
					name: '后期构架',
					id: 4,
					placeholderText: '对于本次拍摄有什么想说的...',
					textAreaValue: ''
				}]
			}
		},
		methods: {
			/* 打开模态框 */
			openModal(itemObj) {
				this.modalTitle = itemObj.name;
				this.modalPlaceholder = itemObj.placeholderText;
				this.openId = itemObj.id;
				this.textAreaObj.isShowModal = true;
				this.textAreaObj.modalTextAreaValue = itemObj.textAreaValue;
			},
			/* 确认模态框 */
			confirm_modal(val) {
				this.textAreaObj.isShowModal = false;
				this.qtNewsData.forEach(item => {
					if (item.id == this.openId) {
						item.textAreaValue = this.textAreaObj.modalTextAreaValue;
					}
				})
				this.blurRequest({
					val: this.textAreaObj.modalTextAreaValue,
					key: this.openId
				});
			},
			/* 取消模态框 */
			cancel_modal() {
				this.textAreaObj.isShowModal = false;
			},

			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				} else if (type === 'now') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}.${month}.${day}`;
			},
			/* 打开时间选择 */
			openTimeSelect(num) {
				this.timeType = num;
				this.$refs.setpicker.confirm(this['timeValue' + num]);
				this.shixian = true;
			},
			quxiaobutton() {
				this.shixian = false;
			},
			quedingbutton(bangdingyear, bangdingmonth, bangdingday) {
				this.shixian = false;
				this['timeValue' + this.timeType] = bangdingyear + "." + bangdingmonth + "." + bangdingday;
				if (this.timeType == 1) {
					this.blurRequest({
						val: this.timeValue1,
						key: 'orderTime'
					})
				} else {
					this.blurRequest({
						val: this.timeValue2,
						key: 'beiFenTime'
					})
				}
			},
			/*提交*/
			submit() {
				if (this.flag) {
					this.flag = false;
					let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/UpdateOrderStateByOrderId';
					let data = {
						OrderId: this.orderId,
						NextState: 2,
					};
					this.$axios({
						method: 'POST',
						url: url,
						data: data,
						success(res) {
							this.getOrderState();
							this.message = '提交成功';
							this.tipType = 'success';
							this.$refs.anRef.show();
						}
					})
				}
			},
			/*获取订单状态*/
			getOrderState() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/GetOrderStateByOrderId';
				let data = {
					OrderId: this.orderId,
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							console.log(res.data.data)
							if (res.data.data.OrderState == '1') { //0 待回馈订单  1拍摄待交接   2后期制作   3待审核  4退回  5待移交客户  6订单完成
								this.isReadonly = false;
							} else {
								this.isReadonly = true;
							}
						}
					}
				})
			},
			/* 文本框失去焦点 */
			myInputBlur(key) {
				let value = this.$refs[key].inputText;
				this.blurRequest({
					val: value,
					key: key
				})
			},
			/*失去焦点请求*/
			blurRequest(obj) {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/UpdateOrderIntentionTableInfo';
				let data = {
					OrderId: this.orderId,
					Type: 'hkb',
					MessageKey: obj.key,
					MessageContent: obj.val,
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						// console.log(res)
					}
				})
			},
			/* 获取基础信息 */
			getBaseNews() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/GetHKBTableDetailByOrderId';
				let data = {
					OrderId: this.orderId,
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						// console.log(res)
						if (res.data.status) {
							if (this.orderType == 1) {
								this.$refs.name1.inputText = res.data.data.name1;
								this.$refs.tel1.inputText = res.data.data.tel1;
								this.$refs.name2.inputText = res.data.data.name2;
								this.$refs.tel2.inputText = res.data.data.tel2;
								this.$refs.hotel.inputText = res.data.data.hotel;
								this.timeValue1 = res.data.data.orderTime.replace(/-/g, '.');
							} else {
								this.$refs.name1.inputText = res.data.data.name1;
								this.$refs.name2.inputText = res.data.data.name2;
								this.$refs.tel2.inputText = res.data.data.tel2;
								this.timeValue1 = res.data.data.orderTime.replace(/-/g, '.');
							}

						}
					}
				})
			},
			/*获取回馈表数据*/
			getFeedBackData(type) {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/GetOrderIntentionTableInfo';
				let data = {
					OrderId: this.orderId,
					Type: 'hkb',
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.flag = true;
							// console.log(res.data.data);
							res.data.data.forEach(item => {
								if (item.MessageKey != 'name1' && item.MessageKey != 'name2' && item.MessageKey != 'tel1' &&
									item.MessageKey != 'tel2' && item.MessageKey != 'hotel' && item.MessageKey != 'orderTime') {
									if (this.orderType == 1 && item.MessageKey != 'beiFenTime') {
										if (this.$refs[item.MessageKey] != undefined) {
											this.$refs[item.MessageKey].inputText = item.MessageContent;
										}
									} else if (this.orderType == 2 && item.MessageKey != 'beiFenTime' && item.MessageKey != 'yingqing' &&
										item.MessageKey != 'yingbing' && item.MessageKey != 'yishi' && item.MessageKey != 'jingjiu' && item.MessageKey !=
										'hunqian') {
										if (this.$refs[item.MessageKey] != undefined) {
											this.$refs[item.MessageKey].inputText = item.MessageContent;
										}
									}
									if (item.MessageKey == 'beiFenTime') {
										this.timeValue2 = item.MessageContent;
									}
									if (item.MessageKey == '1' || item.MessageKey == '2' || item.MessageKey == '3' || item.MessageKey == '4') {
										this.qtNewsData.forEach(item2 => {
											if (item2.id == parseInt(item.MessageKey)) {
												item2.textAreaValue = item.MessageContent;
											}
										})
									}
								}
							})
						}
					}
				})
			},
		},
		onLoad(options) {
			uni.hideShareMenu();//隐藏分享按钮
			this.orderId = options.orderId;
			this.orderType = parseInt(options.orderType);
			uni.setNavigationBarTitle({
				title: '回馈表'
			});
		},
		onShow() {
			this.flag = true;
			this.getOrderState();
			this.getFeedBackData();
			this.getBaseNews();
		}
	}
</script>

<style scoped>
	>>>.neil-modal__header {
		font-size: 28upx;
		text-align: left;
		padding-left: 60upx;
	}

	.scrollView {
		position: fixed;
		top: 2upx;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.repayTable-hd {
		padding: 40upx;
		position: relative;
	}

	.repayTable-bt {
		padding: 0 40upx;
		position: relative;
	}

	.noEditShadow {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 999;
	}

	.repayTable-title {
		font-size: 28upx;
		color: #222;
		text-align: center;
		position: relative;
		margin-bottom: 25upx;
		font-weight: 700;
	}

	.repayTable-title::before {
		content: '';
		width: 54upx;
		height: 2upx;
		background: rgba(89, 150, 248, 1);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: -22upx;
	}

	.textArea-ct .list2 {
		border-bottom: 1upx solid #E6E6E6;
		min-height: 158upx;
		padding-top: 25upx;
		box-sizing: border-box;
	}


	.textArea-ct .list2 .list-top {
		color: #666666;
		font-size: 28upx;
	}

	.textArea-ct .list2 .list-bottom {
		color: #BBBBBB;
		font-size: 26upx;
		min-height: 85upx;
		box-sizing: border-box;
		color: #222;
		position: relative;
		padding: 20rpx 0;
	}

	.textArea-ct .list2 .list-bottom input {
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		font-weight: 700;
	}

	.textArea-ct .list2 .list-bottom .ct-text {
		font-weight: 700;
	}

	.submit-btn {
		width: 360upx;
		height: 90upx;
		background: rgba(117, 186, 255, 1);
		border-radius: 45upx;
		color: #fff;
		font-size: 34upx;
		margin: 125upx auto;
		padding: 0;
	}
</style>
