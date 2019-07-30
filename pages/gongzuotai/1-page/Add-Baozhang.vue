<template>
	<div class='add-baozhang' @click='hanlderColose()'>
		<div class='addZhang'>
			<div class='details-box'>
				报账总览
			</div>
			<div class='add-title-bar'>
				<div class='add-title'>
					<span>总览标题</span>
					<input class='add-input' type="text" v-model='title_obj.title' placeholder="请输入报账总览标题" />
				</div>
				<div class='add-title'>
					<span>总览金额</span> 
					<span class='add-input'>{{ title_obj.Amount }}</span>
				</div>
				<div style='width: 100%;height: 100upx;position: relative;border: none;' class='add-title'>
					<div class='btn-bar-items btn-bar-items-a' @click='handlerTitle()'>保存</div>
				</div>
			</div>
			
		</div>
		<div style='padding-bottom: 200upx;'>
					<div class='swipe'>
				<div class='swipe-all' v-for="( item, index ) in Data_all" :key='index'>
					<uni-swipe-action :options="options" @click="handlerbindClick(index)" @opened='handleropened(item,index)'  :disabled="item.stat" >
						<view class='cont'>
							<div class='uni-collapse-item-bar'>
								<uni-collapse>
									<uni-collapse-item @bindchange='handlerchange' :ref='"opend"+index' :index='index' path="../../static/img/all-icon/Open-icon.png"
									 :open="true" showAnimation='true'>
										<div slot='title' class='details-box'>
											报账明细{{ index + 1 }}
										</div>
										<view style="padding: 30upx;" slot='content' class="vall">
											<div class='add-title add-titles'>
												<span>报账标题</span>
												<input class='add-input' type="text" v-model="item.title" placeholder="请输入报账明细标题" />
											</div>
											<div class='add-title add-titles' style='border-bottom: 1upx solid #DDDDDD;padding-top: 0;'>
												<span>报账金额</span>
												<input class='add-input' type="digit" v-model="item.amount" placeholder="请输入报账明细金额" />
											</div>
											<div class='add-title add-titles'>
												<span>选择类型</span>
												<span v-if='!item.lexin1Text' style='color: #BBBBBB;font-size: 26upx;padding-left: 50upx;' @click='showSinglePicker(1,index)'>请选择类型</span>
												<span v-else style='color: #4c4c4c;font-size: 26upx;padding-left: 50upx;' @click='showSinglePicker(1,index)'>{{ item.lexin1Text }}</span>
												<span v-if='!item.lexin2Text && item.lexin1' style='color: #BBBBBB;font-size: 26upx;padding-left: 50upx;' @click='showSinglePicker(2,index)'>请选择二级类型</span>
												<span v-else style='color: #4c4c4c;font-size: 26upx;padding-left: 50upx;' @click='showSinglePicker(2,index)'>{{ item.lexin2Text }}</span>
											</div>
											<div class='add-title add-titles' v-show='item.lexin1 == 2'>
												<span>是否摊销</span>
												<span v-if='!item.AmoText' style='color: #BBBBBB;font-size: 26upx;padding-left: 50upx;' @click='showSinglePicker(3,index)'>请选择类型</span>
												<span v-else style='color: #4c4c4c;font-size: 26upx;padding-left: 50upx;' @click='showSinglePicker(3,index)'>{{ item.AmoText }}</span>
											</div>
											<div class='add-title add-titles' v-show='item.lexin1 == 2'>
												<span>费用时间</span>
												<span v-if='item.Amo'>
													<span v-if='!item.startTime' style='color: #BBBBBB;font-size: 26upx;padding-left: 50upx;' @click='showSinglePickers(4,index)'>请选择开始时间</span>
													<span v-else style='color: #4c4c4c;font-size: 26upx;padding-left: 50upx;' @click='showSinglePickers(4,index)'>{{ item.startTime }}</span>
													<span v-if='!item.endTime' style='color: #BBBBBB;font-size: 26upx;padding-left: 50upx;' @click='showSinglePickers(5,index)'>请选择结束时间</span>
													<span v-else style='color: #4c4c4c;font-size: 26upx;padding-left: 50upx;' @click='showSinglePickers(5,index)'>{{ item.endTime }}</span>
												</span>
												<span v-else>
													<span v-if='!item.TimeDate' style='color: #BBBBBB;font-size: 26upx;padding-left: 50upx;' @click='showSinglePickers(6,index)'>请选择时间</span>
													<span v-else style='color: #4c4c4c;font-size: 26upx;padding-left: 50upx;' @click='showSinglePickers(6,index)'>{{ item.TimeDate }}</span>
												</span>
											</div>
											<div v-if='item.lexin1 == 1' class='add-title add-titles' style='border-bottom: 1upx solid #DDDDDD;padding-top: 0;'>
												<span>订<span style='display: inline-block;width: 45upx;'></span>单</span>
												<span @click='handlerClickss( index )' style='display: inline-block;width: 450upx;margin-left: 50upx;height: 50upx;' v-if='!item.orderStart'>{{ item.orderremark? item.orderremark:'请选择订单!'}}</span>
												<span v-else style='display: inline-block;width: 490upx;margin-left: 50upx;height: 50upx;'>
													<myInputSearch1a @inputSearch1Focus='hotelFocus' @choiceThis='choiceHotel_demo' @createEvent='createHotel'
													 :myInputSearch1Obj='myHotelSearchObj2' :ref='"myInputs"+index'></myInputSearch1a>
												</span>
											</div>
											<div class='add-title add-titles' style='border-bottom: 1upx solid #DDDDDD;padding-top: 0;'>
												<span>支付对象</span>
												<span @click='handlerClicks( index )' style='display: inline-block;width: 450upx;margin-left: 50upx;height: 50upx;' v-if='!item.playObject'>{{ item.playName? item.playName:'请选择支付对象!'}}</span>
												<span v-else style='display: inline-block;width: 450upx;margin-left: 50upx;height: 50upx;'>
													<myInputSearch1a @inputSearch1Focus='hotelFocus' @choiceThis='choiceHotel' @createEvent='createHotel'
													 :myInputSearch1Obj='myHotelSearchObj' @inputSearch1Bocus='hotelBocus' :ref='"myInput"+index'></myInputSearch1a>
												</span>
											</div>
											<div class='add-title add-titles'>
												<span>报账说明</span>
												<span class='add-input' v-if='!item.fOCUS' @click='handlerFocus(index)'  style="display: inline-block;width: 450upx;margin-left: 50upx;box-sizing: border-box;">{{ item.Shuomin }}</span>
												<textarea focus v-if='item.fOCUS' @blur="handlerBlur(index)" style="width: 450upx;margin-left: 50upx;box-sizing: border-box;padding: 15upx 0;"
												 v-model="item.Shuomin" placeholder="请输入报账说明..." />
												<div v-else style='height: 300upx;'></div>
											</div>
											<div class='add-title add-titles' style='flex-wrap: wrap;border: none;'>
												<span style='display: block;width: 100%;'>报账图片</span>
												<div style='margin-top: 20upx;' class='img-flex'>
													<div>
														<image @click='handlerImgUpdete(index)' src="../../../static/img/all-icon/add-upload-icon.png" mode="widthFix" style="height: 135upx;width: 180upx;"></image>
													</div>
													<div  v-for='(items,i) in item.filelist' :key='i' style='position: relative;'>
														<image @click="handlerClooesImg(items.path,item.filelist)" :src='items.path'  style="max-height: 135upx;max-width: 180upx;" mode="widthFix"></image>
														<i class='detel-icon-img' @click='handlerClooesFile( item.filelist , index , i)'>
															<image src="../../../static/img/all-icon/detel.png" mode=""></image>
														</i>
													</div>
													<div v-for='(items,i) in item.filelistImg' :key='i'  style='position: relative;'>
														<image :src="cosIp+items.path" @click="handlerClooeslistImg(items.path,item.filelistImg)" style="max-height: 135upx;max-width: 180upx;"  mode="widthFix" ></image>
														<i class='detel-icon-img' @click='handlerInternImg( item.filelistImg , index , i,items.path,items )'>
															<image src="../../../static/img/all-icon/detel.png" mode=""></image>
														</i>
													</div>
												</div>
											</div>
										</view>
									</uni-collapse-item>
								</uni-collapse>
							</div>
						</view>
					</uni-swipe-action>
				</div>
			</div>
		</div>
		<!-- 底部 -->
		<div style='width:100%;height:220upx;' class='footer-botton'>
			<div style='background:#EAF4FE;color:#3196FA;font-size:26upx;text-align:center;height: 76upx;line-height: 76upx;' @click='handlerOneArticle()'>再添加一条报账明细</div>
			<div v-if='type == "add"' style='background: #FFFFFF;height: calc( 100% - 76upx);box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.1);' class='footer-bottons'>
				<div class='btn-bar-item' @click='handlerPreservation()'>保存</div>
				<div class='btn-bar-items' @click='handlerPreservations()'>保存并提交</div>
			</div>
			
			<div v-else style='background: #FFFFFF;height: calc( 100% - 76upx);box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.1);' class='footer-botton-bar'>
				<div class='btn-bar' @click='handlerDetelt()'>删除</div>
				<div class='btn-bar'  @click='handlerPreservation()'>保存</div>
				<div class='btn-bar-i'  @click='handlerPreservations()'>保存并提交</div>
			</div>
		</div>
		
		<mpvuePicker :themeColor="themeColor" ref="mpvuePicker" :mode="mode" :deepLength="deepLength" :pickerValueDefault="pickerValueDefault"
		 @onConfirm="onConfirm" @onCancel="onCancel" :pickerValueArray="pickerSingleArray"></mpvuePicker>

		<senSetPicker ref="setpicker" :shixian="shixian" @quxiaoButton="quxiaobutton" @quedingButton="quedingbutton"></senSetPicker>
		
		<myTipsLayer ref="anRef" timer="50" :type="LayerType">
			<text>{{message}}</text>
		</myTipsLayer>

	</div>
</template>

<script>
	import uniCollapse from "../../../components/uni-collapse/uni-collapse.vue";
	import uniCollapseItem from '../../../components/uni-collapse-item/uni-collapse-item.vue';
	import uniSwipeAction from '../../../components/uni-swipe-action/uni-swipe-action.vue';
	import mpvuePicker from '../../../components/mp-vue-Picker/mpvuePicker.vue'
	export default {
		data() {
			const currentDate = this.getDate({
					format: true
			});
			return {
				cosIp:this.$manjs.cosIp,
				branchid:this.$manjs.getkevalue().branchid,		//店id
				type:'',			//当前页面类型
				message:'',			//提示内容
				LayerType:'',		//t提示类型  info、success、 warn、error	
				isDete:false,			//是否可以保存明细
				fOCUS:false,			//输入框是否显示
				title_obj:{
					Amount:'',  //总览金额
					title:''		//总览标题
				},  //总览信息
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#FF5826',
						height: '100rpx'
					}
				}],
				Data_all: [{
					title:'',		//报账标题
					amount:'',		//报账金额
					lexin1: '', //第一种类型
					lexin1Text: '', //第一种类型文字
					lexin2: '', //第二种类型
					lexin2Text: '', //第二种类型文字
					Amo: false, //摊销状态
					AmoText: '', //是否摊销
					startTime: '', //摊销开始时间
					endTime: '', //摊销结束时间
					TimeDate: '', //非摊销时间
					filelist:[],			//上传图片列表
					filelistImg:[],			//已上传图片
					id:'',
					Shuomin:'',			//报账说明
					orderid: "",			//订单id
					orderremark: "",//订单名称
					play:'',			//支付对象
					fOCUS:false,			//说明状态
					playName:'',			//支付对象
					actiontype:'add',			//订单添加还是编辑  add || edit
					playObject:false,			//支付对象状态
					orderStart:false,			//订单状态
					stat:false,
					open:false
				}],			//报账明细 
				applayId:'',			//主表id
				form_index:0,			//当前操作列
				themeColor: '#007AFF',
				deepLength: 1,
				pickerValueDefault: [0],
				pickerSingleArray: [],
				myHotelSearchObj: {
					isShowListBox: false,
					showLoading: false,
					isShowCreated: true,
					myIputPlaceholder: '请输入支付对象',
					createName: '支付对象',
					listData: [],
					/* 选择的酒店对象(name和id) */
					hotelChoiceObj: {},
					hotelKey: '', //酒店输入框关键词
					site: 'bottom',
					index:1 
				},
				myHotelSearchObj2: {
					isShowListBox: false,
					showLoading: false,
					isShowCreated: true,
					myIputPlaceholder: '请输入支付对象',
					createName: '支付对象',
					listData: [],
					/* 选择的酒店对象(name和id) */
					hotelChoiceObj: {},
					hotelKey: '', //酒店输入框关键词
					site: 'bottom',
					index:2
				},
				mode: '',
				index: '',
				timeValue: currentDate,
				shixian: false,

			}
		},
		components: {
			uniCollapse,
			uniCollapseItem,
			uniSwipeAction,
			mpvuePicker
		},
		methods: {
			handleropened( data , index ){
				for(let i = 0; i < this.Data_all.length; i++){
					if(i == index ){
						this.$nextTick(()=>{
							if(this.Data_all[i].open){
								this.Data_all[i].stat = true
							}else{
								this.Data_all[i].stat = false
							}
						})
					}
				}
			},
			// 删除待上传文件
			handlerClooesFile(filelist , index , i){
				this.Data_all.forEach((item,itemIndex) => {
					itemIndex == index ? item.filelist.splice(i,1):null
				})
			},
			// 删除网路图片
			handlerInternImg( filelistImg , index , i, path , current){
				this.$deteleImg({
					key:path,
					callblack(res){
						this.handlerSQLimg(current.id)
						this.Data_all.forEach(( item , itemIndex ) => {
							itemIndex == index ? item.filelistImg.splice(i,1):null
						})
					}
				})
			},
			// 删除数据库图片
			handlerSQLimg( id , callback){
				this.$axios({
					method:'GET',
					url:'/xlapi/CameraManage/AmountManage/Amount/dellprojectfile',
					data:{
						id
					},
					success(res){
						if(res.data.state){
							this.tips('删除成功!','success')
						}else{
							this.tips('删除失败!','error')
						}
						callback && callback.call(this,arguments)
					},
					error(err){
						console.log(err)
					}
				});
			},
			// 支付对象
			handlerClicks( index ){
				this.Data_all[index].playObject = true
			},
			// 订单
			handlerClickss( index ){
				this.Data_all[index].orderStart = true
			},
			// 失去焦点
			hotelBocus(){
				setTimeout(()=>{
					this.Data_all.filter(res => {
						res.playObject = false
						res.orderStart = false
					})
				},500)
			},
			// 添加一条新的报账明细
			handlerOneArticle(){
				let Objects = {
					title:'',		//报账标题
					amount:'',		//报账金额
					lexin1: '', //第一种类型
					lexin1Text: '', //第一种类型文字
					lexin2: '', //第二种类型
					lexin2Text: '', //第二种类型文字
					Amo: false, //摊销状态
					AmoText: '', //是否摊销
					startTime: '', //摊销开始时间
					endTime: '', //摊销结束时间
					TimeDate: '', //非摊销时间
					filelist:[],			//上传图片列表
					filelistImg:[],			//已上传图片
					id:'',
					Shuomin:'',			//报账说明
					orderid: "",			//订单id
					orderremark: "",//订单名称
					play:'',			//支付对象
					fOCUS:false,			//说明状态
					playName:'',			//支付对象
					actiontype:'add',			//订单添加还是编辑  add || edit
					playObject:false,			//支付对象状态
					orderStart:false,			//订单状态
					stat:false,
					open:false
				}
				let data = this.Data_all
				
				for(let i = 0; i < data.length;i++){
					
					if(data[i].title == ''){
						this.tips(`tips:当前报账明细${ i + 1 }标题不可为空`,'warn')
						return
					}else{
						if(title_arr.indexOf(data[i].title) > -1){
							this.tips(`tips:当前报账明细${ i + 1 }标题不可重复`,'warn')
							return
						}else{
							title_arr.push(data[i].title)
						}
					}
					if(data[i].amount == ''){
						this.tips(`tips:当前报账明细${ i + 1 }金额不可为空`,'warn')
						return
					}
					if(data[i].lexin1Text == ''){
						this.tips(`tips:当前报账明细${ i + 1 }类型一不可为空`,'warn')
						return
					}
					if(data[i].lexin2Text == ''){
						this.tips(`tips:当前报账明细${ i + 1 }类型二不可为空`,'warn')
						return
					}
					if(data[i].lexin1 == 1){
						if(data[i].orderid == ''){
							this.tips(`tips:请选择报账明细${ i + 1 }订单!`,'warn')
							return
						}
					}
					if(data[i].AmoText == ''){
						this.tips(`tips:请选择报账明细${ i + 1 }摊销类型`,'warn')
						return
					}else{
						if(data[i].AmoText == '是'){
							if(data[i].startTime == '' || data[i].endTime == ''){
								this.tips(`tips:当前报账明细${ i + 1 }摊销时间不可为空`,'warn')
								return
							}
							data[i].chackdate = ''
						}
						if(data[i].AmoText == '否'){
							if(data[i].TimeDate == ''){
								this.tips(`tips:当前报账明细${ i + 1 }非摊销时间不可为空`,'warn')
								return
							}
							data[i].startTime = ''
							data[i].endTime = ''
						}
					}
					
					if(data[i].play == ''){
						this.tips(`tips:请选择报账明细${ i + 1 }支付对象!`,'warn')
						return
					}
					if(data[i].Shuomin == ''){
						this.tips(`tips:当前报账明细${ i + 1 }说明不可为空!`,'warn')
						return
					}
				}		
				this.tips('添加成功!','success')
				this.Data_all.push(Objects)
			},
			// 关闭
			hanlderColose(){
				this.myHotelSearchObj.isShowListBox = false
				this.myHotelSearchObj2.isShowListBox = false
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
				return `${year}.${month}.${day}`;
			},
			// 侧滑菜单点击事件
			handlerbindClick( index ) {
				
				let data = this.Data_all[index]
				this.$modal('提示','确定该条明细?',()=>{
					this.$show('删除中...')
					console.log(data)
					if(data.id){
						let i = 0;
						if(data.filelistImg.length > 0){
							data.filelistImg.filter( item => {
								i++
								this.$deteleImg({
									key:item.path,
									callblack(r){
										this.handlerSQLimg(item.id,()=>{
											if(i == data.filelistImg.length){
												this.handlerOneMinDetel(data.id,index)
											}
										})
									}
								})
							})
						}else{
							this.handlerOneMinDetel(data.id,index)
						}
						
						
					}else{
						this.Data_all.splice(index,1)
						this.tips('tips:报账明细删除成功!','success')
						this.$hide()
					}
				})
				
			},
			// 单个明细删除
			handlerOneMinDetel(strid,index){
				this.$axios({
					method:'GET',
					url:'/xlapi/CameraManage/AmountManage/Amount/deleteapplyproject',
					data:{
						strid
					},
					success(res){
						if(res.data.state){
							this.Data_all.splice(index,1)
							this.tips('tips:报账明细删除成功!','success')
						}
						else{
							this.tips('删除失败!','error')
						}
						this.$hide()
					},
					error(err){
						console.log(err)
					}
				});
			},
			// 展开或者收起
			handlerchange(data) {
				console.log(data)
				for(let i = 0; i < this.Data_all.length; i++){
					if(i == data.index ){
						this.Data_all[i].open = data.open
						this.$nextTick(()=>{
							if(data.open){
								this.Data_all[i].stat = true
							}else{
								this.Data_all[i].stat = false
							}
						})
					}
				}
			},
			// 单列
			showSinglePicker(type , i) {
				this.index = type;
				this.form_index = i
				this.mode = 'selector'
				this.deepLength = 1
				this.pickerValueDefault = [0]
				if(type == 1){
					this.handlerLeiXing(0,0);
					this.Data_all[i].lexin2 = '';
					this.Data_all[i].lexin2Text = ''
					this.Data_all[i].orderid = '';
					this.Data_all[i].orderremark = ''
				}
				if(type == 2){
					let id = this.Data_all[i].lexin1;			//获取类型一id
					console.log(id)
					this.handlerLeiXing(id,0)
				}
				if(type == 3){
					this.pickerSingleArray = [{label:'是',value:true},{label:'否',value:false}]
				}
				this.$refs.mpvuePicker.show()
			},
			// 取消
			onCancel(e) {
				console.log(e)
			},
			//取消时间
			quxiaobutton() {
				this.shixian = false;
			},
			// 选择时间
			quedingbutton(bangdingyear, bangdingmonth, bangdingday) {
				let timeValue = bangdingyear + "-" + bangdingmonth + "-" + bangdingday;
				// 摊销开始时间
				if (this.index == 4) {
					this.Data_all[this.form_index].startTime = timeValue
				}
				// 摊销结束时间
				if (this.index == 5) {
					this.Data_all[this.form_index].endTime = timeValue
				}
				// 非摊销
				if (this.index == 6){
					this.Data_all[this.form_index].TimeDate = timeValue
				}
				this.shixian = false;
			},
			// 起始时间
			showSinglePickers( type ,index){
				this.form_index = index
				this.index = type
				this.$refs.setpicker.confirm(this.timeValue);
				this.shixian = true;
			},
			// 确定
			onConfirm(data) {
				// 第一种类型
				if (this.index == 1) {
					this.Data_all[this.form_index].lexin1 = data.value[0]
					this.Data_all[this.form_index].lexin1Text = data.label;
				}
				// 第二种类型
				if (this.index == 2) {
					this.Data_all[this.form_index].lexin2 = data.value[0]
					this.Data_all[this.form_index].lexin2Text = data.label
				}
				// 是否摊销
				if (this.index == 3) {
					this.Data_all[this.form_index].Amo = data.value[0]
					this.Data_all[this.form_index].AmoText = data.label
				}
			},
			// 打开对象选择
			hotelFocus(data){
				// 支付对象
				if(data.index == 1){
					this.myHotelSearchObj.isShowListBox = true;
					let val = data.val
					if( val == undefined || val == ''){
						return
					}
					this.$axios({
						method:'POST',
						url:'/xlapi/CameraManage/AmountManage/Amount/getsupplerlist',
						data:{
							key:val,
							numbe:10
						},
						success(res){
							this.myHotelSearchObj.listData = res.data
						},
						error(err){
							console.log(err)
						}
					});
				}
				// 订单
				if(data.index == 2){
					let val = data.val
					this.myHotelSearchObj2.isShowListBox = true
					if(val.length < 4){
						this.tips('tips:请输入四位以上婚期!','warn')
						return
					}
					this.$axios({
						method:'GET',
						url:'/xlapi/CameraManage/AmountManage/Amount/getorertitle',
						data:{
							strname:val
						},
						success(res){
							this.myHotelSearchObj2.listData = res.data
						},
						error(err){
							console.log(err)
						}
					});
				}
			},
			// 创建支付对象
			createHotel(){
				uni.navigateTo({
					url:`../1-page/Add-object`
				});
			},
			handletsboud(index){
				this.Data_all[index].keyfool = false
			},
			// 初始化进入提示
			handlerInitTips(){
				this.tips('tips:请别忘了填写总览标题哦!','warn')
			},
			// 获取支付对象
			choiceHotel(data){
				let val = data.itemObj
				this.Data_all[this.form_index].play = val.id;
				this.Data_all[this.form_index].playName = val.name;
			},
			// 订单
			choiceHotel_demo(data){
				let val = data.itemObj
				this.Data_all[this.form_index].orderid = val.id;
				this.Data_all[this.form_index].orderremark = val.name;	
			},
			//保存标题
			handlerTitle(){
				if(this.title_obj.title == ''){
					this.tips('保存失败!标题不可为空','error')
					return
				}
				this.$axios({
					method:'POST',
					url:'/xlapi/CameraManage/AmountManage/Amount/addmaininfo',
					data:{
						applyid:this.applayId,
						title :this.title_obj.title,
						acttype:'add'
					},
					success(res){
						if(res.data.state){
							this.tips('保存成功!','success')
							this.isDete = true
						}else{
							this.isDete = false
							this.tips('保存失败!请重试','error')
						}
					  },
					error(err){
						console.log(err)
					}
				})
			},
			// 获取主表id
			handlerInfoById(){
				this.$axios({
					method:'GET',
					url:'/xlapi/CameraManage/AmountManage/Amount/addminifno',
					success(res){
						this.applayId = res.data.ID
					},
					error(err){
						this.tips('获取异常!','error')
					}
				});
			},
			tips(msg,type){
				this.message = msg
				this.LayerType = type
				this.$refs.anRef.show();
			},
			// 保存明细
			handlerPreservation( parms ){
				if(!this.isDete && this.type == 'add'){
					this.tips('请先保存总览信息','error')
					return
				}
				
				let title_arr = new Array()
				
				let data = this.Data_all
				
				for(let i = 0; i < data.length;i++){
					
					if(data[i].title == ''){
						this.tips(`tips:当前报账明细${ i + 1 }标题不可为空`,'warn')
						return
					}else{
						if(title_arr.indexOf(data[i].title) > -1){
							this.tips(`tips:当前报账明细${ i + 1 }标题不可重复`,'warn')
							return
						}else{
							title_arr.push(data[i].title)
						}
					}
					if(data[i].amount == ''){
						this.tips(`tips:当前报账明细${ i + 1 }金额不可为空`,'warn')
						return
					}
					if(data[i].lexin1Text == ''){
						this.tips(`tips:当前报账明细${ i + 1 }类型一不可为空`,'warn')
						return
					}
					if(data[i].lexin2Text == ''){
						this.tips(`tips:当前报账明细${ i + 1 }类型二不可为空`,'warn')
						return
					}
					if(data[i].lexin1 == 1){
						if(data[i].orderid == ''){
							this.tips(`tips:请选择报账明细${ i + 1 }订单!`,'warn')
							return
						}
					}
					if(data[i].AmoText == ''){
						this.tips(`tips:请选择报账明细${ i + 1 }摊销类型`,'warn')
						return
					}else{
						if(data[i].AmoText == '是'){
							if(data[i].startTime == '' || data[i].endTime == ''){
								this.tips(`tips:当前报账明细${ i + 1 }摊销时间不可为空`,'warn')
								return
							}
							data[i].chackdate = ''
						}
						if(data[i].AmoText == '否'){
							if(data[i].TimeDate == ''){
								this.tips(`tips:当前报账明细${ i + 1 }非摊销时间不可为空`,'warn')
								return
							}
							data[i].startTime = ''
							data[i].endTime = ''
						}
					}
					
					if(data[i].play == ''){
						this.tips(`tips:请选择报账明细${ i + 1 }支付对象!`,'warn')
						return
					}
					if(data[i].Shuomin == ''){
						this.tips(`tips:当前报账明细${ i + 1 }说明不可为空!`,'warn')
						return
					}
				}		
				for(let i = 0; i < data.length;i++){
					let costtype = ''
					
					if(data[i].Amo){
						costtype = 2
					}
					else{
						costtype = 1
					}
					
					let obj = {
						actiontype: data[i].actiontype,
						amount: data[i].amount,
						applyid:this.applayId,
						begintime: data[i].startTime,
						chackdate: data[i].TimeDate,
						costtype,
						endtime: data[i].endTime,
						id: data[i].id,
						intype: data[i].lexin2,
						orderid: data[i].orderid,
						orderremark: data[i].orderremark,
						play: data[i].play,
						remark:data[i].Shuomin,
						title: data[i].title,
						
					}
					
					this.$show('正在保存!')
					
					this.$axios({
						method:'POST',
						url:'/xlapi/CameraManage/AmountManage/Amount/addprojectinfo',
						data:{
							...obj
						},
						success(res){
							if(res.data.state){
								this.tips(`tips:当前报账明细${ res.data.msg }!`,'success')
								if(data[i].filelist.length > 0){
									this.handlerUpdeteImg(data[i].filelist,res.data.id)
								}
							}else{
								this.tips(`tips:当前报账明细${ i + 1 }保存失败!`,'error')
								this.$hide()
							}
							// 全部提交完成
							if(i+1 == data.length){
								this.$hide()
								parms? parms.callblack.call(this,arguments) : this.$hide()
							}
							
							
						},
						error(err){
							console.log(err)
						}
					})
				}
			},
			// 获取报账一级类型
			handlerLeiXing( id , type ){
				this.$axios({
					method:'GET',
					url:'/xlapi/CameraManage/AmountManage/Amount/getapplytypelist',
					data:{
						strpid:id
					},
					success(res){
						if( type == 0){
							let data = res.data;
							this.pickerSingleArray = data.map( res => ({label:res.name,value:res.id}))
						}
						else{
							console.log(res)
						}
					},
					error(err){
						console.log(err)
					}
				})
			},
			// 选择图片
			handlerImgUpdete( index ){
				
				let obj = JSON.parse(JSON.stringify(this.Data_all))
				
				this.Data_all = []
				this.$PictureImg().then(res => {
					let data = res.tempFiles
					for(let i = 0; i < data.length;i++){
						obj[index].filelist.push({
							path:data[i].path,
							size:data[i].size,
							index:i
						})
					}
					
					this.Data_all = obj;
				}).catch(( err )=>{
					this.Data_all = obj;
				})
				this.hanlderColose()
			},
			// 图片预览
			handlerClooesImg(current,urls){
				let imglist = urls.map(res => {
					return res.path
				})
				wx.previewImage({
					current:current,
					urls: imglist,
					success: function(res) {
						console.log(res)
					}
				})
			},
			// 网络图片预览
			handlerClooeslistImg( current,urls ){
				let dataImg = urls.map( res => this.cosIp + res.path)
				wx.previewImage({
					current:this.cosIp + current,
					urls: dataImg,
					success: function(res) {
						console.log(res)
					}
				})
			},
			// 报账说明
			handlerFocus(index){
				this.Data_all[index].fOCUS = true;		
			},
			handlerBlur(index){
				this.Data_all[index].fOCUS = false;	
			},
			// 图片上传至腾讯云
			handlerUpdeteImg( data , id){
				let files = data.map( res => {
					return {
						path:res.path,
					}
				})
				this.$uploadTasks({
					files:files,
					key:`${'/'+this.branchid}`+'/amouent/'+ id,
					guid:true,		//是否生成随机数
					callback(a,b){
						
						this.handlerDataImg(b.headers.Location.split('com')[1],id)
					}
				})
			},
			// 保存至数据库
			handlerDataImg(path,id){
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/addprojectfile',
				  data:{
					applyid:id,
					filepath:path
				  },
				  success(res){
					console.log(res)
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			// 保存并提交
			handlerPreservations(){
				this.handlerPreservation({
					callblack(){
						
						this.$show('正在提交...')
						this.handlerTiSublimt()
					}
				})
			},
			// 保存并提交
			handlerTiSublimt(){
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/updatestate',
				  data:{
					id:this.applayId
				  },
				  success(res){
						if(res.data.state){
							this.tips(`tips:提交成功!`,'success')
							
						}else{
							this.tips(`tips:提交失败!`,'error')
						}
						this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			/*******************编辑******************/ 
			// 初始化编辑数据
			handlerEdit(data){
				this.applayId = data.ID
				this.title_obj = {
					Amount:data.amount? data.amount : '',  //总览金额
					title:data.Title		//总览标题
				}  //总览信息
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/getprojectlist',
				  data:{
					applyid: data.ID,
					stae: data.state
				  },
				  success(res){
					this.handlerEditAdd(res.data)
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			// 获取订单详情
			handlerEditAdd( data ){
				for(let i = 0 ; i < data.length; i++){
					this.$axios({
					  method:'GET',
					  url:'/xlapi/CameraManage/AmountManage/Amount/getprojectmodel',
					  data:{
						strid:data[i].id
					  },
					  success(res){
							this.handlerEditAdds(res.data)
							this.applayId = res.data.ApplyID
					  },
					  error(err){
						console.log(err)
					  }
					});
				}
			},
			// 渲染列表
			handlerEditAdds( data ){
				let Objects = {
					title:data.Name,		//报账标题
					amount:data.Amoumt,		//报账金额
					lexin1: data.pid, //第一种类型
					lexin1Text: data.pid == 2? "业务报账" : "行政报账", //第一种类型文字
					lexin2:data.Type, //第二种类型
					lexin2Text:data.typename,
					Amo: data.costType == 1? false:true, //摊销状态
					AmoText: data.costType == 1? '否':'是', //是否摊销
					startTime: data.amortizationStartDate? data.amortizationStartDate.substring(0,10):'', //摊销开始时间
					endTime:  data.amortizationEndDate? data.amortizationEndDate.substring(0,10):'', //摊销结束时间
					TimeDate: data.checkdatae? data.checkdatae.substring(0,10):'', //非摊销时间
					filelist:[],			//上传图片列表
					filelistImg:[...data.filsit],
					id:data.ID,
					Shuomin:data.Reamrk,			//报账说明
					orderid: data.OrderID,			//订单id
					orderremark: data.OrderRemark,//订单名称
					play:data.PlayID,			//支付对象
					fOCUS:false,			//说明状态
					playName:data.playname,			//支付对象
					playObject:false,			//支付对象状态
					orderStart:false,			//订单状态
					actiontype: "edit",
					stat:false,
					open:false
				}
				this.Data_all.push(Objects)
			},
			// 删除明细
			handlerDetelt(){
				this.$modal('删除','确定删除该订单?',
				(data)=>{
					this.handlerConfirmDetel()
				})
			},
			// 确认删除
			handlerConfirmDetel(){
				this.$show('删除中...')
				let data = this.Data_all
				// 获取所有图片path or id
				let Imgpath = [];
				let ImgId = [];	
				data.forEach(res => {
					let data = res.filelistImg.map(res => {
						Imgpath.push(res.path)
						ImgId.push(res.id)
					})
				})
				if(ImgId.length == 0){
					this.handlerDeteleMin()
				}
				for (let i = 0; i < Imgpath.length;i++) {
					this.$deteleImg({
						key:Imgpath[i],
						callblack(res){
							i++
							if(i == Imgpath.length){
								ImgId.forEach((res,index) => {
									this.handlerSQLimg(res)
									index++
									if(index == ImgId.length){
										this.handlerDeteleMin()
									}
								})
							}
						}
					})
				}
			},
			handlerDeteleMin(){
				this.$axios({
				  method:'GET',
				  url:'/xlapi/CameraManage/AmountManage/Amount/deletemainapply',
				  data:{
					strid:this.applayId
				  },
				  success(res){
						if(res.data.state){
							this.tips(`tips:删除成功!`,'success')
							setTimeout(()=>{
								wx.navigateBack({
								  delta: 1
								})
							},300)
							this.Data_all = []
						}else{
							this.tips(`tips:删除失败!`,'error')
						}
						this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			}
		},
		onLoad( option ) {
			if(option.type == 'add'){
				wx.setNavigationBarTitle({
				   title: '添加我的报账'
				})
				this.handlerInitTips()
				this.handlerInfoById()
			}else{
				this.handlerEdit(JSON.parse(option.data))
				wx.setNavigationBarTitle({
				   title: '编辑我的报账'
				})
			}
			this.type = option.type
			this.handlerLeiXing(0,0)
		},
		onShow() {
			
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

		}
	}
</script>

<style>
	.detel-icon-img > image {
		max-height: 30upx;
		max-width: 30upx;
		border-radius: 50%;
	}
	.detel-icon-img{
		position: absolute;
		background: #3196FA;
		width: 41upx;
		height: 41upx;
		display: inline-block;
		top: -20.5upx;
		right: -20.5upx;
		border-radius: 50%;
		text-align: center;
		line-height: 50upx;
	}
	.img-flex{
		display: flex;
		flex-wrap: wrap;
	}
	.img-flex > div {
		margin: 15upx;
	}
	.btn-bar-items-a{
		border-radius: 45upx;
		width:200upx;
		font-size: 28upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
/* 		position: absolute;
		right: 0;
		left: 0;
		bottom: 0; */
		margin: auto;
	}
	.btn-bar-i{
		width:260upx;
		height:84upx;
		background:rgba(49,150,250,1);
		border-radius:42upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 84upx;
		font-size:30upx ;
	}
	.btn-bar:nth-child(2){
		margin:0 40upx;
	}
	.btn-bar{
		width:164upx;
		height:84upx;
		border:1px solid rgba(49,150,250,1);
		border-radius:42upx;
		font-size:30upx ;
		color: #3196FA;
		text-align: center;
		line-height: 84upx;
	}
	.btn-bar-item{
		border:1px solid rgba(49,150,250,1);
		color: #3196FA;
		margin-right: 80upx;
		
	}
	.btn-bar-items{
		background:rgba(49,150,250,1);
		color: #FFFFFF;
	}
	.footer-bottons div{
		width:230upx;
		height:84upx;
		font-size: 30upx;
		text-align: center;
		line-height: 84upx;
		border-radius: 42upx;
	}
	.footer-botton-bar{
		display: flex;
		box-sizing: border-box;
		padding: 30upx 40upx;
	}
	.footer-bottons{
		display: flex;
		box-sizing: border-box;
		padding: 30upx 120upx;
	}
	.footer-botton{
		position: fixed;
		bottom: 0;
	}
	.add-titles {
		margin-bottom: 20upx;
	}

	.mpvue-picker__hd {
		height: 50px;
		line-height: 50px;
	}

	.swipe {
		box-sizing: border-box;
		padding: 0upx 25upx;
		margin-bottom:300upx;
	}

	.uni-collapse-cell__title {
		padding: 0 !important;
	}

	.uni-collapse-cell--open {
		background: #FFFFFF !important;
	}

	.uni-collapse-cell__title {
		border-bottom: 1upx dashed rgba(204, 204, 204, 1);
	}

	.uni-collapse-item-bar {

		border-radius: 5upx;
		background: #F9F9F9;
	}

	.addZhang {
		box-sizing: border-box;
		padding: 0 30upx;
		border-bottom: 7upx solid #EEEEEE;
	}

	.add-title-bar {
		box-sizing: border-box;
		padding: 0upx 20upx;
	}

	.add-title>span {
		font-size: 26upx;
		color: #666666;
		line-height: 50upx;
		display: inline-block;
	}

	.add-title {
		display: flex;
		padding-bottom: 40upx;
		padding-top: 40upx;
		border-bottom: 1upx solid #DDDDDD;
	}

	.add-title:nth-child(2) {
		padding-top: 40upx;
	}

	.add-input {
		width: 75%;
		font-size: 26upx;
		padding-left: 50upx;
	}

	.add-baozhang {
		width: 100%;
		height: auto;
	}

	.details-box {
		width: 100%;
		height: 40upx;
		margin: 30upx 0;
		border-left: 1px solid #3196FA;
		border-left-width: 6upx;
		font-size: 26upx;
		color: #3196FA;
		box-sizing: border-box;
		padding: 0upx 15upx;
		line-height: 40upx;
	}
</style>
