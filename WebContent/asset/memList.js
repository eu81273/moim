(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.memberManagement");





	commonController.memberManagement.memberList =
	(function()
	{
		//회원 삭제
		var urlMemberDelete = commonController.defaultPath + "/member/deleteMember";

		//회원 페이지 단위 리스트
		var urlPageMember = commonController.defaultPath + "/member/getPageMember";

		//공간 리스트 컬럼 항목
		var tableColumn = ["memId","memEmail", "memName","memPhone","memPhoto","memCategoryid"];

		//파라메터로 보낼 멤버 객체
		var member = null;

		// 페이지
		var pageNum = 1;

		//선택한 줄
		var selectedRow;

		//선택한 멤버
		var selectedMember;



		//TBODY를 클릭했을 때 이벤트 처리
		function _init()
		{
			//초기에는 기본 페이지로
			member =
			{
				page : pageNum + ""
			};

			//초기 데이터 로드
			 _refreshGridData();

			//TBODY를 클릭했을 때 이벤트 처리
			$('#memTable').unbind().bind("click", // 두번 클릭할 수 있음을 방지
			function(e)
			{
				//선택한 줄
				selectedRow = $(e.target).closest('tr');

				//선택된 항목에만 선택 클래스 설정
				$(selectedRow).siblings('tr').removeClass('tableSelected');
				$(selectedRow).addClass('tableSelected');

				selectedMember = $(selectedRow).children(":first-child").text(); // 선택된 행의 첫번째 값!!

				//관리자 일 경우!
				if( selectedMember == 0 )
				{
					commonController.messageDialog('삭제 불가', '관리자는 삭제할 수 없습니다.');
				}
				else
				{
					commonController.confirmDialog('회원정보삭제', '삭제하시겠습니까?',
					function()
					{
						var member =
						{
							memId : selectedMember + "",
							Id : $.cookie("id") + ""
						};

						commonController.ajax.accessData(urlMemberDelete, member,// 주소값, 파라미터, 성공실패
						function(json) // 성공
						{
							commonController.messageDialog('삭제 성공', '해당 회원이 삭제되었습니다.',
							function()
							{
								//삭제 후 목록 다시 불러오기
								_refreshGridData();
							});
						},
						function()
						{
							commonController.messageDialog('삭제 실패', '서버와의 연결이 원활하지 않습니다.');
						});
					});
				}
			});


			//이전 페이지 버튼을 눌렀을 때
			$('#prev').bind("click",
			function(e)
			{
				if(--pageNum)
				{
					//페이지 반영
					member.page = pageNum + "";

					//목록 불러오기
					 _refreshGridData();
				}
				else
				{
					pageNum = 1;
				}
			});

			//다음 페이지 버튼을 눌렀을 때
			$('#next').bind("click",
			function(e)
			{
				//페이지 반영
				member.page = ++pageNum + "";

				//목록 불러오기
				_refreshGridData();
			});


			$('#categorySelect').change(
			function()
			{
				if( $('#categorySelect').val() == "선택안함" )
				{
					delete member.memCategoryid;
				}
				else
				{
					member.memCategoryid = $('#categorySelect').val();
				}

				//페이지 초기화
				pageNum = 1;

				//페이지 반영
				member.page = pageNum + "";

				//목록 불러오기
				_refreshGridData();
			});

			$('#modeSelect').change(
			function()
			{
				if( $('#modeSelect').val() == "선택안함" )
				{
					delete member.memName;
					delete member.memEmail;

					//입력창 불가
					$('#searchMember').val(null).attr("disabled", true);
					$('#searchButton').attr("disabled", true);

					//페이지 초기화
					pageNum = 1;

					//페이지 반영
					member.page = pageNum + "";

					//목록 불러오기
					_refreshGridData();
				}
				else
				{
					$('#searchButton').attr("disabled", false);
					$('#searchMember').attr("disabled", false).focus();
				}

			});


			//회원목록에서 검색
			$('#searchButton').bind("click",
			function(e)
			{
				//값이 없으면!
				if( !$.trim($('#searchMember').val()).length )
				{
					commonController.messageDialog('오류', '검색할 내용을 입력해주세요',
					function()
					{
						$('#searchMember').focus();
					});
				}
				else
				{
					if( $('#modeSelect').val() == "이름" )
					{
						member.memName = $.trim($('#searchMember').val());
					}
					else
					{
						member.memEmail = $.trim($('#searchMember').val());
					}

					//페이지 초기화
					pageNum = 1;

					//페이지 반영
					member.page = pageNum + "";

					//목록 불러오기
					_refreshGridData();
				}

			});
		}


		//회원목록조회
		function _refreshGridData()
		{
			console.log('[검색 파라메터]');
			console.log(member);

			commonController.ajax.accessData(urlPageMember, member, // 주소값, 파라미터, 성공실패
			function(json) // 성공
			{
				var tableData = "";

				console.log('받아온 기본값');
				console.log(json.PAGE);

				if( json.PAGE )
				{
					for(var i in json.PAGE)
					{
						tableData += "<tr><td>" + json.PAGE[i]['memId'] + "</td><td><img src=\"" + commonController.defaultPath + "/uploaded_files/" + json.PAGE[i]['memPhoto'] + "\"></td><td>" + json.PAGE[i]['memEmail'] + "</td><td>" + json.PAGE[i]['memName'] + "</td><td>" + json.PAGE[i]['memPhone'] + "</td><td>" + json.PAGE[i]['memCategoryid'] + "</td></tr>";
					}

					//테이블에 위에서 생성한 테이블 데이터를 넣는다.
					$('#memTable').html(tableData);
				}
				else
				{
					commonController.messageDialog('오류', '출력할 멤버가 없습니다.',
					function()
					{
						//페이지 보정
						--pageNum;
					});
				}
			},
			function()
			{
				commonController.messageDialog('삭제 실패', '서버와의 연결이 원활하지 않습니다.');
			});
		}


		return { init : _init };
	})();

	//초기화
	commonController.memberManagement.memberList.init();


})(window);