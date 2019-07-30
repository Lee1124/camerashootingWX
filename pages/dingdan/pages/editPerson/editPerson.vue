<template>
	<view class="editPerson">
		<template v-for="(items,index) in personManageListData">
			<view class="personList" :key='index'>
				<view class="header">
					<view class="title">{{items.name}}</view>
					<view class="addText" @click="addPerson(items)" v-if="items.isCanEditArr.length!=0">
						<text class="addIcon">+</text>
						<text>添加人员</text>
					</view>
				</view>
				<view class="listContent">
					<template v-for="(items2,index2) in items.positionList">
						<view class=".listContent-inner" :key='index2'>
							<uni-swipe-action :options="items2.options" @click="bindClickDel(items2)">
								<view class='cont'>
									<text class="label">{{items2.PostName}}</text>
									<template v-for="(item3,index3) in items2.PostUserList">
										<text class="ct1" :key='index3'>{{item3.UserName}}<text class="dunhao">、</text>
										</text>
									</template>
								</view>
							</uni-swipe-action>
						</view>
					</template>
				</view>
			</view>
		</template>

		<!-- 提示框 -->
		<myTipsLayer ref="anRef" timer="3" type="error">
			<text>{{message}}</text>
		</myTipsLayer>

		<!-- 提示框2 -->
		<myTipsLayer ref="anRef_success" timer="3" type="success">
			<text>{{message2}}</text>
		</myTipsLayer>


		<!-- 模态框 -->
		<myModal :show="personObj.isShowModal" @close="cancel_modal" title="删除提示" @cancel="cancel_modal" @confirm="confirm_modal">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<view class="del-title">{{delTitle}}</view>
				<view class="del-list" v-if="delPersonList.length>1">
					<checkbox-group @change="checkboxChange">
						<template v-for="(items,index) in delPersonList">
							<label class="checkbox-label" :key='index'>
								<checkbox class="checkbox" color="#fff" :checked="items.checked" :value="items.UserId" />{{items.UserName}}
							</label>
						</template>
					</checkbox-group>
				</view>
				<view class="del-list oneDelPerson-list" v-if="delPersonList.length==1">
					<view class="oneDelPerson">{{text2}}{{delPersonList[0].UserName}}{{text2}}</view>
				</view>
			</view>
		</myModal>
		<!-- /模态框 -->
	</view>
</template>

<script>
	import uniSwipeAction from "@/components/uni-swipe-action/uni-swipe-action.vue"
	export default {
		data() {
			return {
				text2: '"',
				delTitle: '',
				orderId: '',
				message: '',
				message2: '',
				personManageListData: [{
						name: '【销售】',
						positionList: [],
						isCanEditArr: []
					},
					{
						name: '【拍摄】',
						positionList: [],
						isCanEditArr: []
					},
					{
						name: '【后期】',
						positionList: [],
						isCanEditArr: []
					},
					{
						name: '【客服】',
						positionList: [],
						isCanEditArr: []
					}
				],
				personObj: {
					isShowModal: false,
				},
				delPersonList: [], //删除人员列表
				delPersonUserIdStr: '', //移除人员id,多个用逗号隔开
			}
		},
		components: {
			uniSwipeAction
		},
		methods: {
			/* 确认模态框 */
			confirm_modal() {
				// console.log(this.delPersonUserIdStr)
				if (this.delPersonUserIdStr == '') {
					this.message = '请勾选要移除的人员'
					this.$refs.anRef.show();
					return false;
				} else {
					let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/DeleteCameraOrderPostsInfo';
					let data = {
						OrderId: this.orderId,
						UpdateUserId: this.delPersonUserIdStr
					}
					this.$axios({
						method: 'POST',
						url: url,
						data: data,
						success(res) {
							if (res.data.status) {
								this.message2 = '移除人员成功'
								this.$refs.anRef_success.show();
								this.personObj.isShowModal = false;
								this.getPersonDefaultList();
							}
						}
					})
				}
			},
			/* 关闭模态框 */
			cancel_modal() {
				this.personObj.isShowModal = false;
			},
			/* 选择人 */
			checkboxChange(e) {
				this.delPersonUserIdStr = e.detail.value.join(',');
			},
			/* 删除人员 */
			bindClickDel(itemObj) {
				// console.log(itemObj)
				this.delPersonUserIdStr = ''; //清空缓存移除人员
				if (!itemObj.IsCanEdit) {
					this.message = '您无权限删除'
					this.$refs.anRef.show();
					return false;
				} else if (itemObj.PostUserList.length === 0) {
					this.message = '无人员删除'
					this.$refs.anRef.show();
					return false;
				} else if (itemObj.IsCanEdit && itemObj.PostUserList.length != 0) {
					this.personObj.isShowModal = true;
					if (itemObj.PostUserList.length == 1) {
						this.delTitle = '确认要删除下列人员';
						this.delPersonList = itemObj.PostUserList;
						this.delPersonUserIdStr = this.delPersonList[0].UserId
					} else if (itemObj.PostUserList.length > 1) {
						this.delTitle = '请选择下列要删除的人员';
						this.delPersonList = itemObj.PostUserList;
					}
				}
			},
			/* 获取人员安排列表 */
			getPersonDefaultList() {
				this.$show('正在加载');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderPostUserList';
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
							this.personManageListData[0].positionList = res.data.data.XSList;
							this.personManageListData[0].isCanEditArr = [];
							this.personManageListData[1].isCanEditArr = [];
							this.personManageListData[2].isCanEditArr = [];
							this.personManageListData[3].isCanEditArr = [];
							this.personManageListData[0].positionList.forEach((item, index, arr) => {
								if (arr[index].IsCanEdit) {
									this.personManageListData[0].isCanEditArr.push(arr[index]);
									arr[index].options = [{
										text: '删除',
										style: {
											backgroundColor: '#FF0000',
											height: '100%'
										}
									}]
								} else {
									arr[index].options = [{
										text: '删除',
										style: {
											backgroundColor: '#BBB',
											height: '100%'
										}
									}]
								}
							})
							this.personManageListData[1].positionList = res.data.data.PSList;
							this.personManageListData[1].positionList.forEach((item, index, arr) => {
								if (arr[index].IsCanEdit) {
									this.personManageListData[1].isCanEditArr.push(arr[index]);
									arr[index].options = [{
										text: '删除',
										style: {
											backgroundColor: '#FF0000',
											height: '100%'
										}
									}]
								} else {
									arr[index].options = [{
										text: '删除',
										style: {
											backgroundColor: '#BBB',
											height: '100%'
										}
									}]
								}
							})
							this.personManageListData[2].positionList = res.data.data.HQList;
							this.personManageListData[2].positionList.forEach((item, index, arr) => {
								if (arr[index].IsCanEdit) {
									this.personManageListData[2].isCanEditArr.push(arr[index]);
									arr[index].options = [{
										text: '删除',
										style: {
											backgroundColor: '#FF0000',
											height: '100%'
										}
									}]
								} else {
									arr[index].options = [{
										text: '删除',
										style: {
											backgroundColor: '#BBB',
											height: '100%'
										}
									}]
								}
							})
							this.personManageListData[3].positionList = res.data.data.KFList;
							this.personManageListData[3].positionList.forEach((item, index, arr) => {
								if (arr[index].IsCanEdit) {
									this.personManageListData[3].isCanEditArr.push(arr[index]);
									arr[index].options = [{
										text: '删除',
										style: {
											backgroundColor: '#FF0000',
											height: '100%'
										}
									}]
								} else {
									arr[index].options = [{
										text: '删除',
										style: {
											backgroundColor: '#BBB',
											height: '100%'
										}
									}]
								}
							})
						}
					}
				})
			},
			/* 添加人员 */
			addPerson(itemObj) {
				this.$store.commit('keepIsCanEditArr', itemObj.isCanEditArr);
				uni.navigateTo({
					url: '../addPerson/addPerson?orderId=' + this.orderId
				});
			}
		},
		onLoad(option) {
			uni.hideShareMenu();//隐藏分享按钮
			this.orderId = option.orderId; //订单ID
			this.orderType = option.orderType; // 1.婚礼拍摄 2.活动拍摄
			this.type = option.type;
			uni.setNavigationBarTitle({
				title: '编辑订单-人员'
			})
		},
		onShow() {
			this.getPersonDefaultList();
			let backPageType = this.$store.state.backPageType;
			if (backPageType == 'addPerson') {
				this.message2 = '添加人员成功'
				this.$refs.anRef_success.show();
					this.$store.commit('keepBackPageType','')
			}
		}
	}
</script>

<style scoped>
	>>>.neil-modal__header {
		color: #999999;
		font-size: 28upx;
	}

	.del-title {
		color: #222222;
		font-size: 30upx;
		margin: 15upx 0 50upx;
		text-align: center;
	}

	>>>.checkbox .uni-checkbox-input,
	>>>.checkbox .wx-checkbox-input {
		border-radius: 50%;
	}

	>>>.checkbox .uni-checkbox-input.uni-checkbox-input-checked,
	>>>.checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		background: #3196FA;
		border-color: #3196FA;
	}

	.del-list {
		padding-left: 170upx;
	}

	.oneDelPerson-list {
		padding-left: 0;
		text-align: center;
	}

	.oneDelPerson {
		margin-bottom: 30upx;
	}

	.del-list .checkbox-label {
		display: block;
		margin-bottom: 30upx;
	}

	.editPerson {
		padding: 30upx 60upx;
		box-sizing: border-box;
	}

	.personList {
		width: 100%;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0 0 21px 0 rgba(0, 0, 0, 0.14);
		border-radius: 10upx;
		margin-bottom: 32upx;
		padding: 40upx 50upx;
		box-sizing: border-box;
	}

	.personList .header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10upx;
	}

	.personList .header .title {
		font-size: 28upx;
		color: #666666;
		margin-left: -14rpx;
	}

	.personList .header .addText {
		font-size: 24upx;
		color: #3196FA;
	}

	.personList .header .addText .addIcon {
		font-size: 28upx;
	}

	.listContent-inner {
		border-bottom: 1upx dashed #DDD;
	}

	.listContent-inner .cont {
		min-height: 90upx;
		line-height: 90upx;
	}

	.listContent-inner .label {
		font-size: 28upx;
		color: #666666;
		margin-right: 50upx;
	}

	.listContent-inner .ct1 {
		font-size: 28upx;
		color: #222222;
		font-weight: 700;
	}

	.listContent-inner .ct1:last-of-type .dunhao {
		display: none;
	}
</style>
