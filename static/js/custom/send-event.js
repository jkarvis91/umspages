/* -------------------------------------------------------------
 * send-event.js – “경조사보내기” 전용 스크립트 (GitHub Pages)
 * ----------------------------------------------------------- */
(function ($, window, document) {
  'use strict';

  /* ========= 공통 Alert / Confirm util ========= */
  const showAlert = window.showAlert || function (msg) {
    $('#alert-message').html(msg);
    $('#alert-dialog-close').one('click', () => $('#alert-modal').dialog('close'));
    $('#alert-modal').dialog({ modal:true, width:400 });
    $('.ui-dialog-titlebar').hide();
  };

  const showConfirmSend = function (msg, ok, payload) {
    $('#confirm-message').html(msg);
    $('.confirm-dialog-close').one('click', () => $('#confirm-dialog').dialog('close'));
    $('#confirm-yes-btn').one('click', () => { ok(payload); $('#confirm-dialog').dialog('close'); });
    $('#confirm-dialog').dialog({ modal:true, width:400 });
    $('.ui-dialog-titlebar').hide();
  };

  /* ========= “첫 메시지 안내” 제거 ========= */
  $('.main-msg').on('click', function () {
    $(this).remove();
    $('#message').trigger('click');
  });

  /* ========= 메시지 입력 영역 ========= */
  let isFirstMsg = true;

  $('#message')
    .on('click',   () => $('#message').focus())
    .on('focus',   function () {
      if (isFirstMsg) {
        $(this).val('');
        $('.main-msg').remove();
        $(this).attr('placeholder', $(this).data('ph'));
        isFirstMsg = false;
      }
    })
    .on('keyup',   () => messageByteCheck());

  /* ========= 특수문자 / 미리보기 ========= */
  $('#specharPreview').on('click', () => { window.showSpechar && showSpechar(); });
  $('#popupPreview'  ).on('click', () => { window.showPreview && showPreview('', $('#message').val()); });

  /* ========= 발신번호 숫자만 입력 ========= */
  $('#sender').on('keyup', function () {
    $(this).val($(this).val().replace(/[^0-9-]/g, ''));
  });

  /* ========= 예약전송 (경조사는 사용 불가) ========= */
  $('#btn_reserve_send').on('click', () => showAlert('경조사 보내기는 즉시전송만 가능합니다.'));

  /* ========= 메시지 전송 ========= */
  $('#btn_send').on('click', function () {
    if (validateMsgSendInfo() === false) return;
    showConfirmSend('메시지를 전송하시겠습니까?', msgSend, msgSendInfo);
  });

  /* ========= 메시지 저장 / 새로쓰기 ========= */
  $('#btnMessageSave' ).on('click', () => ( $('#message').val().trim() ? showSaveMsg($('#message').val()) : showAlert('저장할 메세지가 없습니다.')));
  $('#btnMessageClear').on('click', () => showConfirmCancel('메시지를 새로 작성하시겠습니까?', messageClear, '메시지를 삭제하였습니다.'));

  /* ========= 수신번호 삭제 ========= */
  $('#btn-remove').on('click', function () {
    const $checked = $('#sms-receiver input[name=addrchk]:checked');
    if (!$checked.length) return showAlert('선택된 연락처가 없습니다.');
    $checked.closest('tr').remove();
    addReceiverCount();
  });

  $('#btn-removeAll').on('click', function () {
    if (!$('#sms-receiver input[name=addrchk]').length) return showAlert('등록된 연락처가 없습니다.');
    $('#sms-send-list').empty();
    addReceiverCount();
  });

  /* ========= 수신번호 (체크박스) 전역 이벤트 ========= */
  $(document)
    .on('click', '#sms-receiver #select-all', function () {
      const checked = $(this).prop('checked');
      $('#sms-receiver .dt-check-box').prop('checked', checked);
    })
    .on('click', '#sms-receiver .dt-check-box-label', function () {
      const $chk = $(this).siblings('input');
      $chk.prop('checked', !$chk.prop('checked'));
      $('#sms-receiver #select-all').prop(
        $('#sms-receiver .dt-check-box').length === $('#sms-receiver .dt-check-box:checked').length
      );
    });

  /* ========= 지역 / 영업점 검색 ========= */
  $('#btn_search_area').on('click', () => showSearchByType('area', $('select[name=sms_bo_area]').val()));
  $('#btn_search_shop').on('click', () => showSearchByType('code', $('#send-code').val().trim()));

  function showSearchByType (type, keyword) {
    if (!keyword || keyword === 'default') {
      showAlert(type === 'area' ? '지역을 선택해 주세요.' : '영업점 코드를 입력해 주세요.'); return;
    }
    window.showSearch && showSearch(type, keyword);
  }

  /* ========= 메시지 byte 계산 ========= */
  let _byte   = 0;
  let alertMms = 'SMS';

  function messageByteCheck () {
    _byte = window.checkByteTextarea ? checkByteTextarea($('#message')) : $('#message').val().length;
    alertMms = _byte > 88 ? 'SMS' : 'SMS';                       // (경조사: 88byte 제한)

    $('.byte').html(`${_byte} byte <span>${alertMms}</span>`);

    if (_byte > 88) {
      showAlert('메시지 내용은 88바이트 이상은 전송하실 수 없습니다.');
      const txt = $('#message').val().slice(0, 88);
      $('#message').val(txt);
      messageByteCheck();                                        // 재귀로 정상화
    }
  }
  window.messageByteCheck = messageByteCheck;
  /* ========= 수신번호 카운터 ========= */
  function addReceiverCount () {
    $('#sms-receiver .title span').text($('#sms-send-list tr').length);
  }

  /* ========= (필요 시) 초기화 함수 ========= */
  function messageClear () {
    $('#message').val(''); messageByteCheck();
  }

  /* ------------------------------------------------------------------
   * 이하 validateMsgSendInfo / msgSend / saveMsg 등은
   * 백엔드 API → Ajax 동작 부분이므로 기존 로직을 그대로 유지
   * ------------------------------------------------------------------ */
  function validateMsgSendInfo(){
    
	
    if($('#message').val() != ''){
        if(typeof( $('#message').val() ) != "undefined" ){
        }
    }
    else{
        showAlert('메세지를 입력해 주시기 바랍니다.');
        return false;
    }
	
    if($('#sender').val() != ''){
        if(typeof( $('#sender').val() ) != "undefined" ){
//         	alert("undefined");
// 			addTargetKeyDown();   
        }
    }
    else{
        showAlert('발신번호를 입력해 주시기 바랍니다.');
        return false;
    }
	
    if(typeof( $("input[name=sms_person]:checked").val() ) == "undefined" ){
        showAlert('수신인 종류를 선택해 주시기 바랍니다.');
        return false;
    }    
    
    var sender = $("#sender").val();      
	
    if (_byte > 88) {
    	showAlert("메시지 내용은 88바이트 이상은 전송하실수 없습니다.");
        return false;
    }
  	  
    var addrs = $("#sms-receiver input[name=addrchk]:checked");
    var allSendYn = $("input.send-all").is(":checked");
    
    var sendType = "";
    
    $("input[name=sms_person]").each(function() {
      if($(this).is(":checked")) {
        sendType = $(this).val();
      }
    });
    
    $("#event-send-type").val(sendType);
    
    if (addrs.length > 0 || allSendYn) {
        var receivers = null;
        addrs.each(function(index) {
          var _parent = $(this).parent().parent().parent();
          var _addr = _parent.find('label').text() + ":" + _parent.find('.phone').text();
          if (index == 0) receivers = (_addr + "|");
          else receivers += _addr + "|";
        });
    } else {
      showAlert("받는 사람을 추가 하거나 주소록에서 선택하십시오.");
      return false; 
    }
    $("input#sendCount").val(addrs.length);
    $("input#receivers").val(receivers);
    
//     if($("input#sms-event-r2").is(":checked")) {
//       if($("select[name=EMPL_CLASS]").val() == 'default') {
//     	showAlert("직급을 선택해 주세요.");
//         return false;
//       }
//       if($("select[name=EMPL_POSITION_NAME]").val() == 'default') {
//         showAlert("직위를 선택해 주세요.");
//     	return false;
//       }
//     }
    
    
    
    
    // msgSendInfo 초기화
    msgSendInfo = getMsgSendInfo();
    
    msgSendInfo.sendType = $(".byte").find("span").text();
    msgSendInfo.sendCount = addrs.length;
    msgSendInfo.receivers = receivers;
    msgSendInfo.sender = $("#sender").val();
    msgSendInfo.title =  typeof( $('#messageTitle').val() ) != "undefined" ? $('#messageTitle').val() : null;
    msgSendInfo.message = $("#message").val();
    msgSendInfo.reserveDate = $("#reserveDate").val();
//     msgSendInfo.emplClass = $("select[name=EMPL_CLASS]").val();
//     msgSendInfo.emplPositionName = $("select[name=EMPL_POSITION_NAME]").val();
    msgSendInfo.emplClass = "ALL";
    msgSendInfo.emplPositionName = "ALL";
}


//// 메세지 발송 정보
function getMsgSendInfo(){
	return {
		"uniqueKey" : null
		,"sender" : null
		,"sendType" : null
		,"title" : null
		,"mmsTitle" : null
		,"message" : null
		,"msgByte" : null
		,"sendCount" : null
		,"reserveDate" : null
		,"receivers" : null
		,"msgType" : null
		,"isAd" : null
		,"userAd" : null
		,"cusType" : null
		,"emplClass" : null
		,"emplPositionName" : null
	};	
}

//// 메세지 발송
	function msgSend(msgSendInfo){

	    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		msg = 	    		"msgSendInfo.uniqueKey =" + msgSendInfo.uniqueKey + "\n" +
								"msgSendInfo.sender =" + msgSendInfo.sender + "\n" +
								"msgSendInfo.sendType =" + msgSendInfo.sendType + "\n" +
								"msgSendInfo.title =" + msgSendInfo.title + "\n" +
								"msgSendInfo.mmsTitle =" + msgSendInfo.mmsTitle + "\n" +
								"msgSendInfo.message =" + msgSendInfo.message + "\n" +
								"msgSendInfo.msgByte =" + msgSendInfo.msgByte + "\n" +
								"msgSendInfo.sendCount =" + msgSendInfo.sendCount + "\n" +
								"msgSendInfo.reserveDate =" + msgSendInfo.reserveDate + "\n" +
								"msgSendInfo.receivers =" + msgSendInfo.receivers + "\n" +
								"msgSendInfo.msgType =" + msgSendInfo.msgType + "\n" +
								"msgSendInfo.isAd =" + msgSendInfo.isAd + "\n" +
								"msgSendInfo.userAd =" + msgSendInfo.userAd + "\n" +
								"msgSendInfo.cusType =" + msgSendInfo.cusType + "\n"+
								"msgSendInfo.emplClass =" + msgSendInfo.emplClass + "\n"+
								"msgSendInfo.emplPositionName =" + msgSendInfo.emplPositionName + "\n";
	    console.log(msgSendInfo);
	    
	    var type = $("input[name=sms_person]:checked").val();
	    
		$.ajax({
			  url: '${pageContext.request.contextPath}/eventsend/send/'+type,
			  type: "POST",
			  contentType: "application/json; charset=utf-8",
			  dataType: "json",
			  data : JSON.stringify(msgSendInfo),
			  success: function (data) {
				console.log(data);
				if(data == true)
				{
		 			showAlert("발송이 완료되었습니다.");
		 			//발송 데이터 초기화
		 			initSendInfo();
				}
			  }
		});
	};

//// 초기화
function initSendInfo(){
	messageClear(); // 메시지 초기화
	$("#sender").val(""); // 발신번호 초기화
	
	$("#sms-receiver #sms-send-list").children().remove(); // 수신번호 초기화
	addReceiverCount();//수신번호 총 갯수 초기화
}
  
  
  
//// 메시지 새로쓰기
	$("#btnMessageClear").click(function() {
		showConfirmCancel("메시지를 새로 작성하시겠습니까?", messageClear, "메시지를 삭제하였습니다.");
		return false;//현재 사용자가 보고있는 위치 유지
	});
	
// });
//_READY END


//// 메세지저장 이벤트 처리 함수
function saveMsg(saveMsg_code, saveMsg_msg, saveMsg_title){
	saveMsgInfo = {
							"code" : saveMsg_code,
							"msg" : saveMsg_msg,
							"title" : saveMsg_title
						};

	$.ajax({
	    url: '${pageContext.request.contextPath}/form/'+saveMsg_code+'/save',
	    type: "POST",
	    contentType: "application/json; charset=utf-8",
	    dataType: "json",
	    data: JSON.stringify(saveMsgInfo),
	    success: function (result) {
// 			alert("저장 성공!");
			showAlert("메시지를 저장하였습니다.");
	    }
    });
}

var checkIdx = 1;
//// 수신번호  추가
function addTarget(inputName, inputPhone) {
  var receiverNum = $("#receiverNum").val();
  var receiverName = "이름없음";
  
  if(inputName != null){receiverName = inputName;}
  if(inputPhone != null){receiverNum = inputPhone;}
  
  setTimeout(function() { 
    var phoneNumArr = new Array();
    $("#sms-send-list tr").each(function(index) {
      phoneNumArr[index] = $(this).find(".phone").text().trim();
    });
    
    var _val = receiverNum.replace(/\-/ig,"");
    
    for(var i = 0; i < phoneNumArr.length; i++) {
      if(phoneNumArr[i] == _val) {
        showAlert("중복되는 핸드폰번호가 있습니다.<br>확인해 주세요.");
        $(this).focus();
        return false;
      }
    } // end for
    
    var _val = receiverNum.replace(/\-/ig,"");
    $("#sms-send-list").append("<tr><td><div class='checkbox_default'><input type='checkbox' class='dt-check-box' name='addrchk' value='' checked='checked'/><label class='dt-check-box-label' for='addrchk'>"+receiverName+"</label></div></td><td class='phone'>"+_val+"</td></tr>");
    
    addReceiverCount();
    $("#sms-receiver #receiverNum").val("");
  }, 50);	
}

//----------------------------- 수신번호 체크박스 이벤트 설정  ----------------------------------------------------------------
//// 전체 체크박스 클릭 이벤트 리스너
//// datatables 의 모든 셀렉트 박스가 선택 된다.
$('#sms-receiver #select-all').on('click', function () {
	var selectAllChecked = $('#sms-receiver #select-all').prop('checked');
	$("#sms-receiver .dt-check-box").each(function(){
		$(this).prop('checked', selectAllChecked);
	});
});

//// 삭제 버튼 클릭시 선택된 항목을 삭제 하는 이벤트 리스너
//// datatables 가 생성되고 난 후에 이벤트 리스너를 등록 해야 하기 때문에
//// $(document).on 을 사용
$(document).on('click', "#delete-btn", function () {
  var deleteTarget = [];
  ($(".dt-check-box").each(function () {
    if ($(this).prop('checked')) {
      deleteTarget.push($(this).val());
    }
  }));
  if (deleteTarget.length < 1) {
    showAlert("선택된 공지사항이 없습니다.")
  } else {
    var confirmMessage = "총 " + deleteTarget.length + "건 삭제 하시겠습니까?";
    showConfirmForAjax(confirmMessage, deleteNotice, deleteTarget);
  }
});


// 체크 박스 선택시 전체 선택 체크 박스의 체크 여부를 판단하는 이벤트 리스너
// datatables 가 생성되고 난 후에 이벤트 리스너를 등록 해야 하기 때문에
// $(document).on 을 사용
$(document).on('click', '#sms-receiver .dt-check-box-label', function () {
  // If checkbox is not checked
  var $_checkbox = $(this).siblings('input');
  if ($_checkbox.prop('checked')) {
    $_checkbox.prop('checked', false);
    $('#sms-receiver #select-all').prop("checked", false);
  } else {
    $_checkbox.prop('checked', true);
    var checkedCount = $("#sms-receiver .dt-check-box:checked").length;
    if (checkedCount == $("#sms-receiver .dt-check-box").length) {
      $('#sms-receiver #select-all').prop("checked", true);
    }
  }
});

//----------------------------- 수신번호 체크박스 이벤트 설정  End----------------------------------------------------------------

//############################### 수신인 검색/직급직위 선택 @3#####################################################
$(function() {
  	$("select[name=sms_bo_area]").change(function() {
	    $("input#send-code").val("");     
	    $(".send-area").attr("checked", true);
	    emplClass.removeAttr("disabled");         
	    emplPosition.removeAttr("disabled");
	});
  
////영업점 직원 input focus때 직급,직위 select box 비활성화 -------------------------------------------
	var emplClass = $("select[name=EMPL_CLASS]").val("default");
	var emplPosition = $("select[name=EMPL_POSITION_NAME]").val("default");
	var boArea = $("select[name=sms_bo_area]");
	
	$("#send-code").focus(function() {
	  $(".send-code").attr("checked", true);
	  boArea.val("default");
	  emplClass.val("default").attr("disabled", true);        
	  emplPosition.val("default").attr("disabled", true);      
	});
	
	$("input[name=sms_person]").click(function() {
	  emplClass.removeAttr("disabled");         
	  emplPosition.removeAttr("disabled");    
	});
	
	$(".send-code").click(function() {
	  boArea.val("default");  
	  emplClass.val("default").attr("disabled", true);        
	  emplPosition.val("default").attr("disabled", true);      
	});
////_영업점 직원 input focus때 직급,직위 select box 비활성화 -------------------------------------------

//// 직급 선택시
	$("select[name=EMPL_CLASS]").change(function() {
	  $("input#EMPL_CLASS").val($(this).val());	   
	});

//// 직위 선택시
	$("select[name=EMPL_POSITION_NAME]").change(function() {
	  $("input#EMPL_POSITION_NAME").val($(this).val());     
	});

//// 전직원에게 발송 선택시
	$(".send-all").click(function() {
	  if($(this).is(":checked")) {
	    boArea.val("default");
	    $("input#send-code").val("");
	    emplClass.val("default").attr("disabled", true);      
	    emplPosition.attr("disabled", true);      
	  } 
	});

//// 지역소속직원에게 발송 선택시
	$(".send-area").click(function() {
	  $("input#send-code").val("");     
	});

//// 지역소속 직원에게 발송 검색 이벤트
	$("#btn_search_area").click(function() {
	  var type = "area";
	  var smsBoArea = $("select[name=sms_bo_area]").val();
	  if(smsBoArea == 'default') {
	    showAlert("지역을 선택해 주세요.", function() { });
	    return false;
	  }
	  showSearch(type, smsBoArea);
	});


//// 영업점직원에게 발송 검색 이벤트
	$("#btn_search_shop").click(function() {
	  var type = "code";
	  var smsBoCode = $("input[name=sms_bo_code]").val().trim();    
	  if(smsBoCode == '') {
	    showAlert("영업점 코드를 입력해 주세요.", function() { });
	    return false;
	  }
	  showSearch(type, smsBoCode);
	});
});
//################################## 유틸 @0#########################################
$("#zoom-in-btn").on('click', function () {
  UmsZoom.zoomIn();
});

$("#zoom-out-btn").on('click', function () {
UmsZoom.zoomOut();
});


////전화번호 형식 입력 @jys
function inputPhoneType(obj){
  var inputVal = obj.val();
  obj.val(inputVal.replace(/[^0-9-]/gi,''));
};

})(jQuery, window, document);


/* 1) 더미 데이터 ─ send-event.js보다 먼저 로드 */
const SEARCH_DB = {
  area: [
    { boCode: "750", partName: "강동영업본부" },
    { boCode: "751", partName: "충청영업본부" },
    /* …추가… */
  ],
  code: [
    { emplName: "김도연", emplHpNo: "010-1234-5678" },
    { emplName: "박정훈", emplHpNo: "010-9876-5432" },
    /* …추가… */
  ]
};

/* 2) 함수 본문만 교체, 이름은 그대로 */
function initData(type, boCode) {

  /* GitHub Pages에서는 서버가 없으므로 배열 검색으로 대체 */
  const result = (SEARCH_DB[type] || []).filter(obj =>
      type === "area" ? obj.boCode === boCode
                      : obj.emplName.includes(boCode));

  /* ↓↓↓ 이하 원래 DOM 빌드·전체체크 코드는 그대로 ↓↓↓ */
  var html = "", $wrap = $("#sms-search-rej").empty();
  if (!result.length) { $wrap.text("검색 결과가 없습니다."); return; }
  html += '<div class="title_tree checkbox_default fn">'
       + '  <input type="checkbox" name="chk-all" />'
       + '  <label>검색결과</label></div><ul id="serach-event-list"></ul>';
  $wrap.html(html);

  result.forEach((d,i)=> {
    if (type==="code") $("#serach-event-list").append(
      `<li><div class='checkbox_default fn'>
          <input type='checkbox' id='cb${i}' name='chk'>
          <label for='cb${i}' id='name'>${d.emplName}</label>
          <span class='mgl11' id='phone'>${d.emplHpNo}</span></div></li>`
    );
    else $("#serach-event-list").append(
      `<li><div class='checkbox_default fn'>
          <input type='checkbox' id='cb${i}' name='chk'>
          <label for='cb${i}' id='name'>${d.boCode}</label>
          <span class='mgl11' id='phone'>${d.partName}</span></div></li>`
    );
  });

  $("#sms-search-rej input[name=chk-all]")
     .off('click').on('click', function () {
        $("input[name=chk]").prop('checked', this.checked);
  });
/* 특수문자 클릭 → textarea 삽입 (팝업이 언제 만들어져도 작동) */
 $(document).on('click', '#spechar-modal .char', function () {
   const $msg = $('#message');
   $msg.val( $msg.val() + $(this).text() );
   /* 바이트 수 즉시 갱신 */
   if (window.messageByteCheck) messageByteCheck();
 });

}

