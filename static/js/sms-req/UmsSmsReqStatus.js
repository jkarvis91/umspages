var UmsSmsReqStatus = (function () {
  // TODO: 기본 값에 대한 정의가 필요
  var status;
  function setStatus(status) {
    this.status = status;
  };
  function getStatus() {
    return this.status;
  };
  return {
    setStatus : setStatus,
    getStatus : getStatus
  }
})();