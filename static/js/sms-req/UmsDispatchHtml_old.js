// 발송 희망일 시간 구간 셋팅 @jys
var timeList = ["1000", "1030", "1100", "1400", "1430", "1500", "1530", "1600", "1630", "1700"];
/**
 * 희망 발송일 입력 HTML 세트를 구현 합니다.
 * @type {{appendTo}}
 */
var UmsDispatchHtml = (function (){

  /**
   * target element 위치에 희망 발송일 입력 HTML 세트를 추가 합니다.
   *
   * @param targetEl
   * @param targetDate
   * @param defaultYn Y 이면 위에 라인과 삭제 버튼이 없는 발송 시간 template 를 추가 한다.
   */
  function appendTo(targetEl, targetDate, defaultYn){
    $("#" + targetEl).append(getDispatchHtml(targetDate, defaultYn));
    // 추가 후 입력 가능 셀렉트 박스 모듈을 적용합니다.
    $('.editable-select').editableSelect({ effects: 'default', filter: false });
  }

  function getDispatchHtml(nextDate, defaultYn) {
    if (defaultYn === 'Y') {
      return dispatchBodyHtml(nextDate);
    } else {
      return '<div id="div-' + nextDate + '">'
          + dispatchSeperateLineHtml() + dispatchBodyHtml(nextDate)
          + deleteBtnHtml(nextDate)
          + '</div>';
    }
  }

  function dispatchSeperateLineHtml(){
    return '<div class="line_sms"></div>\n';
  }

  function deleteBtnHtml(nextDate){
    return '<div class="tar mgt10"><a href="javascript:" id="delete-'+nextDate+'" class="btn_default delete">삭제</a></div>';
  }

  function optionHtml(){
    return '                                                <option value="1000">1,000</option>\n'
        + '                                                <option value="2000">2,000</option>\n'
        + '                                                <option value="3000">3,000</option>\n'
        + '                                                <option value="4000">4,000</option>\n'
        + '                                                <option value="5000">5,000</option>\n'
  }

  function colGroupHtml(){
    return '                                    <colgroup>\n'
        + '                                        <col style="width:80px" />\n'
        + '                                        <col style="width:110px" />\n'
        + '                                        <col style="width:80px" />\n'
        + '                                        <col style="width:110px" />\n'
        + '                                        <col style="width:80px" />\n'
        + '                                        <col style="width:110px" />\n'
        + '                                        <col style="width:80px" />\n'
        + '                                        <col style="width:110px" />\n'
        + '                                    </colgroup>\n';
  }

  function leftTdHtml(nextDate, time){
    return '                                        <th>'+time.substring(0,2)+':'+time.substring(2,4)+'</th>\n'
        + '                                        <td id="'+nextDate+'-'+time+'">0</td>\n'
  }

  function rightTdHtml(nextDate, time){
    return '                                        <th>'+time.substring(0,2)+':'+time.substring(2,4)+'</th>\n'
    + '                                        <td>\n'
    + '<div class="daytime-count" id="'+nextDate+time+'">'
    + '                                            <select id="sel-'+nextDate+'-'+time+'" value="0" class="small editable-select" style="width: 45px">\n'
    + optionHtml()
    + '                                            </select>\n'
    + '</div>'
    + '                                        </td>\n'
  }
  
  function dispatchBodyHtml(nextDate){
    return '          <div id="dispatch-body-'+nextDate+'">\n'
        + '                            <div class="row1">\n'
        + '                                <input type="text" name="" value="" class="dispatch-datepicker" id="datepicker-'+nextDate+'" readonly style="width:80px" >\n'
        + '                                <ul class="wrap_gunsoo01">\n'
        + '                                    <li>등록 가능 : <span id="able-count-'+nextDate+'">0</span></li>\n'
        + '                                    <li>전체 건수 : <span>50,000</span></li>\n'
        + '                                    <li>등록된 건수 : <span class="added-count" id="added-count-'+nextDate+'">0</span></li>\n'
        + '                                    <li  style="display: none" >금일 등록된 총 발송 건수 : <span class="today-total-count" id="today-total-count-'+nextDate+'">0</span></li>\n'
        + '                                </ul>\n'
        + '                            </div>\n'
        + '                        <!-- table_view -->\n'
        + '                            <div class="tbl_wrap_view_sms01">\n'
        + '                                <table class="tbl_view01" id="totalCnt_Table">\n'
        + colGroupHtml()
        + '                                    <tr>\n'
        +leftTdHtml(nextDate, "1000")
        +leftTdHtml(nextDate, "1030")
        +leftTdHtml(nextDate, "1100")
        +leftTdHtml(nextDate, "1400")
        + '                                    </tr>\n'
        + '                                    <tr>\n'
        +leftTdHtml(nextDate, "1430")
        +leftTdHtml(nextDate, "1500")
        +leftTdHtml(nextDate, "1530")
        +leftTdHtml(nextDate, "1600")
        + '                                    </tr>\n'
        + '                                    <tr>\n'
        +leftTdHtml(nextDate, "1630")
        +leftTdHtml(nextDate, "1700")
        + '                                        <th></th><td></td><th></th><td></td>\n'
        + '                                    </tr>\n'
        + '                                </table>\n'
        + '                            </div>\n'
        + '                            <!-- //table_view -->\n'
        + '                            <!-- table_view -->\n'
        + '                            <div class="tbl_wrap_view_sms02 mgt10">\n'
        + '                                <table class="tbl_view01">\n'
        + colGroupHtml()
        + '                                    <tr>\n'
        +rightTdHtml(nextDate, "1000")
        +rightTdHtml(nextDate, "1030")
        +rightTdHtml(nextDate, "1100")
        +rightTdHtml(nextDate, "1400")
        + '                                    </tr>\n'
        + '                                    <tr>\n'
        +rightTdHtml(nextDate, "1430")
        +rightTdHtml(nextDate, "1500")
        +rightTdHtml(nextDate, "1530")
        +rightTdHtml(nextDate, "1600")
        + '                                    </tr>\n'
        + '                                    <tr>\n'
        +rightTdHtml(nextDate, "1630")
        +rightTdHtml(nextDate, "1700")
        + '                                        <th></th><td></td><th></th><td></td>\n'
        + '                                    </tr>\n'
        + '                                </table>\n'
        + '                            </div>\n'
        + '                        </div>\n';
  }
  

/**
 * VIEW 전용
 * */
  function appendTo_View(targetEl, targetDate, defaultYn){
    $("#" + targetEl).append(getDispatchViewHtml(targetDate, defaultYn));
    // 추가 후 입력 가능 셀렉트 박스 모듈을 적용합니다.
    $('.editable-select').editableSelect({ effects: 'default', filter: false });
  }

  function getDispatchViewHtml(nextDate, defaultYn) {
    if (defaultYn === 'Y') {
      return dispatchViewBodyHtml(nextDate);
    } else {
      return '<div id="div-' + nextDate + '">'
          + dispatchSeperateLineHtml() + dispatchViewBodyHtml(nextDate)
          + '</div>';
    }
  }
  
  function rightViewTdHtml(nextDate, time){
	    return '                                        <th>'+time.substring(0,2)+':'+time.substring(2,4)+'</th>\n'
	    + '                                        <td>\n'
	    + '<div class="daytime-count" id="'+nextDate+time+'">'
	    + '                                            <input type="text" class="uneditable-select" id="sel-'+nextDate+'-'+time+'" value="0" style="width: 45px; border: none; padding-left: 0px;" readonly="readonly" onfocus="this.blur()">\n'
	    + '</div>'
	    + '                                        </td>\n'
  }
  
  function dispatchViewBodyHtml(nextDate){
    return '          <div id="dispatch-body-'+nextDate+'">\n'
        + '                            <div class="row1">\n'
        + '                                <input type="text" name="" value="" class="dispatch-datepicker" id="datepicker-'+nextDate+'" readonly style="width:80px" >\n'
        + '                                <ul class="wrap_gunsoo01">\n'
        + '                                    <li>등록 가능 : <span id="able-count-'+nextDate+'">0</span></li>\n'
        + '                                    <li>전체 건수 : <span>50,000</span></li>\n'
        + '                                    <li>등록된 건수 : <span class="added-count" id="added-count-'+nextDate+'">0</span></li>\n'
        + '                                    <li  style="display: none" >금일 등록된 총 발송 건수 : <span class="today-total-count" id="today-total-count-'+nextDate+'">0</span></li>\n'
        + '                                </ul>\n'
        + '                            </div>\n'
        + '                        <!-- table_view -->\n'
        + '                            <div class="tbl_wrap_view_sms01">\n'
        + '                                <table class="tbl_view01" id="totalCnt_Table">\n'
        + colGroupHtml()
        + '                                    <tr>\n'
        +leftTdHtml(nextDate, "1000")
        +leftTdHtml(nextDate, "1030")
        +leftTdHtml(nextDate, "1100")
        +leftTdHtml(nextDate, "1400")
        + '                                    </tr>\n'
        + '                                    <tr>\n'
        +leftTdHtml(nextDate, "1430")
        +leftTdHtml(nextDate, "1500")
        +leftTdHtml(nextDate, "1530")
        +leftTdHtml(nextDate, "1600")
        + '                                    </tr>\n'
        + '                                    <tr>\n'
        +leftTdHtml(nextDate, "1630")
        +leftTdHtml(nextDate, "1700")
        + '                                        <th></th><td></td><th></th><td></td>\n'
        + '                                    </tr>\n'
        + '                                </table>\n'
        + '                            </div>\n'
        + '                            <!-- //table_view -->\n'
        + '                            <!-- table_view -->\n'
        + '                            <div class="tbl_wrap_view_sms02 mgt10">\n'
        + '                                <table class="tbl_view01">\n'
        + colGroupHtml()
        + '                                    <tr>\n'
        +rightViewTdHtml(nextDate, "1000")
        +rightViewTdHtml(nextDate, "1030")
        +rightViewTdHtml(nextDate, "1100")
        +rightViewTdHtml(nextDate, "1400")
        + '                                    </tr>\n'
        + '                                    <tr>\n'
        +rightViewTdHtml(nextDate, "1430")
        +rightViewTdHtml(nextDate, "1500")
        +rightViewTdHtml(nextDate, "1530")
        +rightViewTdHtml(nextDate, "1600")
        + '                                    </tr>\n'
        + '                                    <tr>\n'
        +rightViewTdHtml(nextDate, "1630")
        +rightViewTdHtml(nextDate, "1700")
        + '                                        <th></th><td></td><th></th><td></td>\n'
        + '                                    </tr>\n'
        + '                                </table>\n'
        + '                            </div>\n'
        + '                        </div>\n';
  }
  return {
    appendTo : appendTo
    ,appendTo_View : appendTo_View
  }
})();