var UmsAuthUserListColumn = {
		columns: [
			{"data":null}   
			, {"data": "partName"}
			, {"data": "emplId"}
			, {"data": "emplName"}
			, {"data": "positionCallName"}
		],
		columnDefs: [{
			targets: 0,
			orderable: false,
			className: 'select-checkbox',
			render: function (data, type, full, meta) {
				return '<label class="check-container">&nbsp;'
				     + '	<input type="checkbox"/>' 
				     + '	<span class="checkmark"></span>'
				     + '</label>'
			}
      }],
   select: {
	   style:    'multi',// os, multi
	   selector: 'td:first-child' // 'td:last-child' 
   },
}

var UmsAuthMgmtListColumn = {
		columns: [
			{"data":null}   
		    , {"data": "authId", render: $.fn.dataTable.render.text()} // 권한ID
		    , {"data": "authNm"}	// 권한명
	    ],
	    columnDefs: [{
	    		targets: 0,
				orderable: false,
				className: 'select-checkbox',
		        render: function (data, type, full, meta) {
		        	return '<label class="check-container">&nbsp;'
						 + '	<input type="checkbox"/>' 
						 + '	<span class="checkmark"></span>'
						 + '</label>'
		        }
	    }],
	   select: {
		   style:    'multi',// os, multi
		   selector: 'td:first-child' // 'td:last-child' 
	   },
}