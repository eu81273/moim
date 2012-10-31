(function(global)
{
	//공통관리 객체
	var commonController = global.commonController || {};

	//이렇게 global에 할당하면 모든 영역에서 접근 가능
	global.commonController = commonController;


	//공통 접속 주소
	commonController.defaultPath = "http://10.201.3.71:8080/moim";
	//commonController.defaultPath = "http://localhost:8080/moim";



	//NameSpace 관리를 위한 메서드 작성!!
	commonController.createNameSpace =
	function(nameSpace)
	{
		//하위항목 구분하기
		var parts = nameSpace.split('.');

		//루트 객체
		var parent = commonController;


		//최상위 네임스페이스까지 입력할 경우 최상위는 제거
		if (parts[0] === "commonController")
		{
			parts = parts.slice(1);
		}

		//NameSpace 생성!!
		for (var i in parts)
		{
			if (!parent[parts[i]])
			{
				//없으면 네임스페이스(=객체) 생성
				parent[parts[i]] =	{};
			}

			parent = parent[parts[i]];
		}
	};


	//Ajax 메소드 선언
	commonController.ajax = (
		function()
		{
			//데이터를 엑세스할 때 사용하는 메서드
			function _accessData(url, json, successFunction, failureFunction)
			{
				$.ajax({
					type : "post",
					url : url,
					cache: false,
					dataType : "json",
					contentType : "application/json+sua; charset=utf-8",
					data : JSON.stringify(json),
					success : function(result)
					{
						if(successFunction)
						{
							successFunction(result);
						}
					},
				    error: function (xhr, textStatus, errorThrown)
				    {
				    	if(failureFunction)
			    		{
					    	failureFunction(textStatus);
			    		}
				    }
				});
			}



			//클로저 형태로 :) 리턴은 괄호를 아래로 내리니까 오류가 생기네ㅠㅠ
			return { accessData : _accessData };
		})();


	commonController.timeTable = (
	function()
	{
		//데이터를 엑세스할 때 사용하는 메서드
		function _getTimeTable(str)
		{
			switch( str )
			{
				case 'A':
					str = '09:00부터 10:00까지';
				break;

				case 'B':
					str = '10:00부터 11:00까지';
				break;

				case 'C':
					str = '11:00부터 12:00까지';
				break;

				case 'D':
					str = '12:00부터 13:00까지';
				break;

				case 'E':
					str = '13:00부터 14:00까지';
				break;

				case 'F':
					str = '14:00부터 15:00까지';
				break;

				case 'G':
					str = '15:00부터 16:00까지';
				break;

				case 'H':
					str = '16:00부터 17:00까지';
				break;

				case 'I':
					str = '17:00부터 18:00까지';
				break;
			}

			return str;
		}

		function _getDateTable(str)
		{
			return str.substring(0,4) + '년 ' + str.substring(4,6) + '월 ' + str.substring(6,8) + '일';
		}

		//클로저 형태로 :) 리턴은 괄호를 아래로 내리니까 오류가 생기네ㅠㅠ
		return { getTimeTable : _getTimeTable, getDateTable : _getDateTable };
	})();

	//확인/취소 다이얼로그 메소드 선언

	/*
 		[사용방법]
		commonController.messageDialog('제목', '내용',
		function()
		{
			//여기에 확인 버튼 눌렀을 때 반응 설정
			alert('잘되나?');
		});
	 */

	commonController.confirmDialog =
	function (title, content, confirmFunction)
	{
		//다이얼로그 템플릿 추가
		$("#content").append('<div id="my-dialog"><div class="my-dialog-title"></div><div class="my-dialog-content"></div><div><div class="my-dialog-button-left">확인</div><div class="my-dialog-button-right">취소</div></div></div>');

		//다이얼로그 생성
		$('#my-dialog').dialog(
		{
		    //autoOpen: false,
			modal: true,
			position : ['center', 200],
			closeOnEscape: true,
			open: function(event, ui)
			{
				//닫기 버튼 숨기기
				$(this).parent().children().children(".ui-dialog-titlebar-close").hide();

				//타이틀 설정
				$(this).find('.my-dialog-title').text(title);

				//내용 설정
				$(this).find('.my-dialog-content').text(content);

				//왼쪽 버튼 이벤트 리스너
				$(this).find('.my-dialog-button-left').bind('click',
				function(e)
				{
					if(confirmFunction)
					{
						confirmFunction();
					}

					$('#my-dialog').remove();
				});

				//왼쪽 버튼 이벤트 리스너
				$(this).find('.my-dialog-button-right').bind('click',
				function(e)
				{
					$('#my-dialog').remove();
				});
			}
		});
	};



	//메시지 다이얼로그 메소드 선언

	/*
 		[사용방법]
		commonController.messageDialog('제목', '내용',
		function()
		{
			//여기에 확인 버튼 눌렀을 때 반응 설정
			alert('잘되나?');
		});
	 */

	commonController.messageDialog =
	function (title, content, confirmFunction)
	{
		//다이얼로그 템플릿 추가
		$("#content").append('<div id="my-dialog"><div class="my-dialog-title"></div><div class="my-dialog-content"></div><div><div class="my-dialog-button">확인</div></div></div>');

		//다이얼로그 생성
		$('#my-dialog').dialog(
		{
		    //autoOpen: false,
			modal: true,
			position : ['center', 200],
			closeOnEscape: true,
			open: function(event, ui)
			{
				//닫기 버튼 숨기기
				$(this).parent().children().children(".ui-dialog-titlebar-close").hide();

				//타이틀 설정
				$(this).find('.my-dialog-title').text(title);

				//내용 설정
				$(this).find('.my-dialog-content').text(content);

				//왼쪽 버튼 이벤트 리스너
				$(this).find('.my-dialog-button').bind('click',
				function(e)
				{
					if(confirmFunction)
					{
						confirmFunction();
					}

					$('#my-dialog').remove();
				});
			}
		});
	};



})(window); //바로 실행!!