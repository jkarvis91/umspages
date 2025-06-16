var UmsSmsSendHistoryListColumn = {
  columns: [
    {data: 'rnum'}, //순번 
    {
	    data: 'tranDate', //발송일시
	    "render":function (data, type, row) {
	    	return data != null ? moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss") : "-";
        }
    },
    {
    	data: 'tranRsltDate', //수신일시
    	"render":function (data, type, row) {
	    	return data != null ? moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm:ss") : "-";
        }
    },
    {
    	data: 'tranPhone', //수신번호
    	"render":function (data, type, row) {
    		var fmtData = data.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
    		//var pattern = /^(\d{3})-?(\d{1,2})\d{2}-?\d{2}(\d{2})$/;
    		var pattern = /^(\d{3})-?(\d{4})-?(\d{4})$/;
	        var result = "-";
	        if(!data) return result;

	        var match = pattern.exec(data);
	        if(match) {
	        	result = match[1]+"-****-"+match[3];
	        } else {
	            result = "-";
	        }
	        return result;
        }
    },
    {
    	data: 'tranCallback', //발신번호
    	"render":function (data, type, row) {
	    	return data != null ? data : "-";
        }
    },
    {
        data: 'msgDstic', //메시지유형
        "render": function (data, type, row) {
        	var fmtMsgDstic = "";
        	if(row.altMsgYn == 'Y') {
        		fmtMsgDstic += '(전환)';
        	}
        	
    		if(data == 'SM' || data == 'LM' || data == 'MM') {
    			fmtMsgDstic += '문자 - ' + data + "S";
    		} else if(data == 'KM') {
    			fmtMsgDstic += '알림톡';
    		} else if(data == 'SR') {
    			fmtMsgDstic += 'RCS - SMS';
    		} else if(data == 'LR') {
    			fmtMsgDstic += 'RCS - LMS';
    		} else if(data == 'MR') {
    			fmtMsgDstic += 'RCS - MMS';
    		} else if(data == 'TR') {
    			fmtMsgDstic += 'RCS - 템플릿';
    		} else {
    			fmtMsgDstic = '-';
    		}
    		
    		return fmtMsgDstic;
    	}
  	},
    {
  		data: 'tranNet', // 이통사
  		"render":function (data, type, row) {
	    	return data != null ? data : "-";
        }
        /*"render":function (data, type, row) {
          return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
        }*/
    },
    {
        data: 'tranRslt', //처리상태구분
        "render":function (data, type, row) {
        	if(data != null) {
        		if(data == '0') {
        			data = '성공';
        		} else {
        			data = '실패';
        		}
        	} else {
        		data = '-';
        	}
	    	return data;
        }
    },
  ],
  columnDefs: [{
	  
  },
  /*{
	  'targets':[6],
	  "visible": false
  }*/
  ]
}