package moim.letter.controller;

import java.util.HashMap;
import java.util.List;

import jcf.sua.mvc.MciRequest;
import jcf.sua.mvc.MciResponse;
import moim.letter.model.Letter;
import moim.letter.model.LetterPaging;
import moim.letter.service.LetterService;
import moim.meeting.model.Meeting;
import moim.meeting.service.MeetingService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class LetterController {

		@Autowired
		private LetterService let_service;

		@Autowired
		private MeetingService mee_service;

		/**
		 * 안읽은 쪽지 개수 가져오기
		 */
		@RequestMapping("/letter/getNoreadLetter")
		public void noreadLetter(MciRequest request, MciResponse response)
		{
			String id = request.getParam("id");

			int noReadCount = let_service.getNoreadLetter(id);

			HashMap<String, Integer> map = new HashMap<String, Integer>();
			map.put("count", noReadCount);

			response.setMap("COUNT", map);
		}

		/**
		 * 페이지 단위로 목록 조회
		 */
		@RequestMapping("/letter/getPageLetter")
		public void paging(MciRequest request, MciResponse response)
		{
			final int ARTICLESPERPAGE = 5;

			String id = request.getParam("letToMem");
			String page = request.getParam("page");

			int startNo = (ARTICLESPERPAGE * (Integer.parseInt(page) - 1)) + 1;
			int endNo = (ARTICLESPERPAGE * Integer.parseInt(page));

			LetterPaging paging = new LetterPaging();
			paging.setLetTomem(id);
			paging.setLetStart(startNo);
			paging.setLetEnd(endNo);

			List<Letter> page_list = let_service.getPageLetter(paging);

			response.setList("PAGELETTER", page_list);
		}

		/**
		 * 사용자가 받은 안내장을 확인할 때 사용하는 메소드
		 * */
		@RequestMapping("/letter/getLetter")
		public void getLetter(MciRequest request, MciResponse response){

			Letter letter = new Letter();
			String letId = request.getParam("letId");
			letter.setLetTomem(request.getParam("letToMem"));
			letter.setLetId(letId);

			List<Letter> let_list = let_service.getLetter(letter);

			let_service.updateLetter(letId);
			response.setList("LETTER", let_list);
		}

		/**
		 * 확인한 안내장을 삭제할 때 사용하는 메소드
		 * test.html ok
		 */
		@RequestMapping("/letter/deleteLetter")
		public void deleteLetter(MciRequest request, MciResponse response)
		{
			String letId = request.getParam("letId");

			let_service.deleteLetter(letId);
			response.addSuccessMessage("success");
		}


		/**
		 * 안내장을 생성할 때 사용하는 메소드
		 * test.html ok
		 */
		@RequestMapping("/letter/createLetter")
		public void createLetter(MciRequest request, MciResponse response)
		{
			String meeId= request.getParam("meeId");
			String letTomem = request.getParam("letTomem");
			String letFrommemname = request.getParam("letFrommemname");

			Meeting meeting = new Meeting();
			meeting.setMeeId(meeId);
			List<Meeting> met_list = mee_service.getMeeting(meeting);

			Letter letter = new Letter("모임 초대 안내장 입니다 ^^", met_list.get(0).getMeeName()+
					" 모임에서 당신을 초대합니다. ", letTomem, letFrommemname,meeId);

			let_service.insertLetter(letter);

			response.addSuccessMessage("sussess");
		}

}
