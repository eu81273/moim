(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;


	//공간 페이지 단위 리스트
	var urlPagePlace = commonController.defaultPath + "/place/getPagePlace";

	//공간 점유 정보
	var urlgetPlaceUsed = commonController.defaultPath + "/place/getPlaceUsed";

	//공간 점유 등록
	var urlsetPlaceUsed = commonController.defaultPath + "/place/insertPlaceUsed";


	//선택한 날짜를 저장하는 변수
	var selectedDate;

	//선택한 공간을 저장하는 변수
	var selectedPlace;

	//선택한 공간이름을 저장하는 변수
	var selectedPlaceName;

	//선택한 시간을 저장하는 변수
	var selectedTime;

	//최소 인원을 저정하는 변수
	var selectedLimit;

	//페이지 초기화
	var pageNum = 1;


	commonController.timeSection =
	(function()
	{
		//공간 리스트 컬럼 항목
		var tableColumn = ["plaId","plaName","plaPrice","plaAddr","plaMax"];

	   //선택한 줄 변수
		var selectedRow = null;

		function _dateInit()
		{
			//캘린더 로드
			var calendarObject = new JsDatePick(
			{
				useMode:1,
				isStripped:true,
				target:"dateSelection",
				cellColorScheme:"ocean_blue",
				dateFormat:"%Y%m%d",
				imgPath:"img/",
				weekStartDay:0,
				limitToToday:false
			});

			//캘린더 클릭시 이벤트 설정
			calendarObject.setOnSelectedDelegate(
			function()
			{
				selectedDate = calendarObject.getSelectedDayFormatted();

				if(selectedPlace)
				{
					_timeInit();
				}
			});
		}


		function _placeInit()
		{
			//초기 데이터 로드
			 _refreshPlaceData();

			//TBODY를 클릭했을 때 이벤트 처리
			$('#placeTable').unbind().bind("click",
			function(e)
			{
				//선택한 줄
				selectedRow = $(e.target).closest('tr');

				//선택된 항목에만 선택 클래스 설정
				$(selectedRow).siblings('tr').removeClass('tableSelected');
				$(selectedRow).addClass('tableSelected');

				//선택된 공간
				selectedPlace = $(selectedRow).children(":nth-child(1)").text();

				//선택된 공간명
				selectedPlaceName = $(selectedRow).children(":nth-child(2)").text();

				//선택된 제한인원
				selectedLimit = $(selectedRow).children(":nth-child(5)").text();

				if(selectedDate)
				{
					_timeInit();
				}
			});

			//이전 페이지 버튼을 눌렀을 때
			$('#prev').bind("click",
			function(e)
			{
				if(--pageNum)
				{
					_refreshPlaceData();
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
				_refreshPlaceData();
			});

		}

		function _timeInit()
		{
			var placeUsed =
			{
				plaId : selectedPlace + "",
				usedDate : selectedDate + ""
			};

			console.log('placeUsed파라메터');
			console.log(placeUsed);

			commonController.ajax.accessData(urlgetPlaceUsed, placeUsed,
			function(json)
			{
				console.log('placeUsed결과');
				console.log(json.USEDPLACE);

				$('#timeSelection').html('<input type="button" id="A" value="A"><input type="button" id="B" value="B"><input type="button" id="C" value="C"><input type="button" id="D" value="D"><input type="button" id="E" value="E"><input type="button" id="F" value="F"><input type="button" id="G" value="G"><input type="button" id="H" value="H"><input type="button" id="I" value="I">');

				//사용중인 시간대 제거
				for(var i in json.USEDPLACE)
				{
					$('#' + json.USEDPLACE[i]['usedTime']).remove();
				}

				$('#timeSelection > input').unbind().bind("click",
				function(e)
				{
					//선택한 시간
					selectedTime = $(e.target).val();

					var placeUsed =
					{
						meeId : commonController.createMeeting.getMeetingId() + "",
						plaId : selectedPlace + "",
						usedDate : selectedDate + "",
						usedTime : selectedTime
					};

					console.log('placeUsed파라메터');
					console.log(placeUsed);

					commonController.ajax.accessData(urlsetPlaceUsed, placeUsed,
					function(json)
					{
						//성공했을 때
						console.log('성공');

						//목록에 추가
						$('#selctedTimeTable').append('<tr><td>' + selectedPlace + '</td><td>' + selectedPlaceName + '</td><td>' + selectedDate + '</td><td>' + selectedTime + '</td><td>' + selectedLimit + '</td></tr>');

						$('#timeSection').animate(
						{
							opacity : 0,
							height : 0
						}, 'normal', function(){ $('#timeSection').html(null); });

						//값 초기화
						selectedDate = null;
						selectedPlace = null;
						selectedTime = null;
						selectedLimit = null;
					},
					function()
					{
						commonController.messageDialog('주의', '사용중인 시간대 등록이 실패했습니다. 다시 시도해주세요!', function(){});
					});
				});

			},
			function()
			{
				commonController.messageDialog('주의', '사용중인 시간대 정보를 가져올 수 없었습니다. 다시 시도해주세요!', function(){});
			});
		}


		//조회버튼 누를때에 데이터 로딩
		function _refreshPlaceData()
		{
			// 파라미터(페이지 값을 넘겨줌)
			var place =
			{
				page : pageNum + ""
			};

			commonController.ajax.accessData(urlPagePlace, place, // 주소값, 파라미터, 성공실패
			function(json) // 성공
			{
				var tableData = "";

				if(json.PAGE)
				{
					for(var i in json.PAGE)
					{
						tableData += "<tr>";

						for(var j in tableColumn)
						{
							tableData += "<td>" + json.PAGE[i][tableColumn[j]] + "</td>";
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

		return { getSelectedRow : _getSelectedRow, resetSelectedRow : _resetSelectedRow, dateInit : _dateInit, placeInit : _placeInit };

	})();


	commonController.timeSection.dateInit(); //날짜 초기화
	commonController.timeSection.placeInit(); //공간 초기화

})(window);
