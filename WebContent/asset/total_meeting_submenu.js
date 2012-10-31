(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.meetingManagement");




	commonController.meetingManagement.totalMeeting =
	(function()
	{
		//전체 모임 조회
		var urlTotalMeeting = commonController.defaultPath + "/meeting/allPageMeeting";

		//파라메터로 보낼 멤버 객체
		var meeting = null;

		//기본 페이지
		var pageNum = 1;


		function _init()
		{
			//초기에는 기본 페이지로
			meeting =
			{
				page : pageNum + ""
			};

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

					//페이지 초기화
					pageNum = 1;

					//페이지 적용
					meeting.page = pageNum + "";

					//목록 가져오기
					_getList();
				}
			});
		}



		function _getList()
		{
			console.log('[파라메터]');
			console.log(meeting);

			commonController.ajax.accessData(urlTotalMeeting, meeting,
			function(json) // 성공
			{
				console.log(json.ALLPAGE);

				if( json.ALLPAGE )
				{
					//초기화
					$('#content').html('<div class="moimMainTitleContainer"><img src="asset/moim_total.png"><span class="moimMainTitle"> moim 안의 모든 모임입니다!</span></div>');

					//모임 리스트
					for(var i in json.ALLPAGE)
					{
						$('#content').append('<div class="moimContainer"><div class="page-curl shadow-bottom"><img src="' + commonController.defaultPath + '/uploaded_files/' + json.ALLPAGE[i]['meePhoto'] + '"></div><div class="moimDescription"><h1>' + json.ALLPAGE[i]['meeName'] + '</h1>' + json.ALLPAGE[i]['meeExplain'] + '<input type="button" name="' + json.ALLPAGE[i]['meeId'] + '" value="자세히 보기"></div></div>');
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

					commonController.messageDialog('오류', '해당 카테고리에 해당하는 모임이 더이상 없습니다.',
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


	//초기화
	commonController.meetingManagement.totalMeeting.init();

})(window);