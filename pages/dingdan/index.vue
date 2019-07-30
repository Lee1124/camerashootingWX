<template>
	<scroll-view id="order-index" scroll-y='true'>

		<!-- 头部导航栏组件 -->
		<uni-nav-bar shadow='false' fixed='true'>
			<view slot="left">
				<view class="time-title" id='timeTitle' style="display: none;">
					<!-- =============导航栏左边的时间=================== -->
					<view class="time-icon iconfont">&#xe6c4;</view>
					<text>{{timeText}}</text>
				</view>
			</view>
			<!-- 向自定义导航栏的左侧自定义内容 -->
		</uni-nav-bar>
		<!-- / 头部导航栏组件-->

		<!-- 内容展示区 -->
		<view class="content-list" :style="{top:contentListTop}">

			<!-- 搜索 -->
			<view class="list-search-box">
				<view class="my-input" @click="inputFocus">
					<template v-for="(items,index) in tagsData">
						<view class="tagBox" :key='index' @click.stop="closeThisTag">
							<text class="tagText">{{items.name}}</text>
							<text class="tagIcon iconfont">&#xe677;</text>
						</view>
					</template>
					<text class="searchBox-searchText2">{{searchText2}}</text>
				</view>
				<view class="placeholder-box" v-show="isShowPlaceholderBox&&!isShowCloseIcon" @click="inputFocus">
					<text class="iconfont search-icon" @click="inputFocus">&#xe611;</text>
					<text @click="inputFocus">搜索</text>
				</view>
				<view class="iconfont search-icon2" v-show="!isShowPlaceholderBox||isShowCloseIcon" @click="inputFocus">&#xe611;</view>
				<view class="close-search-content" v-show="isShowCloseIcon" @click="clearSearchContent"></view>


			</view>
			<!-- /搜索 -->
			<!-- 列表 -->
			<view class="index-list" style="position: relative;">
				<noDataTips v-if='listData.length===0'></noDataTips><!-- 无数据提示 -->
				<template v-for="(items,index) in listData">
					<view class="list-inner" :key='index' @click="openDetail(items)">
						<view class="left">
							<view class="time-box">
								<view class="text-box">
									<view>{{items.OrderDateStr|OrderDateStr_month}}</view>
									<view>{{items.OrderDateStr|OrderDateStr_year}}</view>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="ct-top">
								<text class="text1">
									<text v-if="items.HotelName_New!=null&&items.HotelName_New!=''&&items.OrderType==1">{{items.HotelName_New}}</text>
									<text v-if="(items.HotelName_New==null||items.HotelName_New=='')&&items.OrderType==1" class="noText">暂无酒店</text>
									<text v-if="items.HotelOtherRemark!=null&&items.HotelOtherRemark!=''&&items.OrderType==2">{{items.HotelOtherRemark}}</text>
									<text v-if="(items.HotelOtherRemark==null||items.HotelOtherRemark=='')&&items.OrderType==2" class="noText">暂无拍摄地点</text>
									- </text>
								{{items.ProjectName}}
							</view>
							<view class="ct-bottom">
								<text class="text3" style="display: inline-block;max-width: 400upx;overflow: hidden;height: 50upx;word-wrap: no-wrap;text-overflow: ellipsis;white-space: nowrap;">
									<text>负责人：</text>
									<text v-if="items.personArr.length==0" class="noText">暂无</text>
									<template v-for="(item2,index2) in items.personArr">
										<text :key='index2' class="personList">{{item2.UserName}}<text class="dunHao">、</text></text>
									</template>
								</text>
								<text class="text4-box">
									<template v-for="(items2,index2) in items.person">
										<text class="text4" :key='index2' v-if="index2!=items.person.length-1">{{items2}} <text class="separator">、</text></text>
										<text class="text4" :key='index2' v-if="index2==items.person.length-1">{{items2}}</text>
									</template>
								</text>
								<text class="text5" v-if="items.OrderState==null||items.OrderState==0">（{{items.OrderState|OrderStateStr}}）</text>
								<text class="text5" v-if="items.OrderState==1" style="color: #FFA200;">（{{items.OrderState|OrderStateStr}}）</text>
								<text class="text5" v-if="items.OrderState==2" style="color: #FFA200;">（{{items.OrderState|OrderStateStr}}）</text>
								<text class="text5" v-if="items.OrderState==3" style="color: #FF0000;">（{{items.OrderState|OrderStateStr}}）</text>
								<text class="text5" v-if="items.OrderState==4" style="color: #FF0000;">（{{items.OrderState|OrderStateStr}}）</text>
								<text class="text5" v-if="items.OrderState==5" style="color: #3196FA;">（{{items.OrderState|OrderStateStr}}）</text>
								<text class="text5" v-if="items.OrderState==6" style="color: #09C400;">（{{items.OrderState|OrderStateStr}}）</text>
							</view>
						</view>
					</view>
				</template>
			</view>
			<!-- /列表 -->
		</view>
		<!-- /内容展示区 -->

		<!-- 添加订单 -->
		<view class="add-order-btn" @click="addOrder" v-show="IsCanUpdateBasicInfo">添加订单</view>
		<!-- /添加订单 -->

		<!-- 底部滑出 -->
		<myBottomSlideIn ref="as"></myBottomSlideIn>

		<!-- 四方滑出 -->
		<mySquareLayer ref="popupRef" :direction="'bottom'" v-model="boolShow">
			<view class="mySquareLayer-box">
				<view class="mySquareLayer-content-box">
					<view class="searchBox">
						<input type="text" v-model='searchText2' @blur='blurSearch' :placeholder="inputPlaceholder">
						<text class="iconfont search-icon">&#xe611;</text>
						<view class="close-search-content" v-show="isShowCloseIcon" @click="clearSearchContent"></view>
						<view class="tag-box" v-show="isShowTagBox">
							<template v-for="(items,index) in tagsData">
								<view class="tagBox" :key='index' @click="closeThisTag">
									<text class="tagText">{{items.name}}</text>
									<text class="tagIcon iconfont">&#xe677;</text>
								</view>
							</template>
						</view>
					</view>
					<view class="common-use">
						<view class="title">常用搜索</view>
						<view class="choice-btn">
							<template v-for="(items,index) in btnTimeList">
								<button @click="choiceThisTime(items)" :key='index' :class="{isSelectedBtn:items.isSelected}">{{items.name}}</button>
							</template>
						</view>
					</view>
					<view class="time-search">
						<view class="title">时间搜索</view>
						<view class="time-select">
							<view class="startTime" v-if="startTimeValue!=''" style="color: #222;" @click="openTimeChoice_start">
								{{startTimeValue|startTimeValue}}
							</view>
							<view class="startTime" v-if="startTimeValue==''" style="color: #BBB;" @click="openTimeChoice_start">
								{{startTimeValue|startTimeValue}}
							</view>
							<view class="center-text">至</view>
							<view class="endTime" v-if="endTimeValue!=''" style="color: #222;" @click="openTimeChoice_end">
								{{endTimeValue|endTimeValue}}
							</view>
							<view class="endTime" v-if="endTimeValue==''" style="color: #BBB;" @click="openTimeChoice_end">
								{{endTimeValue|endTimeValue}}
							</view>
							<button @click="confirmSearchTime">确认</button>
						</view>
					</view>

				</view>
			</view>
		</mySquareLayer>

		<!-- 年月选择--开始时间 -->
		<myDatePicker mode="yearMonth" startYear="2016" endYear="2030" :defaultVal="startTimeValue" :current="true" @confirm="onConfirm1"
		 ref="picker1" themeColor="#75BAFF" :selectList="selectList1"></myDatePicker>
		<!-- 年月选择--结束时间 -->
		<myDatePicker mode="yearMonth" startYear="2016" endYear="2030" :defaultVal="endTimeValue" :current="true" @confirm="onConfirm2"
		 ref="picker2" themeColor="#75BAFF" :selectList="selectList2"></myDatePicker>
	</scroll-view>
</template>

<script>
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	export default {
		data() {
			return {
				IsCanUpdateBasicInfo: false,
				detailFlag: true,
				inputPlaceholder: '搜索...',
				isShowTagBox: false,
				isShowCloseIcon: false,
				searchStartTimeValue: '', //请求数据的开始时间
				searchEndTimeValue: '', //请求数据的结束时间
				startTimeValue: '',
				endTimeValue: '',
				img_list: [],
				timeText: '',
				contentListTop: '',
				searchText2: '',
				isShowPlaceholderBox: true,
				listData: [],
				tagsData: [],
				btnTimeList: [{
						name: '今天',
						isSelected: false,
						id: 1
					},
					{
						name: '明天',
						isSelected: false,
						id: 2
					},
					{
						name: '上周',
						isSelected: false,
						id: 3
					},
					{
						name: '本周',
						isSelected: false,
						id: 4
					},
					{
						name: '下周',
						isSelected: false,
						id: 5
					},
					{
						name: '上月',
						isSelected: false,
						id: 6
					},
					{
						name: '本月',
						isSelected: false,
						id: 7
					},
					{
						name: '下月',
						isSelected: false,
						id: 8
					},
				]
			}
		},
		methods: {
			/*判断用户是否有新增编辑基本信息修改金额权限*/
			getUserPower() {
				let url = '/xlapi/CameraManage/CameraUserInfoManage/CameraUserInfo/GetBranchUserUpdateBasicInfoPermission';
				let data = {
					SearchUserId: this.$manjs.getkevalue().userid
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						// console.log(res)
						if (res.data.status) {
							this.IsCanUpdateBasicInfo = res.data.data.IsCanUpdateBasicInfo;
							this.$store.commit('keepIsCanUpdateAmountInfo', res.data.data.IsCanUpdateAmountInfo);
							this.$store.commit('keepIsCanUpdateBasicInfo', res.data.data.IsCanUpdateBasicInfo);
						}
					}
				})
			},
			/* 失去焦点搜索 */
			blurSearch() {
				if (this.searchText2 != '') {
					this.getOrderData();
				}
			},
			/* 打开当前订单详情 */
			openDetail(itemObj) {
				// console.log(itemObj)
				if (this.detailFlag) {
					this.detailFlag = false;
					this.$store.commit('keepPersonObj', {
						PSList: itemObj.PSList,
						HQList: itemObj.HQList
					})
					uni.navigateTo({
						url: "pages/orderDetailPage/orderDetailPage?orderId=" + itemObj.OrderId + '&&orderType=' + itemObj.OrderType
					});
				}
			},
			/* 取消该tag */
			closeThisTag() {
				this.btnTimeList.forEach((item, index, arr) => {
					arr[index].isSelected = false;
				})
				this.tagsData = [];
			},
			/* 关闭按钮清除关键词 */
			clearSearchContent() {
				this.searchText2 = '';
			},
			/* 选择当前按钮对应的时间 */
			choiceThisTime(itemObj) {
				this.btnTimeList.forEach((item, index, arr) => {
					arr[index].isSelected = false;
				})
				itemObj.isSelected = !itemObj.isSelected;
				this.searchText2 = '';
				this.btnIsSelected();
				this.changeTimeRequest(itemObj.name);
			},
			/* 根据标签更改时间段请求数据 */
			changeTimeRequest(name) {
				if (name == '今天') {
					this.searchStartTimeValue = this.$manjs.getNowTime('-');
					this.searchEndTimeValue = this.$manjs.getNowTime('-');
					// console.log(this.searchStartTimeValue, this.searchEndTimeValue)
				} else if (name == '明天') {
					let nowTime = this.$manjs.getNowTime('-').split('-');
					let nowTimeAdd1 = parseInt(nowTime[2]) + 1;
					nowTimeAdd1 = nowTimeAdd1 >= 10 ? nowTimeAdd1 : '0' + nowTimeAdd1;
					this.searchStartTimeValue = nowTime[0] + '-' + nowTime[1] + '-' + nowTimeAdd1;
					this.searchEndTimeValue = nowTime[0] + '-' + nowTime[1] + '-' + nowTimeAdd1;
					// console.log(this.searchStartTimeValue, this.searchEndTimeValue)
				} else if (name == '上周') {
					let lastWeekStartDate = this.$date.getLastWeekStartDate();
					let lastWeekEndDate = this.$date.getLastWeekEndDate();
					this.searchStartTimeValue = lastWeekStartDate;
					this.searchEndTimeValue = lastWeekEndDate;
				} else if (name == '本周') {
					let thisWeekStartDate = this.$date.getWeekStartDate();
					let thisWeekEndDate = this.$date.getWeekEndDate();
					this.searchStartTimeValue = thisWeekStartDate;
					this.searchEndTimeValue = thisWeekEndDate;
				} else if (name == '下周') {
					this.searchStartTimeValue = this.$date.getTime(-7);
					this.searchEndTimeValue = this.$date.getTime(-13);
				} else if (name == '上月') {
					let prevMonthStartDate = this.$date.getLastMonthStartDate();
					let prevMonthEndDate = this.$date.getLastMonthEndDate();
					this.searchStartTimeValue = prevMonthStartDate;
					this.searchEndTimeValue = prevMonthEndDate;
				} else if (name == '本月') {
					let thisMonthStartDate = this.$date.getMonthStartDate();
					let thisMonthEndDate = this.$date.getMonthEndDate();
					this.searchStartTimeValue = thisMonthStartDate;
					this.searchEndTimeValue = thisMonthEndDate;
				} else if (name == '下月') {
					let nowTime = this.$manjs.getNowTime('-').split('-');
					let year = parseInt(nowTime[0]);
					let nextMonth = parseInt(nowTime[1]);
					let nextMonthStartDate = this.$date.getMonthStartDate2(year, nextMonth);
					let nextMonthEndDate = this.$date.getMonthEndDate2(year, nextMonth);
					this.searchStartTimeValue = nextMonthStartDate;
					this.searchEndTimeValue = nextMonthEndDate;
				}
				this.getOrderData();
				// console.log(this.searchStartTimeValue, this.searchEndTimeValue)
			},
			/* 判断哪个按钮被选中 */
			btnIsSelected() {
				this.tagsData = [];
				this.btnTimeList.forEach((item, index, arr) => {
					if (arr[index].isSelected) {
						this.tagsData = [{
							name: arr[index].name,
							id: arr[index].id
						}]
					}
				})
			},
			/* 确认搜索 */
			confirmSearchTime() {
				this.getOrderData();
				this.$refs.popupRef.close();
			},
			/* 按照条件筛选 */
			filterOrderData() {
				let text = this.searchText2;
				let data = this.listData;
				let result = data.filter((item) => {
					if (item.HotelName.indexOf(text) != -1) { //酒店
						return item;
					} else if (item.CityName.indexOf(text) != -1) { //市区
						return item;
					} else if (item.ProjectName.indexOf(text) != -1) { //项目名称
						return item;
					}
				});
				this.listData = result;
			},
			/* 确认选择的开始时间 */
			onConfirm1(val) {
				// console.log(val)
				this.startTimeValue = val.checkArr[0] + '年' + val.checkArr[1] + '月';
				this.searchStartTimeValue = val.checkArr[0] + '-' + val.checkArr[1] + '-01';
				// console.log(this.$manjs.compareTime(this.searchStartTimeValue, this.searchEndTimeValue))
				if (this.$manjs.compareTime(this.searchStartTimeValue, this.searchEndTimeValue) == 1) {
					this.startTimeValue = this.endTimeValue;
					this.searchStartTimeValue = this.searchEndTimeValue;
				}
			},
			/* 确认选择的结束时间 */
			onConfirm2(val) {
				// console.log(val)
				this.endTimeValue = val.checkArr[0] + '年' + val.checkArr[1] + '月';
				this.searchEndTimeValue = val.checkArr[0] + '-' + val.checkArr[1] + '-01';
				if (this.$manjs.compareTime(this.searchStartTimeValue, this.searchEndTimeValue) == 1) {
					this.endTimeValue = this.startTimeValue;
					this.searchEndTimeValue = this.searchStartTimeValue;
				}
			},

			/* 点击选择时间--开始*/
			openTimeChoice_start() {
				this.$refs.picker1.show();
			},
			/* 点击选择时间--结束 */
			openTimeChoice_end() {
				this.$refs.picker2.show();
			},
			/* 点击弹出搜索 */
			inputFocus() {
				setTimeout(() => {
					this.$refs.popupRef.show() // 弹出
				})

			},
			//获取本店订单表格数据
			getOrderData() {
				// console.log(this.searchStartTimeValue)
				// console.log(this.searchEndTimeValue)
				this.$show('加载中');
				let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraOrderInfo/GetCameraOrderInfoList';
				let data = {
					SearchStartTime: this.searchStartTimeValue,
					SearchEndTime: this.searchEndTimeValue,
					From: 'WeChat'
				};
				this.$axios({
					method: 'POST',
					url: url,
					data: data,
					success(res) {
						if (res.data.status) {
							this.$hide();
							// console.log(res)
							this.listData = res.data.data;
							this.filterPerson(res.data.data);
							this.filterOrderData();
						}
					}
				})
			},
			/* 筛选出负责人(销售、拍摄、后期、客服) */
			filterPerson(data) {
				data.forEach(item => {
					let XSList = item.XSList;
					let PSList = item.PSList;
					let HQList = item.HQList;
					let KFList = item.KFList;
					let personArr = [];
					item.personArr = personArr.concat(XSList).concat(PSList).concat(HQList).concat(KFList);
					item.personArr = this.unique(item.personArr, 'UserId')
				})
			},
			/* json数据去重 */
			//json数据去重
			unique(arr, attribute) {
				var new_arr = [];
				var json_arr = [];
				for (var i = 0; i < arr.length; i++) {
					if (new_arr.indexOf(arr[i][attribute]) == -1) { //  -1代表没有找到
						new_arr.push(arr[i][attribute]); //如果没有找到就把这个name放到arr里面，以便下次循环时用
						json_arr.push(arr[i]);
					} else {}
				}
				return json_arr;
			},
			handlerImg() {
				this.$PictureImg({})
			},
			/* 设置内容区的top值 */
			setCtTop() {
				let $statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
				this.contentListTop = ($statusBarHeight + 44) + 'px';
			},
			/* 添加订单 */
			addOrder() {
				this.$refs.as.handleShow({
					actions: [{
							name: '婚礼拍摄',
							color: '#444'
						},
						{
							name: '活动拍摄',
							color: '#444'
						},

					],
					success: (res) => {
						switch (res.id) {
							// -1代表取消按钮
							case -1:
								console.log(res)
								break
							case 0:
								uni.navigateTo({
									url: "pages/addOrder/addOrder?orderType=1&&type=add&&orderId="
								});
								break
							case 1:
								uni.navigateTo({
									url: "pages/addOrder/addOrder?orderType=2&&type=add&&orderId="
								});
								break
						}
					}
				})
			}
		},
		components: {
			uniNavBar
		},

		onLoad() {
			uni.setNavigationBarTitle({
				title: ''
			})
			let nowTime = this.$manjs.getNowTime('-').split('-');
			let week = this.$manjs.getWeek(this.$manjs.getNowTime('-'));
			this.timeText = this.$manjs.getNowTime('.') + '-' + week;
			this.startTimeValue = nowTime[0] + '年' + nowTime[1] + '月';
			this.endTimeValue = '';
			this.searchStartTimeValue = nowTime[0] + '-' + nowTime[1] + '-01';
			this.searchEndTimeValue = '';
		},
		onShow() {
			this.detailFlag = true;
			this.getOrderData();
			this.setCtTop();
			this.getUserPower();
			this.$store.commit('addHotelObj', {
				name: '',
				id: ''
			})
			this.$store.commit('addHunQingObj', {
				name: '',
				id: ''
			});
		},
		onReady() {

		},
		onHide() {

		},
		onUnload() {

		},
		onPullDownRefresh() {
			this.getOrderData();
		},
		onReachBottom() {

		},
		onShareAppMessage() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1];
			let path = "/pages/login/validation/validation?shareOrderList=true&type=orderList&url="+page.route;
			let imageUrl = "http://xilai99.com/camerashootingWXIMG/share.png"
			return {
				title: '订单列表',
				path: path,
				imageUrl: imageUrl
			}
		},
		onPageScroll() {

		},
		watch: {
			searchText2(val) {
				if (val == '') {
					this.getOrderData();
					this.isShowCloseIcon = false;
				} else {
					this.isShowCloseIcon = true;
				}
			},
			tagsData(val) {
				// console.log(val)
				if (val.length != 0) {
					this.isShowTagBox = true;
					this.inputPlaceholder = '';
					this.isShowPlaceholderBox = false;
				} else {
					this.isShowPlaceholderBox = true;
					this.isShowTagBox = false;
					this.inputPlaceholder = '搜索...';
					let nowTime = this.$manjs.getNowTime('-').split('-');
					this.searchStartTimeValue = nowTime[0] + '-' + nowTime[1] + '-01';
					this.searchEndTimeValue = '';
					this.getOrderData();
				}
			}
		},
		filters: {
			OrderDateStr_month(val) {
				return val.split('-')[1] + '.' + val.split('-')[2];
			},
			OrderDateStr_year(val) {
				return val.split('-')[0];
			},
			IsHavingKJ(val) {
				return val ? '(含快剪)' : '';
			},
			OrderStateStr(val) {
				if (val == null || val == 0) {
					return '待回馈订单'
				} else if (val == 1) {
					return '拍摄待交接'
				} else if (val == 2) {
					return '后期制作'
				} else if (val == 3) {
					return '待审核'
				} else if (val == 4) {
					return '退回'
				} else if (val == 5) {
					return '待移交客户'
				} else if (val == 6) {
					return '订单完成'
				}
			},
			startTimeValue(val) {
				if (val == '') {
					return '请选择'
				} else {
					return val
				}
			},
			endTimeValue(val) {
				if (val == '') {
					return '请选择'
				} else {
					return val
				}
			},
		}
	}
</script>

<style>
	#order-index {
		width: 100%;
		position: absolute;
		bottom: 0;
		top: 0;
		right: 0;
	}

	.content-list {
		position: absolute;
		width: 100%;
		overflow: auto;
		height: 100%;
		padding: 27upx 30upx 100upx;
		box-sizing: border-box;
	}

	.time-icon {
		display: inline-block;
		vertical-align: -6upx;
		margin-right: 20upx;
		font-size: 48upx;
	}

	.time-title {
		color: #222;
		font-size: 26rpx;
		width: 300upx;
		position: absolute;
		padding-left: 40upx;
	}

	.time-title .time-icon {
		color: #666;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('~@/static/fonts/iconfont.ttf');
	}

	.iconfont {
		font-family: iconfont;
	}

	.list-search-box {
		padding: 0 6upx;
		width: 680upx;
		height: 70upx;
		position: relative;
	}

	.list-search-box .my-input {
		background: rgba(248, 248, 248, 1);
		border-radius: 35upx;
		width: 100%;
		height: 100%;
		padding: 13upx 30upx 13upx 80upx;
		box-sizing: border-box;
		text-align: center;
		font-size: 26upx;
	}

	.list-search-box .searchBox-searchText2 {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 9;
		left: 100upx;
	}

	.placeholder-box {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: flex;
		align-items: center;
	}

	.placeholder-box text {
		font-size: 26upx;
		color: #BBB;
		margin-right: 8upx;
	}

	.search-icon2 {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 36upx;
		font-size: 28upx;
	}

	.list-search-box .close-search-content {
		width: 33upx;
		height: 33upx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 34upx;
		background: url('http://xilai99.com/camerashootingWXIMG/closeText.png') no-repeat center center;
		background-size: 100% 100%;
		transition: all .2s;
	}

	/* 列表 */
	.index-list {
		min-height: 900upx;
	}

	.index-list .list-inner {
		height: 175upx;
		border-bottom: 1upx dashed #DDD;
		padding: 45upx 0;
		display: flex;
		align-items: center;
		box-sizing: border-box;
	}


	.index-list .list-inner .left {
		flex-basis: 18%;
	}

	.index-list .list-inner>.left>.time-box {
		border: 1upx solid rgba(49, 150, 250, 1);
		width: 96upx;
		height: 96upx;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.index-list .list-inner:nth-child(1n) .left>.time-box {
		background: #FFF;
	}

	.index-list .list-inner:nth-child(2n) .left>.time-box {
		background: #3196FA;
	}


	.index-list .list-inner>.left>.time-box .text-box {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		flex-direction: column;
		align-items: center;
	}

	.index-list .list-inner>.left>.time-box view {
		color: #3196FA;
	}

	.index-list .list-inner:nth-child(2n) .left>.time-box view {
		color: #FFF;
	}

	.index-list .list-inner>.left>.time-box view:nth-child(1) {
		font-size: 24upx;
		margin-bottom: 5rpx;
	}

	.index-list .list-inner>.left>.time-box view:nth-child(2) {
		font-size: 18upx;
	}

	.index-list .list-inner .right {
		flex-basis: 82%;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}

	.index-list .list-inner .right .ct-top,
	.index-list .list-inner .right .ct-bottom {
		position: relative;
		line-height: 50upx;
	}

	.index-list .list-inner .right .ct-top {
		max-width: 500upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 50upx;
		font-size: 26upx;
		color: #666666;
	}

	.index-list .list-inner .right .ct-bottom {
		flex-basis: 100%;
	}

	.index-list .list-inner .right .ct-top text {
		display: inline-block;
		height: 100%;
	}

	.index-list .list-inner .right .ct-top text.text1 {
		font-size: 28upx;
		color: #222222;
	}

	.index-list .list-inner .right .ct-top text.text2 {
		/* font-size: 26upx;
		color: #666666; */
	}

	.index-list .list-inner .right .ct-bottom text.text4-box {
		max-width: 300upx;
		display: inline-block;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin: 2upx 0;
	}

	.index-list .list-inner .right .ct-bottom text.text4 {
		line-height: 32upx;
	}

	.index-list .list-inner .right .ct-bottom text.text4:last-last-of-type .separator {
		display: none;
	}

	.index-list .list-inner .right .ct-bottom text {
		font-size: 24upx;
		color: #999999;
	}

	.index-list .list-inner .right .ct-bottom text.text5 {
		font-size: 22upx;
		position: absolute;
		right: 0;
	}

	.add-order-btn {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		z-index: 999;
		height: 76upx;
		line-height: 76upx;
		background: rgba(234, 244, 254, 1);
		font-size: 26upx;
		color: #3196FA;
		text-align: center;
	}


	/* 高级搜索 */
	.mySquareLayer-box {
		height: 775upx;
		position: relative;
	}

	.mySquareLayer-content-box {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: 600upx;
		padding: 10upx 30upx;
		box-sizing: border-box;
	}

	.mySquareLayer-content-box .searchBox {
		height: 70upx;
		position: relative;
	}

	.mySquareLayer-content-box .searchBox input {
		height: 100%;
		width: 680upx;
		background: #F8F8F8;
		margin: 0 auto;
		border-radius: 35upx;
		padding: 0 77upx;
		color: #222222;
		font-size: 28upx;
		box-sizing: border-box;
	}

	.mySquareLayer-content-box .searchBox .search-icon {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 36upx;
		font-size: 28upx;
	}



	.mySquareLayer-content-box .searchBox .close-search-content {
		width: 33upx;
		height: 33upx;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 34upx;
		background: url('http://xilai99.com/camerashootingWXIMG/closeText.png') no-repeat center center;
		background-size: 100% 100%;
		transition: all .2s;
	}

	.mySquareLayer-content-box .common-use {
		margin: 35upx 0;
		border-top: 1upx dashed #EEEEEE;
		border-bottom: 1upx dashed #EEEEEE;
		height: 285upx;
		padding: 35upx 12upx;
		box-sizing: border-box;
	}

	.mySquareLayer-content-box .common-use .title {
		color: #999999;
		font-size: 28upx;
	}

	.mySquareLayer-content-box .time-search {
		padding: 0 12upx;
	}

	.mySquareLayer-content-box .time-search .title {
		color: #999999;
		font-size: 28upx;
	}

	.choice-btn {
		margin-top: 40upx;
		padding: 0 20upx;
	}

	.choice-btn button {
		width: 98upx;
		height: 48upx;
		line-height: 48upx;
		text-align: center;
		border: 1upx solid rgba(204, 204, 204, 1);
		border-radius: 10upx;
		color: #AAAAAA;
		font-size: 22upx;
		padding: 0;
		margin-right: 30upx;
		margin-bottom: 30upx;
		float: left;
		background: #FFF;
	}

	.choice-btn button:nth-child(5) {
		margin-right: 0;
	}

	/* 高级搜索--时间选择 */
	.time-select {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30upx 20upx;
		box-sizing: border-box;
	}

	.time-select .startTime,
	.time-select .endTime {
		width: 200upx;
		height: 60upx;
		line-height: 60upx;
		border-bottom: 1upx solid #CCCCCC;
		color: #222;
		font-size: 26upx;
		text-align: center;
	}

	.time-select .center-text {
		color: #666666;
		font-size: 26upx;
		margin: 0 16upx;
	}

	.time-select button {
		width: 116upx;
		height: 48upx;
		line-height: 48upx;
		color: #FFFEFE;
		font-size: 22upx;
		background: rgba(117, 186, 255, 1);
		border-radius: 10upx;
		margin: 0;
		padding: 0;
	}

	.isSelectedBtn {
		background: #3196FA !important;
		color: #FFF !important;
		border: 0 !important;
	}

	.tag-box {
		/* background: rgba(0,0,0,.4); */
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 99999;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		padding: 0 80upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: flex-start;
	}

	.tagBox {
		width: 80upx;
		height: 44upx;
		line-height: 44upx;
		background: rgba(0, 0, 0, .4);
		color: #fff;
		font-size: 22upx;
		border-radius: 22upx;
		display: flex;
		justify-content: space-between;
		padding: 0 15upx 0 20upx;
	}

	.tagBox .tagIcon {
		color: #fff;
		font-size: 18upx;
	}

	.personList:last-of-type .dunHao {
		display: none;
	}
</style>
