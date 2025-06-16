var UmsDataTablePopupNew = {
  perPage: 10,
  currentPage: 1,
  endPage: 0,
  lastPage: 0,
  startPage: 0,
  dataTable: null,

  initDataTable: function (targetId, searchUrl, requestParam, columns,
      columnDefs, callback) {
	this.targetId = targetId;
	UmsDataTablePopupNew.dataTable = $('#' + targetId).DataTable({
    	"ajax": {
            "url": searchUrl,
            "data": requestParam,
            "error":function (xhr,error,code) {
            		if (xhr.responseJSON) {
		            	var errorMsg = xhr.responseJSON.message == null ? "" : xhr.responseJSON.message;
		            	var errorCd = xhr.responseJSON.code == null ? "" : xhr.responseJSON.code;
		            	sweet.alert("요청 중 에러 발생, 에러 메시지=["+errorMsg+"], 에러코드=["+errorCd+"], 관리자에게 문의 바랍니다.");
		            	location.reload();
            		}
            		$(".dataTables_processing").hide();
            	}
          },
          "bDestroy":
              true, 
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
          "autoWidth": 
        	  false,
          "ordering": false,
          "language":
              {
                'loadingRecords': '&nbsp;',
                'processing': '<div style="height:250px;z-index:99999;"><img src="/static/images/Loading.gif"></div>',
                "emptyTable":
                	  '<div class="table-no-search border-none pdd-btm-75 pdd-top-75">' 
                	+ '	<p>검색 결과가 없습니다.</p>' 
                	+ '  <button type="button" class="btn btn-reset" id="btn-reset">목록 보기</button>' 
                	+ '</div>'
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
                  UmsDataTablePopupNew.endPage = tableJson.endPage;
                  UmsDataTablePopupNew.lastPage = tableJson.lastPage;
                  UmsDataTablePopupNew.startPage = tableJson.startPage;
                  UmsDataTablePopupNew.currentPage = tableJson.currentPage;
                  $("[id=popTotalCnt]").text($.number(tableJson.totalRecords));

                  var totalCount=tableJson.totalRecords;
                  if(totalCount == 0){
                	  tableJson.startPage = 1;
                	  tableJson.lastPage = 1;
                	  tableJson.endPage = 1;
                	  UmsDataTablePopupNew.endPage = 1;
                	  UmsDataTablePopupNew.lastPage = 1;
                	  UmsDataTablePopupNew.startPage = 1;
                  }
                  
                  html += '<div class="dataTables_paginate paging_full_numbers">';
                  html += '<a class="paginate_button first disabled" data-dt-idx="0" tabindex="0" id="popFirstPage">'
                	  + '	<i class="fa fa-angle-double-left"></i>';
                  	  + '  </a>';
                  html += '<a class="paginate_button previous disabled" data-dt-idx="1" tabindex="0" id="popPrePage">'
                      + '	<i class="fa fa-angle-left"></i>'
                      + '  </a>';
                  html += '<span>';
                  for (i = tableJson.startPage; i <= tableJson.endPage; i++) {
                    if (tableJson.currentPage == i) {
                      html += '<a class="paginate_button current" data-dt-idx="2" tabindex="0">' + i + '</a>'
                    } else {
                      html += '<a class="paginate_button" id="popSearchpageBtn" data-dt-idx="3" tabindex="0">' + i
                          + "</a>"
                    }
                  }
                  html += "</span>";
                  html += '<a class="paginate_button next disabled" data-dt-idx="3" tabindex="0" id="popNextPage">'
                	  + '	<i class="fa fa-angle-right"></i>'
                	  + '  </a>';
                  html += '<a class="paginate_button last disabled" data-dt-idx="4" tabindex="0" id="popLastPage">'
                	  + '	<i class="fa fa-angle-double-right"></i>'
                	  + '  </a>'; 
                  html += "</div>";
                  $("#sendHistory_table_wrapper").find(".paginate-v2").html(html);
                  
                  if (callback != undefined) {
                	  callback();
                  }
                  
                }
              }
        }
    )
    ;
// html append event trigger
    $(document).on('click', '#popSearchpageBtn', function () {
    	UmsDataTablePopupNew.currentPage = $(this).text();
    	UmsDataTablePopupNew.reload();
    });

    $(document).on('click', '#popFirstPage', function () {
    	UmsDataTablePopupNew.currentPage = 1;
    	UmsDataTablePopupNew.reload();
    });

    $(document).on('click', '#popPrePage', function () {
//      UmsDataTable.currentPage = UmsDataTable.startPage - 1;
    	UmsDataTablePopupNew.currentPage = UmsDataTablePopupNew.currentPage - 1;
      if (UmsDataTablePopupNew.currentPage < 1) {
    	  UmsDataTablePopupNew.currentPage = 1;
      }
      UmsDataTablePopupNew.reload();
    });

    $(document).on('click', '#popLastPage', function () {
    	UmsDataTablePopupNew.currentPage = UmsDataTablePopupNew.lastPage;
    	UmsDataTablePopupNew.reload();
    });

    $(document).on('click', '#popNextPage', function () {
//      UmsDataTable.currentPage = UmsDataTable.endPage + 1;
    	UmsDataTablePopupNew.currentPage = UmsDataTablePopupNew.currentPage + 1;
      if (UmsDataTablePopupNew.currentPage > UmsDataTablePopupNew.lastPage) {
    	  UmsDataTablePopupNew.currentPage = UmsDataTablePopupNew.lastPage;
      }
      UmsDataTablePopupNew.reload();
    });
  },
  reload: function () {
	$("#"+this.targetId).find("#select-all").prop("checked", false);
	UmsDataTablePopupNew.dataTable.ajax.reload();
  }
}