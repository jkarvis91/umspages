var UmsContentsColumn = {
  columns: [
    {data: "emplId"},
    {data: 'regDt',
      "render":function (data, type, row) {
        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
      }
    },
    {
        data: 'emplId'
    },
    {
        data: 'emplName'
    },
    {
        data: 'emplIp'
    },
    {
        data: 'partName',
            "render": function (data, type, row) {
            return data == null ? '-' : data;
        }
    },
    {
        data: 'useYn',
        "render": function (data, type, row) {
            if(data==='Y'){
                return "사용"
            }else{
                return "미사용"
            }
        }
    },
    {
        data: null,
            "render": function (data, type, row) {
            return '<a href="javascript:" class="btn_small mod_btn" id="employee-'
            + row.emplId
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
          + '</div>'
    }
  }]
}