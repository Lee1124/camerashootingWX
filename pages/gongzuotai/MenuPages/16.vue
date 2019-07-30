<!-- 添加我的交款 -->
<template>
	<div class='box'>
		<div class='add-title add-titles'>
			<span>转出账号</span>
			<mySelect :mySelectObj='myIsKJSelectObj1' @selectConfirm='getValue_JC1'  style='padding-left: 50rpx;'></mySelect>
			<span style='width:100%;padding-top:10upx'>余额: {{ amount1 }}</span>
		</div>
		<div class='add-title add-titles'>
			<span>转入账号</span>
			<mySelect :mySelectObj='myIsKJSelectObj2' @selectConfirm='getValue_JC2' style='padding-left: 50rpx;'></mySelect>
			<span style='width:100%;padding-top:10upx'>余额: {{ amount2 }}</span>
		</div>
		<div class='add-title add-titles'>
			<span>转入金额</span>
			<input class='add-input' type="digit" v-model="FROM_DATA.amount" placeholder="请输入金额" />
		</div>
		<div class='add-title add-titles' style='padding-bottom: 0;margin-bottom: 0;border: none;'>
			<span>转入说明</span>
		</div>
		<div class='add-title add-titles' style='border:none;display: block;width: 100%;'>
			<span 
				style='width: 100%;box-sizing: border-box;padding: 20upx;font-size: 28upx;background: #f8f8f8;border-radius: 10upx;height:300upx;'
				v-if='flag'
				@click='handlerremark()'
			>{{ FROM_DATA.remark }}</span>
			<textarea 
			v-else
			style="width: 100%;box-sizing: border-box;padding: 20upx;font-size: 28upx;background: #f8f8f8;border-radius: 10upx"
			 v-model="FROM_DATA.remark" @blur="handlerblur()" focus placeholder="请输入转入说明..." />
		</div>
		<div class='footer-btn'>
			<div @click='handlerBaoCun()'>保存</div>
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
				message:'',								//提示信息
				LayerType:'',		//t提示类型  info、success、 warn、error	
				amount1:'',
				amount2:'',
				FROM_DATA: {
					amount:"",			//金额
					inid:"",		//转入
					outid:"",		//转出
					remark: ""		//说明
				},
				myIsKJSelectObj1: {
					mySelectPlaceholder: '选择转出账号',
					array: [],
					isSelectedObj: {},
				},
				myIsKJSelectObj2: {
					mySelectPlaceholder: '选择转入账号',
					array: [],
					isSelectedObj: {},
				},
				pickerValueArrays: [],
				flag:true,						//是否显示输入框
			}
		},
		methods: {
			// 文本点击
			handlerremark(){
				this.flag = false
			},
			// 输入框失去焦点
			handlerblur(){
				this.flag = true
			},
			// 提示
			tips(msg,type){
				this.message = msg
				this.LayerType = type
				this.$refs.anRef.show();
			},
			// 单列
			getValue_JC1(data) {
				this.FROM_DATA.outid = data.value
				this.handlerYu(1, data.value)
			},
			getValue_JC2( data ){
				this.FROM_DATA.inid = data.value
				this.handlerYu(2 , data.value)
			},
			handlerYu( type , id){
				this["myIsKJSelectObj"+type].array.filter(res => {
					if(id == res.value){
						this["amount"+type] = res.amount
					}
				})
			},
			// 保存
			handlerBaoCun() {
				this.$show('正在保存...')
				if(this.FROM_DATA.inid == this.FROM_DATA.outid){
					this.tips('请检查账号!','error')
					this.$hide()
					return
				}
				this.$axios({
					method:'POST',
					url:'/xlapi/CameraManage/AmountManage/Amount/amouttoother',
					data:{
						...this.FROM_DATA
					},
					success(res){
						if(res.data.state){
							this.tips('保存成功!','success')
							setTimeout(()=>{
								wx.navigateBack({
								  delta: 1
								})
							},300)
						}
						else{
							this.tips('请保存失败!','error')
						}
						this.$hide()
					},
					error(err){
						console.log(err)
					}
				});
			},
			//获取支出账号
			handlerAccount( strtype ){
				this.$axios({
					method:'GET',
					url:'/xlapi/CameraManage/AmountManage/Amount/getamountaddress',
					data:{
						strtype
					},
					success(res){
						if(strtype == 1){
							this.myIsKJSelectObj1.array = res.data.map(res => {
							  return {
								label:res.name,
								value:res.id,
								amount:res.amount
							  }
							})
						}else{
							this.myIsKJSelectObj2.array = res.data.map(res => {
							  return {
								label:res.name,
								value:res.id,
								amount:res.amount
							  }
							})
						}
					},
					error(err){
						console.log(err)
					}
				});
			}

		},
		onLoad(option) {
			this.handlerAccount(1);
			this.handlerAccount(2);
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
	input{
		font-size: 28rpx;
	}
	/deep/ .mpvue-picker__hd{
		height: 50px !important;
		line-height: 50px !important;
	}

	.footer-btn>div {
		background: #3196FA;
		font-size: 30upx;
		color: #FFFFFF;
	}

	.footer-btn>div {
		width: 360upx;
		height: 91upx;
		border: 1px solid rgba(49, 150, 250, 1);
		border-radius: 50upx;
		text-align: center;
		line-height: 91upx;
	}

	.footer-btn {
		display: flex;
		box-sizing: border-box;
		padding: 0 160upx;
		margin-top: 40upx;
	}

	.add-titles {
		margin-bottom: 20upx;
	}

	.add-title>span {
		font-size: 26upx;
		color: #666666;
		line-height: 50upx;
		display: inline-block;
	}

	.add-title {
		display: flex;
		padding-bottom: 40upx;
		border-bottom: 1upx solid #DDDDDD;
		padding-top: 20upx;
		flex-wrap: wrap;
	}

	.add-input {
		width: 300upx;
		font-size: 26upx;
		padding-left: 50upx;
	}

	.box {
		box-sizing: border-box;
		padding: 0 40upx;
		min-height: 800upx;
		margin-top: 50upx;
	}
</style>
