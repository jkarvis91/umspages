var _gotoToday = jQuery.datepicker._gotoToday;
jQuery.datepicker._gotoToday = function(a){
    var target = jQuery(a);
    var inst = this._getInst(target[0]);
    _gotoToday.call(this, a);
    jQuery.datepicker._selectDate(a, jQuery.datepicker._formatDate(inst,inst.selectedDay, inst.selectedMonth, inst.selectedYear));
};

var UmsDatepicker = {
  /**
   * Datepicker 를 생성 합니다.
   * @param targetId
   * @param contextPath
   * @param minDate 최소 선택 할 수 있는 날짜를 설정 0 이라면 오늘 이전 날짜는 선택 할 수 없음
   */
  initDatepicker: function (targetId, contextPath, minDate) {
    var datePickerObj = {
      dateFormat: 'yy-mm-dd',
      prevText: '이전 달',
      nextText: '다음 달',
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월',
        '11월', '12월'],
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월',
        '10월', '11월', '12월'],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      showMonthAfterYear: true,
      yearSuffix: '년',
      showOn: "button",
      buttonImage: contextPath + "/static/images/btn_calendar2.png",
      buttonImageOnly: true,
      minDate : minDate,
      showButtonPanel: true,
      closeText: '닫기',
      currentText: '오늘'
    };
    $("#" + targetId).datepicker(datePickerObj);
  },
  Datepicker: function (targetId, contextPath, min, max) {		
    $("#" + targetId).datepicker({	
      dateFormat: 'yy-mm-dd',		
      prevText: '이전 달',		
      nextText: '다음 달',		
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월',		
        '11월', '12월'],		
      monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월',		
        '10월', '11월', '12월'],		
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],		
      dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],		
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],		
      showMonthAfterYear: true,		
      yearSuffix: '년',		
      showOn: "button",		
      minDate:min,		
      maxDate:max,		
      buttonImage: contextPath + "/static/images/btn_calendar.png",		
      buttonImageOnly: true,
      showButtonPanel: true,
      closeText: '닫기',
      currentText: '오늘'
    });		
  },		
  setDateSelectByDatePicker: function (datepickerId, yearId, monthId, dayId) {
    var endDateSplit = $("#" + datepickerId).val().split("-");
    $('#' + yearId).val(endDateSplit[0]);
    $('#' + monthId).val(endDateSplit[1]);
    $('#' + dayId).val(endDateSplit[2]);
    return $("#" + datepickerId).val().replace(/-/g, '');
  },
  setDatePickerByDateSelect: function (datepickerId, yearId, monthId, dayId) {
    $("#" + datepickerId).val(
        $('#' + yearId).val() + "-" + $('#' + monthId).val() + "-" + $(
        '#' + dayId).val());
  },
  setDateSelectByDate: function (datepickerId, date) {		
	  	$("#" + datepickerId).val(date);
  },		
  setDatePickerByDate: function (datepickerId,date) {		
	    $("#" + datepickerId).val(date);	
  }		
}