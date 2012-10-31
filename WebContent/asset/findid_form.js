(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//아이디 찾기 주소
	var findIdURL = commonController.defaultPath + "/member/findId";


	//로그인 버튼에 이벤트 할당
	$('#submitButton').bind('click',
	function(e)
	{
		var regPhone = /(^[0-9]{3,3}[\-]{1,1}[0-9]{3,4}[\-]{1,1}[0-9]{4,4}$)|(^[0-9]{3,3}[0-9]{3,4}[0-9]{4,4}$)/;

		if( !$.trim($('#form_name').val()).length || $.trim($('#form_name').val()).length > 10 )
		{
			$('#form_name').focus();

			$('#warning').html('이름을 10자 이내로 입력해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else if( !$.trim($('#form_phone').val()).length || !regPhone.test($('#form_phone').val()) )
		{
			$('#form_phone').focus();

			$('#warning').html('핸드폰 번호를 정확히 입력해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else
		{
			var email = "";
			var member =
			{
				memName : $.trim($('#form_name').val()),
				memPhone : $.trim($('#form_phone').val()).split("-").join("")
			}

			console.log(member);

			//입력한 내용을 저장
			commonController.ajax.accessData(findIdURL, member,
			function(result)//성공
			{
				for(var i in result.EMAIL)
				{
					console.log(result.EMAIL[i].memEmail);
					email += result.EMAIL[i].memEmail+"</p>";
				}
				$('#warning').html(email);
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
