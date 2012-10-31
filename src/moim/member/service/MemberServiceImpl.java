package moim.member.service;

import java.util.List;

import jcf.query.core.QueryExecutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import moim.member.model.Member;
import moim.member.model.Memberpaging;


@Service
public class MemberServiceImpl implements MemberService{

	@Autowired
	private QueryExecutor queryExecutor;


	@Override
	public void insertMember(Member member) {

		queryExecutor.update("member.insertMember", member);
	}


	@Override
	public void updateMember(Member member) {
		queryExecutor.update("member.updateMember", member);
	}


	@Override
	public List<Member> getMember(Member member) {
		return queryExecutor.queryForList("member.selectMember", member , Member.class);
	}


	@Override
	public void deleteMember(int id) {
		queryExecutor.update("member.deleteMember", id);

	}


	@Override
	public int checkId(String email) {
		return queryExecutor.queryForInt("member.checkEmail", email);
	}


	@Override
	public List<Member> findId(Member member) {
		return queryExecutor.queryForList("member.findEmail", member, Member.class);
	}


	@Override
	public void changePassword(Member member) {
		queryExecutor.update("member.changePassword", member);
	}


	@Override
	public List<Member> getPageMember(Memberpaging paging) {
		return queryExecutor.queryForList("member.selectPageMember", paging, Member.class);
	}


	@Override
	public List<Member> getMeetingMember(String meeId) {
		return queryExecutor.queryForList("member.selectMeetingMember", meeId, Member.class);
	}


	@Override
	public List<Member> getMyName(String Id) {
		return queryExecutor.queryForList("member.getMyName", Id, Member.class);
	}




}
