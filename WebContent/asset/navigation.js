(function(global)
{
	//일종의 import 작업
	var commonController = global.commonController;

	//초기화
	$(document).ready(function()
	{

		//로그인 여부에 따라 불러오는 페이지 다름.
		if(!$.cookie('id'))
		{
			//로그인 페이지 로딩
			$('#headerLogin').load('login.html');
		}
		else
		{
			if($.cookie('id') == 0)
			{
				//관리자 로그아웃 페이지 로딩
				$('#headerLogin').load('admin.html');
			}
			else
			{
				//로그아웃 페이지 로딩
				$('#headerLogin').load('logout.html');
			}
		}


		//메인 메뉴
		$('#main').bind('click',
		function(e)
		{
			//선택된 메뉴에만 선택 클래스 설정
			$('#mainNavigation > ul > li').removeClass('menuSelected');
			$('#main').addClass('menuSelected');

			//페이지 로드
			$('#content').load('main.html');

			$('#postHeaderWrapper').animate(
			{
				opacity : 0,
				height : 0
			}, 'normal', function(){ $('#postHeader').html(null); });

		});

		//금주의 모임 메뉴
		$('#week').bind('click',
		function(e)
		{
			//선택된 메뉴에만 선택 클래스 설정
			$('#mainNavigation > ul > li').removeClass('menuSelected');
			$('#week').addClass('menuSelected');

			//페이지 로드
			//$('#content').load('week.html');
			$('#postHeader').load('week_submenu.html');

			$('#postHeaderWrapper').animate(
			{
				opacity : 1,
				height : 60
			}, 'normal');

		});


		//추천 모임 메뉴
		$('#recommend').bind('click',
		function(e)
		{
			//선택된 메뉴에만 선택 클래스 설정
			$('#mainNavigation > ul > li').removeClass('menuSelected');
			$('#recommend').addClass('menuSelected');

			//페이지 로드
			//$('#content').load('recommend.html');
			$('#postHeader').load('recommend_submenu.html');

			$('#postHeaderWrapper').animate(
			{
				opacity : 1,
				height : 60
			}, 'normal');

		});


		//전체 모임 메뉴
		$('#recent').bind('click',
		function(e)
		{
			//선택된 메뉴에만 선택 클래스 설정
			$('#mainNavigation > ul > li').removeClass('menuSelected');
			$('#recent').addClass('menuSelected');

			//페이지 로드
			//$('#content').load('total_meeting.html');
			$('#postHeader').load('total_meeting_submenu.html');

			$('#postHeaderWrapper').animate(
			{
				opacity : 1,
				height : 60
			}, 'normal');

		});


		//검색 메뉴
		$('#search').bind('click',
		function(e)
		{
			//선택된 메뉴에만 선택 클래스 설정
			$('#mainNavigation > ul > li').removeClass('menuSelected');
			$('#search').addClass('menuSelected');

			//페이지 로드
			//$('#content').load('search.html');
			$('#postHeader').load('search_submenu.html');

			$('#postHeaderWrapper').animate(
			{
				opacity : 1,
				height : 120
			}, 'normal');

		});

		//기본 페이지인 main 페이지 로딩
		$('#content').load('main.html');
	});
})(window);

