var UmsValidation = {
  validDateScope: function (startDateId, endDateId) {
    var startDateReplaced = $("#" + startDateId).val().replace(/-/gi, "");
    var endDateReplaced = $("#" + endDateId).val().replace(/-/gi, "");
    return startDateReplaced <= endDateReplaced;
  },
  validsameDateScope: function(startDateId, endDateId){
	  var startDateReplaced = $("#" + startDateId).val().replace(/-/gi, "");
	  var endDateReplaced = $("#" + endDateId).val().replace(/-/gi, "");
	  
	  if(startDateReplaced == endDateReplaced) { 
		  return true;
	  }else {
		  return false;
	  }
  },
  validsameYYYYMMScope: function(startDateId, endDateId){
	  var startDateReplaced = $("#" + startDateId).val().replace(/-/gi, "");
	  var endDateReplaced = $("#" + endDateId).val().replace(/-/gi, "");
	  
	  var startDateYYYYMM = startDateReplaced.substr(0,6);
	  var endDateYYYYMM = endDateReplaced.substr(0,6);
	  
	  if(startDateYYYYMM == endDateYYYYMM){
		  return true;
	  }else {
		  return false;
	  }
  },
  invalidDateScope: function (startDateId, endDateId) {
    return !this.validDateScope(startDateId, endDateId);
  },
  invalidSameDateScope: function(startDateId, endDateId){
	  return this.validsameDateScope(startDateId, endDateId);
  },
  invalidSameYYYYMMScope: function(startDateId, endDateId){
	  return !this.validsameYYYYMMScope(startDateId, endDateId);
  },
  validInputBox: function (inputId) {
    if ($("#" + inputId).val()) {
      return true;
    } else {
      return false;
    }
  },
  setFocusById: function (focuseId) {
    $("#" + focuseId).focus();
  },
  setFocuseByClass: function (focuseEl) {
    $("."+focuseEl).focus();
  },
  hasScriptTag : function(str){

  },
  
  
  
  
  
  
//두개의 날짜를 비교하여 차이를 알려준다.
  validDateDiff: function(startDateId, endDateId) {
	  var startDateReplaced = $("#" + startDateId).val();
	  var endDateReplaced = $("#" + endDateId).val();
	  
      var diffDate_1 = startDateReplaced instanceof Date ? startDateReplaced : new Date(startDateReplaced);
      var diffDate_2 = endDateReplaced instanceof Date ? endDateReplaced : new Date(endDateReplaced);

      diffDate_1 = new Date(diffDate_1.getFullYear(), diffDate_1.getMonth()+1, diffDate_1.getDate());
      diffDate_2 = new Date(diffDate_2.getFullYear(), diffDate_2.getMonth()+1, diffDate_2.getDate());
   
      var diff = Math.abs(diffDate_2.getTime() - diffDate_1.getTime());
      diff = Math.ceil(diff / (1000 * 3600 * 24));
      
      return diff;
  },
  invalidDateDiff: function(startDateId, endDateId){
	  return this.validDateDiff(startDateId, endDateId);
  },

};
