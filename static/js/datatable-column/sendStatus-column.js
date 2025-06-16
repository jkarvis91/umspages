var UmsSendStatusListColumn = {
  columns: [
    {data: 'rnum'}, //순번 
    {
	    data: 'groupNm', //기안제목
	    'render': function (data, type, full, meta) {
			if(data != null) {
				if(data.length >28){
					var datamsg = data.substr(0,28);
					datamsg = datamsg + "...";
				} else {
					  datamsg = data;
				}
				
				return '<p class="text-left">' + datamsg + '</p>';
			} 
			return '<p>-</p>';
	    },
    },
    {
    	data: 'msgDstic', //메시지 구분
    	"render": function (data, type, row) {
    		if(data == 'SM' || data == 'LM' || data == 'MM') {
    			data = '문자 - ' + data + "S";
    		} else if(data == 'KM') {
    			data = '알림톡';
    		} else if(data == 'SR') {
    			data = 'RCS - SMS';
    		} else if(data == 'LR') {
    			data = 'RCS - LMS';
    		} else if(data == 'MR') {
    			data = 'RCS - MMS';
    		} else if(data == 'TR') {
    			data = 'RCS - 템플릿';
    		}
    		
    		return '<p>' + data + '</p>';
    	}
    },
    {
    	data: 'partName', // 부서
    	"render": function (data, type, row) {
    		if(data != null) {
    			return '<p class="text-left">' + data + '</p>';
    		}
    			
    		return '<p>-</p>';
    	}
    },
    {
    	data: 'emplName' // 등록자
    },
    {
        data: 'requestsNumber', //발송진행건수
        "render" : function(data, type, row){
        	var result = data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  			return '<p class="text-right">' + result + '</p>';
  		}
  	},
    {
  		data: 'regYms', // 등록일시
        "render":function (data, type, row) {
          return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
        }
    },
    {
  		data: 'sendExpireYms', // 발송일시
        "render":function (data, type, row) {
          return data != null ? moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD") : "-";
        }
    },	
    {
    	data: 'prcssStusDstic' //처리상태구분
    },
    {
        data: 'prcssStusDstic' //처리상태구분
    },
  ],
  columnDefs: [{
	  'targets' :8,
	  'render' : function(data){
		  var flag = '';
		  if(data == 'C'){
			  flag = '작성중';
		  }else if (data == 'A'){
			  flag = '결재진행중';
		  }else if(data == 'B'){
			  flag = '발송승인대기';
		  }else if(data == 'I'){
			  flag = '승인중';
		  }else if(data =='P'){
			  flag = '시간경과(관리자문의)';
		  }else if(data == 'N'){
			  flag = '반려';
		  }else if(data == 'R'){
			  flag = '발송준비중'
		  }else if (data == 'Y'){
			  flag = '발송대기';
		  }else if (data == 'S'){
			  flag = '발송중';
		  }else if(data == 'T'){
			  flag = '발송중지';
		  }else if(data == 'D'){
			  flag = '발송완료';
		  }else if(data == 'E'){
			  flag = '발송취소';
		  }
		  	
		  return flag;
	  }
  },
  {
	  'targets' :9,
	  'render' : function(data){
		  var flag = '';
		  if(data == 'C'){			// 임시저장
			  flag = '<button class="btn btn-reset btn-sm prcssStusDsticBtn" value="delete">삭제</button>';
		  } else if(data == 'S') {	// 발송중
			  flag = '<button class="btn btn-reset btn-sm prcssStusDsticBtn" value="T">발송중지</button>';
		  } else if(data == 'Y') {	// 발송대기
			  flag = '<button class="btn btn-reset btn-sm prcssStusDsticBtn" value="E">발송취소</button>';
		  } else if(data == 'T') {	// 발송중지
			  flag = '<button class="btn btn-reset btn-sm prcssStusDsticBtn" value="S">발송재개</button>';
			  flag += '<button class="btn btn-reset btn-sm prcssStusDsticBtn2" value="disuse" style="margin-top:5px;">폐기</button>';
		  }
		  
		  return flag;
	  }
  },
  /*{
	  'targets':[6],
	  "visible": false
  }*/
  ]
}