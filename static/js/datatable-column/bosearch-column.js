var UmsContentsColumnInSearch = {
  columns: [
    {data: "boCode"},
    {
      data: 'boCode'
    },
    {
      data: 'partName'
    }
  ],
  columnDefs: [{
    'targets': 0,
    'searchable': false,
    'orderable': false,
    'className': 'dt-body-center',
    'render': function (data, type, full, meta) {
      return '<div class="checkbox_center">'
          + '<input type="checkbox" class="search-dt-check-box" value="' + meta.row + '"/>'
          + '<label class="dt-check-box-label1" for="search-dt-check-box" ></label>'
          + '</div>'
    }
  }]
}