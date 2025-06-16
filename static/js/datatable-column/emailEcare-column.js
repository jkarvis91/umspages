var UmsEmailEcareColumn = {
  columns: [
	{data: 'sendDate'}, 			//전송시간
    {data: 'customerKey'},	 	//실명번호
    //{data: 'customerEmail'},	//메일주소
    {data: 'ecareNm'},	 		//메일종류
    {data: 'status'},	 			//성공여부
    {data: null,
        "render": function (data, type, row) {
        	if(row.ecareNo == '219'){
        		return '<a href="javascript:" class="btn_small resend_btn" id="jobcode-'
        		+ row.slot1
        		+ '">재발송</a>';
        	}else{
        		return "";
        	}
	    }
    }
  ],
  columnDefs: [
//	  {
//			 'targets' : 3,
//			 'render':function (data, type, row) {
//				 if(data == null){
//					  return '-';
//				  }else {
//			        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm")
//			      }
//			 }
//	  }
	  
//  ,{ "width": "40px", "targets": 0 }
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