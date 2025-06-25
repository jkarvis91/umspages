/* address-help.js
   - 도움말 팝업 4종(file_send / all / person / file) 제어
   - 기존 함수·ID 유지, jQuery UI dialog 사용   */

(function ($) {
  /* ---------- 공용 ---------- */
  function closeAlert () {
    $('.popup_wrap_help:visible').each(function () {
      $('#' + this.id).dialog('close');
    });
  }

  /* ---------- 팝업별 열기 ---------- */
  window.showHelpAlert_file_send = function () {
    closeAlert();
    $('#alert-file-send-help .btn_close a').off('click').on('click', () => {
      $('#alert-file-send-help').dialog('close');
    });
    $('#alert-file-send-help').dialog({
      modal: true,
      width: 1000,
      open: function () { $(this).css('padding', 0); }
    });
    $('.ui-dialog-titlebar').hide();
  };

  window.showHelpAlert_all = function () {
    closeAlert();
    $('#alert-help .btn_close a').off('click').on('click', () => {
      $('#alert-help').dialog('close');
    });
    $('#alert-help').dialog({
      modal: true,
      width: 1000,
      open: function () { $(this).css('padding', 0); }
    });
    $('.ui-dialog-titlebar').hide();
  };

  window.showHelpAlert_person = function () {
    closeAlert();
    $('#alert-person-help .btn_close a').off('click').on('click', () => {
      $('#alert-person-help').dialog('close');
    });
    $('#alert-person-help').dialog({
      modal: true,
      width: 1000,
      open: function () { $(this).css('padding', 0); }
    });
    $('.ui-dialog-titlebar').hide();
  };

  window.showHelpAlert_file = function () {
    closeAlert();
    $('#alert-file-help .btn_close a').off('click').on('click', () => {
      $('#alert-file-help').dialog('close');
    });
    $('#alert-file-help').dialog({
      modal: true,
      width: 1000,
      open: function () { $(this).css('padding', 0); }
    });
    $('.ui-dialog-titlebar').hide();
  };

})(jQuery);
