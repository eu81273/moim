(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//새로운 모임 아이디
	var urlGetMeetingId = commonController.defaultPath + "/meeting/getMaxId";

	//예약 삭제
	var urlDeletePlaceUsed = commonController.defaultPath + "/place/deletePlaceUsed";

	//모임 등록
	var urlCreateMeeting = commonController.defaultPath + "/meeting/createMeeting";

	//업로드된 파일명
	var fileName = null;

	//모임인원 형식 체크
	var regLimit = /^[0-9]+$/;


	commonController.createMeeting =
	(function()
	{
		//부여받은 모임 아이디
		var meetingId;

		function _init()
		{
			//가장 먼저는 모임 아이디를 받아오는 것.
			//받아와질 경우
			commonController.ajax.accessData(urlGetMeetingId, { },
			function(json)
			{
				//부여받은 아이디 저장
				meetingId = json.MEEID[0]['meeId'];

				//파일 업로드 관련 설정
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

				//addButton에 이벤트 할당
				$('#addButton').bind('click',
				function(e)
				{
					$('#timeSection').animate(
					{
						opacity : 1,
						height : 680
					}, 'normal', function(){ $('#timeSection').load('timeselect.html'); });
				});

				//예약 선택시 이벤트 처리
				$('#selctedTimeTable').unbind().bind("click",
				function(e)
				{
					//선택한 줄
					selectedRow = $(e.target).closest('tr');

					//선택된 항목에만 선택 클래스 설정
					$(selectedRow).siblings('tr').removeClass('tableSelected');
					$(selectedRow).addClass('tableSelected');

					var placeUsed =
					{
						meeId : meetingId + "",
						plaId : $(selectedRow).children(":nth-child(1)").text() + "",
						usedDate : $(selectedRow).children(":nth-child(3)").text() + "",
						usedTime : $(selectedRow).children(":nth-child(4)").text()
					};

					console.log('placeUsed파라메터');
					console.log(placeUsed);

					commonController.confirmDialog('예약 삭제', '선택된 예약을 삭제하시겠습니까?',
					function()
					{
						commonController.ajax.accessData(urlDeletePlaceUsed, placeUsed,
						function(json)
						{
							$(selectedRow).remove();
						},
						function()
						{
							commonController.messageDialog('삭제 실패', '예약 삭제에 실패했습니다.',function(){});
						});

					});

				});

				//submitButton에 이벤트 할당 = 오류 체크
				$('#submitButton').bind('click',
				function(e)
				{
					if( !$.trim($('#form_name').val()).length || $.trim($('#form_name').val()).length > 90 )
					{
						commonController.messageDialog('주의', '모임 이름를 50자 이내로 정확히 입력해주세요!',
						function()
						{
							$('#form_name').focus();
						});
					}
					else if( !$.trim($('#form_keyword').val()).length || $.trim($('#form_keyword').val()).length > 90 )
					{
						commonController.messageDialog('주의', '키워드를 50자 이내로 입력해주세요!',
						function()
						{
							$('#form_keyword').focus();
						});
					}
					else if( !$.trim($('#form_desicription').val()).length || $.trim($('#form_desicription').val()).length > 1500 )
					{
						commonController.messageDialog('주의', '모임 설명을 1000자 이내로 입력해주세요!',
						function()
						{
							$('#form_desicription').focus();
						});
					}
					else if( !$.trim($('#form_file').val()).length || !fileName )
					{
						commonController.messageDialog('주의', '회원 사진을 업로드해주세요!', function(){});
					}
					else if( !$(":radio[name='form_category']:checked").length )
					{
						commonController.messageDialog('주의', '관심 카테고리를 선택해주세요!', function(){});
			    	}
					else if( !$('#selctedTimeTable').children().length )
					{
						commonController.messageDialog('주의', '모임 일자를 추가해 주세요!', function(){});
					}
					else if( !$.trim($('#form_limit').val()).length || $.trim($('#form_limit').val()) > _getLimitMember() || !regLimit.test($('#form_limit').val()) )
					{
						commonController.messageDialog('주의', '모임 인원을 ' + _getLimitMember() + '명 이내로 입력해주세요!',
						function()
						{
							$('#form_limit').focus();
						});
					}
					else
					{
						var meeting =
						{
							meeId :meetingId + "",
							meeOpen : $(":radio[name='form_open']:checked").val(),
							meeJoinpossible : "1",
							meeName : $.trim($('#form_name').val()),
							meeKeyword : $.trim($('#form_keyword').val()),
							meeExplain : $.trim($('#form_desicription').val()),
							meePhoto : fileName,
							meeCategoryid : $(":radio[name='form_category']:checked").val(),
							meeMaxpeople : $.trim($('#form_limit').val()),
							meeStartdate : _getStartDate(),
							meeAdminid : $.cookie('id') + ""
						};

						console.log(meeting);


						//입력한 내용을 저장
						commonController.ajax.accessData(urlCreateMeeting, meeting,
						function(result) //접속 성공시
						{
							commonController.messageDialog('성공', '모임 생성에 성공했습니다!',
							function()
							{
								//쿠키에 선택한 모임 번호 저장한 후,
								$.cookie("meeid", meetingId + "");

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
						},
						function() //실패시
						{
							commonController.messageDialog('실패', '서버와의 연결이 원활하지 않습니다.',
							function()
							{

							});
						});
					}
				});
			},
			function()
			{
				commonController.messageDialog('연결 오류', '서버와의 연결이 원활하지 않습니다. 다시 시도해주세요!', function(){});
			});
		}

		//모임 id 반환
		function _getMeetingId()
		{
			return meetingId;
		}

		//모임 제한 인원 반환
		function _getLimitMember()
		{
			var resultArray = new Array();
			var targetArray = $('#selctedTimeTable > tr').children(':nth-child(5)').contents().clone();

			for(var i = 0; i < targetArray.length; i++)
			{
				resultArray.push(Number($(targetArray[i]).text()));
			}

			return Math.min.apply(null, resultArray);
		}

		//모임 시작 날짜 반환
		function _getStartDate()
		{
			var resultArray = new Array();
			var targetArray = $('#selctedTimeTable > tr').children(':nth-child(3)').contents().clone();

			for(var i = 0; i < targetArray.length; i++)
			{
				resultArray.push(Number($(targetArray[i]).text()));
			}

			return String(Math.min.apply(null, resultArray));
		}

		return { init : _init, getMeetingId : _getMeetingId };
	})();


	//초기화
	commonController.createMeeting.init();

})(window);