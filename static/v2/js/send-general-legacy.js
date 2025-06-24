/* send-general-legacy.js – GitHub Pages 호환 풀버전 (v3)
   ▷ BASE 상수 기반으로 모든 URL 치환
   ▷ 404 발생 시 mock JSON 대체 로직 포함
   ▷ 기존 함수·변수명 완전 유지 (명칭 변경 없음) */

/*============================================================
  2) 글로벌 상태 변수
============================================================*/
let isSmsMainMsg = false;
let isFirstMsg   = true;
let _byte        = 0;        // 메시지 byte 길이
let alertMms     = 'SMS';
const emplId     = 'STATIC'; // 서버 세션 없는 정적 DEMO

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

  /* ── 주소록 관리 이동 */
  $('#moveAddr').on('click',()=>setTimeout(()=>{location.href=BASE+'/all-address.do';},100));

  /* ── Keep‑Session DEMO */
  setTimeout(()=>$.get(BASE+'/keepSession.do').fail(()=>console.log('[INFO] keepSession.do (demo)')),300000);
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
  6) Ajax 래퍼 – 404 → mock JSON 대체
============================================================*/
function mockPath(p){ return `/mock${p.replace(/\?.*/, '')}.json`; }
function ajaxGET(path,qs,cb){ $.ajax({url:BASE+path,type:'GET',dataType:'json',data:qs}).done(cb).fail(()=>$.getJSON(BASE+mockPath(path),cb)); }
function ajaxPOST(path,payload,cb){ $.ajax({url:BASE+path,type:'POST',dataType:'json',contentType:'application/json; charset=utf-8',data:JSON.stringify(payload)}).done(cb).fail(()=>$.getJSON(BASE+mockPath(path),cb)); }

/*============================================================
  7) DEMO용 API 래핑 (원본 함수명 유지)
============================================================*/
function reloadAddressViewData(){ ajaxGET(`/addressCall/`+addrGroupCode,null,handleAddressGroups); }
function reloadPreViewData()    { ajaxPOST(`/form/`+code,msgFormInfo,handlePreviewResult); }
function msgSend(info){ console.log('[DEMO] send payload',info); swal('데모',`${info.sendCount}건 전송(가정)`,'success'); initSendInfo(); }

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
  msg
