var UmsEmailCampaignColumn = {
  columns: [
	{data: 'sendDate'}, 			//전송시간
    {data: 'customerKey'},	 	//실명번호
    //{data: 'customerEmail'},	//메일주소
    {data: 'campaignNm'},	 		//메일종류
    {data: 'status'},	 			//성공여부
    {data: null,
        "render": function (data, type, row) {
    		return "";
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