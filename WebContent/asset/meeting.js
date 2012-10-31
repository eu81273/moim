(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.meetingManagement");


	//일정
	var urlGetMeetingPlan = commonController.defaultPath + "/place/getPlan";

	//모임
	var urlGetMeeting = commonController.defaultPath + "/meeting/getMeeting";

	//현재 회원인지 여부
	var urlIsMember = commonController.defaultPath + "/memberMeeting/isMember";

	//모임 가입
	var urlParticipateMeeting = commonController.defaultPath + "/meeting/joinMeeting";



	commonController.meetingManagement.meetingMain =
	(function()
	{
		function _init()
		{
			//모임 id값으로 모임 정보 가져와서 초기화
			if( $.cookie("meeid") )
			{
				var meeting =
				{
					meeId : $.cookie("meeid") + ""
				};

				//모임 정보 가져오기
				commonController.ajax.accessData(urlGetMeeting, meeting,
				function(result)
				{
					if( result.MEETING )
					{
						//제목 설정
						$('.moimMainTitle').text(' ' + result.MEETING[0]['meeName']);

						//이미지 설정
						$('#moimMainImageFile').attr('src', commonController.defaultPath + '/uploaded_files/' + result.MEETING[0]['meePhoto']);

						//소개 설정
						$('#moimDescription').text(result.MEETING[0]['meeExplain']);

						//모임 인원
						$('#moimPeople').text(result.MEETING[0]['meeCurrentpeople'] + '/' + result.MEETING[0]['meeMaxpeople']);


						//현재 로그인했는지 여부
						if( $.cookie("id") )
						{

							var member =
							{
								meeId : $.cookie("meeid") + "",
								memId : $.cookie("id") + ""
							};

							//현재 회원인지 여부 확인
							commonController.ajax.accessData(urlIsMember, member,
							function(member)
							{
								if( member.ISMEMBER )
								{
									//여기 회원이면 메뉴 수정
									if( member.ISMEMBER[0]['IsMember'] == "N" && $.cookie('id') != 0 )
									{
										//참여 버튼 추가
										$('.moimMainDescription').append('<input id="participateButton" type="button" value="참여하기">');

										//참여 버튼 이벤트 설정
										$('#participateButton').bind('click',
										function(e)
										{
											commonController.confirmDialog('모임 참여', result.MEETING[0]['meeName'] + ' 모임에 가입합니다.',
											function()
											{
												//참여 설정
												var participate =
												{
													meeId : $.cookie("meeid") + "",
													memId : $.cookie("id") + ""
												};

												//참여 시도
												commonController.ajax.accessData(urlParticipateMeeting, participate,
												function(joinResult)
												{
													commonController.messageDialog('모임 참여 성공', '성공적으로 모임에 참여되었습니다.',
													function()
													{
														//모임 페이지 로드
														$('#content').load('meeting.html', function()
														{
															$('html, body').animate(
															{
																scrollTop: 0
															}, 'slow');

															$('#postHeader').load('meeting_submenu.html',
															function()
															{
																$('#postHeaderWrapper').animate(
																{
																	opacity : 1,
																	height : 60
																}, 'normal');
															});
														});
													});
												},
												function()
												{
													commonController.messageDialog('오류', '서버와 접속이 되지 않아 모임 참여에 실패했습니다.', function(){});
												});

											});
										});
									}
								}
								else
								{
									//아마도 접속 오류 메시지인가봐
									commonController.messageDialog('접속 오류', '접속 오류로 인해 참여하기 버튼을 정상적으로 표시할 수 없습니다.', function(){});
								}


							},
							function()
							{
								//접속 잘 안됩니다.
								commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..', function(){});

							});

						}
						else
						{
							console.log('일단 로그인부터 하시게ㅋㅋ');
							//로그인 안한 상태니까 공개 비공개 여부에 따라 공개면 최소 메뉴
							//비공개면 비공개 모드로!!

							//오류니까 공개 비공개 여부에 따라 설정하기
							if( result.MEETING[0]['meeOpen'] )
							{
								//[공개]

								//참여 버튼 추가
								$('.moimMainDescription').append('<input id="participateButton" type="button" value="참여하기">');

								//참여 버튼 이벤트 설정
								$('#participateButton').bind('click',
								function(e)
								{
									commonController.messageDialog('오류', '로그인을 하신 후에 모임에 참여하실 수 있습니다.',
									function()
									{
										//로그인 페이지 로딩
										$("#content").load('login_form.html');

										//서브 메뉴 닫기
										$('#postHeaderWrapper').animate(
										{
											opacity : 0,
											height : 0
										}, 'normal', function(){ $('#postHeader').html(null); });
									});
								});
							}
							else
							{
								//[비공개]

								//참여 버튼 추가
								$('.moimMainDescription').append('<input id="participateButton" type="button" value="참여하기">');

								//참여 버튼 이벤트 설정
								$('#participateButton').bind('click',
								function(e)
								{
									commonController.messageDialog('비공개 모임', '비공개 모임입니다. 초대를 통해서만 가입할 수 있습니다.', function(){});
								});

							}
						}
					}
					else
					{
						commonController.messageDialog('오류', '정상적으로 참여중인 모임 목록 데이터를 가져올 수 없습니다.', function(){});
					}
				},
				function()
				{
					commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..', function(){});
				});

				//모임 일정을 초기화
				commonController.ajax.accessData(urlGetMeetingPlan, meeting,
				function(result)
				{
					console.log(result.MEETTIME);

					if( result.MEETTIME )
					{
						_setGridData(result.MEETTIME);
					}
					else
					{
						commonController.messageDialog('오류', '정상적으로 데이터를 가져올 수 없습니다.', function(){});
					}
				},
				function()
				{
					commonController.messageDialog('오류', '서버와의 접속이 원활하지 않습니다..', function(){});
				});

			}
			else
			{
				commonController.messageDialog('연결 오류', '모임 ID값을 찾을 수 없습니다. 메인 페이지로 이동합니다.',
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
			}
		}

		function _setGridData(dataList)
		{
			var tableColumn = ["plaName","usedDate","usedTime"];

			var tableData = "";

			if(dataList)
			{
				for(var i in dataList)
				{
					tableData += "<tr><td>" + dataList[i][tableColumn[0]] + "</td><td>" + commonController.timeTable.getDateTable(dataList[i][tableColumn[1]]) + "</td><td>" + commonController.timeTable.getTimeTable(dataList[i][tableColumn[2]]) + "</td></tr>";
				}

				$('#scheduleTimeTable').html(tableData);
			}
		}

		return { init : _init };
	})();


	//초기화
	commonController.meetingManagement.meetingMain.init();

})(window);