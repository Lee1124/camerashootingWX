<!-- 添加支付对象 -->
<template>
	<div class='box'>
		<div class='add-title add-titles'>
			<span>名<span style='display:inline-block;width:40upx'></span>称</span>
			<input class='add-input' type="digit" v-model="from_data.title" placeholder="请输入支付对象名称" />
		</div>
		<div class='add-title add-titles'>
			<span>负  责 人</span>
			<input class='add-input' type="digit" v-model="from_data.username" placeholder="请输入负责人名字" />
		</div>
		<div class='add-title add-titles'>
			<span>电<span style='display:inline-block;width:40upx'></span>话</span>
			<input class='add-input' type="digit" v-model="from_data.phone" placeholder="请输入负责人电话号码" />
		</div>
		<div class='add-title add-titles'>
			<span>地<span style='display:inline-block;width:40upx'></span>址</span>
			<input class='add-input' type="digit" v-model="from_data.address" placeholder="请输入地址/网址" />
		</div>
		<div class='add-title add-titles'>
			<span>说<span style='display:inline-block;width:40upx'></span>明</span>
			<textarea style="width: 450upx;margin-left: 50upx;box-sizing: border-box;padding: 15upx 0;font-size: 26upx;" v-model="from_data.remark"
			 placeholder="请输入支付对象说明......" />
		</div>
		<div style='margin-top: 50upx;text-align: center;'>
			<span style='font-size: 30upx;color: #FFFFFF;display: inline-block;width:360upx;
height:91upx;
background:rgba(117,186,255,1);
border-radius:46upx;line-height: 91upx;' @click='handerBaocun()'>保存</span>
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
				from_data:{
					address: "",
					id: "",
					phone: "",
					remark: "",
					title: "",
					username: "",
				}
			}
		},
		methods: {
			// 提示
			tips(msg,type){
				this.message = msg
				this.LayerType = type
				this.$refs.anRef.show();
			},
			// 保存支付对象
			handerBaocun(){
				this.$show('正在保存...')
				this.$axios({
				  method:'POST',
				  url:'/xlapi/CameraManage/AmountManage/AmountSet/addsuppler',
				  data:{
					...this.from_data
				  },
				  success(res){
						if(res.data.status){
							this.tips('添加成功!','success')
							setTimeout(()=>{
								wx.navigateBack({
								  delta: 1
								})
							},300)
						}else{
							this.tips('添加失败!','error')
						}
						this.$hide()
				  },
				  error(err){
					console.log(err)
				  }
				});
			}
		},
		onLoad() {

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
	.box{
		box-sizing: border-box;
		padding: 0 40upx;
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
	}

	.add-input {
		width: 300upx;
		font-size: 26upx;
		padding-left: 50upx;
	}
</style>
