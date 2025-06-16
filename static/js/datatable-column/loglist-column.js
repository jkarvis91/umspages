var UmsLogListColumn = {
  columns: [
    {data: 'groupUniqNo'}, //순번
    {data: 'regYms', // 등록일시
      "render":function (data, type, row) {
        return moment(data, "YYYYMMDDHHmmss").format("YYYY-MM-DD HH:mm")
      }
    },
    {data: 'groupNm', //직원명
    },
    {
      data: 'msgDstic', //부서명(컬럼 확인해야함)
    },
    {
      data: 'inst', //로그 내용 상세 
	}
  ],
  columnDefs: [{
	  
  }
  ]
}