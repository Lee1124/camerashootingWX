<!-- 报账详情页 -->
<template>
	<div class='details-of-account'>
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
							{{ orderDetail.Title }}
						</span>
					</div>
					<p>
						<span class='content-title-item'>
				            编号：
				        </span>
						<span class='bar-text'>{{ orderDetail.No }}</span>
					</p>
					<p>
						<span class='content-title-item'>
				            金额：
				        </span>
						<span class='bar-text'>{{ orderDetail.amount }}</span>
					</p>
					<p>
						<span class='content-title-item'>
				            日期：
				        </span>
						<span class='bar-text'>{{ orderDetail.addtime.substring(0,10).replace('-','年').replace('-','月')+'日' }}</span>
					</p>
					<p>
						<span class='content-title-item'>
					        提交人：
					    </span>
						<span class='bar-text'>{{ orderDetail.RealName }}</span>
					</p>
					<p>
						<span class='content-title-item'>
					        状态：
					    </span>
						<span class='bar-text'>{{ orderDetail.state }}</span>
					</p>
				</div>
			</div>
		</div>
		<div>
			<div class='details-box'>
				报账明细
			</div>
			<div style='padding-bottom: 200upx;'>
				<div class='uni-collapse-item-bar' v-for="(res,i) in data_all" :key='i'>
					<uni-collapse>
						<uni-collapse-item path="../../static/img/all-icon/Open-icon.png" :title="res.name" open="true" showAnimation='true'>
							<view style="padding: 30upx;" class="vall" slot='content'>
								<p>
									<span class='content-title-item'>
										类型：
									</span>
									<span class='bar-text'>{{ res.typename }}</span>
								</p>
								<p>
									<span class='content-title-item'>
										金额：
									</span>
									<span class='bar-text'>{{ res.amount }}</span>
								</p>
								<p>
									<span class='content-title-item'>
										是否摊销：
									</span>
									<span class='bar-text'>{{ res.otherstae? '非摊销':'摊销' }}</span>
								</p>
								<p>
									<span class='content-title-item'>
										费用时间：
									</span>
									<span class='bar-text'>{{ res.otherstae? res.otherstae:'暂无' }}</span>
								</p>
								<p>
									<span class='content-title-item'>
										支付对象：
									</span>
									<span class='bar-text'>{{ res.palyename }}</span>
								</p>
								<div class='items-bars'>
									<span class='content-title-item bars-items'>
										报账说明：
									</span>
									<span class='bar-span bar-text'>
										{{ res.remark }}
									</span>
								</div>
								<!-- 图片集合 -->
								<div v-if='res.filelist.length == 0'></div>
								<ul v-else style='min-height: 110px;margin-top: 20upx;' >
									<li>
										<image @click="handlerViewImg(res.filelist,cosIp + item.fpaht)" v-for="(item,index) in res.filelist" :class='{imgload:item.start}' style='max-height: 110upx;max-width: 160upx;' :src="cosIp + item.fpaht"  :key='index'></image>
									</li>
								</ul>
							</view>
						</uni-collapse-item>
					</uni-collapse>
				</div>
			</div>
		</div>
		<div class='footer-button'>
			<div @click='handleradopt("return")'>退回</div>
			<div @click='handleradoptsell()'>确认支付</div>
		</div>
		
		<myModal 
			:show="show" 
			title="提示" 
			@confirm="bindBtn('confirm')"
			@cancel="bindBtn('cancel')"
			:show-cancel="true">
			<div style='height: max-content;box-sizing: border-box;padding: 30upx;'>
				<textarea v-model="Tuihui" style="width: 97%;height: 190upx;background: #F5F5F5;border-box;padding: 10upx;" placeholder="请输入退回原因...." />
			</div>
		</myModal>
		<myTipsLayer ref="anRef" timer="50" :type="LayerType">
			<text>{{message}}</text>
		</myTipsLayer>
	</div>
</template>

<script>
	import uniCollapse from "../../../components/uni-collapse/uni-collapse.vue"
	import uniCollapseItem from '../../../components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {uniCollapse,uniCollapseItem},
		data(){
			return {
				cosIp:this.$manjs.cosIp,
				message:'',								//提示信息
				LayerType:'',		//t提示类型  info、success、 warn、error	
				data_all:[],
				show:false,
				showText:false,				// true 为 退回  false 审核
				orderDetail:{
					ID:"",
					No:"",
					RealName:"",
					Title:"",
					addtime:"",
					amount:"",
					nowcheckid:"",
					palyamount:"",
					state:""
				},					//当前订单详情
				Tuihui:''			//退回说明
			}
		},
		methods:{
			// 提示
			tips(msg,type){
				this.message = msg
				this.LayerType = type
				this.$refs.anRef.show();
			},
			// 图片预览
			handlerViewImg( data , path ){
				let imglist = data.map(res => {
					return this.cosIp + res.fpaht
				})
				wx.previewImage({
					current:path,
					urls: imglist,
					success: function(res) {
						console.log(res)
					}
				})
			},
			// 关闭
			bindBtn( val ){
				if( val == 'confirm'){
					this.handlerTuihui()
				}
				this.show = false
			},
			// 询问退回
			handleradopt( ){
				this.show = true
			},
			// 确认退回
			handlerTuihui(){
				this.$show('退回中...')
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/backapply',
				  data:{
						id: this.orderDetail.ID,
						remark: this.Tuihui
				  },
				  success(res){
					let state = res.data.state
					this.tips(res.data.msg,state? 'success':'error')
					setTimeout(()=>{
						wx.navigateBack({
						  delta: 1
						})
					},300)
					this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			// 确认支付
			handleradoptsell(){
				let data = {
					title:this.orderDetail.Title,
					amount:this.orderDetail.amount,
					id:this.orderDetail.ID
				}
				data.str = ''
				this.data_all.filter(res =>{
					data.str = res.id +','+ data.str
				})
				uni.navigateTo({
					url:`../5-page/Add-confirm-ZhiFu?data=${JSON.stringify(data)}`
				});
			},
			// 获取当前支付所有明细
			handlerPayment(){
				this.$show('加载中...')
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/Amount/getprojectlist',
				  data:{
					applyid: this.orderDetail.ID,
					stae:this.orderDetail.state
				  },
				  success(res){
					this.data_all = [...res.data]
					this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			}
		},
		onLoad( option ){
			this.orderDetail = JSON.parse(option.data);
			this.handlerPayment()
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
.imgload{
	opacity: 1;
	transition: all .5s;
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
	padding: 41upx 120upx;
}
.footer-button div:nth-child(1){
	border:1px solid rgba(49,150,250,1);
	color: #3196FA;
	margin-right: 80upx;
}
.footer-button div:nth-child(2){
	background:rgba(49,150,250,1);
	color: #FFFFFF;
}
.footer-button div{
	width:230upx;
	height:84upx;
	font-size: 30upx;
	text-align: center;
	line-height: 84upx;
	border-radius: 42upx;
}
.uni-collapse-item-bar:last-child{
	margin-bottom: 180upx;
}
ul li{
	display: flex;
	flex-wrap:wrap;
	border-radius:5upx;
	margin-bottom: 20upx;
}
ul li image{
	margin: 10upx;
	max-width: 160upx;
	max-height:110upx;
}
.vall p{
	margin-bottom: 15upx;
}
.items-bars{
	margin-top: 20upx;
}
.vall:nth-child(1):after{
	content: '';
	display: inline-block;
	width: 91%;
	height: 1upx;
	border-top: 1px dashed #DDDDDD;
	position: absolute;
	top:0;
	left: 0;
	right: 0;
	margin: auto;
}
.uni-collapse-cell--open {
	background: #F9F9F9 !important;
}
.vall{
	background: #F9F9F9 !important;
	position: relative;
}
.uni-collapse{
	background: #F9F9F9 !important;
}
.uni-collapse-item-bar{
	border:1upx dashed rgba(204,204,204,1);
	border-radius:5upx;
	background: #F9F9F9;
	margin-bottom: 30upx;
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
	height:380upx;
	background:rgba(249,249,249,1);
	border:1upx dashed rgba(204,204,204,1);
	border-radius:5upx;
	box-sizing: border-box;
	padding: 0upx 20upx;
	margin-bottom: 50upx;
}
.details-box{
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

.details-of-account{
	box-sizing: border-box;
	padding: 0 30upx;
}
</style>
