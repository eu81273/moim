(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//회원 가입 주소   //url주소 입력했습니다 yj
	var joinURL = commonController.defaultPath + "/member/createMember";

	//아이디 중복 체크 주소
	var checkURL = commonController.defaultPath + "/member/checkId";

	//이메일 형식 체크
	var regEmail = /^.+@.+\..+/;

	//핸드폰 양식 체크
	var regPhone = /(^[0-9]{3,3}[\-]{1,1}[0-9]{3,4}[\-]{1,1}[0-9]{4,4}$)|(^[0-9]{3,3}[0-9]{3,4}[0-9]{4,4}$)/;

	//업로드된 파일명
	var fileName = null;


	//아이디 체크
	$('#form_email').blur(
	function()
	{
		//입력한 값이 있으면,
		if( $.trim($('#form_email').val()).length <= 30 && regEmail.test($('#form_email').val()))
		{
			var member =
			{
				memEmail : $.trim($('#form_email').val()).toLowerCase()
			};

			//입력한 내용을 저장
			commonController.ajax.accessData(checkURL, member,
			function(result) //접속 성공시
			{
				if(result.CHECKID[0].available == "false")
				{
					$('#form_email').focus().val(null);

					$('#warning').html('이미 존재하는 이메일 주소입니다.');
					$('#warning').animate(
					{
						opacity : 1
					}, 'normal');
				}
				else
				{
					$('#warning').animate(
					{
						opacity : 0
					}, 'normal');
				}
			},
			function() //접속 실패시
			{
/*				$('#warning').html('가입 실패! 다시 시도해주세요!');
				$('#warning').animate(
				{
					opacity : 1
				}, 'normal');*/
			});
		}
	});

	$('#form_file').change(function()
	{
		//기존 업로드 파일명을 초기화
		fileName = null;

		//파일 업로드
		$('#ajaxFileUpload').ajaxSubmit(
		{
			url : commonController.defaultPath + "/upload",
			type : "post",
			data : {},
			dataType : "json",
			success : function(result)
			{
				//파일명 저장
				fileName = result.FILE[0]['fileName'];
			},
			error : function()
			{
				commonController.meesageDialog('접속 실패', '서버와의 연결이 원활하지 않습니다. 잠시 뒤 다시 시도해주세요!',
				function()
				{
					$('#form_file').val(null);
				});
			}
		});

	});

	//로그인 버튼에 이벤트 할당
	$('#submitButton').bind('click',
	function(e)
	{
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
		else if( !$.trim($('#form_password_check').val()).length || $.trim($('#form_password_check').val()).length > 10 )
		{
			$('#form_password_check').focus();

			$('#warning').html('패스워드 확인을 입력해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else if( $.trim($('#form_password').val()) != $.trim($('#form_password_check').val()))
		{
			$('#form_password').val(null);
			$('#form_password_check').val(null);

			$('#form_password').focus();

			$('#warning').html('입력된 패스워드가 다릅니다!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else if( !$.trim($('#form_name').val()).length || $.trim($('#form_name').val()).length > 10 )
		{
			$('#form_name').focus();

			$('#warning').html('이름을 10자 이내로 입력해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else if( !regPhone.test($('#form_phone').val()) )
		{
			$('#form_phone').focus();

			$('#warning').html('핸드폰 번호를 정확히 입력해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else if( !$.trim($('#form_file').val()).length || !fileName )
		{
			$('#warning').html('회원 사진을 업로드해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
		}
		else if( !$(":radio[name='form_category']:checked").length )
		{
			$('#warning').html('관심 카테고리를 선택해주세요!');
			$('#warning').animate(
			{
				opacity : 1
			}, 'normal');
    	}
		else
		{
			$('#warning').animate(
			{
				opacity : 0
			}, 'normal');

			var member =
			{
				memEmail : $.trim($('#form_email').val()).toLowerCase(),
				memName : $.trim($('#form_name').val()),
				memPhone : $.trim($('#form_phone').val()).split("-").join(""),
				memPassword : $.trim($('#form_password').val()),
				memPhoto : fileName,
				memCategoryid : $(":radio[name='form_category']:checked").val()
			};

			console.log(member);

			//입력한 내용을 저장
			commonController.ajax.accessData(joinURL, member,
			function(result) //로그인 성공시
			{
				//로그인 페이지 로딩
				$('#content').load('login_form.html',
				function()
				{
					$('#warning').html('가입 성공했습니다. 로그인해주세요 :)');
					$('#warning').animate(
					{
						opacity : 1
					}, 'normal');
				});
			},
			function() //로그인 실패시
			{
				$('#warning').html('가입 실패! 다시 시도해주세요!');
				$('#warning').animate(
				{
					opacity : 1
				}, 'normal');
			});
		}
	});

})(window);
