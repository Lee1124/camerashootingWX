<!-- 我的交款 -->
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
		<div class='footer-button'>
			<div @click='handlerAdd_Jiao()'>添加交款</div>
		</div>
	</div>
</template>

<script>
	import search from '../../../components/my-search/search.vue'
	import box from '../CaiWuComm/2-Status-box.vue'
	export default {
		data(){
			return {
				title:'请输入添加人',
				from_data:{
					actionetype: "my",
					addname: "",
					btime: "",
					etime: "",
					index: 1,
					no: "",
					number: 15,
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
			// 编辑我的交款
			handlerContents ( data ){
				uni.navigateTo({
					url:`../2-page/Edit-JiaoKuan?data=${JSON.stringify(data)}&type=edit`
				});
			},
			// 添加我的交款
			handlerAdd_Jiao(){
				uni.navigateTo({
					url:`../2-page/Edit-JiaoKuan?type=add`
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
.footer-button div{
	width:230upx;
	height:84upx;
	font-size: 30upx;
	text-align: center;
	line-height: 84upx;
	border-radius: 42upx;
	background:rgba(49,150,250,1); 
	color: #FFFFFF;
}
.footer-button{
	width: 100%;
	height: 165upx;
	position: fixed;
	bottom: 0;
	left: 0;
	background: #FFFFFF;
	display: flex;
	box-sizing: border-box;
	padding: 41upx 265upx;
	box-shadow:0px 0px 21px 0px rgba(0, 0, 0, 0.1);
}
.box{
	margin-bottom: 200upx;
}
</style>
