var UmsInitData = {
  getYearOptionHtml: function (maxYearCount, minYearCount) {
    var maxYear = parseInt(moment().format('YYYY')) + maxYearCount;
    var minYear = parseInt(moment().format('YYYY')) - minYearCount;
    var html = '';
    for (i = minYear; i <= maxYear; i++) {
      html += '<option value=' + i + '>' + i + '</option>'
    }
    return html;
  },
  getMonthOptionHtml: function () {
    var html = '';
    var temp = '';
    for (i = 1; i <= 12; i++) {
      if (i < 10) {
        temp = '0' + i;
      } else {
        temp = '' + i;
      }
      html += '<option value=' + temp + '>' + temp + '</option>'
    }
    return html;
  },
  getDayOptionHtml: function () {
    var html = '';
    var temp = '';
    for (i = 1; i <= 31; i++) {
      if (i < 10) {
        temp = '0' + i;
      } else {
        temp = '' + i;
      }
      html += '<option value=' + temp + '>' + temp + '</option>'
    }
    return html;
  }
}