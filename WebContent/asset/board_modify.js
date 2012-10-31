(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	// 네임 스페이스 선언
	commonController.createNameSpace("commonController.boardManagement");





	commonController.boardManagement.modifyArticle =
	(function()
	{
		//수정 주소
		var updateBoardURL = commonController.defaultPath + "/board/updateBoard";


		function _init()
		{

			//저장 버튼
			$('#modifyCommit').unbind().bind('click',
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
							meeId : $.cookie("meeid") + "",
							boaNum : commonController.boardManagement.listArticle.getSelectedArticle() + "",
							boaSubject :$.trim($('#form_boardtitle').val()) + "",
							boaContent :  $.trim($('#form_boardcontent').val()) + ""
					};

					commonController.ajax.accessData(updateBoardURL, board,
					function(result)
					{
						commonController.messageDialog('수정 완료', '정상적으로 글이 수정되었습니다.',
						function()
						{
							$('#content').load('board_read.html');
						});
					},
					function()
					{
						//연결 오류 메시지..
						commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');


					});
				}
			});

			//취소 버튼
			$('#cancel').unbind().bind('click',
			function(e)
			{
				$('#content').load('board_read.html');
			});

		}


		return { init : _init };
	})();


	//초기화
	commonController.boardManagement.modifyArticle.init();

})(window);