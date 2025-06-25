/* -------------------------------------------------------------
 * uploadDialog.js  –  파일불러오기 팝업 (GitHub Pages 데모용)
 *  - DataTables  &  UmsDataTable  전역 객체가 이미 로드되어 있다는 가정
 * ------------------------------------------------------------ */
(function ($) {
  /* ─────────────────── 기본 모달 util (기존 페이지와 동일) */
  const showAlert = window.showAlert || function (msg) {
    $('#alert-message').html(msg);
    $('#alert-dialog-close').one('click', () => $('#alert-modal').dialog('close'));
    $('#alert-modal').dialog({modal:true,width:400}); $('.ui-dialog-titlebar').hide();
  };

  /* confirm → 콜백 실행 */
  const showConfirm = function (msg, ok) {
    $('#confirm-message').html(msg);
    $('.confirm-dialog-close').one('click', () => $('#confirm-dialog').dialog('close'));
    $('#confirm-yes-btn').one('click', () => { ok(); $('#confirm-dialog').dialog('close'); });
    $('#confirm-dialog').dialog({modal:true,width:400}); $('.ui-dialog-titlebar').hide();
  };

  /* ─────────────────── 팝업 오픈 */
  window.showUploadPopUp = function (afterClose) {
    $('#fileUpload-dialog').dialog({
      modal : true,
      width : 600,
      open  : function(){ $(this).css('padding',0); },
      close : afterClose || $.noop
    });
    $('.ui-dialog-titlebar').hide();
  };

  /* ─────────────────── 이벤트 바인딩 */
  $('#file-find-btn').on('click', () => $('#file-input').trigger('click'));

  /* 파일 선택 시 텍스트박스에 표시 */
  $('#file-input').on('change', function () {
    const name = this.files[0] ? this.files[0].name : '';
    $('#file_name').val(name);
  });

  /* “등록” 클릭 */
  $('#upload-submit').on('click', function () {
    const file = $('#file-input')[0].files[0];
    if (!file) return showAlert('파일을 선택해주세요.');

    /* 확장자 체크 */
    if (!/\.(csv|xls|xlsx)$/i.test(file.name)) {
      return showAlert('CSV 또는 Excel 파일만 가능합니다.');
    }

    /* CSV 만 클라이언트에서 직접 파싱 (Excel 은 실제 서비스에서 백엔드 처리) */
    if (!file.name.match(/\.csv$/i)) {
      showAlert('데모에서는 CSV 만 미리보기가 가능합니다 👀');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const lines = e.target.result.split(/\r?\n/).filter(l=>l.trim());
      const rows  = lines.map(line => {
        const c = line.split(',');
        return {
          mobile  : (c[0]||'').replace(/[^0-9]/g,''),
          title   : c[1]||'',
          message : (c[2]||'') + (c[3]||''),
          type    : 'SMS'
        };
      });

      /* DataTables 에 반영 */
      if (window.UmsDataTable?.dataTable) {
        UmsDataTable.dataTable.clear();
        UmsDataTable.dataTable.rows.add(rows).draw();
        $('#total_cnt').text(rows.length);
      }

      $('#fileUpload-dialog').dialog('close');
      showAlert(`총 ${rows.length}건을 불러왔습니다.`);
    };
    reader.readAsText(file, 'utf-8');
  });

  /* 팝업 X 버튼 / 취소 버튼 */
  $(document).on('click', '.popup-close', () => $('#fileUpload-dialog').dialog('close'));

})(jQuery);
