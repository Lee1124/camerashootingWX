<template>
	<view class="yixiangbiao">
		<!-- 日期选择 -->
		<senSetPicker ref="setpicker" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></senSetPicker>
		<!-- 新郎信息 -->
		<view class="content" v-show="thisPage==1">
			<view class="noEdit-shadow" v-if="isReadonly"></view>
			<view class="title">{{contentTitle}}</view>
			<view class="list">
				<label class="list-left">姓 <text class="twoWord twoWord2"></text>名：</label>
				<view class="list-right">
					<myinput @myInputBlur="myInputBlur('name1')" :myInputObj='myxlNameInputObj' ref='name1'></myinput>
				</view>
			</view>
			<view class="list">
				<label class="list-left">联系电话：</label>
				<view class="list-right">
					<myinput @myInputBlur="myInputBlur('tel1')" :myInputObj='myxlTelInputObj' ref='tel1'></myinput>
				</view>
			</view>
			<view class="list">
				<label class="list-left">年<text class="twoWord twoWord2"></text>龄：</label>
				<view class="list-right">
					<myinput @myInputBlur="myInputBlur('age1')" :myInputObj='myxlAgeInputObj' ref='age1'></myinput>
				</view>
			</view>
			<!-- 			<view class="list">
				<label class="list-left">血 <text class="twoWord twoWord2"></text>型：</label>
				<view class="list-right">
					<mySelect :mySelectObj='myXueXingSelectObj' @selectConfirm="getValue_XueXing('bloodType1')" ref='bloodType1'></mySelect>
				</view>
			</view>
			<view class="list">
				<label class="list-left">星 <text class="twoWord twoWord2"></text>座：</label>
				<view class="list-right">
					<mySelect :mySelectObj='myxingZuoSelectObj' @selectConfirm="getValue_xingZuo('xingZuo1')" ref='xingZuo1'></mySelect>
				</view>
			</view> -->
		</view>
		<!-- 新娘信息 -->
		<view class="content" v-show="thisPage==2">
			<view class="noEdit-shadow" v-if="isReadonly"></view>
			<view class="title">{{contentTitle}}</view>
			<view class="list">
				<label class="list-left">姓 <text class="twoWord twoWord2"></text>名：</label>
				<view class="list-right">
					<myinput @myInputBlur="myInputBlur('name2')" :myInputObj='myxlNameInputObj' ref='name2'></myinput>
				</view>
			</view>
			<view class="list">
				<label class="list-left">联系电话：</label>
				<view class="list-right">
					<myinput @myInputBlur="myInputBlur('tel2')" :myInputObj='myxlTelInputObj' ref='tel2'></myinput>
				</view>
			</view>
			<view class="list">
				<label class="list-left">年<text class="twoWord twoWord2"></text>龄：</label>
				<view class="list-right">
					<myinput @myInputBlur="myInputBlur('age2')" :myInputObj='myxlAgeInputObj' ref='age2'></myinput>
				</view>
			</view>
			<!-- <view class="list">
				<label class="list-left">血 <text class="twoWord twoWord2"></text>型：</label>
				<view class="list-right">
					<mySelect :mySelectObj='myXueXingSelectObj' @selectConfirm="getValue_XueXing('bloodType2')" ref='bloodType2'></mySelect>
				</view>
			</view>
			<view class="list">
				<label class="list-left">星 <text class="twoWord twoWord2"></text>座：</label>
				<view class="list-right">
					<mySelect :mySelectObj='myxingZuoSelectObj' @selectConfirm="getValue_xingZuo('xingZuo2')" ref='xingZuo2'></mySelect>
				</view>
			</view> -->
		</view>
		<!-- 订单信息 -->
		<view class="content" v-show="thisPage==3">
			<view class="noEdit-shadow" v-if="isReadonly"></view>
			<view class="title">{{contentTitle}}</view>
			<view class="list">
				<label class="list-left">婚 <text class="twoWord twoWord2"></text>期：</label>
				<view class="list-right">
					<input type="text" :value="timeValue" disabled="true" style="height: 100%;" @click="name">
				</view>
			</view>
			<view class="list">
				<label class="list-left">酒 <text class="twoWord twoWord2"></text>店：</label>
				<view class="list-right">
					<myinput @myInputBlur="myInputBlur('hotel')" :myInputObj='myHotelInputObj' ref='hotel'></myinput>
				</view>
			</view>
			<view class="list">
				<label class="list-left">城 <text class="twoWord twoWord2"></text>市：</label>
				<view class="list-right">
					<myinput @myInputBlur="myInputBlur('city')" :myInputObj='myCityInputObj' ref='city'></myinput>
				</view>
			</view>
		</view>
		<!--其他信息 -->
		<view class="content qita-content" v-show="thisPage==4">
			<view class="title">{{contentTitle}}</view>
			<scroll-view scroll-y class='content-scroll-view'>
				<template v-for="(items,index) in qtNewsData">
					<view class="list2" :key='index' style="position: relative;">
						<view class="noEdit-shadow" v-if="isReadonly"></view>
						<label class="list-top">{{items.name}}</label>
						<view class="list-bottom" @click="openModal(items)">
							<input type="text" placeholder-style='color:#BBB;' v-if="items.textAreaValue==''" disabled="true" :placeholder="items.placeholderText">
							<text class="ct-text">{{items.textAreaValue}}</text>
						</view>
					</view>
				</template>
			</scroll-view>
		</view>

		<!-- 模态框 -->
		<myModal :show="qtObj.isShowModal" @close="cancel_modal" :title="modalTitle" @cancel="cancel_modal" @confirm="confirm_modal">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="qtObj.isShowModal" v-model="qtObj.modalTextAreaValue" :placeholder="modalPlaceholder"
				 style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /模态框 -->

		<view class="foot" v-if="thisPage==1">
			<button class="out-btn" @click="outYixiangbiao" v-if="!isKF">退出</button>
			<button class="lastBtn" @click="nextStep(2)" :class="{'isNoMarginLeft':isKF}">下一步</button>
		</view>
		<view class="foot" v-if="thisPage==2">
			<button class="pervStep-btn" @click="pervStep(1)">上一步</button>
			<button class="lastBtn" @click="nextStep(3)">下一步</button>
		</view>
		<view class="foot" v-if="thisPage==3">
			<button class="pervStep-btn" @click="pervStep(2)">上一步</button>
			<button class="lastBtn" @click="nextStep(4)">下一步</button>
		</view>
		<view class="foot" v-if="thisPage==4">
			<button class="pervStep-btn" @click="pervStep(3)">上一步</button>
			<!-- <button class="lastBtn" v-if="!isReadonly" @click='submit'>提交</button> -->
			<button class="out-btn" @click="outYixiangbiao" v-if="!isKF" style="border: 0;margin-left: 80upx;">完成</button>
		</view>

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
				isKF: false,
				tipType: '',
				message: '',
				flag: true,
				isReadonly: false,
				shixian: false,
				orderId: '', //订单id
				orderType: '', //订单类型
				thisPage: 0,
				contentTitle: '',
				/* 新郎名字 */
				myxlNameInputObj: {
					myIputPlaceholder: '请输入名字',
				},
				/* 新郎电话 */
				myxlTelInputObj: {
					myIputPlaceholder: '请输入电话号码',
				},
				/* 新郎年龄 */
				myxlAgeInputObj: {
					myIputPlaceholder: '请输入年龄',
				},
				/* 婚期 */
				timeValue: '',
				/* 酒店 */
				myHotelInputObj: {
					myIputPlaceholder: '请输入酒店',
				},
				/* 城市 */
				myCityInputObj: {
					myIputPlaceholder: '请输入城市',
				},
				/* 血型选择 */
				myXueXingSelectObj: {
					mySelectPlaceholder: '请选择血型',
					array: [{
							label: 'A型',
							value: 1,
						},
						{
							label: 'B型',
							value: 2,
						},
						{
							label: 'AB型',
							value: 3,
						},
						{
							label: 'O型',
							value: 4,
						},
						{
							label: '其他',
							value: 5,
						},
					],
					index: 0,
					isSelectedObj1: {},
					isSelectedObj2: {},
				},
				/* 星座选择 */
				myxingZuoSelectObj: {
					mySelectPlaceholder: '请选择星座',
					array: [{
							label: '白羊座',
							value: 1,
						},
						{
							label: '金牛座',
							value: 2,
						},
						{
							label: '双子座',
							value: 3,
						},
						{
							label: '巨蟹座',
							value: 4,
						},
						{
							label: '狮子座',
							value: 5,
						},
						{
							label: '室女座',
							value: 6,
						},
						{
							label: '天秤座',
							value: 7,
						},
						{
							label: '天蝎座',
							value: 8,
						},
						{
							label: '人马座',
							value: 9,
						},
						{
							label: '摩羯座',
							value: 10,
						},
						{
							label: '宝瓶座',
							value: 11,
						},
						{
							label: '双鱼座',
							value: 12,
						},
					],
					index: 0,
					isSelectedObj1: {},
					isSelectedObj2: {},
				},

				/* 其他信息 */
				openId: 0, //打开模态框的id
				modalTitle: '', //模态框文字
				modalPlaceholder: '', //模态框提示文字
				qtNewsData: [{
						name: '如何相识、相知、相恋',
						id: 1,
						placeholderText: '恋爱中印象最深的事是什么...',
						textAreaValue: '',

					},
					{
						name: '对自己什么地方最满意',
						id: 7,
						placeholderText: '请输入内容...',
						textAreaValue: ''
					},
					{
						name: '有无拍摄禁忌？',
						id: 3,
						placeholderText: '请输入内容...',
						textAreaValue: ''
					},
					{
						name: '对拍摄有什么特别的要求？',
						id: 4,
						placeholderText: '有无特别指定拍摄的物件或者人物...',
						textAreaValue: ''
					},
					{
						name: '对后期有什么要求？',
						id: 5,
						placeholderText: 'MV整体风格，有无指定的婚礼MV背景音乐...',
						textAreaValue: ''
					},
					{
						name: '对我们有什么意见和建议',
						id: 8,
						placeholderText: '请输入内容...',
						textAreaValue: ''
					},
				],
				qtObj: {
					textAreaValue: '',
					isShowModal: false,
					modalTextAreaValue: '',
				},
			}
		},
		methods: {
			/*提交*/
			submit() {
				if (this.flag) {
					this.flag = false;
					let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/UpdateOrderStateByOrderId';
					let data = {
						OrderId: this.orderId,
						NextState: 1,
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
			/* 确认模态框填写 */
			confirm_modal() {
				this.qtObj.isShowModal = false;
				this.qtNewsData.forEach(item => {
					if (item.id == this.openId) {
						item.textAreaValue = this.qtObj.modalTextAreaValue;
					}
				})
				this.blurRequest({
					val: this.qtObj.modalTextAreaValue,
					key: this.openId
				});
			},
			/* 血型选择 */
			getValue_XueXing(key) {
				let value = this.$refs[key].pickerText;
				this.blurRequest({
					val: value,
					key: key
				});
			},
			/* 星座选择 */
			getValue_xingZuo(key) {
				let value = this.$refs[key].pickerText;
				this.blurRequest({
					val: value,
					key: key
				});
			},
			/* input失去焦点事件 */
			myInputBlur(key) {
				let value = this.$refs[key].inputText;
				this.blurRequest({
					val: value,
					key: key
				});
			},
			/*失去焦点请求*/
			blurRequest(obj) {
				if (obj.val != '') {
					let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/UpdateOrderIntentionTableInfo';
					let data = {
						OrderId: this.orderId,
						Type: 'yxb',
						MessageKey: obj.key,
						MessageContent: obj.val,
						OpenId: this.$store.state.openid,
					};
					this.$axios({
						method: 'POST',
						url: url,
						data: data,
						success(res) {
							console.log(res)
						}
					})
				}
			},
			/* 根据订单获取基本信息-订单时间和酒店 */
			getBaseInformation() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderBasicInfoByOrderId';
				let data = {
					OrderId: this.orderId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							if (this.timeValue == '') {
								this.setTimeAndHotelData({
									val: res.data.data.OrderDateStr.replace(/-/g, '.'),
									key: 'orderTime'
								});
							}
							if (this.$refs.hotel.inputText == '') {
								this.setTimeAndHotelData({
									val: res.data.data.HotelName_New,
									key: 'hotel'
								});
							}
						}
					}
				})
			},

			setTimeAndHotelData(obj) {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/UpdateOrderIntentionTableInfo';
				let MessageKey = obj.key;
				let MessageContent = obj.val;
				let data = {
					OrderId: this.orderId,
					Type: 'yxb',
					MessageKey: MessageKey,
					MessageContent: MessageContent,
				};

				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						this.getIntentionData();
					}
				})
			},

			/* 获取订单客户信息 */
			getOrderData() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderInfoByCustomerInfoList';
				let data = {
					OrderId: this.orderId,
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							// console.log(res)
							for (let i = 0; i < 4; i++) {
								if (i == 0 && this.$refs.name1.inputText != '') {
									continue;
								} else if (i == 1 && this.$refs.tel1.inputText != '') {
									continue;
								} else if (i == 2 && this.$refs.name2.inputText != '') {
									continue;
								} else if (i == 3 && this.$refs.tel2.inputText != '') {
									continue;
								}
								this.setDefaultData(res.data.data, i);
							}
						}
					}
				})
			},
			/*将订单信息保存到后台*/
			setDefaultData(obj, index) { //index:0=客户1,1=客户1电话,2=客户2,3=客户2电话
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/UpdateOrderIntentionTableInfo';
				let MessageKey;
				let MessageContent;
				if (index == 0) {
					MessageKey = 'name1';
					MessageContent = obj.CustomerModel.XLName;
				} else if (index == 1) {
					MessageKey = 'tel1';
					MessageContent = obj.CustomerModel.XLPhone;
				} else if (index == 2) {
					MessageKey = 'name2';
					MessageContent = obj.CustomerModel.XNName;
				} else if (index == 3) {
					MessageKey = 'tel2';
					MessageContent = obj.CustomerModel.XNPhone;
				}
				let data = {
					OrderId: this.orderId,
					Type: 'yxb',
					MessageKey: MessageKey,
					MessageContent: MessageContent,
				};

				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						// console.log(res)
						this.getIntentionData();
					}
				})
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
							if (res.data.data.OrderState == '0') { //0 待回馈订单  1拍摄待交接   2后期制作   3待审核  4退回   5待移交客户  6订单完成
								this.isReadonly = false;
							} else {
								this.isReadonly = true;
							}
						}
					}
				})
			},
			/*获取意向表数据*/
			getIntentionData(type) {
				this.$show('正在加载');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/GetOrderIntentionTableInfo';
				let data = {
					OrderId: this.orderId,
					Type: 'yxb',
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.$hide();
							this.flag = true;
							if (type == 1) {
								this.getOrderData();
								this.getBaseInformation();
								this.getOrderState();
							}
							this.defaultData(res.data.data);
						}
					}
				})
			},
			/*进入页面默认数据*/
			defaultData(objArr) {
				objArr.forEach((item, index, arr) => {
					let key = arr[index].MessageKey;
					if (key == 'bloodType1' || key == 'bloodType2' || key == 'xingZuo1' || key == 'xingZuo2') {
						// this.$refs[arr[index].MessageKey].pickerText = arr[index].MessageContent;
					} else if (key == 'orderTime') {
						this.timeValue = arr[index].MessageContent;
					} else if (key == 1 || key == 2 || key == 3 || key == 4 || key == 5 || key == 6 || key == 7 || key == 8) {
						this.qtNewsData.forEach(item => {
							if (key == item.id) {
								item.textAreaValue = arr[index].MessageContent;
							}
						})
					} else {
						this.$refs[arr[index].MessageKey].inputText = arr[index].MessageContent;
					}
				})
			},

			openModal(itemObj) {
				this.modalTitle = itemObj.name;
				this.modalPlaceholder = itemObj.placeholderText;
				this.openId = itemObj.id;
				this.qtObj.isShowModal = true;
				this.qtObj.modalTextAreaValue = itemObj.textAreaValue;
			},

			/* 退出-返回订单页面 */
			outYixiangbiao() {
				uni.switchTab({
					url: '/pages/dingdan/index'
				});
			},
			/* 取消模态框 */
			cancel_modal() {
				this.qtObj.isShowModal = false;
			},
			/* 下一步 */
			nextStep(num) {
				this.thisPage = num;
			},
			/* 上一步 */
			pervStep(num) {
				this.thisPage = num;
			},
			name: function() {
				this.$refs.setpicker.confirm(this.timeValue);
				this.shixian = true;
			},
			quxiaobutton: function() {
				this.shixian = false;
			},
			quedingbutton: function(bangdingyear, bangdingmonth, bangdingday) {
				this.shixian = false;
				this.timeValue = bangdingyear + "." + bangdingmonth + "." + bangdingday;
				this.blurRequest({
					val: this.timeValue,
					key: 'orderTime'
				});
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
			}

		},
		onLoad(options) {
			this.orderId = options.orderId;
			this.thisPage = 1;
			if (options.isKF == 'true') {
				this.isKF = true;
			} else {
				this.isKF = false;
			}

			uni.setNavigationBarTitle({
				title: '欢迎您，新人'
			});
		},
		onShow() {
			this.getIntentionData(1);
		},
		onShareAppMessage() {
			/* var pages = getCurrentPages();
    var currentPage = pages[pages.length - 1];
    var url = currentPage.route; //当前页面url
    console.log(url)
    return {
      title: this.data.baseData.title,
      imageUrl: app.globalData.imgUrl + 'share.png',
      path: "/pages/validation/validation?share=true&url=" + url + "&isShare=true&orderId=" + this.data.orderid
    }
  } */
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			let path = "/pages/login/validation/validation?share=true&orderId=" + this.orderId + '&url=yixiangbiao';
			let imageUrl = "http://xilai99.com/camerashootingWXIMG/share.png"
			return {
				title: '客户意向表',
				path: path,
				imageUrl: imageUrl
			}
		},
		watch: {
			thisPage(val) {
				if (val == 1) {
					this.contentTitle = '新郎信息'
				} else if (val == 2) {
					this.contentTitle = '新娘信息'
				} else if (val == 3) {
					this.contentTitle = '订单信息'
				} else if (val == 4) {
					this.contentTitle = '其他信息'
				}

			}
		}
	}
</script>

<style scoped>
	.yixiangbiao {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		padding: 84upx 75upx;
		background: #ccc;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: url('http://xilai99.com/camerashootingWXIMG/yixiangbiao.png');
		background-size: cover;
	}

	.yixiangbiao .content {
		width: 100%;
		height: 918upx;
		background: rgba(255, 255, 255, 0.95);
		border-radius: 10px;
		padding: 54upx 60upx;
		box-sizing: border-box;
	}

	.yixiangbiao .foot {
		display: flex;
		justify-content: center;
		margin-top: 50upx;
	}

	.yixiangbiao .foot button {
		padding: 0;
		margin: 0;
		width: 180upx;
		height: 80upx;
		line-height: 80upx;
		background: transparent;
		border-radius: 40upx;
		font-size: 28upx;
	}

	.yixiangbiao .foot button.lastBtn {
		margin-left: 80upx;
	}

	.yixiangbiao .foot button.lastBtn.isNoMarginLeft {
		margin-left: 0;
	}

	.yixiangbiao .foot button.out-btn {
		border: 1upx solid rgba(153, 153, 153, 1);
		color: #999999;
	}

	.yixiangbiao .foot button.pervStep-btn {
		border: 1px solid rgba(49, 150, 250, 1);
		color: #3196FA;
	}

	.yixiangbiao .foot button:last-of-type {
		background: #3196FA;
		color: #fff;
	}

	.yixiangbiao .content .title {
		text-align: center;
		color: #999999;
		font-size: 32upx;
		position: relative;
		margin-bottom: 30upx;
	}

	.yixiangbiao .content .title::before {
		content: '';
		width: 60upx;
		height: 2upx;
		background: rgba(49, 150, 250, 1);
		position: absolute;
		bottom: -25upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.yixiangbiao .content .list {
		display: flex;
		align-items: center;
		height: 105upx;
	}

	.yixiangbiao .content .list .list-left {
		color: #666666;
		font-size: 28upx;
		flex-basis: 30%;
	}

	.yixiangbiao .content .list .list-right {
		color: #222;
		font-size: 28upx;
		font-weight: 700;
		flex-basis: 70%;
		height: 100%;
	}

	.yixiangbiao .content .list .list-left .twoWord2 {
		width: 56upx;
	}


	.yixiangbiao .content .list2 {
		border-bottom: 1upx solid #E6E6E6;
		min-height: 158upx;
		padding-top: 25upx;
		box-sizing: border-box;
	}

	.yixiangbiao .content .list2:last-of-type {
		border-bottom: 0;
	}

	.yixiangbiao .content .list2 .list-top {
		color: #666666;
		font-size: 28upx;
	}

	.yixiangbiao .content .list2 .list-bottom {
		color: #BBBBBB;
		font-size: 26upx;
		min-height: 85upx;
		box-sizing: border-box;
		color: #222;
		position: relative;
		padding: 20rpx 0;
	}

	.yixiangbiao .content .list2 .list-bottom input {
		font-weight: 700;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
	}

	.yixiangbiao .content .list2 .list-bottom .ct-text {
		font-weight: 700;
	}

	>>>.neil-modal__header {
		font-size: 28upx;
		text-align: left;
		padding-left: 60upx;
	}

	.yixiangbiao .qita-content {
		padding-left: 0;
		padding-right: 0;
	}

	.yixiangbiao .content {
		position: relative;
	}

	.noEdit-shadow {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 99;
	}

	.content-scroll-view {
		position: absolute;
		top: 120upx;
		bottom: 54upx;
	}

	.content-scroll-view .list2 {
		width: 480upx;
		margin: 0 auto;
	}

	>>>.myInput input {
		font-size: 28upx;
	}
</style>
