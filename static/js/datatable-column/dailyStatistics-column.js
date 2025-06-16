var DailyStatisticsListColumn = {
  columns: [
    /*{data: 'rnum'}, */			// 순번 
    {
    	data: 'standardYmd', 	// 발송일
    	"render":function (data, type, row) {
    		return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD")
    	}
    },
    {data: 'msgDstic'}, 		// 메시지 구분
    {
    	data: 'sendNumber' 		// 전체 건수
    },
    {
        data: 'successPercent' // 성공율
        /*"render" : function(data, type, row){
  			return row['sendCount'] + " / " + data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  		}*/
  	},
    {
  		data: 'successNumber' 	// 성공건
    },
    {
  		data: 'failureNumber' 	// 실패건
    },	
    {
    	data: 'successPercent' 	// 성공율
    }
  ],
  columnDefs: [{
  }
  ]
}