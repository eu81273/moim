package moim.meeting.service;

import java.util.HashMap;
import java.util.List;

import moim.meeting.model.Meeting;
import moim.meeting.model.MyMeeting;
import moim.meeting.model.Membermeeting;
import moim.meeting.model.MeetingPaging;

public interface MeetingService {

	public void insertMeeting(Meeting meeting);

	public void deleteMeeting(String id);

	public void updateMeeting(Meeting meeting);

	public List<Meeting> getMeeting(Meeting meeting);

	public List<Meeting> selectNameMeeting(Meeting meeting);

	public List<Meeting> selectKeywordMeeting(Meeting meeting);

	public List<MyMeeting> getMyMeeting(String id);

	public int getMaxId(int id);

	public void insertMeeid(int id);

	public void createBoardTable(HashMap<String, String> map);

	public void createCommentsTable(HashMap<String, String> map);

	public List<Meeting> recommendMeeting(Meeting meeting);

	public List<Meeting> latelyMeeting(Meeting meeting);

	public List<Meeting> thisweekMeeting(Meeting meeting);

	public void insertMembermeeting(Membermeeting membermeeting);

	public void joinMeeting(Meeting meeting);

	public void withdrawMeeting(Meeting meeting);

	public void withdrawMembermeeting(Membermeeting membermeeting);

	public int getIsMember(Membermeeting membermeeting);

	public List<Meeting> homeMeeting(Meeting meeting);

	public void deleteMembermeeting(String id);

	public List<Meeting> allPageMeeting(MeetingPaging meetingpaging);

	public List<Meeting> selectNameUsing(MeetingPaging meetingpaging);

	public List<Meeting> selectKeywordUsing(MeetingPaging meetingpaging);

	public List<Membermeeting> getMemIdFromMembermeeting(String meeId);
}

