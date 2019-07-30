<!-- 人员 -->
<template>
	<view class="person order4News">
		<!-- 头部 -->
		<view class="my-header">
			<view class="header-title">人员</view>
			<view class="header-edit">
				<text class="edit-icon"></text>
				<text class="edit-text" @click="editPerson">编辑</text>
			</view>
		</view>
		<!-- /头部 -->
		<!-- 内容区 -->
		<view class="content">
			<template v-for="(items,index) in personManageListData">
				<view class="content-inner" :key='index'>
					<view class="title">{{items.name}}</view>
					<view class="position-person-box">
						<template v-for="(items2,index2) in items.positionList">
							<view class="position-person" :key='index2'>
								<text class="label">{{items2.PostName}}：</text>
								<template v-for="(items3,index3) in items2.PostUserList">
									<text class="ct1" :key='index3'>{{items3.UserName}} <text class="dunhao">、</text></text>
								</template>
							</view>
						</template>
					</view>
				</view>
			</template>
		</view>
		<!-- /内容区 -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: '', //订单ID
				orderType: '', //订单类型
				personManageListData: [{
						name: '【销售】',
						positionList: []
					},
					{
						name: '【拍摄】',
						positionList: []
					},
					{
						name: '【后期】',
						positionList: []
					},
					{
						name: '【客服】',
						positionList: []
					}
				],
			}
		},
		methods: {
			/* 获取人员安排列表 */
			getPersonManageList(orderId) {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderPostUserList';
				let data = {
					OrderId: orderId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							// console.log(res.data.data)
							this.personManageListData[0].positionList = res.data.data.XSList;
							this.personManageListData[1].positionList = res.data.data.PSList;
							this.personManageListData[2].positionList = res.data.data.HQList;
							this.personManageListData[3].positionList = res.data.data.KFList;
						}
					}
				})
			},
			/* 编辑人员安排 */
			editPerson(){
				// this.$refs.
				uni.navigateTo({
					url: '../editPerson/editPerson?type=update&&orderId=' + this.orderId +
						'&&orderType=' + this.orderType
				});
			}
		},
		created() {
			this.orderId = this.$parent.orderId;
			this.orderType = this.$parent.orderType;
		},
	}
</script>

<style scoped>
	.order4News .content {
		margin-top: 0;
	}

	.content .content-inner {
		border-bottom: 1upx dashed #DDD;
		padding: 40upx 0;
	}

	.content .content-inner:last-child {
		border-bottom: 0;
	}

	.content .content-inner .title {
		font-size: 26upx;
		color: #666;
	}

	.content .content-inner .position-person-box {
		padding: 33upx 37upx 0;
	}

	.content .content-inner .position-person-box .position-person {
		display: flex;
		align-items: center;
		margin-bottom: 25upx;
	}

	.content .content-inner .position-person-box .position-person:last-child {
		margin-bottom: 0;
	}

	.content .content-inner .ct1:last-of-type .dunhao {
		display: none;
	}
</style>
