$(function(){

	var interval=3000;

	$('.slideshow').each(function(){

		var slideshow = $('.slideshow');

		function switchImg(){

		var img = $('.slideshow').find('img');

			var first = img.eq(0);
			var second = img.eq(1);



		first.fadeOut().appendTo(slideshow);

		second.fadeIn();



		}
		setInterval(switchImg, interval);
	});
});
