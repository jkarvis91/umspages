var UmsRcsTemplateListColumn = {
  columns: [
      {"data": "rnum"}
      // XSS처리 => render: $.fn.dataTable.render.text()
      /* RCS_MSGBASE_REQ */      
      , {"data": "msgbaseId", "className" : "text-left text-line", render: $.fn.dataTable.render.text()} // 탬플릿ID
      , {"data": "msgbaseNm", "className" : "text-left text-line", render: $.fn.dataTable.render.text()} // 탬플릿명
      , {"data": "cardType", "render" : function(data, type, full,meta){	// 유형
    	  switch(data) {
    	  	case  "description":
    	  		return "서술("+ data +")"
    	  		break;
    	  	case  "cell":
    	  		return "스타일("+ data +")"
    	  		break;
    	  	default  :
    	  		return "-"
    	  		break;
    	  }
    	}}
      , {"data": "bizService"} // 속성
      , {"data": "regUserNm"} // 등록자
      , {"data": "regDt"}	// 등록일
      , {"data": "apprResult", "className" :"text-overflow"}  // 상태
      , {"data": "apprReason", "className" :"text-overflow", "defaultContent" : "-" }  // 사유
      , {"data": "apprDt"}	// 승인일
      //, {"data": "status", "render" : function(data, type, full,meta){ return data == "ready"? "사용" : "미사용"}} // 사용 
      
  ],
  columnDefs: [
	  {
		  targets: 0,
          searchable: false,
          orderable: false,
      },
	  {
	      "targets": [6,9]
      		, type: 'non-empty-string'
	  		//, "type": "date"
	  		, "orderable": true //  정렬 허용 O
	  		//, "createdCell": function(td, cellData, rowData, row, col){
			//       counter++
			//       $(td).attr('data-order ', counter )
			//     }
	  		, "render":  //$.fn.dataTable.render.moment( )
	  			function (data, type, row, meta) {
	  			//var viewDate = data != null ? moment(data, 'YYYYMMDDHHmmsss').format('YYYY-MM-DD')  : "-";
	  			//return type == 'sort' ? meta.row : data
	  			return data != null ? moment(data, 'YYYYMMDDHHmmsss').format('YYYY-MM-DD')  : "-"; 
	  		}
	   },
	   {
	  	  "targets": [0,1,2,3,4,5,7,8]
	        , "orderable": false //  정렬 허용 X
	   },
	  /*{
		  'targets':[6],
		  "visible": false
	  }*/
  ]
	// 초기 정렬 설정
	, "order": [[ 6, 'desc']]
}

