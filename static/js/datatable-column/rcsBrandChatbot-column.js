var UmsRcsBrandChatbotListColumn = {
  columns: [
      {"data": "rnum"}
      // XSS처리 => render: $.fn.dataTable.render.text()
      , {"data": "subTitle", "className" : "text-left text-line"} /* 발신번호명 */
      , {"data": "subNum"}								/* 발신번호 */
      , {"data": "mainnumYn"} 							/* 대표번호여부 */
      , {"data": "display"}                             /* 전시상태 */
      , {"data": "status"}                              /* 상태 */
      , {"data": "regDt"}                               /* 등록일 */
      , {"data": "apprYmd"}                             /* 승인일 */
      , {"data": "regUserNm", "render" : function(data, type, full,meta){return data || full.regUserId }} /* 등록자 */
      // 22.09.22 리스트와 상세목록  차이가 없어 제외
      //, {"data": "brKey", "render" : function(data, type, full,	meta) {
	  //      var html ='<button class="btn btn-reset btn-sm" onclick="deleteChatbot(\''+full.brId+'\', \''+full.chatbotId+'\')">삭제</button>';
	  //      return html;
    	  //  var html ='<button class="btn btn-reset btn-sm" onclick="openDetail(this,\'chatbot\')">상세</button>';
    	  //  return html;
      //}}
  ],
  columnDefs: [
	  {
	      "targets": [6,7]
	  		, "orderable": false //  정렬 허용 O
	  		, "render": function (data, type, row, meta) {
	  			//var viewDate = data != null ? moment(data, 'YYYYMMDDHHmmsss').format('YYYY-MM-DD')  : "-";
	  			//return type == 'sort' ? meta.row : viewDate;
	  			return data != null ? moment(data, 'YYYYMMDDHHmmsss').format('YYYY-MM-DD')  : "-"; 
	  		}
	   },
	   
	  {
	  	  "targets": [0,1,2,3,4,5,8]
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