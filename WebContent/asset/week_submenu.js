(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.meetingManagement");




	commonController.meetingManagement.weeklyMeeting =
	(function()
	{
		//전체 모임 조회
		var urlWeeklyMeeting = commonController.defaultPath + "/meeting/thisweekMeeting";

		//파라메터로 보낼 멤버 객체
		var meeting = null;


		function _init()
		{
			//초기에는 기본 페이지로
			meeting = {	};

			//카테고리 선택
			if( $.cookie('category') )
			{
				//자신의 선호 카테고리를 기본 선택
				$('#subNavigation > ul').children(':nth-child(' + (Number($.cookie('category')) + 1) + ')').addClass('subSelected');

				//카테고리 반영
				meeting.meeCategoryid = $.cookie('category');
			}
			else
			{
				$('#subNavigation > ul').children(':nth-child(1)').addClass('subSelected');
				meeting.meeCategoryid = "0";
			}

			//목록 가져오기
			_getList();


			//서브 메뉴 클릭 이벤트
			$('#subNavigation').bind('click',
			function(e)
			{
				var selectedRow = $(e.target).closest('li');

				//서브 메뉴가 정확히 선택된 경우에만!
				if( selectedRow.length )
				{
					//선택된 메뉴에만 선택 클래스 설정
					$('#subNavigation > ul > li').removeClass('subSelected');
					$(selectedRow).addClass('subSelected');

					//카테고리 반영
					meeting.meeCategoryid = $(selectedRow).parent().find('li').index($(selectedRow)) + "";

					//목록 가져오기
					_getList();
				}
			});
		}



		function _getList()
		{
			console.log('[파라메터]');
			console.log(meeting);

			commonController.ajax.accessData(urlWeeklyMeeting, meeting,
			function(json) // 성공
			{
				console.log(json.thisweekMeeting);

				if( json.thisweekMeeting )
				{

					//초기화
					$('#content').html('<div class="moimMainTitleContainer"><img src="asset/moim_week.png"><span class="moimMainTitle"> 금주의 모임입니다!</span></div>');

					//모임 리스트
					for(var i in json.thisweekMeeting)
					{
						$('#content').append('<div class="moimContainer"><div class="page-curl shadow-bottom"><img src="' + commonController.defaultPath + '/uploaded_files/' + json.thisweekMeeting[i]['meePhoto'] + '"></div><div class="moimDescription"><h1>' + json.thisweekMeeting[i]['meeName'] + '</h1>' + json.thisweekMeeting[i]['meeExplain'] + '<input type="button" name="' + json.thisweekMeeting[i]['meeId'] + '" value="자세히 보기"></div></div>');
					}

					$('#content > .moimContainer > .moimDescription > input').unbind().bind('click',
					function(e)
					{
						//쿠키에 선택한 모임 번호 저장한 후,
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
					$('#content').html('<div class="moimMainTitleContainer"><img src="asset/moim_error.png"><span class="moimMainTitle"> 해당 카테고리의 모임이 없습니다!</span></div>');
				}
			},
			function()
			{
				commonController.messageDialog('연결 실패', '서버와의 연결이 원활하지 않습니다.', function(){});
			});
		}


		return { init : _init };
	})();


	//초기화
	commonController.meetingManagement.weeklyMeeting.init();

})(window);