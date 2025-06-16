var UmsAlimTalkTemplateListColumn = {
  columns: [
      {"data": "rnum",}
      // XSS처리 => render: $.fn.dataTable.render.text()
      /* TB_KKO_TMPL */ 
      , {"data": "kkoTmplCd", "className" : "text-left text-line", render: $.fn.dataTable.render.text()}
      , {"data": "tmplNm", "className" : "text-left text-line", render: $.fn.dataTable.render.text()} // 탬플릿 명
      , {"data": "regUserNm",  "defaultContent" : "-"} // 등록자
      , {"data": "regYms"} // 등록일
      , {"data": "apprResult",  "defaultContent" : "-"} // 승인결과 (상태)
      , {"data": "apprYmd", "defaultContent" : "-"}	// 승인일
      , {"data": "activeYn", "render" : function(data, type, full,meta){ return data == "Y"? "사용" : "미사용"}}
  ],
  columnDefs: [
	  {
		  targets: 0,
          searchable: false,
          orderable: false,
      },
	  {
	      "targets": [4,6]
	  		, type: 'non-empty-string'
	  		, "orderable": true //  정렬 허용 O
	  		, "render": function (data, type, row, meta) {
	  			return data != null ? moment(data, 'YYYYMMDDHHmmsss').format('YYYY-MM-DD')  : "-"; 
	  		}
	   }, 
	  {
	  	  "targets": [0,1,2,3,5,7]
	        , "orderable": false //  정렬 허용 X
	   },
/*	  {
		  'targets':[6],
		  "visible": false
	  } */
  ]
	// 초기 정렬 설정
	, "order": [[ 4, 'desc']]
}