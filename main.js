import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
import config from '@/config/config.js'
import manjs from '@/static/js/default/main.js'
import date from '@/static/js/date/date.js'
import ajax from '@/api/axios.js'
import upFile from "@/common/UpFileImg.js"
import tips from "@/common/loading.js"

/* 订单所用全局公用组件 */
import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"//加载中
import myinput from "@/components/my-input/my-input.vue"//普通input
import myInputSearch1 from "@/components/my-input-search1/my-input-search1.vue"; //input搜索(根据搜索)
import myInputSearch1a from "@/components/my-input-search1-2/my-input-search1-2.vue"; //input搜索(根据搜索)2
import myInputSearch2 from "@/components/my-input-search2/my-input-search2.vue"; //input搜索(一次性返出)
import myTextarea from "@/components/my-textarea/my-textarea.vue"; //多行文本
import mySelect from "@/components/my-select/my-select.vue"; //选择器(options)
import senSetPicker from "@/components/sen-pickerview/picker-view-set.vue"; //日期选择
import myModal from '@/components/my-modal/my-modal.vue';//模态框
import myTipsLayer from '@/components/my-tips-layer/an-layer';//提示框(用于错误/警告提示)
import myTipsLayer2 from '@/components/an-layer/an-layer';//提示框(用于错误/警告提示)
import myBottomSlideIn from '@/components/my-bottom-slideIn/my-bottom-slideIn';//底部滑出
import mySquareLayer from '@/components/my-square-layer/my-square-layer.vue';//从四方滑出(上下左右，内容自定义)
import sidePopup from '@/components/side-popup/side-popup.vue';//从四方滑出(上下左右，内容自定义)
import myDatePicker from '@/components/my-date-picker/w-picker.vue';//时间选择器(多种选择方式)
import noDataTips from '@/components/no-data-tips/no-data-tips.vue';//无数据提示
Vue.component('uniLoadMore',uniLoadMore);
Vue.component('myinput',myinput);
Vue.component('myInputSearch1',myInputSearch1);
Vue.component('myInputSearch1a',myInputSearch1a);
Vue.component('myInputSearch2',myInputSearch2);
Vue.component('myTextarea',myTextarea);
Vue.component('mySelect',mySelect);
Vue.component('senSetPicker',senSetPicker);
Vue.component('myModal',myModal);
Vue.component('myTipsLayer',myTipsLayer);
Vue.component('myTipsLayer2',myTipsLayer2);
Vue.component('myBottomSlideIn',myBottomSlideIn);
Vue.component('mySquareLayer',mySquareLayer);
Vue.component('sidePopup',sidePopup);
Vue.component('myDatePicker',myDatePicker);
Vue.component('noDataTips',noDataTips);
// 挂载原型方法
Vue.prototype.$config = config.config; //config 配置
Vue.prototype.$store = store.store; //Vuex
Vue.prototype.$manjs = manjs; //man.js 全局引入
Vue.prototype.$date = date; //man.js 全局引入
Vue.prototype.$axios = ajax.axios; //请求封装
Vue.prototype.$PictureImg = upFile.PictureImg; //选择图片
Vue.prototype.$uploadTasks = upFile.uploadTasks; //上传图片
Vue.prototype.$deteleImg = upFile.deteleImg;		//删除图片
Vue.prototype.$show = tips.show
Vue.prototype.$hide = tips.hide
Vue.prototype.$modal = tips.Modal



Vue.config.productionTip = false;



App.mpType = 'app';

const app = new Vue({
	...App
})
app.$mount()
