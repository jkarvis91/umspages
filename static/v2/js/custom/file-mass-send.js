/*!
 * 파일 - 대량보내기 (GitHub Pages 정적판)
 * - JSP → 순수 JS 로 포팅
 * - jQuery 3.x / DataTables 가 이미 로드되어 있다는 전제
 * ---------------------------------------------------------- */

(function ($) {
  /* ------------------------------------------------------------------
   * 0.  공통 유틸
   * ----------------------------------------------------------------*/
  const showAlert         = window.showAlert            || alert;          // messageUtil.js 가 없으면 alert 대체
  const showConfirmForAjax= window.showConfirmForAjax   || function (msg, ok, payload){ if(confirm(msg)) ok(payload); };
  const messageInitData   = window.messageInitData      || {};             // (년도/월/일 select HTML 생성기)

  /* 숫자만 유지 (발신번호 / 휴대폰번호 입력용) ----------------------*/
  function inputPhoneType ($el) {
    $el.val($el.val().replace(/[^0-9]/g, ''));
  }

  /* 날짜 select 초기화 ---------------------------------------------*/
  const $year  = $('select[name=year]');
  const $month = $('select[name=month]');
  const $date  = $('select[name=date]');
  const $hour  = $('select[name=hour]');
  const $min   = $('select[name=min]');

  function initDateSelectBox () {
    if (!messageInitData.getYearOptionHtml) {
      // messageInitData 미삽입 ⇒ 최소한의 옵션만 직접 생성
      const now = new Date();
      for (let y = now.getFullYear() - 4; y <= now.getFullYear() + 1; y++) {
        $year.append(`<option>${y}</option>`);
      }
      for (let m = 1; m <= 12; m++)  $month.append(`<option>${String(m).padStart(2, '0')}</option>`);
      for (let d = 1; d <= 31; d++)  $date.append(`<option>${String(d).padStart(2, '0')}</option>`);
      for (let h = 0; h < 24; h++)   $hour.append(`<option>${String(h).padStart(2, '0')}</option>`);
      for (let n = 0; n < 60; n+=10) $min.append(`<option>${String(n).padStart(2, '0')}</option>`);
    } else {
      /* 사이트에서 쓰던 util 을 사용할 수 있을 때 */
      $year.html( messageInitData.getYearOptionHtml(5,0) );
      $month.html( messageInitData.getMonthOptionHtml() );
      $date.html( messageInitData.getDayOptionHtml(new Date().getFullYear(), new Date().getMonth()+1) );
      $hour.html( messageInitData.getHourOptionHtml() );
      $min.html( messageInitData.getMinOptionHtml() );
    }

    const now = new Date();
    $year.val( now.getFullYear() );
    $month.val( String(now.getMonth()+1).padStart(2,'0') );
    $date.val(  String(now.getDate()).padStart(2,'0') );
    $hour.val(  String(now.getHours()).padStart(2,'0') );
    $min.val(   String(now.getMinutes()).padStart(2,'0') );

    /* 년·월 바뀌면 마지막 일자 보정 */
    $year.add($month).on('change', function () {
      const lastDay = (new Date($year.val(), $month.val(), 0)).getDate();
      const curSave = $date.val();
      $date.empty();
      for (let d = 1; d <= lastDay; d++) $date.append(`<option>${String(d).padStart(2,'0')}</option>`);
      if (curSave <= lastDay) $date.val(curSave);
    });
  }

  function getReservedDateString () {
    // YYYYMMDDHHmm
    return (
      $year.val() +
      $month.val().padStart(2,'0') +
      $date.val().padStart(2,'0') +
      $hour.val().padStart(2,'0') +
      $min.val().padStart(2,'0')
    );
  }

  /* DataTables 기본 세팅 -------------------------------------------*/
  const DT_COLUMNS = window.UmsFileUploadColumn?.columns || [
    {data:'mobile'}, {data:'title'}, {data:'message'}, {data:'type'}
  ];
  const DT_COLDEF  = window.UmsFileUploadColumn?.columnDefs || [];

  const table = $('#message_upload_table').DataTable({
    paging      : false,
    searching   : false,
    info        : false,
    scrollY     : '200px',
    data        : [],           // 빈 테이블
    columns     : DT_COLUMNS,
    columnDefs  : DT_COLDEF,
    language    : { emptyTable:'<div style="height:40px;margin-top:25px">파일 불러오기 내용이 여기에 표시됩니다.</div>' }
  });

  $('#total_cnt').text( table.data().count() );


  /* ------------------------------------------------------------------
   * 1.  라디오 / 입력 필드 유효성
   * ----------------------------------------------------------------*/
  $('input[name=cusType]').on('click', function () {
    if (this.value === '1') {
      showAlert('마케팅 목적의 문자는 발송불가하며\n고객관리(생일축하, 감성메시지 등)은 CRM시스템을 이용해주시기 바랍니다.');
      this.checked = false;
    }
  });

  $('#sender').on('keyup', function () { inputPhoneType($(this)); });

  /* ------------------------------------------------------------------
   * 2.  파일 불러오기 (로컬 ↑) → 테이블 넣기
   * ----------------------------------------------------------------*/
  const $hiddenFile = $('<input type="file" accept=".txt,.csv" style="display:none">').appendTo('body');

  $('#upload-btn').on('click', () => $hiddenFile.trigger('click'));

  $hiddenFile.on('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      const rows = [];
      const lines = e.target.result.split(/\r?\n/);
      lines.forEach(line => {
        if (!line.trim()) return;
        /* CSV : mobile,title,message,type */
        const cells = line.split(',');
        rows.push({
          mobile  : (cells[0]||'').replace(/[^0-9]/g,''),
          title   : cells[1]||'',
          message : cells[2]||'',
          type    : cells[3]||'SMS'
        });
      });

      table.clear().rows.add(rows).draw();
      $('#total_cnt').text(rows.length);
      showAlert(`총 ${rows.length}건을 불러왔습니다.`);
    };
    reader.readAsText(file, 'utf-8');
    $(this).val('');                 // 같은 파일 두 번 연속 올릴 때 change 이벤트가 안먹는 문제 방지
  });

  /* ------------------------------------------------------------------
   * 3.  예약 발송 체크박스
   * ----------------------------------------------------------------*/
  $('#reserveYN1').on('change', function () {
    const disabled = !this.checked;
    $year.add($month).add($date).add($hour).add($min).prop('disabled', disabled);
  });

  /* ------------------------------------------------------------------
   * 4.  보내기 버튼
   * ----------------------------------------------------------------*/
  $('#send-btn').on('click', function () {
    const cus = $('input[name=cusType]:checked').val();
    if (!cus)  return showAlert('발송종류를 선택해주십시요.');
    if ($('#sender').val().length < 8) return showAlert('발신번호를 정확히 입력해 주세요.');

    const total = table.data().count();
    if (!total) return showAlert('파일을 먼저 불러와 주세요.');

    /* 예약 여부·시간 체크 */
    const reserved = $('#reserveYN1').prop('checked');
    let   sendTime = 'SYSDATE';
    let   confirmMsg = `총 ${total}건을 발송하시겠습니까?`;

    if (reserved) {
      sendTime   = getReservedDateString();
      confirmMsg = `총 ${total}건을 ${$year.val()}-${$month.val()}-${$date.val()} `
                 + `${$hour.val()}:${$min.val()}에 예약 발송하시겠습니까?`;
    }

    showConfirmForAjax(confirmMsg, () => {
      // 실서버라면 여기서 AJAX POST
      // GitHub Pages 데모 → 콘솔 로그 후 완료창
      console.log('[DEMO] send payload', {
        callback : $('#sender').val(),
        sendDate : sendTime,
        fileList : table.data().toArray()
      });
      showAlert(`총 ${total}건이 ${reserved ? '예약 ' : ''}전송 요청되었습니다.`);
    });
  });

  /* ------------------------------------------------------------------
   * 5.  도움말
   * ----------------------------------------------------------------*/
  $('#help-btn').on('click', () => {
    if (window.showHelpAlert_file_send) {
      window.showHelpAlert_file_send();
    } else {
      showAlert('텍스트 파일/CSV 샘플을 참고하여\n휴대폰번호, 제목, 메시지, 타입(SMS/MMS)을 콤마(,)로 구분하여 준비해 주세요.');
    }
  });

  /* ------------------------------------------------------------------
   * 6.  초기화
   * ----------------------------------------------------------------*/
  $(initDateSelectBox);

})(jQuery);
