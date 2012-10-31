(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.meetingManagement");


	//일정
	var urlGetMeetingPlan = commonController.defaultPath + "/place/getPlan";



	commonController.meetingManagement.meetingPlan =
	(function()
	{
		function _init()
		{
			var meeting =
			{
				meeId : $.cookie("meeid")
			};

			console.log(meeting);

			//모임 일정을 초기화
			commonController.ajax.accessData(urlGetMeetingPlan, meeting,
			function(result)
			{
				console.log(result.MEETTIME);

				if( result.MEETTIME )
				{
					var tableColumn = ["plaName","usedDate","usedTime"];

					var tableData = "";

					for(var i in result.MEETTIME)
					{
						tableData += "<tr><td>" + result.MEETTIME[i][tableColumn[0]] + "</td><td>" + commonController.timeTable.getDateTable(result.MEETTIME[i][tableColumn[1]]) + "</td><td>" + commonController.timeTable.getTimeTable(result.MEETTIME[i][tableColumn[2]]) + "</td></tr>";
					}

					$('#planTable').html(tableData);

				}
				else
				{
					commonController.messageDialog('오류', '정상적으로 데이터를 가져올 수 없습니다.', function(){});
				}
			},
			function()
			{
				commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..', function(){});
			});
		}


		return { init : _init };
	})();

	//초기화
	commonController.meetingManagement.meetingPlan.init();

})(window);