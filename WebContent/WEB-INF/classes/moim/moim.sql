create TABLE LETTER(
	LET_ID NUMBER(8) PRIMARY KEY,
	LET_TITLE VARCHAR2(30),
	let_content VARCHAR2(300),
	let_check CHAR(1),
	let_date VARCHAR2(8),
	let_toMem NUMBER(8),
	let_fromMemName VARCHAR2(30)
);
select * from member

SELECT *
FROM MEMBER, CATEGORY
where MEMBER.MEM_CATEGORYID = CATEGORY.CAT_ID
INSERT INTO
		LETTER
		(	let_id,
			let_title,
			let_content,
			let_check,
			let_date,
			let_toMem,
			let_fromMemName
		)
			VALUES
		(	0,
			'test',
			'test',
			'N',
			TO_CHAR(SYSDATE,'YYYYMMDD'),
			3,
			'test'
		)

delete from LETTER where let_id = 2

delete from LETTER where let_id = 0
delete from LETTER where let_id = 1
delete from LETTER where let_id = 3
delete from LETTER where let_id = 4

drop table letter

SELECT * FROM LETTER;


	SELECT *
	from member, CATEGORY
	where member.mem_id = category.cat_id

	SELECT *
	FROM ( SELECT ROWNUM AS MYROWNUM, ARTICLES.*
		FROM (SELECT * FROM LETTER WHERE let_toMem = 4 ORDER BY let_id) ARTICLES )
	WHERE MYROWNUM BETWEEN 1 AND 2

	SELECT *
		FROM LETTER
		WHERE let_toMem = 4 AND let_check='N'



select * from letter where let_id = 2

update letter set let_check = 'Y' where let_id = 1
insert into letter values(0,'안녕하세요~!','저희모임으로 초대할게요~~!!^^','N',TO_CHAR(SYSDATE,'yyyymmdd'),4,'장진형');
insert into letter values(1,'111111!','저희모임으로 초대할게요~~!!^^','N',TO_CHAR(SYSDATE,'yyyymmdd'),4,'김근');
insert into letter values(2,'222222~!','저희모임으로 초대할게요~~!!^^','N',TO_CHAR(SYSDATE,'yyyymmdd'),4,'이윤지');
insert into letter values(3,'33333333!','저희모임으로 초대할게요~~!!^^','N',TO_CHAR(SYSDATE,'yyyymmdd'),4,'test');


insert into letter values(5,'33333333!','저희모임으로 초대할게요~~!!^^','N',TO_CHAR(SYSDATE,'yyyymmdd'),4,'test');

CREATE TABLE CATEGORY(
	cat_Id NUMBER(8) PRIMARY KEY NOT NULL,
	mem_categoryname VARCHAR2(10) not null
	)

select * from category

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

   SELECT *   FROM MEMBER, CATEGORY   where         MEM_EMAIL ='test1@naver.com'

CREATE TABLE PLACE(
	pla_Id NUMBER(8) PRIMARY KEY,
	pla_Name VARCHAR2(30),
	pla_Phone VARCHAR2(15),
	pla_Price NUMBER(8),
	pla_Addr VARCHAR2(200),
	pla_Photo VARCHAR2(50),
	pla_Max NUMBER(8),
	pla_Explain VARCHAR2(50),
	pla_Date VARCHAR2(10),
	pla_Timeused CHAR(1)
)



select * from place

create TABLE MEMBER(
	MEM_ID NUMBER(8) PRIMARY KEY,
	MEM_EMAIL VARCHAR2(30) unique,
	MEM_NAME VARCHAR2(10),
	MEM_PHONE VARCHAR2(11),
	MEM_PASSWORD VARCHAR2(100),
	MEM_PHOTO VARCHAR2(50),
	MEM_CATEGORYID NUMBER(8)
);


select * from member where mem_email='test@naver.com'

SELECT *
		FROM MEMBER
		WHERE MEM_EMAIL='TEST@NAVER.COM'

SELECT * FROM MEMBER WHERE MEM_EMAIL = 'aa@gmail.com';
select * from member


DELETE  FROM member WHERE MEM_ID = 2


insert into MEMBER values(11,'testtest@test.com','이윤지','01012341234','test','AA.JPG',5);
insert into MEMBER values(1,'TEST@NAVER.COM','NAME','01012341234','test','AA.JPG',2);
insert into MEMBER values(2,'TEST@NAVER.COM','NAME','01012341234','123123','b.JPG',1);

insert into letter values(1,'테스트안내장','테스트안내장입니다testtest!!','N',SYSDATE,2,3);
insert into letter values(2,'sesese','테스트안내장입니다111!!','N',SYSDATE,2,4);

insert into letter values(3,'select','테스트안내장입니다2222!!','N',SYSDATE,2,6);


--
SELECT * FROM PLACE
SELECT * FROM PLACEUSED

insert into placeused values(2,0,'20121019','C')
CREATE TABLE PLACE(
	pla_Id NUMBER(8) PRIMARY KEY,
	pla_Name VARCHAR2(30),
	pla_Phone VARCHAR2(15),
	pla_Price NUMBER(8),
	pla_Addr VARCHAR2(200),
	pla_Photo VARCHAR2(50),
	pla_Max NUMBER(8),
	pla_Explain VARCHAR2(50),
	pla_Date VARCHAR2(10),
	pla_Timeused CHAR(1)
)
SELECT COUNT(*)
FROM PLACEUSED
WHERE PLA_ID = 0

SELECT pla_Name,pla_Phone,pla_Price,pla_AddrESS,pla_Photo,PLA_MAXPEOPLE
FROM PLACE, PLACEUSED
WHERE PLA_MAXPEOPLE <= 5
	AND (SELECT COUNT(*) FROM PLACEUSED WHERE PLA_ID = 0) <= 9
	AND  PLACE.PLA_ID = PLACEUSED.PLA_ID

SELECT * FROM B_0

	SELECT *
		FROM ( SELECT ROWNUM AS MYROWNUM, ARTICLES.*
			FROM (SELECT B.*, M.MEM_NAME
				FROM b_0 B,	MEMBER M
				WHERE B.MEM_ID = M.MEM_ID
					and B.BOA_SUBJECT LIKE '%'||'검색'||'%'
					or	B.BOA_CONTENT LIKE '%'||'검색'||'%'
				ORDER BY B.BOA_NUM DESC
				) ARTICLES )
		WHERE MYROWNUM BETWEEN 1 AND 5