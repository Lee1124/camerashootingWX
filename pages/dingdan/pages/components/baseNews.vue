<!-- 基本信息 -->
<template>
	<view class="baseNews order4News">
		<!-- 头部 -->
		<view class="my-header">
			<view class="header-title">基本信息</view>
			<view class="header-edit" v-if="IsCanUpdateBasicInfo">
				<text class="edit-icon"></text>
				<text class="edit-text" @click="editBaseNews">编辑</text>
			</view>
		</view>
		<!-- /头部 -->
		<!-- 内容区 -->
		<view class="content">
			<view class="content-inner">
				<text class="label">订单日期：</text>
				<text class="ct1">{{baseInInformation.OrderDateStr|OrderDateStrFn}}-{{baseInInformation.OrderTimeType|OrderTimeTypeFn}}</text>
			</view>
			<view class="content-inner" v-if="orderType==1">
				<text class="label">拍摄酒店：</text>
				<text class="ct1">
					({{baseInInformation.CityName}})
					<text v-if="baseInInformation.HotelName_New!=null&&baseInInformation.HotelName_New!=''">{{baseInInformation.HotelName_New}}</text>
					<text class="noText" v-if="baseInInformation.HotelName_New==null||baseInInformation.HotelName_New==''">暂无酒店</text>
					</text>
			</view>
			<view class="content-inner">
				<text class="label">类<text class="twoWord"></text>型：</text>
				<text class="ct1">{{baseInInformation.OrderType|orderTypeStr}}</text>
			</view>
			<view class="content-inner" v-if="orderType==1">
				<text class="label">婚<text class="twoWord"></text>庆：</text>
				<text class="ct1">
					{{baseInInformation.WeddingName}}
					<text class="noText" v-if="baseInInformation.WeddingName==''||baseInInformation.WeddingName==null">暂无婚庆</text>
				</text>
			</view>
			<view class="content-inner">
				<text class="label">项<text class="twoWord"></text>目：</text>
				<text class="ct1">{{baseInInformation.ProjectName}}</text>
			</view>
			<view class="content-inner">
				<text class="label">附加项目：</text>
				<text class="ct1">
					<text class="noText" v-if="baseInInformation.FJProjectList.length===0||baseInInformation.FJProjectList==null">暂无附加</text>
					<template v-for="(item,index) in baseInInformation.FJProjectList">
						<text class="FJSPAN" style="color: #222" :key='index'>{{item.ProjectName}}<text>、</text></text>
					</template>
				</text>
			</view>
			<view class="content-inner">
				<text class="label">来<text class="twoWord"></text>源：</text>
				<text class="ct1">{{baseInInformation.SourceName}}</text>
			</view>
			<view class="content-inner">
				<text class="label">备<text class="twoWord"></text>注：</text>
				<text class="ct1">
				{{baseInInformation.SourceRemark}}
				<text class="noText" v-if="baseInInformation.SourceRemark==''||baseInInformation.SourceRemark==null">暂无备注</text>
				</text>
			</view>
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
				baseInInformation: {
					OrderDateStr: '2019-07-05',
				},
				IsCanUpdateBasicInfo: false,
			}
		},
		methods: {
			/* 编辑基本信息 */
			editBaseNews() {
				uni.navigateTo({
					url: '../addOrder/addOrder?type=update&&orderId=' + this.orderId +
						'&&orderType=' + this.orderType
				});
			},
			/*根据订单获取基本信息*/
			getBaseInformation(orderId) {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderBasicInfoByOrderId';
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
							this.baseInInformation = res.data.data;
							this.$store.commit('keepOrderBaseNews', {
								addTime: res.data.data.AddTime,
								addUserId: res.data.data.AddUserId
							})
						}
					}
				})
			},
			setPower(bool){
				this.IsCanUpdateBasicInfo = bool;
			},
		},
		created() {
			this.orderId = this.$parent.orderId;
			this.orderType = this.$parent.orderType;
		},
		mounted() {
			
			
		},
		filters: {

			orderTypeStr(val) {
				if (val == 1) {
					return '婚礼拍摄'
				} else if (val == 2) {
					return '活动拍摄'
				}
			},
			OrderDateStrFn(val) {
				return val != null && val != '' ? val.replace(/-/g, '.') : '';
			},
			OrderTimeTypeFn(val) {
				return val != null && val != '' ? val.replace(/-/g, '.') : '';
			}
		}
	}
</script>

<style scoped>
	.content .content-inner {
		margin-bottom: 40upx;
	}

	.content .content-inner:last-of-type {
		margin-bottom: 0;
	}

	.FJSPAN:last-of-type text {
		display: none;
	}
</style>
