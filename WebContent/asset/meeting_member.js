(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.meetingManagement");


	commonController.meetingManagement.meetingMember =
	(function()
	{
		//멤버
		var MeetingMemberURL = commonController.defaultPath + "/member/getMeetingMember";


		function _init()
		{
			var meeting =
			{
				meeId : $.cookie("meeid")
			};

			commonController.ajax.accessData(MeetingMemberURL, meeting,
			function(result) //성공시
			{
				var tableData = "";

				if( result.MEETINGMEMBER )
				{
					for(var i in result.MEETINGMEMBER)
					{
						tableData += "<tr><td><img src=\"" + commonController.defaultPath + "/uploaded_files/" + result.MEETINGMEMBER[i]['memPhoto'] + "\"></td><td>" + result.MEETINGMEMBER[i]['memName'] + "</td><td>" + result.MEETINGMEMBER[i]['memPhone'] + "</td><td>" + result.MEETINGMEMBER[i]['memEmail'] + "</td><td>" + ((result.MEETINGMEMBER[i]['memmeeAdmin'] == 1) ? "관리자" : "회원" ) + "</td></tr>";
					}

					$('#memberTable').html(tableData);
				}
				else
				{
					commonController.messageDialog('오류', '정상적으로 데이터를 가져올 수 없습니다.', function(){});
				}
			},
			function() //실패시
			{
				commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..', function(){});
			});
		}


		return { init : _init };
	})();

	//초기화
	commonController.meetingManagement.meetingMember.init();

})(window);