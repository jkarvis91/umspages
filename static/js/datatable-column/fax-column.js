var UmsFaxColumn = {
  columns: [
	{data: 'rnum'}, 			//순번  
    {data: 'userId'},	 		// 발송아이디
    {data: 'faxno',
		"render" : function(data, type, row){
			var etc1 = row["tranEtc1"];
			
			if(etc1 == "X" || etc1 == "Y" || etc1 == "Z"){
				return data.substring(3);
			}else{
				return "0" + data.substring(5);
			}
		}
    }, 			//FAX번호
    {data: 'sendTime'}, 		//전송시간
    {data: 'result',
    	"render" : function(data, type, row){
    		if(data == "P"){
    			return "결과 대기";
    		}else if(data == "R"){
    			return "완료";
    		}else if(data == "N"){
    			return "실패";
    		}else {
    			return "";
    		}
    	} 		//상태
    },
    {data: 'errorCode',
    	"render" : function(data, type, row){
    		if(row["result"] == "P") {
    			return "";
    		} else {
    			if(data.trim() == "0")
    				return "성공";
    			else if(data.trim() == "100")
    				return "통화중 또는 응답없음";
    			else if(data.trim() == "102")
    				return "결번 또는 FAX아님";
    			else if(data.trim() == "103")
    				return "결번 또는 FAX아님";
    			else if(data.trim() == "104")
    				return "전송 장애";
    			else if(data.trim() == "105")
    				return "페이지 한도 초과";
    			else if(data.trim() == "106")
    				return "지원하지 않는 형식";
    			else if(data.trim() == "S")
    				return "수신거부";
    			else if(data.trim() == "X")
    				return "OPTIN 차단";
    			else if(data.trim() == "Y")
    				return "허용건수 초과";
    			else if(data.trim() == "Z")
    				return "부서코드 오류";
    			else if(data == null || data.trim() == "")
    				return "";
    			else
    				return "실패";
    		}
    	} 		//결과
    },
    
    
  ],
  columnDefs: [
	  {
			 'targets' : 3,
			 'render':function (data, type, row) {
				 if(data == null){
					  return '-';
				  }else {
			        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm")
			      }
			 }
	  }
	  
  ,{ "width": "40px", "targets": 0 }
//  ,{ "width": "90px", "targets": 1 }
//  ,{ "width": "105px", "targets": 2 }
//  ,{ "width": "75px", "targets": 3 }
//  ,{ "width": "45px", "targets": 4 }
//  ,{ "width": "155px", "targets": 5 }
//  ,{ "width": "270px", "targets": 6 }
//  ,{ "width": "90px", "targets": 7 }
//  ,{ "width": "95px", "targets": 8 }
//  ,{ "width": "95px", "targets": 9 }
  ]
}