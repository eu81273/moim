(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.memberManage");

	//회원정보 URL
	var getInfoURL = commonController.defaultPath + "/member/getMember";

	var MyMeetingURL = commonController.defaultPath + "/meeting/getMyMeeting";

	$('#mypageMessage').text($.cookie("name") + ' 님의 마이페이지 :)');

	var member =
	{
		memEmail : $.cookie("email"),
		memName : $.cookie("name"),
		memCategoryid : $.cookie("category")
	};

	commonController.ajax.accessData(getInfoURL, member,
	function(result) //성공시
	{
		$('#memberName').text(result.MEMBER[0].memName);
		//$('#memberEmail').text(result.MEMBER[0].memEmail);
		//$('#memberPhone').text(result.MEMBER[0].memPhone);
		$('#memberCategory').text(result.MEMBER[0].catName + "　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　");
		$('#moimMainImageFile').attr('src', commonController.defaultPath + '/uploaded_files/' + result.MEMBER[0].memPhoto);
	},
	function() //실패시
	{
		commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..');
	});


	commonController.memberManage.gridPanel =
	(function()
	{
		var member =
		{
			id : $.cookie("id")
		};

		commonController.ajax.accessData(MyMeetingURL, member,
		function(result)
		{
			console.log(result.MYMEETING);
			commonController.memberManage.gridPanel.setGridData(result.MYMEETING);
		});

		var tableColumn = ["meeId","meeName","meeCurrentpeople", "meeMaxpeople","memName"];

		function _setGridData(dataList)
		{
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
		}

		return { setGridData : _setGridData };

	})();
})(window);