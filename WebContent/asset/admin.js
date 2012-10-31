(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	$('#loginMessage').text($.cookie("name") + '님 로그인하셨습니다.');

	$('#adminButton').bind('click',
	function()
	{
		//선택된 메뉴에만 선택 클래스 설정
		$('#mainNavigation > ul > li').removeClass('menuSelected');

		//페이지 로드
		$('#content').load('memList.html');
		$('#postHeader').load('admin_submenu.html');

		$('#postHeaderWrapper').animate(
		{
			opacity : 1,
			height : 60
		}, 'normal');
	});

	$('#mypageButton').bind('click',
	function()
	{
		//선택된 메뉴에만 선택 클래스 설정
		$('#mainNavigation > ul > li').removeClass('menuSelected');

		//페이지 로드
		$('#content').load('mypage.html');
		$('#postHeader').load('mypage_submenu.html');

		$('#postHeaderWrapper').animate(
		{
			opacity : 1,
			height : 60
		}, 'normal');
	});

	$('#logoutButton').bind('click',
	function()
	{
		//쿠키 해제
		$.cookie("id", null);
		$.cookie("email", null);
		$.cookie("name", null);
		$.cookie("category", null);
		$.cookie("random", null);

		//선택된 메뉴에만 선택 클래스 설정
		$('#mainNavigation > ul > li').removeClass('menuSelected');
		$('#main').addClass('menuSelected');

		//로그인 페이지 로딩
		$('#headerLogin').load('login.html');

		//페이지 로드
		$('#content').load('main.html');

		$('#postHeaderWrapper').animate(
		{
			opacity : 0,
			height : 0
		}, 'normal', function(){ $('#postHeader').html(null); });
	});

})(window);
