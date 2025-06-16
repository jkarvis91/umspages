var AlimtalkColumn = {
  columns: [
    {data: 'rnum'}, //순번  
    {data: 'tmplNm', //메시지 구분
      "render": function (data, type, row) {
        return "<p class='text-left'>" + row.kkoTmplCd + "</p><p class='text-left'>" + row.tmplNm + "</p>";
      }
    },
    {data: 'regYms', // 등록일시
    	"render":function (data, type, row) {
    		return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
    	}
    },
    {data: "",
		render: function(data, type, row){
			return "<button id='btn_info' type='button' class='btn' onClick='msgStepTalk.useBtn(this)'>선택</button>";
		}
    }
  ],
  columnDefs: []
}

var RcsTemplateColumn = {
		  columns: [
		    {data: 'rnum'}, //순번  
		    {data: 'msgbaseId'},
		    {data: 'fmtCardType'},
		    {data: 'bizService'},
		    {data: 'msgbaseNm'},
		    {data: 'regDt', // 등록일시
		    	"render":function (data, type, row) {
		    		return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
		    	}
		    },
		    {data: "",
				render: function(data, type, row){
					return "<button id='btn_info' type='button' class='btn' style='min-width:50px;' onClick='useRcsTemplateBtn(this)'>선택</button>";
				}
		    }
		  ],
		  columnDefs: []
		}

var sendTargetColumn = {
		  columns: [
		    {data: 'rnum'}, //순번  
		    {data: 'verifRsultCdNm', 
		        "render": function (data, type, row) {
		        	var errClass = row.verifRsultCdNm != '정상' ? 'color-fail' : 'color-blue';
		        	return "<span class="+ errClass +">" + row.verifRsultCdNm + "</span>";
		        }
		      },
		    {data: 'custNm',
		    	  "render":function (data, type, row) {
			    		return row.custNm || '-'
			      }
	    	},
		    {data: 'custUniqNo'},
		    {data: 'cphnNo',
		    	"render":function (data, type, row) {
		    		return row.cphnNo || '-'
		    	}
	    	},
		  ],
		  columnDefs: []
}

var UserSearchColumn = {
		columns : [ {
			data : 'rnum'
		}, 
		{
			data : 'partName'
		}, 
		{
			data : 'emplId'
		}, {
			data : 'emplName'
		} ],
		columnDefs : [
				{
					'targets' : 0,
				},
				{
					'targets' : 1,
				},
				{
					'targets' : 2,
				},
				{
					'targets' : 3,
				},
		]
}