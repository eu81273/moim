(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.meetingManagement");


	//모임
	var urlGetMeeting = commonController.defaultPath + "/meeting/getMeeting";

	//현재 회원인지 여부
	var urlIsMember = commonController.defaultPath + "/memberMeeting/isMember";


	commonController.meetingManagement.subMenu =
	(function()
	{
		function _init()
		{
			//메인 메뉴 클릭 이벤트
			$('#subNavigation').unbind().bind('click',
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
						case '모임 홈':
							$('#content').load('meeting.html');
						break;

						case '모임 구성원':
							$('#content').load('meeting_member.html');
						break;

						case '모임 게시판':
							$('#content').load('board_list.html');
						break;

						case '모임 일정':
							$('#content').load('meeting_plan.html');
						break;


						case '모임 초대':
							$('#content').load('meeting_invitation.html');
						break;

						case '모임 수정':
							$('#content').load('meeting_modify.html');

						break;

						case '모임 탈퇴':
							commonController.confirmDialog('모임탈퇴', '현재 모임에서 탈퇴하시겠습니까?',
							function()
							{
								//모임 탈퇴 주소
								var leaveURL = commonController.defaultPath + "/meeting/withdrawMeeting";

								var leave =
								{
									meeId : $.cookie("meeid") + "",
									memId : $.cookie("id") + "",
									random : $.cookie("random") + ""
								};

								//입력한 내용을 저장
								commonController.ajax.accessData(leaveURL, leave,
								function(result) //접속 성공시
								{
									//모임 탈퇴 성공 메시지
									commonController.messageDialog('탈퇴 완료', '모임 탈퇴가 안전하게 완료되었습니다. 모임 홈으로 이동합니다.',
									function()
									{
										//모임 메인 페이지 로드
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
								function() //접속 실패시
								{
									//모임 탈퇴 실패 메시지
									commonController.messageDialog('탈퇴 실패', '서버와 연결되지 않아 탈퇴 실패! 다시 시도해주세요!');
								});
							});
						break;

						case '모임 삭제':
							commonController.confirmDialog('모임삭제', '삭제된 모임은 다시 복구할 수 없습니다. 이 모임을 삭제하시겠습니까?',
							function()
							{
								//모임 삭제 주소
								var deleteURL = commonController.defaultPath + "/meeting/deleteMeeting";

								var meeting =
								{
									meeId : $.cookie("meeid") + "",
									memId : $.cookie("id") +""
								};

								//입력한 내용을 저장
								commonController.ajax.accessData(deleteURL, meeting,
								function(result) //접속 성공시
								{
									//모임 삭제 성공 메시지
									commonController.messageDialog('삭제 완료', '모임 삭제가 안전하게 완료되었습니다. 홈으로 이동합니다.',
									function()
									{
										//쿠키 해제
										$.cookie("meeid", null);

										//선택된 메뉴에만 선택 클래스 설정
										$('#mainNavigation > ul > li').removeClass('menuSelected');
										$('#main').addClass('menuSelected');

										//페이지 로드
										$('#content').load('main.html');

										$('#postHeaderWrapper').animate(
										{
											opacity : 0,
											height : 0
										}, 'normal', function(){ $('#postHeader').html(null); });
									});
								},
								function() //접속 실패시
								{
									//모임 탈퇴 실패 메시지
									commonController.messageDialog('삭제 실패', '서버와 연결되지 않아 삭제 실패! 다시 시도해주세요!');
								});
							});
						break;

					}
				}
			});



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
					//값이 정상적으로 넘어오고
					if( result.MEETING )
					{
						//모임의 관리자 아이디가 내 아이디와 같으면, (혹은 사이트 관리자면)
						if(result.MEETING[0]['meeAdminid'] == $.cookie('id') || $.cookie('id') == 0)
						{
							//서브 메뉴 수정
							$('#subNavigation').html('<ul><li class="subSelected">모임 홈</li><li>모임 구성원</li><li>모임 게시판</li><li>모임 일정</li><li>모임 초대</li><li>모임 수정</li><li>모임 삭제</li></ul>');
						}
						else
						{
							//모임 관리자가 아니면, 현재 로그인했는지 여부
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
										if( member.ISMEMBER[0]['IsMember'] == "Y" )
										{
											//서브 메뉴 수정
											$('#subNavigation').html('<ul><li class="subSelected">모임 홈</li><li>모임 구성원</li><li>모임 게시판</li><li>모임 일정</li><li>모임 탈퇴</li></ul>');
										}
										else
										{
											//오류니까 공개 비공개 여부에 따라 설정하기
											if( result.MEETING[0]['meeOpen'] )
											{
												//[공개]

												//서브 메뉴 수정
												$('#subNavigation').html('<ul><li class="subSelected">모임 홈</li><li>모임 게시판</li><li>모임 일정</li></ul>');
											}
											else
											{
												//[비공개]

												//서브 메뉴 제거
												$('#subNavigation').html('<ul><li class="subSelected">모임 홈</li></ul>');
											}
										}
									}
									else
									{
										commonController.messageDialog('연결 오류', '회원 정보에 오류가 있습니다.. 메인 페이지로 이동합니다.',
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

									//서브 메뉴 제거
									$('#subNavigation').html('<ul><li class="subSelected">모임 홈</li><li>모임 게시판</li><li>모임 일정</li></ul>');
								}
								else
								{
									//[비공개]

									//서브 메뉴 제거
									$('#subNavigation').html('<ul><li class="subSelected">모임 홈</li></ul>');

								}
							}
						}
					}
					else
					{
						commonController.messageDialog('오류', '모임 정보를 가져올 수 없습니다.', function(){});
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

		return { init : _init };

	})();


	//서브 메뉴 초기화
	commonController.meetingManagement.subMenu.init();

})(window);
