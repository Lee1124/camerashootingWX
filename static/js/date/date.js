/** 
 * 获取本周、本季度、本月、上月的开端日期、停止日期 
 */
var now = new Date(); //当前日期 
var nowDayOfWeek = now.getDay() - 1; //今天本周的第几天 
var nowDay = now.getDate(); //当前日 
var nowMonth = now.getMonth(); //当前月 
var nowYear = now.getYear(); //当前年 
nowYear += (nowYear < 2000) ? 1900 : 0; // 

var lastMonthDate = new Date(); //上月日期 
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();

//格局化日期：yyyy-MM-dd 
function formatDate(date) {
	var myyear = date.getFullYear();
	var mymonth = date.getMonth() + 1;
	var myweekday = date.getDate();

	if (mymonth < 10) {
		mymonth = "0" + mymonth;
	}
	if (myweekday < 10) {
		myweekday = "0" + myweekday;
	}
	return (myyear + "-" + mymonth + "-" + myweekday);
}

//获得某月的天数 
function getMonthDays(myMonth) {
	var monthStartDate = new Date(nowYear, myMonth, 1);
	var monthEndDate = new Date(nowYear, myMonth + 1, 1);
	var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
	return days;
}

//获得本季度的开端月份 
function getQuarterStartMonth() {
	var quarterStartMonth = 0;
	if (nowMonth < 3) {
		quarterStartMonth = 0;
	}
	if (2 < nowMonth && nowMonth < 6) {
		quarterStartMonth = 3;
	}
	if (5 < nowMonth && nowMonth < 9) {
		quarterStartMonth = 6;
	}
	if (nowMonth > 8) {
		quarterStartMonth = 9;
	}
	return quarterStartMonth;
}

//获得本周的开端日期 
function getWeekStartDate() {
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek); //4-
	return formatDate(weekStartDate);
}

//获得本周的停止日期 
function getWeekEndDate() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));
	return formatDate(weekEndDate);
}


//获得上周的开始日期
function getLastWeekStartDate() {
	var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7);
	return formatDate(weekStartDate);
}

//获得上周的结束日期
function getLastWeekEndDate() {
	var weekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1);
	return formatDate(weekEndDate);
}

//获得本月的开端日期 
function getMonthStartDate() {
	var monthStartDate = new Date(nowYear, nowMonth, 1);
	return formatDate(monthStartDate);
}



//获得本月的停止日期 
function getMonthEndDate() {
	var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
	return formatDate(monthEndDate);
}


//获得上月开端时候 
function getLastMonthStartDate() {
	var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
	return formatDate(lastMonthStartDate);
}

//获得上月停止时候 
function getLastMonthEndDate() {
	var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
	return formatDate(lastMonthEndDate);
}

//获得本季度的开端日期 
function getQuarterStartDate() {
	var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
	return formatDate(quarterStartDate);
}

//或的本季度的停止日期 
function getQuarterEndDate() {
	var quarterEndMonth = getQuarterStartMonth() + 2;
	var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
	return formatDate(quarterStartDate);
}


//获得某月的开始日期　　
function getMonthStartDate2(paraYear, paraMonth) {
	var monthStartDate = new Date(paraYear, paraMonth, 1);
	return formatDate(monthStartDate);
}

//获得某月的结束日期　　
function getMonthEndDate2(paraYear, paraMonth) {
	console.log(paraYear, paraMonth)
	var monthEndDate = new Date(paraYear, paraMonth, getMonthDays(paraYear, paraMonth));
	return formatDate(monthEndDate);
}

//获得某周的开始日期　　
function getWeekStartDate2(paraYear, paraMonth, paraDay, paraDayOfWeek) {
	var weekStartDate = new Date(paraYear, paraMonth, paraDay + 1 - paraDayOfWeek);
	return formatDate(weekStartDate);
}

//获得某周的结束日期　　
function getWeekEndDate2(paraYear, paraMonth, paraDay, paraDayOfWeek) {
	var weekEndDate = new Date(paraYear, paraMonth, paraDay + (7 - paraDayOfWeek));
	return formatDate(weekEndDate);
}


function getTime(n) {
	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth()+1;
	var day = now.getDay(); //返回星期几的某一天;
	n = day == 0 ? n + 6 : n + (day - 1)
	now.setDate(now.getDate() - n);
	let date = now.getDate();
	var s = year + "-" + (month < 10 ? ('0' + month) : month) + "-" + (date < 10 ? ('0' + date) : date);
	return s;
}
// //上周的开始时间
// console.log(getTime(7));
// //上周的结束时间
// console.log(getTime(1));
// //本周的开始时间
// console.log(getTime(0));
// //本周的结束时间
// console.log(getTime(-6));
// //下周的开始时间
// console.log(getTime(-7));
// //下周结束时间
// console.log(getTime(-13));


export default {
	getWeekStartDate,
	getWeekEndDate,
	getMonthStartDate,
	getMonthEndDate,
	getLastMonthStartDate,
	getLastMonthEndDate,
	getQuarterStartDate,
	getQuarterEndDate,
	getLastWeekStartDate,
	getLastWeekEndDate,
	getMonthStartDate2,
	getMonthEndDate2,
	getWeekStartDate2,
	getWeekEndDate2,
	getTime
}
