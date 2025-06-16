/**
 * UMS dataTable ajax order 사용 
 * */

$.extend( $.fn.dataTableExt.oSort, {
	/* 빈값 string 정렬
		- 사용 방법 
			columnDefs = {
	      	      "targets": [4,6]
	  			    , type: 'non-empty-string' // 빈값 정렬이 안되는 타켓에 type 선언
	      	  		}
	      	   }, 
	*/
    "non-empty-string-asc": function (str1, str2) {
    	if(str1 == "" || str1 == "-" || str2 == "" || str2 =="-"){
        	return 1;
        }
        
        /* if(str1 == "" || str1 == "-"){
        	return 1;
        }
        if(str2 == "" || str2 =="-"){
        	return -1;
        }
        return ((str1 < str2) ? -1 : ((str1 > str2) ? 1 : 0)); */
    },
 
    "non-empty-string-desc": function (str1, str2) {    	
    	if(str1 == "" || str1 == "-" || str2 == "" || str2 =="-"){
    		return 1;
    	}
    	 
    	/* if(str1 == "" || str1 == "-"){
    		return -1;
    	}
    	if(str2 == "" || str2 =="-"){
    		return 1;
    	}
        return ((str1 < str2) ? 1 : ((str1 > str2) ? -1 : 0)); */
    },
    
} );

var UmsDataTableTemplate = function() {
	return {
		perPage: 10,
		currentPage: 1,
		endPage: 0,
		lastPage: 0,
		startPage: 0,
		dataTable: null,
		targetId: null,
		orderName : 'regDt',
		orderType : 'desc',
		columns : null,
		initDataTable: function (targetId, searchUrl, requestParam, columns,
				columnDefs, callback) {
			this.targetId = targetId;
			this.columns = columns;
			this.dataTable = $('#' + targetId).DataTable({
				"ajax": {
					"url": searchUrl,
					"data": requestParam,
					// "dataSrc": success 옵션에서는 변경 불가,  DataTable이 서버에서 반환된 값을 읽어 변경하거나 다음으로 조작하는 기능을 제공하는 추가옵션
					//"dataSrc": "data",
					"error":function (xhr,error,code) {
						if (xhr.responseJSON) {
							var errorMsg = xhr.responseJSON.message == null ? "" : xhr.responseJSON.message;
							var errorCd = xhr.responseJSON.code == null ? "" : xhr.responseJSON.code;
							//sweet.alert("에러 메시지=["+errorMsg+"], 에러코드=["+errorCd+"], 관리자에게 문의 바랍니다.");
							sweet.alert("요청 중 에러 발생, 에러 메시지=["+errorMsg+"], 에러코드=["+errorCd+"], 관리자에게 문의 바랍니다.");
							//location.reload();
						}
						$(".dataTables_processing").hide();
					},
				},
				"bDestroy": true,  //--
				"processing": true,
				"dataSrc": "data", // --
				"bPaginate": false, // --
				//"paging": true,
				"bFilter": false,
				"bInfo": false,
				//"bSortable":true,
				"ordering": true,
				"language":
				{
					'loadingRecords': '&nbsp;',
					'processing': '<div><img src="/static/images/Loading.gif"></div>',
					"emptyTable":
						'<div class="table-no-search border-none pdd-btm-100 pdd-top-100">' 
						+ '	<p>검색 결과가 없습니다.</p>' 
						+ '  <button class="btn btn-reset"id="'+ this.targetId +'_reset">목록 보기</button>' 
						+ '</div>'
				}
				,
				'columns': columns,
				'columnDefs': columnDefs,
				'autoWidth': false,
				"drawCallback": function (settings) {
					$('table thead th').removeClass('text-left');
					
					var html = '';
					if (settings.json) {
						var tableJson = settings.json;
						_this.endPage = tableJson.endPage;
						_this.lastPage = tableJson.lastPage;
						_this.startPage = tableJson.startPage;
						_this.currentPage = tableJson.currentPage;
						$("#" + targetId +"_total_cnt").text($.number(tableJson.totalRecords));
						
						var $paginate = $("#" + targetId + "_wrapper .paginate-v2")
						var totalCount=tableJson.totalRecords;
						if(totalCount == 0){
							tableJson.startPage = 1;
							tableJson.lastPage = 1;
							tableJson.endPage = 1;
							_this.endPage = 1;
							_this.lastPage = 1;
							_this.startPage = 1;
							
							$paginate.hide();
						} else {
							$paginate.show();
						}
						
						html += '<div class="dataTables_paginate paging_full_numbers">';
						html += '<a class="paginate_button first disabled" data-dt-idx="0" tabindex="0" id="'+ targetId +'_first_page">'
							+ '	<i class="fa fa-angle-double-left"></i>';
						+ '  </a>';
						html += '<a class="paginate_button previous disabled" data-dt-idx="1" tabindex="0" id="'+ targetId +'_pre_page">'
							+ '	<i class="fa fa-angle-left"></i>'
							+ '  </a>';
						html += '<span>';
						for (i = tableJson.startPage; i <= tableJson.endPage; i++) {
							if (tableJson.currentPage == i) {
								html += '<a class="paginate_button current" data-dt-idx="2" tabindex="0">' + i + '</a>'
							} else {
								html += '<a class="paginate_button " id="'+ targetId +'_page_btn" data-dt-idx="3" tabindex="0">' + i
								+ "</a>"
							}   
						}
						html += "</span>";
						html += '<a class="paginate_button next disabled" data-dt-idx="3" tabindex="0" id="'+ targetId +'_next_page">'
							+ '	<i class="fa fa-angle-right"></i>'
							+ '  </a>';
						html += '<a class="paginate_button last disabled" data-dt-idx="4" tabindex="0" id="'+ targetId +'_last_page">'
							+ '	<i class="fa fa-angle-double-right"></i>'
							+ '  </a>'; 
						html += "</div>";
						//$("#pagination").html(html);
						$paginate.html(html);
						
						if (callback != undefined) {
							callback(settings.json.data);
						}
						
					} else {
						
					}
				}
			});
			
			var _this = this;
			// html append event trigger
			$(document).on('click', '#' + _this.targetId + '_page_btn', function () {
				_this.currentPage = $(this).text();
				_this.reload();
			});
			
			$(document).on('click', '#' + _this.targetId + '_first_page', function () {
				_this.currentPage = 1;
				_this.reload();
			});
			
			$(document).on('click', '#' + _this.targetId + '_pre_page', function () {
				_this.currentPage = _this.currentPage - 1;
				if (_this.currentPage < 1) {
					_this.currentPage = 1;
				}
				_this.reload();
			});
			
			$(document).on('click', '#' + _this.targetId + '_last_page', function () {
				_this.currentPage = _this.lastPage;
				_this.reload();
			});
			
			$(document).on('click', '#' + _this.targetId + '_next_page', function () {
				_this.currentPage = _this.currentPage + 1;
				if (_this.currentPage > _this.lastPage) {
					_this.currentPage = _this.lastPage;
				}
				_this.reload();
			});
			
			$(document).on('change', '#' + _this.targetId + '_per_page', function () {
				_this.perPage = $(this).val();
				_this.currentPage = 1;
				_this.reload();
			});
			
			_this.dataTable.on('order.dt', function ( e, settings, ordArr ) {
//				var index = ordArr[0].col;
//				_this.orderType = ordArr[0].dir;
//				_this.orderName  = settings.aoColumns[index].data;
				
				// 순번 넘버링
				let num = _this.currentPage;
				let perPageVal = $('#' + _this.targetId + '_per_page').val();
				if(num != 1) {
					num = ( (Number(_this.currentPage) -1)  * perPageVal ) + 1;
				}
				_this.dataTable.cells(null, 0, { search: 'applied', order: 'applied' }).every(function (cell) {
		            this.data(num++);
		        });
			});
			
			$('#' + _this.targetId).on('click','th',function(e) {
				if(e.currentTarget.className.indexOf('sorting_disabled') != -1) return;
				// 정렬 정보 셋팅 후 서버로부터 결과값 받아오기
				_this.currentPage = 1;
				var thClassName = e.target.closest('th').className.split('_')[1] || 'desc';
				var index = _this.dataTable.column(this).index();
				_this.orderName = _this.columns[index].data;
				_this.orderType = thClassName == 'desc' ? 'asc': 'desc';
				_this.reload();
			})
			
		},
		reload: function () {
			this.dataTable.ajax.reload();
		}
	}
}