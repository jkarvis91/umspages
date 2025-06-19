$(function(){
	
	$.extend( $.validator.messages, {
		required: "필수 항목입니다.",
		remote: "항목을 수정하세요.",
		email: "유효하지 않은 E-Mail주소입니다.",
		url: "유효하지 않은 URL입니다.",
		date: "올바른 날짜를 입력하세요.",
		dateISO: "올바른 날짜(ISO)를 입력하세요.",
		number: "유효한 숫자가 아닙니다.",
		digits: "숫자만 입력 가능합니다.",
		creditcard: "신용카드 번호가 바르지 않습니다.",
		equalTo: "같은 값을 다시 입력하세요.",
		extension: "올바른 확장자가 아닙니다.",
		maxlength: $.validator.format( "{0}자 이내만 입력 가능합니다." ),
		minlength: $.validator.format( "{0}자 이상 입력하세요." ),
		rangelength: $.validator.format( "문자 길이가 {0} 에서 {1} 사이의 값을 입력하세요." ),
		range: $.validator.format( "{0} 에서 {1} 사이의 값을 입력하세요." ),
		max: $.validator.format( "{0} 이하의 값을 입력하세요." ),
		min: $.validator.format( "{0} 이상의 값을 입력하세요." )
	});
	
	// 한글, 영어를 체크하여 계산된 바이트 길이를 최대 길이와 비교
	$.validator.addMethod('maxbytelength', function (value, element, param) {
	    var nMax = param;
	    var nBytes = $.type(value) !== "string" ? 0 : str.getByteLength(value); 
	    return this.optional(element) || (nBytes === 0 || nBytes <= nMax);
	});
	
	// 한글, 영문, 숫자, 공백, 특수기호(_),(–)를 사용하여 {0}~{1}자 이내만 입력 가능
	$.validator.addMethod('regexRangelength', function (value, element, params) {
	    var nMin = params[0];
	    var nMax = params[1];
	    var regex = new RegExp("^[가-힣ㄱ-ㅎㅏ-ㅣ\\w\\s-]{" + nMin +"," + nMax + "}$");
	    return this.optional(element) || regex.test(value);
	});
	
	// 값이 입력값(기본값)과 동일하지 않음 (ex selectbox > '{ } 선택하세요." 사용)
	$.validator.addMethod("valueNotEquals", function(value, element, arg){
		// 공백 과 줄바꿈  제거
		return value.replace(/\s*/g, "").replace(/\n/g, "").indexOf(arg.trim()) == -1;
	});
	
	// 숫자로 {0}자 이내만 입력 가능
	$.validator.addMethod("digitsLength", function(value, element, param){
		var nMax = param;
		var regex = new RegExp("^[0-9]{1," + nMax + "}$");
		return this.optional(element) || regex.test(value);
	});
	 
	// URL형식 입력가능(http://wwww.)
	$.validator.addMethod("reqUrl", function(value, element, param){
		var regex = new RegExp("(http|https):\/\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\/|\/([\\w#!:.?+=&%@!\\-\/]))?");
		return regex.test(value);
	});
	 
	// URL형식 입력가능(http://)
	$.validator.addMethod("alimUrl", function(value, element, param){
		var regex = new RegExp("(http|https):\/\/");
		 // 치환변수 입력 가능
		 //var removeValue = removeReplaceValue(value);
		return value.trim().length > 0 ? regex.test( value ) : true;
	});
	 
	// 스킴형식 입력가능(스킴://)
	$.validator.addMethod("schemeUrl", function(value, element, param){
		var regex = new RegExp("[가-힣ㄱ-ㅎㅏ-ㅣ\\w\\s]:\/\/");
		// 치환변수 입력 가능
		//var removeValue = removeReplaceValue(value);
		return value.trim().length > 0 ? regex.test( value ) : true;
	});
	 
	// 발송희망일 건수 체크
	$.validator.addMethod("requiredSendCnt", function(value, element, param){
		var sendRestCnt = $("#sendRestCnt").val();
		return sendRestCnt == 0;
	});
	
	$.validator.setDefaults({
		errorElement: "div",
		errorClass: "jqval-error",
		errorPlacement: function(error, element) {
			if (element.parents('.search_field').length > 0){
				// 2022.05.12 조건추가
				if(element.parents('.ele_area').length > 0) {
					error.appendTo(element.parents('.ele_area:not(.elTab)'));
				} else {
					error.appendTo(element.parents('.search_field'));
				}
				//error.appendTo(element.parents('.search_field'));
			} else {
				// error.appendTo( element.parent("div").next("div") );
				// error.appendTo( element.parent("div").next() );
				error.appendTo(element.parent());

			}
			error.slideDown(400);
			error.animate({ opacity: 1 }, { queue: false, duration: 700 });
		},
	});

	// v2 datatables 기본 설정
    $.extend(true, $.fn.dataTable.defaults, {
        // p : 페이징 / <> : div / paginate-v2 : class
        dom: 'irt<"paginate-v2"p>'
        // 검색란 표시 설정
        , searching: false
        // 정렬 표시 설정
        , ordering: false
        // 서버처리 중 표시 설정
        , processing: true
        // 정보 표시 설정
	    , info: true
        // 정보 커스텀
        , "infoCallback":function(settings, start, end, max, total, pre) {
            if ($('#countStr').length > 0)   $('#countStr').text(max);
        }
        // 페이징 표시 설정
        , paging: true
        , pagingType: "full_numbers"
        // 언어 설정
        , language: {
            // 페이징
            paginate: {
                first: '<i class="fa fa-angle-double-left"></i>'
                , last: '<i class="fa fa-angle-double-right"></i>'
                , previous: '<i class="fa fa-angle-left"></i>'
                , next: '<i class="fa fa-angle-right"></i>'
            }
            , loadingRecords: '&nbsp;'
            , processing : '<img src="/static/images/list-loading.gif">'
            , emptyTable : '<div class="table-no-search border-none pdd-btm-100 pdd-top-100">' +
				'    <p>검색 결과가 없습니다.</p>' +
				'    <button class="btn btn-reset">목록 보기</button>' +
				'</div>'
        }
    });

	// 로그인 체크
	// var arrStorageCheck = ['_login.php'];
	// if($.inArray($(location).attr('pathname').split("/").pop(-1), arrStorageCheck) != -1){
	// 	var lastPage = storage.get("lastPage");
	// 	storage.clear();
	// 	storage.set("lastPage", lastPage);
	// }else{
	// 	if(!storage.get("userInfo")){
	// 		sweet.alert("", "로그인 정보가 없습니다.", "small","",userLogOut)
	// 	}
	// }

	// 로그아웃
	// function userLogOut(){
	// 	storage.clear('/views/_login/_login.php');
	// }

	// 202205 common.js 이동
	// if ($('.sidebar').length > 0) {
	// 	$(".sidebar .nav > .has-sub > a").click(function() {
	// 		var e = $(this).next(".sub-menu")
	// 				, a = ".sidebar .nav > li.has-sub > .sub-menu";
	// 		0 === $(".page-sidebar-minified").length && ($(a).not(e).slideUp(250, function() {
	// 			$(this).closest("li").removeClass("expand")
	// 		}),
	// 				$(e).slideToggle(250, function() {
	// 					var e = $(this).closest("li");
	// 					$(e).hasClass("expand") ? $(e).removeClass("expand") : $(e).addClass("expand")
	// 				}))
	// 	}),
	// 			$(".sidebar .nav > .has-sub .sub-menu li.has-sub > a").click(function() {
	// 				if (0 === $(".page-sidebar-minified").length) {
	// 					var e = $(this).next(".sub-menu");
	// 					$(e).slideToggle(250)
	// 				}
	// 			})
	//
	// 	$(".sidebar ul.left-menu li a").click(function(){
	// 		if ($(this).attr('data-menu-id') !== undefined){
	// 			var storageData = {};
	// 			storageData.menu_id = $(this).attr('data-menu-id');
	// 			storage.set("menuInfo", storageData)
	//
	// 			link.url($(this).attr('data-menu-link'))
	// 		}
	// 	});
	//
	// 	$(".sidebar-minify-btn").click(function(){
	// 		$('#page-container').toggleClass('sidebar-minified');
	// 	});
	//
	// 	generateSlimScroll('.sidebar [data-scrollbar="true"]');
	//
	// 	if(storage.get("menuInfo")){
	// 		menuNavigationActive(storage.get("menuInfo","menu_id"))
	// 	}
	// }

	if ($('.header-sort').length > 0){
		$('.header-sort').click(function() {
		  var isSortedAsc  = $(this).hasClass('sort-asc');
		  var isSortedDesc = $(this).hasClass('sort-desc');
		  var isUnsorted = !isSortedAsc && !isSortedDesc;
		
		  // 싱글정렬
		  $('.header-sort').removeClass('sort-asc sort-desc');
		  // 멀티정렬
		  // $(this).removeClass('sort-asc sort-desc');
		  
		  if (isUnsorted || isSortedDesc) {
			$(this).addClass('sort-asc');
		  } else if (isSortedAsc) {
			$(this).addClass('sort-desc');
		  }
		});      
	  }
	  
	libraryInit();
});

// 메뉴 현재 위치 표시
/* 202205 common.js 이동
function menuNavigationActive(menu_id){
	var activeMenu = $('.sidebar ul.left-menu').find("[data-menu-id='"+menu_id+"']")
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
*/

// 월달력 만들기
function monCalendar(id, date) {
	var monCalendar = document.getElementById(id);

	if( typeof( date ) !== 'undefined' ) {
		date = date.split('-');
		if (dateFunc.getToday('-').substr(0, 7) == date[0]+'-'+str.pad(date[1],2)){
			var date = new Date();
		}else{
			date[1] = date[1] - 1;
			date = new Date(date[0], date[1], '01');
		}
	} else {
		var date = new Date();
	}

	var currentYear = date.getFullYear(); //년도를 구함
	var currentMonth = date.getMonth() + 1; //연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
	var currentDate = date.getDate(); //오늘 일자.

	var toDay = currentYear+'-'+str.pad(currentMonth,2)+'-'+str.pad(currentDate,2);

	date.setDate(1);
	var currentDay = date.getDay(); //이번달 1일의 요일은 출력. 0은 일요일 6은 토요일

	var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
		lastDate[1] = 29;
	//각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.

	var currentLastDate = lastDate[currentMonth-1];
	var week = Math.ceil( ( currentDay + currentLastDate ) / 7 ); //총 몇 주인지 구함.

	if(currentMonth != 1)
		var prevDate = currentYear + '-' + ( currentMonth - 1 ) + '-' + currentDate;
	else
		var prevDate = ( currentYear - 1 ) + '-' + 12 + '-' + currentDate;

	//만약 이번달이 1월이라면 1년 전 12월로 출력.
	if(currentMonth != 12)
		var nextDate = currentYear + '-' + ( currentMonth + 1 ) + '-' + currentDate;
	//만약 이번달이 12월이라면 1년 후 1월로 출력.
	else
		var nextDate = ( currentYear + 1 ) + '-' + 1 + '-' + currentDate;

	var calendar = '';
	calendar += '<div class="hd">';
	calendar += '	<a href="javascript:void(0)" class="btn-prev-month" id="preMonth" onclick="moveMonth(\'prev\')"></a>';
	calendar += '		<span class="calYear">' + currentYear + '</span>년' + '<span class="calMonth">' + str.pad(currentMonth,2) + '</span>월';
	calendar += '	<a href="javascript:void(0)" class="btn-next-month" id="nextMonth" onclick="moveMonth(\'next\')"></a>';
	calendar += '</div>';
	calendar += '<div class="calendar-inner-table">';
	calendar += '	<table cellpadding="0" cellspacing="0" border="0">';
	calendar += '	<thead>';
	calendar += '	<tr>';
	calendar += '		<th>일</th>';
	calendar += '		<th>월</th>';
	calendar += '		<th>화</th>';
	calendar += '		<th>수</th>';
	calendar += '		<th>목</th>';
	calendar += '		<th>금</th>';
	calendar += '		<th>토</th>';
	calendar += '	</tr>';
	calendar += '	</thead>';
	calendar += '	<tbody>';

	var dateNum = 1 - currentDay;
	var yymmdd, className;

	for(var i = 0; i < week; i++) {
		calendar += '			<tr>';
		for(var j = 0; j < 7; j++, dateNum++) {
			if( dateNum < 1 || dateNum > currentLastDate ) {
				calendar += '				<td> </td>';
				continue;
			}
			yymmdd = currentYear + str.pad(currentMonth,2) + str.pad(dateNum,2);
			className= (yymmdd == $.format.date(new Date(), 'yyyyMMdd')) ? 'today' : 'notWork';
			calendar += '				<td><div id="calendar_'+yymmdd+'" class='+className+' value='+yymmdd+'>' + dateNum + '</div></td>';
		}
		calendar += '			</tr>';
	}
	calendar += '			</tbody>';
	calendar += '		</table>';
	calendar += '</div>';

	monCalendar.innerHTML = calendar;
}

// 2022.05.10 공통함수로 이동
/*function getToday(addDate) {
	if (addDate == undefined) addDate=0

	var d = new Date();
	var month = d.getMonth()+1;
	var day = d.getDate()+addDate;

	var output = d.getFullYear() + '-' +
			((''+month).length<2 ? '0' : '') + month + '-' +
			((''+day).length<2 ? '0' : '') + day;

	return output;
}*/

function randomNum(min, max){
	var randNum = Math.floor(Math.random()*(max-min+1)) + min; return randNum;
}

//파일 변경 이벤트
function changeFileUpld(e) {
	var file = e.files[0];
	if(file) {
		$(e).next().val(file.name);
		$(e).next().next().removeClass('hide');
		
		// 삭제버튼 클릭 이벤트
		$(e).next().next().off('click');
		$(e).next().next().click(function() {
			$(e).val('');
			$(this).prev().val('');
			$(this).addClass('hide');
		});
	}
}

function libraryInit() {

	initTippy();

	$('.btnFileDel').off('click');
	$(".btnFileDel").click(function() {
		$(this).parents().closest('.search_field.inline-form').remove()
	});

	/*$(".file-upload").off('change');
	$(".file-upload").on('change',function(){
		var fileName = $(this).val();
		$(this).next().val(fileName);
		$(this).next().next().removeClass('hide');

		$(this).next().next().off('click');
		$(this).next().next().click(function() {
			$(this).prev().val('');
			$(this).addClass('hide');
		});

	});*/

	// daterangepicker 선언
	if ($('.date-picker').length > 0){
		moment.locale('ko'); // 한글 셋팅
		var date = new Date();
		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
		$('.date-picker').daterangepicker({
			locale :{
				format: 'YYYY-MM-DD',
				separator: ' ~ ',
				applyLabel: "적용",
				cancelLabel: "닫기"
			},
			"startDate": firstDay,
			"endDate": lastDay,
		});
	}
	
	if ($('.date-time-picker').length > 0){
		moment.locale('ko'); // 한글 셋팅
		$('.date-time-picker').daterangepicker({
			locale :{
				format: 'YYYY-MM-DD H:mm',
				applyLabel: "적용",
				cancelLabel: "닫기"
			},
			singleDatePicker: true, 
			timePicker: true,
			timePicker24Hour: true,
			// autoApply: true, //날짜는 가능,하지만! timePicker일 경우 안됨 . v3.6 해결됐다는데 라이브러리를 못 찾겠음
		}, function(target) {
			var targetId = this.element[0].id;
			var lastNum = targetId.slice(-1);
			var otherTargetId = targetId.slice(0, -1) + (lastNum == 0? 1 : 0);
			
			var startDate = '';
			var endDate = '';
			
			if(lastNum == 0) {
				// 시작일 선택시
				startDate = moment( target._d );
				endDate = moment( new Date( $('#' + otherTargetId).val().replace(/[.-]/gi, "/") ) ); // IE new Date() 사용사  2022-01-01 을 2022/01/01 형태로 변경 후 사용
			} else {
				// 종료일 선택시
				startDate = moment( new Date(  $('#' + otherTargetId).val().replace(/[.-]/gi, "/") ) ); // IE new Date() 사용사  2022-01-01 을 2022/01/01 형태로 변경 후 사용
				endDate = moment(target._d);
			}

			var isValid = startDate.diff(endDate) && endDate.isAfter(startDate);
			if(isValid == true) {
				$('#' + targetId + '-error').hide();
				$('#' + otherTargetId + '-error').hide();
			} else {
				$('#' + targetId + '-error').show();
				$('#' + otherTargetId + '-error').hide();
			}
		});
	}
	
	if ($('.date').length > 0){
		moment.locale('ko'); // 한글 셋팅
		$('.date').daterangepicker({
			locale :{
				format: 'YYYY-MM-DD',
			},
			"singleDatePicker": true,
			"autoApply": true,
		}, function(start, end, label) {
			console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
		});
	}

	// 글자수 체크
	if ($('.remaining').length > 0){
		$('.remaining').each(function(){
			setStringLen(this, false);
		});
	}

	// 바이트 체크
	if ($('.remaining_byte').length > 0){
		$('.remaining_byte').each(function(){
			setStringLen(this, true);
		});
	}
	
	// 바이트 체크
	// if ($('.emulator_cont').length > 0){
	// 	generateSlimScroll('.emulator_cont', { height: '568px', size: '3px'});
	// }

	// data-toggle tab
	// 22.08.25 주석처리
//	$("a[data-toggle='tab']").off("click");
//	$("a[data-toggle='tab']").click(function() {
//		$(this).parents().closest('ul').last().find('li.active').removeClass('active');
//		$(this).parent().addClass('active');
//
//		$.each($(this).parents().closest('ul').last().find('li'), function( key, obj) {
//			var item = $(obj).find('a').data('tab');
//			$('#'+item).addClass('hide');
//		});
//		$('#'+$(this).data('tab')).removeClass('hide');
//	});


	// data-toggle tab
	$("a[data-toggle-url='tab']").off("click");
	$("a[data-toggle-url='tab']").click(function() {
		$(this).parents().closest('ul').last().find('li.active').removeClass('active');
		$(this).parent().addClass('active');

		var callBackFunc = $(this).data('call-back');
		$("#tabContentArea").empty();
		$("#tabContentArea").load($(this).data('url'),function(){
			libraryInit();

			if (callBackFunc) {
				var callBack = eval(callBackFunc);
				callBack();
			}
		});
	});

	// data-toggle radio
	$("input:radio[data-toggle]").change(function () {
		$.each($(this).parents().closest('div').last().find('input[type="radio"]'), function( key, obj) {
			var item = $(obj).data('toggle');
			$('#'+item).addClass('hide');
		});
		$('#'+$(this).data('toggle')).removeClass('hide');
	});
	
	// 공통 버튼 기능 추가
	// 1. 버튼 라디오에 data-name=rcsBtn 속성 추가
	// 2. 버튼 셀렉트박스 생성을 위한 타겟 값 > 버튼 라디오에 data-target="타겟id값" 속성 추가
	$('body').on('change', 'input:radio[data-name=rcsBtn]', function() {
		var cnt = $(this).val() * 1;
		var targetId = $(this).data("target");
		var $rcsBtnEl = $('#' + targetId).parent().find('.rcsBtnEl');
		var rcsBtnElLen = $rcsBtnEl.length;
		if(cnt == 0) {
			// 22.06.15 미리보기 버튼 숨김처리 추가
			$(".template-openrichcard-suggestion").hide();
			$rcsBtnEl.remove(); // 모든 버튼 노출 삭제
		} else if(rcsBtnElLen > cnt) { // El 갯수가 클 경우 cnt 만큼  El 삭제
			for(var i=rcsBtnElLen; i > cnt; i--) {
				$rcsBtnEl.eq(i-1).remove()// 버튼 삭제	
			}
		}
		
		for(var i = rcsBtnElLen + 1; i < cnt + 1; i++) {
			if(targetId.indexOf("CR") > -1) {
				makeRcsCarouselBtnSelect(targetId, i);
			} else if(targetId.indexOf('alim') > -1) {
				makeAlimBtnSelect(targetId, i);
			} else {
				makeRcsBtnSelect(targetId, i);
			}
			
			// 버튼 액션 선택 필수
			$('#rcsBtnType_'+ targetId + i).rules("add", {
				required: true,
				messages: {
					required:  (targetId == "alimTmpltBtn"? "버튼 타임을 " : "버튼 액션을" ) +' 선택하세요.',
				}
			});
			// 버튼명 필수
			$('#rcsBtnNm_'+ targetId + i).rules("add", {
				required: true,
				maxlength: 17,
				messages: {
					required: "버튼명을 입력하세요."
				}
			});
		}
	});
}

// rcs버튼 생성 공통 html
function makeRcsBtnCmmn(targetId, index) {
	// 08.05 회의 내용 반영 - 버튼 액션 항목 축소
	var html = '';
	html += '		<div class="ele_area">';
	html += '			<div class="search_field inline-form mrg-btm-5">';
	html += '				<p class="mrg-right-10 width150">';
	html += '					<select class="width-100" onchange="divButtonDisplayAction(this, \''+ targetId +'\');" id="rcsBtnType_'+ targetId + index + '" name="rcsBtnType_'+ targetId + index + '">';
	html += '						<option value="">액션 선택</option>';
//	html += '						<option value="copy">복사하기</option>';
	html += '						<option value="url">URL연결</option>';
	html += '						<option value="tel">전화걸기</option>';
//	html += '						<option value="coordinate">지도 보여주기(좌표)</option>';
//	html += '						<option value="query">지도 보여주기(쿼리)</option>';
//	html += '						<option value="position">현재위치공유</option>';
//	html += '						<option value="calendar">캘린더등록</option>';
//	html += '						<option value="msg">메시지전송</option>';
	html += '					</select>';
	html += '				</p>';
	html += '				<div class="ele_area remaining" data-input="rcsBtnNm_'+ targetId + index +'" data-count="rcsBtnNm_'+ targetId + index +'_count" data-text-len="17">';
	html += '					<input type="text" class="form-control previewRcsBtnNm" id="rcsBtnNm_'+ targetId + index +'" name="rcsBtnNm_'+ targetId + index +'" value="" placeholder="버튼명을 입력하세요" />';
	html += '					<p class="text-right color-gray">';
	html += '						<span id="rcsBtnNm_'+ targetId + index +'_count">0</span>/17 자';
	html += '					</p>';
	html += '				</div>';
	html += '			</div>';
	html += '		</div>';
	return html;
}

//RCS - MMS Carousel 버튼 셀렉트박스 생성 
function makeRcsCarouselBtnSelect(targetId, index) {
	var html = '';
	html += '<div class="mrg-top-10 pdd-top-10 rcsBtnEl" id="rcsBtnEl_' + targetId + index +'">';
	html += '	<div class="search_field display-block">';
	html += '		<label class="font-weight-light display-block pdd-btm-5">버튼'+ index +'</label>';
	html += makeRcsBtnCmmn(targetId, index);
	html += '	</div>';
	html += '</div>';
	
	if(index == 1) {
		$('#' + targetId).after(html);
	} else {
		$('#' + targetId).parent().find(".rcsBtnEl:last").after(html);
	}
}

// RCS - 버튼 셀렉트박스 생성 
function makeRcsBtnSelect(targetId, index) {
	var html = '';
	html += '<div class="row clearfix button-display mrg-btm-10 rcsBtnEl" id="rcsBtnEl_' + targetId + index +'">';
	html += '	<div class="reg-left">';
	html += '		<h3 class="pdd-top-4 pdd-left-25 font-weight-light font-size-12">버튼'+ index +'</h3>';
	html += '	</div>';
	html += '	<div class="reg-right">';
	html += makeRcsBtnCmmn(targetId, index);
	html += '	</div>';
	html += '</div>';
	
	if(index == 1) {
		$('#' + targetId).after(html);
	} else {
		$('#' + targetId).parent().find(".rcsBtnEl:last").after(html);
	}
	
	// 글자수 이벤트 핸들러 추가
	setStringLen($('#rcsBtnEl_'+ targetId + index).find(".remaining"), false);
}

// RCS- 버튼 셀렉트박스 선택값에 따른 컨텐츠 생성
function divButtonDisplayAction(e, targetId) {
	var parentTarget = $(e).parent().parent().parent().parent();
	var item = $(e).val();
	var html = '';
	//var index = $(".rcsBtnEl").index($(e).closest(".rcsBtnEl")) + 1;
	var index = $(e).closest(".rcsBtnEl").attr('id').slice(-1);
	
	$(parentTarget).find(".rcsBtnContents").remove();
	if (item == 'copy') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20 rcsBtnContents">';
		html += '			<div class="search_field inline-form mrg-btm-5">';
		html += '				<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_1" data-count="rcsBtn_'+ targetId + index +'_1-count" data-text-len="200">';
		html += '					<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_1" name="rcsBtn_'+ targetId + index +'_1" value="" placeholder="복사할 값을 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_1-count">0</span>/200자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'url') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20 rcsBtnContents">';
		html += '			<div class="search_field inline-form mrg-btm-5">';
		html += '				<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_2" data-count="rcsBtn_'+ targetId + index +'_2-count" data-text-len="200">';
		html += '					<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_2" name="rcsBtn_'+ targetId + index +'_2" value="" placeholder="http://www.ums.co.kr 형식으로 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_2-count">0</span>/200자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'tel') {
		html += '		<div class="ele_area pdd-top-10 mrg-top-20 rcsBtnContents">';
		html += '			<div class="search_field inline-form mrg-btm-5">';
		html += '				<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_3" data-count="rcsBtn_'+ targetId + index +'_3-count" data-text-len="40">';
		html += '					<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_3" name="rcsBtn_'+ targetId + index +'_3" value="" placeholder="전화번호를 입력하세요"/>';
		html += '					<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_3-count">0</span>/40자</p>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'coordinate') {
		html += '		<div class="rcsBtnContents">';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_4" data-count="rcsBtn_'+ targetId + index +'_4-count" data-text-len="40">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_4" name="rcsBtn_'+ targetId + index +'_4" value="" placeholder="위도를 입력하세요"/>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_4-count">0</span>/40자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_5" data-count="rcsBtn_'+ targetId + index +'_5-count" data-text-len="40">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_5" name="rcsBtn'+ index +'-button-coordinate-long" value="" placeholder="경도를 입력하세요"/>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_5-count">0</span>/40자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_6" data-count="rcsBtn_'+ targetId + index +'_6-count" data-text-len="100">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_6" name="rcsBtn_'+ targetId + index +'_6" value="" placeholder="위치이름을 입력하세요"/>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_6-count">0</span>/100자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_7" data-count="rcsBtn_'+ targetId + index +'_7-count" data-text-len="200">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_7" name="rcsBtn_'+ targetId + index +'_7" value="" placeholder="http://www.ums.co.kr 형식으로 입력하세요"/>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_7-count">0</span>/200자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'query') {
		html += '		<div class="rcsBtnContents">';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_8" data-count="rcsBtn_'+ targetId + index +'_8-count" data-text-len="100">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_8" name="rcsBtn_'+ targetId + index +'_8" value="" placeholder="위치이름을 입력하세요"/>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_8-count">0</span>/100자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20 rcsBtnContents">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="ele_area remaining height-auto lh-1-6" data-input="rcsBtn_'+ targetId + index +'_9" data-count="rcsBtn_'+ targetId + index +'_9-count" data-text-len="200">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_9" name="rcsBtn_'+ targetId + index +'_9" value="" placeholder="http://www.ums.co.kr 형식으로 입력하세요"/>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_9-count">0</span>/200자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'calendar') {
		html += '		<div class="rcsBtnContents">';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<input type="text" class="form-control date-time-picker width-49" id="rcsBtn_'+ targetId + index +'_10" name="rcsBtn_'+ targetId + index +'_10"/>';
		html += '					<input type="text" class="form-control date-time-picker width-49 mrg-left-10" id="rcsBtn_'+ targetId + index +'_11" name="rcsBtn_'+ targetId + index +'_11"/>';
		html += '				</div>';
		html += '				<div id="rcsBtn_'+ targetId + index +'_10-error" class="jqval-error" style="display: none; opacity: 1;">시작일은 종료일보다 작아야합니다.</div>';
		html += '				<div id="rcsBtn_'+ targetId + index +'_11-error" class="jqval-error" style="display: none; opacity: 1;">종료일은 시작일보다 커야합니다.</div>';
		html += '			</div>';
		html += '			<div class="ele_area pdd-top-10">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_12" data-count="rcsBtn_'+ targetId + index +'_12-count" data-text-len="100">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_12" name="rcsBtn_'+ targetId + index +'_12" value="" placeholder="제목을 입력하세요"/>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_12-count">0</span>/100자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="ele_area remaining height-auto lh-1-6" data-input="rcsBtn_'+ targetId + index +'_13" data-count="rcsBtn_'+ targetId + index +'_13-count" data-text-len="500">';
		html += '						<textarea rows="5" class="width-100" id="rcsBtn_'+ targetId + index +'_13" name="rcsBtn_'+ targetId + index +'_13" placeholder="내용을 입력하세요"></textarea>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_13-count">0</span>/500자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == 'msg') {
		html += '		<div class="rcsBtnContents">';
		html += '			<div class="ele_area pdd-top-10">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="remaining" data-input="rcsBtn_'+ targetId + index +'_14" data-count="rcsBtn_'+ targetId + index +'_14-count" data-text-len="40">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_14" name="rcsBtn_'+ targetId + index +'_14" value="" placeholder="전화번호를 입력하세요"/>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_14-count">0</span>/40자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="ele_area pdd-top-10 mrg-top-20">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<div class="ele_area remaining height-auto lh-1-6" data-input="rcsBtn_'+ targetId + index +'_15" data-count="rcsBtn_'+ targetId + index +'_15-count" data-text-len="100">';
		html += '						<textarea rows="5" class="width-100" id="rcsBtn_'+ targetId + index +'_15" name="rcsBtn_'+ targetId + index +'_15" placeholder="문자메시지 내용을 입력하세요"></textarea>';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_15-count">0</span>/100자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == ALIM_TALK_BUTTON_TYPE.WEB) {
		// 알림톡 버튼 노출 - WEB
		$( $(parentTarget).find('input')[0] ).prop('readonly', false)
		
		html += '		<div class="rcsBtnContents">';
		html += '			<div class="row ele_area">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<p class="mrg-right-10 width60 pdd-top-5">Mobile</p>';
		html += '					<div class="ele_area remaining" data-input="rcsBtn_'+ targetId + index +'_1" data-count="rcsBtn_'+ targetId + index +'_1-count" data-text-len="200">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_1" name="rcsBtn_'+ targetId + index +'_1" value="" placeholder="http:// 형식으로 입력하세요" />';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_1-count">0</span>/200자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="row ele_area">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<p class="mrg-right-10 width60 pdd-top-5">PC</p>'; 
		html += '					<div class="ele_area remaining" data-input="rcsBtn_'+ targetId + index +'_2" data-count="rcsBtn_'+ targetId + index +'_2-count" data-text-len="200">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_2" name="rcsBtn_'+ targetId + index +'_2" value="" placeholder="http:// 형식으로 입력하세요" />';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_2-count">0</span>/200자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == ALIM_TALK_BUTTON_TYPE.APP) {
		// 알림톡 버튼 노출 - APP
		$( $(parentTarget).find('input')[0] ).prop('readonly', false)
		html += '		<div class="rcsBtnContents">';
		html += '			<div class="row ele_area">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<p class="mrg-right-10 width60 pdd-top-5">Mobile</p>';
		html += '					<div class="ele_area remaining" data-input="rcsBtn_'+ targetId + index +'_3" data-count="rcsBtn_'+ targetId + index +'_3-count" data-text-len="200">';
		html += '						<input type="text" class="form-control optional_required'+ index +'" id="rcsBtn_'+ targetId + index +'_3" name="rcsBtn_'+ targetId + index +'_3" value="" placeholder="http:// 형식으로 입력하세요" />';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_3-count">0</span>/200자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="row ele_area">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<p class="mrg-right-10 width60 pdd-top-5">Android</p>'; 
		html += '					<div class="ele_area remaining" data-input="rcsBtn_'+ targetId + index +'_4" data-count="rcsBtn_'+ targetId + index +'_4-count" data-text-len="200">';
		html += '						<input type="text" class="form-control optional_required'+ index +'" id="rcsBtn_'+ targetId + index +'_4" name="rcsBtn_'+ targetId + index +'_4" value="" placeholder="스킴이름:// 형식으로 입력하세요" />';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_4-count">0</span>/200자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="row ele_area">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<p class="mrg-right-10 width60 pdd-top-5">IOS</p>'; 
		html += '					<div class="ele_area remaining" data-input="rcsBtn_'+ targetId + index +'_5" data-count="rcsBtn_'+ targetId + index +'_5-count" data-text-len="200">';
		html += '						<input type="text" class="form-control optional_required'+ index +'" id="rcsBtn_'+ targetId + index +'_5" name="rcsBtn_'+ targetId + index +'_5" value="" placeholder="스킴이름:// 형식으로 입력하세요" />';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_5-count">0</span>/200자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="row ele_area">';
		html += '				<div class="search_field inline-form mrg-btm-5">';
		html += '					<p class="mrg-right-10 width60 pdd-top-5">PC</p>'; 
		html += '					<div class="ele_area remaining" data-input="rcsBtn_'+ targetId + index +'_6" data-count="rcsBtn_'+ targetId + index +'_6-count" data-text-len="200">';
		html += '						<input type="text" class="form-control" id="rcsBtn_'+ targetId + index +'_6" name="rcsBtn_'+ targetId + index +'_6" value="" placeholder="http:// 형식으로 입력하세요" />';
		html += '						<p class="text-right color-gray"><span id="rcsBtn_'+ targetId + index +'_6-count">0</span>/200자</p>';
		html += '					</div>';
		html += '				</div>';
		html += '			</div>';
		html += '			<div class="row ele_area exp">';
		html += '				<div><b>* Mobile, Android, IOS 중 2가지 이상 입력 필수 </b></div>';
		html += '			</div>';
		html += '		</div>';
	} else if (item == ALIM_TALK_BUTTON_TYPE.DELIVERY) {
		// 알림톡 버튼 노출 - 배송조회
		$( $(parentTarget).find('input')[0] ).prop('readonly', false)
		
	} else if (item == ALIM_TALK_BUTTON_TYPE.BOT_KEYWORD) {
		// 알림톡 버튼 노출 - 봇전환
		$( $(parentTarget).find('input')[0] ).prop('readonly', false)
		
	} else if (item == ALIM_TALK_BUTTON_TYPE.MESSAGE) {
		// 알림톡 버튼 노출 - 메시지전달
		$( $(parentTarget).find('input')[0] ).prop('readonly', false)
		
	} else if (item == ALIM_TALK_BUTTON_TYPE.CHANEL) {
		// 알림톡 버튼 노출 - 채널추가
		var rcsBtnNm = $(parentTarget).find('input')[0];
		$(rcsBtnNm).val('채널 추가').keyup();
		$(rcsBtnNm).prop('readonly', true);
	}
	
	$(parentTarget).append(html);
	
	// 버튼 유효성 추가
	addRcsBtnValid(targetId, item, index);
	
	// 글자수 제한 이벤트 핸들러 추가
	libraryInit()

	if(item != ALIM_TALK_BUTTON_TYPE.CHANEL) {
		// 버튼명 내용 삭제
		parentTarget.find('input[id=rcsBtnNm_'+targetId + index +']').val('');	
	}
	parentTarget.find('span').text('0');
}

// RCS,알림톡 버튼 유효성 추가
function addRcsBtnValid(targetId, item, index) {
	if (item == 'copy') {
		addBtnRules(targetId, index, 1);
	} else if (item == 'url') {
		addBtnRules(targetId, index, 2, {
			reqUrl: true,
			maxlength: 200,
			messages: {
				reqUrl: "http://www. 형식으로 입력하세요.",
			}
		});
	} else if (item == 'tel') {
		addBtnRules(targetId, index, 3, {
			required: true,
			digitsLength: 40,
			messages: {
				required: "전화번호를 입력하세요.",
				digitsLength: "숫자로 {0}자 이내만 입력 가능합니다."
			}
		});
	} else if (item == 'coordinate') {
		addBtnRules(targetId, index, 4);
		addBtnRules(targetId, index, 5);
		addBtnRules(targetId, index, 6);
		addBtnRules(targetId, index, 7, {
			reqUrl: true,
			maxlength: 200,
			messages: {
				reqUrl: "http://www. 형식으로 입력하세요.",
			}
		});
	} else if (item == 'query') {
		addBtnRules(targetId, index, 8);
		addBtnRules(targetId, index, 9, {
			reqUrl: true,
			maxlength: 200,
			messages: {
				reqUrl: "http://www. 형식으로 입력하세요.",
			}
		});
	} else if (item == 'calendar') {
		addBtnRules(targetId, index, 10, {
			required: true,
			messages: {
				required: "시작일을 입력하세요."
			}
		});
		addBtnRules(targetId, index, 11, {
			required: true,
			messages: {
				required: "종료일을 입력하세요."
			}
		});
		addBtnRules(targetId, index, 12);
		addBtnRules(targetId, index, 13);
	} else if (item == 'msg') {
		addBtnRules(targetId, index, 14);
		addBtnRules(targetId, index, 15);
		
	} 
	/* 시작 - 알림톡 버튼 */
	else if (item == ALIM_TALK_BUTTON_TYPE.WEB) {
		// 알림톡-web
		addBtnRules(targetId, index, 1, {
			required: true,
			alimUrl: true,
			maxlength: 200,
			messages: {
				required:"Mobile 웹링크를 입력하세요.",
				alimUrl: "http:// 형식으로 입력하세요.",
			}
		});
		addBtnRules(targetId, index, 2, {
			alimUrl: true,
			maxlength: 200,
			messages: {
				alimUrl: "http:// 형식으로 입력하세요.",
			}
		});
	} else if (item == ALIM_TALK_BUTTON_TYPE.APP) {
		// 알림톡-app
		addBtnRules(targetId, index, 3, {
			required: function(){
				var _targetId = '#rcsBtn_' + targetId + index;
				return $(_targetId + '_4').val().length == 0 || $(_targetId + '_5').val().length == 0 ;
			},
			alimUrl: true,
			maxlength: 200,
			messages: {
				required: "Mobile, Android, IOS 중 2가지 이상 입력하세요.", //"Mobile 앱링크를 입력하세요.",
				alimUrl: "http:// 형식으로 입력하세요.",
			}
		});
		addBtnRules(targetId, index, 4, {
			required: function(){
				var _targetId = '#rcsBtn_' + targetId + index;
				return $(_targetId + '_3').val().length == 0 || $(_targetId + '_5').val().length == 0 ;
			},
			schemeUrl: true,
			maxlength: 200,
			messages: {
				required:"Mobile, Android, IOS 중 2가지 이상 입력하세요.", //"Android 앱링크를 입력하세요.",
				schemeUrl: "스킴이름:// 형식으로 입력하세요.",
			}
		});
		addBtnRules(targetId, index, 5, {
			required: function(){
				var _targetId = '#rcsBtn_' + targetId + index;
				return $(_targetId + '_3').val().length == 0 || $(_targetId + '_4').val().length == 0 ;
			},
			schemeUrl: true,
			maxlength: 200,
			messages: {
				required: "Mobile, Android, IOS 중 2가지 이상 입력하세요.", //"IOS 앱링크를 입력하세요.",
				schemeUrl: "스킴이름:// 형식으로 입력하세요.",
			}
		});
		addBtnRules(targetId, index, 6, {
			alimUrl: true,
			maxlength: 200,
			messages: {
				alimUrl: "http:// 형식으로 입력하세요.",
			}
		});
	} 
	/*else if (item == ALIM_TALK_BUTTON_TYPE.DELIVERY) {
		// 알림톡- 배송조회
	} else if (item == ALIM_TALK_BUTTON_TYPE.BOT_KEYWORD) {
		// 알림톡- 봇키워드
	} else if (item == ALIM_TALK_BUTTON_TYPE.MESSAGE) {
		// 알림톡- 메시지 전달
	} else if (item == ALIM_TALK_BUTTON_TYPE.TALK_CHANGE) {
		// 알림톡- 상담톡 전환
	} else if (item == ALIM_TALK_BUTTON_TYPE.BOT_CHANGE) {
		// 알림톡- 봇전환
	} else if (item == ALIM_TALK_BUTTON_TYPE.CHANEL) {
		// 알림톡- 메시지 채널추가
	}*/
	
	/* 끝 - 알림톡 버튼 */
}

// RCS validate 유효성 규칙 추가
function addBtnRules(targetId, index, index2, options) {
	var target = '#rcsBtn_'+ targetId + index + '_' + index2; 
	if(options) {
		$(target).rules("add", options);
	} else {
		$(target).rules("add", {
			required: true,
			maxlength: $(target).parent().data('text-len'),
			messages: {
				required: $(target).attr("placeholder")
			}
		});
	}
}

// 글자수 길이 셋팅
function setStringLen(e, isByte) {
	var totalLen = $(e).data('text-len');
	var countId = $(e).data('count');
	var inputId = $(e).data('input');
	var $count = $('#' + countId);
	var $input = $("#" + inputId);

	var update = function(){
		var msgStr = removeReplaceValue($input.val());
		if(isByte) {
			$count.text(str.getByteLength(msgStr));
		} else {
			$count.text(msgStr.length);
		}
	};

	$input.bind('input keyup paste', function(){
		setTimeout(update, 0);
	});
	update();
}

/* 치환변수 제외 후 글자수 세기 */
function removeReplaceValue(text){
	if(text == null ) return;
	// 22.07.27 커스텀 치환변수 제거 추가(07.07 SB고도화 변경건)
	text = text.replace(/\${.*?}/g,"");
   	/* ie 반영 치환 변수 적용 */
	/* 발송 ${ 변수명 } */
//  text = text.replace(/\${고객명}/g,"");
//	text = text.replace(/\${변수1}/g,"");
//	text = text.replace(/\${변수2}/g,"");
//	text = text.replace(/\${변수3}/g,"");
//	text = text.replace(/\${변수4}/g,"");
//	text = text.replace(/\${변수5}/g,"");
//	text = text.replace(/\${변수6}/g,"");
//	text = text.replace(/\${변수7}/g,"");
//	text = text.replace(/\${변수8}/g,"");
//	text = text.replace(/\${변수9}/g,"");
//	text = text.replace(/\${변수10}/g,"");
	
	/* 알림톡  #{변수명 } */
	text = text.replace(/\#{.*?}/g,"");
  	
  	/* rcs 모든 {{변수명}} 변수명 제외  */
  	var _text = text;
  	text = _text.split('{{').map( function (item, i) {
  		if(item != null && item.indexOf('}}') > -1) {
  			return item.substr(item.indexOf('}}') + 2);
  		}
  		return item;
  	});
  	if(typeof text == 'object') {
  		text = text.join().replace(",", "");	
  	}  	
  	
  	return text;
  }

// AlimTalk - 버튼 셀렉트박스 생성 
function makeAlimBtnSelect(targetId, index) {
	var html = '';
	html += '<div class="row clearfix button-display mrg-btm-10 rcsBtnEl" id="rcsBtnEl_' + targetId + index +'" >';
	html += '	<div class="preview-form-left">';
	html += '		<h3 class="pdd-top-4 pdd-left-25 font-weight-light font-size-12">버튼'+ index +'</h3>';
	html += '	</div>';
	html += '	<div class="preview-form-right">';
	html += makeAlimBtnCmmn(targetId, index);
	html += '	</div>';
	html += '</div>';
	
	if(index == 1) {
		$('#' + targetId).after(html);
	} else {
		$('#' + targetId).parent().find(".rcsBtnEl:last").after(html);
	}
	
	// 글자수 이벤트 핸들러 추가
	setStringLen($('#rcsBtnEl_'+ targetId + index).find(".remaining"), false);
}

// AlimTalk - 버튼 생성 공통 html
function makeAlimBtnCmmn(targetId, index) {
	var html = '';
	html += '		<div class="ele_area">';
	html += '			<div class="search_field inline-form mrg-btm-5">';
	html += '				<p class="mrg-right-10 width150">';
	html += '					<select class="width-100" id="rcsBtnType_'+ targetId + index + '" name="rcsBtnType_'+ targetId + index + '" onchange="divButtonDisplayAction(this, \''+ targetId +'\');">';
	html += '						<option value="">버튼 타입</option>';
	html += '						<option value="' + ALIM_TALK_BUTTON_TYPE.WEB + '">웹링크</option>';
	html += '						<option value="' + ALIM_TALK_BUTTON_TYPE.APP +'">앱링크</option>';
	// 22.09.16 UMS 웹링크, 앱링크만 하는걸로 사전 협의됨 확인되어 주석처리
	//html += '						<option value="' + ALIM_TALK_BUTTON_TYPE.DELIVERY +'">배송조회</option>';
	//html += '						<option value="' + ALIM_TALK_BUTTON_TYPE.BOT_KEYWORD +'">봇키워드</option>';
	//html += '						<option value="' + ALIM_TALK_BUTTON_TYPE.MESSAGE +'">메시지 전송</option>';
	//html += '						<option value="' + ALIM_TALK_BUTTON_TYPE.CHANEL +'">채널추가</option>';
	html += '					</select>';
	html += '				</p>';
	html += '				<div class="ele_area remaining" data-input="rcsBtnNm_'+ targetId + index +'" data-count="rcsBtnNm_'+ targetId + index +'_count" data-text-len="14">';
	html += '					<input type="text" class="form-control previewRcsBtnNm" id="rcsBtnNm_'+ targetId + index +'" name="rcsBtnNm_'+ targetId + index +'" value="" placeholder="버튼명을 입력하세요" />';
	html += '					<p class="text-right color-gray">';
	html += '						<span id="rcsBtnNm_'+ targetId + index +'_count">0</span>/14 자';
	html += '					</p>';
	html += '				</div>';
	html += '			</div>';
	html += '		</div>';
	return html;
}

// IE 호환 메소드 추가
String.prototype.startsWith = function(str) {
	if (this.length < str.length) { return false; }
	return this.indexOf(str) == 0;
}
String.prototype.endsWith = function(str) {
	if (this.length < str.length) { return false; }
	return this.lastIndexOf(str) + str.length == this.length;
}
