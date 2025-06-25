/* ------------------------------------------------------------------
   send-general-legacy.js  (DEMO 정적판 - FULL)
------------------------------------------------------------------ */

const BASE = '';

/* ===================== 1. 글로벌 상태 =========================== */
let isSmsMainMsg = false;
let isFirstMsg   = true;
let _byte        = 0;
let alertMms     = 'SMS';
const emplId     = 'STATIC';

/* =================================================================
   2. DOM Ready – 공통 바인딩
================================================================= */
$(function () {
  /* Tooltip  */
  $('.tooltiptext').position({ my:'left+5 top', at:'right top', of:'.tooltipImg' });
  $('.tooltipImg').hover(()=>$('.tooltiptext').css('visibility','visible'),
                          ()=>$('.tooltiptext').css('visibility','hidden'));

  /* 발송종류 안내 */
  $('#cusType_1').on('click',()=>showAlert('마케팅 목적의 문자는 발송불가하며\n 고객관리(생일축하, 감성메시지 등)은 CRM시스템을 이용해주시기 바랍니다.'));
  $('#cusType_0').on('click',()=>$('html,body').animate({scrollTop:$('.tbl_view01').offset().top},400));

  /* 첫 안내 문구 클릭 */
  $('.main-msg').on('click',function(){
    const c=$('input[name=cusType]:checked').val();
    if(!c)      return showAlert('발송종류를 선택해주십시요.');
    if(c==='1') return showAlert('마케팅 목적의 문자는 발송불가하며\n 고객관리(생일축하, 감성메시지 등)은 CRM시스템을 이용해주시기 바랍니다.');
    $(this).remove(); $('#message').trigger('click');
  });

  /* 주소록 관리 → 정적 페이지 */
  $('#moveAddr').on('click',()=>location.href='{{ "/pages/all-address.html" | relative_url }}');

  /* spechar 팝업 숨김 */
  /* $('#spechar-modal').hide(); */
});

/* =================================================================
   3. 입력 영역 이벤트
================================================================= */
$(function () {

  $('#message')
    .on('click',function(){
      const c=$('input[name=cusType]:checked').val();
      if(!c)   { showAlert('발송종류를 선택해주십시요.'); isSmsMainMsg=false; return; }
      if(c==='1'){ showAlert('마케팅 목적의 문자는 발송불가하며\n 고객관리(생일축하, 감성메시지 등)은 CRM시스템을 이용해주시기 바랍니다.'); isSmsMainMsg=false; return; }
      $('.main-msg').remove(); isSmsMainMsg=true; this.focus();
    })
    .on('focus',function(){
      if(isSmsMainMsg&&isFirstMsg){ $(this).val(''); isFirstMsg=false; }
      else if(!isSmsMainMsg){ $('#cusType_0').focus(); }
    })
    .on('keyup', function() {
      messageByteCheck();
    });

  $('#messageTitle')
    .on('focus',function(){ if(!isSmsMainMsg) $('#cusType_0').focus(); })
    .on('keyup',function(){
      const max=40;
      const i=UmsByteCheck.getBytesAndMaxLength($(this).val(),max);
      if(i.totalByte>max){
        showAlert(`제목은 ${max}byte 까지 입력 가능 합니다.`);
        $(this).val($(this).val().substring(0,i.ableLength));
      }
    });

  $('#sender').on('keyup',()=>inputPhoneType($('#sender')));
  $('#receiverNum')
    .on('keyup',function(){ if(!$('input[name=cusType]:checked').length){ showAlert('발송종류를 선택해주십시요.'); $(this).val(''); } inputPhoneType($(this)); })
    .on('keypress',e=>{ if(e.which===13){ e.preventDefault(); $('#btn-add').click(); }});

});
/* =================================================================
   4. 특수문자 팝업 (정적)
================================================================= */
/* spechar 버튼 → jQuery-UI dialog 열기 */
$(document).on('click', '#specharPreview', function (e) {
  e.preventDefault();
  if (!$('input[name=cusType]:checked').length) {
    return showAlert('발송종류를 선택해주십시요.');
  }
  showSpechar();             // ←  specharDialog.html 에 정의된 함수
});

/* =================================================================
   5. Dummy Ajax (네트워크 차단)
================================================================= */
/* === (5) Dummy Ajax — Full Mock ================================================= */
/* ----------------------- 1. 샘플 데이터 ----------------------- */
const FORM_DATA = {
  happy   : [ {code:'happy',seq:1,msgFormCts:'감사합니다 ♥',      msgFormTit:'감사'},
              {code:'happy',seq:2,msgFormCts:'오늘도 행복하세요☺', msgFormTit:'행복'},
              {code:'happy',seq:3,msgFormCts:'생일 축하합니다!',   msgFormTit:'생일'} ],
  head    : [ {code:'head', seq:11,msgFormCts:'○○상품 만기 도래 안내', msgFormTit:'만기안내'},
              {code:'head', seq:12,msgFormCts:'금리 우대 연장 안내',   msgFormTit:'우대연장'} ],
  personal: [ {code:'personal',seq:21,msgFormCts:'내 자주쓰는 문구 ①',msgFormTit:'개인①'},
              {code:'personal',seq:22,msgFormCts:'내 자주쓰는 문구 ②',msgFormTit:'개인②'} ],
  dept    : [ {code:'dept',seq:31,msgFormCts:'부서 공통 문안',        msgFormTit:'부서공통'} ]
};

const ADDR_DATA = {
  personal:{                           // “개인주소록” 탭
    groups:[{grpSeq:'p01',groupName:'VIP', emplId:'STATIC'},
            {grpSeq:'p02',groupName:'일반',emplId:'STATIC'}],
    list:{
      p01:[{firstName:'홍길동', mobile:'01012341234'},
           {firstName:'김영희', mobile:'01098769876'}],
      p02:[{firstName:'박철수', mobile:'01011112222'}]
    }
  },
  share:{                              // “부서공유주소록” (개인탭 내부)
    groups:[{grpSeq:'s01',groupName:'영업부',emplId:'STATIC'}],
    list:{s01:[{firstName:'영업부장', mobile:'01022223333'}]}
  },
  group:{                              // “부서주소록” 탭
    parts:[{boCode:'0000',partName:'본사'}],
    list :{'0000':[ {firstName:'본사대표', mobile:'01044445555'} ]}
  }
};

/* ----------------------- 2. 라우터 + Mock ----------------------- */
function mockData (path){
  /* ── ① 미리보기용 서식 리스트 ─────────────────────────── */
  if (path.startsWith('/form/')){                 // ex) /form/happy
    const code = path.split('/')[2];
    return {startPage:1,endPage:1,currentPage:1,data:FORM_DATA[code]||[]};
  }

  /* ── ② 주소록 ‘그룹’ 목록 ───────────────────────────── */
  if (path === '/addressCall/personal'){
    return {
      addrType:'personal',
      personalGroupList:ADDR_DATA.personal.groups,
      shareGroupList   :ADDR_DATA.share.groups
    };
  }
  if (path === '/addressCall/share'){
    return {addrType:'share',partList:ADDR_DATA.group.parts};
  }

  /* ── ③ 주소록 상세 연락처 ───────────────────────────── */
  // 실제 서비스 URL 패턴:
  //   /addressCall/{emplId}/{pdef|gdef}  또는  /addressCall/{grpSeq}
  // 우리는 마지막 토큰만 빼서 매칭
  const tokens = path.split('/');
  const key    = tokens[tokens.length-1];         // p01, s01, 0000, pdef …
  return  ADDR_DATA.personal.list[key] ||
          ADDR_DATA.share.list[key]    ||
          ADDR_DATA.group.list[key]    || [];
}

/* ----------------------- 3. 가짜 Ajax 래퍼 ---------------------- */
const ajaxGET  = (p,q,cb)=>{ console.log('[GET]',p);  cb(mockData(p)); };
const ajaxPOST = (p,b,cb)=>{ console.log('[POST]',p); cb(mockData(p)); };

/* =================================================================
   6. 실제 발송 → 데모 처리
================================================================= */
function msgSend(info){
  const completeMsg = info.reserveDate ? '예약 되었습니다.' : '요청 되었습니다.';
  const targetCnt   = $('#sms-receiver .title span').text();

  let msg='전체 '+targetCnt+'건중<br>'+info.sendCount+'건이 전송'+completeMsg;
  showAlert(msg);
  console.log('[DEMO] send payload',info);
  initSendInfo();
}

/* =================================================================
   7. 검증 (원본 유지)
================================================================= */
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
  if(_byte>2000) return showAlert('메시지가 2000byte 를 초과하였습니다.'),false;

  msgSendInfo              = getMsgSendInfo();
  msgSendInfo.cusType      = cusType;
  msgSendInfo.sendType     = $('.byte span').text();
  msgSendInfo.userAd       = $('input[name=userAd]:checked').val();
  msgSendInfo.sendCount    = addrs.length;
  msgSendInfo.sender       = $('#sender').val();
  msgSendInfo.title        = $('#messageTitle').val();
  msgSendInfo.message      = $('#message').val();
  msgSendInfo.reserveDate  = $('#reserveDate').val();

  let receivers=''; addrs.each((i,tr)=>{ const $tr=$(tr); receivers+=`${$tr.find('label').text()}:${$tr.find('.phone').text()}|`; });
  msgSendInfo.receivers = receivers;
  return true;
}

/* =================================================================
   8. util 함수 (원본 그대로)
================================================================= */
/* byte 계산 & SMS/MMS 표시 */
function messageByteCheck(addText){
  if(addText){                      // 팝업으로 삽입된 경우
    const m=$('#message'), s=m.prop('selectionStart'), e=m.prop('selectionEnd');
    m.val(m.val().substring(0,s)+addText+m.val().substring(e));
  }
  _byte = checkByteTextarea($('#message'));
  if(_byte>90){ alertMms='MMS'; $('#messageTitle').show(); }
  else        { alertMms='SMS'; $('#messageTitle').val('').hide(); }

  $('.byte').html(_byte+' byte <span>'+alertMms+'</span>');

  if(_byte>2000){
    showAlert('2000byte 를 초과할 수 없습니다.');
    let v=$('#message').val();
    while(checkByteTextarea({value:v})>2000){ v=v.slice(0,-1); }
    $('#message').val(v); messageByteCheck();
  }
}

/* textarea 커서 위치에 문자열 삽입 (IE8 하위 포함) */
/*
function insertAtCaret (el, txt){
  el.focus();
  if (document.selection){                    // IE <= 8
    const sel = document.selection.createRange();
    sel.text = txt;
  } else if (el.selectionStart != null){      // Modern
    const s = el.selectionStart,
          e = el.selectionEnd;
    el.value = el.value.slice(0, s) + txt + el.value.slice(e);
    el.selectionStart = el.selectionEnd = s + txt.length;
  } else {                                    // Fallback
    el.value += txt;
  }
}*/

/* -----------------------------------------------------------------
   spechar modal : global delegat
------------------------------------------------------------------ */
/*
$(document)
  .on('click', '#btn_spechar_close', function (e) {
    e.preventDefault();
    $('#spechar-modal').dialog('close').dialog('destroy');
  })
*/
/* 특수문자 <a> 클릭 */
  /*.on('click', '#spechar-modal a', function (e) {
    e.preventDefault();
    const ch = $(this).text();
    /*
    insertAtCaret($('#message')[0], ch); // 직접 삽입
    messageByteCheck();                   // 바이트 계산만
     */
/*
    const $msg = $('#message');
    $msg.focus()[0].setSelectionRange(specharStart, specharEnd);
     

    messageByteCheck(ch);                 // insert & update
     

    specharStart = specharEnd = specharStart + ch.length;
     
    $('#spechar-modal').dialog('close').dialog('destroy');
  });
*/
