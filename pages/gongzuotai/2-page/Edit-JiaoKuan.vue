<!-- 添加我的交款 -->
<template>
	<div  class='box'  @click='hanlderColose()'>
		<div class='add-title add-titles'>
			<span>订单</span>
			<span @click='handlerClicks( index )' style='display: inline-block;width: 490upx;margin-left: 50upx;height: 50upx;' v-if='!playObject'>
				{{ playName? playName:'请选择订单!'}}
			</span>
			<span v-else style='display: inline-block;width: 490upx;margin-left: 50upx;height: 50upx;'>
				<myInputSearch1 @inputSearch1Focus='hotelFocus' :index='0' @choiceThis='choiceHotel' @createEvent='createHotel'
				 :myInputSearch1Obj='myHotelSearchObj' @inputSearch1Bocus='hotelBocus' ref='myInputSearch1_hotel'></myInputSearch1>
			</span>
		</div>
		<div class='add-title add-titles'>
			<span>编号</span>
			<input class='add-input' type="text" v-model="from_data.no" placeholder="请输入报账总览标题" />			
		</div>
		<div class='add-title add-titles'>
			<span>类型</span>
			<mySelect style='padding-left: 40upx;' :mySelectObj='myXMSelectObj1' @selectConfirm='getValue_XM1' ref='mySelect_XM1'></mySelect>		
		</div>
		<div class='add-title add-titles'>
			<span>金额</span>
			<input class='add-input' type="text" v-model="from_data.amount" placeholder="请输入金额" />			
		</div>
		<div class='add-title add-titles'>
			<span>账号</span>
			<mySelect style='padding-left: 40upx;' :mySelectObj='myXMSelectObj2' @selectConfirm='getValue_XM2' ref='mySelect_XM2'></mySelect>		
		</div>
		<div class='add-title add-titles' style='border: none;'>
			<span>报账说明</span>
			<textarea style="width: 450upx;margin-left: 50upx;box-sizing: border-box;padding: 6upx 0;font-size: 30upx;"
			placeholder="请输入报账说明..." v-model="from_data.remark"/>
		</div>
		<div class='footer-btn' v-if='type == "edit"'>
			<div @click='handlerDetel()'>删除</div>
			<div @click='handlerBaoCun()' >保存</div>
			<div @click='handlerSubmission()'>保存并提交</div>
		</div>
		<div class='footer-btn footer-btn-bar' v-else>
			<div @click='handlerBaoCun()' >保存</div>
			<div @click='handlerSubmission()'>保存并提交</div>
		</div>
		<myTipsLayer ref="anRef" timer="50" :type="LayerType">
			<text>{{message}}</text>
		</myTipsLayer>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				type:'add',				//当前状态
				id:'',					//当前id
				playObject:false,		//订单状态
				playName:'',			//订单名称
				message:'',								//提示信息
				LayerType:'',		//t提示类型  info、success、 warn、error	
				typeStart:'',				//当前交款状态
				from_data:{
					actiontype: "",
					address: "",
					amount: "",
					id: "",
					no: "",			//编号
					order: "",
					orderremark: "",
					remark: "",
					type: ""
				},
				Initialization:{},			//初始化数据
				myHotelSearchObj: {
					isShowListBox: false,
					showLoading: false,
					isShowCreated: false,
					myIputPlaceholder: '请输入订单',
					createName: '支付对象',
					listData: [],
					/* 选择的酒店对象(name和id) */
					hotelChoiceObj: {},
					hotelKey: '', //酒店输入框关键词
					site: 'bottom',
					index:1				//当前第一个
				},
				myXMSelectObj1: {
					mySelectPlaceholder: '选择类型',
					array: [],
					index: 0,
					isSelectedObj: {},
				},
				myXMSelectObj2: {
					mySelectPlaceholder: '选择账号',
					array: [],
					index: 0,
					isSelectedObj: {},
				}
			}
		},
		methods:{
			// 提示
			tips(msg,type){
				this.message = msg
				this.LayerType = type
				this.$refs.anRef.show();
			},
			// 打开选择订单
			hotelFocus(data){
				let val = data.val
				this.myHotelSearchObj.isShowListBox = true
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
						this.myHotelSearchObj.listData = res.data
					},
					error(err){
						console.log(err)
					}
				});
			},
			// 创建
			createHotel(){
				uni.navigateTo({
					url:`../1-page/Add-object`
				});
			},
			// 支付对象
			handlerClicks( index ){
				this.playObject = true
			},
			// 失去焦点
			hotelBocus(){
				setTimeout(()=>{
					this.playObject = false
				},500)
			},
			// 当前选中对象
			choiceHotel( data ){
				let val = data.itemObj
				this.from_data.order = val.id
				this.from_data.orderremark = val.name
				this.playName = val.name
			},
			// 关闭
			hanlderColose(){
				this.myHotelSearchObj.isShowListBox = false
			},
			// 已选择交款类型
			getValue_XM1( data ){
				this.from_data.type = data.value
			},
			// 已选择交款账号
			getValue_XM2(data){
				this.from_data.address = data.value
			},
			//  获取报账类型
			handlerAccount(){
			  this.$axios({
				method:'GET',
				url:'/xlapi/CameraManage/AmountManage/AmountOrder/getamounttype',
				success(res){
					this.myXMSelectObj1.array = res.data.map(res => ({label:res.name,value:res.id}))
				},
				error(err){
				  console.log(err)
				}
			  })
			},
			//  获取账号类型
			handleruserById(){
			  this.$axios({
				method:'GET',
				url:'/xlapi/CameraManage/AmountManage/AmountOrder/getamountinaddress',
				success(res){
				  this.myXMSelectObj2.array = res.data.map(res => ({label:res.name,value:res.id}))
				},
				error(err){
				  console.log(err)
				}
			  })
			},
			// 保存
			handlerBaoCun(callblack){
				this.$show('正在保存...')
				this.$axios({
					method:'POST',
					url:'/xlapi/CameraManage/AmountManage/AmountOrder/addorderamount',
					data:{
						...this.from_data
					},
					success(res){
						let state = res.data.state 
						this.tips(`${state?res.data.msg:"保存失败!"}`,`${state? "success":"error"}`)
						this.$hide()
						this.typeStart = 1;			//
						callblack && callblack.call(this,state,res.data.id)
					},
					error(err){
					  console.log(err)
					}
				})
			},
			// 交款提交
			handlerSubmission(){
				this.handlerBaoCun((res,id)=>{
					res? this.$modal('提交','确定提交交款?',
					(data)=>{
						this.$show('正在提交...')
						this.handlerSubmins(id)
					}):null
				})
			},
			// 确认提交
			handlerSubmins(id){
				if(this.typeStart != 0){
					this.$hide()
					this.tips('当前交款异常!','error')
					return
				}
				this.$axios({
					method:'GET',
					url:'/xlapi/CameraManage/AmountManage/AmountOrder/updateamountlog',
					data:{
						id
					},
					success(res){
						if(res.data.state){
							this.tips('提交成功!','success')
						}else{
							this.tips('提交失败!','error')
						}
						this.$hide()
					},
					error(err){
						console.log(err)
					}
				})
			},
			/***************编辑*******************/ 
			// 获取当前编辑详情
			handlerEditData( id ){
				
				this.$axios({
					method:'GET',
					url:'/xlapi/CameraManage/AmountManage/AmountOrder/getamountlog',
					data:{
						id
					},
					success(res){
						this.handlerFromData(res.data)
					},
					error(err){
					  console.log(err)
					}
				})
			},
			// 渲染编辑数据
			handlerFromData( data ){
				let a = this.from_data
				a.no = data.NO			//编号
				a.address = data.ToAddress
				a.amount = data.amount
				a.id = data.id
				a.order = data.Order_ID
				a.orderremark = data.orderremark
				a.remark = data.Remark
				a.type = data.Type
				this.playName = data.orderremark
				// 属性类型
				this.myXMSelectObj1.array.forEach(res => {
					if(res.value == a.type){
						this.$refs.mySelect_XM1.pickerText = res.label
					}
				})
				// 账号类型
				this.myXMSelectObj2.array.forEach(res => {
					if(res.value == a.address){
						this.$refs.mySelect_XM2.pickerText = res.label
					}
				})
			},
			// 是否交款删除
			handlerDetel(){
				this.$modal('删除','确定删除交款?',
				(data)=>{
					this.$show('正在删除...')
					this.handlerDetels()
				})
				
			},
			// 确认删除
			handlerDetels(){
				let striid = this.from_data.id;
				this.$axios({
					method:'GET',
					url:'/xlapi/CameraManage/AmountManage/AmountOrder/deletelog',
					data:{
						striid
					},
					success(res){
						let state = res.data.state 
						this.tips(`${res.data.msg}`,`${state? "success":"error"}`)
						this.$hide()
					},
					error(err){
					  console.log(err)
					}
				})
			}
		},
		onLoad( option ){
			// 编辑还是新增
			this.handlerAccount()
			this.handleruserById()
			this.from_data.actiontype = option.type;
			this.type = option.type;
			
			if(option.type != 'add'){
				let data = JSON.parse(option.data)
				this.Initialization = JSON.parse(option.data)
				wx.setNavigationBarTitle({
				   title: '编辑交款'
				})
				this.handlerEditData( data.id )
				this.id = data.id
				this.typeStart = data.state
			}else{
				wx.setNavigationBarTitle({
				   title: '添加交款'
				})
			}
			
		},
		onShow(){
			
		},
		onReady(){
			
		},
		onHide(){
			
		},
		onUnload(){
			
		},
		onPullDownRefresh(){
			
		},
		onReachBottom(){
			
		},	
		onShareAppMessage(){

		},
		onPageScroll(){
			
		}
	}
</script>

<style>
	input{
		font-size: 28upx;
	}
	.footer-btn-bar> div:nth-child(2){
		color: #FFFFFF !important;
		font-size: 30upx;
		margin-right: 30upx;
		margin-left: 30upx;
		background: #3196FA;
	}
	.footer-btn > div:nth-child(1){
		color: #3196FA;
		font-size: 30upx;
		margin-right: 20upx;
	}
	.footer-btn > div:nth-child(2){
		color: #3196FA;
		font-size: 30upx;
		margin-right: 30upx;
	}
	.footer-btn > div:nth-child(3){
		background: #3196FA;
		font-size: 30upx;
		color: #FFFFFF;
	}
	.footer-btn > div{
		width:270upx;
		height:80upx;
		border:1px solid rgba(49,150,250,1);
		border-radius:40upx;
		text-align: center;
		line-height: 80upx;
	}
	.footer-btn{
		display: flex;
		box-sizing: border-box;
		padding: 0 20upx;
		margin-top: 40upx;
	}
	.add-titles {
		margin-bottom: 20upx;
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
		border-bottom: 1upx solid #DDDDDD;
	}

	.add-input {
		width: 300upx;
		font-size: 26upx;
		padding-left: 50upx;
	}
	.box{
		box-sizing: border-box;
		padding: 0 40upx;
		min-height: 800upx;
		margin-top: 50upx;
	}
</style>
