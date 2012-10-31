package moim.meeting.service;

import java.util.HashMap;
import java.util.List;

import jcf.query.core.QueryExecutor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import moim.meeting.model.Meeting;
import moim.meeting.model.MyMeeting;
import moim.meeting.model.Membermeeting;
import moim.meeting.model.MeetingPaging;
import moim.member.model.Member;

@Service
public class MeetingServiceImpl implements MeetingService{

	@Autowired
	private QueryExecutor queryExecutor;

	@Override
	public void insertMeeting(Meeting meeting) {
		queryExecutor.update("meeting.insertMeeting", meeting);

	}

	@Override
	public void deleteMeeting(String id) {
		queryExecutor.update("meeting.deleteMeeting", id);

	}

	@Override
	public void updateMeeting(Meeting meeting) {
		queryExecutor.update("meeting.updateMeeting", meeting);

	}

	@Override
	public List<Meeting> getMeeting(Meeting meeting) {
		return queryExecutor.queryForList("meeting.selectMeeting", meeting , Meeting.class);
	}

	@Override
	public List<Meeting> selectNameMeeting(Meeting meeting) {

		return queryExecutor.queryForList("meeting.selectNameUsing", meeting , Meeting.class);
	}

	@Override
	public List<Meeting> selectKeywordMeeting(Meeting meeting) {

		return queryExecutor.queryForList("meeting.selectKeywordUsing", meeting , Meeting.class);
	}

	@Override
	public List<MyMeeting> getMyMeeting(String id) {
		return queryExecutor.queryForList("meeting.selectMyMeeting", id , MyMeeting.class);
	}


	@Override
	public int getMaxId(int id) {

		return queryExecutor.queryForInt("meeting.selectMeeid",id);
	}

	@Override
	public void insertMeeid(int id) {
		queryExecutor.update("meeting.insertMeeid",id);
	}

	@Override
	public void createBoardTable(HashMap<String, String> map) {
		queryExecutor.update("meeting.createBoardTable",map);

	}

	@Override
	public void createCommentsTable(HashMap<String, String> map) {
		queryExecutor.update("meeting.createCommentsTable",map);
	}

	@Override
	public List<Meeting> homeMeeting(Meeting meeting) {
		return queryExecutor.queryForList("meeting.homeMeeting", meeting , Meeting.class);
	}

	@Override
	public List<Meeting> recommendMeeting(Meeting meeting) {
			return queryExecutor.queryForList("meeting.recommendMeeting", meeting , Meeting.class);
	}

	@Override
	public List<Meeting> latelyMeeting(Meeting meeting) {
		return queryExecutor.queryForList("meeting.latelyMeeting", meeting , Meeting.class);
	}

	@Override
	public List<Meeting> thisweekMeeting(Meeting meeting) {
		return queryExecutor.queryForList("meeting.thisweekMeeting", meeting , Meeting.class);
	}

	@Override
	public void insertMembermeeting(Membermeeting membermeeting) {
		queryExecutor.update("meeting.insertMembermeeting",membermeeting);

	}

	@Override
	public void joinMeeting(Meeting meeting) {
		queryExecutor.update("meeting.joinMeeting", meeting);

	}

	@Override
	public void withdrawMeeting(Meeting meeting) {
		queryExecutor.update("meeting.withdrawMeeting", meeting);

	}

	@Override
	public void withdrawMembermeeting(Membermeeting membermeeting) {
		queryExecutor.update("meeting.withdrawMembermeeting", membermeeting);
	}

	@Override
	public int getIsMember(Membermeeting membermeeting) {
		return queryExecutor.queryForInt("meeting.selectIsMember", membermeeting);
	}

	@Override
	public void deleteMembermeeting(String id) {
		queryExecutor.update("meeting.deleteMembermeeting", id);

	}

	@Override
	public List<Meeting> allPageMeeting(MeetingPaging meetingpaging) {
		return queryExecutor.queryForList("meeting.allPageMeeting", meetingpaging, Meeting.class);
	}

	@Override
	public List<Meeting> selectNameUsing(MeetingPaging meetingpaging) {
		return queryExecutor.queryForList("meeting.selectNameUsing", meetingpaging, Meeting.class);
	}

	@Override
	public List<Meeting> selectKeywordUsing(MeetingPaging meetingpaging) {
		return queryExecutor.queryForList("meeting.selectKeywordUsing", meetingpaging, Meeting.class);
	}

	@Override
	public List<Membermeeting> getMemIdFromMembermeeting(String meeId) {
		return queryExecutor.queryForList("meeting.selectMembermeeting", meeId, Membermeeting.class);
	}




}
