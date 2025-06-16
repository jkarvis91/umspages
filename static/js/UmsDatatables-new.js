var UmsDataTableNew = function(){
	return {
		perPage: 10,
		currentPage: 1,
		endPage: 0,
		lastPage: 0,
		startPage: 0,
		dataTable: null,
		targetId: null,
		initDataTable: function (targetId, searchUrl, requestParam, columns,
				columnDefs, callback, options) {
			this.targetId = targetId;
			
			// 22.09.26 셀렉션 단일 선택 제어
			var selectMulti = 'multi';
			var scrollY = '';
			if(options && options.selectMulti) selectMulti = options.selectMulti;
			if(options && options.scrollY) scrollY = options.scrollY;
			
			this.dataTable = $('#' + targetId).DataTable({
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
				"bDestroy": true, 
				"processing": true,
				"scrollY": scrollY, // 그리드내 스크롤기능 추가
				"dataSrc": "data",
				"bPaginate": false,
				"bFilter": false, 
				"bInfo": false,
				"ordering": false, 
				"language": {
								'loadingRecords': '&nbsp;',
								'processing': '<div><img src="/static/images/Loading.gif"></div>',
								"emptyTable": '<div class="table-no-search border-none pdd-btm-75 pdd-top-75">' 
											  + '	<p>검색 결과가 없습니다.</p>' 
											  + '  <button type="button" class="btn btn-reset" id="'+ this.targetId +'_reset">목록 보기</button>' 
											  + '</div>'
				},
				'columns': columns,
				'columnDefs': columnDefs,
				'autoWidth': false,
				'select': {'style': selectMulti},
				"drawCallback": function (settings) {
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
						$paginate.html(html); //$(".paginate-v2").html(html);
						
						if (callback != undefined && callback != null) {
							callback(settings.json.data);
						}
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
		},
		reload: function () {
			$("#"+this.targetId).find("#select-all").prop("checked", false);
			this.dataTable.ajax.reload();
		}
	}
};