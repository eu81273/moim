(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.meetingManagement");



	commonController.meetingManagement.searchMeeting =
	(function()
	{
		//모임 검색
		var urlSearchMeeting = commonController.defaultPath + "/meeting/getSelectmeeting";

		//파라메터로 보낼 멤버 객체
		var meeting = null;

		//기본 페이지
		var pageNum = 1;

		//기본 선택
		var Selected = "name";


		function _init()
		{
			//초기에는 기본 페이지로
			meeting =
			{
				page : pageNum + ""
			};

			//검색창에 포커스
			$('#searchMeeting').focus();


			//서브 메뉴 클릭시
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

					switch( $(selectedRow).text() )
					{
						case '모임명으로 검색':
							Selected="name";
						break;

						case '키워드로 검색':
							Selected="keyword";
						break;
					}
				}
			});

			//검색버튼 클릭시 실행
			$('#searchButton').bind("click",
			function(e)
			{
				if( $.trim($('#searchMeeting').val()) )
				{
					//검색 모드 설정
					meeting.Selected = Selected;

					//검색어 설정
					meeting.text = $.trim($('#searchMeeting').val());

					//페이지 초기화
					pageNum = 1;

					//페이지 설정
					meeting.page = pageNum + "";

					//모임 리스트 불러오기
					_getList();

				}
				else
				{
					commonController.messageDialog('오류', '검색어를 입력해주세요!',
					function()
					{
						$('#searchMeeting').focus();
					});
				}
			});
		}



		function _getList()
		{
			commonController.ajax.accessData(urlSearchMeeting, meeting,
			function(json) // 성공
			{
				console.log(json.MEETING);

				if( json.MEETING )
				{
					//초기화
					$('#content').html('<div class="moimMainTitleContainer"><img src="asset/moim_search.png"><span class="moimMainTitle"> 모임 검색</span></div>');

					//모임 리스트
					for(var i in json.MEETING)
					{
						$('#content').append('<div class="moimContainer"><div class="page-curl shadow-bottom"><img src="' + commonController.defaultPath + '/uploaded_files/' + json.MEETING[i]['meePhoto'] + '"></div><div class="moimDescription"><h1>' + json.MEETING[i]['meeName'] + '</h1>' + json.MEETING[i]['meeExplain'] + '<input type="button" name="' + json.MEETING[i]['meeId'] + '" value="자세히 보기"></div></div>');
					}

					//네비게이션 추가
					$('#content').append('<div class="moimBottomContent"><div class="navigationElement"><img id="prevButton" src="asset/moim_prev.png"></div><div class="navigationElement"><img id="nextButton" src="asset/moim_next.png"></div></div>');

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

					commonController.messageDialog('오류', '해당 검색어에 해당하는 모임이 더이상 없습니다.',
					function()
					{
						//페이지 보정
						--pageNum;
					});

				}

				//이전 페이지 버튼을 눌렀을 때
				$('#prevButton').unbind().bind("click",
				function(e)
				{
					if(--pageNum)
					{
						//페이지 반영
						meeting.page = pageNum + "";

						//목록 불러오기
						_getList();
					}
					else
					{
						pageNum = 1;
					}
				});

				//다음 페이지 버튼을 눌렀을 때
				$('#nextButton').unbind().bind("click",
				function(e)
				{
					//페이지 반영
					meeting.page = ++pageNum + "";

					//목록 불러오기
					_getList();
				});
			},
			function()
			{
				commonController.messageDialog('연결 실패', '서버와의 연결이 원활하지 않습니다.', function(){});
			});
		}


		return { init : _init };

	})();

	commonController.meetingManagement.searchMeeting.init();

})(window);
