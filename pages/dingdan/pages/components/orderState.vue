<template>
	<view class="orderState">
		<view class="orderState-step">
			<view class="step-time">
				<view class="step-time-date">
					{{addTime_yearMonthDay}}
				</view>
				<view class="step-time-hour">
					{{addTime_hourMinutes}}
				</view>
			</view>
			<view class="step-line">
				<view class="step-line-big-sign" style="background: #E1F0FF;">
					<view class="step-line-small-sign" style="background: #3196FA;"></view>
				</view>
			</view>
			<view class="step-content">
				<view class="orderState-step-box">
					<view class="title">
						新增订单成功！
					</view>
					<view class="caozuoren">
						<text>操作人：</text>
						<text>{{addUserName}}</text>
					</view>
				</view>
			</view>
		</view>

		<template v-for="(items,index) in stateData">
			<view class="orderState-step" :key='index'>
				<view class="step-time">
					<view class="step-time-date">
						{{items.time|stepTimeDate}}
					</view>
					<view class="step-time-hour">
						{{items.time|stepTimeHour}}
					</view>
				</view>
				<view class="step-line">
					<view class="step-line-big-sign" :class="{'willSuccess-bigSign-color':items.stateColor==3,
					'success-bigSign-color':items.stateColor==1,'chaoQisuccess-bigSign-color':items.stateColor==0,
					'chaoQiNosuccess-bigSign-color':items.stateColor==2}">
						<view class="step-line-small-sign" :class="{'willSuccess-smallSign-color':items.stateColor==3,
						'success-smallSign-color':items.stateColor==1,'chaoQisuccess-smallSign-color':items.stateColor==0,
						'chaoQiNosuccess-smallSign-color':items.stateColor==2}"></view>
					</view>
				</view>
				<view class="step-content">
					<view class="orderState-step-box" @click="openTable(items)" :class="{'chaoQisuccess-bigSign-color':items.stateColor==0,
					'chaoQiNosuccess-bigSign-color':items.stateColor==2}">
						<view class="title">
							{{items.name}}
						</view>
						<view class="caozuoren">
							<text>操作人：</text>
							<text>{{items.caozuoren|caozuorenStr}}</text>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addTime_yearMonthDay: '', //添加订单年、月、日
				addTime_hourMinutes: '', //添加订单人小时、分钟
				addUserName: '', //添加订单人
				orderId: '', //订单id
				orderType: '', //订单类型
				stateData: [{
						name: '客户意向表',
						/*0意向表  1拍摄回传  2上传初稿   3审核确认  5邮寄碟片    没有返出来都改为等待完成*/
						StateId: 0,
						time: '',
						/*0超期完成  1正常完成  2超时未完成  3等待完成*/
						stateColor: 3,
						caozuoren: ''
					},
					{
						name: '设备领取',
						StateId: 6,
						time: '',
						stateColor: 3,
						caozuoren: ''
					},
					{
						name: '拍摄回传',
						StateId: 1,
						time: '',
						stateColor: 3,
						caozuoren: ''
					},
					{
						name: '上传初稿',
						StateId: 2,
						time: '',
						stateColor: 3,
						caozuoren: ''
					},
					{
						name: '审核确认',
						StateId: 3,
						time: '',
						stateColor: 3,
						caozuoren: ''
					},
					{
						name: '邮寄碟片',
						StateId: 5,
						time: '',
						stateColor: 3,
						caozuoren: ''
					},
				],
				orderStateData: [], //请求的订单状态列表
			}
		},
		methods: {
			/* 打开表 */
			openTable(itemObj) {
				if (itemObj.StateId == 0 && this.orderType == 1) {
					uni.navigateTo({
						url: '../yixiangbiao/yixiangbiao?orderId=' + this.orderId
					});
				} else if (itemObj.StateId == 1) {
					uni.navigateTo({
						url: '../huikuibiao/huikuibiao?orderId=' + this.orderId + '&&orderType=' + this.orderType
					});
				} else if (itemObj.StateId == 6) {
					uni.navigateTo({
						url: '../shebeilingqu/shebeilingqu?orderId=' + this.orderId
					});
				} else if (itemObj.StateId == 2) {
					uni.navigateTo({
						url: '../ziliaoliucun/ziliaoliucun?orderId=' + this.orderId + '&&openType=1'
					});
				} else if (itemObj.StateId == 3) {
					uni.navigateTo({
						url: '../ziliaoliucun/ziliaoliucun?orderId=' + this.orderId + '&&openType=2'
					});
				} else if (itemObj.StateId == 5) {
					uni.navigateTo({
						url: '../sendDisc/sendDisc?orderId=' + this.orderId
					});
				}
			},
			/* 获取订单状态 */
			getStateList() {
				this.$show('正在加载');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraIntentionTable/GetOrderStateListByOrderId';
				let data = {
					OrderId: this.orderId,
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.$hide();
							// console.log(res)
							/*将所有状态全部重置等待完成*/
							this.stateData.forEach((item, index, arr) => {
								arr[index].stateColor = 3;
								arr[index].caozuoren = '';
							});
							// this.stateData = res.data.date;
							if (res.data.date.length == 0) {
								this.stateData.forEach((item, index, arr) => {
									arr[index].StateColor = 3;
									arr[index].caozuoren = '';
								})
							} else {
								res.data.date.forEach((item, index, arr) => {
									this.stateData.forEach((item2, index2, arr2) => {
										if (arr[index].StateId == arr2[index2].StateId) {
											arr2[index2].time = arr[index].AddTime;
											arr2[index2].stateColor = arr[index].StateColor;
											arr2[index2].caozuoren = arr[index].UserName;
											// this.msg++;
										}
									});
								})
							}
						}
					}
				})
			},
			/*获取用户信息*/
			getUserNews(obj) {
				let url = '/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/GetMyUserInfoDetail';
				let data = {
					UserId: obj.addUserId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.addUserName = res.data.data.RealName;
						}
					}
				})
			},
			/* 格式化时间 */
			setTime(timeObj) {
				try{
					let myTime1 = timeObj.split('T')[0];
					let myTime2 = timeObj.split('T')[1];
					this.addTime_yearMonthDay = myTime1.replace(/-/g, '.');
					this.addTime_hourMinutes = myTime2.split(':')[0] + ':' + myTime2.split(':')[1];
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		created() {
			this.orderId = this.$parent.orderId;
			this.orderType = this.$parent.orderType;
		},
		mounted() {
			this.orderBaseNewsObj = this.$store.state.orderBaseNews;
			this.setTime(this.orderBaseNewsObj.addTime);
			this.getUserNews(this.$store.state.orderBaseNews);
			this.getStateList();
		},
		filters: {
			stepTimeDate(val) {
				if (val == '') {
					return '----'
				} else {
					try{
						return val.split('T')[0].replace(/-/g, '.');
					}catch(e){
						//TODO handle the exception
					}
				}
			},
			stepTimeHour(val) {
				if (val == '') {
					return '--'
				} else {
					try{
						return val.split('T')[1].split(':')[0] + ':' + val.split('T')[1].split(':')[1];
					}catch(e){
						//TODO handle the exception
					}
				}
			},
			caozuorenStr(val) {
				if (val == '') {
					return '暂无操作'
				} else {
					return val
				}
			}
		}
	}
</script>

<style scoped>
	.orderState {
		padding-bottom: 100upx;
	}

	.orderState-step {
		height: 180upx;
		width: 100%;
		display: flex;
		padding: 40upx 0 0;
		box-sizing: border-box;
	}

	.step-time {
		flex-basis: 18%;
		text-align: right;
		color: #666666;
		font-size: 22upx;
		padding-top: 13upx;
		box-sizing: border-box;
	}

	.step-time-date {
		margin-bottom: 5upx;
	}


	.step-line {
		flex-basis: 10%;
		padding-top: 22upx;
		box-sizing: border-box;
	}

	.step-line .step-line-big-sign {
		width: 32upx;
		height: 32upx;
		border-radius: 50%;
		position: relative;
		margin: 0 auto;
	}

	.step-line .step-line-big-sign::before {
		content: '';
		width: 2upx;
		height: 55upx;
		border-left: 2upx dashed #DDDDDD;
		position: absolute;
		bottom: 29upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.step-line .step-line-big-sign::after {
		content: '';
		width: 2upx;
		height: 96upx;
		border-left: 2upx dashed #DDDDDD;
		position: absolute;
		top: 29upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.step-line .step-line-big-sign .step-line-small-sign {
		width: 18upx;
		height: 18upx;
		border-radius: 50%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.step-content {
		flex-basis: 72%;
		// background: #0077AA;
		padding: 0 10upx;
		box-sizing: border-box;
	}

	.step-content .orderState-step-box {
		width: 510upx;
		height: 140upx;
		background: rgba(255, 255, 255, 1);
		border: 1upx solid rgba(238, 238, 238, 1);
		border-radius: 10upx;
		padding: 26upx 34upx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.orderState-step-box .title {
		font-size: 28upx;
		color: #222222;
	}

	.orderState-step-box .caozuoren {
		font-size: 24upx;
		color: #666666;
	}

	.willSuccess-bigSign-color {
		background: #F6F6F6;
	}

	.willSuccess-smallSign-color {
		background: #BBBBBB;
	}

	.success-bigSign-color {
		background: #E1F0FF;
	}

	.success-smallSign-color {
		background: #3196FA;
	}

	.chaoQisuccess-bigSign-color {
		background: #FFE8D7;
	}

	.step-content .orderState-step-box.chaoQisuccess-bigSign-color {
		background: #FFE8D7;
	}

	.step-content .orderState-step-box.chaoQisuccess-bigSign-color .title,
	.step-content .orderState-step-box.chaoQisuccess-bigSign-color .caozuoren {
		color: #FF6C00;
	}

	.chaoQisuccess-smallSign-color {
		background: #FF6C00;
	}

	.chaoQiNosuccess-bigSign-color {
		background: #FFE2E2;
	}

	.step-content .orderState-step-box.chaoQiNosuccess-bigSign-color {
		background: #FFE2E2;
	}

	.step-content .orderState-step-box.chaoQiNosuccess-bigSign-color .title,
	.step-content .orderState-step-box.chaoQiNosuccess-bigSign-color .caozuoren {
		color: #FF0000;
	}

	.chaoQiNosuccess-smallSign-color {
		background: #FF0000;
	}
</style>
