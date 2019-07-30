<!-- 收款审核 -->
<template>
	<div>
		<search :title="title"></search>
		<div class='box' v-if='DataInit.length > 0'>
			<box @handlerContents='handlerContents' :basic='DataInit'></box>
		</div>
		<div v-else class='DataInit'>
			<image src="http://xilai99.com/camerashootingWXIMG/noData.png"></image>
			<div style='color: #BBBBBB;font-size: 26upx;text-align: center;'>暂无数据</div>
		</div>
	</div>
</template>

<script>
	import search from '../../../components/my-search/search.vue'
	import box from '../CaiWuComm/3-Status-box.vue'
	export default {
		data(){
			return {
				title:'请输入添加人',
				from_data:{
					actionetype: "check",
					addname: "",
					btime: "",
					etime: "",
					index: 1,
					no: "",
					number: 8,
					orderremark: "",
					state: 1
				},
				DataInit:[]
			}
		},
		components:{search,box},
		methods:{
			handlerCallblack( data ){
				this.from_data.addname = data
				this.from_data.index = 1
				this.DataInit = []
				this.handlerDatalist()
			},
			handlerContents( data ){
				uni.navigateTo({
					url:`../3-page/Details-JiaoKuan?data=${JSON.stringify(data)}`
				});
			},
			// 获取数据列表
			handlerDatalist(){
				this.$show('加载中...')
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/AmountOrder/getapplylist',
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
