<template>
	<view style="height: 100%;">
		<view><img src="../../static/img/page-bg-img/work_bg.png" class='work-bg' alt=""></view>
		<view class="guid">
			<guid column-num="3" :options="options" ></guid>
		</view>
	</view>
</template>

<script>
	let path = '../../static/img/Workbench-iocn/'  //图标路径
	import guid from '@/components/uni-grid/uni-grid.vue'
	export default {
		data(){
			return {
				options:[
					{image:path + 'Approval-bz-icon.png',text:'我的报账申请'}, //parms 当前页面所需参数 只接受对象
					{image:path + 'Order-icon.png',text:'我的交款'},
					{image:path + 'Approval-shenhe-iocn.png',text:'收款审核'},
					{image:path + 'Approval-bz-icon.png',text:'报账审核'},
					{image:path + 'sement-icon.png',text:'报账支付'},
					{image:path + 'Cashier-icon.png',text:'出纳账目'},
					{image:path + 'Transfer-icon.png',text:'账号转存'},
					{image:path + 'equipment-iocn.png',text:'设备'}]
			}
		},
		components:{guid},
		methods:{
			// 当前菜单单击 ( 第二个形参为传递参数 )
			handlerclick( row ){
				console.log(row)
				let index = row.id;		//获取当前页面索引
				let parms = '';					//页面参数
				if(row.data){
					parms = `MenuPages/${index}${row.data}`
				}else{
					parms = `MenuPages/${index}`
				}
				uni.navigateTo({
					url:parms
				});
			},
			// 权限列表
			handlerMenuList(){
				this.$axios({
					method:'POST',
					url:'/xlapi/CameraManage/CameraMenuManage/CameraMenu/GetChildMenuListByMenuName',
					data:{
						TypeName: "财务"
					},
					success(res){
						let data = res.data.data
						let arr = new Array()
						data.filter( res=> {
							let muen = this.options.filter(item => {
								if(res.MenuName == item.text){
									let datas = {
										image:item.image,
										text:item.text,
										id:res.MenuId
									}
									arr.push(datas)
								}
							})
						})
						this.options = arr
					},
					error(err){
						console.log(err)
					}
				});
			}
		},
		onLoad(){
			this.handlerMenuList()
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
page{
	height: 100%;
	overflow: hidden;
}
.work-bg{
	width: 100%;
	height: 540upx;
}
.guid{
	margin-top: 40upx;
	margin-bottom: 40upx;
	height: calc( 100% - 620upx );
	overflow:scroll;
}
</style>
