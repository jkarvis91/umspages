var UmsRcsBrandListColumn = {
  columns: [
      {"data": "rnum"}
      // XSS처리 => render: $.fn.dataTable.render.text()
      , {"data": "brId", "className" : "text-left text-line", render: $.fn.dataTable.render.text()}
      , {"data": "brNm", "className" : "text-left text-line", render: $.fn.dataTable.render.text()}
      , {"data": "status"}
      , {"data": "useYn", "render" : function(data, type, full,meta){ return data == "Y"? "사용" : "미사용"} }
      , {"data": "apprReqYmd"}
      , {"data": "apprYmd"}
      // 22.09.22 리스트와 상세목록  차이가 없어 제외
      //, {"data": "brKey", "render" : function(data, type, full,	meta) {
    	//  var html ='<button class="btn btn-reset btn-sm" onclick="deleteBrand(\''+full.brId+'\')">삭제</button>';
         // return html;
    	//  var html ='<button class="btn btn-reset btn-sm" onclick="openDetail(this,\'brand\')">상세</button>';
        //  return html;
     // }}
      
  ],
  columnDefs: [
	  {
	      "targets": [5,6]
	  		, "orderable": false //  정렬 허용 O
	  		, "render": function (data, type, row, meta) {
	  			//var viewDate = data != null ? moment(data, 'YYYYMMDDHHmmsss').format('YYYY-MM-DD')  : "-";
	  			//return type == 'sort' ? meta.row : viewDate;
	  			return data != null ? moment(data, 'YYYYMMDDHHmmsss').format('YYYY-MM-DD')  : "-"; 
	  		}
	   },
	   
	    {
	  	  "targets": [0,1,2,3,4]
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