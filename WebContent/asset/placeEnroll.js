(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//공간 등록 주소
	var placeEnrollURL = commonController.defaultPath + "/place/createPlace";
	


	console.log(placeEnrollURL);

	//등록 버튼에 이벤트 할당
	$('#submitButton').bind('click',
	function(e)
	{
		var placePhone = /(^[0-9]{3,3}[\-]{1,1}[0-9]{3,4}[\-]{1,1}[0-9]{4,4}$)|(^[0-9]{3,3}[0-9]{3,4}[0-9]{4,4}$)/;
		
		var regPrice = /^[0-9]+$/;


		if( !$.trim($('#placeName').val()).length || $.trim($('#placeName').val()).length > 30)
		{
			commonController.messageDialog('오류', '공간 이름을 정확히 입력해주세요!',
			function()
			{
					$('#placeName').focus();
			});
		}
		else if( !$.trim($('#placePhone').val()).length || !placePhone.test($('#placePhone').val()) )
		{
			commonController.messageDialog('오류', '전화번호를 정확히 입력해주세요!',
			function()
			{
					$('#placePhone').focus();
			});
		}
		else if( !$.trim($('#placeAddr').val()).length || $.trim($('#placeAddr').val()).length > 200)
		{
			commonController.messageDialog('오류', '위치를 정확히 입력해주세요!',
			function()
			{
					$('#placeAddr').focus();
			});
		}

		else if( !regPrice.test($('#placePrice').val()))
		{
			commonController.messageDialog('오류', '시간당 가격을 정확히 입력해주세요!',
			function()
			{
				$('#placePrice').focus();
			});

		}

		else if( !$.trim($('#placeExplain').val()).length || $.trim($('#placeExplain').val()).length > 50)
		{
			commonController.messageDialog('오류', '설명을 정확히 입력해주세요!',
			function()
			{
				$('#placeExplain').focus();
			});
		}
		
		else if( !regPrice.test($('#placeMax').val()) )
		{
			commonController.messageDialog('오류', '최대 인원을 정확히 입력해주세요!',
			function()
			{
				$('#placeMax').focus();
			});
		}


		else
		{
			//저정된 글을 json 형태로 전달
			var place =
			{
				plaName : $.trim($('#placeName').val()),
				plaPhone : $.trim($('#placePhone').val()).split("-").join(""),
				plaAddr : $.trim($('#placeAddr').val()),
				plaMax : $.trim($('#placeMax').val()),
				plaPrice : $.trim($('#placePrice').val()),
				plaExplain : $.trim($('#placeExplain').val())
			};

			console.log(place);

			//입력한 내용을 저장
			commonController.ajax.accessData(placeEnrollURL, place,
			function(result) //로그인 성공시
			{


				commonController.messageDialog('공간등록','공간등록이 성공하였습니다.',
				function()
				{
					$('#content').load('placeList.html');

					//서브메뉴에서 공간등록 부분이 공간목록조회로 바껴야함.
					$('#subNavigation > ul > li').removeClass('subSelected');
					$('#placeList').addClass('subSelected');
				});

				//결과 출력
				console.log('공간등록 성공!!');
				console.log(result);

			},
			function()
			{
				commonController.messageDialog('등록 실패', '공간 등록에 실패했습니다. 다시 시도해주세요!');
			});
		}

	});
})(window);
