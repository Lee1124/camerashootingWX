<template>
	<view class="addHotel" @click="hide">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<!-- /导航栏阴影 -->
		<!-- 城市选择 -->
		<view class="list">
			<view class="list-left-label">城 <view class="twoWord"></view>市</view>
			<view class="list-right-form">
				<myInputSearch2 @inputSearch2Focus='cityFocus' @choiceThis='choiceCity' :myInputSearch2Obj='myCitySearchObj' ref='myInputSearch2_city'></myInputSearch2>
			</view>
		</view>
		<!-- / 城市选择-->

		<!-- 酒店名称 -->
		<view class="list">
			<view class="list-left-label">酒 <view class="twoWord"></view>店</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_hotelName" :myInputObj='myHotelNameInputObj' ref='myinput_hotelName'></myinput>
			</view>
		</view>
		<!-- /酒店名称 -->

		<!-- 酒店地址-->
		<view class="list">
			<view class="list-left-label">地<view class="twoWord"></view>址</view>
			<view class="list-right-form textAreaBox">
				<view class="textArea" @click="openEditModal('address')">
					<input type="text" v-if="hotelAddressObj.textAreaValue==''"  placeholder-style='color:#BBB;' disabled="true" placeholder="请输入酒店地址...">
					{{hotelAddressObj.textAreaValue}}
				</view>
			</view>
		</view>
		<!-- /酒店地址 -->

		<!-- 酒店地址模态框 -->
		<myModal :show="hotelAddressObj.isShowModal" @close="cancel_modal" title="填写酒店地址" @cancel="cancel_modal" @confirm="confirm_modal('address')">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea v-show="hotelAddressObj.isShowModal"  placeholder-style='color:#BBB;' v-model="hotelAddressObj.modalTextAreaValue" placeholder="请输入酒店地址..."
				 style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /酒店地址模态框 -->

		<!-- 酒店说明-->
		<view class="list">
			<view class="list-left-label">酒店说明</view>
			<view class="list-right-form textAreaBox">
				<view class="textArea" @click="openEditModal('hotelRemark')">
					<input type="text" v-if="hotelRemarkObj.textAreaValue==''" placeholder-style='color:#BBB;' disabled="true" placeholder="请输入酒店说明...">
					{{hotelRemarkObj.textAreaValue}}
				</view>
			</view>
		</view>
		<!-- /酒店说明 -->

		<!-- 酒店说明模态框 -->
		<myModal :show="hotelRemarkObj.isShowModal" @close="cancel_modal" title="填写酒店说明" @cancel="cancel_modal" @confirm="confirm_modal('hotelRemark')">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="hotelRemarkObj.isShowModal" placeholder-style='color:#BBB;' v-model="hotelRemarkObj.modalTextAreaValue" placeholder="请输入酒店说明..."
				 style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /酒店说明模态框 -->
		<!-- 按钮 -->
		<button class="comoon-order-btn order-btn" :class="{btnPassStyle:btnShowPassColor}" @click="confirm">保存</button>
		<!-- /按钮 -->

		<!-- 提示框 -->
		<!-- <myTipsLayer ref="anRef" timer="3" type="error">
			<text>{{message}}</text>
		</myTipsLayer> -->
		
		<!-- 提示框 -->
		<myTipsLayer2 ref="anRef" timer="10" autoClose="true"></myTipsLayer2>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				/* 保存所填的数据  为了监控 */
				controlArr: ['', '', ''],
				/* 控制按钮的颜色*/
				btnShowPassColor: false,
				/* 提示文字 */
				message: '',
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
				/* 酒店名称 */
				myHotelNameInputObj: {
					myIputPlaceholder: '请输入酒店名称',
					inputValue: '', //输入的文本
				},
				/* 酒店地址 */
				hotelAddressObj: {
					textAreaValue: '',
					isShowModal: false,
					modalTextAreaValue: '',
				},

				/* 酒店说明 */
				hotelRemarkObj: {
					textAreaValue: '',
					isShowModal: false,
					modalTextAreaValue: '',
				},
			}
		},
		methods: {
			showTip(msg, type = 'error') {
				this.$refs.anRef.show(msg, {type: type});
			},
			/* 创建--保存 */
			confirm() {
				let cityChoiceObj = this.myCitySearchObj.cityChoiceObj; //选择的城市对象
				let hotelName = this.myHotelNameInputObj.inputValue; //酒店名称
				let hotelAddress = this.hotelAddressObj.textAreaValue; //酒店地址
				let hotelRmark = this.hotelRemarkObj.textAreaValue; //酒店说明
				if (cityChoiceObj.id == undefined) {
					this.showTip('请选择城市');
					return false;
				} else if (hotelName == '') {
					this.showTip('请输入酒店名称');
					return false;
				} else if (hotelAddress == '') {
					this.showTip('请输入酒店地址');
					return false;
				}
				let data = {
					HotelName: hotelName,
					CityId: cityChoiceObj.id,
					HotelAddress: hotelAddress,
					Remark: hotelRmark,
					Type: 'add',
				};
				this.addHotelRequest(data);
			},
			//增加酒店请求
			addHotelRequest(data) {
				this.$show('正在保存');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/AddCameraHotelInfo';
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.$hide();
							// console.log(res)
							/* 返回的内容 赋值给全局--vuex */
							this.$store.commit('addHotelObj',{name: res.data.data.HotelName,id:res.data.data.HotelId});/* res.data.data */
							uni.navigateBack({
								delta: 1
							});
							this.$store.commit('keepBackPageType','addHotelSuccess')
						}else{
							this.$hide();
							this.showTip(res.data.msg);
							return false;
						}
					}
				})
			},

			/* 确认酒店地址 */
			confirm_modal(type) {
				if (type == 'address') {
					this.hotelAddressObj.isShowModal = false;
					this.hotelAddressObj.textAreaValue = this.hotelAddressObj.modalTextAreaValue;
					this.controlArr.splice(2, 1, this.hotelAddressObj.modalTextAreaValue);
				} else if (type == 'hotelRemark') {
					this.hotelRemarkObj.isShowModal = false;
					this.hotelRemarkObj.textAreaValue = this.hotelRemarkObj.modalTextAreaValue;
				}
			},
			/* 打开弹框 */
			openEditModal(type) {
				if (type == 'address') {
					this.hotelAddressObj.modalTextAreaValue = this.hotelAddressObj.textAreaValue;
					this.hotelAddressObj.isShowModal = true;
				} else if (type == 'hotelRemark') {
					this.hotelRemarkObj.modalTextAreaValue = this.hotelRemarkObj.textAreaValue;
					this.hotelRemarkObj.isShowModal = true;
				}
			},
			/* 关闭模态框 */
			cancel_modal() {
				this.hotelAddressObj.isShowModal = false;
				this.hotelAddressObj.modalTextAreaValue = '';
				this.hotelRemarkObj.isShowModal = false;
				this.hotelRemarkObj.modalTextAreaValue = '';
			},

			/* input输入文本--酒店名称 */
			inputTextChange_hotelName(val) {
				this.myHotelNameInputObj.inputValue = val;
				this.controlArr.splice(1, 1, val);
			},
			/* 选择城市 */
			choiceCity(obj) {
				/* 选择后保存选中的对象 */
				this.myCitySearchObj.cityChoiceObj = obj.itemObj;
				if (obj.itemObj.id == undefined) {
					this.controlArr.splice(0, 1, '');
				} else {
					this.controlArr.splice(0, 1, obj.itemObj.name);
				}
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
				}
				return arrObj;
			},
			hide() {
				this.myCitySearchObj.isShowListBox = false;
			},
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: '创建新酒店'
			});
			uni.hideShareMenu();//隐藏分享按钮
		},
		onShow() {
			this.myHotelNameInputObj.inputValue = this.$store.state.addHotelObj.name;
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
			controlArr(val) {
				// console.log(val)
				if (val[0] != '' && val[1] != '' && val[2] != '') {
					this.btnShowPassColor = true;
				} else {
					this.btnShowPassColor = false;
				}
			},
			myHotelNameInputObj: {
				deep: true,
				handler(val) {
					this.$refs.myinput_hotelName.inputText = val.inputValue;
				}
			}
		}
	}
</script>

<style scoped>
	.addHotel {
		padding: 10upx 40upx 140upx;
	}

	.order-btn {
		margin-top: 250upx;
	}
</style>
