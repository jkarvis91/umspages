var UmsDataTable4 = {
  perPage: 10,
  currentPage: 1,
  endPage: 0,
  lastPage: 0,
  startPage: 0,
  dataTable: null,

  initDataTable: function (targetId, searchUrl, requestParam, columns,
      columnDefs, options) {
	var default_options = {
		"ajax": {
            "url": searchUrl,
            "data": requestParam,
            "error" : function(request,status,error){
            	//console.log(request);
            	showAlert("요청 중 에러 발생<br><br>에러 메시지<br>["+request.responseJSON.message+"]<br>에러코드<br>["+request.status+"]<br>관리자에게 문의 바랍니다.<br><br>error<br>"+request.responseText);
            }
          },
          "processing":
              true,
          "dataSrc":
              "data",
          "bPaginate":
              false,
          "bFilter":
              false,
          "bInfo":
              false,
          "language":
              {
                'loadingRecords': '&nbsp;',
                'processing': '<div style="height:250px"><img src="/static/images/Loading.gif"></div>',
                "emptyTable":
                    "<div style='height:150px;margin-top:50px'>조회 목록이 없습니다.</div>",
              }
          ,
          'columns': columns,
          'columnDefs': columnDefs,
          select:
              {
                'style':
                    'multi'
              }
          ,
          "drawCallback":
              function (settings) {
                var html = '';
                if (settings.json) {
                  var tableJson = settings.json;
                  UmsDataTable4.endPage = tableJson.endPage;
                  UmsDataTable4.lastPage = tableJson.lastPage;
                  UmsDataTable4.startPage = tableJson.startPage;
                  UmsDataTable4.currentPage = tableJson.currentPage;
                  $("#total_cnt2").text($.number(tableJson.totalRecords));
                  var totalCount=tableJson.totalRecords;
                  
                  if(totalCount == 0){
                	  tableJson.startPage = 1;
                	  tableJson.lastPage = 1;
                	  tableJson.endPage = 1;
                      UmsDataTable4.endPage = 1;
                      UmsDataTable4.lastPage = 1;
                      UmsDataTable4.startPage = 1;
                  }
                  
                  html += '<a href="javascript:;">'
                      + '    <img src="/static/images/btn_pg_first.png" id="first-page2" alt="첫 페이지"/>'
                      + '  </a>';
                  html += '<a href="javascript:;">'
                      + '    <img src="/static/images/btn_pg_previous.png" id="pre-page2" alt="이전 페이지"/>'
                      + '  </a>';
                  html += '<span class="wrap">';
                  for (i = tableJson.startPage; i <= tableJson.endPage; i++) {
                    if (tableJson.currentPage == i) {
                      html += '<a href="#" class="on">' + i + '</a>'
                    } else {
                      html += "<a href='javascript:;' class='page-btn' id='searchpage-btn2'>" + i
                          + "</a>"
                    }
                  }
                  html += "</span>";

                  html += '<a href="javascript:;">'
                      + '     <img src="/static/images/btn_pg_next.png" id="next-page2"'
                      + 'alt = "다음 페이지" / > '
                      + '</a>';
                  html += '<a href="javascript:;">\n'
                      + '        <img src="/static/images/btn_pg_last.png" id="last-page2"\n'
                      + '        alt="마지막 페이지"/>\n'
                      + '        </a>';
                  $("#pagination2").html(html);
                  
                }
              }
	};
	
	var set_options = {};
	$.extend(true, set_options, default_options, options);
	console.log(set_options);
	
    UmsDataTable4.dataTable = $('#' + targetId).DataTable(set_options);
    
// html append event trigger
    $(document).on('click', '#searchpage-btn2', function () {
      UmsDataTable4.currentPage = $(this).text();
      UmsDataTable4.reload();
    });

    $(document).on('click', '#first-page2', function () {
      UmsDataTable4.currentPage = 1;
      UmsDataTable4.reload();
    });

    $(document).on('click', '#pre-page2', function () {
      UmsDataTable4.currentPage = UmsDataTable4.startPage - 1;
      if (UmsDataTable4.currentPage < 1) {
        UmsDataTable4.currentPage = 1;
      }
      UmsDataTable4.reload();
    });

    $(document).on('click', '#last-page2', function () {
      UmsDataTable4.currentPage = UmsDataTable4.lastPage;
      UmsDataTable4.reload();
    });

    $(document).on('click', '#next-page2', function () {
      UmsDataTable4.currentPage = UmsDataTable4.endPage + 1;
      if (UmsDataTable4.currentPage > UmsDataTable4.lastPage) {
        UmsDataTable4.currentPage = UmsDataTable4.lastPage;
      }
      UmsDataTable4.reload();
    });
  },
  reload: function () {
    UmsDataTable4.dataTable.ajax.reload();
  }
}