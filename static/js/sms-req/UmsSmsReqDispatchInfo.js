var UmsSmsReqDispatchInfo = (function(){

  // 여기에서 this 를 쓰게 되면 windows 객체가 된다.
  var dispatchInfoArr = [];

  function addDispatchDate(dispatchDate){
    dispatchInfoArr.push({
      date: dispatchDate,
      count: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    });
  }

  // array 를 for in  하면 index 가 나온다.
  function setCount(dispatchDate, timeIndex, count) {
    for (var index in dispatchInfoArr) {
      if (dispatchInfoArr[index].date === dispatchDate) {
        dispatchInfoArr[index].count[timeIndex] = count;
      }
    }
  }

  function getDispatchInfo(){
    return dispatchInfoArr;
  }

  return {
    addDispatchDate : addDispatchDate,
    setCount : setCount,
    getDispatchInfo : getDispatchInfo
  }
})();