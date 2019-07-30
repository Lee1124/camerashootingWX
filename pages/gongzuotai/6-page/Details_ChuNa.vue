<template>
	<div class='details-of-account'>
		<div class='box'>
					<div>
				<div class='details-box'>
					报账总览
				</div>
				<div class='details-item'>
					<div class='content-items-bar'>
						<div class='items-bars'>
							<span class='content-title-item bars-items'>
								标题：
							</span>
							<span class='bar-span bar-text'>
								{{ FROM_DATA.strtitle }}
							</span> 
						</div>
						<p>
							<span class='content-title-item'>
								编号：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.no }}
							</span>
						</p>
						<p>
							<span class='content-title-item'>
								收入：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.strin }}
							</span>
						</p>
						<p>
							<span class='content-title-item'>
								支出：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.strout? FROM_DATA.strout:'暂无' }}
							</span>
						</p>
						<p>
							<span class='content-title-item'>
								手续费：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.otheramout }}
							</span>
						</p>
						<p>
							<span class='content-title-item'>
								余额：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.nowamount }}
							</span>
						</p>
						<p>
							<span class='content-title-item'>
								账号：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.addressnam }}
							</span>
						</p>
						<p>
							<span class='content-title-item'>
								转存：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.istemp?'是':'否' }}
							</span>
						</p>
						<p>
							<span class='content-title-item'>
								日期：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.addtime?FROM_DATA.addtime.substring(0,10):'' }}
							</span>
						</p>
						<p>
							<span class='content-title-item'>
								说明：
							</span>
							<span class='bar-text'>
								{{ FROM_DATA.strremakr }}
							</span>
						</p>
					</div>
				</div>
			</div>
			<div>
				<div class='details-box'>
					凭证上传
				</div>
				<div class='add-title add-titles' style='flex-wrap: wrap;padding-bottom: 200upx;'>
					<div style='margin-top: 20upx;' class='img-flex'>
						<div style="height: 135upx;width: 180upx;">
							<image @click='handlerImgUpdete(index)' src="../../../static/img/all-icon/add-upload-icon.png" mode="widthFix" style="height: 135upx;width: 180upx;"></image>
						</div>
						<div  v-for='(items,i) in file_list' :key='i' style='position: relative;' >
							<image @click="handlerClooesImg(items.path,file_list)" :src='items.path'  style="max-height: 135upx;max-width: 180upx;" mode="widthFix"></image>
							<i class='detel-icon-img' @click='handlerClooesFile( file_list , i)'>
								<image src="../../../static/img/all-icon/detel.png" mode=""></image>
							</i>
						</div>
						<div v-for='(items,i) in FROM_DATA.imglist' :key='i'  style='position: relative;'>
							<image :src="cosIp+items.path" @click="handlerClooeslistImg(items.path,FROM_DATA.imglist)" style="max-height: 135upx;max-width: 180upx;"  mode="widthFix" ></image>
							<i class='detel-icon-img' @click='handlerInternImg( FROM_DATA.imglist,i,items.path,items )'>
								<image src="../../../static/img/all-icon/detel.png" mode=""></image>
							</i>
						</div>
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
				cosIp:this.$manjs.cosIp,		//腾讯云地址
				branchid:this.$manjs.branchid,		//店id
				file_list:[],					//待上传文件
				message:'',			//提示内容
				LayerType:'',		//t提示类型  info、success、 warn、error	
				FROM_DATA:{
					IsHavingOtherRemak:"",
					IsShouRu:"",
					OtherRemark:"",
					addressnam:"",
					addtime:"",
					id:"",
					imglist:"",
					istemp:"",
					last:"",
					no:"",
					nowamount:"",
					otheramout:"",
					strin:"",
					strout: "",
					strremakr:"",
					strtitle:""
				}			//渲染数据
			}
		},
		methods: {
			tips(msg,type){
				this.message = msg
				this.LayerType = type
				this.$refs.anRef.show();
			},
			// 删除待上传文件
			handlerClooesFile(filelist , i){
				this.file_list.forEach((item,itemIndex) => {
					itemIndex == i ? this.file_list.splice(i,1):null
				})
			},
			// 删除网路图片
			handlerInternImg( filelistImg , i, path , current){
				this.$deteleImg({
					key:path,
					callblack(res){
						this.handlerSQLimg(current.id)
						this.FROM_DATA.imglist.splice(i,1)
					}
				})
			},
			// 删除数据库图片
			handlerSQLimg( id ){
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
					},
					error(err){
						console.log(err)
					}
				});
			},
			// 保存
			handlerPreservation(){
				this.$show('正在保存...')
				this.handlerUpdeteImg()
			},
			// 保存图片至腾讯云
			handlerUpdeteImg(){
				let files = this.file_list.map( res => {
					return {
						path:res.path,
					}
				})
				this.$uploadTasks({
					files:files,
					key:`${'/'+this.branchid}`+'/amouent/'+ this.FROM_DATA.id,
					guid:true,
					callback(a,b){
						this.handlerDataImg(b.headers.Location.split('com')[1])
					}
				})
			},
			// 保存至数据库
			handlerDataImg(path){
				
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/addprojectfile',
				  data:{
					applyid:this.FROM_DATA.id,
					filepath:path
				  },
				  success(res){
					if(res.data.state){
						this.tips('保存成功!','success')
						setTimeout(()=>{
							wx.navigateBack({
							  delta: 1
							})
						},300)
					}else{
						this.tips('保存失败!','error')
					}
					this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			// 选择图片
			handlerImgUpdete( index ){
				this.$PictureImg().then(res => {
					this.file_list = [...this.file_list,...res.tempFiles]
				}).catch(( err )=>{
					console.log( err )
				})
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
		},
		onLoad( option ) {
			this.FROM_DATA = JSON.parse(option.data)
			console.log(this.FROM_DATA)
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
	.img-flex{
		display: flex;
		flex-wrap: wrap;
	}
	.img-flex > div {
		margin: 15upx;
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
	.box{
		margin-bottom: 250upx;
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
		line-height: 45upx;
	}
</style>
