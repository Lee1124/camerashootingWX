<template>
	<view class="no-data-tips">
		<view class="imgBox">
			<image src="http://xilai99.com/camerashootingWXIMG/noData.png"></image>
			<view class="noDataText">{{msg}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		props:{
			msg:{
				type:String,
				default(){
					return '无相关数据'
				}
			}
		}
	}
</script>

<style scoped>
	.no-data-tips {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		z-index: 9;
	}
	.no-data-tips .imgBox {
		width: 210upx;
		height: 220upx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
		z-index: 10;
	}
	.no-data-tips .imgBox image {
		width: 100%;
		height: 185upx;
	}
	.no-data-tips .noDataText {
		color:#CFD5E1 ;
		font-size: 28upx;
		text-align: center;
	}
</style>
