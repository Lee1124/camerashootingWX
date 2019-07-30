<template>
	<div class='card-box-max'  @click='handlerDetlis(items)' >
		<div class='card-box-item'>
			<div>{{ items.addtime.substring(0,10) }}</div>
			<div class='card-box-items'>
				<p style='color: #222222;font-size: 26upx;'>{{ items.strtitle.length > 20? items.strtitle.substring(0,18)+'...':items.strtitle}}</p>
				<p>
					<span style='color:#666666 ;font-size: 26upx;'>{{ flag? '支出':'支出'}}</span>
					<span v-if='items.strout > 0' style='padding-left: 150upx;font-size: 26upx;color: #3196FA;'>{{ items.strout? '+'+items.strout:'暂无' }}</span>
					<span v-else style='padding-left: 150upx;font-size: 26upx;color: #FF0013;'>{{ items.strout? '-'+items.strout:'暂无' }}</span>
				</p>
				<p>
					<span style='color:#666666 ;font-size: 26upx;'>余额</span>
					<span style='padding-left: 150upx;font-size: 26upx;'>{{ items.nowamount }}</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['items','flag'],
		data(){
			return {
				
			}
		},
		methods:{
			// 当前账户详情
			handlerDetlis( data ){
				uni.navigateTo({
					url:`../6-page/Details_ChuNa?data=${JSON.stringify(data)}`
				});
			},
		},
		onLoad(){
			
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
.card-box-items{
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.card-box-max{
	box-sizing: border-box;
	padding:0 45upx;
	margin: 20upx 0;
}
.card-box-item{
	width: 100%;
	min-height: 220upx;
	background:rgba(244,244,244,1);
	border-radius:10upx;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 20upx;
}	
.card-box-item div:nth-child(1){
	width: 200upx;
	font-size: 26upx;
	color: #666666;
}
.card-box-item div:nth-child(2){
	flex:1;
}
</style>
