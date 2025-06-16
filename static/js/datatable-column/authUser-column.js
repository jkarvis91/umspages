var AuthUserListColumn = {
  columns: [
	{data: ''},
    {data: 'rnum'}, //순번 
    {
	    data: 'partName', // 부서
	    "render": function (data, type, row) {
	    	var partName = (row.boCode != null ? "[" + row.boCode + "] " : '' ) + row.partName;
	        return "<p class='text-left'>"+ partName + "</p>";
	    }
    },
    {
    	data: 'emplId', // 직원번호
    },
    {
    	data: 'emplName', // 직원명
    },
    {
    	data: 'positionCallName', // 직책
    },
    {
    	data: 'authCnt', // 권한수
    	"render": function (data, type, row) {
	        return "<p class='text-right'>"+ data + "</p>";
	    }
    },
    {
    	data: 'regName' // 등록자
    },
    {
        data: 'regYms', // 등록일
        "render":function (data, type, row) {
  			return data != null ? moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD") : "-";
  		}
  	},
    {
  		data: 'authGrantRegName', // 권한부여자
  		"render":function (data, type, row) {
  			return data != null ? data : "-";
  		}
    },
    {
  		data: 'authGrantYms', // 권한부여일
  		"render":function (data, type, row) {
  			return data != null ? moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD") : "-";
  		}
    },	
  ],
  columnDefs: [
	  {
			'targets' : 0,
			'searchable' : false,
			'orderable' : false,
			'className' : "select-checkbox" ,// 'pdd-left-30 border-table chkboxAlign',
			'render' : function(data, type, full, meta) {
				return '<label class="check-container">&nbsp;'
						+ '		<input type="checkbox"/>' 
						+ '		<span class="checkmark"></span>'
						+ '</label>'
			}
	  },
	  {
			targets: [1,2,3,4,5,6,7,8,9,10],
			orderable: false,
	  }
  ],
  'select': {
    	style:    'multi',// os, multi
    	selector: 'td:first-child' // 'td:last-child'
   }
}

var AuthEmpListColumn = {
	columns : [
		{data : 'partName',
			"render": function (data, type, row) {
				return "<p class='text-left'>[" + row.boCode + "] " + row.partName + "</p>";
			}
		} 
		, {data : 'emplName'}
		, {data : 'emplId'}
		, {data : "positionCallName"} 
	],
	columnDefs : [],
	select: {
        style: 'single',
    },
}