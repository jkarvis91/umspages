var UmsSmsSendListColumn = {
  columns: [
    {data: 'rnum'}, //순번  
    {data: 'regYms', // 등록일시
      "render":function (data, type, row) {
        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
      }
    },
    {data: 'msgDstic', //메시지 구분
      "render": function (data, type, row) {
		  var formattedData = data.trim().toUpperCase();
		  if(formattedData.length == 2){
			  return formattedData + "S";
		  }
          else {
			  return formattedData;		  
		  }
      }
    },
    {
      data: 'groupNm', //기안제목
      'render': function (data, type, full, meta) {
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
      data: 'requestsNumber', //발송진행건수
      "render" : function(data, type, row){
			return row['sendCount'] + " / " + data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		}
	},
    {
      data: 'prcssStusDstic' //처리상태구분
    },
    {
      data: 'sendCount' //발송건수
    }
  ],
  columnDefs: [{
	  'targets' :5,
	  'render' : function(data){
		  //C:임시저장, R:결재진행중, I:발송승인대기, G:발송승인중, T:시간경과(관리자문의), A:반려, B:발송준비중, Y:발송대기, S:발송중, P:발송중지, D:발송완료
		  var flag = '';
		  if(data == 'C'){
			  flag = '임시저장';
		  }else if (data == 'A'){
			  flag = '결재진행중';
		  }else if(data == 'B'){
			  flag = '발송승인대기';
		  }else if(data == 'I'){
			  flag = '발송승인중';
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
	  'targets':[6],
	  "visible": false
  }
  ]
}