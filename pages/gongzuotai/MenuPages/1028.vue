<template style='height: 100%;'>
	<div style='height: 100%;' :class='{"page-overflow":overflow}'>
		<div class='box-bar-title'>
			<span>当前账号余额(元):{{ dist_data.sumamount }}</span>
			<span @click='handlerUserQ()'>
				<span>{{ dist_data.title }}</span>
				<i></i> 
			</span>
		</div>
		<div class='box-bar-nav' style='height: 100%;'>
			<div style='width: 100%;' class='box-bar-nav-tiles'>
				<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#3196FA"></uni-segmented-control>
			</div>
			<ul class='select-time'>
				<li @click='handlerSetTime(index)' v-for='(item,index) in time_nav' :class='{"boder-Color":item.sta}' :key='index'>
					{{ item.name }}
				</li>
			</ul>
			<div class='card-time-content' v-if='index == 4 && time_start'>
				<div class='card-time'>
					<div class='start-time'>
						<span>开始时间</span>
						<span @click='handlerTimeme(1)' :class='{"color-font":!POST_DATA.btime}'>{{ POST_DATA.btime? POST_DATA.btime:"请选择时间" }}</span>
					</div>
					<div class='end-time'>
						<span>结束时间</span>
						<span @click='handlerTimeme(2)' :class='{"color-font":!POST_DATA.endtime}'>{{ POST_DATA.endtime?POST_DATA.endtime:"请选择时间"}}</span>
					</div>
				</div>
				<div v-if='!POST_DATA.btime' class='card-time-content-btn'  @click='handlerSelectTime()'>
					查询
				</div>
				<div v-else class='card-time-content-btn' style='background: #3196FA;' @click='handlerSelectTime()'>
					查询
				</div>
			</div>
			<view class="content">
				<card style='margin:20upx 0' v-for="(item,index) in Data_all" :key="index" :flag='flag' :items="item"></card>
			</view>
		</div>
		<senSetPicker ref="setpicker" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></senSetPicker>
		<mpvue-picker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" :pickerValueArray="pickerValueArray"></mpvue-picker>
	</div>
</template>

<script>
	import uniSegmentedControl from "@/components/uni-segmented-control/uni-segmented-control.vue"
	import mpvuePicker from '../../../components/mp-vue-Picker/mpvuePicker.vue'
	import card from '../6-page/Item-card'
	export default {
		data() {
			const currentDate = this.getDate({
					format: true
			});
			return {
				items: ['全部', '收入', '支出'],
				flag:true,
				current: 0,			//祖菜单
				index:0,			//次级菜单
				overflow:true,					//自定义时间禁止滚动
				shixian:false,				//是否显示时间选择
				time_start:false,			//自定义选择时间
				Time_Index:'',				//当前选择时间
				timeValue:'2019/7/29',
				time_nav: [{
						name: '一个月',
						sta: true
					},
					{
						name: '两个月',
						sta: false
					},
					{
						name: '三个月',
						sta: false
					},
					{
						name: '半年',
						sta: false
					},
					{
						name: '自定义',
						sta: false
					},
				],
				dist_data:{
					sumamount:'',
					title:''
				},
				POST_DATA:{
					address: "",
					btime: "",			//开始时间
					endtime: "",			//结束时间
					temp: 0,
					title: "",
					isout:'' //0、支出 1、收入
				},
				Data_all:[],
				user_List:[],			//当前所有账户
				// 选择
				cityPickerValueDefault: [0, 0, 1],
				themeColor: '#75BAFF',
				pickerText: '',
				mode: '',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerValueArray:[]
			}
		},
		components: {
			uniSegmentedControl,card,mpvuePicker
		},
		methods: {
			// 确定切换
			onConfirm( data ){
				this.dist_data.title = data.label
				this.POST_DATA.address = data.value[0]
				let id = data.value;			//当前id
				this.user_List.map(res => {
					if(res.id == id){
						this.dist_data.sumamount = res.amountbalance
					}
					
				})
				this.$show('加载中...')
				this.handlerTableList()
			},
			// 弹出账号切换
			handlerUserQ(){
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				this.$refs.mpvuePicker.show();
				this.pickerValueArray = this.user_List.map( res => ({label:res.title,value:res.id}))
			},
			// 祖级菜单切换
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				// 恢复默认时间选择
				for(let i = 0; i < this.time_nav.length;i++){
					if(i == 0){
						this.time_nav[i].sta = true
					}else{
						this.time_nav[i].sta = false
					}
				}
				if(index == 0){
					this.POST_DATA.isout = ''
				}
				if(index == 1){
					this.POST_DATA.isout = 1
				}
				if(index == 2){
					this.POST_DATA.isout = 0
				}
				this.index = 0
				this.index == 4? this.overflow = false : this.overflow = true
				if(this.index == 0){
					this.flag = true
				}else{
					this.flag = false
				}
				this.$show('加载中...')
				this.handlerTableList()
			},
			// 次级时间选择
			handlerSetTime( index ){
				for(let i = 0; i < this.time_nav.length;i++){
					if(i == index){
						this.time_nav[i].sta = true
					}else{
						this.time_nav[i].sta = false
					}
				}
				this.index = index;
				index == 4? this.overflow = false : this.overflow = true
				index == 4? this.time_start = true : this.time_start = false,
				
				// 计算时间
				this.handlerTimes(index)
				
			},
			// 二级菜单时间
			handlerTimes(index){
				let endTime = this.POST_DATA.endtime;
				let ThisStamp = new Date(endTime).getTime();			//获取当前时间戳
				let DayTime = 60 * 60 * 24 * 1000;					//一天所需毫秒
				let StampTime = 0;						//计算后日期
				// 获取时间
				let DateTime = new Date(endTime)
				// 获取当前年份
				let year = DateTime.getFullYear()
				//获取当前月
				let getMonth = DateTime.getMonth() + 1;		
				// 年份类型判断
				let a = year % 4   == 0
				let b = year % 100 != 0
				let c = year % 400 == 0
				 //闰年：
				let cond = a && b || c;
				
				let yearType = false			//平年为false 
				if(cond) {
					yearType = true
				} else {
					yearType = false
				}
				// 判断当前是否为2月
				if((getMonth-1) == 2){
					if(yearType){
						StampTime = DayTime*29
					}else{
						StampTime = DayTime*28
					}
				}
				// 判断是否为大月还是小月
				if(getMonth % 2 == 0){
					StampTime = DayTime*31
				}else{
					StampTime = DayTime*30
				}
				let times = ''
				// 查询
				if(index == 0){
					this.$show('加载中...')
					this.handlerTableList()
				}else{
					if(index == 1){
						StampTime = StampTime * 2
						times = this.handlerTimeDay("'yy/MM/dd hh:mm:ss'",ThisStamp - StampTime)	
					}
					if(index == 2){
						StampTime = StampTime * 3
						times = this.handlerTimeDay("'yy/MM/dd hh:mm:ss'",ThisStamp - StampTime)	
					}
					if(index == 3){
						StampTime = StampTime * 6
						times = this.handlerTimeDay("'yy/MM/dd hh:mm:ss'",ThisStamp - StampTime)	
					}
					this.$show('加载中...')
					this.POST_DATA.btime = times
					this.handlerTableList()
				}

			},
			// 时间转换
			handlerTimeDay(fmt,ThisStamp){
				let date = new Date(ThisStamp)
				var o = {
					"M+": date.getMonth() + 1, // 月份
					"d+": date.getDate(), // 日
					"h+": date.getHours(), // 小时
					"m+": date.getMinutes(), // 分
					"s+": date.getSeconds(), // 秒
					"q+": Math.floor((date.getMonth() + 3) / 3), // 季度
					"S": date.getMilliseconds() // 毫秒
				};
				if (/(y+)/.test(fmt))
					fmt = fmt.replace(RegExp.$1, (date.getFullYear() + ""));
				for (var k in o)
					if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt.split("'")[1].split(' ')[0];
			},
			// 获取当前时间
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				} else if (type === 'now') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				console.log(day)
				return `${year}.${month}.${day}`;
			},
			// 时间
			quedingbutton(bangdingyear, bangdingmonth, bangdingday) {
				let timeValue = bangdingyear + "/" + bangdingmonth + "/" + bangdingday;
				this.timeValue = timeValue
				if(this.Time_Index == 1){
					this.POST_DATA.btime = timeValue
				}
				if(this.Time_Index == 2){
					this.POST_DATA.endtime = timeValue
				}
				this.shixian = false;
			},
			// 起始时间
			showSinglePickers( type ){
				this.index = type
				this.$refs.setpicker.confirm(this.timeValue);
				this.shixian = true;
			},
			// 取消
			quxiaobutton(){
				this.shixian = false;
			},
			// 开始或者结束时间
			handlerTimeme( index ){
				this.Time_Index = index;
				this.shixian = true
			},
			// 查询
			handlerSelectTime(){
				this.overflow = false;
				this.time_start = false
				this.handlerTableList()
			},
			handlerInit( type ){
				this.$show('加载中...')
				this.$axios({
				  method:'GET',
				  url:'/xlapi/CameraManage/AmountManage/Amount/getamountbalance',
				  data:{
					strdate:type
				  },
				  success(res){
					this.dist_data.sumamount = res.data.sumamount
					this.POST_DATA.btime = res.data.btime
					this.POST_DATA.endtime = res.data.etime
					this.user_List = res.data.list
					this.POST_DATA.address = res.data.list[0].id
					this.dist_data.title = res.data.list[0].title
					this.dist_data.sumamount = res.data.list[0].amountbalance
					this.handlerTableList()
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			
			// 获取列表数据
			handlerTableList(){
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/getamountbalancelist',
				  data:{
					...this.POST_DATA
				  },
				  success(res){
					  this.Data_all = res.data
					  uni.stopPullDownRefresh();
					  this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			handlertimesSelcet(){
				let date = new Date()
				let year = date.getFullYear()
				let month = date.getMonth() + 1
				let day = date.getDate()
				this.timeValue =  year + "." + month + "." + day
				this.$refs.setpicker.confirm(this.timeValue);
			}
		},
		onLoad() {
			this.handlerInit('')
			this.handlertimesSelcet()
		},
		onShow() {
			this.handlerTimes(0)
			this.overflow = false
		},
		onReady() {

		},
		onHide() {

		},
		onUnload() {

		},
		onPullDownRefresh() {
			this.handlerTimes(0)
		},
		onReachBottom() {

		},
		onShareAppMessage() {

		},
		onPageScroll() {

		}
	}
</script>

<style>
	i{
		display: inline-block;
		width: 30upx;
		height: 30upx;
		background: url(../../../static/img/all-icon/Arrow-rgiht.png) no-repeat center;
		margin-top: 17rpx;
		background-size: 50%;
		position: relative;
		top: 6upx;
		left: 5upx;
	}
	.content{
		margin-top: 300upx;
		margin-bottom: 100upx;
	}
	.color-font{
		font-size: 28upx;
		color: #BBBBBB;
	}
	.end-time,
	.start-time{
		display: flex;
		justify-content: space-between;
	}
	.card-time div{
		font-size: 28upx;
		color: #666666;
		height: 105upx;
		line-height: 105upx;
	}
	.start-time{
		border-bottom: 1upx dashed rgba(210,210,210,1);
	}
	.card-time{
		width: 100%;
		height: 212upx;
		margin-bottom: 41upx;
		background:rgba(249,249,249,1);
		border:1px dashed rgba(210,210,210,1);
		border-radius:10upx;
		box-sizing: border-box;
		padding: 0 35upx;
		display: flex;
		flex-direction: column;
		justify-content:space-between;
	}
	.card-time-content-btn{
		width:100%;
		height:80upx;
		background:rgba(117,186,255,1);
		border-radius:10upx;
		color: #FFFFFF;
		font-size: 28upx;
		text-align: center;
		line-height: 80upx;
	}
	.card-time-content{
		width: 100%;
		height: calc( 100% - 280upx);
		/* position: fixed; */
		background-color: #FFFFFF;
		box-sizing: border-box;
		padding: 0 30upx;
		margin-top: 280upx;
	}
	page{
		height: 100%;
		overflow: hidden;
	}
	.page-overflow{
		overflow: auto;
		-webkit-overflow-scrolling:touch;
	}
	.select-time{
		display: flex;
		justify-content: space-around;
		padding: 20upx 0;
		position: fixed;
		top: 175upx;
		width: 100%;
		background: #FFFFFF;
	}
	.select-time li{
		color:#666666 ;
		font-size: 26upx;
	}
	.boder-Color{
		color: #3196FA !important;
		padding-bottom:10upx;
		border-bottom: 2upx solid #3196FA;
	}
	.box-bar-nav {
		margin: 40upx 0;
	}

	.box-bar-title {
		background: #F4F4F4;
		width: 100%;
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 0 20upx;
		font-size: 26upx;
		color: #666666;
		position: fixed;
		top:0;
	}

	.segmented-control {
		width: 95% !important;
		margin-top: 20upx !important;
	}
	.box-bar-nav-tiles{
		width: 100%;
		height: 60px;
		position: fixed;
		top: 80upx;
		background: #FFFFFF;
	}
</style>
