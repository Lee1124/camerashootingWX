<template>
	<div class='box'>
		<div class='add-title' style='margin-top: 40upx;'>
			<span style='min-width:80upx'>订单：</span>
			<span class='add-input' style='width: 100%;'>{{ Rendering.orderremark }}</span>
		</div>
		<div class='add-title' style='margin-top: 40upx;'>
			<span>编号：</span>
			<span class='add-input'>{{ Rendering.NO }}</span>
		</div>
		<div class='add-title' style='margin-top: 40upx;'>
			<span>类型: </span>
			<span class='add-input'>{{ Rendering.typename }}</span>
		</div>
		<div class='add-title' style='margin-top: 40upx;'>
			<span>金额: </span>
			<span class='add-input'>{{ Rendering.Amount }}</span>
		</div>
		<div class='add-title' style='margin-top: 40upx;'>
			<span>账号: </span>
			<span class='add-input'>{{ Rendering.toaddress }}</span>
		</div>
		<div class='add-title' style='margin-top: 40upx;'>
			<span>说明: </span>
			<span class='add-input'>{{ Rendering.addusername }}</span>
		</div>
		<div class='add-title' style='margin-top: 40upx;'>
			<span>提交人: </span>
			<span class='add-input'>{{ Rendering.addusername }}</span>
		</div>
		<div class='add-title' style='margin-top: 40upx;'>
			<span>日期: </span>
			<span class='add-input'>{{ Rendering.addtime.substring(0,10) }}</span>
		</div>
		<div class='add-title' style='margin-top: 40upx;'>
			<span>状态: </span>
			<span class='add-input' style="font-size:28upx" v-if="Rendering.state == 1">待审核</span>
			<span class='add-input' style="font-size:28upx" v-if="Rendering.state == 2">审核通过</span>
			<span class='add-input' style="font-size:28upx" v-if="Rendering.state == 0">退回</span>
		</div>	
		<div class='footer-btn'>
			<div @click='handlerReturn()'>退回审核</div>
			<div @click='handlerAdopt()'>通过审核</div>
		</div>
		
		<myModal 
			:show="show" 
			title="提示" 
			@confirm="bindBtn('confirm')"
			@cancel="bindBtn('cancel')"
			:show-cancel="true">
			<div>
				<div v-if='showText'>
					<div style='height: max-content;box-sizing: border-box;padding: 30upx;'>
						<textarea v-model="TuiText" style="width: 97%;height: 190upx;background: #F5F5F5;border-box;padding: 10upx;" placeholder="请输入退回原因...." />
					</div>
				</div>
				<div v-else>
					<div style='height: max-content;box-sizing: border-box;padding: 30upx;'>
						<p style='font-size: 26upx;'>金额:{{ Rendering.Amount }}</p>
						<input type="text" 
							style="background: #F5F5F5;font-size: 26upx;width: 100%;margin: 20upx 0;border-radius: 10upx;height: 60upx;line-height: 60upx;"
							placeholder="请输入手续费(元)"
							v-model="amount" />
						<textarea v-model="remark" style="width: 97%;height: 190upx;background: #F5F5F5;border-box;padding: 10upx;font-size: 26upx;" placeholder="请输入退回原因...." />
					</div>
				</div>
			</div>
		</myModal>
		<myTipsLayer ref="anRef" timer="50" :type="LayerType">
			<text>{{message}}</text>
		</myTipsLayer>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				show:false,			//是否显示
				showText:false,			//收款确认或者退回
				message:'',								//提示信息
				LayerType:'',		//t提示类型  info、success、 warn、error	
				Rendering:{
					Amount:"",
					NO:"",
					addtime:"",
					addusername:"",
					id:"",
					orderremark:"",
					state:"",
					toaddress:"",
					typename:"",
				},			//渲染对象
				TuiText:'',			//退回说明
				amount:'',			//通过金额
				remark:''			//通过说明
			}
		},
		methods:{
			// 提示
			tips(msg,type){
				this.message = msg
				this.LayerType = type
				this.$refs.anRef.show();
			},
			// 退回审核
			handlerReturn(){
				this.show = true
				this.showText = true
			},
			// 通过审核
			handlerAdopt(){
				this.show = true
				this.showText = false
			},
			// 提示框确定
			bindBtn( type ){
				this.show = false
				if( type == 'confirm'){
					// 退回确认
					if(this.showText){
						this.handlerTuiHui()
					}
					// 通过
					else{
						this.handlerTonGuo()
					}
				}
			},
			// 确认退回
			handlerTuiHui(){
				this.$show('正在退回')
				this.$axios({
				  method:'GET',
				  url:'/xlapi/CameraManage/AmountManage/AmountOrder/updateamountlog',
				  data:{
					id:this.Rendering.id
				  },
				  success(res){
					if(res.data.state){
						this.tips('退回成功!','success')
						setTimeout(()=>{
							wx.navigateBack({
							  delta: 1
							})
						},300)
					}else{
						this.tips(`${res.data.msg}`,'error')
					}
					this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			},
			// 通过审核
			handlerTonGuo(){
				this.$show('正在提交...')
				this.$axios({
					method:'POST',
					url:'/xlapi/CameraManage/AmountManage/AmountOrder/addamountlog',
					data:{
						amount: this.amount,
						id: this.Rendering.id,
						remark: this.remark
					},
					success(res){
						if(res.data.state){
							this.tips('已通过','success')
							setTimeout(()=>{
								wx.navigateBack({
								  delta: 1
								})
							},300)
						}else{
							this.tips('审核失败','error')
						}
						this.$hide()
					},
					error(err){
						console.log(err)
					}
				});
			},
			// 页面渲染
			handlerRendering( data ){
				this.Rendering = data
			}
		},
		onLoad( option ){
			this.handlerRendering( JSON.parse(option.data) )
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
	.footer-btn > div:nth-child(1){
		color: #3196FA;
		font-size: 30upx;
		margin-right: 90upx;
	}
	.footer-btn > div:nth-child(2){
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
		margin-top: 100upx;
	}
	.add-title>span {
		font-size: 26upx;
		color: #666666;
		line-height: 50upx;
		display: inline-block;
	}
	.add-title {
		display: flex;
	}
	.add-input {
		width: 300upx;
		font-size: 26upx;
		padding-left: 50upx;
	}
	.box{
		box-sizing: border-box;
		padding: 0 40upx;
	}
</style>
