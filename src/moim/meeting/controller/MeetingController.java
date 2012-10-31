package moim.meeting.controller;

import java.util.HashMap;
import java.util.List;

import jcf.sua.mvc.MciRequest;
import jcf.sua.mvc.MciResponse;
import moim.board.service.BoardService;
import moim.comment.service.CommentService;
import moim.letter.model.Letter;
import moim.letter.service.LetterService;
import moim.meeting.model.Meeting;
import moim.meeting.model.MeetingPaging;
import moim.meeting.model.Membermeeting;
import moim.meeting.model.MyMeeting;
import moim.meeting.service.MeetingService;
import moim.member.model.Member;
import moim.member.service.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MeetingController {

	@Autowired
	private MeetingService mee_service;


	@Autowired
	private BoardService boa_service;

	@Autowired
	private CommentService com_service;

	@Autowired
	private MemberService mem_service;

	@Autowired
	private LetterService let_service;

	/**
	 * 모임을 생성할 때 사용하는 메소드
	 */
	@RequestMapping("/meeting/createMeeting")
	public void createMeeting(MciRequest request, MciResponse response)
	{
		Meeting meeting = request.getParam(Meeting.class);
		String meeId = request.getParam("meeId");

		System.out.println(meeId);

		HashMap<String, String> map = new HashMap<String, String>();
		map.put("tableName", meeId);

		Membermeeting membermeeting = new Membermeeting();

		membermeeting.setMemId(request.getParam("meeAdminid"));
		membermeeting.setMemmeeAdmin("1");
		membermeeting.setMeeId(meeId);

		mee_service.insertMeeting(meeting);
		mee_service.createBoardTable(map);
		mee_service.createCommentsTable(map);
		mee_service.insertMembermeeting(membermeeting);

		response.addSuccessMessage("createMeeting OK");
	}

	/**
	 * 모임에 가입할 때 사용하는 메소드
	 */
	@RequestMapping("/meeting/joinMeeting")
	public void joinMeeting(MciRequest request, MciResponse response)
	{
		Meeting meeting = request.getParam(Meeting.class);
		String meeId = request.getParam("meeId");
		String memId = request.getParam("memId");

		meeting.setMeeId(meeId);
		Membermeeting membermeeting = new Membermeeting();

		membermeeting.setMemId(memId);
		membermeeting.setMemmeeAdmin("0");
		membermeeting.setMeeId(meeId);

		try
		{
			mee_service.joinMeeting(meeting);
			mee_service.insertMembermeeting(membermeeting);
			response.addSuccessMessage("joinMeeting OK");
		}
		catch(Exception e){
			response.addSuccessMessage("FAIL");
		}

	}

	/**
	 * 모임에 탈퇴할 때 사용하는 메소드
	 */
	@RequestMapping("/meeting/withdrawMeeting")
	public void withdrawMeeting(MciRequest request, MciResponse response)
	{
		String meeId = request.getParam("meeId");
		String memId = request.getParam("memId");

		Membermeeting membermeeting = new Membermeeting();
		membermeeting.setMeeId(meeId);
		membermeeting.setMemId(memId);

		Meeting meeting = new Meeting();
		meeting.setMeeId(meeId);

		mee_service.withdrawMembermeeting(membermeeting);
		mee_service.withdrawMeeting(meeting);

		response.addSuccessMessage("withdrawMeeting OK");
	}


	/**
	 * 모임을 삭제할 때 사용하는 메소드
	 */
	@RequestMapping("/meeting/deleteMeeting")
	public void deleteMeeting(MciRequest request, MciResponse response)
	{
		String meeId = request.getParam("meeId");
		String id = request.getParam("memId");

		Meeting meeting = new Meeting();
		meeting.setMeeId(meeId);

 		List<Meeting> met_list = mee_service.getMeeting(meeting);
		List<Member> m_list = mem_service.getMyName(id);
		List<Membermeeting> mem_list = mee_service.getMemIdFromMembermeeting(meeId);


		for(int i=0 ; i<mem_list.size() ; i++)
		{
			if(mem_list.get(i).getMemId().equals(id))
			{
			}
			else
			{
				Letter letter = new Letter(	"모임삭제 알림 메세지입니다.",
						met_list.get(0).getMeeName()+" 모임이 삭제되어 탈퇴되었음을 알려드립니다.",
						mem_list.get(i).getMemId(),m_list.get(0).getMemName(),meeId);
				let_service.insertLetter(letter);
			}
		}

 		mee_service.deleteMeeting(meeId);
		mee_service.deleteMembermeeting(meeId);

		boa_service.dropBoard(meeId);
		com_service.dropComments(meeId);

		response.addSuccessMessage("모임삭제됨");
	}

	/**
	 * 모임을 수정할 때 사용하는 메소드
	 */
	@RequestMapping("/meeting/updateMeeting")
	public void updateMeeting(MciRequest request, MciResponse response)
	{
		Meeting meeting = request.getParam(Meeting.class);
		mee_service.updateMeeting(meeting);
		response.addSuccessMessage("updateMeeting OK");
	}

	/**
	 * 모임을 조회할 때 사용하는 메소드
	 */
	@RequestMapping("/meeting/getMeeting")
	public void getMeeting(MciRequest request, MciResponse response){

		Meeting meeting = request.getParam(Meeting.class);

		List<Meeting> mee_list = mee_service.getMeeting(meeting);

		response.setList("MEETING", mee_list);
	}

	/**
	 * 모임을  부분 조회할 때 사용하는 메소드
	 * 모임 검색 부분 (이름으로 검색, 키워드로 검색 구현 완료)
	 */
	@RequestMapping("/meeting/getSelectmeeting")
	public void getSelectmeeting(MciRequest request, MciResponse response){

		final int ARTICLESPERPAGE = 5;

		String page = request.getParam("page");

		int startNo = (ARTICLESPERPAGE * (Integer.parseInt(page) - 1)) + 1;
		int endNo = (ARTICLESPERPAGE * Integer.parseInt(page));

		List<Meeting> page_list = null;

		String selected = request.getParam("Selected");

		MeetingPaging meetingpaging = new MeetingPaging();

		meetingpaging.setMeeStart(startNo);
		meetingpaging.setMeeEnd(endNo);
		meetingpaging.setMeeText(request.getParam("text"));

		System.out.println(request.getParam("text"));
		if(selected.equals("name"))
		{
			page_list = mee_service.selectNameUsing(meetingpaging);

		}
		else if(selected.equals("keyword"))
		{
			page_list = mee_service.selectKeywordUsing(meetingpaging);
		}
		response.setList("MEETING", page_list);
	}

	/**
	 * 모임 홈
	 */
	@RequestMapping("/meeting/homeMeeting")
	public void homeMeeting(MciRequest request, MciResponse response)
	{
		Meeting meeting = request.getParam(Meeting.class);
		List<Meeting> mee_list = mee_service.homeMeeting(meeting);
		response.setList("homeMeeting", mee_list);
	}

	/**
	 * 추천모임
	 */
	@RequestMapping("/meeting/recommendMeeting")
	public void recommendMeeting(MciRequest request, MciResponse response)
	{
		Meeting meeting = request.getParam(Meeting.class);

		List<Meeting> mee_list = mee_service.recommendMeeting(meeting);
		response.setList("recommendMeeting", mee_list);
	}

	/**
	 * 전체 모임 목록 조회
	 */
	@RequestMapping("/meeting/allPageMeeting")
	public void allPageMeeting(MciRequest request, MciResponse response)
	{
		final int ARTICLESPERPAGE = 5;

		String page = request.getParam("page");

		int startNo = (ARTICLESPERPAGE * (Integer.parseInt(page) - 1)) + 1;
		int endNo = (ARTICLESPERPAGE * Integer.parseInt(page));

		MeetingPaging meetingpaging = new MeetingPaging();

		String meeCategoryid = request.getParam("meeCategoryid");

		meetingpaging.setMeeStart(startNo);
		meetingpaging.setMeeEnd(endNo);
		meetingpaging.setMeeCategoryid(meeCategoryid);

		List<Meeting> page_list = mee_service.allPageMeeting(meetingpaging);

		response.setList("ALLPAGE", page_list);
	}

	/**
	 * 금주의 모임
	 */
	@RequestMapping("/meeting/thisweekMeeting")
	public void randomMeeting(MciRequest request, MciResponse response)
	{
		Meeting meeting = request.getParam(Meeting.class);

		List<Meeting> mee_list = mee_service.thisweekMeeting(meeting);
		response.setList("thisweekMeeting", mee_list);
	}

	/**
	 * 나의 참여 모임 조회
	 */
	@RequestMapping("/meeting/getMyMeeting")
	public void getMyMeeting(MciRequest request, MciResponse response)
	{
		String myid = request.getParam("id");

		System.out.println( "모임조회 id : " + myid);

		List<MyMeeting> mee_list = mee_service.getMyMeeting(myid);


		response.setList("MYMEETING", mee_list);
	}


	/**
	 * MAX ID
	 */
	@RequestMapping("/meeting/getMaxId")
	public void getMaxId(MciRequest request, MciResponse response)
	{
		int id = mee_service.getMaxId(0)+1;
		mee_service.insertMeeid(id);
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("meeId",id);

		response.setMap("MEEID", map);
	}

	/**
	 * 모임에 참여중인 멤버인가?
	 */
	@RequestMapping("/memberMeeting/isMember")
	public void isMember(MciRequest request, MciResponse response)
	{
		String meeId = request.getParam("meeId");
		String memId = request.getParam("memId");

		Membermeeting membermeeting = new Membermeeting();

		membermeeting.setMeeId(meeId);
		membermeeting.setMemId(memId);
		HashMap<String, String> map = new HashMap<String, String>();

		int result = mee_service.getIsMember(membermeeting);
		if(result == 0)
		{
			map.put("IsMember","N");
			response.setMap("ISMEMBER", map);
		}
		else if(result == 1)
		{
			map.put("IsMember","Y");
			response.setMap("ISMEMBER", map);
		}

	}

}
