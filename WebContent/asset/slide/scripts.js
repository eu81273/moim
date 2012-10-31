$(function(){

	$('.alt').hide();

	var interval=10000;

	$('.slideshow').each(function(){

		var container = $(this);

		function switchImg(){

			var img = container.find('img');

			var first = img.eq(0);

			var second = img.eq(1).hide();


			first.fadeOut(10000).hide().appendTo(container);

			second.fadeIn(10000);

		}
		setInterval(switchImg, interval);
	});
});
