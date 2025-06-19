/* 전역 변수 선언 */
var btnTargetId = '';

var commonFunc = commonFunc();
var rcsFunc = rcsFunc();
var brandFunc = brandFunc();
var chatbotFunc = chatbotFunc();
var alimFunc = alimFunc();

var detaildetailDialogId = null;
var dataTableGrid = '';

var rcsInfo;

/*	begin (공통) RCS, 알림톡  	*/ 
function commonFunc() {
	
	function initTableOrder() {
		// (공통) - 페이지당 건수 변경 이벤트
		/*$('#pageSize').change(	function() {
			UmsDataTableTemplate.dataTable.page.len(
					$(this).val()).draw();
		});
		*/
		// (공통) - 목록 순번 처리 ( 모든 데이터 가져올 경우만 가능)
		/*UmsDataTableTemplate.dataTable.on('order.dt search.dt',  function() {
			UmsDataTableTemplate.dataTable.column(0, {
				search : 'applied',
				order : 'applied'
			}).nodes().each(function(cell, i) {
				cell.innerHTML = i + 1;
			});
		}).draw();  */
	};
	
	// dialog 상세화면시 레이아웃 처리
	function changeDetailLayout() {
		var _detailDialogId = '#' + detailDialogId;
		
		// 버튼 노출 간격 조절
		$( _detailDialogId +' .mrg-top-20').removeClass('mrg-top-20');
		$( _detailDialogId +' .rcsBtnEl').removeClass('mrg-btm-10')
		// 버튼 글자 count 삭제
		$( _detailDialogId +' .text-right.color-gray').hide();
		// 상세화면 input, select 입력 제어
		$( _detailDialogId + ' input').attr('readonly', true);
		$( _detailDialogId + ' select').prop('disabled',true);
		
		$( _detailDialogId + ' input').attr("placeholder", "");
	};
	
	/* (공통) - 그리드 reload */
	function search() {
		dataTableGrid.currentPage = 1;
		dataTableGrid.reload();
	};
	
	/* (공통) - 초기화 클릭 이벤트 */
	function reset() {
		$('.search_field select').each(function() {
			// 첫번째 option 선택
			$(this).children('option:eq(0)').prop("selected", true);
		});
		
		// RCS만 해당
		$('select[name=bizServiceType]').attr("disabled", true);
		
		$('#searchWord').val('');
		// 변경된 검색조건으로 그리드 조회
		commonFunc.search();
	};
	/* (공통 ) - popup row html 생성 */
	function makeRowHtml(title, data1, data2, dataClass) {
		var html = '	<div class="preview-form-left">';
		html 	+= '		<h3 class="pdd-top-4">' + title + '</h3>';
		html 	+= '	</div>';	  
		html 	+= '	<div class="preview-form-right pdd-top-4 '+ dataClass +'">' + data1 + (data2 == null ? '' : ' / ' + data2);
		html	+= '</div>';
		return html;
	}
	
	/* (공통) - 상세(detail) add row	*/
	function addRowHtml(title, data1, data2) {
		var dataClass = '';
		var rcsCardType = detailDialogId.indexOf('popupTemplateView') == 0? rcsInfo.cardType : null; // popupTemplateView : RCS 탬플릿 상세 dialog id
		if(title == '내용' && rcsCardType != CARD_TYPE.CELL ) { // RCS 스타일을 제외한 모든 내용
			dataClass= 'white-space-pre-wrap';
		} else if(title == '등록일' || title == '승인요청일' || title == '승인완료일' ) {
			data1 =  data1 != null? moment(data1, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm') : '-';
		}
		var html = '<div class="row clearfix">';
		html 	+= commonFunc.makeRowHtml(title, data1, data2, dataClass );	  
		html	+= '</div>';
		$('#' + detailDialogId + ' .popupTemplateScroll').append(html);
	}
	
	return { 
			initTable: initTableOrder
			, changeDetailLayout : changeDetailLayout
			, search :search
			, reset : reset
			, makeRowHtml : makeRowHtml
			, addRowHtml :addRowHtml
		};
}
/*	end (공통) RCS, 알림톡 	 	*/

/*	begin  RCS 탬플릿 		*/
function rcsFunc() {
	
	/* RCS 탬플릿 - 유효성 셋팅 */
	function initValid($form) {
		$form.validate({ 
			rules: { 
				cmbBizService : {required: true, valueNotEquals:'선택하세요'} 	// 유형
				, msgbaseNm : {required: true, maxlength: 30}          		// 템플릿명
				, msgbaseDesc: {
					required: function(){
						return $("#divTemplateAttrDesc").not(':hidden').length > 0;
					}, 
					maxlength: 90,
					valueNotEquals:'{{description}}'
				}          // 서술 내용
				, msgbaseCell : {
					required: function(){
						return $("#divTemplateAttrCell").not(':hidden').length > 0;
					},
					maxlength: 90,
					valueNotEquals:'{{description}}'
				}          	// 스타일 내용
				, brandId : {required: true}
				, checkAgree: {required: true}				// 동의
			},
			messages: {
				cmbBizService: {required: "템플릿 속성을 선택하세요.", valueNotEquals:  "템플릿 속성을 선택하세요."}
			, msgbaseNm: {required: "템플릿명을 입력하세요.", maxlength: $.validator.format( "템플릿명은 {0}자이내만 입력 가능합니다.")}
			, msgbaseDesc: {required: "서술 내용을 입력하세요.",  maxlength: $.validator.format( "서술 내용은 {0}자이내만 입력 가능합니다."), valueNotEquals:'{{description}}은 변수명은 사용 불가합니다.'}
			, msgbaseCell: {required: "스타일 내용을 입력하세요.",  maxlength: $.validator.format( "스타일 내용은 {0}자이내만 입력 가능합니다.") , valueNotEquals:'{{description}}은 변수명은 사용 불가합니다.'}
			, brandId : {required: "브랜드를 선택하세요.", valueNotEquals:'선택하세요'}
			, checkAgree: {required: "필수 동의를 확인해 주세요."}
			},
			submitHandler: function (frm) {
				console.log($(frm).serialize());
			},
		});
	}
	/* RCS 탬플릿 - popup 초기화 */
	function initDialog(cardType) {
		$('.template-title').hide(); 
		$('.registerInfo').hide();
		$('.apprReason').hide();
		// validation message 삭제
		$('div[id$="-error"]').remove();
		// 입력 갯수 초기화 ('_count'로 끝나는 값 변경)
		$('span[id $=_count]').text(0);

		// 데이터 초기화
		$("#formRcs")[0].reset();
		$("#frmRcsDetail")[0].reset();
		$('input[data-name=rcsBtn][value=0]').change();
		$('#brId').children('option:eq(0)').prop("selected", true);
		
		//초기화후에 세팅할값
		$("input[name='cardType'][value="+cardType+"]").prop('checked',true)
		
		// 스타일(cell) 입력 항목  및 글자수 체크할 데이터 초기화 
		$('div[data-input=msgbaseCell] .search_field.inline-form').remove();
		$('#msgbaseCell').val('');
		
		// 미리 보기 초기화 
		$(previewId).html('');		
		// 유형 초기화 - 서술 화면으로 변경
		if(cardType == CARD_TYPE.DESC) {
			/*서술일 경우*/
			// 템플릿 유형
			$('#cmbBizServiceDesc').show();
			$('#cmbBizServiceCell').hide();
			// 템플릿 내용
			$('#divTemplateAttrDesc').show();
			$('#divTemplateAttrCell').hide();
			
			makePreviewDesc();
		} else {
			/*스타일(cell)일 경우*/
			// 템플릿 유형
			$('#cmbBizServiceDesc').hide();
			$('#cmbBizServiceCell').show();

			// 템플릿 내용
			$('#divTemplateAttrDesc').hide();
			$('#divTemplateAttrCell').show();

			$('div[data-input=msgbaseCell]').html('');
			
		  	addCell() // 기본 셀  한개 출렫
		}
		
		
		// 셀 1개 셋팅
		//addCell();
		//makePreviewDesc();
		
		// 미리 보기 초기화
		$('.template-openrichcard-imageview img').attr('src', '');
		$('div[data-id=p_content_desc] .text').text('');
		$('div[data-id=previewCell]').hide();
		$('.template-openrichcard-suggestion').hide(); // 미리보기 버튼
		
		changeReadmodeInputTag('popupTemplate', true);
		
	};
	/* RCS 탬플릿- 데이터 셋팅  */
	function setData(data) {	
		initDialog(CARD_TYPE.DESC);
		
		rcsInfo = data;
		
		if(data.title == DAILOG_MODE.UPDATE) {
			changeReadmodeInputTag('popupTemplate', false);
		}
		if(data.title == DAILOG_MODE.DETAIL) {
			setDetail(data);
		} else {
			setDialog(data);
		}
		
		generateSlimScroll('.popupTemplateScroll', { height: '610px', size: '3px', allowPageScroll: true});
	}
	
	/* RCS 탬플릿 - 버튼정보 세팅*/ 
	function addBtnHtml(data, mode) {
		var popupTargetId = '';
		var suggestions = data.RCSMessage.openrichcardMessage;
		
		console.log(data.RCSMessage.openrichcardMessage.suggestions);


		
		if(suggestions.length > 0 && suggestions[0].action != null) {  
			
			if(mode == DAILOG_MODE.DETAIL) {
				//상세화면
				popupTargetId = '#popupTemplateView';
				btnTargetId = 'rcsTmpltBtnDetail';
				// "버튼 노출" 라디오를 대신한 ID 추가 후 hidden 처리
				$(popupTargetId + ' .popupTemplateScroll').append('<div class="row clearfix" id="'+ btnTargetId+'" hidden> </div>');
			} else {
				//등록, 수정 화면
				popupTargetId = '#popupTemplate';
				btnTargetId = 'rcsTmpltBtn';
			}
			// 버튼 라디오박스 값 선택
			$('input[data-target=' + btnTargetId + '][value=' + (suggestions.length ) + ']').prop('checked', true);
			
			$('.popupTemplateScroll').find('.rcsBtnEl').remove();
			
			for(var i = 0; i < suggestions.length; i++) {
				var index = i + 1;
				
				makeRcsBtnSelect( btnTargetId, index);	
				
				var btnNm = suggestions[i].action.postback.data; //버튼입력값
				switch(btnNm) {
				case 'set_by_chatbot_copy_to_clipboard':
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val('copy').change()
					$("#rcsBtn_"   + btnTargetId + index +'_1').val(suggestions[i].action.clipboardAction.copyToClipboard.text).keyup(); //복사하기
					break;
					
				case 'set_by_chatbot_open_url' :
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val('url').change();
					$("#rcsBtn_"   + btnTargetId + index+'_2').val(suggestions[i].action.urlAction.openUrl.url).keyup(); //URL연결
					break;
					
				case 'set_by_chatbot_dial_phone_number':
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val('tel').change();
					$("#rcsBtn_"   + btnTargetId + index+'_3').val(suggestions[i].action.dialerAction.dialPhoneNumber.phoneNumber).keyup(); //전화걸기
					break;
					
				case 'set_by_chatbot_show_location':
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val('coordinate').change();
					$("#rcsBtn_"   + btnTargetId + index +'_4').val(suggestions[i].action.mapAction.showLocation.location.latitude).keyup();  //지도보여주기(좌표) 위도
					$("#rcsBtn_"   + btnTargetId + index +'_5').val(suggestions[i].action.mapAction.showLocation.location.longitude).keyup(); //지도보여주기(좌표) 경도
					$("#rcsBtn_"   + btnTargetId + index +'_6').val(suggestions[i].action.mapAction.showLocation.location.label).keyup();     //지도보여주기(좌표) 위치
					$("#rcsBtn_"   + btnTargetId + index +'_7').val(suggestions[i].action.mapAction.showLocation.fallbackUrl).keyup();        //지도보여주기(좌표) URL
					break;
				case 'set_by_chatbot_search_locations':	
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val('query').change();
					$("#rcsBtn_"   + btnTargetId + index +'_8').val(suggestions[i].action.mapAction.showLocation.location.query).keyup(); //지도보여주기(쿼리) 위치
					$("#rcsBtn_"   + btnTargetId + index +'_9').val(suggestions[i].action.mapAction.showLocation.fallbackUrl).keyup();    //지도보여주기(쿼리) URL
					break;
					
				case 'set_by_chatbot_create_calendar_event':
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val('calendar').change();
					var startTime = changeDateTimeFormat( suggestions[i].action.calendarAction.createCalendarEvent.startTime );
					var endTime = changeDateTimeFormat( suggestions[i].action.calendarAction.createCalendarEvent.endTime );
					
					$("#rcsBtn_"   + btnTargetId + index +'_10').val(startTime);   //일정 등록 날짜시작
					$("#rcsBtn_"   + btnTargetId + index +'_11').val(endTime);     //일정 등록 날짜종료
					$("#rcsBtn_"   + btnTargetId + index +'_12').val(suggestions[i].action.calendarAction.createCalendarEvent.title).keyup();       //일정 등록 제목
					$("#rcsBtn_"   + btnTargetId + index +'_13').val(suggestions[i].action.calendarAction.createCalendarEvent.description).keyup(); //일정 등록 내용
					break;
					
				case 'set_by_chatbot_request_location_push':
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val('position').change();
					$("#rcsBtn_"   + btnTargetId + index +'_10').val(suggestions[i].action.mapAction.requestLocationPush).keyup(); //현재위치공유 버튼값없음
					break;
					
				/* TODO 메시지 전송 msg 확인 필요
				 * compose_text_message  */	
 	 		 	 case 'set_by_chatbot_request_location_push':
 	 		 	 	break;
					 
				default:
					break;
				}
				
				$('#rcsBtnNm_' + btnTargetId + index).val(suggestions[i].action.displayText).keyup(); // 각각의 버튼명
				
				if(mode == DAILOG_MODE.DETAIL) {
					$('.pdd-top-4.pdd-left-25').removeClass().addClass('pdd-top-4'); // 버튼 제목 스타일 변경
				}
				
				// 미리 보기 버튼 출력
				$(popupTargetId + ' div[data-id=previewBtn' + index + ']' ).parent().show();
				$(popupTargetId + ' div[data-id=previewBtn' + index + ']' ).text(suggestions[i].action.displayText);
			}
		} else {
			// 버튼 정보가 없는 경우
			commonFunc.addRowHtml('버튼 노출', '미사용', null); // 내용
			$('.template-openrichcard-suggestion').hide(); // 미리보기
		}
	}
	
	return {
		initValid : initValid
		, initDialog : initDialog
		, setData : setData
		, addBtnHtml : addBtnHtml
	}
}
/*	end RCS 탬플릿 	*/
/*	begin RCS 브랜드 탬플릿 	*/
function brandFunc() {
	/* RCS 브랜드 - 유효성 셋팅 */
	function initValid($form) {
		$form.validate({ 
			rules: { 
				brId : {required: true}          				// 브랜드 ID
				, brNm : {required: true, maxlength: 20}        // 브랜드명
				, status: {required: true}						// 동의
				, useYn : {required: true}          			// 사용여부
				, apprReqYmd : {required: true}          		// 요청일  : 원래 요청일시나 사용자가 시분초 정보까지 어렵다고 생각함
				, apprYmd : {required: true}          			// 승인일
			},
			messages: {
				brId: {required: "브랜드ID을 입력하세요."}
				, brNm: {required: "브랜드명을 입력하세요.",  maxlength: $.validator.format( "브랜드명은 {0}자이내만 입력 가능합니다.")}
				, status: {required: "상태를 입력하세요."}
				, useYn: {required: "사용여부를 선택하세요."}
				, apprReqYmd: {required: "요청일을 입력하세요."}
				, apprYmd: {required: "승인일을 입력하세요."}
			},
			submitHandler: function (frm) {
				console.log($(frm).serialize());
			},
		});
	};
	/* RCS 브랜드- popup 초기화 */
	function initDialog() {
		$('.template-title').hide(); // 상태값
		// 데이터 초기화
		$("#formBrand")[0].reset();
		// validation message 삭제
		$('div[id$="-error"]').remove();
		
		// 사용여부  selectbox - 등록,수정일 경우
		$('#useYn').show();
		$('#useYn').parent().find('input').remove();
		
		$('#brId').attr('readonly', false);
		
		$('.form-control.date').css({"pointer-events" : ""}); // date 이벤트 막기
		$('#popupBrand input').attr('readonly', false);
		$('#popupBrand select').prop('disabled',false);
		
		$('.no-required').removeClass().addClass('required');
	};
	/* RCS 브랜드- popup 데이터 셋팅  */
	function setData(data) {
		initDialog();
		
		$('.modal-footer').html('');
		
		setDialog(data);
		
		if(data.title != DAILOG_MODE.DETAIL) {
			// dialog 버튼 셋팅
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-border-sub1 popupBrand_close" >취소</a>');
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-bg-main popupEditAppy" onclick="saveBrand()">등록</a>');  
		}
		generateSlimScroll('.popupTemplateScroll', { height: '500px', width:'100px',size: '3px', allowPageScroll: true});
	};
	
	return {
		initValid: initValid
		, initDialog: initDialog
		, setData: setData
	}
}
/*	end RCS 브랜드 탬플릿 	*/

/*	begin 챗붓(발신번호) 탬플릿 	*/
function chatbotFunc() {
	/* 챗붓(발신번호) - 유효성 셋팅 */
	function initValid($form) {
		$form.validate({ 
			rules: { 
				subTitle : {required: true}          				// 발신번호명
				, subNum : {required: true, digitsLength: 20}        // 발신번호
				, mainnumYn: {required: true}						// 동의
				, display : {required: true}          			// 사용여부
				, status : {required: true}          		// 요청일  : 원래 요청일시나 사용자가 시분초 정보까지 어렵다고 생각함
				, regDt : {required: true}          			// 승인일
				, apprYmd : {required: true}          			// 승인일
				, regUserId : {required: true}          			// 승인일
			},
			messages: {
				subTitle: {required: "발신번호명을 입력하세요."}
				, subNum: {required: "발신번호를 입력하세요.", digitsLength: "숫자로 {0}자 이내만 입력 가능합니다."}
				, mainnumYn: {required: "대표번호여부를선택하세요."}
				, display: {required: "사용여부를 선택하세요."}
				, status: {required: "상태을 입력하세요."}
				, regDt: {required: "등록일을 입력하세요."}
				, apprYmd: {required: "승인일을 입력하세요."}
				, regUserId: {required: "등록자를 입력하세요."}
			},
			submitHandler: function (frm) {
				console.log($(frm).serialize());
			},
		});
	}; 
	/* 챗붓(발신번호)- popup 초기화 */
	function initDialog() {
		$('.template-title').hide(); // 상태값
		// 데이터 초기화
		$("#formChatbot")[0].reset();
		// validation message 삭제
		$('div[id$="-error"]').remove();
		
		$('#subNum').attr('readonly', false);
		
		$('.registerInfo').hide();
		
		// 대표번호여부  selectbox - 등록,수정일 경우
		$('#mainnumYn').show();
		$('#mainnumYn').parent().find('input').remove();
		
		$('.form-control.date').css({"pointer-events" : ""}); // date 이벤트 막기
		$('#popupChatbot input').attr('readonly', false);
		$('#popupChatbot select').prop('disabled',false);
		
		$('.no-required').removeClass().addClass('required');
	};
	
	/* (공통) - 그리드 reload */
	function search() {
		//dataTableGrid.currentPage = 1;
		umsDataTableChatbot.reload();
	};
	
	/* (공통) - 초기화 클릭 이벤트 */
	function reset() {
		$('.search_field select').each(function() {
			// 첫번째 option 선택
			$(this).children('option:eq(0)').prop("selected", true);
		});
		
		// RCS만 해당
		$('select[name=bizServiceType]').attr("disabled", true);
		
		$('#searchWord').val('');
		// 변경된 검색조건으로 그리드 조회
		commonFunc.search();
	};
	
	/* 챗붓(발신번호)- popup 데이터 셋팅  */
	function setData(data) {
		initDialog();
		
		$('.modal-footer').html('');
		
		setChatbotDialog(data);
		
		if(data.title == DAILOG_MODE.DETAIL) {
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-border-sub1" onclick="deleteChatbot()">삭제</a>');
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-border-main" onclick="openUpdateChatbot()">수정</a>');
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-bg-main popupChatbot_close" >확인</a>');
		} else {
			// dialog 기능 버튼 셋팅
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-border-sub1 popupChatbot_close" >취소</a>');
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-bg-main popupEditAppy" onclick="saveChatbot()">등록</a>');  
		}
		generateSlimScroll('.popupTemplateScroll', { height: '500px', width:'100px',size: '3px', allowPageScroll: true});
	}
	
	return {
		initValid: initValid
		, initDialog: initDialog
		, search : search
		, reset : reset
		, setData : setData
	}
}
/*	end 챗붓(발신번호) 탬플릿 	*/

/*	begin 알림톡 탬플릿 	*/
function alimFunc() {
	/* 알림톡 - 유효성 셋팅 */
	function initValid($form) {
		$form.validate({ 
			rules: { 
				kkoTmplCd : {required: true, maxlength: 30}		// 탬플릿 ID
				, tmplNm : {required: true, maxlength: 30}          		// 템플릿명
				, tmplMsg : {required: true, maxlength: 1000}          		// 템플릿명
				, checkAgree: {required: true}								// 동의
			},
			messages: {
				kkoTmplCd: {required: "템플릿ID를 입력하세요.", maxlength: $.validator.format( "템플릿ID는 {0}자이내만 입력 가능합니다.")}
				, tmplNm: {required: "템플릿명을 입력하세요.", maxlength: $.validator.format( "템플릿명은 {0}자이내만 입력 가능합니다.")}
				, tmplMsg: {required: "내용을 입력하세요.",  maxbytelength: $.validator.format( "내용은 {0}자이내만 입력 가능합니다.")}
				, checkAgree: {required: "필수 동의를 확인해 주세요."}
			},
			submitHandler: function (frm) {
				console.log($(frm).serialize());
			},
		});
	};
	/* 알림톡 - popup 초기화  */
	function initDialog() {
		$('.template-title').hide(); // 상태 값
		
		// 데이터 초기화
		$("#formAlimTalk")[0].reset();
		$("#formAlimTalkDetail")[0].reset();
		
		$('#activeYn').children('option:eq(0)').prop("selected", true); // select box  초기화
		
		// validation message 삭제
		$('div[id$="-error"]').remove();
		// 입력 갯수 초기화 ('_count'로 끝나는 값 변경)
		$('span[id $=_count]').text(0);

		$('#kkoTmplCd').attr('readonly', false);
		$('.registerInfo').hide();
		
		// 미리보기 초기화 -내용
		$('.template-richcard-descriptionview .text').text('');
		// 미리보기 초기화 -버튼
		$('.template-openrichcard-suggestion').hide();
		
		// 버튼 노출 항목 초기화
		$('input[data-name=rcsBtn][value=0]').change();
	};
	/* 알림톡 - popup 데이터 셋팅  */
	function setData(data) {
		initDialog();
		
		$('.modal-footer').html('');
		
		if(data.title == DAILOG_MODE.DETAIL) {
			setDetail(data);
		} else {
			setDialog(data);
			
			// dialog 기능 버튼 셋팅
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-border-sub1 popupAlimTalk_close" >취소</a>');
			$('.modal-footer').append('<a href="javascript:;" class="btn btn-bg-main popupEditAppy" onclick="save()">등록</a>');
		}
		//generateSlimScroll('.previewScroll', { height: '570px', size: '3px', allowPageScroll: true});
		generateSlimScroll('.popupTemplateScroll', { height: '610px', size: '3px', allowPageScroll: true});
	};
	
	/* 알림톡 - 버튼정보 세팅*/ 
	function addBtnHtml(dataJson, mode) {
		var popupTargetId = '';
		if(dataJson[0] != null) {
			
			// 버튼 데이터 존재할 경우
			if(mode == DAILOG_MODE.DETAIL) {
				//상세화면
				popupTargetId = '#popupAlimTalkView';
				btnTargetId = 'alimTmpltBtnDetail';
				// "버튼 노출" 라디오를 대신한 ID 추가 후 hidden 처리
				$(popupTargetId + ' .popupTemplateScroll').append('<div class="row clearfix" id="'+ btnTargetId+'" hidden> </div>');
			} else {
				//등록, 수정 화면
				popupTargetId = '#popupAlimTalk';
				btnTargetId = 'alimTmpltBtn';
			}
			
			// 버튼노출 갯수  선택
			$('input[data-target=' + btnTargetId + '][value=' + (dataJson.length ) + ']').prop('checked', true);
			
			$('.popupTemplateScroll').find('.rcsBtnEl').remove();
			
			for(var i = 0; i < dataJson.length; i++) {
				var index = i + 1;
				
				// 알림 버튼 타입 선택과  버튼명 생성
				makeAlimBtnSelect( btnTargetId, index);	
				
				var btnType = dataJson[i].type; //버튼 타입
				switch(btnType) {
				case ALIM_TALK_BUTTON_TYPE.WEB:
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
					$("#rcsBtn_"   + btnTargetId + index +'_1').val(dataJson[i].url_mobile).keyup(); 
					$("#rcsBtn_"   + btnTargetId + index +'_2').val(dataJson[i].url_pc).keyup(); 
					break;
					
				case ALIM_TALK_BUTTON_TYPE.APP :
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
					$("#rcsBtn_"   + btnTargetId + index +'_3').val(dataJson[i].url_mobile).keyup();
					$("#rcsBtn_"   + btnTargetId + index +'_4').val(dataJson[i].scheme_android).keyup();
					$("#rcsBtn_"   + btnTargetId + index +'_5').val(dataJson[i].scheme_ios).keyup();
					$("#rcsBtn_"   + btnTargetId + index +'_6').val(dataJson[i].url_pc).keyup();
					break;
					
					/* case ALIM_TALK_BUTTON_TYPE.DELIVERY :
		  		 			$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
		  		 			break
		  		 		case ALIM_TALK_BUTTON_TYPE.BOT_KEYWORD :
		  		 			$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
		  		 			break
		  		 		case ALIM_TALK_BUTTON_TYPE.TALK_CHANGE :
		  		 			$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
		  		 			break
		  		 		case ALIM_TALK_BUTTON_TYPE.BOT_CHANGE :
		  		 			$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
		  		 			break
		  		 		case ALIM_TALK_BUTTON_TYPE.CHANEL :
		  		 			$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
		  		 			break
		  		 		case ALIM_TALK_BUTTON_TYPE.MESSAGE :
		  		 			$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
		  		 			break
					 */
					
				default:
					$('#rcsBtnNm_' + btnTargetId + index).parent().parent().find('select').val(btnType).change()// 버튼 타입 값 선택
					break;
				}
				
				$('#rcsBtnNm_' + btnTargetId + index).val(dataJson[i].name).keyup(); // 각각의 버튼명
				
				if(mode == DAILOG_MODE.DETAIL) {
					$('.pdd-top-4.pdd-left-25').removeClass().addClass('pdd-top-4'); // 버튼 제목 스타일 변경
				}
				
				// 미리 보기 버튼 출력
				$(popupTargetId + ' div[data-id=previewBtn' + index + ']' ).parent().show();
				$(popupTargetId + ' div[data-id=previewBtn' + index + ']' ).text(dataJson[i].name);
			}
		} else {
			// 버튼 정보가 없는 경우
			commonFunc.addRowHtml('버튼 노출', '미사용', null); // 내용
			$('.template-openrichcard-suggestion').hide(); // 미리보기
		}
	}
		
	return {
		initValid: initValid
		, setData : setData
		, addBtnHtml : addBtnHtml
	}
		
}
	

/* 캘린더 날짜/시간 포맷 */
function changeDateTimeFormat(dateTimeStr) {
	var datetime = new Date(dateTimeStr);
	return moment(datetime, 'YYYYMMDDHHmm').format('YYYY-MM-DD HH:mm');
}

/* dialog 입력태그(inpu,select,textarea) 읽기/작성 모드 처리 */
function changeReadmodeInputTag(dialogId, isRead) {
	$('.form-control.date').css({"pointer-events" : (isRead? "none" : "") }); // date 이벤트 막기
		
	$('#' + dialogId + ' input:not([name=cardType])').attr('disabled', isRead);
	$('#' + dialogId + ' button').attr('disabled', isRead);
	$('#' + dialogId + ' select:not([name=cmbBizService])').prop('disabled',isRead);
	$('#' + dialogId + ' textarea').prop('disabled',isRead);
}