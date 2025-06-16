var UmsConfirmListColumn = {
  columns: [
    {data: 'rowNum'}, //번호
    {data: 'regYms', // 등록일
      "render":function (data, type, row) {
        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
      }
    },
    {data: 'msgDstic', //메시지 구분
      "render": function (data, type, row) {
        return data + "S";
      }
    },
    {
      data: 'groupNm', //기안명
	  "render" : function(data, type, full, meta){
			if(data.length >28){
	    		  var datamsg = data.substr(0,28);
	    		  datamsg = datamsg + "...";
	    	  }else {
	    		  datamsg = data;
	    	  }
			return '<a href="javascript:;" id="msg_val" class="msg_val" title="' + data
			+ '"/>'
			+ datamsg
			+ '</a>'
		}
    },
    {
      data: 'requestsNumber', //건수
      "render" : function(data){
			return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	},
    {
	      data: 'agreeType', 	//승인 타입
	      "render":function (data, type, row) {
	          return data + "차";
	      }
    },
    {
	  data: 'agreeName' //승인자 (관리자 권한인 경우)
    },
    {
      data: 'partName' //기안부서 (관리자 권한이 아닌경우)
    },
    {
       data: 'emplName' //기안자
    },
    {
       data: 'agreeStatus' //승인상태
    },
    {
       data: 'confirmYms', //승인(반려)일
       "render":function (data, type, row) {
    	  if(data == null){return "-"};
	      return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD");
       }
    }
  ],
  columnDefs: [{
	  'targets' :9,
	  'render' : function(data){
		  // 승인대기 : 'I', 승인완료 : 'G', 반려 'N'
		  var flag = '';
		  if(data == 'I'){
			  flag = '대기';
		  }else if (data == 'N'){
			  flag = '반려';
		  }else if(data == 'G'){
			  flag = '완료';
		  }
		  	return flag;
	  }
  }
  ,{ "width": "30px", "targets": 0 }
  ,{ "width": "70px", "targets": 1 }
  ,{ "width": "40px", "targets": 2 }
  ,{ "width": "", "targets": 3 }
  ,{ "width": "50px", "targets": 4 }
  ,{ "width": "30px", "targets": 5 }
  ,{ "width": "90px", "targets": 6 }
  ,{ "width": "90px", "targets": 7 }
  ,{ "width": "80px", "targets": 8 }
  ,{ "width": "35px", "targets": 9 }
  ,{ "width": "70px", "targets": 10 }
  
  ]
}