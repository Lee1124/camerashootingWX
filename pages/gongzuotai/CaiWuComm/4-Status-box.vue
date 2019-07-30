<template>
	<div class='box-sell-bar'>
		<div class='box-sell-bar-item' v-for='(item,index) in basic' :key='index'>
			<span class='item'>
				<span class='postion'></span>
			</span>
			<p class='item-p'>{{ item.addtime.substring(0,10).replace('-','年').replace('-','月')+'日' }}</p>
			<div class='item-box-content'>
				<p class='content-title'>
					<span class='content-item'>
						<span class='postion'></span>
					</span>
					<span>{{ item.No }}</span>
				</p>
				<div class='content-items-bar'>
					<div class='items-bars'>
						<span class='content-title-item bars-items'>
                            标题：
						</span>
						<span class='bar-span bar-text'>
							{{ item.Title?item.Title:'暂无' }}
						</span>
					</div>
					<p>
						<span class='content-title-item'>	
                            金额：
                        </span>
						<span class='bar-text'>{{ item.amount?item.amount:'暂无' }}</span>
					</p>
					<p>
						<span class='content-title-item'>
                            提交人：
                        </span>
						<span class='bar-text'>{{ item.RealName? item.RealName:'暂无' }}</span>
					</p>
					<p>
						<span class='content-title-item'>
                            状态：
                        </span>
						<span style="font-size: 28upx;color: red;">{{ item.state? item.state:'暂无' }}</span>
					</p>
				</div>
				<div v-if='item.nowcheckid == userid' class='content-footer' @click='handlerContent( item )'>
					<span  style='font-size: 26upx;'>
						审批
					</span>
					<i style='float: right;'></i> 
				</div>
				<div v-else class='content-footer'>
					<span  style='font-size: 26upx;'>
						当前状态无法操作
					</span>
					<i style='float: right;'></i> 
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data(){
			return {
				userid:this.$manjs.getkevalue().userid,			//当前用户id
			}
		},
		props:{
			basic:{
				type:Array,
				default:[]
			}
		},
		methods:{
			// 审批
			handlerContent(data){
				this.$emit('handlerContents',data)
			}
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
.content-footer i{
	display: inline-block;
	width: 30upx;
	height: 30upx;
	background: url(../../../static/img/all-icon/Arrow-rgiht.png) no-repeat center;
	margin-top: 17rpx;
	background-size: 50%;
}
.content-footer span{
	float: left;
	font-size: 28upx;
	color: #222222;
	line-height: 66upx;
}
.content-footer{
	overflow: hidden;
	height: 66upx;
}
.bar-text{
	color: #222222;
	font-size: 26upx;
}
.bars-items{
	position: absolute;
	top: 5upx;
}
.items-bars{
	position: relative;
	line-height: 40upx;
}
.bar-span{
	display: inline-block;
	width: 85%;
	word-wrap: break-word;
	margin-left: 75upx;
}
.content-items-bar p {
	line-height: 50upx;
}
.content-items-bar{
	padding: 15upx 0;
	border-bottom: 1px solid #DDDDDD;
}
.content-title-item{
	color: #999999;
	font-size: 26upx;
}
.content-title > span:nth-child(2){
	padding-left: 10upx;
	position: relative;
	top: -3.555upx;
}
.content-item{
	display: inline-block;
	width:26upx;
	height:26upx;
	background:rgba(49,150,250,1);
	border-radius:50%;
	position: relative;
}
.content-item span{
	display: inline-block;
	width:14upx;
	height:14upx;
	background:rgba(255,255,255,1);
	border-radius:50%;
}
.content-title{
	color: #222222;
	font-size: 28upx;
	border-bottom: 1px solid #DDDDDD;
	padding-bottom: 10upx;
}
.item-box-content{
	display: inline-block;
	width: 650upx;
	min-height: 360upx;
	border:1px solid rgba(221,221,221,1);
	border-radius:10px;
	position: relative;
	left: 45upx;
	top: 15upx;
	box-sizing: border-box;
	padding: 20upx;
	padding-bottom: 0;
}
.item-p{
	color: #999999;
	font-size: 20upx;
	display: inline-block;
	position: relative;
	left: 25upx;
	top: -2upx;
}
.item{
	display: inline-block;
	width:22upx;
	height:22upx;
	background:rgba(219,219,219,1);
	border-radius:50%;
	position: relative;
}
.item span{
	display: inline-block;
	width:10upx;
	height:10upx;
	background:rgba(255,255,255,1);
	border-radius:50%;
}
.postion{
	position: absolute;
	top:0;
	bottom: 0;
	right: 0;
	left: 0;
	margin: auto;
}
.box-sell-bar{
	box-sizing: border-box;
	padding: 0 30upx;
	margin-top: 34upx;
}
.box-sell-bar-item{
	width: 100%;
	min-height: 435upx;
	height: max-content;
	position: relative;
	padding: 10upx 0;
}
.box-sell-bar-item:after{
	content: '';
	display: inline-block;
	position: absolute;
	width: 1px;
	height: 100%;
	left: 10.555upx;
	top: 30upx;
	border-left: 1px dashed #EEEEEE;
	z-index: -1;
}
</style>
