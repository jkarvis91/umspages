jQuery(function($){
	// Frequently Asked Question
//	var article = $('.faq>.faqBody>.article');
	var article = $('.faq>.faqBody>.article');
	article.removeClass('hide');
	article.addClass('show');
	article.find('.a').show();
	$('.faq>.faqBody>.article>.q>#articleTarget').click(function(){
		var myArticle = $(this).parents('.article:first');
		if(myArticle.hasClass('hide')){
			//동시 표기 가능하도록 하기위해 주석 처리
//			article.addClass('hide').removeClass('show');
//			article.find('.a').slideUp(100);
			myArticle.removeClass('hide').addClass('show');
			myArticle.find('.a').slideDown(100);
		} else {
			myArticle.removeClass('show').addClass('hide');
			myArticle.find('.a').slideUp(100);
		}
		return false;
	});
	$('.faq>.faqHeader>.showAll').click(function(){
		var hidden = $('.faq>.faqBody>.article.hide').length;
		if(hidden > 0){
			article.removeClass('hide').addClass('show');
			article.find('.a').slideDown(100);
		} else {
			article.removeClass('show').addClass('hide');
			article.find('.a').slideUp(100);
		}
	});
});
