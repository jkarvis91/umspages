var DAILOG_MODE = Object.freeze({ CREATE:"C", UPDATE : "U", DETAIL :'DTL'});

/* RCS 탬플릿 - 유형 */
var CARD_TYPE = Object.freeze({
		DESC: "description", CELL : "cell"
});

/* 알림톡 탬플릿  - 버튼 유형*/
var ALIM_TALK_BUTTON_TYPE = Object.freeze({
		WEB: "WL" /* 웹링크 */, APP : "AL"	/* 앱링크 */ , DELIVERY : 'DS' /* 배송조회 */ 	, BOT_KEYWORD : 'BK' /*  봇 키워드 */		, MESSAGE:'MD' /*  메시지전달  */
		,TALK_CHANGE :'BC' /* 상담톡 전환 */, BOT_CHANGE :'BT' /* 봇전환 */	, CHANEL : 'AC' /*  채널추가  */
});