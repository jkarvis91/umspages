var UmsBranchStatisticsColumn = {
		columns: [
		  	{data: 'distHeader',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    {data: 'branchCode',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    {data: 'branchName',
	      "render": function (data, type, row) {
	        return data;
	      }
	    },
	    //{data: "rnum"},
	    {data: 'sms',
	      "render":function (data, type, row) {
	    	  return (""+data).replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
	      }
	    },
	    {data: 'lms',
	      "render":function (data, type, row) {
	    	  return (""+data).replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
	      }
	    },
	    {data: 'mms',
	      "render":function (data, type, row) {
	        return (""+data).replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
	      }
	    },
	    {data: 'fax',"type": "number", "class": "right",
	      "render":function (data, type, row) {
	        return 0;
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

var UmsChannelStatisticsColumn = {
		  columns: [
			  	{data: 'msgDstic',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },		  
		    {data: 'jobCode',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },
		    {data: 'jobName',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },
		    {data: 'successNumber',
		      "render":function (data, type, row) {
		    	  return (""+data).replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
		      }
		    },
		    {data: 'requestsNumber',
		      "render":function (data, type, row) {
		    	  return (""+data).replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
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

var UmsFailureStatisticsColumn = {
		  columns: [
			  	{data: 'msgDstic',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },
		    {data: 'failureCode',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },
		    {data: 'failureDesc',
		      "render": function (data, type, row) {
		        return data;
		      }
		    },
		    {data: 'failureNumber',
		      "render":function (data, type, row) {
		    	  return (""+data).replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
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
