var UmsInsertText = (function () {

  /**
   * textArea cursor 에 text 추가
   * @param textAreaId
   * @param text
   */
  function setText(textAreaId, text) {
    var $txtArea = $("#"+textAreaId);
    var caretPos = $txtArea[0].selectionStart;
    var textAreaTxt = $txtArea.val();
    $txtArea.val(textAreaTxt.substring(0, caretPos) + text + textAreaTxt.substring(caretPos) );
    $txtArea.focus();
  }

  return {
    setText : setText
  }
})();