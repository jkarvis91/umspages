$(function(){
  if (!SVGElement.prototype.contains) {
    SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
  }

});

function initTippy(){
	tippy.setDefaultProps({theme: 'custom', allowHTML: true, maxWidth: 700, placement:'right', zIndex: 1000000 });
	tippy('[data-tippy-content]');
}

