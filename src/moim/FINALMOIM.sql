--쪽지 테이블--
create TABLE LETTER(
	LET_ID NUMBER(8) PRIMARY KEY,
	LET_TITLE VARCHAR2(100),
	let_content VARCHAR2(2000),
	let_check CHAR(1),
	let_date VARCHAR2(8),
	let_toMem NUMBER(8),
	let_fromMemName VARCHAR2(100),
	MEE_ID NUMBER(8)
);

--모임 테이블--
CREATE TABLE MEETING
(
	MEE_ID            NUMBER(8) PRIMARY KEY,
	MEE_NAME          VARCHAR2(100) ,
	MEE_KEYWORD       VARCHAR2(100),
	MEE_EXPLAIN       VARCHAR2(300),
	MEE_OPEN		  NUMBER(8),
	MEE_STARTDATE     DATE ,
	MEE_CURRENTPEOPLE NUMBER(8),
	MEE_MAXPEOPLE     NUMBER(8),
	MEE_JOINPOSSIBLE  NUMBER(8),
	MEE_PHOTO         VARCHAR2(50),
	MEE_CATEGORYID    NUMBER(8),
	MEE_ADMINID NUMBER(8)
)
;

--회원 테이블
CREATE TABLE MEMBER
(
	MEM_ID          NUMBER(8) PRIMARY KEY,
	MEM_EMAIL       VARCHAR2(100) UNIQUE,
	MEM_NAME        VARCHAR2(10) ,
	MEM_PHONE       VARCHAR2(11) ,
	MEM_PASSWORD    VARCHAR2(100) ,
	MEM_PHOTO       VARCHAR2(50),
	MEM_CATEGORYID  NUMBER(8)
)
;

--맴버미팅 테이블--
CREATE TABLE MEMBERMEETING
(
	MEM_ID  NUMBER(8) ,
	MEE_ID  NUMBER(8) ,
	MEMMEE_ADMIN   NUMBER(8)
)
;

--공간 테이블--
CREATE TABLE PLACE
(
	PLA_ID           NUMBER(8) PRIMARY KEY,
	PLA_NAME         VARCHAR2(100) ,
	PLA_PHONE        VARCHAR2(15) ,
	PLA_PRICE		 NUMBER(8) ,
	PLA_ADDR	     VARCHAR2(200),
	PLA_PHOTO        VARCHAR2(50),
	PLA_MAX		     NUMBER(8) ,
	PLA_EXPLAIN  	 VARCHAR2(2000)
)
;

--공간이용중 여부--
CREATE TABLE PLACEUSED
(
	USED_ID    NUMBER(8) primary key,
	PLA_ID   NUMBER(8) ,
	USED_DATE  VARCHAR2(8) ,
	USED_TIME  VARCHAR2(1) ,
	MEE_ID	   NUMBER(8)
)
;


--카테고리--
CREATE TABLE CATEGORY(
	CAT_ID NUMBER(8) PRIMARY KEY,
	CAT_NAME VARCHAR2(100)
);

INSERT INTO CATEGORY VALUES(0,'컴퓨터');
INSERT INTO CATEGORY VALUES(1,'학문');
INSERT INTO CATEGORY VALUES(2,'취미');
INSERT INTO CATEGORY VALUES(3,'문화');
INSERT INTO CATEGORY VALUES(4,'생활');
INSERT INTO CATEGORY VALUES(5,'엔터테인먼트');

--미팅아이디 테이블--
CREATE TABLE MEEID(
	MEE_ID NUMBER(8) PRIMARY KEY
);

INSERT INTO MEEID VALUES(0);