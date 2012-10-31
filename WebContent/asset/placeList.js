(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;

	//네임 스페이스 선언
	commonController.createNameSpace("commonController.placeManage");

	//공간 리스트
	//var urlPlaceList = commonController.defaultPath + "/place/getPlace"; // DB 연결 부분

	//공간 업데이트
	var urlPlaceModify = commonController.defaultPath + "/place/updatePlace";

	//공간 삭제
	var urlPlaceDelete = commonController.defaultPath + "/place/deletePlace";

	//공간 페이지 단위 리스트
	var urlPagePlace = commonController.defaultPath + "/place/getPagePlace";

	var pageNum = 1; // 페이지 초기화

	//그리드 패널
	commonController.placeManage.gridPanel =
		(function()
		{
			//공간 리스트 컬럼 항목
			var tableColumn = ["plaId","plaName","plaPhone","plaPrice","plaAddr","plaMax","plaExplain"];

			//사용자 정보
			var placeData = null;

		   //선택한 줄 변수
			var selectedRow = null;


			function _init()
			{
				//초기 데이터 로드
				 _refreshGridData();

				//TBODY를 클릭했을 때 이벤트 처리
				$('#placeTable').unbind().bind("click",
				function(e)
				{
					//선택한 줄
					selectedRow = $(e.target).closest('tr');

					//선택된 항목에만 선택 클래스 설정
					$(selectedRow).siblings('tr').removeClass('tableSelected');
					$(selectedRow).addClass('tableSelected');

					//detail패널을 설정하는 메소드 실행
					commonController.placeManage.detailPanel.setDetailPanel(placeData, $(selectedRow).children(":first-child").text());

					console.log(placeData);

				});


				//이전 페이지 버튼을 눌렀을 때
				$('#prev').bind("click",
				function(e)
				{
					if(--pageNum)
					{
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
					pageNum++;
					_refreshGridData();
				});
			}


			//초기화 함수
			function _refreshGridData()
			{
				// 파라미터(페이지 값을 넘겨줌)
				var place =
				{
					page : pageNum + ""
				};

				commonController.ajax.accessData(urlPagePlace, place, // 주소값, 파라미터, 성공실패
				function(json) // 성공
				{
					console.log(json);
					//사용자 데이터를 저장
					placeData = json.PAGE;

					var tableData = "";

					if(placeData)
					{
						for(var i in placeData)
						{
							tableData += "<tr>";

							for(var j in tableColumn)
							{
								tableData += "<td>" + placeData[i][tableColumn[j]] + "</td>";
							}

							tableData += "</tr>";
						}

						$('#placeTable').html(tableData); //테이블에 위에서 생성한 테이블 데이터를 넣는다.
					}
					else
					{
						//값이 없으므로
						pageNum--;
					}
				});

			}

			//현재 선택된 절을 반환하는 메소드
			function _getSelectedRow()
			{
				return selectedRow;
			}

			//선택된 절을 초기화하는 메소드
			function _resetSelectedRow()
			{
				selectedRow = null;
			}


			return { getSelectedRow : _getSelectedRow, resetSelectedRow : _resetSelectedRow, init : _init };

		})();


		//디테일 패널
		commonController.placeManage.detailPanel =
		(function()
		{
			function _init()
			{
				$("input[name=placeDetailId]").attr("disabled",true);			
			
				$('#changeBtn').unbind().bind("click",
				function(e)
				{
					_modifyPlaceData(); //입력된 사용자 정보 적용
					_clearDetailData(); //디테일 패널 리셋
				});

				$('#deleteBtn').unbind().bind("click",
				function(e)
				{
					_deletePlaceData(); //선택된 사용자 정보 삭제
					_clearDetailData(); //디테일 패널 리셋
				});
			}


			//디테일 패널을 리셋하는 메소드
	 		function _clearDetailData()
	 		{
	 			$('#detailPanel').find("input:text").val("");

	 			console.log('2');
			}

			//기존 유저를 수정하는 메소드
			function _modifyPlaceData()
			{
				//선택한 사원
				var selectedRow = commonController.placeManage.gridPanel.getSelectedRow();

				//선택한 사원이 있는 경우에만,
				if(selectedRow)
				{
					var placePhone = /(^[0-9]{3,3}[\-]{1,1}[0-9]{3,4}[\-]{1,1}[0-9]{4,4}$)|(^[0-9]{3,3}[0-9]{3,4}[0-9]{4,4}$)/;
					
					var regPrice = /^[0-9]+$/;


					if( !$.trim($('#placeDetailName').val()).length || $.trim($('#placeDetailName').val()).length > 30)
					{
						commonController.messageDialog('오류', '공간 이름을 정확히 입력해주세요!',
						function()
						{
								$('#placeName').focus();
						});
					}
					else if( !placePhone.test($('#placeDetailPhone').val()) )
					{
						commonController.messageDialog('오류', '전화번호를 정확히 입력해주세요!',
						function()
						{
								$('#placePhone').focus();
						});
					}
					else if( !$.trim($('#placeDetailAddr').val()).length || $.trim($('#placeDetailAddr').val()).length > 200)
					{
						commonController.messageDialog('오류', '위치를 정확히 입력해주세요!',
						function()
						{
								$('#placeAddr').focus();
						});
					}

					else if( !regPrice.test($('#placeDetailPrice').val()))
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
					
					else if( !regPrice.test($('#placeDetailMax').val()) )
					{
						commonController.messageDialog('오류', '최대 인원을 정확히 입력해주세요!',
						function()
						{
							$('#placeDetailMax').focus();
						});
					}

					else
					{

						//저장된 글을 json 형태로 전달
						var selectedPlace =
						{
							plaId : $('#placeDetailId').val(), //등록번호
							plaName : $('#placeDetailName').val(), //이름
							plaPhone : $('#placeDetailPhone').val(), //전화번호
							plaPrice : $('#placeDetailPrice').val(), //가격
							plaAddr : $('#placeDetailAddr').val(), //위치
							plaMax : $('#placeDetailMax').val(), //최대인원
							plaExplain : $('#placeDetailExplain').val() //설명
						};



						//입력한 내용을 newWriting 객체로 저장
						commonController.ajax.accessData(urlPlaceModify, selectedPlace,function()
						{
							commonController.placeManage.gridPanel.init();

						});


						//테이블에 사원 추가
						$(selectedRow).html("<td>" + $('#placeDetailId').val() + "</td>" +  //등록번호
											"<td>" + $('#placeDetailName').val() + "</td>" + //이름
											"<td>" + $('#placeDetailPhone').val() + "</td>" + //전화번호
											"<td>" + $('#placeDetailPrice').val() + "</td>" + //가격
											"<td>" + $('#placeDetailAddr').val() + "</td>" + //위치
											"<td>" + $('#placeDetailMax').val() + "</td>"+ //최대인원
											"<td>" + $('#placeDetailExplain').val() + "</td>" );//설명



						//수정 버튼 입력 후 , 삽입된 내용 삭제
						_clearDetailData();

					}
				}
				else
				{
					commonController.messageDialog('오류', '수정할 공간을 먼저 선택해 주세요!');
				}
			}

			//선택시 id값과 dataList 받아와서 디테일 패널에 사용자 정보 출력
			function _setDetailPanel(dataList, plaId)//plaId
			{
				if(dataList)
				{
					for(var i in dataList)
					{

						if(dataList[i]["plaId"] == plaId)
						{
							//각 요소에 값 대입

							console.log(dataList[i]["plaId"]);


							$('#placeDetailId').val(dataList[i]["plaId"]); //등록번호
							$('#placeDetailName').val(dataList[i]["plaName"]); //이름
							$('#placeDetailPhone').val(dataList[i]["plaPhone"]); //전화번호
							$('#placeDetailPrice').val(dataList[i]["plaPrice"]); //가격
							$('#placeDetailAddr').val(dataList[i]["plaAddr"]); //위치
							$('#placeDetailMax').val(dataList[i]["plaMax"]); //최대인원
							$('#placeDetailExplain').val(dataList[i]["plaExplain"]); //설명

							break;
						}
					}
				}
			}

			//기존 유저를 삭제하는 메소드
			function _deletePlaceData()
			{
				//선택한 사원
				var selectedRow = commonController.placeManage.gridPanel.getSelectedRow();

				console.log(selectedRow);
				//선택한 사원이 있는 경우에만,
				if(selectedRow)
				{
					//저장된 글을 json 형태로 전달
					var selectedPlace =
					{
							plaId : $('#placeDetailId').val(), //등록번호
							plaName : $('#placeDetailName').val(), //이름
							plaPhone : $('#placeDetailPhone').val(), //전화번호
							plaPrice : $('#placeDetailPrice').val(), //가격
							plaAddr : $('#placeDetailAddr').val(), //위치
							plaMax : $('#placeDetailMax').val(), //최대인원
							plaExplain : $('#placeDetailExplain').val() //설명

					};

					console.log(selectedPlace);

					//입력한 내용을 저장
					commonController.ajax.accessData(urlPlaceDelete, selectedPlace,
					function()
					{

						$(selectedRow).remove();


						//초기화
						commonController.placeManage.gridPanel.init();

						//선택 초기화
						commonController.placeManage.gridPanel.resetSelectedRow();
					});
				}
				else
				{
					window.alert("삭제할 유저를 선택해 주세요!");
				}
			}

			return { init : _init, setDetailPanel : _setDetailPanel, clearDetailData : _clearDetailData};
		})();

	commonController.placeManage.gridPanel.init(); 
	commonController.placeManage.detailPanel.init(); 

})(window);