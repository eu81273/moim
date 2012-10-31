(function(global)
{
	//이렇게 연결해주어야 모든 곳에서 접근 가능
	var commonController = global.commonController;


	//메인 메뉴
	$('#subNavigation').bind('click',
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
				case '회원목록조회':
					$('#content').load('memList.html');
				break;

				case '공간목록조회':
					$('#content').load('placeList.html');
				break;

				case '공간 등록':
					$('#content').load('placeEnroll.html');
				break;
			}
		}
	});

})(window);