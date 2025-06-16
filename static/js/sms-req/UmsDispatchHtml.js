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
    setEvent();
    // 추가 후 입력 가능 셀렉트 박스 모듈을 적용합니다.
    $('.editable-select').editableSelect({ effects: 'default', filter: false });
  }

  function setEvent(){
	  $("#checkDispatch-btn").off('click').on('click', function(){
		  validateDispatch(true);
	  });
	  
	  $("#totalCnt_TextArea").off('keyup').on('keyup', function(key){
		  if (key.keyCode == 13) {
			  validateDispatch(false);			  
		  }
	  });
	  
	  $("#totalCnt_TextArea").off('focusout').on('focusout', function(){
		  validateDispatch(false);			  
	  });
  }

  function validateDispatch(alertShow){
	  var regExpTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/;
	  var regExpCount = /[0-9]$/;
	  var inputLineText =  $("#totalCnt_TextArea").val().split("\n");
	  
	  var checkMsg = "";
	  var sumCount = 0;
	  for(var i=0; i < inputLineText.length; i++){
		  var lineText = inputLineText[i];
		  if(lineText == null || lineText.trim() == ""){
			  continue;
		  }
		  
		  var lineTextSplit = inputLineText[i].trim().replace("\t", " ").split(" ");
		  if(lineTextSplit.length != 2){
			  showAlert((i+1)+"라인의 입력 값을 확인해 주시기 바랍니다.<br><br>입력 값 :"+lineTextSplit);
			  return false;
		  }
		  
		  var time = lineTextSplit[0].replace(/\:/gi,'');
		  var count = lineTextSplit[1];
		  
		  if(time.length != 4 || !regExpTime.test(time)){
			  showAlert((i+1)+"라인의 시간 형식을 확인해 주시기 바랍니다.<br><br>입력 값 :"+time);
			  return false;
		  }
		  
		  if(!regExpCount.test(count)){
			  showAlert((i+1)+"라인의 발송 건수 형식을 확인해 주시기 바랍니다.<br><br>입력 값 :"+count);
			  return false;
		  }
		  
		  count = Number(lineTextSplit[1]);
		  if(count <= 0){
			  showAlert((i+1)+"라인의 발송 건수를 확인해 주시기 바랍니다.<br><br>입력 값 :"+count);
			  return false;
		  }
		  
		  checkMsg += time.substring(0,2) + ":" + time.substring(2,4) + "\t(" + count + "건)<br>";
		  sumCount += count;
	  }
	  var totalCnt = Number($("#total-count").text().replace(/,/g, ''));
	  $("#remain-count").text($.number(totalCnt-sumCount));
	  checkMsg += "--------------<br>총 건수 : "+sumCount + "건"; 
	  if(alertShow){showAlert(checkMsg)};
  }
  
  function getDispatchList(){
	  var regExpTime = /^([0-9]|0[0-9]|1[0-9]|2[0-3])[0-5][0-9]$/;
	  var regExpCount = /[0-9]$/;
	  var inputLineText =  $("#totalCnt_TextArea").val().split("\n");
	  
	  var checkMsg = "";
	  var sumCount = 0;
	  
	  var sendTimeCount = [];
	  for(var i=0; i < inputLineText.length; i++){
		  var lineText = inputLineText[i];
		  if(lineText == null || lineText.trim() == ""){
			  continue;
		  }
		  
		  var lineTextSplit = inputLineText[i].trim().replace("\t", " ").split(" ");
		  if(lineTextSplit.length != 2){
			  showAlert((i+1)+"라인의 입력 값을 확인해 주시기 바랍니다.<br><br>입력 값 :"+lineTextSplit);
			  return false;
		  }
		  
		  var time = lineTextSplit[0].replace(/\:/gi,'');
		  var count = lineTextSplit[1];
		  
		  if(time.length != 4 || !regExpTime.test(time)){
			  showAlert((i+1)+"라인의 시간 형식을 확인해 주시기 바랍니다.<br><br>입력 값 :"+time);
			  return false;
		  }
		  
		  if(!regExpCount.test(count)){
			  showAlert((i+1)+"라인의 발송 건수 형식을 확인해 주시기 바랍니다.<br><br>입력 값 :"+count);
			  return false;
		  }
		  
		  count = Number(lineTextSplit[1]);
		  if(count <= 0){
			  showAlert((i+1)+"라인의 발송 건수를 확인해 주시기 바랍니다.<br><br>입력 값 :"+count);
			  return false;
		  }
		  sumCount += count;
		  
		  sendTimeCount.push({
	          time: time,
	          count: count
	      });
	  }
	  
	  return sendTimeCount;
		  
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

  
  function rightTdHtmlIdx(idx, time){
	    $("#time_input"+idx).html(
		    '                                        <td>\n'
		    + '<div class="daytime-count" id="'+time+'">'
		    + '                                            <select id="sel-'+time+'" value="0" class="small editable-select" style="width: 45px">\n'
		    + optionHtml()
		    + '                                            </select>\n'
		    + '</div>'
		    + '                                        </td>\n'
	    );
	    
	    $("#"+time).unwrap();
  }
  
  function dispatchBodyHtml(nextDate){
    return '          <div id="dispatch-body-'+nextDate+'">\n'
        + '                            <div class="row1">\n'
        + '                                <input type="text" name="" value="" class="dispatch-datepicker" id="datepicker-'+nextDate+'" readonly style="width:80px" >\n'
        + '                                <a href="javascript:" class="btn_default blue mgl15 vam00" id="checkDispatch-btn">발송희망일 검증</a>\n'
        + '                                <ul class="wrap_gunsoo01" style="display : none;">\n'
        + '                                    <li>등록 가능 : <span id="able-count-'+nextDate+'">0</span></li>\n'
        + '                                    <li>전체 건수 : <span>50,000</span></li>\n'
        + '                                    <li>등록된 건수 : <span class="added-count" id="added-count-'+nextDate+'">0</span></li>\n'
        + '                                    <li  style="display: none" >금일 등록된 총 발송 건수 : <span class="today-total-count" id="today-total-count-'+nextDate+'">0</span></li>\n'
        + '                                </ul>\n'
        + '                            </div>\n'
        + '                            <!-- table_view -->\n'
        + '                            <div class="tbl_wrap_view_sms02 mgt10" style="width:250px;">\n'
        + '                                <textarea type="text" style="height:300px;" class="tbl_view01" id="totalCnt_TextArea"></textarea>\n'
        + '                            </div>\n'
        + '     								* [발송시간 발송건수]\n'
        + '     								<br> ex) 0430 1000\n'
        + '     								<br> ex) 2130 2000\n'
        + '     								<br> ex) 1330 3000\n'
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
        + '                                <ul class="wrap_gunsoo01" style="display : none;">\n'
        + '                                    <li>등록 가능 : <span id="able-count-'+nextDate+'">0</span></li>\n'
        + '                                    <li>전체 건수 : <span>50,000</span></li>\n'
        + '                                    <li>등록된 건수 : <span class="added-count" id="added-count-'+nextDate+'">0</span></li>\n'
        + '                                    <li  style="display: none" >금일 등록된 총 발송 건수 : <span class="today-total-count" id="today-total-count-'+nextDate+'">0</span></li>\n'
        + '                                </ul>\n'
        + '                            </div>\n'
        + '                            <!-- table_view -->\n'
        + '                            <div class="tbl_wrap_view_sms02 mgt10" style="width:250px;">\n'
        + '                                <textarea type="text" style="height:300px; background-color:#eeeeee;" class="tbl_view01" id="totalCnt_TextArea" readonly></textarea>\n'
        + '                            </div>\n'
        + '     								* [발송시간 발송건수]\n'
        + '     								<br> ex) 0430 1000\n'
        + '     								<br> ex) 2130 2000\n'
        + '     								<br> ex) 13:30 3000\n'
        + '                        </div>\n';
  }
  return {
    appendTo : appendTo
    ,appendTo_View : appendTo_View
    ,getDispatchList : getDispatchList
    ,validateDispatch : validateDispatch
  }
})();