(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	// 네임 스페이스 선언
	commonController.createNameSpace("commonController.boardManagement");


	commonController.boardManagement.writeArticle =
	(function()
	{
		var writeBoradURL = commonController.defaultPath + "/board/createBoard";


		function _init()
		{
			$('#writeCommit').unbind().bind('click',
			function(e)
			{
				if( !$.trim($('#form_boardtitle').val()).length || $.trim($('#form_boardtitle').val()).length > 30 )
				{
					commonController.messageDialog('입력 오류', '제목을 30자 이내로 입력해주세요~!',
					function()
					{
						$('#form_boardtitle').focus();
					});
				}
				else if( !$.trim($('#form_boardcontent').val()).length || $.trim($('#form_boardcontent').val()).length > 1000 )
				{
					commonController.messageDialog('입력 오류', '글 내용을 1000자 이내로 입력해주세요~!',
					function()
					{
						$('#form_boardcontent').focus();
					});
				}
				else
				{
					var board =
					{
						boaSubject : $.trim($('#form_boardtitle').val()) + "",
						boaContent : $.trim($('#form_boardcontent').val()) + "",
						memId : $.cookie("id") + "",
						meeId : $.cookie("meeid") + ""
					};

					commonController.ajax.accessData(writeBoradURL, board,
					function(result)
					{
						commonController.messageDialog('작성 완료', '정상적으로 글이 작성되었습니다.',
						function()
						{
							$('#content').load('board_list.html');
						});
					},
					function()
					{
						commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');
					});
				}
			});


			$('#cancel').unbind().bind('click',
			function(e)
			{
				if( !$.trim($('#form_boardtitle').val()).length && !$.trim($('#form_boardcontent').val()).length )
				{
					$('#content').load('board_list.html');
				}
				else
				{
					commonController.confirmDialog('주의', '작성 중인 글을 있습니다. 무시하고 목록으로 이동합니까?',
					function()
					{
						$('#content').load('board_list.html');
					});
				}
			});
		}

		return { init : _init };
	})();


	//초기화
	commonController.boardManagement.writeArticle.init();

})(window);