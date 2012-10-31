(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.listMeeting");


	var MyMeetingURL = commonController.defaultPath + "/meeting/getMyMeeting";

	//var urlPageMyMeeting = "http://localhost:8000/meeting/getPageMeeting";


	var pageNum = 1; // 페이지 초기화



	commonController.listMeeting.gridPanel =
	(function()
	{
		function _init()
		{
			//리스트 갱신
			_getGridData();

			//TBODY를 클릭했을 때 이벤트 처리
			$('#meetingTable').unbind().bind("click",
			function(e)
			{
				//선택한 줄
				selectedRow = $(e.target).closest('tr');

				//선택된 항목에만 선택 클래스 설정
				$(selectedRow).siblings('tr').removeClass('tableSelected');
				$(selectedRow).addClass('tableSelected');

				commonController.confirmDialog('모임', $(selectedRow).children(":nth-child(2)").text() + ' 모임으로 이동합니다. :)',
				function()
				{
					//쿠키에 선택한 모임 번호 저장한 후,
					$.cookie("meeid", $(selectedRow).children(":first-child").text());

					//선택된 메뉴에만 선택 클래스 설정
					$('#mainNavigation > ul > li').removeClass('menuSelected');

					//페이지 로드
					$('#content').load('meeting.html');
					$('#postHeader').load('meeting_submenu.html');

					$('#postHeaderWrapper').animate(
					{
						opacity : 1,
						height : 60
					}, 'normal');
				});
			});
		}

		function _getGridData()
		{
			var member =
			{
				id : $.cookie("id")
			};

			commonController.ajax.accessData(MyMeetingURL, member,
			function(result)
			{
				if( result.MYMEETING )
				{
					_setGridData(result.MYMEETING);
				}
			},
			function()
			{
				commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..', function(){});
			});
		}

		function _setGridData(dataList)
		{
			meetingData = dataList;

			var tableColumn = ["meeId","meeName","meeCurrentpeople", "meeMaxpeople","memName"];

			var tableData = "";

			if(dataList)
			{
				for(var i in dataList)
				{
					tableData += "<tr>";

					for(var j in tableColumn)
					{
						tableData += "<td>" + dataList[i][tableColumn[j]] + "</td>";
					}
				}

				$('#meetingTable').html(tableData);
			}
		}
		return { init : _init };
	})();


	//초기화
	commonController.listMeeting.gridPanel.init();

})(window);