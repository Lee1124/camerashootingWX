<!-- 添加订单页面 -->
<template>
	<view id="addOrder" @click="hide" ref='addOrder'>
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<!-- 日期选择1 -->
		<senSetPicker ref="setpicker1" :shixian="shixian1" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton1"></senSetPicker>
		<!-- 日期选择2 -->
		<senSetPicker ref="setpicker2" :shixian="shixian2" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton2"></senSetPicker>
		<!-- 搜索文本框 -->
		<!-- 婚礼拍摄--日期选择 -->
		<view class="list" v-if="orderType==1">
			<view class="list-left-label">日 <view class="twoWord"></view>期</view>
			<view class="list-right-form">
				<view class="timeSelect">
					<text class="timeValue" @click="name('1-1')">{{timeValue1}}</text>
					</text>
				</view>
			</view>
		</view>
		<!-- /婚礼拍摄--日期选择 -->
		<!-- 具体时间 -->
		<view class="list" v-if="orderType==1">
			<view class="list-left-label">具体时间</view>
			<view class="list-right-form">
				<mySelect :mySelectObj='myTimeSelectObj' @selectConfirm='getValue_time' ref='mySelect_time'></mySelect>
			</view>
		</view>
		<!-- /具体时间 -->

		<!-- 活动拍摄--日期选择 -->
		<view class="list" v-if="orderType==2">
			<view class="list-left-label">拍摄日期</view>
			<view class="list-right-form">
				<view class="timeSelect">
					<text class="timeValue" @click="name('2-1')">{{timeValue1}}</text>
					</text>
				</view>
			</view>
		</view>
		<!-- /活动拍摄--日期选择 -->
		<!-- 活动拍摄--结束日期选择 -->
		<view class="list" v-if="orderType==2">
			<view class="list-left-label">结束日期</view>
			<view class="list-right-form">
				<view class="timeSelect">
					<text class="timeValue" @click="name('2-2')">{{timeValue2}}</text>
					</text>
				</view>
			</view>
		</view>
		<!-- /活动拍摄--结束日期选择 -->

		<!-- 城市选择 -->
		<view class="list">
			<view class="list-left-label">城 <view class="twoWord"></view>市</view>
			<view class="list-right-form">
				<myInputSearch2 @inputSearch2Focus='cityFocus' @choiceThis='choiceCity' :myInputSearch2Obj='myCitySearchObj' ref='myInputSearch2_city'></myInputSearch2>
			</view>
		</view>
		<!-- / 城市选择-->
		<!-- 酒店选择 -->
		<view class="list" v-if="orderType==1">
			<view class="list-left-label">酒 <view class="twoWord"></view>店</view>
			<view class="list-right-form">
				<myInputSearch1 @inputSearch1Focus='hotelFocus' @choiceThis='choiceHotel' @createEvent='createHotel'
				 :myInputSearch1Obj='myHotelSearchObj' ref='myInputSearch1_hotel'></myInputSearch1>
			</view>
		</view>
		<!-- /酒店选择 -->

		<!-- 婚礼拍摄--宴会厅 -->
		<view class="list" v-if="orderType==1">
			<view class="list-left-label">宴<view class="oneWord"></view>会<view class="oneWord"></view>厅</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_yanhui" :myInputObj='myYHTInputObj' ref='myinput_yanhui'></myinput>
			</view>
		</view>
		<!-- /婚礼拍摄--宴会厅 -->
		<!-- 活动拍摄--拍摄地点 -->
		<view class="list" v-if="orderType==2">
			<view class="list-left-label">拍摄地点</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_shotAddress" :myInputObj='myShotAddressInputObj' ref='myinput_shotAddress'></myinput>
			</view>
		</view>
		<!-- /活动拍摄--拍摄地点 -->
		<!-- 项目 -->
		<view class="list">
			<view class="list-left-label">项 <view class="twoWord"></view>目</view>
			<view class="list-right-form">
				<mySelect :mySelectObj='myXMSelectObj' @selectConfirm='getValue_XM' ref='mySelect_XM'></mySelect>
			</view>
		</view>
		<!-- /项目 -->

		<!-- 附加项目 -->
		<view class="list">
			<view class="list-left-label">附加项目</view>
			<view class="list-right-form" @click="openFJSelectList" style="min-height: 105upx;height: auto;">
				<scroll-view class="FJXMBox" scroll-x="true">
					<input v-if="FJXMObj.selectedArray.length==0" type="text" disabled="true" placeholder="可多选附加项目" placeholder-style="color:#BBB;">
					<template v-for="(item,index) in FJXMObj.selectedArray">
						<view class="selectTagBox" :key='index'>
							<text>{{item.name}}</text>
							<icon type="clear" @click.stop="clearThisSelect(item)" class="clearIcon" size="15" />
						</view>
					</template>
				</scroll-view>
			</view>
		</view>
		<!-- /附加项目 -->

		<!-- 选择附加项目弹框 -->
		<sidePopup @confirm='openFJSelectList' :hidden.sync='FJXMObj.showSidePopup' position='bottom' :no-botton='false' cancel-text='选择附加项目'
		 :confirm-style='{color: "#1EB700", fontSize: "26upx"}'>
			<template v-for='(item,index) in FJXMObj.array'>
				<view :key='index' class="FJXMList" @click="choiceThisFJXM(item)">
					<text :class="{thisIsSelected:item.isSelected}">{{item.name}}</text>
					<icon type="success_no_circle" v-show="item.isSelected" color='#5996F8' class="successIcon" size="15" />
				</view>
			</template>
		</sidePopup>
		<!-- /选择附加项目弹框 -->


		<!-- 金额 -->
		<view class="list">
			<view class="list-left-label">金 <view class="twoWord"></view>额</view>
			<view class="list-right-form">
				<myinput inputType='digit' @inputTextChange="inputTextChange_price" :myInputObj='myPriceInputObj' ref='myinput_price'></myinput>
			</view>
		</view>
		<!-- /金额 -->
		<!-- 婚庆 -->
		<view class="list" v-if="orderType==1">
			<view class="list-left-label">婚 <view class="twoWord"></view>庆</view>
			<view class="list-right-form">
				<myInputSearch1 @inputSearch1Focus='HQFocus' @choiceThis='choiceHQ' @createEvent='createHQ' :myInputSearch1Obj='myHQSearchObj'
				 ref='myInputSearch1_HQ'></myInputSearch1>
			</view>
		</view>
		<!-- /婚庆 -->

		<!-- 请选择订单来源 -->
		<view class="list">
			<view class="list-left-label">来<text class="twoWord"></text>源</view>
			<view class="list-right-form" @click="openLaiYuanSelectList" style="min-height: 105upx;height: auto;">
				<scroll-view class="FJXMBox" scroll-x="true">
					<input v-if="myLaiYuanObj.selectedArray.length==0" disabled="true" type="text" placeholder="选择来源"
					 placeholder-style="color:#BBB;">
					<template v-for="(item,index) in myLaiYuanObj.selectedArray">
						<view class="selectTagBox" :key='index'>
							<text>{{item.name}}</text>
							<icon type="clear" @click.stop="clearThisLaiYuanSelect(item)" class="clearIcon" size="15" />
						</view>
					</template>
				</scroll-view>
			</view>
		</view>
		<!-- /请选择订单来源 -->

		<!-- 请选择订单来源弹框 -->
		<sidePopup @confirm='openLaiYuanSelectList' :hidden.sync='myLaiYuanObj.showSidePopup' position='bottom' :no-botton='false' cancel-text='选择订单来源'
		 :confirm-style='{color: "#1EB700", fontSize: "26upx"}'>
			<template v-for='(item,index) in myLaiYuanObj.array'>
				<view :key='index' class="FJXMList" @click="choiceThisLaiYuan(item)">
					<text :class="{thisIsSelected:item.isSelected}">{{item.name}}</text>
					<icon type="success_no_circle" v-show="item.isSelected" color='#5996F8' class="successIcon" size="15" />
				</view>
			</template>
		</sidePopup>
		<!-- /请选择订单来源弹框 -->

		<!-- 来源说明-->
		<view class="list">
			<view class="list-left-label">来源说明</view>
			<view class="list-right-form textAreaBox">
				<view class="textArea" @click="openEditModal">
					<input type="text" v-if="lyRmarkObj.textAreaValue==''" placeholder-style='color:#BBB;' disabled="true" placeholder="请输入来源说明...">
					{{lyRmarkObj.textAreaValue}}
				</view>
			</view>
		</view>
		<!-- /来源说明 -->

		<!-- 是否加急 -->
		<view class="list">
			<view class="list-left-label">订单加急</view>
			<view class="list-right-form">
				<mySelect :mySelectObj='myOrderFastSelectObj' @selectConfirm='getValue_fast' ref='mySelect_fast'></mySelect>
			</view>
		</view>
		<!-- /是否加急 -->

		<!-- 按钮 -->
		<button v-if="type=='add'" class="comoon-order-btn order-btn" :class="{btnPassStyle:btnShowPassColor}" @click="confirm">下一步</button>
		<button v-else class="comoon-order-btn order-btn" :class="{btnPassStyle:btnShowPassColor}" @click="confirm">保存</button>
		<!-- /按钮 -->


		<!-- 模态框 -->
		<myModal :show="lyRmarkObj.isShowModal" @close="cancel_laiyuanRmark" title="填写来源说明" @cancel="cancel_laiyuanRmark"
		 @confirm="confirm_laiyuanRmark">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="lyRmarkObj.isShowModal" placeholder-style='color:#BBB;' v-model="lyRmarkObj.modalTextAreaValue"
				 placeholder="填入来源说明..." style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
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
			const currentDate = this.getDate({
				format: true
			});
			return {
				orderType: 0,
				tipType: '',
				/* 提交限流 */
				submitFlag: true,
				/* 订单id */
				orderId: '',
				/* add/update */
				type: '',
				/* 保存所填的数据  为了监控 */
				controlArr: ['', '', '', '', ''],
				/* 控制按钮的颜色*/
				btnShowPassColor: false,
				/* 提示文字 */
				message: '',
				/* 来源说明 */
				lyRmarkObj: {
					textAreaValue: '',
					isShowModal: false,
					modalTextAreaValue: '',
				},
				/* 宴会厅 */
				myYHTInputObj: {
					myIputPlaceholder: '请输入宴会厅',
					inputValue: '',
				},
				/* 拍摄地点 */
				myShotAddressInputObj: {
					myIputPlaceholder: '请输入拍摄地点',
					inputValue: '',
				},
				/* 金额 */
				myPriceInputObj: {
					myIputPlaceholder: '请输入金额',
					inputValue: '',
				},
				/* 城市选择 */
				myCitySearchObj: {
					showLoading: true,
					isShowListBox: false,
					myIputPlaceholder: '请输入城市名',
					listData: [],
					/* 选择的城市对象(name和id) */
					cityChoiceObj: {},
					site: 'bottom',
				},
				/* 酒店选择 */
				myHotelSearchObj: {
					isShowListBox: false,
					showLoading: true,
					isShowCreated: true,
					myIputPlaceholder: '请输入酒店名',
					createName: '酒店',
					listData: [],
					/* 选择的酒店对象(name和id) */
					hotelChoiceObj: {
						name: '',
						id: '',
					},
					hotelKey: '', //酒店输入框关键词
					site: 'bottom',

				},
				/* 时间选择 */
				timeValue1: currentDate, //时间1(两种类型公用)
				timeValue2: currentDate, //时间2(只用于活动拍摄结束时间)
				shixian1: false,
				shixian2: false,
				/* 具体时间选择 */
				myTimeSelectObj: {
					mySelectPlaceholder: '请选择具体时间段',
					array: [{
						label: '全天',
						value: 1
					}, {
						label: '早上',
						value: 2
					}, {
						label: '中午',
						value: 3
					}, {
						label: '晚上',
						value: 4
					}],
					index: 0,
					isSelectedObj: {},
				},
				/* 项目选择 */
				myXMSelectObj: {
					mySelectPlaceholder: '请选择项目',
					XMIDstr: '', //项目选择的id
					XMNamestr: '', //项目选择的名称
					XMAmount: 0, //项目选择的金额
					array: [],
					index: 0,
				},
				/* 附加项目 */
				FJXMObj: {
					showSidePopup: true,
					FJXMIDstr: '', //附加项目选择的id
					FJXMAmount: 0, //附加项目选择的总金额
					array: [], //获取的全部附加项目数据
					selectedArray: [
						// {
						// 	name: '附加项3',
						// 	isSelected: true
						// }
					], //选择的附加项目数据
				},
				/* 婚庆选择 */
				myHQSearchObj: {
					showLoading: true,
					isShowListBox: false,
					isShowCreated: true,
					myIputPlaceholder: '请输入婚庆',
					createName: '婚庆',
					listData: [],
					/* 选择的婚庆对象(name和id) */
					HQChoiceObj: {
						name: '',
						id: '',
					},
					hunQingKey: '', //婚庆输入框关键词
					site: 'top',
				},

				/* 来源选择 */
				myLaiYuanObj: {
					showSidePopup: true,
					laiYuanIDstr: '', //附加项目选择的id
					array: [],
					selectedArray: [],
				},

				/* 订单加急 */
				myOrderFastSelectObj: {
					mySelectPlaceholder: '选择是否加急',
					array: [{
						label: '是',
						value: true
					}, {
						label: '否',
						value: false
					}],
					index: 0,
					isSelectedObj: {},
				},
				// timeValue: currentDate,

			}
		},
		components: {},
		methods: {

			showTip(msg, type = 'error') {
				this.$refs.anRef.show(msg, {
					type: type
				});
			},
			/* 修改获取基本信息 */
			getDefaultData() {
				this.$show('正在加载');
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
							this.$hide();
							let getObj = res.data.data;
							this.timeValue1 = getObj.OrderDateStr.replace(/-/g, '.'); //日期1(timeValue)
							this.$refs.setpicker1.confirm(this.timeValue1);
							/* 日期2 */
							if (this.orderType == 1) {
								this.$refs.mySelect_time.pickerText = getObj.OrderTimeType;
								this.myTimeSelectObj.isSelectedObj = {
									label: getObj.OrderTimeType
								}
							} else if (this.orderType == 2) {
								this.timeValue2 = getObj.OrderTimeType.replace(/-/g, '.'); //日期2(timeValue)
								this.$refs.setpicker2.confirm(this.timeValue2);
							}
							/* 日期2 */

							/* 城市 */
							this.$refs.myInputSearch2_city.inputSearch2Text = getObj.CityName; //城市
							this.myCitySearchObj.isShowListBox = false; //城市
							setTimeout(() => {
								this.myCitySearchObj.cityChoiceObj = { //城市默认对象
									name: getObj.CityName,
									id: getObj.CityId
								}
							})
							/* 城市 */


							/* 酒店 */
							if (this.orderType == 1) {
								this.$refs.myInputSearch1_hotel.inputSearch1Text = getObj.HotelName_New ? getObj.HotelName_New : ''; //酒店

								this.$store.commit('addHotelObj', {
									name: getObj.HotelName_New,
									id: getObj.HotelId
								});
								this.myHotelSearchObj.hotelChoiceObj = { //酒店默认对象
									name: getObj.HotelName_New,
									id: getObj.HotelId
								}
								console.log(this.myHotelSearchObj.hotelChoiceObj)
								this.myHotelSearchObj.isShowListBox = false;
							}
							/* 酒店 */
							/* 宴会厅或拍摄地点 */
							if (this.orderType == 1) {
								this.$refs.myinput_yanhui.inputText = getObj.HotelOtherRemark; //宴会厅
								this.myYHTInputObj.inputValue = getObj.HotelOtherRemark; //宴会厅
							} else if (this.orderType == 2) {
								this.$refs.myinput_shotAddress.inputText = getObj.HotelOtherRemark;
								this.myShotAddressInputObj.inputValue = getObj.HotelOtherRemark;
							}
							/* 宴会厅或拍摄地点 */
							/* 项目 */
							this.$refs.mySelect_XM.pickerText = getObj.ProjectName; //项目
							this.myXMSelectObj.XMIDstr = getObj.ProjectId;
							this.myXMSelectObj.XMNamestr = getObj.ProjectName;
							/* 项目 */
							/* 附加项目 */
							if (getObj.FJProjectList) {
								let FJXMIDstr = '';
								let FJProjectAmount = 0;
								getObj.FJProjectList.forEach(item => {
									item.id = item.ProjectId;
									item.name = item.ProjectName;
									item.isSelected = true;
									FJXMIDstr += item.ProjectId + ','
									FJProjectAmount += item.ProjectAmount
								})
								this.FJXMObj.FJXMIDstr = FJXMIDstr;
								this.FJXMObj.selectedArray = getObj.FJProjectList;
								this.FJXMObj.FJXMAmount = FJProjectAmount;
								this.myXMSelectObj.XMAmount = getObj.Amount - FJProjectAmount;
								this.FJXMObj.array.forEach(item => {
									getObj.FJProjectList.forEach(item2 => {
										if (item.id == item2.id) {
											item.isSelected = true;
										}
									})
								})
							}
							/* 附加项目 */
							this.$refs.myinput_price.inputText = getObj.Amount; //金额
							this.myPriceInputObj.inputValue = getObj.Amount; //金额

							if (this.orderType == 1) {
								this.$refs.myInputSearch1_HQ.inputSearch1Text = getObj.WeddingName; //婚庆
								this.$store.commit('addHunQingObj', {
									name: getObj.WeddingName,
									id: getObj.WeddingId
								});
								this.myHQSearchObj.HQChoiceObj = { //婚庆默认对象
									name: getObj.WeddingName,
									id: getObj.WeddingId
								}
								this.myHQSearchObj.isShowListBox = false;
							}

							/* 来源 */
							if (getObj.Source != '' || getObj.Source != null) {
								this.myLaiYuanObj.laiYuanIDstr = getObj.Source;
								let myArr = getObj.Source.split(',');
								setTimeout(() => {
									this.myLaiYuanObj.selectedArray = this.myLaiYuanObj.array.filter(item => myArr.find(
										item2 => item2 == item.id))
									this.myLaiYuanObj.array.forEach(item => {
										myArr.forEach(item2 => {
											if (item.id == item2) {
												item.isSelected = true;
											}
										})
									})
								})
							}
							/* 来源 */
							this.lyRmarkObj.textAreaValue = getObj.SourceRemark; //来源说明
							this.lyRmarkObj.modalTextAreaValue = getObj.SourceRemark;

							/* 是否加急 */
							this.myOrderFastSelectObj.isSelectedObj = [{
								value: getObj.OrderIsUrgent
							}]
							if (getObj.OrderIsUrgent) {
								this.$refs.mySelect_fast.pickerText = '是'
							} else {
								this.$refs.mySelect_fast.pickerText = '否'
							}
						}
					}
				})
			},
			/* 创建--保存 */
			confirm() {
				// console.log(this.myHQSearchObj)
				// console.log(this.myHQSearchObj.HQChoiceObj)
				let timeValue1 = this.timeValue1.replace(/\./g, '-'); //日期1(婚礼-日期  活动-拍摄日期)
				let timeValue2; //时间2(婚礼-早中晚全时间  活动-结束日期)
				if (this.orderType == 1) {
					if (this.myTimeSelectObj.isSelectedObj.label) {
						timeValue2 = this.myTimeSelectObj.isSelectedObj.label;
					} else {
						timeValue2 = '';
					}
				} else if (this.orderType == 2) {
					timeValue2 = this.timeValue2.replace(/\./g, '-');
				}

				let cityChoiceObj = this.myCitySearchObj.cityChoiceObj; //选择的城市对象(name,id)

				let hotelID; //酒店id
				if (this.orderType == 1) {
					if (this.myHotelSearchObj.hotelChoiceObj.id) {
						hotelID = this.myHotelSearchObj.hotelChoiceObj.id;
					} else {
						hotelID = '';
					}
				} else if (this.orderType == 2) {
					hotelID = '';
				}
				// console.log(hotelID)
				// return
				let shotAddress; //婚礼拍摄--宴会厅   活动拍摄--拍摄地点
				if (this.orderType == 1) {
					shotAddress = this.myYHTInputObj.inputValue; //宴会厅(tanhuiting)
				} else if (this.orderType == 2) {
					shotAddress = this.myShotAddressInputObj.inputValue;
				}

				let xiangmuID = this.myXMSelectObj.XMIDstr; //项目id
				let xiangmuName = this.myXMSelectObj.XMNamestr; //项目id
				let fjxm = this.FJXMObj.FJXMIDstr; //附加项目id
				let priceValue = this.myPriceInputObj.inputValue; //金额(number)
				let hunqingID; //选择婚庆公司id
				if (this.orderType == 1) {
					if (this.myHQSearchObj.HQChoiceObj.id) {
						hunqingID = this.myHQSearchObj.HQChoiceObj.id;
					} else {
						hunqingID = '';
					}
				} else if (this.orderType == 2) {
					hunqingID = '';
				}

				let laiyuanIdStr = this.myLaiYuanObj.laiYuanIDstr; //来源id(可多个)
				let remark = this.lyRmarkObj.textAreaValue; //来源说明(remark)
				let orderIsFast;
				if (!this.myOrderFastSelectObj.isSelectedObj.value) {
					orderIsFast = false;
					this.$store.commit('keepOrderIsFast', false);
				} else {
					orderIsFast = this.myOrderFastSelectObj.isSelectedObj.value;
					this.$store.commit('keepOrderIsFast', this.myOrderFastSelectObj.isSelectedObj.value);
				}
				if (this.orderType == 1 && timeValue2 == '') {
					this.showTip('请选择具体时间段');
					return false;
				}
				if (!cityChoiceObj.id) {
					this.showTip('请选择城市');
					return false;
				}
				if (xiangmuID == '') {
					this.showTip('请选择项目');
					return false;
				}
				if (priceValue == '') {
					this.showTip('请输入金额');
					return false;
				}
				if (laiyuanIdStr == '') {
					this.showTip('请选择来源');
					return false;
				}
				// console.log(this.orderId)
				let data;
				if (this.orderId === '') {
					data = {
						OrderDate: timeValue1, //时间1
						OrderTimeType: timeValue2, //时间2
						CityId: cityChoiceObj.id,
						CityName: cityChoiceObj.name,
						HotelId: hotelID,
						HotelOtherRemark: shotAddress,
						ProjectId: xiangmuID,
						ProjectName: xiangmuName,
						AdditionalProject: fjxm, //附加项目
						Amount: priceValue,
						WeddingId: hunqingID,
						Source: laiyuanIdStr,
						SourceRemark: remark,
						OrderIsUrgent: orderIsFast,
						OrderType: this.orderType,
						Type: this.type,
					};
				} else if (this.orderId != '') {
					data = {
						OrderDate: timeValue1, //时间1
						OrderTimeType: timeValue2, //时间2
						CityId: cityChoiceObj.id,
						CityName: cityChoiceObj.name,
						HotelId: hotelID,
						HotelOtherRemark: shotAddress,
						ProjectId: xiangmuID,
						ProjectName: xiangmuName,
						AdditionalProject: fjxm, //附加项目
						Amount: priceValue,
						WeddingId: hunqingID,
						Source: laiyuanIdStr,
						SourceRemark: remark,
						OrderIsUrgent: orderIsFast,
						OrderType: this.orderType,
						Type: 'update',
						OrderId: this.orderId,
					};
				}
				// console.log(data)
				// return
				if (this.submitFlag) {
					this.submitFlag = false;
					this.addOrderRequest1(data);
				}
			},
			/* 添加订单第一步 */
			addOrderRequest1(data) {
				this.$show('正在保存')
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/AddCameraOrderInfo';
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							// console.log(res)
							this.$hide();
							this.submitFlag = true;
							this.orderId = res.data.data.OrderId;
							if (this.orderType == 1 && this.type == 'add') {
								uni.navigateTo({
									url: '../addOrder-hunQingKF/addOrder-hunQingKF?type=add&&orderId=' + res.data.data.OrderId +
										'&&orderType=' + this.orderType
								});
							} else if (this.orderType == 2 && this.type == 'add') {
								uni.navigateTo({
									url: '../addOrder-shangYeKF/addOrder-shangYeKF?type=add&&orderId=' + res.data.data.OrderId +
										'&&orderType=' + this.orderType
								});
							} else if (this.type == 'update') {
								uni.navigateBack({
									delta: 1
								});
								this.$store.commit('keepBackPageType', 'editBaseNews')
							}
						}
					}
				})
			},

			/* 打开弹框填写多行文本 */
			openEditModal() {
				this.lyRmarkObj.modalTextAreaValue = this.lyRmarkObj.textAreaValue;
				this.lyRmarkObj.isShowModal = true;
			},
			/* 确认来源说明填写 */
			confirm_laiyuanRmark() {
				this.lyRmarkObj.isShowModal = false;
				this.lyRmarkObj.textAreaValue = this.lyRmarkObj.modalTextAreaValue;
			},
			/* 取消来源说明填写 */
			cancel_laiyuanRmark() {
				this.lyRmarkObj.isShowModal = false;
				this.lyRmarkObj.modalTextAreaValue = '';
			},
			/* input输入文本--宴会 */
			inputTextChange_yanhui(val) {
				this.myYHTInputObj.inputValue = val;
			},
			/* input输入文本--拍摄地点 */
			inputTextChange_shotAddress(val) {
				this.myShotAddressInputObj.inputValue = val;
			},
			/* input输入文本--金额 */
			inputTextChange_price(val) {
				this.myPriceInputObj.inputValue = val;
			},
			/*====获取来源信息====*/
			getSourceData(obj) {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderInfoSource';
				this.$axios({
					method: 'POST',
					url: url,
					success(res) {
						if (res.data.status) {
							let newRes = res.data.data.map((item) => {
								return {
									name: item.Name,
									id: item.Id,
									isSelected: false
								}
							});
							this.myLaiYuanObj.array = newRes;
						}
					}
				})
			},
			/*获取项目信息*/
			getXMData() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderProjectInfo';
				this.$axios({
					method: 'POST',
					url: url,
					success(res) {
						if (res.data.status) {
							let newRes = res.data.data.map((item) => {
								return {
									label: item.ProjectName,
									value: item.ProjectId,
									ProjectAmount: item.ProjectAmount
								}
							});
							this.myXMSelectObj.array = newRes;
							if (res.data.fjdata.length != 0) {
								res.data.fjdata.forEach(item => {
									item.id = item.ProjectId;
									item.name = item.ProjectName;
									item.isSelected = false;
								});
								this.FJXMObj.array = res.data.fjdata;
							}
						}
					}
				})
			},

			/* 创建婚庆 */
			createHQ() {
				/* 判断是否输入框有内容 并赋值--vuex */
				this.$store.commit('addHunQingObj', {
					name: this.myHQSearchObj.hunQingKey,
					id: this.myHQSearchObj.HQChoiceObj.id
				});
				uni.navigateTo({
					url: '../addHunQing/addHunQing'
				});
			},
			/* 选择婚庆 */
			choiceHQ(obj) {
				/* 选择后保存选中的对象 */
				this.myHQSearchObj.HQChoiceObj = obj.itemObj;
				this.$store.commit('addHunQingObj', obj.itemObj);
				/* 选择后隐藏列表框 */
				if (obj.flag) {
					setTimeout(() => {
						this.myHQSearchObj.isShowListBox = false;
					})
				}
			},
			/* 婚庆选择 */
			HQFocus(obj) {
				this.myHQSearchObj.hunQingKey = obj.val;
				this.myHQSearchObj.showLoading = true;
				this.myHQSearchObj.isShowListBox = true;
				this.myHotelSearchObj.isShowListBox = false;
				this.myCitySearchObj.isShowListBox = false;
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderWeddingInfo';
				let data = {
					WeddingName: obj.val,
					PageIndex: 1, //第1页 （固定）
					PageSize: 20, //每次返回10条数据
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.myHQSearchObj.showLoading = false;
							let newRes = res.data.data.map((item) => {
								return {
									name: item.WeddingName,
									id: item.WeddingId,
									isSelected: false,
								}
							});
							newRes = this.isSelected('HQ', newRes);
							this.myHQSearchObj.listData = newRes;
						}
					},
				})
			},
			/* 创建酒店 */
			createHotel() {
				/* 判断是否输入框有内容 并赋值--vuex */
				this.$store.commit('addHotelObj', {
					name: this.myHotelSearchObj.hotelKey,
					id: this.myHotelSearchObj.hotelChoiceObj.id
				})
				uni.navigateTo({
					url: '../addHotel/addHotel'
				});
			},
			/* 选择酒店 */
			choiceHotel(obj) {
				/* 选择后保存选中的对象 */
				this.myHotelSearchObj.hotelChoiceObj = obj.itemObj;
				this.$store.commit('addHotelObj', obj.itemObj);
				/* 选择后隐藏列表框 */
				if (obj.flag) {
					setTimeout(() => {
						this.myHotelSearchObj.isShowListBox = false;
					})
				}
			},
			/* 酒店选择 */
			hotelFocus(obj) {
				this.myHotelSearchObj.hotelKey = obj.val;
				this.myHotelSearchObj.showLoading = true;
				this.myHotelSearchObj.isShowListBox = true;
				this.myCitySearchObj.isShowListBox = false;
				this.myHQSearchObj.isShowListBox = false;
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetCameraHotelListInfo';
				let data = {
					HotelName: obj.val,
					PageIndex: 1, //第1页 （固定）
					PageSize: 20, //每次返回20条数据
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.myHotelSearchObj.showLoading = false;
							let newRes = res.data.data.map((item) => {
								return {
									name: item.HotelName,
									id: item.HotelId,
									isSelected: false,
								}
							});
							newRes = this.isSelected('hotel', newRes);
							this.myHotelSearchObj.listData = newRes;
						}
					},
				})
			},
			/* 选择城市 */
			choiceCity(obj) {
				/* 选择后保存选中的对象 */
				this.myCitySearchObj.cityChoiceObj = obj.itemObj;
				/* 选择后隐藏列表框 */
				if (obj.flag) {
					setTimeout(() => {
						this.myCitySearchObj.isShowListBox = false;
					})
				}
			},
			/* 城市选择 */
			cityFocus(obj) { //obj-val是文本inputSearch2Text obj-type是类型(搜索/筛选)
				this.myCitySearchObj.showLoading = true;
				this.myCitySearchObj.isShowListBox = true;
				this.myHotelSearchObj.isShowListBox = false;
				this.myHQSearchObj.isShowListBox = false;
				if (obj.type = 'inputFocus') {
					let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetCityList';
					this.$axios({
						method: 'POST',
						url: url,
						success(res) {
							if (res.data.status) {
								this.myCitySearchObj.showLoading = false;
								let newRes = res.data.data.map((item) => {
									return {
										name: item.CityName,
										id: item.CityId,
										isSelected: false
									}
								});
								newRes = this.isSelected('city', newRes);
								this.filterCity(newRes, obj.val);
								if (obj.val == '') {
									this.myCitySearchObj.isShowListBox = true;
								}
							}
						},
					})
				} else {
					this.filterCity(this.myCitySearchObj.listData, obj.val);
				}
			},
			filterCity(data, searchVal) {
				let filterData = data.filter(item => {
					if (item.name.indexOf(searchVal) != -1) {
						return item;
					}
				});
				this.myCitySearchObj.listData = filterData;
			},
			/* 判断是否有选中的选项 */
			isSelected(type, arrObj) {
				if (type == 'city') {
					arrObj.forEach((item, index, arr) => {
						arr[index].isSelected = false;
						if (arr[index].id == this.myCitySearchObj.cityChoiceObj.id) {
							arr[index].isSelected = true;
						}
					})
				} else if (type == 'hotel') {
					arrObj.forEach((item, index, arr) => {
						arr[index].isSelected = false;
						if (arr[index].id == this.myHotelSearchObj.hotelChoiceObj.id) {
							arr[index].isSelected = true;
						}
					})
				} else if (type == 'HQ') {
					arrObj.forEach((item, index, arr) => {
						arr[index].isSelected = false;
						if (arr[index].id == this.myHQSearchObj.HQChoiceObj.id) {
							arr[index].isSelected = true;
						}
					})
				}

				return arrObj;
			},

			/* 具体时间选择 */
			getValue_time(val) {
				this.myTimeSelectObj.isSelectedObj = val;
			},
			/* 项目选择 */
			getValue_XM(obj) {
				this.myXMSelectObj.array.forEach(item => {
					if (obj.value == item.value) {
						this.myXMSelectObj.XMAmount = item.ProjectAmount;
						this.myXMSelectObj.XMIDstr = item.value;
						this.myXMSelectObj.XMNamestr = item.label;
					}
				})
				this.getXMAllAmount('xm')
			},
			/* 项目总金额计算 */
			getXMAllAmount(type) {
				if (type == 'xm') {
					this.myPriceInputObj.inputValue = this.myXMSelectObj.XMAmount + this.FJXMObj.FJXMAmount;
					this.$refs.myinput_price.inputText = this.myXMSelectObj.XMAmount + this.FJXMObj.FJXMAmount;

				} else if (type == 'fjxm') {
					this.myPriceInputObj.inputValue = (this.myXMSelectObj.XMAmount + this.FJXMObj.FJXMAmount) == 0 ? '' : this.myXMSelectObj
						.XMAmount + this.FJXMObj.FJXMAmount;
					this.$refs.myinput_price.inputText = (this.myXMSelectObj.XMAmount + this.FJXMObj.FJXMAmount) == 0 ? '' : this.myXMSelectObj
						.XMAmount + this.FJXMObj.FJXMAmount;;

				}
			},
			/* 附加项目 */
			openFJSelectList() {
				this.FJXMObj.showSidePopup = !this.FJXMObj.showSidePopup; //显示滑块
			},
			/* 选择该附加项目 */
			choiceThisFJXM(itemObj) {
				itemObj.isSelected = !itemObj.isSelected;
				this.sureXMSelected();
			},
			/* 判断哪些项目被选中 */
			sureXMSelected() {
				this.FJXMObj.selectedArray = [];
				this.FJXMObj.array.forEach(item => {
					if (item.isSelected) {
						this.FJXMObj.selectedArray.push(item);
					}
				});
				let FJXMIDstr = '';
				let FJXMAmount = 0;
				this.FJXMObj.selectedArray.forEach(item => {
					FJXMIDstr += item.id + ',';
					FJXMAmount += item.ProjectAmount
				});
				this.FJXMObj.FJXMIDstr = FJXMIDstr;
				this.FJXMObj.FJXMAmount = FJXMAmount;
				this.getXMAllAmount('fjxm')
			},
			/* 清除选项 */
			clearThisSelect(itemObj) {
				this.FJXMObj.array.forEach(item => {
					if (item.id == itemObj.id) {
						item.isSelected = false;
					}
				});
				this.sureXMSelected();
			},

			/* 来源 */
			openLaiYuanSelectList(val) {
				this.myLaiYuanObj.showSidePopup = !this.myLaiYuanObj.showSidePopup; //显示滑块
			},
			/* 选择来源 */
			choiceThisLaiYuan(itemObj) {
				itemObj.isSelected = !itemObj.isSelected;
				this.sureLaiYuanSelected();
			},
			/* 判断哪些来源被选中 */
			sureLaiYuanSelected() {
				this.myLaiYuanObj.selectedArray = [];
				this.myLaiYuanObj.array.forEach(item => {
					if (item.isSelected) {
						this.myLaiYuanObj.selectedArray.push(item);
					}
				});
				let laiYuanIDstr = '';
				this.myLaiYuanObj.selectedArray.forEach(item => {
					laiYuanIDstr += item.id + ',';
				});
				this.myLaiYuanObj.laiYuanIDstr = laiYuanIDstr
			},
			/* 清除选项 */
			clearThisLaiYuanSelect(itemObj) {
				this.myLaiYuanObj.array.forEach(item => {
					if (item.id == itemObj.id) {
						item.isSelected = false;
					}
				});
				this.sureLaiYuanSelected();
			},

			/* 订单加急 */
			getValue_fast(val) {
				// console.log('订单加急',val)
				this.myOrderFastSelectObj.isSelectedObj = val;
			},
			hide() {
				this.myCitySearchObj.isShowListBox = false;
				this.myHotelSearchObj.isShowListBox = false;
				this.myHQSearchObj.isShowListBox = false;
			},
			name(type) {
				if (type == '1-1' || type == '2-1') {
					this.$refs.setpicker1.confirm(this.timeValue1);
					this.shixian1 = true;
				} else {
					this.$refs.setpicker2.confirm(this.timeValue2);
					this.shixian2 = true;
				}
			},
			quxiaobutton() {
				this.shixian1 = false;
				this.shixian2 = false;
			},
			quedingbutton1(bangdingyear, bangdingmonth, bangdingday) {
				this.quxiaobutton();
				this.timeValue1 = bangdingyear + "." + bangdingmonth + "." + bangdingday;
			},
			quedingbutton2(bangdingyear, bangdingmonth, bangdingday) {
				this.quxiaobutton();
				this.timeValue2 = bangdingyear + "." + bangdingmonth + "." + bangdingday;
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
		onLoad(option) {
			uni.hideShareMenu();//隐藏分享按钮
			this.orderId = option.orderId;
			this.orderType = parseInt(option.orderType); // 1.婚礼拍摄 2.活动拍摄
			this.type = option.type;
			if (this.type == 'update') {
				this.$nextTick(() => {
					this.getDefaultData();
				})
				uni.setNavigationBarTitle({
					title: '修改订单-基本信息'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '添加订单-基本信息'
				});
			}
			this.getXMData();
			this.getSourceData();
		},
		onShow() {
			this.submitFlag = true;
			if (this.orderType == 1) {
				this.$nextTick(() => {
					/* 新增酒店 */
					let addHotelObj = this.$store.state.addHotelObj;
					this.$refs.myInputSearch1_hotel.inputSearch1Text = addHotelObj.name;
					this.$refs.myInputSearch1_hotel.choiceObj = {
						id:addHotelObj.id,
						name:addHotelObj.name
					};
					/* 新增婚庆 */
					let addHunQingObj = this.$store.state.addHunQingObj;
					this.$refs.myInputSearch1_HQ.inputSearch1Text = addHunQingObj.name;
					this.$refs.myInputSearch1_HQ.choiceObj = {
						id:addHunQingObj.id,
						name:addHunQingObj.name
					};
					setTimeout(() => {
						this.myHotelSearchObj.hotelChoiceObj = addHotelObj;
						this.myHQSearchObj.HQChoiceObj = addHunQingObj;
						this.myHotelSearchObj.isShowListBox = false;
						this.myHQSearchObj.isShowListBox = false;
					})
					let backPageType = this.$store.state.backPageType;
					if (backPageType == 'addHotelSuccess') {
						this.showTip('创建酒店成功', 'success');
						this.$store.commit('keepBackPageType', '')
					} else if (backPageType == 'addHQSuccess') {
						this.showTip('创建公司成功', 'success');
						this.$store.commit('keepBackPageType', '')
					}
				})
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
		watch: {
			myPriceInputObj: {
				deep: true,
				handler(val) {
					this.$refs.myinput_price.inputText = val.inputValue;
				}
			},
			controlArr(val) {
				if (this.orderType == 1) {
					if (val[0] != '' && val[1] != '' && val[2] != '' && val[3] != '' && val[4]) {
						this.btnShowPassColor = true;
					} else {
						this.btnShowPassColor = false;
					}
				} else {
					if (val[1] != '' && val[2] != '' && val[3] != '' && val[4]) {
						this.btnShowPassColor = true;
					} else {
						this.btnShowPassColor = false;
					}
				}

			},
			/* 具体时间 */
			myTimeSelectObj: {
				deep: true,
				handler(val) {
					if (val.isSelectedObj.label) {
						this.controlArr.splice(0, 1, val.isSelectedObj.label)
					} else {
						this.controlArr.splice(0, 1, '')
					}
				}
			},
			/* 城市选择 */
			myCitySearchObj: {
				deep: true,
				handler(val) {
					if (val.cityChoiceObj.id) {
						this.controlArr.splice(1, 1, val.cityChoiceObj.id)
					} else {
						this.controlArr.splice(1, 1, '')
					}
				}
			},

			/* 项目*/
			myXMSelectObj: {
				deep: true,
				handler(val) {
					if (val.XMIDstr != '') {
						this.controlArr.splice(2, 1, val.XMIDstr)
					} else {
						this.controlArr.splice(2, 1, '')
					}
				}
			},

			/* 金额*/
			myPriceInputObj: {
				deep: true,
				handler(val) {
					if (val.inputValue != '') {
						this.controlArr.splice(3, 1, val.inputValue)
					} else {
						this.controlArr.splice(3, 1, '')
					}
				}
			},

			/* 来源*/
			myLaiYuanObj: {
				deep: true,
				handler(val) {
					if (val.laiYuanIDstr != '') {
						this.controlArr.splice(4, 1, val.laiYuanIDstr)
					} else {
						this.controlArr.splice(4, 1, '')
					}
				}
			},
		}
	}
</script>

<style scoped>
	.set {
		width: 100%;
	}

	.set button {
		width: 50%;
		float: right;
		line-height: 60upx;
	}

	.zhi {
		width: 50%;
		float: left;
		line-height: 60upx;
	}

	/* 内容 */
	#addOrder {
		padding: 10upx 40upx 140upx;
	}

	.oneWord {
		width: 13upx;
		display: inline-block;
	}

	.twoWord {
		width: 53upx;
		display: inline-block;
	}

	.textareaBox {
		display: flex;
		align-items: center;
		height: auto;
		padding: 37upx 55upx 37upx 45upx;
	}

	.order-btn {
		margin-top: 130upx;
	}

	.FJXMBox {
		height: 105upx;
		white-space: nowrap;
		overflow-x: auto;
		width: 456upx;
	}

	.FJXMBox input {
		height: 105upx;
		line-height: 105upx;
	}

	.FJXMBox .selectTagBox {
		display: inline-block;
		height: 61upx;
		line-height: 61upx;
		padding: 0 10upx;
		margin-right: 16upx;
		background: #f0f4fa;
		color: #5996f8;
		border-radius: 2px;
		font-size: 26upx;
		font-weight: normal;
	}

	.FJXMBox .selectTagBox .clearIcon {
		vertical-align: -6upx;
		margin-left: 12upx;
	}

	.FJXMList {
		color: #222222;
		font-size: 28upx;
		padding: 22upx 75upx;
		position: relative;
	}

	.thisIsSelected {
		color: #3196FA;
	}

	.successIcon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 75upx;
	}
</style>
