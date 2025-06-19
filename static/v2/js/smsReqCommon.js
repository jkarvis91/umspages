var previewFunc = previewFunc();
function previewFunc() {
	return {
		sliderInit: function() {
			$('#previewCarousel .emulator_area').not('.slick-initialized').slick({
	    		slidesToShow: 1,
	          	slidesToScroll: 1,
	          	dots: false,
	          	prevArrow: false,
	          	nextArrow: false
	        });
			
			$("#previewCarousel  .template-richcard-carousel-prev").click(function() {
	            $('#previewCarousel .emulator_area').slick('slickPrev');
	        });
			
			$("#previewCarousel  .template-richcard-carousel-next").click(function() {
	            $('#previewCarousel .emulator_area').slick('slickNext');
	        });
			
			$('.slick-carousel .template-richcard-descriptionview .text').slimscroll({
	            height: '125px',
	            size: '3px',
	            position: 'right',
	            alwaysVisible: true,
	            distance : '0px',
	       	});
		},
		// 미리보기 show/hide 제어
		preivewShowChoice: function(type) {
			$("#previewEtc").hide();
			$("#previewCarousel").hide();
			$("#previewCell").hide();
			$("#previewDiv").removeClass("carouselShow");
			
			if(type == 0) {
				$("#previewEtc").show();
			} else if(type == 1) {
				$("#previewDiv").addClass("carouselShow");
				$("#previewCarousel").show();
			} else {
				$("#previewCell").show();
			}
		},
		// 미리보기 제목 셋팅
		setPreviewTitle: function(msg) {
			$("#previewTtile").html(msg);
		},
		// 미리보기 내용 셋팅
		setPreviewContents: function(msg) {
			$("#previewContents").html(msg);
		},
		// 미리보기 버튼 초기화
		setPreviewBtnInit: function(targetId) {
			$("#" + targetId + " .template-openrichcard-suggestion").hide();
			$("#" + targetId + " .template-openrichcard-suggestion div").html('');
		},
		// 미리보기 버튼 셋팅
		setPreviewBtn: function(targetId, index, msg) {
			$("#" + targetId + " .previewBtnNm"+ index).parent().show();
			$("#" + targetId + " .previewBtnNm"+ index).html(msg);
		},
		// 미리보기 제목 셋팅
		setPreviewSlideTitle: function(sIdx, msg) {
			$("#previewCarousel .slick-slide:not(.slick-cloned)").eq(sIdx).find(".template-richcard-titleview h4").html(msg);
		},
		// 미리보기 내용 셋팅
		setPreviewSlideContents: function(sIdx, msg) {
			$("#previewCarousel .slick-slide:not(.slick-cloned)").eq(sIdx).find(".template-richcard-descriptionview p").html(msg);
		},
		// 미리보기 버튼 셋팅
		setPreviewSlideBtn: function(sIdx, btnIdx, msg) {
			$("#previewCarousel .slick-slide:not(.slick-cloned)").eq(sIdx).find(".previewBtnSlide"+ btnIdx).parent().show();
			$("#previewCarousel .slick-slide:not(.slick-cloned)").eq(sIdx).find(".previewBtnSlide"+ btnIdx).html(msg);
		},
		// 전환발송 - 미리보기 제목 셋팅
		setPreviewTransTitle: function(msg) {
			$("#transTtile").html(msg);
		},
		// 전환발송 - 미리보기 내용 셋팅
		setPreviewTransContents: function(msg) {
			$("#transContents").html(msg);
		},
		setPreviewImg: function(tgtId, idx, imgSeq, height) {
			$("#" + tgtId + " .template-richcard-mediaview").eq(idx).remove();
			var src = "/template-img.do?seq=" + imgSeq;
			var html = '<div class="template-richcard-mediaview">';
			html += '<img style="height:200px;" src="'+ src +'">';
			html += '</div>';

			if(idx == 0) {
				$("#" + tgtId).prepend(html);
			} else {
				$("#" + tgtId + " > div:nth-child(" + idx + ")").after(html);	
			}
		},
		setPreviewCarouselImg: function(sIdx, imgSeq) {
			var src = "/template-img.do?seq=" + imgSeq;
			$("#previewCarousel .slick-slide:not(.slick-cloned)").eq(sIdx).find(".template-richcard-mediaview").children().remove();
			html = '<img style="height:200px;" src="'+ src +'">';
			$("#previewCarousel .slick-slide:not(.slick-cloned)").eq(sIdx).find(".template-richcard-mediaview").append(html);
		},
		setTalkPreview: function(obj) {
			// 미리보기 값 셋팅
			this.setPreviewTitle(obj.tmplNm);
			this.setPreviewContents(obj.tmplMsg);
			
			// 버튼 값 셋팅
			this.setPreviewBtnInit("previewEtc");
			if(!str.isEmpty(obj.btnInfo)) {
				var btnJson = JSON.parse(   "[" + (obj.btnInfo || '{}') + "]"   ); // 저장할때 '['와']' 없애고 저장한 부분 떄문에 추가해서 json 형태로 파싱
				btnJson.forEach(function(item, index) {
					if(Object.keys(item).length) previewFunc.setPreviewBtn("previewEtc", index+1, item.name);
				})
			}
		},
		// 미리보기 이미지 제거
		delImgPrevew: function(type, idx, isChildren) {
			var $tgt = null;
			if(type == 0) {
				$tgt = $("#previewBody .template-richcard-mediaview").eq(idx);
			} else if(type == 1) {
				$tgt = $("#previewCarousel .slick-slide:not(.slick-cloned)").eq(idx).find(".template-richcard-mediaview");
			} else {
				$tgt = $("#transBody .template-richcard-mediaview").eq(idx);
			}
			
			if(isChildren) {
				$tgt = $tgt.children();
			}
			
			$tgt.remove();
		},
		// 미리보기 슬라이더 동적 생성 및 제거
		dynamicPreviewSlider: function(choiceCnt) {
			var curSlideCnt = $("#previewCarousel .emulator_cont:not(.slick-cloned)").length;
			var diffCnt = choiceCnt - curSlideCnt;
			if(diffCnt < 0) {
				for(var i=curSlideCnt; i > choiceCnt; i--) {
					$('#previewCarousel .emulator_area').slick('slickRemove', i-1);
				}
			} else {
				for(var i=choiceCnt; i > curSlideCnt; i--) {
					var html = '';
					html += '<div class="emulator_cont">';
					html += '	<div class="template-richcard-carousel-warpper">';
					html += '		<div class="template-richcard-carousel">';
					html += '			<div class="template-richcard-carousel-item">';
					html += '				<div class="template-richcard-mediaview"></div>';
					html += '				<div class="template-richcard-titleview"><h4 class="title"></h4></div>';
					html += '				<div class="template-richcard-descriptionview"><p class="text"></p></div>';
					html += '				<div class="template-openrichcard-suggestion hide"><div class="previewBtnSlide1"></div></div>';
					html += '				<div class="template-openrichcard-suggestion hide"><div class="previewBtnSlide2"></div></div>';
					html += '			</div>';
					html += '		</div>';
					html += '	</div>';
					html += '</div>';
					$('#previewCarousel .emulator_area').slick('slickAdd', html);
				}	
			}
		},
		converJsonObject: function(jsonStr){
			if(jsonStr != null && jsonStr != "") {
				return JSON.parse(jsonStr);
			} else {
				return null;
			}
		},
		findKeyValue: function(obj, key) {
			if(!$.isEmptyObject(obj)) {
				return this.getObjectValue(obj, key);
			} else{
				return null;
			}
		},
		getObjectValue: function(obj, key) {
			var result = null;
		    for (var i in obj) {
		        if (!obj.hasOwnProperty(i)) continue;
		        if (typeof obj[i] == 'object' && !Array.isArray(obj[i])) {
		        	result = this.getObjectValue(obj[i], key);
		        } else if (i == key) {
		        	return obj[key];
		        }
		    }
		    return result;
		},
		// RCS 스타일 - 미리보기 이미지 셋팅
		setCellImage: function(fmtStr) {
			if(!str.isEmpty(fmtStr)) {
				fmtStr = fmtStr.replace(/(\r\n)|\r|\n/gi, "\\r\\n");
				var jsonObj = JSON.parse(fmtStr); //RCSMessage 가져오기
				var imageVal = jsonObj.RCSMessage.openrichcardMessage.layout.children[0].mediaUrl; // 버튼정보 가져오기
				imageVal = imageVal.substring(imageVal.length - 4, imageVal.length)+ "_1.png";
				$("#previewCell .template-openrichcard-imageview").html('<img src="/static/images/rcs/' + imageVal + '" width="82" height="30">');
			}
		},
		// RCS 스타일 - 미리보기 내용 셋팅
		setCellPreviewContents: function(fmtStr, subValue) {
			if(!str.isEmpty(fmtStr)) {
				if (subValue != ""){
					subValue = JSON.parse(subValue)
				}
			}
			if(!str.isEmpty(fmtStr)) {
				// 22.06.22 JSON.parse 오류 방지 추가
				fmtStr = fmtStr.replace(/(\r\n)|\r|\n/gi, "\\r\\n");
				var jsonObj = JSON.parse(fmtStr); //RCSMessage 가져오기
				var children = jsonObj.RCSMessage.openrichcardMessage.layout.children; // 버튼정보 가져오기
				var urlImg = children[0].mediaUrl;
				var msgArray = children[1].children;
				
				this.setCellPreview(msgArray, function(){ /*화면의 셀 세팅*/
					for(var i=0; i<msgArray.length; i++){ /*데이터 세팅*/
						if(msgArray[i].children != undefined){
							var cellDataArray = msgArray[i].children;
							for(var j=0; j<cellDataArray.length; j++){
								var textArray = cellDataArray[j];
								var cellText = textArray.text;
								var cellId = "#cell"+i+"_"+j;
								var weight = textArray.textStyle == undefined ? "normal" : "bold"
								var textAlign = textArray.textAlignment == "textStart" ? "left" : "right"
								
								if (subValue != ""){
									var r = /{{(고객명|변수[1-5])}}/g
									var subArr = cellText.match(r)
									
									if (subArr != null){
										for (var t=0; t<subArr.length; t++){
											var subText = replaceO(subArr[t], "{{", "") 
											subText = replaceO(subText, "}}", "") 
											cellText = replaceO(cellText, subArr[t], subValue[subText])								
										}
									}							
								}
								$(cellId).html(cellText);
								$(cellId).css({
									"color" : textArray.textColor,
									"font-size" : textArray.textSize.slice(0,-2),
									"font-weight" : weight,
									"text-align" : textAlign
								});	
							}
						}
					}
				});
			}
		},
		// 미리보기 스타일 값 셋팅
		setCellPreview: function(msgArray, callback) {
			var tmp = "";
			$("#cellMsgCont").empty();
			for(var i=0; i<msgArray.length; i++){
				var children = msgArray[i].children
				if(children != undefined){		
					if(children.length == 2){
						tmp += '<div class="template-openrichcard-linearlayout template-openrichcard-linearlayout-horizontal">';
						tmp += '<div class="template-openrich-textview textStart text-size-14dp w-1/2" index="11'+i+'0" style="color: rgb(64, 64, 64);">';
						tmp += '<p class="text" id="cell'+i+'_0" style="white-space: pre-wrap;"></p>';
						tmp += '</div>';
						tmp += '<div class="template-openrich-textview textEnd text-size-14dp w-1/2" index="11'+i+'1" style="color: rgb(64, 64, 64);">';
						tmp += '<p class="text" id="cell'+i+'_1" style="white-space: pre-wrap;"></p>';
						tmp += '</div>';
						tmp += '</div>';
					}else{
						tmp += '<div class="template-openrichcard-linearlayout template-openrichcard-linearlayout-horizontal">';
						tmp += '<div class="template-openrich-textview textStart text-size-14dp" index="11'+i+'0" style="color: rgb(64, 64, 64);">';
						tmp += '<p class="text" id="cell'+i+'_0" style="white-space: pre-wrap;"></p>';
						tmp += '</div>';
						tmp += '</div>';
					}
				} else{ /*라인 세팅 홀수*/
					var visibility = msgArray[i].visibility;
					if (visibility != null && visibility != ""){
						if(visibility == "visible"){
							tmp += '<div class="template-openrichcard-hrview" index="11'+i+'" cardtype="C" style="display: block;"></div>';
						}else{
							tmp += '<div class="template-openrichcard-hrview" index="11'+i+'" cardtype="C" style="display: none;"></div>';
						}
					}
				}
			}
			$("#cellMsgCont").append(tmp);

			callback();
		},
	}
}