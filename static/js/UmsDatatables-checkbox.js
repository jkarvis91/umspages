/**
 * ★★★★★ 사용전 꼭 읽어주세요 ★★★★★
 * UMS dataTableCheckbox 경우 
 * 0. js, css 추가
 	<script type="text/javascript" src="/static/js/dataTables.select.min.js"></script>
	<link rel="stylesheet" type="text/css" href="/static/css/select.dataTables.min.css">
 * 1.table thead th checkbox 추가
 	- <th><input type="checkbox" id="select_all"></th>
 * 2. UmsAuthMgmtListColumn.select option 변경
  	- 기본 설정
 	  : multi, 테이블 내용은 td:first-child 위치
 * 3. ums checkbox 디자인으로 적용하기 위한 작업
  	- 기본 디자인 숨기기
  		table.dataTable tr.selected td.select-checkbox:after, table.dataTable tr.selected th.select-checkbox:after {font-size:0; background: transparent;}
 * 4. select data 확인
   		ex) UmsDataTableCheckBox.dataTable.select().rows('.selected').data()
 * */
var UmsDataTableCheckBox = function(){
	return {
		 perPage: 999999,
		  currentPage: 1,
		  endPage: 0,
		  lastPage: 0,
		  startPage: 0,
		  isPaging : true,
		  dataTable: null,
		  initDataTable: function (targetId, searchUrl, requestParam, columns,
		      columnDefs, select, callback) {
			this.targetId = targetId;
			this.dataTable = $('#' + targetId).DataTable({
		    	"ajax": {
		            "url": searchUrl,
		            "data": requestParam,
		            "error":function (xhr,error,code) {
		        		if (xhr.responseJSON) {
			            	var errorMsg = xhr.responseJSON.message == null ? "" : xhr.responseJSON.message;
			            	var errorCd = xhr.responseJSON.code == null ? "" : xhr.responseJSON.code;
			            	sweet.alert("에러 메시지=["+errorMsg+"], 에러코드=["+errorCd+"], 관리자에게 문의 바랍니다.");
			            	//showAlert("요청 중 에러 발생, 에러 메시지=["+errorMsg+"], 에러코드=["+errorCd+"], 관리자에게 문의 바랍니다.");
			            	location.reload();
		        		}
		        		//$(".dataTables_processing").hide();
		        	},
		          },
		          "processing": true,
		          // "bPaginate": true,
		          "paging": this.isPaging,
		          "scrollCollapse": !this.isPaging,
		          //"scroller":!this.isPaging,
		          "scrollY": this.isPaging ? '':'441px',
		          "bFilter": false,
		          "bInfo": false,
		          "ordering": true,
		          "language":
		              {
		                'loadingRecords': '&nbsp;',
		                'processing': '<div><img src="/static/images/Loading.gif"></div>',
		                "emptyTable":
		                	'<div class="table-no-search border-none pdd-btm-100 pdd-top-100">' 
		                	+ '	<p>검색 결과가 없습니다.</p>' 
		                	+ '  <button class="btn btn-reset" id="'+ this.targetId +'_reset">목록 보기</button>' 
		                	+ '</div>'
		              }
		          ,
		          'columns': columns,
		          'columnDefs': columnDefs,
		          'initComplete' : function(settings, json) {
		        	  /** 1) select_all 첫번째 함수 : Datatable > select "data" 기능 처리 */
		        	  var $targetSelectAll = '';
		        	  if(_this.isPaging) {
		        		  // paging 경우
		        		  $targetSelectAll = "#" + targetId + "_select_all"
		        	  } else {
		        		// scroll일 경우 scrollHead, scrollBody 두곳에서  thead > td > select_all 만들어져 2개가 조회됨 ==> 그러므로 디테일하고 명시
		        		  var $targetSelectAll = $('#' + _this.targetId + '_wrapper .dataTables_scrollHead input[name="select_all"]')
		        	  }
		        	  
		        	  $($targetSelectAll).prop("checked",false);
	        		  $($targetSelectAll).click(function(){
	        			  if($(this).parent().find('input').prop("checked")){ // $(this).prop("checked")
	        				  _this.dataTable.rows({page: 'current'}).select(); // 현재 페이지만 선택할 경우
	        				  //_this.dataTable.rows().select(); // 전체 데이터 선택할 경우
	        			  }
	        			  else {
	        				  _this.dataTable.rows({page: 'current'}).deselect(); // 현재 페이지만 선택할 경우
	        				  //_this.dataTable.rows().deselect(); // 전체 데이터 선택할 경우
	        			  }
	        			  
	        		  });
			      },
			      'select': select || {
			    	  style:    'multi',// os, multi
			    	  selector: 'td:first-child' // 'td:last-child'
			      },
		          "drawCallback":  function (settings) {
		                var html = '';
		                if (settings.json) {
		                  var tableJson = settings.json;
		                  _this.endPage = tableJson.endPage;
		                  _this.lastPage = tableJson.lastPage;
		                  _this.startPage = tableJson.startPage;
		                  _this.currentPage = tableJson.currentPage;
		                  $("#" +targetId+ "_total_cnt").text($.number(tableJson.totalRecords));

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
		                  if(_this.isPaging == true) {
			                  html += '<div class="dataTables_paginate paging_full_numbers">';
			                  html += '<a class="paginate_button first disabled" data-dt-idx="0" tabindex="0" id="first-page">'
			                	  + '	<i class="fa fa-angle-double-left"></i>';
			                  	  + '  </a>';
			                  html += '<a class="paginate_button previous disabled" data-dt-idx="1" tabindex="0" id="pre-page">'
			                      + '	<i class="fa fa-angle-left"></i>'
			                      + '  </a>';
			                  html += '<span>';
			                  for (i = tableJson.startPage; i <= tableJson.endPage; i++) {
			                    if (tableJson.currentPage == i) {
			                      html += '<a class="paginate_button current" data-dt-idx="2" tabindex="0">' + i + '</a>'
			                    } else {
			                      html += '<a class="paginate_button " id="searchpage-btn" data-dt-idx="3" tabindex="0">' + i
			                          + "</a>"
			                    }
			                  }
			                  html += "</span>";
			                  html += '<a class="paginate_button next disabled" data-dt-idx="3" tabindex="0" id="next-page">'
			                	  + '	<i class="fa fa-angle-right"></i>'
			                	  + '  </a>';
			                  html += '<a class="paginate_button last disabled" data-dt-idx="4" tabindex="0" id="last-page">'
			                	  + '	<i class="fa fa-angle-double-right"></i>'
			                	  + '  </a>'; 
			                  html += "</div>";
			                  $("#pagination").html(html); // 전체 조회하여 datatable에서 페이징 처리할때
		                  
		                	  //$paginate.html(html);//$("#" + _this.targetId + "_wrapper .paginate-v2").html(html); // 서버로 부터 갯수만큼 조회할때  
		                  }
		                  
		                  if (callback != undefined) {
		                	  callback(settings.json.data);
		                  }
		                  
		                } else {
		                	
		                }
		              }
		        }
		    );
			var _this = this;

			$(document).on('change', '#' + _this.targetId + '_per_page', function() {
				_this.dataTable.page.len( $(this).val() ).draw(); 
			});
			
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
		    
		        
		    /* 전체 데이터 선택시 */
			/*_this.dataTable
		        .on( 'select', function ( e, dt, type, indexes ) {
		        	// checkbox
		        	_this.dataTable[ type ]( indexes ).nodes().to$().find('input[type=checkbox]').prop('checked', true)
		        } )
		        .on( 'deselect', function ( e, dt, type, indexes ) {
		        	// No checkbox
		        	_this.dataTable[ type ]( indexes ).nodes().to$().find('input[type=checkbox]').prop('checked', false)
		        } )
			*/
			
		    /* 전체 데이터 선택할 경우 - table tbody checkbox click event */
			   /* $('#'+this.targetId +' tbody').on('click', 'input[type="checkbox"]', function(e){
			    	var $row = $(this).closest('tr');
			    	
		    		var $chkbox_all        = _this.dataTable.$('tr');
		    		var $chkbox_checked    = _this.dataTable.$('tr.selected')
		    		var chkbox_select_all  = _this.isPaging == true ? $('#' + _this.targetId +' input[name="select_all"]') : $('#' + _this.targetId + '_wrapper .dataTables_scrollHead input[name="select_all"]');
		    		
		    		var isCheck = false;
			    	if($row.attr('class').indexOf('selected') > 0) {
			    		//체크된경우
			    		if($chkbox_checked.length === $chkbox_all.length) {
			    			isCheck = true;
			    		}
			    	}
			    	chkbox_select_all.prop("checked", isCheck);
			    	$row.find('input[type=checkbox]').prop("checked", isCheck);
			       e.stopPropagation();
			    });*/
			
			
			/* 현재 데이터만 선택할 경우 */
			_this.dataTable
		        .on( 'select', function ( e, dt, type, indexes ) {
		        	// checkbox
		        	_this.dataTable[ type ]( indexes ).nodes().to$().find('input[type=checkbox]').prop('checked', true)
		        } )
		        .on( 'deselect', function ( e, dt, type, indexes ) {
		        	// No checkbox
		        	_this.dataTable[ type ]( indexes ).nodes().to$().find('input[type=checkbox]').prop('checked', false)
		        } )
		        
		     /* 현제 데이터만 선택할 경우 - table tbody checkbox click event    */
	          $('#'+this.targetId +' tbody').on('click', 'input[type="checkbox"]', function(e){
	        	  
	        	  $(e.target).prop('checked', !this.checked);
	        	  
	        	  updateDataTableSelectAllCtrl(_this.dataTable);
	        	  
	        	  e.stopPropagation();
		    }); 
			
			/* 현제 데이터만 선택할 경우    */
			// Handle table draw event
			_this.dataTable.on('draw', function(){
		    	if($('#' + _this.targetId + ' thead input[name="select_all"]').length > 0) {
		    		// select 초기화 - 모든 checkbox no-checked로 변경
		    		$('input[type=checkbox]').prop('checked', false)
		    		_this.dataTable.rows().deselect();
		    		
		    		// Update state of "Select all" control
		    		updateDataTableSelectAllCtrl(_this.dataTable); // 현재 데이터만 선택할 경우 필요없음.
		    	}
		    });
		        
		 // Handle click on "Select all" control
		    $('#' + _this.targetId + ' thead input[name="select_all"]', _this.dataTable.table().container()).on('click', function(e){
		    	var rows = _this.dataTable.rows({page: 'current'}).nodes(); // 현재 데이터만 선택할 경우
		    	//var rows = _this.dataTable.rows({ 'search': 'applied' }).nodes(); // 전체 데이터 선택할 경우
		    	
			   // Check/uncheck checkboxes for all rows in the table
			   $('input[type="checkbox"]', rows).prop('checked', this.checked);
		    });
		    
		    // scroll일 경우
		    $('#' + _this.targetId + '_wrapper .dataTables_scrollHead input[name="select_all"]').on('click', function(e){
		    	var rows = _this.dataTable.rows({page: 'current'}).nodes(); // 현재 데이터만 선택할 경우
		    	//var rows = _this.dataTable.rows({ 'search': 'applied' }).nodes(); // 전체 데이터 선택할 경우
		    	
			   // Check/uncheck checkboxes for all rows in the table
			   $('input[type="checkbox"]', rows).prop('checked', this.checked);
		    });
		    
		  },
		  reload: function () {
			  if(this.isPaging) {
				  // paging일 경우
				  $("#"+this.targetId + "_select_all").prop("checked", false);
			  } else {
				  // scroll일 경우 scrollHead, scrollBody 두곳에서  thead > td > select_all 만들어져 2개가 조회됨 ==> 그러므로 디테일하고 명시
				  $('#'+this.targetId + '_wrapper .dataTables_scrollHead input[name="select_all"]').prop("checked", false);
			  }
			
			this.dataTable.ajax.reload();
		  }
	}
 
}

/** Select All 체크 */
function updateDataTableSelectAllCtrl(table){
	   var $table             = table.table().node();
	   var tgtId              = $($table).attr("id");
	   var $chkbox_all        = $('tbody input[type="checkbox"]', $table);
	   var $chkbox_checked    = $('tbody input[type="checkbox"]:checked', $table);
	   var $chkbox_select_all = $('#' + tgtId + '_select_all');
	   
	   $chkbox_select_all.prop("checked", false);
	   if ($chkbox_checked.length === $chkbox_all.length && $chkbox_all.length != 0 ){
		   $chkbox_select_all.prop("checked", true);
	   }
	}
