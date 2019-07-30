<template>
	<view class="shebeilingqu">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<scroll-view scroll-y class="scrollView" v-if="!isShowNoDataIcon">
			<view class="content content-01">
				<view class="content-title">订单信息</view>
				<view class="order-news">
					<template v-for="(items,index) in orderNewsData">
						<view class="order-news-inner" :key='index'>
							<text class="label">{{items.name}}</text>
							<text class="text" :style="{color: items.color}">{{items.ct}}</text>
						</view>
					</template>
				</view>
			</view>
			<view class="content content-02">
				<view class="content-title">资料留存</view>
				<view class="video-list-box">
					<view class="video-list">
						<view class="video-list-title">预告片</view>
						<view class="video-box">
							<video id="myVideo1" @play='myVideoPlay(1)' v-if="myVideo1Src!=''" class="myVideo" :src="myVideo1Src"
							 enable-progress-gesture show-center-play-btn controls objectFit='cover'></video>
							<view class="msg" v-if="myVideo1Src==''">无视频</view>
						</view>
					</view>
					<view class="video-list">
						<view class="video-list-title">视频文件</view>
						<view class="video-box">
							<video id="myVideo2" @play='myVideoPlay(2)' v-if="myVideo2Src!=''" class="myVideo" :src="myVideo2Src"
							 enable-progress-gesture show-center-play-btn controls objectFit='cover'></video>
							<view class="msg" v-if="myVideo2Src==''">无视频</view>
						</view>
					</view>
					<view class="video-list">
						<view class="video-list-title">视频说明</view>
						<view class="video-remark" v-if="videoRemark=='暂无说明'" style="color: #BBB;">{{videoRemark}}</view>
						<view class="video-remark" v-else>{{videoRemark}}</view>
					</view>
				</view>
			</view>
			<view class="content content-03">
				<view class="content-title">日志记录</view>
				<view class="daily-box">
					<text class="noFileLogList" v-if="fileLogList.length==0">无日志记录</text>
					<template v-for="(items,index) in fileLogList">
						<view class="daily-inner" :key='index'>
							<view class="daily-big-sign" :style="{background:items.bigSignColor}">
								<view class="daily-small-sign" :style="{background:items.smallSignColor}"></view>
							</view>
							<view class="daily-inner-right">
								<view class="time" :style="{color:items.smallSignColor}">{{items.AddTimeStr|AddTimeStr}}</view>
								<view class="stepname">{{items.CZ}}</view>
								<view class="remark">{{yh}}{{items.Remark}}{{yh}}</view>
							</view>
						</view>
					</template>
				</view>
			</view>

			<view class="btn-box" v-if="openType==2&&fileState==0">
				<button class="return" @click="returnOrPass(2)">退回审核</button>
				<button class="pass" @click="returnOrPass(1)">通过审核</button>
			</view>
		</scroll-view>

		<!-- 模态框 -->
		<myModal :show="modalData.isShowModal" @close="cancel_modal" :title="modalData.modalTitle" @cancel="cancel_modal"
		 @confirm="confirm_modal">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="modalData.isShowModal" v-model="modalData.modalTextAreaValue" :placeholder="modalData.modalPlaceholder"
				 style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /模态框 -->

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
				tipType: '',
				message: '',
				fileId: '',
				fileState: '',
				openType: 0,
				myVideo1Src: '',
				myVideo2Src: '',
				videoRemark: '',
				yh: '"',
				orderId: '',
				orderType: '',
				orderNewsData: [{
						name: '订单：',
						ct: '',
						id: 1,
						color: '',
					},
					{
						name: '拍摄：',
						ct: '',
						id: 2,
						color: '',
					},
					{
						name: '后期：',
						ct: '',
						id: 3,
						color: '',
					},
					{
						name: '审核：',
						ct: '',
						id: 4,
						color: '',
					},
					{
						name: '后期：',
						ct: 0,
						id: 5,
						color: '',
					},
				],
				fileLogList: [],
				modalData: {
					isShowModal: false,
					modalTextAreaValue: '',
					modalPlaceholder: '请输入退回理由...',
					modalTitle: '退回理由',
				}
			}
		},
		methods: {
			/* 视频播放 */
			myVideoPlay(type) {
				if(type==1){
					let video2Obj=uni.createVideoContext('myVideo2');
					video2Obj.pause();
				}else{
					let video1Obj=uni.createVideoContext('myVideo1');
					video1Obj.pause();
				}
			},
			/* 通过 /或 退回*/
			returnOrPass(num) {
				if (num == 2) {
					this.modalData.isShowModal = true;
				} else {
					this.modalData.isShowModal = false;
					let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/CheckCGByOrderId';
					let data = {
						OrderId: this.orderId,
						FileId: this.fileId,
						SHState: 1,
						SHRemark: '',
					};
					this.$axios({
						method: 'POST',
						url: url,
						data: data,
						success(res) {
							// console.log(res)
							if (res.data.status) {
								this.message = '操作成功！';
								this.tipType = 'success';
								this.$refs.anRef.show();
								this.getFirstDraftData();
							}
						}
					})
				}

			},
			cancel_modal() {
				this.modalData.isShowModal = false;
				this.modalData.modalTextAreaValue = '';
			},
			confirm_modal() {
				if (this.modalData.modalTextAreaValue != '') {

					this.modalData.isShowModal = false;
					let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/CheckCGByOrderId';
					let data = {
						OrderId: this.orderId,
						FileId: this.fileId,
						SHState: 2,
						SHRemark: this.modalData.modalTextAreaValue,
					};
					this.$axios({
						method: 'POST',
						url: url,
						data: data,
						success(res) {
							// console.log(res)
							if (res.data.status) {
								this.message = '退回成功！';
								this.tipType = 'success';
								this.$refs.anRef.show();
								this.getFirstDraftData();
							}
						}
					})
				} else {
					this.message = '退回理由不能为空！';
					this.tipType = 'error';
					this.$refs.anRef.show();
				}
			},
			// 获取审核人
			getAuditor() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/GetOrderInfoSource';
				let data = {
					OrderId: this.orderId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							// console.log(res.data.data)
							this.orderNewsData[3].ct = res.data.data.SHUserName;
						}
					}
				})
			},
			/*获取当前订单初稿的文件列表和日志记录*/
			getFirstDraftData() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/GetFileListByOrderId';
				let data = {
					OrderId: this.orderId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						console.log(res.data.data)
						if (res.data.status) {
							this.fileState = parseInt(res.data.data.FileState);
							this.fileId = res.data.data.FileId;
							let fileState = res.data.data.FileState;
							if (fileState == null) {
								fileState = '待提交审核'
								this.orderNewsData[4].color = '#ff0000'
							} else if (fileState == 0) {
								fileState = '待审核'
								this.orderNewsData[4].color = '#ff0000'
							} else if (fileState == 1) {
								fileState = '通过'
								this.orderNewsData[4].color = 'green'
							} else if (fileState == 2) {
								fileState = '退回'
								this.orderNewsData[4].color = '#ff0000'
							}
							//FileState；null 待提交审核    0待审核（可以修改）  1通过(不能修改)    2退回（可以修改）
							this.orderNewsData[4].ct = fileState;
							res.data.data.FileList.forEach(item => {
								if (parseInt(item.OtherType) == 0) {
									this.myVideo1Src = this.$manjs.cosIp + item.URLOriginal
								} else {
									this.myVideo2Src = this.$manjs.cosIp + item.URLOriginal
								}
							})
							this.videoRemark = res.data.data.FileRemark == '' ? '暂无说明' : res.data.data.FileRemark; /* bigSignColor */
							res.data.data.FileLogList.forEach(item => {
								item.bigSignColor = '#eee';
								item.smallSignColor = '#ccc';
								if (item.Remark.indexOf('退回') != -1) {
									item.bigSignColor = 'rgb(255, 228, 212)';
									item.smallSignColor = 'rgb(255, 78, 0)';
								} else if (item.Remark.indexOf("完成") != -1) {
									item.bigSignColor = 'rgb(221, 234, 255)';
									item.smallSignColor = 'rgb(89, 150, 248)';
								}
							})
							this.fileLogList = res.data.data.FileLogList
						}
					}
				})
			},
			/*根据订单获取订单标题*/
			getOrderTitle() {
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetOrderTitleByOrderId';
				let data = {
					OrderId: this.orderId
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.orderNewsData[0].ct = res.data.data
						}
					}
				})
			},
			/* 拍摄人员 */
			setPSList(arrObj) {
				let personStr = '';
				arrObj.forEach(item => {
					personStr += item.UserName + '、'
				})

				personStr = personStr.substring(0, personStr.length - 1)
				if (personStr == '') {
					personStr = '暂无'
					this.orderNewsData[1].color = '#BBB'
				}
				this.orderNewsData[1].ct = personStr
			},
			/* 后期人员 */
			setHQList(arrObj) {
				let personStr = '';
				arrObj.forEach(item => {
					personStr += item.UserName + '、'
				})
				personStr = personStr.substring(0, personStr.length - 1)
				if (personStr == '') {
					personStr = '暂无'
					this.orderNewsData[2].color = '#BBB'
				}
				this.orderNewsData[2].ct = personStr
			},
		},
		filters: {
			AddTimeStr(val) {
				return val.replace(/-/g, '.')
			}
		},
		onLoad(options) {
			uni.hideShareMenu();//隐藏分享按钮
			this.setPSList(this.$store.state.personObj.PSList);
			this.setHQList(this.$store.state.personObj.HQList);
			this.openType = parseInt(options.openType); //1--上传初稿  2--审核
			this.orderId = options.orderId;
			this.orderType = options.orderType;
			if (this.openType == 1) {
				uni.setNavigationBarTitle({
					title: '资料留存'
				});
			} else {
				uni.setNavigationBarTitle({
					title: '资料审核'
				});
			}

		},
		onShow() {
			this.getAuditor();
			this.getFirstDraftData();
			this.getOrderTitle();
		}
	}
</script>

<style scoped>
	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/fonts/iconfont.ttf');
	}

	.iconfont {
		font-family: iconfont;
	}

	.scrollView {
		position: fixed;
		top: 2upx;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.content {
		padding: 40upx 30upx;
		box-sizing: border-box;
	}

	.content-title {
		color: #3196FA;
		font-size: 28upx;
		font-weight: 700;
		position: relative;
		margin-left: 22upx;
		margin-bottom: 32upx;
	}

	.content-title::before {
		content: '';
		width: 6upx;
		height: 28upx;
		background: rgba(49, 150, 250, 1);
		position: absolute;
		left: -22upx;
		top: 50%;
		transform: translateY(-50%);
	}

	.order-news {
		padding: 44upx 30upx;
		box-sizing: border-box;
		background: #F9F9F9;
		border: 1upx dashed rgba(204, 204, 204, 1);
		border-radius: 5upx;
	}

	.order-news .order-news-inner {
		font-size: 28upx;
		margin-bottom: 32upx;
		display: flex;
	}

	.order-news .order-news-inner:last-of-type {
		margin-bottom: 0;

	}

	.order-news .order-news-inner .label {
		color: #999999;
		flex-basis: 15%;
	}

	.order-news .order-news-inner .text {
		color: #222222;
		flex-basis: 85%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.video-list-box {
		padding: 0 60upx;
		box-sizing: border-box;
	}

	.video-list-title {
		position: relative;
		color: #222;
		font-size: 28upx;
		text-align: center;
		margin-bottom: 22upx;
	}

	.video-list-title::before {
		content: '';
		width: 34upx;
		height: 2upx;
		background: rgba(49, 150, 250, 1);
		position: absolute;
		bottom: -22upx;
		left: 50%;
		transform: translateX(-50%);
	}

	.video-box {
		height: 320upx;
		margin: 62upx 0;
		position: relative;
		background: rgba(249, 249, 249, 1);
	}

	.video-box .myVideo {
		width: 100%;
		height: 100%;
	}

	.video-box .msg {
		color: #bbb;
		font-size: 28upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.video-remark {
		color: #222222;
		font-size: 28upx;
		height: 105upx;
		line-height: 105upx;
		text-align: center;
		background: rgba(249, 249, 249, 1);
		border: 1upx dashed rgba(204, 204, 204, 1);
		border-radius: 5upx;
		margin-top: 62upx;
	}

	.daily-box {
		background: rgba(249, 249, 249, 1);
		border: 1upx dashed rgba(204, 204, 204, 1);
		border-radius: 5upx;
		padding: 30upx 70upx;
		box-sizing: border-box;
		position: relative;
	}

	.noFileLogList {
		color: #BBB;
		font-size: 28upx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.daily-box .daily-inner {
		display: flex;
		margin-bottom: 30upx;
	}

	.daily-box .daily-inner .daily-big-sign {
		width: 30upx;
		height: 30upx;
		background: rgba(221, 234, 255, 1);
		border-radius: 50%;
		position: relative;
		margin-right: 20upx;
	}

	.daily-box .daily-inner .daily-big-sign::before {
		content: '';
		width: 2upx;
		height: 15upx;
		border-left: 2upx dashed rgba(204, 204, 204, 1);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -15upx;
		z-index: 999;
	}

	.daily-box .daily-inner .daily-big-sign::after {
		content: '';
		width: 2upx;
		height: 150upx;
		border-left: 2upx dashed rgba(204, 204, 204, 1);
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 30upx;
		z-index: 999;
	}

	.daily-box .daily-inner .daily-big-sign .daily-small-sign {
		width: 15upx;
		height: 15upx;
		background: rgba(49, 150, 250, 1);
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.daily-box .daily-inner .daily-inner-right .time {
		color: #666666;
		font-size: 24upx;
	}

	.daily-box .daily-inner .daily-inner-right .stepname {
		color: #222222;
		font-size: 28upx;
		font-weight: 700;
		margin: 25upx 0;
	}

	.daily-box .daily-inner .daily-inner-right .remark {
		color: #999999;
		font-size: 24upx;
		margin-left: -15rpx;
	}

	.btn-box {
		display: flex;
		justify-content: center;
		margin: 70upx 0;
	}

	.btn-box button {
		width: 230upx;
		height: 84upx;
		line-height: 84upx;
		text-align: center;
		border-radius: 42upx;
		padding: 0;
		margin: 0;
		font-size: 30upx;
	}

	.btn-box button.return {
		border: 1upx solid rgba(49, 150, 250, 1);
		color: #3196FA;
		background: #fff;
	}

	.btn-box button.pass {
		color: #fff;
		background: #3196FA;
		margin-left: 80upx;
	}
</style>
