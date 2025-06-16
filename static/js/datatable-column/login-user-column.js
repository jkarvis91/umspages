var UmsContentsColumn = {
  columns: [
	{data: "LOGIN_ID"},
	{data: "LOGIN_ID"},
    {data: "EMPL_ID"},
    {data: "EMPL_LEVEL",
    	"render":function (data, type, row) {
            if(data=="A"){
            	return"관리자";
            }else if(data=="G"){
            	return"경조사";
            }else if(data=="M"){
            	return"발송모니터링";
            }else if(data=="C"){
            	return"발송분배비율";
            }
            return "확인요망";
          }
    },
    {data: "USE_YN"},
    {data: 'REG_DT',
      "render":function (data, type, row) {
        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD");
      }
    },
    {data: 'LOGIN_DT',
        "render":function (data, type, row) {
          if(data==null)	return"기록없음";
          return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD");
        }
    },

     {
         data: null,
             "render": function (data, type, row) {
             return '<a href="javascript:" class="btn_small mod_btn" id="'
             + row.LOGIN_ID
             + '">수정</a>';
         }
     }
  ],
  columnDefs: [{
    'targets': 0,
    'searchable': false,
    'orderable': false,
    'className': 'dt-body-center',
    'render': function (data, type, full, meta) {
      return '<div class="checkbox_center">'
          + '<input type="checkbox" class="dt-check-box" value="' + data
          + '"/>'
          + '                        <label class="dt-check-box-label" for="dt-check-box"></label>'
          + '</div>';
    }
  }
  ]
}