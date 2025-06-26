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
  /* … 기존 코드 그대로 붙여넣기 … */

})(jQuery, window, document);
