$(function(){
	
	// menu_id 미존재시, 방어로직 추가
	var url = document.location.href.replace('http://', '');
	var href = $('.sidebar ul.left-menu li a').attr("href");
	$('.sidebar ul.left-menu li a').each(function(idx, item) {
		var href = $(item).attr("href");
		if(url.indexOf(href) > -1) {
			var menuId = $(item).data("menu-id");
			storage.set("menuInfo", {menu_id : menuId});
		}
	})
	
	// 브레드크럼
    if($('article .contents>h3').length > 0) {
        $('article .contents').prepend('<div class="page-header">'+$('article .contents>h3').html()+'<ol class="breadcrumb pull-right"></ol></div>');
        $('article .contents>h3').remove();
    }

    // 메뉴
	if ($('.sidebar').length > 0) {
		$(".sidebar .nav > .has-sub > a").click(function() {
			var e = $(this).next(".sub-menu")
				, a = ".sidebar .nav > li.has-sub > .sub-menu";
			0 === $(".page-sidebar-minified").length && ($(a).not(e).slideUp(250, function() {
				$(this).closest("li").removeClass("expand")
			}),
				$(e).slideToggle(250, function() {
					var e = $(this).closest("li");
					$(e).hasClass("expand") ? $(e).removeClass("expand") : $(e).addClass("expand")
				}))
		}),
			$(".sidebar .nav > .has-sub .sub-menu li.has-sub > a").click(function() {
				if (0 === $(".page-sidebar-minified").length) {
					var e = $(this).next(".sub-menu");
					$(e).slideToggle(250)
				}
			})

		$(".sidebar ul.left-menu li a").click(function(){
			if ($(this).attr('data-menu-id') !== undefined){
				var storageData = {};
				storageData.menu_id = $(this).attr('data-menu-id');
				storage.set("menuInfo", storageData)

				link.url($(this).attr('data-menu-link'))
			}
		});

		$(".sidebar-minify-btn").click(function(){
			$('#page-container').toggleClass('sidebar-minified');
		});

		generateSlimScroll('.sidebar [data-scrollbar="true"]');

		if(storage.get("menuInfo")){
			menuNavigationActive(storage.get("menuInfo","menu_id"))
		}
	}
});

// 메뉴 현재 위치 표시
function menuNavigationActive(menu_id){
	var activeMenu = $('.sidebar ul.left-menu').find("[data-menu-id='"+menu_id+"']");
	$('ol.breadcrumb').empty()
	$(activeMenu).parent().toggleClass('active')
	$(activeMenu).parents().closest('li.has-sub').addClass('active')

	$('ol.breadcrumb').append('<li class="home">Home</li>');
	var pageName;
	for(var i=0; i< $('.sidebar ul.left-menu').find(".active > a").length; i++){
		$('ol.breadcrumb').append('<li>'+$('.sidebar ul.left-menu').find(".active > a")[i].innerText+'</li>');
		pageName = $('.sidebar ul.left-menu').find(".active > a")[i].innerText;
	}

	$('#txt-page-title').text(pageName)
	$('ol.breadcrumb li').last().addClass('active')
}

$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

var storage = storageFunc();
function storageFunc(){
	return {
		get : function (item, key){
			if (key !== undefined){
				var _data = $.parseJSON(sessionStorage.getItem(item));
				return _data[key];
			}else{
				return $.parseJSON(sessionStorage.getItem(item));
			}
		},
		set : function(item, data){
			sessionStorage.setItem(item, JSON.stringify(data));
		},
		remove : function(item){
			sessionStorage.removeItem(item);
		},
		clear : function(url){
			sessionStorage.clear();
			if (url){
				storage.set("lastPage", $(location).attr('pathname'));
				$(location).attr('href',url);
			};
		}
	}
}

var sweet = swalFunc();
function swalFunc(){
	function linkCallbackFunc(link, callback, param, result){
		if (link == "link"){
			window.location.href = callback;
		}else if (link == "back"){
			history.back()
		}else if (link == "reload"){
			window.location.reload();
		}else if (link == "result"){ // isConfirm 결과에 따라 컨트롤 할 수 있도록 추가함
			if(callback !== undefined) callback(result);
			swal.close()
		}else{
			if(callback !== undefined) callback(param);
		}
	}
	return {
		alert : function( message, customSize, link, callback, param){
			swal({
				title : "알림", // title 제외시 SweetAlert: Missing "title" argument! 오류 발생
				text: message,
				html: message,
				customClass: 'custom-swal-alert '+customSize, // font-size-18px
				showCancelButton: true,
				cancelButtonText: "닫기",
				showConfirmButton: false,
				closeOnConfirm: true,
				closeOnCancel: true
			},function(isConfirm){
				if (!isConfirm) {
					linkCallbackFunc(link, callback, param, isConfirm);
				}
			});
		},
		confirm : function(title, message, link, callback, param){
			swal({
				title: title,
				text: message,
				html: message,
				showCancelButton: true,
				confirmButtonColor : '#3695ff',
				confirmButtonText: '확인',
				cancelButtonText: '취소',
				customClass: 'custom-swal-alert ',
				closeOnConfirm: false,
				closeOnCancel: true,
				closeModal: false,
				showLoaderOnConfirm : callback !== undefined ? true : false
			},function(isConfirm) {
				linkCallbackFunc(link, callback, param, isConfirm);	
				
			});
		},
		close : function(){
			swal.close()
		}
	}
}


var link = linkFunc();
function linkFunc(){
	return {
		url : function (callback){
			$(location).attr('href',callback)
		},
		back : function(){
			history.back()
		},
		reload : function(){
			window.location.reload();
		},
		reUrl : function(strUrl){
			var expUrl = /^http[s]?\:\/\//i;
			var url;
			if (expUrl.test(strUrl)) url = strUrl;
			else url = 'http://'+strUrl;

			return url;
		},
		popup : function(strUrl){
			window.open(strUrl, "", "width="+screen.width+", height="+screen.height+", fullscreen=yes, toolbar=no, menubar=no, scrollbars=no, resizable=yes" );
		},
	}
}

var str = strFunc();
function strFunc(){
	return {
		comma : function (str){
			if(this.isEmpty(str)) return str;
			
			str = String(str);
			return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
		},
		uncomma : function (str){
			if(this.isEmpty(str)) return str;
			
			str = String(str);
			return str.replace(/,/g,"");
		},
		round : function (num,n){
			return parseFloat(Math.round(num * Math.pow(10, n)) /Math.pow(10,n)).toFixed(n);
		},
		pad : function (n, width) {
			  n = n + '';
			  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
		},
		replace: function (text,val1,val2) {
			var re = new RegExp(val1,"g")

			text = text.replace(re , val2);
			return text;
		},
		isEmpty : function (val){
			return (val === undefined || val == null || val.length <= 0) ? true : false;
		},
		replace: function (text,val1,val2) {
			var re = new RegExp(val1,"g")

			text = text.replace(re , val2);
			return text;
		},
		trim : function (str) {
			return $.trim(str);
		},
		textNewLine : function (str) {
			return str.replace(/(?:\r\n|\r|\n)/g, '<br />');
		},
		getYyyymmddFmt : function(str, fmt) {
			if(str.length == 8) {
				return str.replace(/^(\d{4})(\d{2})(\d{2})$/g, '$1' + fmt + '$2' + fmt + '$3');
			} else if(str.length == 6) {
				return str.replace(/^(\d{4})(\d{2})$/g, '$1' + fmt + '$2');
			}
		},
		getHhssFmt : function(str, fmt) {
			return str.replace(/^\d{4}\d{2}\d{2}(\d{2})(\d{2})$/g, '$1' + fmt + '$2');
		},
		getByteLength : function(str) {
			for(b=i=0;c=str.charCodeAt(i++);b+=c>>11?2:1);
			return b;
		},
	}
}

var num = numFunc();
function numFunc(){
	return {
		isEmpty : function (val){
			return (val === undefined || val == null || val.length <= 0 || val == 0) ? true : false;
		},
		percent : function (num1, num2) {
			// IE isNaN 미지원
			if ( ! Number.isNaN ){
				Number.isNaN = function isNaN(value) { return value !== value; };
			}

			if(Number.isNaN(Number(num1)) || Number.isNaN(Number(num2))) return '';
			var cal = parseInt(num1 / num2 * 100);
			cal = Number.isNaN(cal)?0:cal;
			return cal + '%';
		}
	}
}

var dateFunc = dateFunc();
function dateFunc(){
	return {
		getToday : function (fmt){
			var today = new Date();
			return dateFunc.getFmtDate(today, fmt);
		},
		addDate : function (date, addVal, fmt){
			addVal = addVal || 0;
			date.setDate(date.getDate() + addVal);
			return dateFunc.getFmtDate(date, fmt);
		},
		getFmtDate : function (date, fmt){
			var mm = date.getMonth() + 1;
			var dd = date.getDate();

			return [date.getFullYear(),
		          	(mm>9 ? '' : '0') + mm,
		          	(dd>9 ? '' : '0') + dd
		    ].join(fmt);
		},
		getLastWeek : function (fmt){
			var date = new Date();
			var dayOfMonth = date.getDate();
			date.setDate(dayOfMonth - 7);
			return dateFunc.getFmtDate(date, fmt);
		},
		getLastYear : function (fmt){
			var date = new Date();
			var dayOfYear = date.getFullYear();
			date.setYear(dayOfYear - 1);
			return dateFunc.getFmtDate(date, fmt);
		},
	}
}

var pagingFunc = pagingFunc();
function pagingFunc(){
	var currentPage = 1;
	var perPage = 5;
	return {
		setCurrentPage : function(a) {
			currentPage = a || 1;
		},
		setPerPage : function(b) {
			perPage = b || 5;
		},
		getCurrentPage : function() {
			return currentPage;
		},
		getPerPage : function() {
			return perPage;
		},
		setPageInfo : function(currentPage, perPage) {
			this.setCurrentPage(currentPage);
			this.setPerPage(perPage);
		},
		postData : function (url, params, errMsg, callback){
			errMsg = errMsg || '오류가 발생하였습니다.';
			
			var newParams = $.extend({
				currentPage : currentPage,
				perPage : perPage
			}, params);
			
			$.ajax({
		        url: url,
		        type: "POST",
		        contentType: "application/json; charset=utf-8",
		        data: JSON.stringify(newParams),
	      	}).done(function(data) {
	      		callback(data);
	      	}).fail(function(xhr) {
	      		sweet.alert(errMsg);
	      	});
		},
		getData : function (url, params, errMsg, callback) {
			
		}
	}
}

function generateSlimScroll(el, option){
	if (option){
		$(el).slimscroll(option);
	}else{
		$(el).slimscroll({
			height: 'auto',
			size: '3px'
		});
	}
}

function destroySlimscroll(el) { 
   $(el).parent().replaceWith($(el));
   $(el).css("height", "100%");
}

// 05.12 UMS 기본 toast 스타일 ( IE Parameters without defaults after default parameters 지원안됨)
function toastMsg(text) {
	$.toast({
		text : text,
		loader:false,
		bgColor:'#555555',
		textColor:'#fff',
		position:'top-center',
		duration: 5000, // 5초후에 사라짐
	})
}
//05.12 toast : type('success','error','info','warning')별 디자인변경
function toast(type, text) {
	$.toast({
		icon: type, // icon type 별로 스타일 변경됨, icon은 css에서 제외
		text : text,
		loader:false,
		position:'top-center',
		duration: 5000, // 5초후에 사라짐
		//heading:type, //Information, Error, Warning, Success
	})
}
