var UmsNoticeColumn = {
  columns: [
    {data: "id"},
    {data: 'regDt',
      "render":function (data, type, row) {
        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
      }
    },
    {data: 'title',
      "render": function (data, type, row) {
        return data;
      }
    },
    {
      data: 'writer'
    },
    // TODO: 표시기간 컬럼을 몰라서 임시
    {
      data: 'disDate'
    },
    {
      data: null,
      "render": function (data, type, row) {
        return '<a href="javascript:" class="btn_small mod_btn" id="notice-'
            + row.id
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