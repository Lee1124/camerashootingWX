<template>
	<div class='details-of-account'>
		<div class='box'>
					<div>
				<div class='details-box'>
					报账总览
				</div>
				<div class='details-item'>
					<div class='content-items-bar'>
						<div class='items-bars' style='margin: 8upx 0;'>
							<span class='content-title-item bars-items'>
								标题：
							</span>
							<span class='bar-span bar-text'>
								{{ redeText.title }}
							</span>
						</div>
						<p>
							<span class='content-title-item'>
								金额：
							</span>
							<span class='bar-text'>{{ redeText.amount }}</span>
						</p>
					</div>
				</div>
			</div>
			<div>
				<div class='details-box'>
					支付信息
				</div>
				<div class='add-title' style='margin-top: 40upx;'>
					<span>实际支付: </span>
					<input class='add-input' type="digit" v-model="from_data.playamount" placeholder="请输入实际支付金额" />			
				</div>
				<div class='add-title' style='margin-top: 40upx;'>
					<span>支付账号: </span>
					<mySelect style='padding-left: 40upx;' :mySelectObj='myXMSelectObj1' @selectConfirm='getValue_XM1' ref='mySelect_XM1'></mySelect>				
				</div>
				<div class='add-title' style='margin-top: 40upx;'>
					<span>全部支付: </span>
					<mySelect style='padding-left: 40upx;' :mySelectObj='myXMSelectObj2' @selectConfirm='getValue_XM2' ref='mySelect_XM2'></mySelect>				
				</div>
				<div class='add-title add-titles' style='margin-top: 50upx;border: none;display: block;width: 100%;'>
					<span>支付说明</span>
					<textarea v-model="from_data.remark" style="margin-bottom: 10upx;width: 100%;box-sizing: border-box;padding: 20upx;font-size: 28upx;background: #f8f8f8;border-radius: 10upx"
					placeholder="请输入报账说明..." />
				</div>
				<div class='add-title add-titles add-img-bar-item' style='flex-wrap: wrap;border: none;margin-top: 10upx;'>
					<span style='display: block;width: 100%;'>支付凭证</span>
					<div style='margin-top: 20upx;' @click="handlerUpImg()">
						<image src="../../../static/img/all-icon/add-upload-icon.png" mode="widthFix" style="height: 135upx;width: 180upx;"></image>
					</div>
					<div v-for='(item,index) in File_List ' :key='index' style='margin-top: 20upx;position: relative;'>
						<image @click="handlerViewImg(item)" :src="item" mode="widthFix" style="max-height: 135upx;max-width: 180upx;"></image>
						<i class='detel-icon-img' @click='handlerInternImg(index)'>
							<image src="../../../static/img/all-icon/detel.png" mode=""></image>
						</i>
					</div>
				</div>
			</div>
		</div>
		<div class='footer-btn'>
			<div @click='handlerPreservation()' >保存</div>
		</div>
		<myTipsLayer ref="anRef" timer="50" :type="LayerType">
			<text>{{message}}</text>
		</myTipsLayer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				branchid:this.$manjs.branchid,		//店id
				message:'',								//提示信息
				LayerType:'',		//t提示类型  info、success、 warn、error	
				myXMSelectObj1: {
					mySelectPlaceholder: '选择类型',
					array: [],
					index: 0,
					isSelectedObj: {},
				},
				myXMSelectObj2: {
					mySelectPlaceholder: '是否全部支付',
					array: [
						{label:"是",value:1},
						{label:"否",value:0},
					],
					index: 0,
					isSelectedObj: {},
				},
				from_data:{
					address:"",
					ids:"",
					isallpaly:"",
					playamount:"",
					remark: "",
					title:""
				},
				redeText:{},		//获取金额标题
				File_List:[]
			}
		},
		methods: {
			// 图片预览
			handlerViewImg( path ){
				wx.previewImage({
					current:path,
					urls: this.File_List,
					success: function(res) {
						console.log(res)
					}
				})
			},
			handlerInternImg( index ){
				this.File_List.splice(index,1)
			},
			// 提示
			tips(msg,type){
				this.message = msg
				this.LayerType = type
				this.$refs.anRef.show();
			},
			// 上传图片至腾讯云
			handlerUpImgs(){
				let files = this.File_List.map( res => {
					return {
						path:res
					}
				})
				this.$uploadTasks({
					files:files,
					key:`${'/'+this.branchid}`+'/amouent/'+ this.redeText.id,
					guid:true,
					callback(a,b){
						this.handlerFileSQLImg(b.headers.Location.split('com')[1],this.redeText.id)
					}
				})
			},
			// 上传文件至SQL
			handlerFileSQLImg( path, id){
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
			// 保存
			handlerPreservation(){
				this.$show('正在支付...')
				this.File_List.length? this.handlerUpImgs():null
				this.from_data.title = this.redeText.title
				this.from_data.ids = this.redeText.str
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/playapply',
				  data:{
					  ...this.from_data
				  },
				  success(res){
					let state = res.data.state
					this.tips(res.data.msg,state?'success':'error')
					this.$hide()
					if(state){
						setTimeout(()=>{
							this.$show('正在跳转...')
							wx.navigateBack({
							  delta: 2
							})
						},300)
					}
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			// 获取支付账号
			handlerZhiFuUser(){
				this.$axios({
				  method:'GET',
				  url:'/xlapi/CameraManage/AmountManage/Amount/getoutaddress',
				  success(res){
					this.myXMSelectObj1.array =  res.data.map(res => ({label:res.name,value:res.id}))
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			// 确认支付账号
			getValue_XM1( data ){
				this.from_data.address = data.value
			},
			// 确认全部支付
			getValue_XM2( data ){
				this.from_data.isallpaly = data.value
			},
			handlerUpImg(){
				this.$PictureImg().then(res => {
					this.File_List = res.tempFilePaths
				}).catch(( err )=>{
					this.Data_all = obj;
				})
			}
		},
		onLoad( option ) {
			this.redeText = JSON.parse(option.data)
			this.handlerZhiFuUser()
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
	input{
		font-size: 28upx;
	}
	.footer-btn > div{
		width:260upx;
		height:90upx;
		background:rgba(117,186,255,1);
		border-radius:46upx;
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		margin: auto;
		text-align: center;
		line-height: 90upx;
		font-size: 30upx;
		color: #FFFFFF;
	}
	.footer-btn{
		position: fixed;
		background: #FFFFFF;
		width: 100%;
		height: 150upx;
		bottom: 0;
		left: 0;
	}
	.add-img-bar-item div{
		margin: 20upx;
	}
	.box{
		padding-bottom: 250upx;
	}
	.add-title>span {
		font-size: 26upx;
		color: #666666;
		line-height: 50upx;
		display: inline-block;
	}
	.add-title {
		display: flex;
		border-bottom: 1upx solid #DDDDDD;
		padding-bottom: 20upx;
	}
	.add-input {
		width: 300upx;
		font-size: 26upx;
		padding-left: 50upx;
	}
	.bar-text{
		color: #222222;
		font-size: 26upx;
	}
	.content-title-item{
		color: #999999;
		font-size: 26upx;
	}
	.content-items-bar p {
		line-height: 50upx;
		margin: 5upx 0;
	}
	.details-item{
		width: 100%;
		height:120upx;
		background:rgba(249,249,249,1);
		border:1upx dashed rgba(204,204,204,1);
		border-radius:5upx;
		box-sizing: border-box;
		padding: 0upx 20upx;
		margin-bottom: 50upx;
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

	.details-of-account {
		box-sizing: border-box;
		padding: 0 30upx;
	}
</style>
