(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	commonController.createNameSpace("commonController.meetingManage");

	//var urlSearchMeeting = commonController.defaultPath + "/meeting/getSelectmeeting";

	var urlHomeMeeting = commonController.defaultPath + "/meeting/homeMeeting";

	// 최신 모임 5개를 뿌려줌
	var Meeting ={};

	commonController.ajax.accessData(urlHomeMeeting, Meeting,// 주소값, 파라미터, 성공실패

	function(json) // 성공
	{
		console.log(json);

		if( json.homeMeeting )
		{
			//초기화
			//$('#content').html(null);

			for(var i in json.homeMeeting)
			{
				$('#content').append('<div class="moimContainer"><div class="page-curl shadow-bottom"><img src="' + commonController.defaultPath + '/uploaded_files/' + json.homeMeeting[i]['meePhoto'] + '"></div><div class="moimDescription"><h1>' + json.homeMeeting[i]['meeName'] + '</h1>' + json.homeMeeting[i]['meeExplain'] + '<input type="button" name="' + json.homeMeeting[i]['meeId'] + '" value="자세히 보기"></div></div>');
			}

			$('#content > .moimContainer > .moimDescription > input').unbind().bind('click',
			function(e)
			{
/*				//쿠키에 선택한 모임 번호 저장한 후,
				$.cookie("meeid", $(e.target)[0].name + "");

				//선택된 메뉴에만 선택 클래스 설정
				$('#mainNavigation > ul > li').removeClass('menuSelected');

				//페이지 로드
				$('#content').load('main.html', function()
				{
					$('html, body').animate(
					{
						scrollTop: 0
					}, 'slow');

				});*/


				$.cookie("meeid", $(e.target)[0].name + "");

				//선택된 메뉴에만 선택 클래스 설정
				$('#mainNavigation > ul > li').removeClass('menuSelected');

				//모임 페이지 로드
				$('#content').load('meeting.html', function()
				{
					$('html, body').animate(
					{
						scrollTop: 0
					}, 'slow');

					$('#postHeader').load('meeting_submenu.html',
					function()
					{
						$('#postHeaderWrapper').animate(
						{
							opacity : 1,
							height : 60
						}, 'normal');
					});
				});




			});
		}
		else
		{
			$('#content').html('검색 결과가 없습니다 관련 HTML 태그들을 넣읍시다');
		}
	},
	function()
	{
		commonController.messageDialog('연결 실패', '서버와의 연결이 원활하지 않습니다.', function(){});
	});

		//return {init : _init};


	//commonController.meetingManage.init();

})(window);
