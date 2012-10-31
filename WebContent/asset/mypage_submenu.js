(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//메인 메뉴
	$('#subNavigation').bind('click',
	function(e)
	{
		var selectedRow = $(e.target).closest('li');

		//서브 메뉴가 정확히 선택된 경우에만!
		if(selectedRow.length)
		{
			//선택된 메뉴에만 선택 클래스 설정
			$('#subNavigation > ul > li').removeClass('subSelected');
			$(selectedRow).addClass('subSelected');

			switch( $(selectedRow).text() )
			{
				case '마이페이지 홈':
					$('#content').load('mypage.html');
				break;

				case '모임생성':
					$('#content').load('meeting_enroll.html');
				break;

				case '참여모임조회':
					$('#content').load('meeting_list.html');
				break;

				case '회원정보수정':
					$('#content').load('modify.html');
				break;

				case '안내장':
					$('#content').load('letter.html');
				break;

				case '회원탈퇴':
					commonController.confirmDialog('회원탈퇴', '소셜 모임 사이트 [moim] 을 탈퇴하시겠습니까?',
					function()
					{
						//회원 탈퇴 주소
						var leaveURL = commonController.defaultPath + "/member/deleteMember";

						var member =
						{
							memEmail : $.cookie("email") + "",
							memId : $.cookie("id") + "",
							random : $.cookie("random") + ""
						};

						//입력한 내용을 저장
						commonController.ajax.accessData(leaveURL, member,
						function(result) //로그인 성공시
						{
							//회원 탈퇴 성공 메시지
							commonController.messageDialog('탈퇴 완료', '회원 탈퇴가 안전하게 완료되었습니다. 그동안 이용해주셔서 감사합니다!',
							function()
							{
								//쿠키 해제
								$.cookie("id", null);
								$.cookie("email", null);
								$.cookie("name", null);
								$.cookie("category", null);
								$.cookie("random", null);

								//로그인 페이지 로딩
								$('#headerLogin').load('login.html');

								//메인페이지 로딩
								$('#content').load('main.html');

								$('#postHeaderWrapper').animate(
								{
									opacity : 0,
									height : 0
								}, 'normal', function(){ $('#postHeader').html(null); });
							});


						},
						function() //로그인 실패시
						{
							//회원 탈퇴 실패 메시지
							commonController.messageDialog('탈퇴 실패', '서버와 연결되지 않아 탈퇴 실패! 다시 시도해주세요!');
						});

					});
				break;
			}
		}
	});

})(window);
