(function(global)
{
	//리스트


	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	// 네임 스페이스 선언
	commonController.createNameSpace("commonController.boardManagement");

	commonController.boardManagement.listArticle =
	(function()
	{
		//리스트 가져오는 주소
		var getBoardListURL = commonController.defaultPath + "/board/getBoard";

		//현재 회원인지 여부
		var urlIsMember = commonController.defaultPath + "/memberMeeting/isMember";


		//페이지
		var pageNum = 1;

		//글
		var articleNum = null;

		//검색어
		var searchKeyword = null;

		//게시판 컬럼
		var tableColumn = [ "boaNum", "boaSubject", "memName", "boaDate", "boaClicknum" ];

		//가져온 데이터를 저정할 공간
		var boardData = null;

		//선택된 글
		var selectedRow = null;



		//초기화
		function _init()
		{
			//게시판 글 선택 이벤트 설정
			$('#boardTable').unbind().bind("click",
			function(e)
			{
				//선택된 줄
				selectedRow = $(e.target).closest('tr');

				//선택된 줄만 색상주기
				$(selectedRow).siblings('tr').removeClass('tableSelected');
				$(selectedRow).addClass('tableSelected');

				//글번호 가져오기
				articleNum = $(selectedRow).children(":first-child").text();

				//글 읽기 화면으로!
				$('#content').load('board_read.html');
			});

			//이전 페이지 버튼
			$('#prev').unbind().bind("click",
			function(e)
			{
				if( --pageNum )
				{
					_refreshGridData();
				}
				else
				{
					pageNum = 1;
				}
			});

			//다음 페이지 버튼
			$('#next').unbind().bind("click",
			function(e)
			{
				pageNum++;

				_refreshGridData();
			});

			//쓰기 버튼
			$('#write').unbind().bind('click',
			function(e)
			{
				if( $.cookie("id") )
				{
					var member =
					{
						meeId : $.cookie("meeid") + "",
						memId : $.cookie("id") + ""
					};

					//현재 회원인지 여부 확인
					commonController.ajax.accessData(urlIsMember, member,
					function(member)
					{
						if( member.ISMEMBER )
						{
							//여기 회원이면 메뉴 수정
							if( member.ISMEMBER[0]['IsMember'] == "Y" || $.cookie('id') == 0 )
							{
								$('#content').load('board_write.html');
							}
							else
							{
								commonController.messageDialog('오류', '모임의 회원만 글을 쓸 수 있습니다.');
							}
						}
						else
						{
							commonController.messageDialog('오류', '데이터를 읽어오는데 오류가 발생했습니다.');
						}
					},
					function()
					{
						commonController.messageDialog('오류', '서버와의 연결이 원활하지 않습니다.');
					});
				}
				else
				{
					commonController.messageDialog('오류', '게시판에 글을 쓰려면 로그인이 필요합니다. 확인을 누르시면 로그인 페이지로 이동합니다.',
					function()
					{
						//로그인 페이지 로딩
						$("#content").load('login_form.html');

						//서브 메뉴 닫기
						$('#postHeaderWrapper').animate(
						{
							opacity : 0,
							height : 0
						}, 'normal', function(){ $('#postHeader').html(null); });
					});
				}
			});

			//검색 버튼
			$('#searchButton').unbind().bind('click',
			function(e)
			{
				if( !$.trim($('#search_form').val()).length )
				{
					commonController.messageDialog('입력 오류', '검색어를 입력해주세요~!',
					function()
					{
						$('#search_form').focus();
					});
				}
				else
				{
					searchKeyword = $.trim($('#search_form').val());

					//게시물 불러오기
					_refreshGridData();
				}
			});


			//게시물 불러오기
			_refreshGridData();
		}

		function _refreshGridData()
		{
			var board;

			if( searchKeyword )
			{
				board =
				{
					page : pageNum + "",
					searchKeyword : searchKeyword + "",
					meeId : $.cookie("meeid") + ""
				};
			}
			else
			{
				board =
				{
					page : pageNum + "",
					meeId : $.cookie("meeid") + ""
				};
			}

			commonController.ajax.accessData(getBoardListURL, board,
			function(result)
			{
				boardData = result.BOARD;

				console.log('[리스트]');
				console.log(boardData);

				var tableData = "";

				if(boardData)
				{
					for(var i in boardData)
					{
						tableData += "<tr>";

						for(var j in tableColumn)
						{
							if( j != 3 )
							{
								tableData += "<td>" + boardData[i][tableColumn[j]]	+ "</td>";
							}
							else
							{
								tableData += "<td>" + boardData[i][tableColumn[j]].substring(0,10)	+ "</td>";
							}
						}

						tableData += "</tr>";
					}

					$('#boardTable').html(tableData);

				}
				else
				{
					pageNum--;
				}
			},
			function()
			{
				//연결 오류
				commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');
			});
		}

		function _getSelectedArticle()
		{
			return articleNum;
		}

		function _resetSelectedArticle()
		{
			//$(selectedRow).siblings('tr').removeClass('tableSelected');
			articleNum = null;
		}




		return { getSelectedArticle : _getSelectedArticle, resetSelectedArticle : _resetSelectedArticle, init : _init };

	})();

	//리스트 초기화
	commonController.boardManagement.listArticle.init();


})(window);