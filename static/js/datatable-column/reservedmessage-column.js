var UmsReservedMessageColumn = {
  columns: [
    {data: "id"},
    {data: 'messageType',
    },
    {data: 'etc5'
    },
    {data: 'phoneNumber',
      "render": function (data, type, row) {
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
    },
    {
      data: 'msg',
    },
    {
      data: 'regDt',
      "render" : function(data, type, row){
    	  var data = moment(data).format("YYYY-MM-DD HH:mm:ss");
			return data;
      }
    },
  ],
  columnDefs: [{
    'targets': 0,
    'searchable': false,
    'orderable': false,
    'className': 'dt-body-center',
    'render': function (data, type, full, meta) {
      return '<div class="checkbox_center">'
          + '<input type="checkbox" name="grpSeq-Ck" class="dt-check-box" value="' + data
          + '"/>'
          + '                        <label class="dt-check-box-label" for="dt-check-box"></label>'
          + '</div>'
    }
  },
    {
		'targets': 4, 
		'render': function (data, type, full, meta) {
			if(data != null && data != "" && data.length >28){
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
    }
  ]
}