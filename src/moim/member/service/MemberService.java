package moim.member.service;

import java.util.List;


import moim.member.model.Member;
import moim.member.model.Memberpaging;


public interface MemberService {

	public void insertMember(Member member);

	public void deleteMember(int id);

	public void updateMember(Member member);

	public List<Member> getMember(Member member);

	public int checkId(String email);

	public List<Member> findId(Member member);

	public void changePassword(Member member);

	public List<Member> getPageMember(Memberpaging paging);

	public List<Member> getMeetingMember(String meeId);

	public List<Member> getMyName(String Id);
}

