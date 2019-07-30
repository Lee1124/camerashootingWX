<!-- 邮寄碟片 -->
<template>
	<view class="sendDisc">
		<!-- 导航栏阴影 -->
		<view class="my-order-top-nav-shadow"></view>
		<view class="voucher">
			<view class="title">凭证</view>
			<view class="imgBox">
				<view class="showImg" @click="updateImg">
					<image src="/static/img/all-icon/add-upload-icon.png"></image>
				</view>
				<template v-for="(items,index) in discObj.FileListInfo">
					<view :key='index'  class="showImg" :style="{background: 'url('+items.imgSrc+') no-repeat center center;' }">
						<view class="imgshadow" @click="lookImg(items)"></view>
						<view class="delImg" @click="delImg(items)">
							<image src="http://xilai99.com/camerashootingWXIMG/close.png"></image>
						</view>
					</view>
				</template>
			</view>
		</view>
		<view class="remark">
			<view class="title">说明</view>
			<view class="textAreaBox" @click="openModal">
				<input type="text" v-if="discObj.Remark==''||discObj.Remark==null" placeholder="有什么想说的..." disabled="true" placeholder-style="color:#BBB">
				<text class="text" v-else>{{discObj.Remark}}</text>
			</view>
        </view>

        <button class="confirmBtn" @click="confirm">保存</button>

        <!-- 提示框 -->
        <myTipsLayer ref="anRef" timer="3" :type="tipType">
            <text>{{message}}</text>
        </myTipsLayer>

        <!-- 底部滑出 -->
        <myBottomSlideIn ref="as"></myBottomSlideIn>
		
		<!-- 模态框 -->
		<myModal :show="modalData.isShowModal" @close="cancel_modal" :title="modalData.modalTitle" @cancel="cancel_modal"
		 @confirm="confirm_modal">
			<view style="min-height: 90upx;padding: 32upx 24upx;text-align: center;line-height: 90upx;">
				确认删除该图片！
			</view>
		</myModal>
		<!-- /模态框 -->
		
		<!-- 模态框 -->
		<myModal :show="remarkObj.isShowModal" @close="cancel_modal2" :title="remarkObj.modalTitle" @cancel="cancel_modal2"
		 @confirm="confirm_modal2">
			<view style="min-height: 90upx;padding: 32upx 24upx;">
				<textarea cursor-spacing='120px' v-show="remarkObj.isShowModal" v-model="remarkObj.modalTextAreaValue" :placeholder="remarkObj.modalPlaceholder"
				 style="background: #F5F5F5;width: 430upx;height:190upx;margin: 15upx auto;
						border-radius: 10upx;padding: 31upx;box-sizing: border-box;color: #222;
						font-size: 26upx;">
						</textarea>
			</view>
		</myModal>
		<!-- /模态框 -->
		
		<!-- 底部滑出 -->
		<myBottomSlideIn ref="as"></myBottomSlideIn>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                flag: true,
                isUpLoad: true,
                tipType: '',
                message: '',
                discObj: {
                    FileListInfo: [],
                    Remark: '',
                },
				modalData:{
					isShowModal:false,
					modalTitle:'删除提示',
					delImgPath:'',
					ID:'',//删除图片用  文件明细ID
				},
				lookImgArr:[],
				textAreaValue:'',
				remarkObj:{
					isShowModal:false,
					modalTitle:'邮寄碟片说明',
					modalPlaceholder:'有什么想说的...',
					modalTextAreaValue:'',
				}
            }
        },
        methods: {
			/* 确认模态框填写 */
			confirm_modal2() {
				this.remarkObj.isShowModal = false;
				this.discObj.Remark = this.remarkObj.modalTextAreaValue;
			},
			openModal() {
				this.remarkObj.isShowModal = true;
				this.remarkObj.modalTextAreaValue = this.discObj.Remark;
			},
			/* 取消模态框 */
			cancel_modal2() {
				this.remarkObj.isShowModal = false;
			},
			
			/* 预览图片 */
			lookImg(itemObj){
				 uni.previewImage({
            urls: this.lookImgArr,
			current:itemObj.imgSrc,
			longPressActions:true,
			loop:true,
            longPressActions: {
                itemList: ['发送给朋友', '保存图片', '收藏'],
                success(data) {
                    
                },
                fail(err) {
                    console.log(err.errMsg);
                }
            }
        });
			},
			cancel_modal(){
				this.modalData.isShowModal=false;
			},
			/* 确认删除图片 */
			confirm_modal(){
				this.modalData.isShowModal=false;
				this.$show('正在删除');
				let path='/'+this.modalData.delImgPath;
				this.$deteleImg({
					key:path,
					callblack(res){
						this.delImgData();
					}
				})
			},
			/* 删除图片 */
			delImg(itemObj){
				this.modalData.isShowModal=true;
				this.modalData.delImgPath=itemObj.URLOriginal;
				this.modalData.ID=itemObj.Id;
			},
			 /*删除数据库图片*/
			delImgData() {
			let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/DeleteYJDPByOrderId';
			let data = {
				OrderId: this.orderId,
				Id: this.modalData.ID,
			};
			this.$axios({
				method: 'POST',
				url: url,
				data: data,
				success(res) {
				if (res.data.status) {
					this.$hide();
					this.message = '删除成功！';
					this.tipType = 'success';
					this.$refs.anRef.show();
					this.getList();
				}
				}
			})
			},
            /*保存邮寄碟片*/
            confirm() {
                if (this.flag) {
                    this.flag = false;
                    let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/SaveYJDPByOrderId';
                    let data = {
                        OrderId: this.orderId,
                        Remark: this.discObj.Remark,
                    };
                    this.$axios({
                        method: 'POST',
                        url: url,
                        data: data,
                        success(res) {
                            if (res.data.status) {
                                this.flag = true;
                                this.message = '保存成功！';
                                this.tipType = 'success';
                                this.$refs.anRef.show();
                            }
                        }
                    })
                }

            },

            /*上传图片前判断是否配置腾讯云*/
            isSetTenCent() {
                let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/IsCanUploadCGByOrderId';
                let data = {
                    OrderId: this.orderId,
                };
                this.$axios({
                    method: 'POST',
                    url: url,
                    data: data,
                    success(res) {
                        if (res.data.status) {
                            // this.isCanUpload=res.data.data.IsCanUpload;
                            if (res.data.data.IsCanUpload) {
                                this.isUpLoad = true;
                            } else {
                                this.isUpLoad = false;
                            }
                        }
                    }
                })
            },
            /* 上传图片 */
            updateImg() {
                if (!this.isUpLoad) {
                    this.message = '您所在的店铺未配置腾讯云，请联系管理员！';
                    this.tipType = 'error';
                    this.$refs.anRef.show();
                    return false;
                }
			this.$refs.as.handleShow({
				actions: [{
						name: '拍照',
						color: '#444'
					},
					{
						name: '从手机相册选择',
						color: '#444'
					},
			
				],
				success: (res) => {
					switch (res.id) {
						// -1代表取消按钮
						case -1:
							console.log(res)
							break
						case 0:
							{
								let that = this;
								uni.chooseImage({
									count: 1, //默认9
									sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ['camera'], //拍照										
									success(res) {
										const url = '/' + that.$manjs.getkevalue().branchid + '/' + that.orderId
										that.$uploadTasks({
											files: res.tempFiles,
											key: url,
											guid: true,
											callback(a, b) {
												that.keepImg({key: b.headers.Location.split('com')[1], fileName: b.headers.ETag});
											}
										})
									}
								});
								break;
							}
						case 1:
							{
								let that = this;
								uni.chooseImage({
									count: 1, //默认9
									sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
									sourceType: ['album'], //从相册选择
									success(res) {
										const url = '/' + that.$manjs.getkevalue().branchid + '/' + that.orderId
										that.$uploadTasks({
											files: res.tempFiles,
											key: url,
											guid:true,
											callback(a, b) {
												that.keepImg({key: b.headers.Location.split('com')[1], fileName: b.headers.ETag});
											}
										})
									}
								});
								break;
							}
					}
				}
			})
            },
            /*保存到数据库*/
            keepImg(obj) {
                this.$show('正在保存')
                let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/UploadYJDPByOrderId';
                let data = {
                    OrderId: this.orderId,
                    Title: obj.fileName,
                    OtherType: 3,
                    UrlOriginal: obj.key,
                    Type: 0,
                    FileType: '邮寄碟片',
                };
                this.$axios({
                    method: 'POST',
                    url: url,
                    data: data,
                    success(res) {
                        // console.log(res);
                        if (res.data.status) {
                            this.message = '上传成功！';
                            this.tipType = 'success';
                            this.$refs.anRef.show();
                            this.getList();
                        }
                    }
                })
            },
            /*获取邮寄碟片凭证列表*/
            getList() {
                this.isShowLoading = true;
                let url = '/xlapi/CameraManage/CameraOrderInfoManage/CameraFileInfo/GetYJDPList';
                let data = {
                    OrderId: this.orderId,
                };
                this.$axios({
                    method: 'POST',
                    url: url,
                    data: data,
                    success(res) {
                        if (res.data.status) {
							this.lookImgArr=[];
                            if (res.data.data) {
                                this.$hide();
                                res.data.data.FileListInfo.forEach(item => {
                                    item.imgSrc = this.$manjs.cosIp + item.URLOriginal
									this.lookImgArr.push(item.imgSrc);
                                })
                                this.discObj = res.data.data
                            }
                        }
                    }
                })
            },
        },
        onLoad(options) {
			uni.hideShareMenu();//隐藏分享按钮
            this.orderId = options.orderId;
            uni.setNavigationBarTitle({
                title: '邮寄碟片'
            });
        },
        onShow() {
            this.isSetTenCent();
            this.getList();
        },
		filters:{
		}
    }
</script>

<style scoped>
    .sendDisc {
        padding: 55upx 50upx;
        box-sizing: border-box;
    }

    .voucher .title,
    .remark .title {
        color: #222;
        font-size: 30upx;
        margin: 42upx 0;
    }

    .imgBox {
        display: flex;
        flex-wrap: wrap;
    }

    .imgBox .showImg {
        width: 180upx;
        height: 135upx;
        border-radius: 5upx;
        margin-right: 45upx;
        background-size: cover!important;
        position: relative;
        margin-bottom: 40upx;
    }
	
	.imgBox .imgshadow {
		position: absolute;
		z-index: 99;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

    .imgBox .showImg:nth-child(3n) {
        margin-right: 0;
    }

    .imgBox .showImg image {
        width: 100%;
        height: 100%;
    }

    .imgBox .showImg .delImg {
        width: 41upx;
        height: 41upx;
        position: absolute;
        top: -20upx;
        right: -20upx;
		z-index: 100;
    }

    .imgBox .showImg .delImg image {
        width: 100%;
        height: 100%;
    }

    .textAreaBox {
        height: 272upx;
        background: rgba(248, 248, 248, 1);
        border-radius: 10upx;
        padding: 16upx 30upx;
		box-sizing: border-box;
    }
	
	.textAreaBox input {
		font-size: 28upx;
	}
	.textAreaBox .text {
		font-size: 28upx;
		color: #222;
	}

    .confirmBtn {
        padding: 0;
        margin: 0;
        width: 360upx;
        height: 90upx;
        background: rgba(117, 186, 255, 1);
        border-radius: 45upx;
        font-size: 34upx;
        color: #fff;
        margin: 120upx auto;
    }
</style>
