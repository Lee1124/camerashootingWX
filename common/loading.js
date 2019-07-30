/**
 *  加载提示
 * */ 
function show(msg){
	uni.showLoading({
		title:msg,
		mask:true
	});
}

/**
 * 隐藏loading
 * */ 
function hide(){
	uni.hideLoading();
}
/**
 *  modal 框
 * */ 
 function Modal(title,msg,confirm,cancel){
	 let that = this
	 wx.showModal({
	  title: title,
	  content: msg,
	  success (res) {
		if (res.confirm) {
		  confirm && confirm.call(this,'ok')
		} else if (res.cancel) {
		  cancel && cancel.call(this,'no')
		}
	  }
	})
 }
export default {
	hide,
	show,Modal
}