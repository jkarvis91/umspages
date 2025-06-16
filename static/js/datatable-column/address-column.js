var UmsAddressColumn = {
  columns: [
    {data: "grpSeq"
    },
    {data: 'groupName'
    },
    {
      data: 'groupNote'
    },
    {
      data: 'owner'
    },
    // TODO: 표시기간 컬럼을 몰라서 임시
    {
      data: 'groupShareYn',
      "render": function (data, type, row) {
    	  //console.log("공유여부:"+data);
    	  if(data=='1')data="공유";
    	  else data="개인";
          return data;
        }
    },
    {
        data: 'emplId'
     },
  ],
  columnDefs: [{
    'targets': 0,
    'searchable': false,
    'orderable': false,
    'className': 'dt-body-center',
    'render': function (data, type, full, meta) {
      return '<div class="checkbox_center">'
          + '<input type="checkbox" class="dt-check-box" name="grpSeq-Ck" value="' + data
          + '"/>'
          + '                        <label class="dt-check-box-label" for="dt-check-box"></label>'
          + '</div>'
    }
  },
  {		
	    'targets': 1,
	    'searchable': false,
	    'orderable': false,
	    'render': function (data, type, full, meta) {
	      return '<a href="/contact-list.do?emplId='+full.emplId+'&grpSeq='+full.grpSeq+'">'+full.groupName+'</a>'+"("+full.contactCount+")";
	    }
	  },{
          "targets": 5,
          "visible": false,
          "searchable": false
		}
  ]
}