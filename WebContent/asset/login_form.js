(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//로그인 주소
	var loginURL = commonController.defaultPath + "/member/logIn";


	//로그인 버튼에 이벤트 할당
	$('#submitButton').bind('click',
	function(e)
	{
		var regEmail = /^.+@.+\..+/;

		if( $.trim($('#form_email').val()).length > 30 || !regEmail.test($('#form_email').val()))
		{
			$('#form_email').focus();

			$('#warning').html('이메일 주소를 30자 이내로 정확히 입력해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else if( !$.trim($('#form_password').val()).length || $.trim($('#form_password').val()).length > 10 )
		{
			$('#form_password').focus();

			$('#warning').html('패스워드를 10자 이내로 입력해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else
		{
			var member =
			{
				memEmail : $.trim($('#form_email').val()).toLowerCase(),
				memPassword : $.trim($('#form_password').val())
			};

			//입력한 내용을 저장
			commonController.ajax.accessData(loginURL, member,
			function(result) //로그인 성공시
			{
				if( result.LOGIN )
				{
					//쿠키 설정
					$.cookie("id", result.LOGIN[0].id);
					$.cookie("email", result.LOGIN[0].email);
					$.cookie("name", result.LOGIN[0].name);
					$.cookie("category", result.LOGIN[0].category);
					$.cookie("random", result.LOGIN[0].random);

					//선택된 메뉴에만 선택 클래스 설정
					$('#mainNavigation > ul > li').removeClass('menuSelected');
					$('#main').addClass('menuSelected');

					if($.cookie('id') == 0)
					{
						//관리자 로그아웃 페이지 로딩
						$('#headerLogin').load('admin.html');
					}
					else
					{
						//로그아웃 페이지 로딩
						$('#headerLogin').load('logout.html');
					}

					//페이지 로드
					$('#content').load('main.html');

					$('#postHeaderWrapper').animate(
					{
						opacity : 0,
						height : 0
					}, 'normal', function(){ $('#postHeader').html(null); });
				}
				else
				{
					//로그인 페이지 로딩
					$("#content").load('login_form.html',
					function()
					{
						$('#warning').html('비밀번호가 잘못되었습니다!');
						$('#warning').animate(
						{
							opacity : 1
						}, 'normal');
					});

					$('#postHeaderWrapper').animate(
					{
						opacity : 0,
						height : 0
					}, 'normal', function(){ $('#postHeader').html(null); });
				}
			},
			function() //로그인 실패시
			{
				//로그인 페이지 로딩
				$("#content").load('login_form.html',
				function()
				{
					$('#warning').html('로그인에 실패했습니다!');
					$('#warning').animate(
					{
						opacity : 1
					}, 'normal');
				});

				$('#postHeaderWrapper').animate(
				{
					opacity : 0,
					height : 0
				}, 'normal', function(){ $('#postHeader').html(null); });

			});
		}
	});

	$('#findId').bind('click',
	function(e)
	{
		$("#content").load('findid_form.html');
	});

	$('#findPassword').bind('click',
	function(e)
	{
		$("#content").load('findpassword_form.html');
	});

})(window);
