var UmsDataTable = {
  perPage: 10,
  currentPage: 1,
  endPage: 0,
  lastPage: 0,
  startPage: 0,
  dataTable: null,

  initDataTable: function (targetId, searchUrl, requestParam, columns,
      columnDefs, callback) {
	this.targetId = targetId;
    UmsDataTable.dataTable = $('#' + targetId).DataTable({
    	"ajax": {
            "url": searchUrl,
            "data": requestParam,
            "error":function (xhr,error,code) {
            		if (xhr.responseJSON) {
		            	var errorMsg = xhr.responseJSON.message == null ? "" : xhr.responseJSON.message;
		            	var errorCd = xhr.responseJSON.code == null ? "" : xhr.responseJSON.code;
		            	showAlert("요청 중 에러 발생, 에러 메시지=["+errorMsg+"], 에러코드=["+errorCd+"], 관리자에게 문의 바랍니다.");
		            	location.reload();
            		}
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
          "ordering": false,
          "language":
              {
                'loadingRecords': '&nbsp;',
                'processing': '<div style="height:250px;z-index:99999;"><img src="/static/images/Loading.gif"></div>',
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
                  UmsDataTable.endPage = tableJson.endPage;
                  UmsDataTable.lastPage = tableJson.lastPage;
                  UmsDataTable.startPage = tableJson.startPage;
                  UmsDataTable.currentPage = tableJson.currentPage;
                  $("[id=total_cnt]").text($.number(tableJson.totalRecords));

                  var totalCount=tableJson.totalRecords;
                  if(totalCount == 0){
                	  tableJson.startPage = 1;
                	  tableJson.lastPage = 1;
                	  tableJson.endPage = 1;
                      UmsDataTable.endPage = 1;
                      UmsDataTable.lastPage = 1;
                      UmsDataTable.startPage = 1;
                  }
                  
            	  html += '<a href="javascript:;">'
                      + '    <img src="/static/images/btn_pg_first.png" id="first-page" alt="첫 페이지"/>'
                      + '  </a>';
                  html += '<a href="javascript:;">'
                      + '    <img src="/static/images/btn_pg_previous.png" id="pre-page" alt="이전 페이지"/>'
                      + '  </a>';
                  html += '<span class="wrap">';
                  for (i = tableJson.startPage; i <= tableJson.endPage; i++) {
                    if (tableJson.currentPage == i) {
                      html += '<a href="#" class="on">' + i + '</a>'
                    } else {
                      html += "<a href='javascript:;' class='page-btn' id='searchpage-btn'>" + i
                          + "</a>"
                    }
                  }
                  html += "</span>";

                  html += '<a href="javascript:;">'
                      + '     <img src="/static/images/btn_pg_next.png" id="next-page"'
                      + 'alt = "다음 페이지" / > '
                      + '</a>';
                  html += '<a href="javascript:;">\n'
                      + '        <img src="/static/images/btn_pg_last.png" id="last-page"\n'
                      + '        alt="마지막 페이지"/>\n'
                      + '        </a>';
                  $("#pagination").html(html);
                  
                  if (callback != undefined) {
                	  callback();
                  }
                  
                }
              }
        }
    )
    ;
// html append event trigger
    $(document).on('click', '#searchpage-btn', function () {
      UmsDataTable.currentPage = $(this).text();
      UmsDataTable.reload();
    });

    $(document).on('click', '#first-page', function () {
      UmsDataTable.currentPage = 1;
      UmsDataTable.reload();
    });

    $(document).on('click', '#pre-page', function () {
//      UmsDataTable.currentPage = UmsDataTable.startPage - 1;
    	UmsDataTable.currentPage = UmsDataTable.currentPage - 1;
      if (UmsDataTable.currentPage < 1) {
        UmsDataTable.currentPage = 1;
      }
      UmsDataTable.reload();
    });

    $(document).on('click', '#last-page', function () {
      UmsDataTable.currentPage = UmsDataTable.lastPage;
      UmsDataTable.reload();
    });

    $(document).on('click', '#next-page', function () {
//      UmsDataTable.currentPage = UmsDataTable.endPage + 1;
      UmsDataTable.currentPage = UmsDataTable.currentPage + 1;
      if (UmsDataTable.currentPage > UmsDataTable.lastPage) {
        UmsDataTable.currentPage = UmsDataTable.lastPage;
      }
      UmsDataTable.reload();
    });
  },
  reload: function () {
	$("#"+this.targetId).find("#select-all").prop("checked", false);
    UmsDataTable.dataTable.ajax.reload();
  }
}