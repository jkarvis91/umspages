var UmsAllMessageColumn = {
  columns: [
	{data: 'msgkey'}, //uniqkey
	{
		data: 'unitName',  //발송시스템
		"render" : function(data, type, row){
			return data + "<br>(" + row['id'] + ")";
		}
	}, 
    {data: 'reqDate' // 발송일시
    },
    {data: 'rslt' //이통사 처리결과
    },
	{
        data: 'messageType' //메시지 구분
  	},
    {data: 'subject' //메시지 제목
    },
    {
      data: 'msg' //메시지 내용
    },
    {
    data : 'unitPic'  //업무담당자
    },
    {
        data : 'unitPicTelno'  //업무담당자 연락처
    },
    {
        data: 'etc1' ,//전행고객번호 / 관련계좌번호
        "render" : function(data,type,row){
        	var smsShowAccount = {
        		'BL':'',
        		'SM':'',
        		'CD':'',
        		'HT':'',
        		'IB':'',
        		'KB':'',
        		'MB':'',
        		'HR':'',
        		'CA':'',
        		'BN':'',
        		'HE':'',
        		'EX':''
        	};
        	var mmsShowAccount = {
        		'HR':'',
        		'HE':'',
        		'IB':'',
        		'KB':'',
        		'HT':'',
        		'MB':'',
        		'BN':'',
        		'CM':'',
        		'EX':''
            };
        	var id = "";
        	var ret = "";
        	var msgType = row['messageType'];
        	if( row['id'] != null && row['id'].length>2 ){
        		id = row['id'].substr(0,2);
        	}
        	if( (msgType == 'SMS' && smsShowAccount[id] == "") || (msgType != 'SMS' && mmsShowAccount[id] == "")){
        		if (msgType == 'SMS') {
        			var tranRefkey = row['tranRefkey'] == null ? "" : row['tranRefkey'];
        			var mid = "<br/>";
        			var etc1 = row['etc1'] == null ? "" : row['etc1'];
            		if(tranRefkey == "" || etc1 == "") {
            			mid = "";
            		}
            		ret = tranRefkey + mid + etc1;
        		} else {
        			var etc1 = row['etc1'] == null ? "" : row['etc1'];
            		var mid = "<br/>";
            		var etc3 = row['etc3'] == null ? "" : row['etc3'];
            		if(etc1 == "" || etc3 == "") {
            			mid = "";
            		}
            		ret = etc1 + mid + etc3;
        		}
        		return ret;
        	} else {
        		row['etc1'] = "";
        		row['etc3'] = "";
        		row['tranRefkey'] = "";
        		return "";
        	}
        }
  	},
	{
      data: 'callback' //발신전화번호
	},
	{
	  data: 'seq1' //발송전화번호
	},
	{
	  data: 'seq2' //발송전화번호
	},
	{
	  data: 'seq3' //발송전화번호
	},
	{
	  data: 'agentRslt' //Agent 내부 결과코드
	},
	{
	  data: 'refCtnt' //알림톡 전환발송 사유
	}
  ],
  columnDefs: [{
	'targets' : [0],
	'visible' :false
  },
  {
	 'targets' : 2,
	 'render':function (data, type, row) {
		 if(data == null){
			  return '-';
		  }else {
	        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm")
	      }
	 }
  },
  {
		'targets' : 5,
		'render': function (data, type, full, meta) { 
			if(data == null){
				return "";
			}
			
			if(data.length >15){
	    		  var datamsg = data.substr(0,15);
	    		  datamsg = datamsg + "...";
	    	  }else {
	    		  datamsg = data;
	    	  }
			return '<span id="msg_val" class="msg_val" title="' + data
			+ '"/>'
			+ datamsg
			+ '</span>'
		}
  },
  {
	'targets' : 6,
	'render': function (data, type, full, meta) { 
		if(data.length >22){
    		  var datamsg = data.substr(0,22);
    		  datamsg = datamsg + "...";
    	  }else {
    		  datamsg = data;
    	  }
		return '<span id="msg_val" class="msg_val" title="' + data
		+ '"/>'
		+ datamsg
		+ '</span>'
	}
  },
  {
	'targets' : 10,
	'render':function(data, type, row){
		if(data.length == '11'){
  		  var first = data.substr(0,3);
  		  var two = data.substr(3,4);
  		  var thir = data.substr(7,4);
  		  data = first + "-" + two + "-" + thir
  	  }
  	  if(data.lenth == '10'){
  		  var first = data.substr(0,3);
  		  var two = data.substr(3,3);
  		  var thir = data.substr(7,4);
  		  data = first + "-" + two + "-" + thir
  	  }
      return data;
	}
  }
  ,{ "width": "0px", "targets": 0 }
  ,{ "width": "100px", "targets": 1 }
  ,{ "width": "105px", "targets": 2 }
  ,{ "width": "75px", "targets": 3 }
  ,{ "width": "50px", "targets": 4 }
  ,{ "width": "135px", "targets": 5 }
  ,{ "width": "265px", "targets": 6 }
  ,{ "width": "85px", "targets": 7 }
  ,{ "width": "75px", "targets": 8 }
  ,{ "width": "120px", "targets": 9 }
  ,{ "width": "95px", "targets": 10 }
  ,{ 'targets' : [11], 'visible' :false}
  ,{ 'targets' : [12], 'visible' :false}
  ,{ 'targets' : [13], 'visible' :false}
  ,{ 'targets' : [14], 'visible' :false}
  ,{ 'targets' : [15], 'visible' :false}
  ]
}