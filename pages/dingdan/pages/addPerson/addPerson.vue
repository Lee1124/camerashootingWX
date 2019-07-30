<template>
	<view class="addPerson" @click="hide">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<!-- /导航栏阴影 -->
		<!-- 岗位选择 -->
		<view class="list">
			<view class="list-left-label">岗 <view class="twoWord"></view>位</view>
			<view class="list-right-form">
				<mySelect :mySelectObj='myGWSelectObj' @selectConfirm='getValue_GW'></mySelect>
			</view>
		</view>
		<!-- /岗位选择 -->
		<!-- 人员选择 -->
		<view class="list">
			<view class="list-left-label">人 <view class="twoWord"></view>员</view>
			<view class="list-right-form">
				<myInputSearch2 @inputSearch2Focus='personFocus' @choiceThis='choicePerson' :myInputSearch2Obj='myPersonSearchObj'
				 ref='myInputSearch2_person'></myInputSearch2>
			</view>
		</view>
		<!-- /人员选择-->

		<!-- 说明-->
		<!-- <view class="list">
			<view class="list-left-label">说 <text class="twoWord"></text>明</view>
			<view class="list-right-form textAreaBox">
				<view class="textArea" @click="openEditModal">
					<input type="text" v-if="personRemarkObj.textAreaValue==''" disabled="true" placeholder="想要说点什么（多行文本）...">
					{{personRemarkObj.textAreaValue}}
				</view>
			</view>
		</view> -->
		<!-- /说明 -->

		<!-- 说明模态框 -->
		<!-- <myModal :show="personRemarkObj.isShowModal" @close="cancel_modal" title="填写人员说明" @cancel="cancel_modal" @confirm="confirm_modal('hunQingRemark')">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea v-show="personRemarkObj.isShowModal" v-model="personRemarkObj.modalTextAreaValue" placeholder="想要说点什么（多行文本）..."
				 style="background: #F5F5F5;width: 430upx;height:190upx;margin: 0 auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal> -->
		<!-- /说明模态框 -->

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
				message: '',
				/* 订单id */
				orderId: '',
				btnShowPassColor: false,
				/* 保存所填的数据  为了监控 */
				controlArr: ['', '', ''],
				/* 岗位选择 */
				myGWSelectObj: {
					mySelectPlaceholder: '请选择岗位',
					array: [],
					index: 0,
					isSelectedObj: {},
				},

				/* 人员选择 */
				myPersonSearchObj: {
					showLoading: true,
					isShowListBox: false,
					myIputPlaceholder: '请输入人员名字进行搜索',
					listData: [],
					/* 选择的人员对象(name和id) */
					personChoiceObj: {},
					site: 'bottom',
				},

				/* 说明 */
				personRemarkObj: {
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
			/* 保存添加 */
			confirm() {
				this.$show('正在保存');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/AddOrDeleteCameraOrderPostInfo';
				let myGWSelectObj = this.myGWSelectObj.isSelectedObj;
				let personChoiceObj = this.myPersonSearchObj.personChoiceObj;

				if (myGWSelectObj.value == undefined) {
					this.showTip('请选择岗位');
					return false;
				} else if (personChoiceObj.id == undefined) {
					this.showTip('请选择人员');
					return false;
				}
				let data = {
					OrderId: this.orderId,
					Type: 'add',
					UpdateUserId: personChoiceObj.id,
					PostId: myGWSelectObj.value,
				}
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						this.$hide();
						if (res.data.status) {
							uni.navigateBack({
								delta: 1
							});
							this.$store.commit('keepBackPageType','addPerson')
						}else{
							this.message = res.data.msg;
							this.$refs.anRef.show();
						}
					},
				})
			},
			/* 岗位列表 */
			getGangWei() {
				let isCanEditArr = this.$store.state.isCanEditArr;
				console.log(isCanEditArr)
				let newRes = isCanEditArr.map((item) => {
					return {
						label: item.PostName,
						value: item.PostId,
					}
				});
				this.myGWSelectObj.array = newRes;
			},
			/* 岗位选择 */
			getValue_GW(val) {
				this.myGWSelectObj.isSelectedObj = val;
				this.controlArr.splice(0, 1, val);
			},
			/* 选择人员 */
			choicePerson(obj) {
				/* 选择后保存选中的对象 */
				this.myPersonSearchObj.personChoiceObj = obj.itemObj;
				if (obj.itemObj.id == undefined) {
					this.controlArr.splice(1, 1, '');
				} else {
					this.controlArr.splice(1, 1, obj.itemObj.name);
				}
				/* 选择后隐藏列表框 */
				if (obj.flag) {
					setTimeout(() => {
						this.myPersonSearchObj.isShowListBox = false;
					})
				}
			},
			/* 人员选择 */
			personFocus(obj) {
				// this.controlArr.splice(1, 1, 2);
				this.myPersonSearchObj.showLoading = true;
				this.myPersonSearchObj.isShowListBox = true;
				if (obj.type = 'inputFocus') {
					let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetUserInfoByDepartmentOrLikeName';
					this.$axios({
						method: 'POST',
						url: url,
						success(res) {
							if (res.data.status) {
								this.myPersonSearchObj.showLoading = false;
								let newRes = res.data.data.map((item) => {
									return {
										name: item.UserName,
										id: item.UserId,
										isSelected: false
									}
								});
								newRes = this.isSelected('person', newRes);
								this.filterPerson(newRes, obj.val);
								if (obj.val == '') {
									this.myPersonSearchObj.isShowListBox = true;
								}
							}
						},
					})
				} else {
					this.filterPerson(this.myPersonSearchObj.listData, obj.val);
				}
			},
			filterPerson(data, searchVal) {
				let filterData = data.filter(item => {
					if (item.name.indexOf(searchVal) != -1) {
						return item;
					}
				});
				this.myPersonSearchObj.listData = filterData;
			},

			/* 判断是否有选中的选项 */
			isSelected(type, arrObj) {
				if (type == 'person') {
					arrObj.forEach((item, index, arr) => {
						arr[index].isSelected = false;
						if (arr[index].id == this.myPersonSearchObj.personChoiceObj.id) {
							arr[index].isSelected = true;
						}
					})
				}
				return arrObj;
			},

			/* input输入文本--婚庆名称 */
			inputTextChange_hunQingName(val) {
				this.myHunQingNameInputObj.inputValue = val;
				// console.log(this.myHunQingNameInputObj.inputValue)
			},
			/* 确认婚庆地址 */
			confirm_modal() {
				this.personRemarkObj.isShowModal = false;
				this.personRemarkObj.textAreaValue = this.personRemarkObj.modalTextAreaValue;
			},
			/* 打开弹框 */
			openEditModal() {
				this.personRemarkObj.modalTextAreaValue = this.personRemarkObj.textAreaValue;
				this.personRemarkObj.isShowModal = true;
			},

			/* 关闭模态框 */
			cancel_modal() {
				this.personRemarkObj.isShowModal = false;
				this.personRemarkObj.modalTextAreaValue = '';
			},

			hide() {
				this.myPersonSearchObj.isShowListBox = false;
			},
		},
		onLoad(option) {
			uni.hideShareMenu();//隐藏分享按钮
			this.getGangWei();
			this.orderId = option.orderId; //订单ID
			uni.setNavigationBarTitle({
				title: '添加人员'
			});
		},
		onShow() {},
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
				if (val[0] != '' && val[1] != '') {
					this.btnShowPassColor = true;
				} else {
					this.btnShowPassColor = false;
				}
			},
		}
	}
</script>

<style scoped>
	.addPerson {
		padding: 10upx 40upx 140upx;
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
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
