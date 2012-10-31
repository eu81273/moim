

DROP TABLE BOARD CASCADE CONSTRAINTS
;
DROP TABLE COMMENT CASCADE CONSTRAINTS
;
DROP TABLE LETTER CASCADE CONSTRAINTS
;
DROP TABLE MEETING CASCADE CONSTRAINTS
;
DROP TABLE MEMBER CASCADE CONSTRAINTS
;
DROP TABLE MEMBER_MEETING CASCADE CONSTRAINTS
;
DROP TABLE PLACE CASCADE CONSTRAINTS
;
DROP TABLE PLACEUSED CASCADE CONSTRAINTS

		SELECT *
		FROM MEETING
		WHERE MEE_NAME LIKE '%자전%'



--게시판 테이블--
CREATE TABLE BOARD
(
	BOA_NUM      NUMBER(8) PRIMARY KEY,
	BOA_SUBJECT  VARCHAR2(30) ,
	BOA_DATE     VARCHAR2(8) ,
	BOA_CONTENT  VARCHAR2(300) ,
	BOA_FILE     VARCHAR2(50),
	MEM_ID       NUMBER(8),
	MEE_ID       NUMBER(8),
	BOA_CLICKNUM NUMBER(8)
)
;

select * from MEMBER

select * from board
--댓글 테이블--
CREATE TABLE COMMents
(
	COM_NUM      NUMBER(8) PRIMARY KEY,
	MEM_ID       NUMBER(8),
	BOA_NUM      NUMBER(8),
	COM_DATE     VARCHAR2(8),
	COM_CONTENT  VARCHAR2(150)
)
;



--게시판과 댓글 테이블 BOA_NUM 컬럼 외래키 설정
ALTER TABLE comments ADD CONSTRAINT FK_COMMENTs_BOARD
FOREIGN KEY (BOA_NUM) REFERENCES BOARD (BOA_NUM)
;


--쪽지 테이블--
create TABLE LETTER(
	LET_ID NUMBER(8) PRIMARY KEY,
	LET_TITLE VARCHAR2(30),
	let_content VARCHAR2(300),
	let_check CHAR(1),
	let_date VARCHAR2(8),
	let_toMem NUMBER(8),
	let_fromMemName VARCHAR2(30)
);

drop table meeting
--모임 테이블--
CREATE TABLE MEETING
(
	MEE_ID            NUMBER(8) PRIMARY KEY,
	MEE_NAME          VARCHAR2(30) ,
	MEE_KEYWORD       VARCHAR2(30),
	MEE_EXPLAIN       VARCHAR2(300),
	MEE_OPEN		  NUMBER(8),
	MEE_STARTDATE     DATE ,
	MEE_MAXPEOPLE     NUMBER(8),
	MEE_JOINPOSSIBLE  NUMBER(8),
	MEE_PHOTO         VARCHAR2(50),
	MEE_CATEGORYID    NUMBER(8),
	MEE_PLAID         NUMBER(8),
	MEE_CURRENTPEOPLE NUMBER(8),
	MEE_ADMINID NUMBER(8)
)
;
select * from meeting

insert into meeting values(0,'모임1','자전거','자전거를 탑시다~!',1,'20120510','20120530',5,1,'aa.jpg',2,1,3,'이윤지');
insert into meeting values(1,'모임2','육아','아이를 기릅시다~!',1,'20121010','20121030',13,1,'b2.jpg',6,1,13,'아이스티');
insert into meeting values(2,'모임3','게임','게임을 합시다~!',1,'20121230','20131120',8,1,'cde.jpg',0,1,3,'볼펜');

SELECT *
			FROM ( SELECT ROWNUM AS MYROWNUM, ARTICLES.*
				FROM (SELECT * FROM MEETING ORDER BY mee_Id DESC) ARTICLES )
			WHERE MYROWNUM BETWEEN #meeStart# AND #meeEnd#

select * from meeting where mee_joinpossible = 1

update
(	select *
	from meeting
	where mee_id = 0 and mee_joinpossible = 1
)
set mee_currentpeople = mee_currentpeople +1,
mee_joinpossible = 0 where mee_maxpeople = mee_currentpeople

insert into membermeeting values(0, 0, 0 )

select *
from(
	select mee_name
	from meeting
	where mee_maxpeople != mee_currentpeople
	order by dbms_random.value
	)
where rownum between 0 and 5

select *
from MEETING
where  TO_CHAR(sysdate, 'YYYYMMDD') - TO_CHAR(MEE_STARTDATE,'YYYYMMDD') <=7

select TO_CHAR(MEE_STARTDATE,'YYYYMMDD') -7
from MEETING

select *
from(
	select mee_name
	from meeting
	order by mee_id DESC
	)
where rownum between 0 and 5;

select *
from(
	select mee_name
	from meeting
	order by dbms_random.value
	)
where rownum between 0 and 1


select *
from(
	select mee_startdate - sysdate between 0 and 7
	from meeting
	order by dat ASC
	)
where rownum between 0 and 5

SELECT sysdate +7
from dual



select * from CATEGORY
--게시판 테이블과 모임 테이블 MEE_ID 컬럼 외래키 설정
ALTER TABLE board ADD CONSTRAINT FK_board_meeting
FOREIGN KEY (MEE_ID) REFERENCES meeting (MEE_ID)
;

--회원 테이블
CREATE TABLE MEMBER
(
	MEM_ID          NUMBER(8) PRIMARY KEY,
	MEM_EMAIL       VARCHAR2(30) ,
	MEM_NAME        VARCHAR2(10) ,
	MEM_PHONE       VARCHAR2(11) ,
	MEM_PASSWORD    VARCHAR2(300) ,
	MEM_PHOTO       VARCHAR2(50),
	MEM_CATEGORYID  NUMBER(8)
)
;
insert into member values(0, 'micejjh1@naver.com', '장진형', '01076783669', '1234', 'jjh.jpg', '2');

select * from member;

update MEMBER set MEM_ID=0 where MEM_NAME='장진형';

delete from MEMBER where MEM_ID=0;

insert into place values(0,'토즈강남','0201000200',6,1500,'서울강남','toz.jpg','깨끗하고 넓어요~');
select * from category
drop table member

--맴버미팅 테이블--
CREATE TABLE MEMBERMEETING
(
	MEM_ID  NUMBER(8) not null,
	MEE_ID  NUMBER(8) not null,
	ADMIN   NUMBER(8) not null
)
;
select * from meeting
insert into membermeeting values(1,1,0);
insert into membermeeting values(1,2,0);
insert into membermeeting values(11,1,0);
insert into membermeeting values(12,1,0);
insert into membermeeting values(12,2,0);


SELECT MEE_NAME,MEE_CURRENTPEOPLE, MEE_MAXPEOPLE, MEE_ADMINNAME
FROM MEETING, (	SELECT MEE_ID
	FROM MEMBERMEETING
	WHERE MEM_ID = 1) MY
WHERE meeting.MEE_ID = MY.MEE_ID


UPDATE MEMBER
SET MEM_ID = 0
WHERE MEM_ID = 1

SELECT *
FROM ( SELECT ROWNUM AS MYROWNUM, ARTICLES.*
FROM (SELECT * FROM PLACE ORDER BY pla_Id DESC) ARTICLES )
WHERE MYROWNUM BETWEEN 1 AND 3

select * from MEMBERMEETING

--맴버 테이블과 맴버모임 테이블 MEM_ID 컬럼 외래키 설정
ALTER TABLE MEMBERMEETING ADD CONSTRAINT FK_MEMBERMEETING_MEMBER
FOREIGN KEY (MEM_ID) REFERENCES MEMBER (MEM_ID)
;
drop table place

--공간 테이블--
CREATE TABLE PLACE
(
	PLA_ID           NUMBER(8) PRIMARY KEY,
	PLA_NAME         VARCHAR2(30) ,
	PLA_PHONE        VARCHAR2(15) ,
	PLA_PRICE		 NUMBER(8) ,
	PLA_ADDR	     VARCHAR2(200),
	PLA_PHOTO        VARCHAR2(50),
	PLA_MAX		     NUMBER(8) ,
	PLA_EXPLAIN  	 VARCHAR2(300)
)
;

select * from place

insert into PLACE values(1, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임')
insert into PLACE values(2, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(3, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(4, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(5, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(6, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(7, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(8, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(9, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(10, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임');
insert into PLACE values(11, '토즈종로점','02-1234-1234', 18, '서울종로', 'j.jpg', 18, '토즈종로점임')

--모임 테이블과 맴버모임 테이블 MEM_ID 컬럼 외래키 설정
ALTER TABLE MEMBERMEETING ADD CONSTRAINT FK_MEMBERMEETING_MEETING
FOREIGN KEY (MEE_ID) REFERENCES MEETING (MEE_ID)
;

--공간 테이블과 모임 테이블 PLA_ID 컬럼 외래키 설정
ALTER TABLE PLACE ADD CONSTRAINT FK_PLACE_MEETING
FOREIGN KEY (PLA_ID) REFERENCES MEETING (MEE_PLAID)
;

--쪽지 테이블과 맴버 테이블 MEM_ID 컬럼 외래키 설정
ALTER TABLE LETTER ADD CONSTRAINT FK_LETTER_MEMBER
FOREIGN KEY (let_toMem) REFERENCES MEMBER (MEM_ID)
;


insert into place values(0,'토즈강남','0201000200',6,1500,'서울강남','toz.jpg','깨끗하고 넓어요~');



--공간이용중 여부--
CREATE TABLE PLACEUSED
(
	USED_ID    NUMBER(8) primary key,
	PLA_ID   NUMBER(8) not null,
	USED_DATE  VARCHAR2(8) not null,
	USED_TIME  VARCHAR2(1) not null
)
;

SELECT *
FROM PLACEUSED
WHERE PLA_ID=3 AND USED_DATE=20121019

insert into placeused values(0,3,'20121019','A')
drop table PLACEUSED
select * from PLACEUSED
--공간이용중 테이블과 공간 테이블 PLA_ID 컬럼 외래키 설정
ALTER TABLE PLACEUSED ADD CONSTRAINT FK_PLACEUSED_PLACE
FOREIGN KEY (PLA_ID) REFERENCES PLACE (PLA_ID);


--

CREATE TABLE CATEGORY(
	cat_Id NUMBER(8) PRIMARY KEY,
	mem_categoryname VARCHAR2(10)
	)


insert into category values(0,'게임');
insert into category values(1,'문화');
insert into category values(2,'영화');
insert into category values(3,'음악');
insert into category values(4,'여행');
insert into category values(5,'취미');
insert into category values(6,'육아');
insert into category values(7,'외국어');
insert into category values(8,'인문');
insert into category values(9,'정치');
insert into category values(10,'금융');
