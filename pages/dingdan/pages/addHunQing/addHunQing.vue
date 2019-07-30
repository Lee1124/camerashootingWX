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

		<!-- 婚庆名称 -->
		<view class="list">
			<view class="list-left-label">婚 <view class="twoWord"></view>庆</view>
			<view class="list-right-form">
				<myinput @inputTextChange="inputTextChange_hunQingName" :myInputObj='myHunQingNameInputObj' ref='myinput_hunQingName'></myinput>
			</view>
		</view>
		<!-- /婚庆名称 -->

		<!-- 婚庆地址-->
		<view class="list">
			<view class="list-left-label">地<view class="twoWord"></view>址</view>
			<view class="list-right-form textAreaBox">
				<view class="textArea" @click="openEditModal('address')">
					<input type="text" v-if="hunQingAddressObj.textAreaValue==''" placeholder-style='color:#BBB;' disabled="true"
					 placeholder="请输入婚庆地址...">
					{{hunQingAddressObj.textAreaValue}}
				</view>
			</view>
		</view>
		<!-- /婚庆地址 -->

		<!-- 婚庆地址模态框 -->
		<myModal :show="hunQingAddressObj.isShowModal" @close="cancel_modal" title="填写婚庆地址" @cancel="cancel_modal" @confirm="confirm_modal('address')">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="hunQingAddressObj.isShowModal" placeholder-style='color:#BBB;' v-model="hunQingAddressObj.modalTextAreaValue"
				 placeholder="请输入酒店地址..." style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /婚庆地址模态框 -->

		<!-- 婚庆说明-->
		<view class="list">
			<view class="list-left-label">婚庆说明</view>
			<view class="list-right-form textAreaBox">
				<view class="textArea" @click="openEditModal('hunQingRemark')">
					<input type="text" v-if="hunQingRemarkObj.textAreaValue==''" placeholder-style='color:#BBB;' disabled="true"
					 placeholder="请输入婚庆说明...">
					{{hunQingRemarkObj.textAreaValue}}
				</view>
			</view>
		</view>
		<!-- /婚庆说明 -->

		<!-- 婚庆说明模态框 -->
		<myModal :show="hunQingRemarkObj.isShowModal" @close="cancel_modal" title="填写婚庆说明" @cancel="cancel_modal" @confirm="confirm_modal('hunQingRemark')">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="hunQingRemarkObj.isShowModal" placeholder-style='color:#BBB;' v-model="hunQingRemarkObj.modalTextAreaValue"
				 placeholder="请输入婚庆说明..." style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /婚庆说明模态框 -->
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
				/* 婚庆名称 */
				myHunQingNameInputObj: {
					myIputPlaceholder: '请输入婚庆名称',
					inputValue: '', //输入的文本
				},
				/* 婚庆地址 */
				hunQingAddressObj: {
					textAreaValue: '',
					isShowModal: false,
					modalTextAreaValue: '',
				},

				/* 婚庆说明 */
				hunQingRemarkObj: {
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
				let HQName = this.myHunQingNameInputObj.inputValue; //婚庆名称
				let HQAddress = this.hunQingAddressObj.textAreaValue; //婚庆地址
				let HQRmark = this.hunQingRemarkObj.textAreaValue; //婚庆说明
				if (cityChoiceObj.id == undefined) {
					this.showTip('请选择城市');
					return false;
				} else if (HQName == '') {
					this.showTip('请输入婚庆名称');
					return false;
				} else if (HQAddress == '') {
					this.showTip('请输入婚庆地址');
					return false;
				}
				let data = {
					WeedingName: HQName,
					CityId: cityChoiceObj.id,
					WeedingAddress: HQAddress,
					Remark: HQRmark,
					Type: 'add',
				};
				this.addHotelRequest(data);
			},
			//增加婚庆请求
			addHotelRequest(data) {
				this.$show('正在保存');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/AddCameraWeedingInfo';
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.$hide();
							// console.log(res)
							/* 返回的内容 赋值给全局--vuex */
							this.$store.commit('addHunQingObj', {
								name: res.data.data.WeddingName,
								id: res.data.data.WeddingId
							}); /* res.data.data */
							uni.navigateBack({
								delta: 1
							});
							this.$store.commit('keepBackPageType', 'addHQSuccess')
						} else {
							this.$hide();
							this.showTip(res.data.msg);
							return false;
						}
					}
				})
			},
			/* input输入文本--婚庆名称 */
			inputTextChange_hunQingName(val) {
				this.myHunQingNameInputObj.inputValue = val;
				this.controlArr.splice(1, 1, val);
			},
			/* 确认婚庆地址 */
			confirm_modal(type) {
				if (type == 'address') {
					this.hunQingAddressObj.isShowModal = false;
					this.hunQingAddressObj.textAreaValue = this.hunQingAddressObj.modalTextAreaValue;
					this.controlArr.splice(2, 1, this.hunQingAddressObj.modalTextAreaValue);
				} else if (type == 'hunQingRemark') {
					this.hunQingRemarkObj.isShowModal = false;
					this.hunQingRemarkObj.textAreaValue = this.hunQingRemarkObj.modalTextAreaValue;
				}
			},
			/* 打开弹框 */
			openEditModal(type) {
				if (type == 'address') {
					this.hunQingAddressObj.modalTextAreaValue = this.hunQingAddressObj.textAreaValue;
					this.hunQingAddressObj.isShowModal = true;
				} else if (type == 'hunQingRemark') {
					this.hunQingRemarkObj.modalTextAreaValue = this.hunQingRemarkObj.textAreaValue;
					this.hunQingRemarkObj.isShowModal = true;
				}
			},
			/* 关闭模态框 */
			cancel_modal() {
				this.hunQingAddressObj.isShowModal = false;
				this.hunQingAddressObj.modalTextAreaValue = '';
				this.hunQingRemarkObj.isShowModal = false;
				this.hunQingRemarkObj.modalTextAreaValue = '';
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
				title: '创建新婚庆'
			});
			uni.hideShareMenu();//隐藏分享按钮
		},
		onShow() {
			this.myHunQingNameInputObj.inputValue = this.$store.state.addHunQingObj.name;
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
				if (val[0] != '' && val[1] != '' && val[2] != '') {
					this.btnShowPassColor = true;
				} else {
					this.btnShowPassColor = false;
				}
			},
			myHunQingNameInputObj: {
				deep: true,
				handler(val) {
					this.$refs.myinput_hunQingName.inputText = val.inputValue;
				}
			}
		}
	}
</script>

<style scoped>
	.addHotel {
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

	.order-btn {
		margin-top: 250upx;
	}
</style>
