(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//아이디 찾기 주소
	var findPasswordURL = commonController.defaultPath + "/member/findPassword";


	//로그인 버튼에 이벤트 할당
	$('#submitButton').bind('click',
	function(e)
	{
		var regEmail = /^.+@.+\..+/;

		if( !$.trim($('#form_email').val()).length || $.trim($('#form_email').val()).length > 30 || !regEmail.test($('#form_email').val()))
		{
			$('#form_email').focus();

			$('#warning').html('이메일 주소를 30자 이내로 정확히 입력해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else
		{
			var member =
			{
				memEmail : $.trim($('#form_email').val())
			};

			console.log(member);

			//입력한 내용을 저장
			commonController.ajax.accessData(findPasswordURL, member,
			function(result)
			{
				console.log(result.PASSWORD[0].pwd);
				$('#warning').html(result.PASSWORD[0].pwd);
				$('#warning').animate(
				{
					opacity : 1
				}, 'normal');
			},
			function() // 실패
			{

			});

		}
	});

})(window);
