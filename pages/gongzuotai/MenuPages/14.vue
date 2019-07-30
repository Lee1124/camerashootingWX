<!-- 报账审批 -->
<template>
	<div>
		<search :title="title"></search>
		<box v-if="DataInit.length > 0" @handlerContents='handlerContents' :basic='DataInit'></box>
		<div v-else class='DataInit'>
			<image src="http://xilai99.com/camerashootingWXIMG/noData.png"></image>
			<div style='color: #BBBBBB;font-size: 26upx;text-align: center;'>暂无数据</div>
		</div>
	</div>
</template>

<script>
	import search from '../../../components/my-search/search.vue'
	import box from '../CaiWuComm/4-Status-box.vue'
	export default {
		data(){
			return {
				title:'请输入标题',
				 from_data:{
					addusername: "",
					index: 1,
					no: "",
					// nowcheckid:this.$manjs.getkevalue().userid,
					number: 15,
					playname: "",
					state: 2,
					strtype: "check",
					title: "",
				 },
				 DataInit:[]
			}
		},
		components:{search,box},
		methods:{
			handlerCallblack( data ){
				this.from_data.title = data
				this.from_data.index = 1
				this.DataInit = []
				this.handlerDatalist()
			},
			// 审批
			handlerContents( data ){
				uni.navigateTo({
					url:`../4-page/Details_of_Account?data=${ JSON.stringify(data) }`
				});
			},
			// 获取数据列表
			handlerDatalist(){
				this.$show('加载中...')
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/getapplylist',
				  data:{
					...this.from_data
				  },
				  success(res){
					this.DataInit = [...this.DataInit,...res.data.list]
					uni.stopPullDownRefresh();
					this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.from_data.index = 1
			this.DataInit = []
			this.handlerDatalist()
		},
		onReady(){
			
		},
		onHide(){
			
		},
		onUnload(){
			
		},
		onPullDownRefresh(){
			this.from_data.index = 1
			this.DataInit = []
			this.handlerDatalist()
		},
		onReachBottom(){
			this.from_data.index += 1
			this.handlerDatalist()
		},	
		onShareAppMessage(){

		},
		onPageScroll(){
			
		}
	}
</script>

<style>
.DataInit{
	position: absolute;
	top:0;
	right: 0;
	left: 0;
	bottom: 0;
	margin: auto;
	height: 250upx;
	width: 240upx;
}
.DataInit image{
	width:240upx;
	height:240upx;
}
</style>
