function checkAuthority(emplId) {
  var result = false;
  if(emplId == "80710" || emplId == "7994"  || emplId == "11361" || 
	 emplId == "21949" || emplId == "23564" || emplId == "52445" || 
	 emplId == "52628" || emplId == "52482" || emplId == "54101" || 
	 emplId == "52463" || emplId == "52726" || emplId == "80858") {
	 result = true;
  }	
  return result;
} // end checkAuthority()

function checkByteTextarea(obj) {
  	var tempByte = 0;
  	var _val = obj.val();
  	for(var i = 0; i < _val.length; i++) { 
  		if(escape(_val.charAt(i)).length > 4) { 
  			tempByte += 2;
  		} else {
  			tempByte++; 
  		}
  	}
  	return tempByte;
}

function checkByteText(text) {
  	var tempByte = 0;
  	var _val = text;
  	for(var i = 0; i < _val.length; i++) { 
  		if(escape(_val.charAt(i)).length > 4) { 
  			tempByte += 2;
  		} else {
  			tempByte++; 
  		}
  	}
  	return tempByte;
}

function checkSendTime() {
	
//	  if(getTimeStamp() < 0730 || getTimeStamp() > 2050) return true;
	  if(getTimeStamp() < 0000 || getTimeStamp() > 2459) return true;
	    
	  return false;
}

function getTimeStamp() {
	  var d = new Date();
	  var s =
		   leadingZeros(d.getHours(), 2) +
		   leadingZeros(d.getMinutes(), 2);

	  return s;
}


function leadingZeros(n, digits) {
	  var zero = '';
	  n = n.toString();

	  if (n.length < digits) {
	    for (var i = 0; i < digits - n.length; i++)
	      zero += '0';
	  }
	  return zero + n;
}









var messageInitData = {
		  getYearOptionHtml: function (maxYearCount, minYearCount) {
		    var maxYear = parseInt(moment().format('YYYY')) + maxYearCount;
		    var minYear = parseInt(moment().format('YYYY')) - minYearCount;
		    var html = '';
		    for (i = minYear; i <= maxYear; i++) {
		      html += '<option value=' + i + '>' + i + '</option>'
		    }
		    return html;
		  },
		  getMonthOptionHtml: function () {
		    var html = '';
		    var temp = '';
		    for (i = 1; i <= 12; i++) {
		      if (i < 10) {
		        temp = '0' + i;
		      } else {
		        temp = '' + i;
		      }
		      html += '<option value=' + temp + '>' + temp + '</option>'
		    }
		    return html;
		  },
		  getDayOptionHtml: function (year, month) {
		    var html = '';
		    var temp = '';
		    var lastDay = ( new Date( year, month, 0) ).getDate();
		    for (i = 1; i <= lastDay; i++) {
		      if (i < 10) {
		        temp = '0' + i;
		      } else {
		        temp = '' + i;
		      }
		      html += '<option value=' + temp + '>' + temp + '</option>'
		    }
		    return html;
		  },
		  getHourOptionHtml: function (year, month) {
		    var html = '';
		    var temp = '';
		    var lastDay = ( new Date( year, month, 0) ).getDate();
		    for (i = 0; i < 24; i++) {
		      if (i < 10) {
		        temp = '0' + i;
		      } else {
		        temp = '' + i;
		      }
		      html += '<option value=' + temp + '>' + temp + '</option>'
		    }
		    return html;
		  },
		  getMinOptionHtml: function () {
		    var html = '';
		    var temp = '';
		    for (i = 0; i < 60; i++) {
		      if (i < 10) {
		        temp = '0' + i;
		      } else {
		        temp = '' + i;
		      }
		      html += '<option value=' + temp + '>' + temp + '</option>'
		    }
		    return html;
		  }
		}