var UmsContentsColumn = {
  columns: [
    {data: "phone"},
    {data: "custName"},
    {data: null,
      "render":function (data, type, row) {
    	  var returnVal = "";
    	  
          if (row.cutOptionAll == "1") {
        	  returnVal = "전체";
          }
          if (returnVal.length == 0 && row.cutOptionAd == "1") {
        	  returnVal += "광고";
          } else if (returnVal.length > 0 && row.cutOptionAd == "1") {
        	  returnVal += "/광고";
          }

          if (returnVal.length == 0 && row.cutOptionCa == "1") {
        	  returnVal += "카드";
          } else if (returnVal.length > 0 && row.cutOptionCa == "1") {
              returnVal += "/카드";
          }

          if (returnVal.length == 0 && row.cutOptionYc == "1") {
              returnVal += "연체";
          } else if (returnVal.length > 0 && row.cutOptionYc == "1") {
              returnVal += "/연체";
          }
    	  
          return returnVal;
      }
    },
    {
        data: 'phone'
    },
    {
        data: 'emplName'
    },
    {
        data: 'cutDate'
    },
    {
        data: 'cutMemo'
    },
    {
        data: null,
            "render": function (data, type, row) {
            return '<a href="javascript:" class="btn_small mod_btn" id="smsUnsubscribe_'
            + row.phone
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
          + '<input type="checkbox" class="dt-check-box" value="' + data.replace(/-/g, '')
          + '"/>'
          + '                        <label class="dt-check-box-label" for="dt-check-box"></label>'
          + '</div>'
    }
  }]
}