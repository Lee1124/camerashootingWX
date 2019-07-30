import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		config: {},
		addHotelObj: {
			name: '',
			id: '',
		}, //增加酒店信息
		addHunQingObj: {
			name: '',
			id: '',
		}, //增加婚庆信息
		isCanEditArr: [], //人员选择时保存的可编辑的岗位
		backPageType: '', //返回页面所传的值
		orderBaseNews: { //保存订单部分基本信息
			addTime: '',
			addUserId: '',
		},
		personObj: {
			PSList: [],
			HQList: []
		},
		openid: '', //保存的openid
		shareObj: {
			share: false,
			orderId: '',
			url: '',
		},
		orderIsFast:false,//订单是否是加急
		IsCanUpdateBasicInfo:false,
		IsCanUpdateAmountInfo:false,
	},
	mutations: {
		config(state, provider) {
			console.log(state)
			console.log(provider)
		},
		addHotelObj(state, provider) { //增加酒店信息
			state.addHotelObj = provider
		},
		addHunQingObj(state, provider) { //增加婚庆信息
			state.addHunQingObj = provider
		},
		keepIsCanEditArr(state, provider) {
			state.isCanEditArr = provider
		},
		keepBackPageType(state, provider) {
			state.backPageType = provider
		},
		keepOrderBaseNews(state, provider) {
			state.orderBaseNews = provider
		},
		keepPersonObj(state, provider) {
			state.personObj = provider
		},
		keepOpenId(state, provider) {
			state.openid = provider
		},
		keepShareObj(state, provider) {
			state.shareObj = provider
		},
		keepOrderIsFast(state, bool) {
			state.orderIsFast = bool
		},
		keepIsCanUpdateBasicInfo(state, val) {
			state.IsCanUpdateBasicInfo = val;
		},
		keepIsCanUpdateAmountInfo(state, val) {
			state.IsCanUpdateAmountInfo = val;
		},
	}
})
export default {
	store
}
