var UmsCodeGroupColumn = {
		columns: [
		  	{data: 'cmmnCd'
	    },
	    {data: 'regYms',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    {data: 'cmmnCd',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    {data: 'inst',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    {data: 'useYn',
	      "render":function (data, type, row) {
	    	  if (data=='Y') {
	    		  return "사용";
	    	  }
	        return "미사용";
	      }
	    },
	    {data: null,
	        "render": function (data, type, row) {
	        return '<a href="javascript:" class="btn_small mod_btn" id="codegroup-'
	        + row.cmmnCd
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
	};

var UmsCodeColumn = {
		columns: [
		  	{data: ''
	    },
	    {data: 'regYms',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    {data: 'cmmnCd',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    {data: 'dsplyNm',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    {data: 'cdValue',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },
	    {data: 'useYn',
	      "render":function (data, type, row) {
	    	  if (data=='Y') {
	    		  return "사용";
	    	  }
	        return "미사용";
	      }
	    },
	    {data: null,
	        "render": function (data, type, row) {
	        return '<a href="javascript:" class="btn_small mod_btn" id="codegroup-'
	        + row.cmmnCd + '-' + row.dsplyNm
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
	          + '<input type="checkbox" class="dt-check-box" value="' + full.cmmnCd + '-' + full.dsplyNm
	          + '"/>'
	          + '                        <label class="dt-check-box-label" for="dt-check-box"></label>'
	          + '</div>'
	    }
	  }]
	};

var UmsJobCodeColumn = {
		  columns: [
			  {data: 'bzwkIdnfr'
			  },
			  	{data: 'bzwkNm',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },
		    {data: 'bzwkIdnfr',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },
		    {data: 'inptCmdCtnt',
		      "render": function (data, type, row) {
		    	  if(data.length >28){
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
		    },
		    {data: 'rspblDvsnName',
		      "render":function (data, type, row) {
		    	 return data;
		      }
		    },
		    {data: 'rspblPsnName',
		      "render":function (data, type, row) {
		        return data;
		      }
		    },
		    {data: 'sendDstic',
		      "render":function (data, type, row) {
		        return data;
		      }
		    },
		    {data: null,
		        "render": function (data, type, row) {
			        return '<a href="javascript:" class="btn_small mod_btn" id="jobcode-'
			        + row.bzwkIdnfr
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
		};
