(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//회원 정보 수정 주소
	var modifyURL = commonController.defaultPath + "/member/modifyMember";

	//회원 정보 주소
	var memberURL = commonController.defaultPath + "/member/getMember";

	//전화 번호 체크
	var regPhone = /(^[0-9]{3,3}[\-]{1,1}[0-9]{3,4}[\-]{1,1}[0-9]{4,4}$)|(^[0-9]{3,3}[0-9]{3,4}[0-9]{4,4}$)/;

	//업로드된 파일명
	var fileName = null;


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


	//수정 버튼에 이벤트 할당
	$('#submitButton').bind('click',
	function(e)
	{
		if( !$.trim($('#form_password').val()).length || $.trim($('#form_password').val()).length > 10 )
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
				memId : $.cookie("id"),
				memEmail : $.trim($('#form_email').val()).toLowerCase(),
				memName : $.trim($('#form_name').val()),
				memPhone : $.trim($('#form_phone').val()).split("-").join(""),
				memPassword : $.trim($('#form_password').val()),
				memPhoto : fileName,
				memCategoryid : $(":radio[name='form_category']:checked").val()
			};

			//입력한 내용을 저장
			commonController.ajax.accessData(modifyURL, member,
			function(result) //로그인 성공시
			{
				//쿠키 해제
				$.cookie("id", null);
				$.cookie("email", null);
				$.cookie("name", null);
				$.cookie("category", null);
				$.cookie("random", null);

				//선택된 메뉴에만 선택 클래스 설정
				$('#mainNavigation > ul > li').removeClass('menuSelected');

				//로그인 페이지 로딩
				$('#headerLogin').load('login.html');

				$('#postHeaderWrapper').animate(
				{
					opacity : 0,
					height : 0
				}, 'normal', function(){ $('#postHeader').html(null); });

				//페이지 로드
				$('#content').load('login_form.html',
				function()
				{
					$('#warning').html('정상적으로 수정되었습니다! 다시 로그인해 주세요 :)');
					$('#warning').animate(
					{
						opacity : 1
					}, 'normal');
				});
			},
			function() //로그인 실패시
			{
				$('#warning').html('수정 실패! 다시 시도해주세요!');
				$('#warning').animate(
				{
					opacity : 1
				}, 'normal');
			});
		}
	});



	//초기화
	$(document).ready(function()
	{
		var member =
		{
			memEmail : $.cookie("email")
		};

		//입력한 내용을 저장
		commonController.ajax.accessData(memberURL, member,
		function(result) //로그인 성공시
		{
			//각 항목을 대입 및 비활성화
			$('#form_email').val(result.MEMBER[0]["memEmail"]).attr("disabled", true);
			$('#form_name').val(result.MEMBER[0]["memName"]);
			$('#form_phone').val(result.MEMBER[0]["memPhone"]);
			$('#form_file').val(result.MEMBER[0]["memPhoto"]);
			$("input:radio[name=form_category][value=" + result.MEMBER[0]["memCategoryid"] + "]").attr("checked","checked");
			fileName = result.MEMBER[0]["memPhoto"];
		},
		function() //실패시
		{
			commonController.messageDialog('연결 오류', '회원 ID를 찾을 수 없습니다. 메인 페이지로 이동합니다.',
			function()
			{
				//메인 페이지 로드
				$('#content').load('main.html');

				$('#postHeaderWrapper').animate(
				{
					opacity : 0,
					height : 0
				}, 'normal', function(){ $('#postHeader').html(null); });
			});
		});
	});


})(window);
