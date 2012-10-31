(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//로그인 주소
	var loginURL = commonController.defaultPath + "/member/logIn";


	//로그인에 포커스
	$('#email').focus();

	//로그인 버튼에 이벤트 할당
	$('#loginButton').bind('click',
	function(e)
	{
		var regEmail = /^.+@.+\..+/;

		if( !$.trim($('#email').val()).length || $.trim($('#email').val()).length > 30 || !regEmail.test($('#email').val()) || !$.trim($('#password').val()).length || $.trim($('#password').val()).length > 10 )
		{
			//선택된 메뉴에만 선택 클래스 설정
			$('#mainNavigation > ul > li').removeClass('menuSelected');

			//로그인 페이지 로딩
			$("#content").load('login_form.html',
			function()
			{
				$('#warning').html('아이디와 패스워드를 바르게 입력해주세요!');
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
		else
		{
			var member =
			{
				memEmail : $.trim($('#email').val()).toLowerCase(),
				memPassword : $.trim($('#password').val())
			};

			console.log(member);
			//입력한 내용을 저장
			commonController.ajax.accessData(loginURL, member,
			function(result) //로그인 성공시
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


			},
			function() //로그인 실패시
			{
				//로그인 페이지 로딩
				$("#content").load('login_form.html',
				function()
				{
					$('#warning').html('로그인을 다시 시도해주세요!');
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

	//가입 버튼에 이벤트 할당
	$('#joinButton').bind('click',
	function(e)
	{
		//선택된 메뉴에만 선택 클래스 설정
		$('#mainNavigation > ul > li').removeClass('menuSelected');

		//가입 페이지 로딩
		$("#content").load('join.html');

		$('#postHeaderWrapper').animate(
		{
			opacity : 0,
			height : 0
		}, 'normal', function(){ $('#postHeader').html(null); });
	});


})(window);
