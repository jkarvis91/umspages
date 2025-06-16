var UmsContentsColumnInSearch = {
  columns: [
    {data: "rnum"},				//순번
    {
      data: 'groupNm'				//기안명
    },
    {
      data: 'sectionNumber'		//요청건수
      ,"render": function (data, type, row) {
          return $.number(data);
      }
    },
    {
      data: 'msgDstic'				//구분
      ,"render": function (data, type, row) {
          return data + "S";
      }
    },
    {
        data: 'pengagYms'		//발송 일시
        ,"render": function (data, type, row) {
        	var hour = data.substring( 8, 10 )	// 20181213235959
        	var min = data.substring( 10, 12 )
            return hour + ":" + min;
        }
    },
    {
        data: 'emplName'			//기안자
        ,"render": function (data, type, row) {
            return data == null ? "" : data ;
        }
    },
    {
        data: 'partName'			//기안부서
        ,"render": function (data, type, row) {
            return data == null ? "" : data ;
        }
    }
  ]
}
