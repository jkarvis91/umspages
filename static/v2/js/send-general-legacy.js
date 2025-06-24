const BASE = '';                 //✱ 서버 root 불필요

/*============================================================
  2) 글로벌 상태 변수
============================================================*/
let isSmsMainMsg = false;
let isFirstMsg   = true;
let _byte        = 0;            // 메시지 byte 길이
let alertMms     = 'SMS';
const emplId     = 'STATIC';     // 데모용 고정

/*============================================================
  3) DOM Ready  –  기본 이벤트 바인딩
============================================================*/
$(function(){
  /* ── Tooltip 위치 */
  $('.tooltiptext').position({ my:'left+5 top', at:'right top', of:'.tooltipImg' });
  $('.tooltipImg').hover(
    ()=>$('.tooltiptext').css('visibility','visible'),
    ()=>$('.tooltiptext').css('visibility','hidden')
  );

  /* ── 발송종류 안내 */
  $('#cusType_1').on('click',()=>showAlert('마케팅 목적의 문자는 발송불가하며\n 고객관리(생일축하, 감성메시지 등)은 CRM시스템을 이용해주시기 바랍니다.'));
  $('#cusType_0').on('click',()=>$('html,body').animate({scrollTop:$('.tbl_view01').offset().top},400));

  /* ── 메인 안내 클릭 */
  $('.main-msg').on('click',function(){
    const c=$('input[name=cusType]:checked').val();
    if(c==='0'){ $(this).remove(); $('#message').trigger('click'); }
    else if(c==='1'){ showAlert('마케팅 목적의 문자는 발송불가하며\n 고객관리(생일축하, 감성메시지 등)은 CRM시스템을 이용해주시기 바랍니다.'); }
    else { showAlert('발송종류를 선택해주십시요.'); }
  });

  /* ── 주소록 관리 이동  (서버 URL → 정적 페이지) */
  $('#moveAddr').on('click',()=>location.href='{{ "/pages/all-address.html" | relative_url }}');

  /* ── 세션 keep 콜 제거 (정적 사이트는 필요 없음) */
});

/*============================================================
  4) 메시지 입력 영역 이벤트
============================================================*/
$(function(){
  $('#message')
    .on('click',function(){
      const c=$('input[name=cusType]:checked').val();
      if(!c) return showAlert('발송종류를 선택해주십시요.'),isSmsMainMsg=false;
      if(c==='1') return showAlert('마케팅 목적의 문자는 발송불가하며\n 고객관리(생일축하, 감성메시지 등)은 CRM시스템을 이용해주시기 바랍니다.'),isSmsMainMsg=false;
      $('.main-msg').remove(); isSmsMainMsg=true; this.focus();
    })
    .on('focus',function(){ if(isSmsMainMsg&&isFirstMsg){ $(this).val(''); isFirstMsg=false; } else if(!isSmsMainMsg){ $('#cusType_0').focus(); }})
    .on('keyup',messageByteCheck);

  $('#messageTitle')
    .on('focus',function(){ if(!isSmsMainMsg) $('#cusType_0').focus(); })
    .on('keyup',function(){ const max=40,i=UmsByteCheck.getBytesAndMaxLength($(this).val(),max); if(i.totalByte>max){ showAlert(`제목은 ${max}byte 까지 입력 가능 합니다.`); $(this).val($(this).val().substring(0,i.ableLength)); } });

  $('#sender').on('keyup',()=>inputPhoneType($('#sender')));
  $('#receiverNum')
    .on('keyup',function(){ if(!$('input[name=cusType]:checked').val()) return showAlert('발송종류를 선택해주십시요.'),$(this).val(''); inputPhoneType($(this)); })
    .on('keypress',e=>{ if(e.which===13){ e.preventDefault(); $('#btn-add').click(); }});
});

/*============================================================
  5) 버튼 영역 이벤트
============================================================*/
$(function(){
  $('#popupPreview').on('click',()=>{ if(!$('input[name=cusType]:checked').val()) return showAlert('발송종류를 선택해주십시요.'); showPreview($('#messageTitle').val(),$('#message').val()); return false; });
  $('#specharPreview').on('click',()=>{ if(!$('input[name=cusType]:checked').val()) return showAlert('발송종류를 선택해주십시요.'); showSpechar(); return false; });
  $('#btn_reserve_send').on('click',()=>{ if(!$('input[name=cusType]:checked').val()) return showAlert('발송종류를 선택해주십시요.'); if(validateMsgSendInfo()!==false) showReserve(msgSendInfo); });
  $('#btn_send').on('click',()=>{ if(validateMsgSendInfo()!==false) showConfirmSend(`${msgSendInfo.sendCount} 건의 메시지를 전송하시겠습니까?`,msgSend,msgSendInfo); });
});

/*============================================================
  6) Ajax 래퍼 – 더미 데이터 반환 (네트워크 차단)
============================================================*/
function mockData(path){
  // 필요한 경우 이곳에 경로별 mock JSON 을 집어넣는다
  const dummy = {
    '/addressCall/personal': {addrType:'personal', personalGroupList:[], shareGroupList:[]},
    '/form/happy': {startPage:1,endPage:1,currentPage:1,data:[]}
  };
  return dummy[path] || {};
}

function ajaxGET(path,qs,cb){         //✱ 실제 호출 없음
  console.log('[DEMO] GET',path,qs);
  setTimeout(()=>cb(mockData(path)),200);
}
function ajaxPOST(path,payload,cb){   //✱ 실제 호출 없음
  console.log('[DEMO] POST',path,payload);
  setTimeout(()=>cb(mockData(path)),200);
}

/*============================================================
  7) DEMO용 API 래핑 (원본 함수명 유지)
============================================================*/
function reloadAddressViewData(){ ajaxGET(`/addressCall/`+addrGroupCode,null,handleAddressGroups); }
function reloadPreViewData()    { ajaxPOST(`/form/`+code,msgFormInfo,handlePreviewResult); }

/*------------------------------------------------------------
  ✱ 실제 발송 대신 화면만 초기화 – 원본 멘트는 그대로
------------------------------------------------------------*/
function msgSend(info){
  /* --- 원본 Alert·멘트 유지 --------------------------- */
  var completeMsg = "요청 되었습니다.";
  if(info.reserveDate) completeMsg = "예약 되었습니다.";

  /* 화면에 찍힌 ‘총 n건’ 그대로 가져오기 */
  var targetCnt = $("#sms-receiver .title span").text();

  /* 전송 결과(에러·중복) → 데모에선 전부 0 건으로 가정 */
  var dupCount = 0, cutCount = 0, exceedCount = 0,
      unitDiscordCount = 0, etcCount = 0;

  var msg = "";
  msg += "전체 "+targetCnt+"건중<br>";
  if ((targetCnt - dupCount) > 0){ msg += "중복 " + (targetCnt - dupCount) + "건<br>"; }
  if (cutCount > 0){ msg += "수신거부 " + cutCount + "건<br>"; }
  if (exceedCount > 0){ msg += "허용 건수 초과 " + exceedCount + "건<br>"; }
  if (unitDiscordCount > 0){ msg += "미등록 오류 " + unitDiscordCount + "건<br>"; }
  if (etcCount > 0){ msg += "기타 오류 " + etcCount + "건<br>"; }
  if(msg.indexOf("건<br>")>-1) msg += "제외 하고<br/>";
  msg += info.sendCount + "건이 전송" + completeMsg;

  /* 실제 Swal 호출 */
  showAlert(msg);
  console.log('[DEMO] send payload',info);
  initSendInfo();
}
/*============================================================
  8) 원본 함수 영역 – BASE 치환 외 로직 그대로
============================================================*/
/** validateMsgSendInfo() – 사용자 입력 검증 후 msgSendInfo 구성 */
function validateMsgSendInfo(){
  let cusType=null; $('input[name=cusType]').each(function(){ if($(this).is(':checked')) cusType=$(this).val(); });
  if(!cusType)      return showAlert('발송종류를 선택해주십시요.'),false;
  if(cusType==='1') return showAlert('마케팅 목적의 문자는 발송불가하며\n고객관리(생일축하, 감성메세지 등)는 CRM시스템을 이용해주시기 바랍니다.'),false;
  if(!$('#sender').val()) return showAlert('발신번호를 입력해 주시기 바랍니다.'),false;
  const sender=$('#sender').val().replace(/-/g,'');
  if(sender.length<8||!/^(01[016789]|02|0[3-9][0-9])[0-9]{3,4}[0-9]{4}$/.test(sender))
    return showAlert('발신번호를 정확히 입력해 주세요.'),false;
  if(!$('#message').val().trim()) return showAlert('메세지 내용을 입력해 주시기 바랍니다.'),false;
  if(_byte>88&&!$('#messageTitle').val().trim()) return showAlert('메시지 제목을 입력하십시오.'),false;
  const addrs=$('#sms-send-list tr'); if(!addrs.length) return showAlert('수신번호를 추가 하거나<br>주소록에서 선택하십시오.'),false;
  let receivers=''; addrs.each((i,tr)=>{ const $tr=$(tr); receivers+=`${$tr.find('label').text()}:${$tr.find('.phone').text()}|`; });
  if(_byte>2000) return showAlert('메시지가 2000byte 를 초과하였습니다.'),false;
  
  msgSendInfo = getMsgSendInfo();              // 전역 템플릿 객체 복사
  msgSendInfo.cusType    = cusType;
  msgSendInfo.sendType   = $('.byte span').text();      // SMS / MMS
  msgSendInfo.userAd     = $('input[name=userAd]:checked').val();
  msgSendInfo.sendCount  = addrs.length;
  msgSendInfo.receivers  = receivers;
  msgSendInfo.sender     = $('#sender').val();
  msgSendInfo.title      = $('#messageTitle').val();
  msgSendInfo.message    = $('#message').val();
  msgSendInfo.reserveDate = $('#reserveDate').val();
  /* 최종 OK 반환 */
  return true;
}

/* ---------- 특수문자 팝업 (정적 버전) ---------- */
function showSpechar () {
  $('#spechar-modal').fadeIn(120);
}

/* X 버튼으로 닫기 */
$('#btn_spechar_close').on('click', function (e) {
  e.preventDefault();
  $('#spechar-modal').fadeOut(120);
});

/* 문자 <a> 클릭 → textarea 에 삽입 */
$('#spechar-modal').on('click', 'a', function (e) {
  e.preventDefault();
  const ch = $(this).text();
  insertAtCaret($('#message')[0], ch);
  $('#spechar-modal').fadeOut(120);   // 선택과 동시에 닫기
  messageByteCheck();                 // 바이트/SMS-MMS 표시 갱신
});

/* 커서 위치에 문자열 삽입(IE 포함) */
function insertAtCaret (el, txt) {
  el.focus();
  if (document.selection) {            // IE ≤ 8
    const sel = document.selection.createRange();
    sel.text = txt;
  } else if (el.selectionStart || el.selectionStart === 0) {
    const start = el.selectionStart;
    const end   = el.selectionEnd;
    el.value = el.value.substring(0, start) + txt + el.value.substring(end);
    el.selectionStart = el.selectionEnd = start + txt.length;
  } else {                             // fallback
    el.value += txt;
  }
}

/* 특수문자 버튼(#specharPreview) → 팝업 열기 */
$('#specharPreview').on('click', function (e) {
  e.preventDefault();
  if (!$('input[name=cusType]:checked').length) {
    return showAlert('발송종류를 선택해주십시요.');
  }
  showSpechar();
});

