<!-- 客户 -->
<template>
	<view class="kehu order4News">
		<!-- 头部 -->
		<view class="my-header">
			<view class="header-title">客户</view>
			<view class="header-edit">
				<text class="edit-icon"></text>
				<text class="edit-text" @click="editKeHu">编辑</text>
			</view>
		</view>
		<!-- /头部 -->

		<!-- 内容区 -->

		<!-- 婚礼拍摄 -->
		<view class="content" v-if="orderType==1">
			<view class="xl content-01">
				<view class="name">
					<text class="label">新郎：</text>
					<text class="ct1">
						<text v-if="customerInformation.CustomerModel.XLName!=''&&customerInformation.CustomerModel.XLName">{{customerInformation.CustomerModel.XLName}}</text>
						<text class="noText" v-if="customerInformation.CustomerModel.XLName==''||!customerInformation.CustomerModel.XLName">暂无</text>
					</text>

				</view>
				<view class="tel">
					<text class="label">电话：</text>
					<text class="noText ct2" v-if="customerInformation.CustomerModel.XLPhone==''||!customerInformation.CustomerModel.XLPhone"
					 style="text-decoration: none;">暂无</text>
					<text class="ct2" v-if="customerInformation.CustomerModel.XLPhone!=''&&customerInformation.CustomerModel.XLPhone"
					 style="position: relative;" @click="call" :data-phone='customerInformation.CustomerModel.XLPhone'>
						{{customerInformation.CustomerModel.XLPhone}}
						<text class="tel-tip" v-show="isShowPhoneTip&&(customerInformation.CustomerModel.XLPhone!=''&&customerInformation.CustomerModel.XLPhone!=null)">可直接拨打电话</text>
					</text>
				</view>
			</view>
			<view class="xn content-01">
				<view class="name">
					<text class="label">新娘：</text>
					<text class="ct1">
						<text v-if="customerInformation.CustomerModel.XNName&&customerInformation.CustomerModel.XNName!=''">{{customerInformation.CustomerModel.XNName}}</text>
						<text class="noText" v-if="customerInformation.CustomerModel.XNName==''||!customerInformation.CustomerModel.XNName">暂无</text>
					</text>

				</view>
				<view class="tel">
					<text class="label">电话：</text>
					<text class="noText ct2" v-if="customerInformation.CustomerModel.XNPhone==''||!customerInformation.CustomerModel.XNPhone"
					 style="text-decoration: none;">暂无</text>
					<text class="ct2" v-if="customerInformation.CustomerModel.XNPhone!=''&&customerInformation.CustomerModel.XNPhone"
					 @click="call" style="position: relative;" :data-phone='customerInformation.CustomerModel.XNPhone'>
						{{customerInformation.CustomerModel.XNPhone}}
						<text class="tel-tip" v-show="isShowPhoneTip&&(customerInformation.CustomerModel.XLPhone==''||customerInformation.CustomerModel.XLPhone==null)">可直接拨打电话</text>
					</text>
				</view>
			</view>
			<view class="xn content-01">
				<view class="name">
					<text class="label">邮箱：</text>
					<text class="ct1" style="word-break: break-all;">
						<text v-if="customerInformation.CustomerModel.OrderEmail!=''&&customerInformation.CustomerModel.OrderEmail">{{customerInformation.CustomerModel.OrderEmail}}</text>
						<text class="noText" v-if="customerInformation.CustomerModel.OrderEmail==''||!customerInformation.CustomerModel.OrderEmail">暂无</text>
					</text>
				</view>
				<view class="tel mailAddress">
					<text class="label">邮寄地址：</text>
					<text class="ct2" style="word-break: break-all;">
						<text v-if="customerInformation.CustomerModel.OrderMailAddress!=''&&customerInformation.CustomerModel.OrderMailAddress">{{customerInformation.CustomerModel.OrderMailAddress}}</text>
						<text class="noText" v-if="customerInformation.CustomerModel.OrderMailAddress==''||!customerInformation.CustomerModel.OrderMailAddress">暂无</text>
					</text>

				</view>
			</view>
			<view class="remark">
				<text class="label">说明：</text>
				<text class="ct1 remark-ct1">
					<text v-if="customerInformation.CustomerModel.Remark&&customerInformation.CustomerModel.Remark!=''">{{customerInformation.CustomerModel.Remark}}</text>

					<text v-if="!customerInformation.CustomerModel.Remark||customerInformation.CustomerModel.Remark==''" class="noText">暂无</text>
				</text>
			</view>
		</view>

		<!-- 活动拍摄 -->
		<view class="content" v-if="orderType==2">
			<view class="xl content-01">
				<view class="name">
					<text class="label">公司：</text>
					<text class="ct1">
						<text v-if="customerInformation.CustomerModel.CompanyName!=''&&customerInformation.CustomerModel.CompanyName">{{customerInformation.CustomerModel.CompanyName}}</text>
						<text class="noText" v-if="customerInformation.CustomerModel.CompanyName==''||!customerInformation.CustomerModel.CompanyName">暂无</text>
					</text>

				</view>
			</view>
			<view class="xn content-01">
				<view class="name">
					<text class="label">联系人：</text>
					<text class="ct1">
						<text v-if="customerInformation.CustomerModel.ContactName!=''&&customerInformation.CustomerModel.ContactName">{{customerInformation.CustomerModel.ContactName}}</text>
						<text class="noText" v-if="customerInformation.CustomerModel.ContactName==''||!customerInformation.CustomerModel.ContactName">暂无</text>
					</text>
				</view>
				<view class="tel">
					<text class="label">电话：</text>
					<text class="ct2" v-if="!customerInformation.CustomerModel.ContactPhone||customerInformation.CustomerModel.ContactPhone==''" style="position: relative;text-decoration: none;color: #BBB;">暂无</text>
					<text class="ct2" v-if="customerInformation.CustomerModel.ContactPhone&&customerInformation.CustomerModel.ContactPhone!=''" @click="call" :data-phone='customerInformation.CustomerModel.ContactPhone'
					 style="position: relative;">{{customerInformation.CustomerModel.ContactPhone|nullStr}}<text class="tel-tip"
						 v-show="isShowPhoneTip">可直接拨打电话</text></text>
				</view>
			</view>
			<view class="xn content-01">
				<view class="name">
					<text class="label">邮箱：</text>
					<text class="ct1" style="word-break: break-all;">
						<text v-if="customerInformation.CustomerModel.OrderEmail!=''&&customerInformation.CustomerModel.OrderEmail">{{customerInformation.CustomerModel.OrderEmail}}</text>
						<text class="noText" v-if="customerInformation.CustomerModel.OrderEmail==''||!customerInformation.CustomerModel.OrderEmail">暂无</text>
					</text>

				</view>
				<view class="tel mailAddress">
					<text class="label">邮寄地址：</text>
					<text class="ct2" style="word-break: break-all;">
					<text v-if="customerInformation.CustomerModel.OrderMailAddress!=''&&customerInformation.CustomerModel.OrderMailAddress">{{customerInformation.CustomerModel.OrderMailAddress}}</text>
						<text class="noText" v-if="customerInformation.CustomerModel.OrderMailAddress==''||!customerInformation.CustomerModel.OrderMailAddress">暂无</text>
					</text>
				</view>
			</view>
			<view class="remark">
				<text class="label">说明：</text>
				<text class="ct1 remark-ct1">
					<text v-if="customerInformation.CustomerModel.Remark&&customerInformation.CustomerModel.Remark!=''">{{customerInformation.CustomerModel.Remark}}</text>
					<text v-if="!customerInformation.CustomerModel.Remark||customerInformation.CustomerModel.Remark==''" class="noText">暂无</text>
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
				isShowPhoneTip: true,
				orderId: '', //订单ID
				orderType: '', //订单类型
				customerInformation: {
					CustomerModel: {
						CompanyName: '',
						ContactName: '',
						ContactPhone: '',
						CustomerId: '',
						IsUsed: '',
						Remark: '',
						XLName: '',
						XLPhone: '',
						XNName: '',
						XNPhone: '',
					}
				}, //获取的信息
			}
		},
		methods: {
			/* 拨打电话 */
			call(e) {
				let $phoneNumber = e.target.dataset.phone;
				uni.makePhoneCall({
					phoneNumber: $phoneNumber
				});
			},
			/* 获取数据 */
			getKeHuData(orderId) {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderInfoByCustomerInfoList';
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
							this.customerInformation = res.data.data;
						}
					}
				})
			},
			/* 编辑客户 */
			editKeHu() {
				if (this.orderType == 1) {
					uni.navigateTo({
						url: '../addOrder-hunQingKF/addOrder-hunQingKF?type=update&&orderId=' + this.orderId +
							'&&orderType=' + this.orderType
					});
				} else if (this.orderType == 2) {
					uni.navigateTo({
						url: '../addOrder-shangYeKF/addOrder-shangYeKF?type=update&&orderId=' + this.orderId +
							'&&orderType=' + this.orderType
					});
				}
			}
		},
		created() {
			this.orderId = this.$parent.orderId;
			this.orderType = this.$parent.orderType;
			// console.log(this.orderId)
			setTimeout(() => {
				this.isShowPhoneTip = false;
			}, 3000)
		},
		filters: {
			nullStr(val) {
				if (!val) {
					return '无'
				} else if (val == '') {
					return '无'
				} else {
					return val
				}
			}
		},
		watch: {
			isShowPhoneTip(val) {
				if (val) {
					setTimeout(() => {
						this.isShowPhoneTip = false;
					}, 3000)
				}
			}
		}

	}
</script>

<style scoped>
	.content .content-01 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 40upx;
		align-items: flex-start;
	}

	.content .content-01 .name {
		flex-basis: 45%;
	}

	.content .content-01 .tel {
		flex-basis: 52%;
	}

	.content .content-01 .name,
	.content .content-01 .tel {
		/* line-height: 26upx; */
	}

	.content .ct2 {
		color: #3196FA;
		font-size: 26upx;
		text-decoration: underline;
		font-weight: 700;
	}


	.content .mailAddress .ct2 {
		text-decoration: none;
		color: #222;
	}

	.content .remark {
		line-height: 26upx;
	}


	.content .tel-tip {
		width: 190upx;
		height: 50upx;
		line-height: 50upx;
		text-align: center;
		background: rgba(235, 235, 235, 1);
		border-radius: 10upx;
		color: #999999;
		font-size: 22upx;
		position: absolute;
		top: -60upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.content .tel-tip::before {
		content: '';
		width: 0;
		height: 0;
		border-right: 10upx solid transparent;
		border-left: 10upx solid transparent;
		border-top: 10upx solid rgba(235, 235, 235, 1);
		position: absolute;
		bottom: -5upx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
