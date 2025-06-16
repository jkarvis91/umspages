/**
 * UMS Message Center 의 DB 가 euc-kr 로 되어 있어서
 * 한글은 2byte 로 계산을 합니다.
 * @type {{getBytesAndMaxLength, getBytes}}
 */
var UmsByteCheck = (function () {
  /**
   * 한글은 encodeURI 를 이용하면 길이가 9 인 encode 문자로 변경 됩니다.
   * 현재 입력된 바이트와 maxByte 를 기준으로 사용 사능한 길이 정보를 리턴 합니다.
   * @param strValue
   * @param maxByte
   * @returns {{totalByte: number, ableLength: number}}
   */
  function getBytesAndMaxLength(strValue, maxByte){
    var totalByteAndMaxLength = {
      totalByte: 0,
      ableLength: 0
    };
    var totalByte=0;
    var ableLength=0;
    for (var i = 0; i < strValue.length; i++) {
      if (encodeURI(strValue.charAt(i)).length === 9) {
        totalByte += 2;
      } else {
        totalByte++;
      }
      // 입력한 문자 길이보다 넘치면 잘라내기 위해 저장
      if (totalByte <= maxByte) {
        ableLength = i + 1;
      }
    }
    totalByteAndMaxLength.totalByte = totalByte;
    totalByteAndMaxLength.ableLength = ableLength;
    return totalByteAndMaxLength;
  }

  /**
   * 현 문자읠 총 바이트를 구합니다.
   * @param strValue
   * @returns {number}
   */
  function getBytes(strValue){
    var totalByte = 0;
    for (var i = 0; i < strValue.length; i++) {
      if (encodeURI(strValue.charAt(i)).length === 9) {
        totalByte += 2;
      } else {
        totalByte++;
      }
    }
    return totalByte;
  }

  return {
    getBytesAndMaxLength : getBytesAndMaxLength,
    getBytes : getBytes
  }
})
();