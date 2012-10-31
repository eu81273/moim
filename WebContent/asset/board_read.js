(function(global)
{
	//읽기

	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	// 네임 스페이스 선언
	commonController.createNameSpace("commonController.boardManagement");



	commonController.boardManagement.readArticle =
	(function()
	{
		//게시판 삭제 주소
		var deleteBoardURL = commonController.defaultPath + "/board/deleteBoard";

		//게시물 세부 내용 주소
		var getDetailBoardURL = commonController.defaultPath + "/board/getDetailBoard";

		//코멘트 리스트 주소
		var getCommentsURL = commonController.defaultPath + "/comments/getComments";

		//코멘트 추가 주소
		var insertCommentsURL = commonController.defaultPath + "/comments/insertComments";

		//코멘트 삭제 주소
		var deleteCommentsURL = commonController.defaultPath + "/comments/deleteComments";

		//코멘트 추가 주소
		var updateCommentsURL = commonController.defaultPath + "/comments/updateComments";


		//코멘트 데이터
		var commentData = null;

		//선택한 코멘트
		var selectedComment = null;

		//선택한 줄
		var selectedRow = null;


		function _init()
		{
			var board =
			{
				meeId : $.cookie("meeid") + "",
				boaNum : commonController.boardManagement.listArticle.getSelectedArticle() + ""
			};

			commonController.ajax.accessData(getDetailBoardURL, board,
			function(result)
			{
				console.log('[읽기]');
				console.log(result);

				$('#BoardDetailNum').text( result.BOARD[0].boaNum );
				$('#BoardDetailTitle').text(result.BOARD[0].boaSubject);
				$('#BoardDetailFile').text(result.BOARD[0].boaFile);
				$('#BoardDetailContent').text(result.BOARD[0].boaContent );
				$('#BoardDetailDate').text(result.BOARD[0].boaDate.substring(0,10));
				$('#BoardDetailMemName').text(result.BOARD[0].memName);

				//내가 쓴 글이면,
				if( result.BOARD[0]['memId'] == $.cookie('id') )
				{
					//수정 및 삭제 버튼 추가
					$('#articleControl').append('<input type="button" id="modify" value="수정"/><input type="button" id="delete" value="삭제"/>');


					//수정버튼
					$('#modify').unbind().bind('click',
					function(e)
					{
						var board =
						{
							meeId : $.cookie("meeid") + "",
							boaNum : commonController.boardManagement.listArticle.getSelectedArticle() + ""
						};

						$('#content').load('board_modify.html',
						function()
						{
							commonController.ajax.accessData(getDetailBoardURL, board,
							function(result)
							{
								if( result.BOARD )
								{
									$('#form_boardtitle').val(result.BOARD[0].boaSubject);
									$('#form_boardcontent').val(result.BOARD[0].boaContent);
								}
								else
								{
									//접속 오류 메시지
									commonController.messageDialog('오류', '서버로부터 정보를 가져올 수 없습니다.');
								}
							},
							function()
							{
								//여기도 접속 오류
								commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');
							});
						});
					});


					//삭제버튼
					$('#delete').unbind().bind('click',
					function(e)
					{
						commonController.confirmDialog('글 삭제', '이 게시물을 삭제합니까?',
						function()
						{
							var board =
							{
								meeId : $.cookie("meeid") + "",
								boaNum : commonController.boardManagement.listArticle.getSelectedArticle() + ""
							};

							console.log('[삭제]');
							console.log(board);

							commonController.ajax.accessData(deleteBoardURL, board,
							function(result)
							{
								$('#content').load('board_list.html');
							},
							function()
							{
								//접속 오류
								commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');
							});
						});
					});
				}
			},
			function()
			{
				//여기엔 실패했을 때 메시지
				commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');
			});



			//목록 버튼
			$('#list').unbind().bind('click',
			function(e)
			{
				//commonController.boardManagement.listArticle.resetSelectedArticle();
				$('#content').load('board_list.html');
			});


			//댓글 등록 버튼(완성)
			$('#commentCommit').unbind().bind('click',
			function(e)
			{
				//로그인 한 경우에만,
				if( $.cookie("id") )
				{
					if( $.trim($('#commentContent').val()) )
					{
						var comment =
						{
							meeId : $.cookie("meeid") + "",
							memId : $.cookie("id") + "",
							boaNum : commonController.boardManagement.listArticle.getSelectedArticle() + "",
							comContent : $('#commentContent').val()
						};

						commonController.ajax.accessData(insertCommentsURL, comment,
						function(result)
						{
							//댓글 갱신
							_getGridData();

							//댓글 내용 초기화
							 $('#commentContent').val(null);
						},
						function()
						{
							//실패했을 때는 실패 메시지를
							commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');
						});
					}
					else
					{
						commonController.messageDialog('오류', '댓글의 내용을 입력해 주십시오!',
						function()
						{
							$('#commentContent').focus();
						});
					}
				}
				else
				{
					commonController.messageDialog('오류', '로그인한 사용자만 댓글을 달 수 있습니다.');
				}
			});



			//코멘트 있을 경우 불러오기
			_getGridData();
		}

		//게시물 내용 가져오기
		function _getGridData()
		{
			var board =
			{
				meeId : $.cookie("meeid") + "",
				boaNum : commonController.boardManagement.listArticle.getSelectedArticle() + ""
			};

			commonController.ajax.accessData(getCommentsURL, board,
			function(result)
			{
				_setGridData(result.COMMENTS);
			},
			function()
			{
				//여기엔 실패했을 때 메시지
				commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');
			});
		}


		//코멘트 출력
		function _setGridData(dataList)
		{
			commentData = dataList;

			console.log('[코멘트 데이터');
			console.log(commentData);

			var tableColumn = ["comNum","memName","comContent","comDate"];

			var tableData = "";

			if(dataList)
			{
				for(var i in dataList)
				{
					tableData += "<tr>";

					for(var j in tableColumn)
					{
						if( j != 3 )
						{
							tableData += "<td>" + dataList[i][tableColumn[j]] + "</td>";
						}
						else
						{
							tableData += "<td>" + dataList[i][tableColumn[j]].substring(0,10) + "</td>";
						}
					}
				}

				//코멘트 내용 추가
				$('#commentTable').html(tableData);


				//수정 및 삭제 버튼 이벤트 설정
				$('#commentTable').bind("click",
				function(e)
				{
					//선택된 줄
					selectedRow = $(e.target).closest('tr');

					//선택된 줄만 색상주기
					$(selectedRow).siblings('tr').removeClass('tableSelected');
					$(selectedRow).addClass('tableSelected');

					//코멘트 번호 가져오기
					selectedComment = $(selectedRow).children(":first-child").text();


					//일단 수정 및 삭제 버튼 제거
					$('#modifyComment').unbind().remove();
					$('#deleteComment').unbind().remove();

					for(var i in commentData)
					{
						//내가 쓴 글이면,
						if(commentData[i]['memId'] == $.cookie('id') )
						{
							//코멘트 창에 내용 추가
							$('#commentContent').val($(selectedRow).children(":nth-child(3)").text());

							//수정 및 삭제 버튼 추가
							$('#commentControl').append('<input type="button" id="modifyComment" value="리플수정" /><input type="button" id="deleteComment" value="리플삭제" />');

							//수정 버튼 클릭 이벤트 설정
							$('#modifyComment').unbind().bind('click',
							function(e)
							{
								var comment =
								{
									meeId : $.cookie("meeid") + "",
									comContent : $('#commentContent').val() + "",
									comNum :  commentData[i]['comNum'] + ""
								};

								console.log(comment);

								commonController.ajax.accessData(updateCommentsURL, comment,
								function(result)
								{
									//내용 수정
									$(selectedRow).children(":nth-child(3)").text($('#commentContent').val());

									//코멘트 입력창 초기화
									$('#commentContent').val(null);

									//선택 초기화
									$(selectedRow).siblings('tr').removeClass('tableSelected');

									//선택한 줄 초기화
									selectedRow = null;

									//선택한 코멘트 초기화
									selectedComment = null;
								},
								function()
								{
									//접속 오류 메시지
									commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');

								});
							});

							//수정 버튼 클릭 이벤트 설정
							$('#deleteComment').unbind().bind('click',
							function(e)
							{
								var comment =
								{
									meeId : $.cookie("meeid") + "",
									comNum :  commentData[i]['comNum'] + ""
								};

								console.log(comment);

								commonController.ajax.accessData(deleteCommentsURL, comment,
								function(result)
								{
									//코멘트 삭제
									$(selectedRow).remove();

									//코멘트 입력창 초기화
									$('#commentContent').val(null);

									//선택한 줄 초기화
									selectedRow = null;

									//선택한 코멘트 초기화
									selectedComment = null;
								},
								function()
								{
									//접속 오류 메시지
									commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');

								});
							});

							break;
						}
					}
				});
			}
		}

		return { init : _init };
	})();


	commonController.boardManagement.readArticle.init();

})(window);