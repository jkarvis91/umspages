
function popOpen(id){
    $(id).bPopup({
        follow: [true, true], //x, y
        modalClose: false,
        opacity: 0.6,
        // position: [($(window).width() - $(id).outerWidth())/2, 50]
    });
}

function popOpen1(id){
    $(id).bPopup({
        follow: [true, true], //x, y
        modalClose: false,
        opacity: 0.6,
        appending: 0,
        // position: [($(window).width() - $(id).outerWidth())/2, 50]
    });
}

function popOpenScroll(id){
  $(id).bPopup({
    // scroll 에 따라 움직임
    follow: [true, true], //x, y
    modalClose: false,
    opacity: 0.6
  });
}

function popClose(id){
    $(id).bPopup().close();
}