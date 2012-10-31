
package moim.member.controller;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import jcf.sua.mvc.MciRequest;
import jcf.sua.mvc.MciRequestContextHolder;
import jcf.sua.mvc.MciResponse;
import moim.meeting.model.MeetingPaging;
import moim.member.model.Member;
import moim.member.model.Memberpaging;
import moim.member.service.MemberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class MemberController {

	@Autowired
	private MemberService mem_service;

	/**
	 * 회원목록을 검색할때 사용하는 메소드
	 * */
	@RequestMapping("/member/getMember")
	public void getMember(MciRequest request, MciResponse response)
	{
		Member member = request.getParam(Member.class);

		member.setMemEmail(request.getParam("memEmail"));
		member.setMemName(request.getParam("memName"));
		member.setMemCategoryid(request.getParam("memCategoryid"));
		member.setMemPhone(request.getParam("memPhone"));

		List<Member> mem_list = mem_service.getMember(member);
		System.out.println(mem_list.get(0).getCatName());
		response.setList("MEMBER", mem_list);
	}
	/**
	 * 회원 수정 메소드
	 */
	@RequestMapping("/member/modifyMember")
	public void modifyMember(MciRequest request, MciResponse response)
	{
		Member member = request.getParam(Member.class);

		String c_password = member.getMemPassword();
		member.setMemPassword(changePwd(c_password));

		mem_service.updateMember(member);
		response.addSuccessMessage("success");
	}


	/**
	 * 회원이 탈퇴하거나 강제 탈퇴 시킬 때 사용하는 메소드
	 */
	@RequestMapping("/member/deleteMember")
	public void deleteMember(MciRequest request, MciResponse response)
	{
		String memId = request.getParam("memId");
		String id = request.getParam("Id");

		if(id.equals("0"))
		{
			System.out.println("관리자삭제"+ id + "   " + memId);
			mem_service.deleteMember(Integer.parseInt(memId));
		}
		else
		{
			System.out.println("회원삭제" + id + "   " + memId);
			HttpSession session = MciRequestContextHolder.get().getHttpServletRequest().getSession();
			String session_ran = session.getAttribute("random").toString();

			if(session_ran.equals(request.getParam("random")))
			{
				System.out.println(id);
				mem_service.deleteMember(Integer.parseInt(id));
			}
		}

		response.addSuccessMessage(" deleteMember success");
	}


	/**
	 * 회원가입이 일어나면 사용되는 메소드
	 */
	@RequestMapping("/member/createMember")
	public void createMember(MciRequest request, MciResponse response)
	{
		Member member = request.getParam(Member.class);

		String c_password = changePwd(member.getMemPassword());

		member.setMemPassword(c_password);

		mem_service.insertMember(member);
		response.addSuccessMessage("sussess");
	}


	/**
	 * 로그인기능
	 */
	@RequestMapping("/member/logIn")
	public void checkLogIn(MciRequest request, MciResponse response)
	{
		Member member = request.getParam(Member.class);

		List<Member> mem_list = mem_service.getMember(member);
		Member mem = mem_list.get(0);

		HashMap<String, String> map = new HashMap<String, String>();

		if(changePwd(member.getMemPassword()).equals(mem.getMemPassword()))
		{
			// Email, id, random save in map
			int ranNum = (int) (Math.random() * 100 + 1);

			HttpSession session = MciRequestContextHolder.get().getHttpServletRequest().getSession();
			session.setAttribute("id", mem.getMemId());
			session.setAttribute("email", mem.getMemEmail());
			session.setAttribute("random", ranNum);
			session.setMaxInactiveInterval(43200); // 24시간

			map.put("id", String.valueOf(mem.getMemId()));
			map.put("email", mem.getMemEmail());
			map.put("name", mem.getMemName());
			map.put("random", String.valueOf(ranNum));
			map.put("category", String.valueOf(mem.getMemCategoryid()));

			response.setMap("LOGIN", map);
		}
	}


	/**
	 * 로그아웃 기능
	 */
	@RequestMapping("/member/logOut")
	public void checkLogOut(MciRequest request, MciResponse response)
	{
		HttpSession session = MciRequestContextHolder.get().getHttpServletRequest().getSession();
		session.invalidate();
	}

	/**
	 *  암호화 메소드
	 *  test ok
	 *  input  : aaa123123123df
	 *	output : df83b07c53dfec7ad57a5fe99718fb66
	 */
	public String changePwd(String password)
	{

		try {
			MessageDigest md;
			md = MessageDigest.getInstance("MD5");
			byte[] messageDigest = md.digest(password.getBytes());
			BigInteger number = new BigInteger(1,messageDigest);
			String hashtext = number.toString(16);

			while(hashtext.length()<32)
			{
				hashtext = "0" + hashtext;
			}
			return hashtext;

		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 *Email(ID) 중복 체크!
	 */
	@RequestMapping("/member/checkId")
	public void checkEmail(MciRequest request, MciResponse response)
	{
		String memEmail = request.getParam("memEmail");

		System.out.println(memEmail);

		int check = mem_service.checkId(memEmail);
		HashMap<String, String> map = new HashMap<String, String>();

		System.out.println(check);
		if(check>=1)
		{
			map.put("available", "false");
			System.out.println("available : " + map.get("available"));

		}
		else
		{
			map.put("available", "true");
			System.out.println("available : " + map.get("available"));
		}
		response.setMap("CHECKID", map);
	}

	/**
	 * 아이디 찾기
	 */
	@RequestMapping("/member/findId")
	public void findEmail(MciRequest request, MciResponse response)
	{

		Member member = request.getParam(Member.class);

		List<Member> mem_list = mem_service.getMember(member);

		System.out.println(mem_list.get(0).getMemEmail());
		response.setList("EMAIL", mem_list);
	}

	/**
	 * 비밀번호 찾기
	 */
	@RequestMapping("/member/findPassword")
	public void findPasswor(MciRequest request, MciResponse response)
	{
		System.out.println("findPwd!!!");
		String memEmail = request.getParam("memEmail");

		String randomPwd = randomPassword();

		Member member = new Member();
		member.setMemEmail(memEmail);
		member.setMemPassword(changePwd(randomPwd));

		mem_service.changePassword(member);

		HashMap<String, String> map = new HashMap<String, String>();

		map.put("pwd", randomPwd);
		response.setMap("PASSWORD", map);
	}

	/**
	 * 랜덤 비밀번호 생성 함수
	 */
	public String randomPassword()
	{
		int index=0;
		int length=10;
		String[] stringSet = new String[]{"0","1","2","3","4","5","6","7","8","9"
				,"a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v"
				,"x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S"
				,"T","U","V","W","X","Y","Z"};

		StringBuffer sb = new StringBuffer();
		for(int i=0; i<length ; i++)
		{
			index=(int)(stringSet.length*Math.random());
			sb.append(stringSet[index]);
		}
		return sb.toString();
	}

	/**
	 * 페이지 단위로 회원 목록 조회
	 */
	@RequestMapping("/member/getPageMember")
	public void paging(MciRequest request, MciResponse response)
	{
		final int ARTICLESPERPAGE = 5;

		String page = request.getParam("page");

		int startNo = (ARTICLESPERPAGE * (Integer.parseInt(page) - 1)) + 1;
		int endNo = (ARTICLESPERPAGE * Integer.parseInt(page));

		Memberpaging paging = new Memberpaging();
		paging.setMemStart(startNo);
		paging.setMemEnd(endNo);
		paging.setMemEmail(request.getParam("memEmail"));
		paging.setMemName(request.getParam("memName"));
		paging.setMemCategoryid(request.getParam("memCategoryid"));

		List<Member> page_list = mem_service.getPageMember(paging);

		response.setList("PAGE", page_list);
	}



	/**
	 * 모임에 참여하는 멤버 조회하기
	 */
	@RequestMapping("/member/getMeetingMember")
	public void getMeetingMember(MciRequest request, MciResponse response)
	{
		String meeId = request.getParam("meeId");

		List<Member> meeMem_list = mem_service.getMeetingMember(meeId);

		response.setList("MEETINGMEMBER", meeMem_list);

	}


}



