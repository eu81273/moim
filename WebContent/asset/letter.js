(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.letterManagement");


	//그리드 패널
	commonController.letterManagement.letterList =
	(function()
	{
		//안내장 읽기
		var urlLetterList = commonController.defaultPath + "/letter/getLetter";

		//안내장 삭제
		var urlLetterDelete = commonController.defaultPath + "/letter/deleteLetter";

		//안내장 페이지 단위 리스트
		var urlPageLetter = commonController.defaultPath + "/letter/getPageLetter";

		//페이지
		var pageNum = 1; // 페이지 초기화



		//공간 리스트 컬럼 항목
		var tableColumn = ["letId","letTitle","letFrommemname","letDate","letCheck"];

		//사용자 정보
		var letterData = null;

		//선택한 줄 변수
		var selectedRow = null;

		//선택한 안내장
		var selectedLetter = null;

		//선택한 모임
		var selectedMeeting = null;



		//TBODY를 클릭했을 때 이벤트 처리
		function _init()
		{
			//초기 데이터 로드
			 _refreshGridData();

			//TBODY를 클릭했을 때 이벤트 처리
			$('#letterTable').unbind().bind("click", // 두번 클릭할 수 있음을 방지
			function(e)
			{
				//선택한 줄
				selectedRow = $(e.target).closest('tr');

				//선택된 항목에만 선택 클래스 설정
				$(selectedRow).siblings('tr').removeClass('tableSelected');
				$(selectedRow).addClass('tableSelected');

				//선택한 안내장
				selectedLetter = $(selectedRow).children(":nth-child(1)").text();



				var letter =
				{
					letToMem : $.cookie("id") + "",
					letId : selectedLetter + ""
				};

				//쪽지 내용 보여주기
				commonController.ajax.accessData(urlLetterList, letter,// 주소값, 파라미터, 성공실패
				function(json) // 성공
				{
					commonController.messageDialog(json.LETTER[0].letTitle, json.LETTER[0].letContent,
					function()
					{
						//읽음으로 표시
						$(selectedRow).children(":nth-child(5)").text('Y');

						//모임 아이디 가져오기
						selectedMeeting = json.LETTER[0].meeId;

						console.log('[안내장읽기]');
						console.log(json.LETTER[0]);
					});
				},
				function()
				{
					commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다.');
				});



				//이동 및 삭제 버튼 추가
				$('.rightController').html('<input type="button" id="jumpButton" value="모임으로 이동하기"/><input type="button" id="deleteButton" value="삭제하기"/>');

				//이동 버튼
				$('#jumpButton').unbind().bind('click',
				function(e)
				{
					commonController.confirmDialog('모임으로 이동', '이 안내장을 보낸 모임으로 이동합니까?',
					function()
					{
						//모임 설정
						$.cookie('meeid', selectedMeeting + "");

						//네비게이션 선택 초기화
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
				});


				//삭제버튼
				$('#deleteButton').unbind().bind('click',
				function(e)
				{
					commonController.confirmDialog('안내장 삭제', '이 안내장을 삭제합니까?',
					function()
					{
						commonController.ajax.accessData(urlLetterDelete, letter,// 주소값, 파라미터, 성공실패
						function(json) // 성공
						{
							//새로 고침
							_refreshGridData();
						},
						function() // 실패
						{
							commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다.');

						});
					});
				});
			});


			//이전 페이지 버튼을 눌렀을 때
			$('#prevButton').unbind().bind("click",
			function(e)
			{
				if(--pageNum)
				{
					 _refreshGridData();
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
				pageNum++;
				_refreshGridData();
			});

		}


		//안내장 목록 갱신
		function _refreshGridData()
		{
			// 파라미터(페이지 값을 넘겨줌)
			var letter =
			{
				page :  pageNum + "",
				letToMem : $.cookie("id") + ""
			};

			commonController.ajax.accessData(urlPageLetter, letter, // 주소값, 파라미터, 성공실패
			function(json) // 성공
			{
				letterData = json.PAGELETTER;

				console.log('[안내장]');
				console.log(letterData);

				var tableData = "";

				if(letterData)
				{
					//console.log('실행되냐?4');

					for(var i in letterData)
					{
						tableData += "<tr>";

						for(var j in tableColumn)
						{
							tableData += "<td>" + letterData[i][tableColumn[j]] + "</td>";
						}

						tableData += "</tr>";
					}

					$('#letterTable').html(tableData); //테이블에 위에서 생성한 테이블 데이터를 넣는다.
				}
				else
				{
					//값이 없으므로
					pageNum--;
				}
			});
		}

		return { init : _init };
	})();


	commonController.letterManagement.letterList.init();

})(window);