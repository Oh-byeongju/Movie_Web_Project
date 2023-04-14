DROP TABLE IF EXISTS `movie_infoseat`;
DROP TABLE IF EXISTS `movie_seat`;
DROP TABLE IF EXISTS `movie_reservation`;
DROP TABLE IF EXISTS `movie_information`;
DROP TABLE IF EXISTS `movie_cinema`;
DROP TABLE IF EXISTS `comment_info`;
DROP TABLE IF EXISTS `movie_member`;
DROP TABLE IF EXISTS `movie_actor`;
DROP TABLE IF EXISTS `actor`;
DROP TABLE IF EXISTS `movie_theater`;
DROP TABLE IF EXISTS `board_like`;
DROP TABLE IF EXISTS `board_comment`;
DROP TABLE IF EXISTS `board`;
DROP TABLE IF EXISTS `member`;
DROP TABLE IF EXISTS `movie`;

DROP PROCEDURE IF EXISTS clone_member;
DROP PROCEDURE IF EXISTS seat_add;
DROP PROCEDURE IF EXISTS movieinfo_insert;
DROP PROCEDURE IF EXISTS reservation_insert;
DROP PROCEDURE IF EXISTS clone_member_like;
DROP PROCEDURE IF EXISTS comment_like_insert;
DROP PROCEDURE IF EXISTS loopInsert;

CREATE TABLE `member` (
	`uid`	varchar(20)	NOT NULL,
	`upw`	varchar(255) NOT NULL,
	`uname`	varchar(15)	NOT NULL,
	`uemail` varchar(50) UNIQUE,
	`utel`	varchar(15)	NOT NULL,
	`uaddr`	varchar(50)	NOT NULL,
	`uaddrsecond` VARCHAR(50) NOT NULL,
	`ubirth`	date	NOT NULL,
	`ujoindate` DATE NOT NULL,
	`uauthority` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`uid`)
);

CREATE TABLE `movie` (
	`mid`	int AUTO_INCREMENT NOT NULL,
	`mtitle`	varchar(30)	NULL,
	`mdir`	VARCHAR(20)	NULL,
	`mgenre`	varchar(15)	NULL,
	`mtime`	int	NULL,
	`mdate`	date	NULL,
	`mrating`	varchar(15)	NULL,
	`mstory`	VARCHAR(2000)	NULL,
	`mimagepath` VARCHAR(50) NULL,
	PRIMARY KEY (`mid`)
);

CREATE TABLE `movie_theater` (
	`tid`	INT AUTO_INCREMENT NOT NULL,
	`tname`	varchar(30)	NULL,
	`tarea`	varchar(30)	NULL,
	`taddr`	varchar(50)	NULL,
	PRIMARY KEY (`tid`)
);

CREATE TABLE `actor` (
	`aid` INT AUTO_INCREMENT NOT NULL,
	`aname` VARCHAR(20) NULL,
	`abirthplace` VARCHAR(20) NULL,
	PRIMARY KEY (`aid`)
);

CREATE TABLE `movie_actor` (
	`maid` INT  AUTO_INCREMENT NOT NULL,
	`marole` VARCHAR(10) NULL,
	`aid` INT NOT NULL,
	`mid` INT NOT NULL,
	PRIMARY KEY (`maid`),
	FOREIGN KEY (`aid`) REFERENCES `actor` (`aid`),
	FOREIGN KEY (`mid`) REFERENCES `movie` (`mid`)
);

CREATE TABLE `movie_member` (
	`umid`	INT	NOT NULL AUTO_INCREMENT,
	`umlike`	BOOLEAN 	NULL,
	`umliketime` DATETIME NULL,
	`umscore`	INT 	NULL,
	`umcomment`	VARCHAR(200) NULL,
	`umcommenttime` DATETIME NULL,
	`mid` INT NOT NULL,
	`uid` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`umid`),
	FOREIGN KEY (`mid`) REFERENCES `movie` (`mid`),
	FOREIGN KEY (`uid`) REFERENCES `member` (`uid`)
);

CREATE TABLE `comment_info` (
	`cuid` INT NOT NULL AUTO_INCREMENT,
	`uid`	varchar(20)	NOT NULL,
	`umid`	INT	NOT NULL,
	FOREIGN KEY (`uid`) REFERENCES `member` (`uid`),
	FOREIGN KEY (`umid`) REFERENCES `movie_member` (`umid`),
	PRIMARY KEY (`cuid`)
);

CREATE TABLE `movie_cinema` (
	`cid`	INT AUTO_INCREMENT NOT NULL,
	`cname`	varchar(20)	NULL,
	`ctype`	varchar(10)	NULL,
	`cseat`	INT	NULL,
	`tid`	INT	NOT NULL,
	PRIMARY KEY (`cid`),
	FOREIGN KEY (`tid`) REFERENCES `movie_theater` (`tid`)
);

CREATE TABLE `movie_information` (
	`miid`	INT NOT NULL AUTO_INCREMENT,
	`miday`	DATE NULL,
	`mistarttime`	datetime	NULL,
	`miendtime`	datetime NULL,
	`mid`	INT	NOT NULL,
	`cid` INT NOT NULL,
	PRIMARY KEY (`miid`),
	FOREIGN KEY (`mid`) REFERENCES `movie` (`mid`),
	FOREIGN KEY (`cid`) REFERENCES `movie_cinema` (`cid`)

);

CREATE TABLE `movie_reservation` (
	`rid`	INT AUTO_INCREMENT NOT NULL,
	`rdate`	datetime	NULL,
	`rprice`	int	NULL,
	`rpeople` VARCHAR(30) NULL,
	`rticket` INT NULL,
	`rpayid` VARCHAR(255) NULL,
	`rtoken` VARCHAR(255) NULL,
	`rpaytype` VARCHAR(20) NULL,
	`rstate` BOOLEAN NULL,
	`rcanceldate` DATETIME NULL,
	`miid`	int	NOT NULL,
	`uid`	varchar(20)	NOT NULL,
	PRIMARY KEY (`rid`),
	FOREIGN KEY (`miid`) REFERENCES `movie_information` (`miid`),
	FOREIGN KEY (`uid`) REFERENCES `member` (`uid`)
);

CREATE TABLE `movie_seat` (
	`sid`	INT AUTO_INCREMENT NOT NULL,
	`sname`	varchar(20)	NULL,
	`cid`	INT	NOT NULL,
	PRIMARY KEY (`sid`),
	FOREIGN KEY (`cid`) REFERENCES `movie_cinema` (`cid`)
);

CREATE TABLE `movie_infoseat` (
	`misid` INT AUTO_INCREMENT NOT NULL,
	`sid` INT  NOT NULL,
	`miid` INT  NOT NULL,
	`rid` INT NOT NULL,
	 PRIMARY KEY (`misid`),
	 FOREIGN KEY (`sid`) REFERENCES `movie_seat` (`sid`),
    FOREIGN KEY (`miid`) REFERENCES `movie_information` (`miid`),
    FOREIGN KEY (`rid`) REFERENCES `movie_reservation` (`rid`)
);
CREATE TABLE `board` (
	`bid` INT NOT NULL AUTO_INCREMENT,
    `btitle` varchar(30) not null,
	`bdetail` varchar(300)not null,
	`bdate` date not null,
    `bclickindex` INT,
	`blike` INT ,
    `bunlike` INT ,
    `bcategory` varchar(30) not null,
    `uid`	varchar(20)	NOT NULL,
	FOREIGN KEY (`uid`) REFERENCES `member` (`uid`),
	PRIMARY KEY (`bid`)
);

CREATE TABLE `board_comment` (
	`bcid` INT NOT NULL AUTO_INCREMENT,
    `bccomment` varchar(30) not null,
	`bcdate` varchar(300)not null,
	`parent` int,
    `bid` int not null,
    `uid`varchar(20)	NOT NULL,
	FOREIGN KEY (`uid`) REFERENCES `member` (`uid`),
	FOREIGN KEY (`bid`) REFERENCES `board` (`bid`),
	PRIMARY KEY (`bcid`)
);

create table `board_like` (
	`blid` INT NOT NULL AUTO_INCREMENT,
    `blike` INT,
    `bunlike` INT,
    `bid` INT,
    `bcid` int,
    `uid` varchar(20) not null,
	FOREIGN KEY (`uid`) REFERENCES `member` (`uid`),
    FOREIGN KEY (`bcid`) REFERENCES `board_comment`(`bcid`),
	FOREIGN KEY (`bid`) REFERENCES `board` (`bid`),
    primary key (`blid`)
);

INSERT INTO `movie` (`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES ('타이타닉', '제임스 카메론', '로맨스', "180", DATE_SUB(NOW(), INTERVAL 15 DAY), '15', '<h2><span style="color: rgb(51, 51, 51);">"내 인생의 가장 큰 행운은 당신을 만난 거야"</span></h2><p><br></p><p><span style="color: rgb(51, 51, 51);">우연한 기회로 티켓을 구해 타이타닉호에 올라탄 자유로운 영혼을 가진 화가 ‘잭’(레오나르도 디카프리오)은</span></p><p><span style="color: rgb(51, 51, 51);">막강한 재력의 약혼자와 함께 1등실에 승선한 ‘로즈’(케이트 윈슬렛)에게 한눈에 반한다.</span></p><p><span style="color: rgb(51, 51, 51);">진실한 사랑을 꿈꾸던 ‘로즈’ 또한 생애 처음 황홀한 감정에 휩싸이고, 둘은 운명 같은 사랑에 빠지는데…</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">가장 차가운 곳에서 피어난 뜨거운 사랑!</span></p><p><span style="color: rgb(51, 51, 51);">영원히 가라앉지 않는 세기의 사랑이 펼쳐진다!</span></p>', 'img/ranking/5.jpg');

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('레오나르도 디카프리오', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('케이트 윈슬렛', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('빌리 제인', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('캐시 베이츠', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('빌 팩스톤', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '1', '1');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '2', '1');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '3', '1');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '4', '1');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '5', '1');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("카운트", "권혁재" , "드라마", "120", DATE_SUB(NOW(), INTERVAL 15 DAY), "12", '<h2><span style="color: rgb(68, 68, 68);">마이웨이, 오직 직진!</span></h2><p><span style="color: rgb(68, 68, 68);">한번 물면 절대 놓지 않는 킹받는 美친 개가 온다!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">1988년 올림픽 금메달리스트지만</span></p><p><span style="color: rgb(68, 68, 68);">1998년 지금은 평범한 고등학교 선생인 ‘시헌’(진선규).</span></p><p><span style="color: rgb(68, 68, 68);">선수 생활 은퇴 후 남은 건 고집뿐,</span></p><p><span style="color: rgb(68, 68, 68);">모두를 킹받게 하는 마이웨이 행보로 주변 사람들의 속을 썩인다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">그러던 어느 날, 우연히 참석한 대회에서 뛰어난 실력에도 불구하고</span></p><p><span style="color: rgb(68, 68, 68);">승부 조작으로 기권패를 당한 ‘윤우’(성유빈)를 알게 된 ‘시헌’은</span></p><p><span style="color: rgb(68, 68, 68);">복싱부를 만들기로 결심한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">아내 ‘일선’(오나라)의 열렬한 반대와, ‘교장’(고창석)의 끈질긴 만류도 무시한 채,</span></p><p><span style="color: rgb(68, 68, 68);">‘시헌’은 독기만 남은 유망주 ‘윤우’와</span></p><p><span style="color: rgb(68, 68, 68);">영문도 모른 채 레이더망에 걸린 ‘환주’(장동주), ‘복안’(김민호)을 데리고</span></p><p><span style="color: rgb(68, 68, 68);">본격적인 훈련에 돌입하기 시작하는데...!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">쓰리, 투, 원! 2023년 새해, 긍정 파워 풀충전!</span></p><p><span style="color: rgb(68, 68, 68);">그들만의 가장 유쾌한 카운트가 시작된다</span></p>', "img/ranking/6.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('진선규', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('성유빈', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('오나라', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('고창석', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('장동주', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '6', '2');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '7', '2');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '8', '2');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '9', '2');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '10', '2');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("상견니", "황천인" , "드라마", "100", DATE_SUB(NOW(), INTERVAL 14 DAY), "15", '<h2><span style="color: rgb(68, 68, 68);">드라마의 스토리를 영화 버전으로 확장시킨</span></h2><p><span style="color: rgb(68, 68, 68);">멀티버스 판타지 로맨스</span></p><p><span style="color: rgb(68, 68, 68);">완전히 새로운 세계관, 완전히 새로운 스토리의 &lt;상견니&gt;</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">2009년,</span></p><p><span style="color: rgb(68, 68, 68);">리쯔웨이와 황위쉬안은 밀크티 가게에서 우연히 재회한다.</span></p><p><span style="color: rgb(68, 68, 68);">처음 만났지만 마치 오래전부터 알고 있었던 것 같은 기시감과</span></p><p><span style="color: rgb(68, 68, 68);">묘한 설렘을 느끼는 두 사람.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">이들은 사계절을 함께 보내며 가까워지고,</span></p><p><span style="color: rgb(68, 68, 68);">2010년의 마지막 날, 함께 새해를 맞이하며 연인이 된다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">2017년,</span></p><p><span style="color: rgb(68, 68, 68);">황위쉬안의 인생에 예상치 못한 변화가 생긴다. 해외 발령을 받게 된 것.</span></p><p><span style="color: rgb(68, 68, 68);">황위쉬안은 이 제안을 받아들이고 새로운 여정을 시작하지만</span></p><p><span style="color: rgb(68, 68, 68);">이 선택은 그녀의 미래를 바꿀 뿐만 아니라,</span></p><p><span style="color: rgb(68, 68, 68);">리쯔웨이와 모쥔제, 그리고 그녀가 아직 모르는 천윈루의 운명까지 뒤바꿔 놓는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">이제, 이들은 수없이 뒤엉킨 타임라인 속에서 서로를 구하기 위해</span></p><p><span style="color: rgb(68, 68, 68);">낡은 테이프 속 들려오는 노래 ‘라스트 댄스’를 따라 달려가기 시작한다.</span></p>',"img/ranking/8.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('가가연', '대만');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('허광한', '대만');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('시백우', '대만');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '11', '3');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '12', '3');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '13', '3');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("젠틀맨", "김경원" , "범죄", "120", DATE_SUB(NOW(), INTERVAL 13 DAY), "15", '<h2><span style="color: rgb(51, 51, 51);">“지금 제가 검사인 상황…인 거죠?”</span></h2><p><br></p><p><span style="color: rgb(51, 51, 51);">의뢰받은 사건은 100% 처리하는 흥신소 사장 ‘지현수’.</span></p><p><span style="color: rgb(51, 51, 51);">의뢰인과 함께 강아지를 찾기 위해 간 어느 펜션에서 괴한의 습격을 받고 쓰러진다.</span></p><p><span style="color: rgb(51, 51, 51);">끊어진 기억, 사라진 의뢰인. 정신을 차려보니 졸지에 납치 사건 용의자로 몰려버렸다.</span></p><p><span style="color: rgb(51, 51, 51);">꼼짝없이 체포되던 중 차 전복사고 후 검사로 오해받은 ‘지현수’는</span></p><p><span style="color: rgb(51, 51, 51);">실종된 의뢰인을 찾기 위해 검사로 위장해 수사를 시작한다.&nbsp;</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">“수사 방식이 남다르시네요? 검사답지 않게”</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">검사들의 검사, 일명 감찰부 미친 X ‘김화진’.</span></p><p><span style="color: rgb(51, 51, 51);">하늘 높은 줄 모르던 그가 좌천의 쓴맛을 보며 지내던 어느 날,</span></p><p><span style="color: rgb(51, 51, 51);">한 납치 사건을 조사하던 중 검사 행세를 하는 ‘지현수’와 만나게 된다.</span></p><p><span style="color: rgb(51, 51, 51);">단순한 납치로 여겼던 사건이 자신을 물 먹인 로펌 재벌 ‘권도훈’과 관련되어 있음을 알게 된다.</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">“나쁜 놈 잡는데 불법, 합법이 어딨습니까? 잡으면 장땡이지”</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">누명을 벗고자 하는 ‘지현수’와 ‘권도훈’을 잡고 싶은 ‘김화진’,</span></p><p><span style="color: rgb(51, 51, 51);">각자의 목표를 위해 손을 잡게 된 두 사람은</span></p><p><span style="color: rgb(51, 51, 51);">거대 로펌 재벌의 추악한 범죄를 파헤치다 전혀 뜻밖의 상황을 맞이하게 되는데...</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">작전은 완벽하게, 수사는 젠틀하게!</span></p><p><span style="color: rgb(51, 51, 51);">고품격 범죄 오락이 펼쳐진다!</span></p>', "img/ranking/4.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('주지훈', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('박성웅', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('최성은', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '14', '4');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '15', '4');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '16', '4');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("아바타: 물의 길", "제임스 카메론", "SF", "180", DATE_SUB(NOW(), INTERVAL 13 DAY), "12", '<h2><span style="color: rgb(51, 51, 51);">&lt;아바타: 물의 길&gt;은 판도라 행성에서&nbsp;</span></h2><p><span style="color: rgb(51, 51, 51);">"제이크 설리"와 "네이티리"가 이룬 가족이 겪게 되는 무자비한 위협과&nbsp;</span></p><p><span style="color: rgb(51, 51, 51);">살아남기 위해 떠나야 하는 긴 여정과 전투,&nbsp;</span></p><p><span style="color: rgb(51, 51, 51);">그리고 견뎌내야 할 상처에 대한 이야기를 그렸다.&nbsp;</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">월드와이드 역대 흥행 순위 1위를 기록한 전편 &lt;아바타&gt;에 이어</span></p><p><span style="color: rgb(51, 51, 51);">제임스 카메론 감독이 13년만에 선보이는 영화로,&nbsp;</span></p><p><span style="color: rgb(51, 51, 51);">샘 워싱턴, 조 샐다나, 시고니 위버, 스티븐 랭, 케이트 윈슬렛이 출연하고</span></p><p><span style="color: rgb(51, 51, 51);">존 랜도가 프로듀싱을 맡았다.</span></p>', "img/ranking/1.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('조 샐다나', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('샘 워싱턴', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('시고니 위버', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('우나 채플린', '스페인');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('지오바니 리비시', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '17', '5');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '18', '5');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '19', '5');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '20', '5');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '21', '5');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("어메이징 모리스", "토비 젠켈", "애니메이션", "90", DATE_SUB(NOW(), INTERVAL 12 DAY), "0", '<h2><span style="color: rgb(68, 68, 68);">사기력 만렙 말하는 고양이 ‘모리스’와 친구들의 어메이징한 모험이 펼쳐진다!</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">신기한 능력으로 성공적인 사기 행각을 이어가던 모리스와 친구들!</span></p><p><span style="color: rgb(68, 68, 68);">4차원 소녀 ‘멜리시아’에게 정체가 탄로나 어쩔 수 없이 그녀를 도와 마을에 숨겨진 비밀을 찾아 나선 그들은</span></p><p><span style="color: rgb(68, 68, 68);">세상을 지배하려는 절대악 ‘쥐마왕’의 음모를 알아채지만 뜻하지 않은 위험에 처한다.</span></p><p><span style="color: rgb(68, 68, 68);">가까스로 잡혀있던 ‘복숭아’를 구해낸 모리스와 친구들은 마을에서 탈출을 시도하고,</span></p><p><span style="color: rgb(68, 68, 68);">멜리시아는 허당 피리꾼 ‘키이스’와 함께 쥐마왕에게 맞서기 위해 진짜 마술피리를 찾아나서는데..</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">쥐마왕의 정체는 과연 무엇?</span></p><p><span style="color: rgb(68, 68, 68);">그리고 모리스와 친구들은 무사히 마을에서 벗어날 수 있을 것인가?!</span></p>',"img/ranking/13.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('휴 로리', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('에밀리아 클라크', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('데이빗 듈리스', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('히메쉬 파텔', '영국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '22', '6');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '23', '6');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '24', '6');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '25', '6');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("영웅", "윤제균", "시대극", "120", DATE_SUB(NOW(), INTERVAL 11 DAY), "12", '<h2><span style="color: rgb(68, 68, 68);">어머니 ‘조마리아’(나문희)와 가족들을 남겨둔 채</span></h2><p><span style="color: rgb(68, 68, 68);">고향을 떠나온 대한제국 의병대장 ‘안중근’(정성화).</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">동지들과 함께 네 번째 손가락을 자르는 단지동맹으로</span></p><p><span style="color: rgb(68, 68, 68);">조국 독립의 결의를 다진 안중근은</span></p><p><span style="color: rgb(68, 68, 68);">조선 침략의 원흉인 ‘이토 히로부미’를</span></p><p><span style="color: rgb(68, 68, 68);">3년 내에 처단하지 못하면 자결하기로 피로 맹세한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">그 약속을 지키기 위해 블라디보스토크를 찾은 안중근.</span></p><p><span style="color: rgb(68, 68, 68);">오랜 동지 ‘우덕순’(조재윤), 명사수 ‘조도선’(배정남), 독립군 막내 ‘유동하’(이현우),</span></p><p><span style="color: rgb(68, 68, 68);">독립군을 보살피는 동지 ‘마진주’(박진주)와 함께 거사를 준비한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">한편 자신의 정체를 감춘 채 이토 히로부미에게 접근해</span></p><p><span style="color: rgb(68, 68, 68);">적진 한복판에서 목숨을 걸고 정보를 수집하던 독립군의 정보원 ‘설희’(김고은)는</span></p><p><span style="color: rgb(68, 68, 68);">이토 히로부미가 곧 러시아와의 회담을 위해</span></p><p><span style="color: rgb(68, 68, 68);">하얼빈을 찾는다는 일급 기밀을 다급히 전한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">드디어 1909년 10월 26일,</span></p><p><span style="color: rgb(68, 68, 68);">이날만을 기다리던 안중근은</span></p><p><span style="color: rgb(68, 68, 68);">하얼빈역에 도착한 이토 히로부미를 향해</span></p><p><span style="color: rgb(68, 68, 68);">주저 없이 방아쇠를 당긴다.</span></p><p><span style="color: rgb(68, 68, 68);">현장에서 체포된 그는 전쟁 포로가 아닌 살인의 죄목으로,</span></p><p><span style="color: rgb(68, 68, 68);">조선이 아닌 일본 법정에 서게 되는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">누가 죄인인가, 누가 영웅인가!</span></p>', "img/ranking/3.jpg" );

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('정성화', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('김고은', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('나문희', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('조재윤', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('배정남', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '26', '7');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '27', '7');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '28', '7');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '29', '7');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '30', '7');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("오늘 밤, 세계에서 이 사랑이 사라진다 해도", "미키 타카히로 " , "로맨스", "120", DATE_SUB(NOW(), INTERVAL 10 DAY), "12", '<h2><span style="color: rgb(68, 68, 68);">“카미야 토루에 대해 잊지 말 것”</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">자고 일어나면 전날의 기억을 잃는</span></p><p><span style="color: rgb(68, 68, 68);">‘선행성 기억상실증’에 걸린 소녀 ‘마오리’</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">“내일의 마오리도 내가 즐겁게 해줄 거야”</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">누구에게도 기억되지 않는</span></p><p><span style="color: rgb(68, 68, 68);">무색무취의 평범한 소년 ‘토루’</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">매일 밤 사랑이 사라지는 세계,</span></p><p><span style="color: rgb(68, 68, 68);">그럼에도 불구하고,</span></p><p><span style="color: rgb(68, 68, 68);">다음 날 서로를 향한 애틋한 고백을 반복하는</span></p><p><span style="color: rgb(68, 68, 68);">두 소년, 소녀의 가장 슬픈 청춘담</span></p>',"img/ranking/7.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('후쿠모토 리코', '일본');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('미치에다 슌스케', '일본');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('후루카와 코토네', '일본');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('마츠모토 호노카', '일본');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '31', '8');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '32', '8');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '33', '8');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '34', '8');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("교섭", "임순례" , "드라마", "100", DATE_SUB(NOW(), INTERVAL 9 DAY), "12", '<h2><span style="color: rgb(68, 68, 68);">“어떤 경우라도 희생자를 안 만드는 게 이 협상의 기조 아닙니까?”</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">분쟁지역 아프가니스탄에서 한국인들이 탈레반에게 납치되는 최악의 피랍사건이 발생한다.</span></p><p><span style="color: rgb(68, 68, 68);">교섭 전문이지만 아프가니스탄은 처음인 외교관 재호(황정민)가 현지로 향하고,</span></p><p><span style="color: rgb(68, 68, 68);">국정원 요원 대식(현빈)을 만난다.</span></p><p><span style="color: rgb(68, 68, 68);">원칙이 뚜렷한 외교관과 현지 사정에 능통한 국정원 요원.</span></p><p><span style="color: rgb(68, 68, 68);">입장도 방법도 다르지만, 두 사람은 인질을 살려야 한다는 목표를 향해 함께 나아간다.</span></p><p><span style="color: rgb(68, 68, 68);">살해 시한은 다가오고, 협상 상대, 조건 등이 시시각각 변하는 상황에서</span></p><p><span style="color: rgb(68, 68, 68);">교섭의 성공 가능성은 점점 희박해져 가는데...</span></p>',"img/ranking/14.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('황정민', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('현빈', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('강기영', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '35', '9');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '36', '9');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '37', '9');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("두다다쿵: 후후섬의 비밀", "김지윤" , "애니메이션", "80", DATE_SUB(NOW(), INTERVAL 9 DAY), "0", '<h2><span style="color: rgb(68, 68, 68);">“두다, 후후섬에 가면 엄마를 찾을 수 있을 거야!"</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">두다를 위해 친구들이 뭉쳤다!</span></p><p><span style="color: rgb(68, 68, 68);">후후섬에 가기 위해서는 신비의 꽃, 빛나는 크리스털을 찾아야 해!</span></p><p><span style="color: rgb(68, 68, 68);">우리 핑카 타고 모험을 떠나볼까?</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">“우와! 전설의 눈토끼 마을에 도착했어!”</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">뭐? 보름달이 뜰 때마다 용이 내려와 아기 토끼들을 데려간다고?</span></p><p><span style="color: rgb(68, 68, 68);">용으로부터 아기 토끼들을 구하고</span></p><p><span style="color: rgb(68, 68, 68);">후후섬에 가기 위한 보물들을 얻어야 해!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">다들 함께 할 준비됐지?</span></p><p><span style="color: rgb(68, 68, 68);">다 함께 두다다다 출발 =3=3</span></p>',"img/ranking/9.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이영아', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('장경희', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('엄상현', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이소영', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이은정', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '38', '10');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '39', '10');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '40', '10');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '41', '10');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('성우', '42', '10');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("서치 2", "니콜라스 D 존슨" , "미스터리", "100", DATE_SUB(NOW(), INTERVAL 7 DAY), "12", '<h2><span style="color: rgb(68, 68, 68);">여행을 끝내고 월요일 귀국을 알린 엄마의 영상통화</span></h2><p><span style="color: rgb(68, 68, 68);">그리고 마중 나간 딸</span></p><p><span style="color: rgb(68, 68, 68);">그러나 엄마가 사라졌다</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">경찰에 도움을 요청하지만, 결정적인 단서들이 나오지 않는 가운데</span></p><p><span style="color: rgb(68, 68, 68);">딸 ‘준’은 엄마의 흔적을 찾기 위해</span></p><p><span style="color: rgb(68, 68, 68);">엄마가 방문한 호텔의 CCTV, 같이 간 지인의 SNS,</span></p><p><span style="color: rgb(68, 68, 68);">거리뷰 지도까지 온라인에 남아있는 모든 흔적을 검색하는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">이번에는 딸이 사라진 엄마의 흔적을 검색하다!</span></p>',"img/ranking/10.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('스톰 리드', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('켄 렁', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('다니엘 헤니', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('니아 롱', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '43', '11');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '44', '11');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '45', '11');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '46', '11');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("앤트맨과 와스프: 퀀텀매니아", "페이튼 리드" , "액션", "120", DATE_SUB(NOW(), INTERVAL 7 DAY), "12", '<h2><span style="color: rgb(68, 68, 68);">슈퍼히어로 파트너인 "스캇 랭"(폴 러드)과 "호프 반 다인"(에반젤린 릴리),</span></h2><p><span style="color: rgb(68, 68, 68);">호프의 부모 "재닛 반 다인"(미셸 파이퍼)과 "행크 핌"(마이클 더글라스),</span></p><p><span style="color: rgb(68, 68, 68);">그리고 스캇의 딸 "캐시 랭"(캐서린 뉴튼)까지</span></p><p><span style="color: rgb(68, 68, 68);">미지의 "양자 영역" 세계 속에 빠져버린 "앤트맨 패밀리".</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">그 곳에서 새로운 존재들과 무한한 우주를 다스리는 정복자 "캉"을 만나며,</span></p><p><span style="color: rgb(68, 68, 68);">그 누구도 예상 못 한 모든 것의 한계를 뛰어넘는 모험을 시작하게 되는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">2023년 첫 번째 마블 블록버스터</span></p><p><span style="color: rgb(68, 68, 68);">2월, 무한한 우주의 정복자가 깨어난다!</span></p>',"img/ranking/11.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('폴 러드', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('에반젤린 릴리', '캐나다');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('미셸 파이퍼', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('마이클 더글라스', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('조나단 메이저스', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '47', '12');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '48', '12');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '49', '12');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '50', '12');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '51', '12');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("원 웨이", "앤드류 베어드" , "액션", "90", DATE_SUB(NOW(), INTERVAL 5 DAY), "15", '<h2><span style="color: rgb(68, 68, 68);">죽여라! 도망쳐라! 살고 싶다면!</span></h2><p><span style="color: rgb(68, 68, 68);">돌아갈 수 없는 편도행 버스 안에서 벌어지는 숨막히는 긴장감!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">마약 조직의 보스 "빅"의 돈과 마약을 훔쳐 달아난 "프레디"는 야간 버스에 탑승해 도망친다.</span></p><p><span style="color: rgb(68, 68, 68);">"빅"의 눈을 피해 도망갈 곳을 찾는 "프레디"는 친구인 "제이제이"와 아버지에게 전화를 걸며 도망칠 방법을 찾는다.</span></p><p><span style="color: rgb(68, 68, 68);">한편, 버스 안에는 집을 가출한 "레이첼"이 함께 탑승해 "프레디"에게 관심을 가지는데...</span></p><p><span style="color: rgb(68, 68, 68);">버스에서 내릴 수 없다면 목숨을 걸고 도망가야 한다.</span></p><p><span style="color: rgb(68, 68, 68);">과연, "프레디"는 무사히 버스에서 내려 가족을 만날 수 있을까?</span></p>',"img/ranking/12.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('머신 건 켈리', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('케빈 베이컨', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('트래비스 핌멜', '오스트레일리아');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '52', '13');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '53', '13');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '54', '13');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '43', '13');
-- 이미 존재해서 갯수가 위와 갯수가 다름

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("다음 소희", "정주리" , "드라마", "120", DATE_SUB(NOW(), INTERVAL 3 DAY), "15", '<h2><span style="color: rgb(68, 68, 68);">“나 이제 사무직 여직원이다?”</span></h2><p><span style="color: rgb(68, 68, 68);">춤을 좋아하는 씩씩한 열여덟 고등학생 소희.</span></p><p><span style="color: rgb(68, 68, 68);">졸업을 앞두고 현장실습을 나가게 되면서 점차 변하기 시작한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">“막을 수 있었잖아. 근데 왜 보고만 있었냐고”</span></p><p><span style="color: rgb(68, 68, 68);">오랜만에 복직한 형사 유진.</span></p><p><span style="color: rgb(68, 68, 68);">사건을 조사하던 중, 새로운 사실을 발견하고 그 자취를 쫓는다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">같은 공간 다른 시간, 언젠가 마주쳤던 두 사람의 이야기.</span></p><p><span style="color: rgb(68, 68, 68);">우리는 모두 그 애를 만난 적이 있다.</span></p>',"img/ranking/18.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('배두나', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('김시은', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '55', '14');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '56', '14');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("유령", "이해영" , "액션", "120", DATE_ADD(NOW(), INTERVAL 3 DAY), "15", '<h2><span style="color: rgb(68, 68, 68);">“유령에게 고함. 작전을 시작한다”</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">1933년, 일제강점기 경성. 항일조직 ‘흑색단’의 스파이인 ‘유령’이 비밀리에 활약하고 있다.</span></p><p><span style="color: rgb(68, 68, 68);">새로 부임한 경호대장 카이토는 ‘흑색단’의 총독 암살 시도를 막기 위해</span></p><p><span style="color: rgb(68, 68, 68);">조선총독부 내의 ‘유령’을 잡으려는 덫을 친다.</span></p><p><span style="color: rgb(68, 68, 68);">영문도 모른 채, ‘유령’으로 의심받고 벼랑 끝 외딴 호텔에 갇힌 용의자들.</span></p><p><span style="color: rgb(68, 68, 68);">총독부 통신과 감독관 쥰지, 암호문 기록 담당 차경, 정무총감 비서 유리코,</span></p><p><span style="color: rgb(68, 68, 68);">암호 해독 담당 천계장, 통신과 직원 백호. 이들에게 주어진 시간은 단 하루 뿐.</span></p><p><span style="color: rgb(68, 68, 68);">기필코 살아나가 동지들을 구하고 총독 암살 작전을 성공시켜야 하는 ‘유령’과</span></p><p><span style="color: rgb(68, 68, 68);">무사히 집으로 돌아가고 싶은 이들 사이, 의심과 경계는 점점 짙어지는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">과연 ‘유령’은 작전에 성공할 수 있을 것인가?</span></p><p><span style="color: rgb(68, 68, 68);">“성공할 때까지 멈춰서는 안 된다”</span></p>',"img/ranking/15.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('설경구', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이하늬', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('박소담', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('박해수', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('서현우', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '57', '15');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '58', '15');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '59', '15');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '60', '15');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('조연', '61', '15');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("장화신은 고양이: 끝내주는 모험", "조엘 크로포드" , "애니메이션", "100", DATE_ADD(NOW(), INTERVAL 4 DAY), "0", '<h2><span style="color: rgb(68, 68, 68);">아홉 개의 목숨 중 단 하나의 목숨만 남은 장화신은 고양이.</span></h2><p><span style="color: rgb(68, 68, 68);">마지막 남은 목숨을 지키기 위해 히어로의 삶 대신 반려묘의 삶을 선택한 그에게 찾아온 마지막 기회, 바로 소원을 들어주는 소원별이 있는 곳을 알려주는 지도!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">잃어버린 목숨을 되찾고 다시 히어로가 되기를 꿈꾸는 장화신은 고양이는</span></p><p><span style="color: rgb(68, 68, 68);">뜻밖의 동료가 된 앙숙 파트너 "키티 말랑손", 그저 친구들과 함께 라면 모든 게 행복한 강아지 "페로"와 함께</span></p><p><span style="color: rgb(68, 68, 68);">소원별을 찾기 위해 길을 떠난다.</span></p><p><span style="color: rgb(68, 68, 68);">그리고 소원별을 노리는 또 다른 빌런들과 마주치게 되는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">새해를 여는 끝내주는 모험이 시작된다!</span></p>',"img/ranking/16.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('안토니오 반데라스', '스페인');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('셀마 헤이엑', '멕시코');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('올리비아 콜맨', '영국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '62', '16');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '63', '16');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '64', '16');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("울프 하운드", "마이클 B. 체이트" , "전쟁", "120", DATE_ADD(NOW(), INTERVAL 6 DAY), "15", '<h2><span style="color: rgb(68, 68, 68);">코드네임 ‘울프 하운드’</span></h2><p><span style="color: rgb(68, 68, 68);">런던 폭격을 막기 위한 비밀 전투 실화</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">연합군의 전투비행단이 독일 전투기에 급습을 당한다.</span></p><p><span style="color: rgb(68, 68, 68);">홀로 적진에 추락한 파일럿은 독일군의 추격을 받고</span></p><p><span style="color: rgb(68, 68, 68);">런던 폭격의 일급 작전인 코드네임 ‘울프 하운드’를 알게 된다.</span></p><p><span style="color: rgb(68, 68, 68);">독일군 기지에 잠입해 포로로 잡힌 동료를 탈출시키고</span></p><p><span style="color: rgb(68, 68, 68);">폭격을 막기 위해 함께 지상전과 공중전을 벌이는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">120분간의 논스톱 전쟁 액션을 만난다!</span></p>',"img/ranking/17.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('제임스 매슬로', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('트레버 도노반', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '65', '17');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '66', '17');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("스톰보이", "숀 시트" , "가족영화", "90", DATE_ADD(NOW(), INTERVAL 7 DAY), "0", '<h2><span style="color: rgb(68, 68, 68);">저의 특별한 ‘새’ 친구들을 소개합니다!</span></h2><p><br></p><p><span style="color: rgb(68, 68, 68);">외딴 해변가에 아빠와 단둘이 살고 있는 ‘마이클’.</span></p><p><span style="color: rgb(68, 68, 68);">무차별적인 사냥으로 어미를 잃은 아기 펠리컨 세 마리를 발견하고,</span></p><p><span style="color: rgb(68, 68, 68);">마을 원주민 ‘핑거본’의 도움으로 아기 펠리컨들의 집사 생활을 시작한다.</span></p><p><span style="color: rgb(68, 68, 68);">그러던 어느 날, 폭우로 바다에 빠진 아빠를 펠리컨 ‘퍼시벌’이 구하게 되고</span></p><p><span style="color: rgb(68, 68, 68);">이 사건이 매스컴에 관심을 받기 시작하자</span></p><p><span style="color: rgb(68, 68, 68);">펠리컨 사냥꾼들이 다시 해변가로 몰려드는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">어느 날 찾아온 가장 특별한 ‘새’상! 끝까지 지켜 줄게!</span></p>',"img/ranking/2.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('핀 리틀', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('제이 코트니', '오스트레일리아');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('제프리 러쉬', '호주');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '67', '18');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '68', '18');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '69', '18');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("대외비", "이원태" , "범죄", "100", DATE_ADD(NOW(), INTERVAL 10 DAY), "15", '<h2>“몰랐나? 원래 세상은 더럽고, 인생은 서럽다.”</h2><p><br></p><p>1992년 부산, 밑바닥 정치 인생을 끝내고 싶은 만년 국회의원 후보 ‘해웅’.</p><p>‘해웅’은 이번 선거에서만큼은 금뱃지를 달 것이라 확신했지만,</p><p>정치판을 뒤흔드는 권력 실세 ‘순태’에게 버림받으며 지역구 공천에서 탈락한다.</p><p><br></p><p>“누가 센 지는 손에 뭘 쥐고 있는가 보라 안 했습니까?”</p><p><br></p><p>‘순태’에 의해 짜여진 선거판을 뒤집기 위해 부산 지역 재개발 계획이 담긴 대외비 문서를 입수한 ‘해웅’.</p><p>행동파 조폭 ‘필도’를 통해 선거 자금까지 마련한 ‘해웅’은 무소속으로 선거판에 뛰어들어 승승장구한다.</p><p>‘순태’ 역시 ‘해웅’이 가진 대외비 문서의 존재를 알게 되고, 점차 ‘해웅’의 숨통을 조여오는데…</p><p><br></p><p>대한민국을 뒤집을 비밀 문서,</p><p>이 판을 뒤집는 놈이 대한민국을 뒤집는다!</p>',"img/ranking/19.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('조진웅', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('이성민', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('김무열', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '70', '19');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '71', '19');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '72', '19');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("멍뭉이", "김주환" , "드라마", "100", DATE_ADD(NOW(), INTERVAL 25 DAY), "0", '<h2>"루니의 새 집사를 찾아라!"</h2><p><br></p><p><span style="color: rgb(51, 51, 51);">동생 같은 반려견 ‘루니’를 위해 정시 퇴근에 진심인 ‘민수’</span></p><p><span style="color: rgb(51, 51, 51);">결혼을 앞둔 그에게 닥친 집사 인생 조기 로그아웃 위기!</span></p><p><br></p><p><span style="color: rgb(51, 51, 51);">야심 차게 오픈한 카페는 말아먹고 인생 자체가 위기인 사촌형 진국,</span></p><p><span style="color: rgb(51, 51, 51);">민수의 다급한 SOS에 고심하다 새 집사 면접을 제안하게 되고.</span></p><p><span style="color: rgb(51, 51, 51);">&nbsp;</span></p><p><span style="color: rgb(51, 51, 51);">완벽한 집사를 찾기 위해 제주도로 향하는 두 형제의 여정에</span></p><p><span style="color: rgb(51, 51, 51);">느닷없는 멍뭉이들의 등장이 이어지는데!</span></p><p><br></p><p>뜻밖의 ‘견’명적인 만남</p><p>함께 하면 개신나고! 개따뜻한!</p><p>개귀엽 버라이어티 무비!</p>',"img/ranking/20.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('유연석', '한국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('차태현', '한국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '73', '20');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '74', '20');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("플레인", "장-프랑소와 리셰" , "스릴러", "100", DATE_ADD(NOW(), INTERVAL 23 DAY), "15", '<h2><span style="color: rgb(68, 68, 68);">모두를 공포에 몰아넣은 하루…</span></h2><p><span style="color: rgb(68, 68, 68);">비행기 불시착은 시작에 불과했다!</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">평소와 다를 것 없던 어느 날,</span></p><p><span style="color: rgb(68, 68, 68);">기장 ‘토렌스’는 비행기 운행 중 거대한 폭풍우를 만나 정체모를 섬에 불시착한다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">살아남았다는 기쁨도 잠시, 비행기를 탈취하려는 무장단체의 인질극이 시작되고</span></p><p><span style="color: rgb(68, 68, 68);">토렌스는 탑승객 중 가장 피해야 할 의문의 살인범 ‘가스파레’와 손을 잡고</span></p><p><span style="color: rgb(68, 68, 68);">승객들과 함께 탈출을 시도하는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">무장단체의 표적은 단 하나, 토렌스와 탑승객들!</span></p><p><span style="color: rgb(68, 68, 68);">목숨을 건 위험한 탈출 작전이 시작된다!</span></p>',"img/ranking/21.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('제라드 버틀러', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('마이크 콜터', '미국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '75', '21');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '76', '21');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("나의 연인에게", "앤 조라 베라치드" , "드라마", "120", DATE_ADD(NOW(), INTERVAL 24 DAY), "15", '<h2><span style="color: rgb(68, 68, 68);">사랑하는 나의 연인에게</span></h2><p><span style="color: rgb(68, 68, 68);">언제나 내 곁에 있어 줘</span></p><p><span style="color: rgb(68, 68, 68);">내 비밀을 지켜 줘</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">독일에서 유학 중인 튀르키예 출신의 의대생 아슬리(카난 키르)와,</span></p><p><span style="color: rgb(68, 68, 68);">파일럿을 꿈꾸는 레바논 출신의 치의대생 사이드(로저 아자르)는 사랑에 빠지게 된다.</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">90년대 중반, 사회적, 정치적으로도 불안정했던 시기,</span></p><p><span style="color: rgb(68, 68, 68);">아슬리는 사랑만을 믿고 사이드와 결혼하게 된다.</span></p><p><span style="color: rgb(68, 68, 68);">하지만 사이드는 홀연히 자취를 감추게 되고, 자신이 떠난 것조차 비밀로 해달라고 하는데…</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">사이드를 변함없이 사랑하고 그를 믿지만, 불길함에 휩싸이게 되는 아슬리.</span></p><p><span style="color: rgb(68, 68, 68);">이해할 수 없는 사이드의 행동은 계속되지만,</span></p><p><span style="color: rgb(68, 68, 68);">그의 비밀을 알지 못한 채 사랑하는 마음만을 간직하며 힘든 나날을 보내게 되던 어느 날,</span></p><p><span style="color: rgb(68, 68, 68);">충격적인 사실과 마주하게 된다….</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">첫눈에 반했던 순간부터, 5년의 시간이 흐르고 2001년.</span></p><p><span style="color: rgb(68, 68, 68);">아슬리의 모든 신념이 흔들리는 사건이 벌어지게 되는데…</span></p>',"img/ranking/22.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('카난 키르', '영국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('로저 아자르', '영국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '77', '22');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '78', '22');

INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("페르시아어 수업", "바딤 피얼먼" , "드라마", "120", DATE_ADD(NOW(), INTERVAL 28 DAY), "15", '<h2><span style="color: rgb(68, 68, 68);">페르시아어를 배우기 원하는</span></h2><p><span style="color: rgb(68, 68, 68);">독일군 장교 `코흐`</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">살기 위해 페르시아인이라고</span></p><p><span style="color: rgb(68, 68, 68);">거짓말을 한 유대인 `질`</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">`질`은 살아남기 위해</span></p><p><span style="color: rgb(68, 68, 68);">`코흐`에게 가짜 페르시아어를 가르치고</span></p><p><span style="color: rgb(68, 68, 68);">매일 밤 거짓으로 단어를 만드는데···</span></p><p><br></p><p><span style="color: rgb(68, 68, 68);">깊어져가는 의심 속</span></p><p><span style="color: rgb(68, 68, 68);">페르시아어 수업의 비밀을 지켜야 한다!</span></p>',"img/ranking/23.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('나우엘 페레즈 비스카야트', '칠레');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('라르스 아이딩어', '독일');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '79', '23');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '80', '23');

-- 상영을 했으나 상영 종료한 영화 확인을  위한 영화
INSERT INTO `movie`(`mtitle`, `mdir`, `mgenre`, `mtime`, `mdate`, `mrating`, `mstory`, `mimagepath`)
VALUES("똑똑똑", "M. 나이트 샤말란" , "스릴러", "100", DATE_SUB(NOW(), INTERVAL 40 DAY), "15", '<h2>똑똑똑, 휴가를 즐기는 가족에게 찾아온 선택의 그림자</h2><p>휴가를 떠난 한 가족은 별장에 무단침입한 낯선 방문자들과 대치하게 된다.</p><p><br></p><p>‘레너드’(데이브 바티스타)와 낯선 방문자들은 세상의 종말을 막으러 왔다며,</p><p>가족 중 한 명을 희생시켜야만 인류의 멸망을 막을 수 있다는 잔혹한 선택을 하게 하는데…</p><p><br></p><p><strong>가족을 살리면 인류가 멸망하고, 인류를 살리면 가족이 죽는다!</strong></p>', "img/ranking/24.jpg");

INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('데이브 바티스타', '미국');
INSERT INTO `actor` (`aname`, `abirthplace`)
VALUES ('루퍼트 그린트', '영국');

INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '81', '24');
INSERT INTO `movie_actor` (`marole`, `aid`, `mid`)
VALUES('주연', '82', '24');
-- 상영을 했으나 상영 종료한 영화 확인을  위한 영화 

-- 극장 컬럼 추가
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("강남","서울","서울특별시 강남구 강남대로 438 (역삼동, 스타플렉스)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("강변","서울","서울특별시 광진구 광나루로56길 85 (구의동, 테크노마트 10층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("건대입구","서울","서울시 서울특별시 광진구 아차산로30길 26");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("구로","서울","서울특별시 구로구 구로중앙로 152 (구로동, AK플라자(구 애경백화점) 6층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("대학로","서울","서울특별시 종로구 대명길 28 (명륜동)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("등촌","서울","서울 강서구 공항대로45길 63");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("명동","서울","서울특별시 중구 명동길 14 (명동, 눈스퀘어 8층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("미아","서울","서울특별시 강북구 도봉로 34 (미아동, 트레지오 쇼핑몰 9층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("방학","서울","서울특별시 도봉구 방학동 707-6, 4F~8F");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("불광","서울","서울특별시 은평구 불광로 20 (대조동, 팜스퀘어 11층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("송파","서울","서울특별시 송파구 충민로 66 (문정동, 가든파이브 라이프 영관 10층)");

INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("광교","경기","경기도 수원시 영통구 광교호수공원로 320(하동) 갤러리아백화점 광교점 10층");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("구리","경기","경기도 구리시 경춘로 243 (인창동, 2층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("김포","경기","경기도 김포시 풍무로 128 김포풍무웰라움퍼펙트시티 5층");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("동탄","경기","경기도 화성시 동탄중앙로 220 (반송동, 메타폴리스 A블럭 3층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("야탑","경기","경기도 성남시 분당구 성남대로925번길 16 (야탑동, 테마폴리스빌딩 지하2층)");

INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("계양","인천","인천광역시 계양구 장제로 738 (작전동, 메트로몰 8층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("부평","인천","인천광역시 부평구 마장로 489 (청천동, 아이즈빌아울렛)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("연수역","인천","인천광역시 연수구 벚꽃로 106 8층 (청학동, 연수광장프라자)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("청라","인천","인천광역시 서구 청라루비로 76 (청라동, 스퀘어세븐 3층~4층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("주안역","인천","인천광역시 미추홀구 염창로 58 (주안동, 카라아울렛 6층)");

INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("대연","부산","부산광역시 남구 수영로 305 (대연동, 스파크 5층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("동래","부산","부산광역시 동래구 중앙대로 1523 (온천동, SK허브스카이 6층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("서면","부산","부산광역시 부산진구 동천로 4 (전포동, 지오플레이스 6층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("센텀","부산","부산광역시 해운대구 센텀남대로 35 (우동, 신세계센텀시티 7층)");
INSERT INTO `movie_theater`(`tname`,`tarea`,`taddr`)
VALUES("화명","부산","부산광역시 북구 화명대로 16 (화명동, 센추리빌딩)");

-- 상영관 컬럼 추가
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("1관","2D","70","1");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","1");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","30","1");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","2");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","2");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","30","2");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","3");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","3");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","2D","30","3");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","4");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","4");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","30","4");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","5");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","5");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","2D","30","5");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","6");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","6");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","30","6");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","7");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","7");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","30","7");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","8");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","8");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","30","8");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","9");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","70","9");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","30","9");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("1관","3D","70","10");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","10");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","30","10");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","11");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","11");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","2D","30","11");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("1관","2D","70","12");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","3D","50","12");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","30","12");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","13");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","13");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","2D","30","13");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","2D","70","14");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","14");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","30","14");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","15");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","15");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","30","15");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","16");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","16");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("6관","2D","30","16");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","17");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","17");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("6관","2D","30","17");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("1관","3D","70","18");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","50","18");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","30","18");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","2D","70","19");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","19");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("6관","2D","30","19");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","2D","70","20");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","20");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","30","20");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","21");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","50","21");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("6관","2D","30","21");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("2관","2D","70","22");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","22");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","2D","30","22");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","23");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","3D","50","23");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("6관","2D","30","23");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","2D","70","24");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","24");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","3D","30","24");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","3D","70","25");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("4관","2D","50","25");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","2D","30","25");

INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("1관","2D","70","26");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("3관","2D","50","26");
INSERT INTO `movie_cinema`(`cname`,`ctype`,`cseat`,`tid`)
VALUES("5관","2D","30","26");

DELIMITER $$
CREATE PROCEDURE movieinfo_insert()
BEGIN
   DECLARE i1 INT DEFAULT 1;
   DECLARE i2 INT DEFAULT 2;
   DECLARE i3 INT DEFAULT 3;
   -- 오늘 이전의 상영기록(이거는 예매에 나오면 안되는 애들임)		
   	-- 70개 짜리 자리
   	-- 아래 insert는 movie에는 존재하지만 상영을 안할경우 고객의 예매 기록에는 남겨야 해서 넣어둠
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_SUB(NOW(), INTERVAL 39 DAY), DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 39 DAY), "%Y-%m-%d 10:20:00"),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 39 DAY), "%Y-%m-%d 12:00:00"), "24", 1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_SUB(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 10:30:00"),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 13:30:00"), "1", 1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_SUB(NOW(), INTERVAL 10 DAY),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 15:30:00"),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 17:30:00"), "2", 1);
   	-- 50개 짜리 자리
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_SUB(NOW(), INTERVAL 9 DAY),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 10:20:00"),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 12:00:00"), "3", 5);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_SUB(NOW(), INTERVAL 9 DAY),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 16:00:00"), "4", 5);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_SUB(NOW(), INTERVAL 9 DAY),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 13:00:00"),  DATE_FORMAT(DATE_SUB(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 16:00:00"), "5", 5);
   -- 타이타닉, 카운트, 상견니, 젠틀맨, 아바타는 이것들 기록으로 관람평 적을 수 있게 만드는거
	
   WHILE (i1 <= 78) DO
   	-- 이거 아래꺼 예매 기록 넣기 (70개 전부) --> 아이디 넣을때 좀 섞어서 넣기
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 10:30:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 13:30:00"), "1", i1);
   	-- 이거 아래꺼 예매기록 넣기 (70개 전부)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 16:00:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 18:00:00"), "2", i1);
   	-- 이거 아래꺼 예매 기록 넣기 (70개 전부)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 19:20:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 21:00:00"), "3", i1);
   	-- 이거 아래꺼 예매 기록 넣기 (56자리만)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 21:30:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 23:30:00"), "4", i1);
   	-- 아래꺼 예매기록 넣기 (20자리)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 08:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 11:00:00"), "1", i1);
   	-- 아래꺼 예매기록 넣기(15자리)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 14:00:00"), "2", i1);
   	-- 아래꺼 예매기록 넣기(15자리)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 15:50:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 17:30:00"), "3", i1);
   	-- 아래꺼 예매기록 넣기(15자리)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 20:00:00"), "4", i1);
  		-- 이거 아래꺼 예매 기록 넣기
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 20:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 23:30:00"), "5", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 07:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 10:00:00"), "1", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 10:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 12:30:00"), "2", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 13:40:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 15:00:00"), "10", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 15:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 17:00:00"), "11", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 17:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 19:30:00"), "12", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 20:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 21:30:00"), "13", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 21:55:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 23:55:00"), "14", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 20:50:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 23:50:00"), "1", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 18:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 20:10:00"), "3", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 16:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 18:00:00"), "6", i1);
   	-- 이거 아래꺼 예매 기록 넣기(70개)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 13:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 15:00:00"), "15", i1);
   	-- 이거 아래꺼 예매 기록 넣기
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 12:00:00"), "15", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 08:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 11:00:00"), "1", i1);
   	-- 이거 아래꺼 예매 기록 넣기
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 11:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 13:00:00"), "16", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 16:00:00"), "7", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 16:40:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 18:40:00"), "8", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 19:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 21:20:00"), "15", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 21:55:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 23:55:00"), "2", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 09:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 12:00:00"), "1", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 12:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 15:30:00"), "1", i1);	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 16:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 17:40:00"), "16", i1);	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 20:00:00"), "15", i1);	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 20:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 23:30:00"), "5", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 10:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 13:30:00"), "1", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 15:40:00"), "16", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 16:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 18:30:00"), "17", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 19:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 21:30:00"), "15", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 09:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 12:00:00"), "1", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 12:40:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 14:20:00"), "3", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 15:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 17:00:00"), "7", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 20:00:00"), "15", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 20:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 23:30:00"), "1", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 16:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 18:00:00"), "6", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 13:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 15:30:00"), "15", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 10:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 12:00:00"), "16", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 13:00:00"), "1", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 16:00:00"), "2", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 16:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 18:00:00"), "6", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 19:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 21:00:00"), "12", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 13:00:00"), "1", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 16:00:00"), "7", i1);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 17:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 19:00:00"), "12", i1);
      SET i1 = i1 + 3;
   END WHILE;
   
   WHILE (i2 <= 78) DO   	   
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 10:30:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 12:30:00"), "2", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 15:20:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 17:00:00"), "3", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 21:30:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 23:30:00"), "8", i2);
   	-- 이거 아래꺼 예매기록 넣기(50개)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 21:00:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 15:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 17:00:00"), "2", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 13:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 14:40:00"), "3", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 10:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 12:30:00"), "4", i2);
   	-- 이거 아래꺼 예매 기록 넣기
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 08:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 09:30:00"), "6", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 20:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 23:30:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 18:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 20:00:00"), "3", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 16:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 18:00:00"), "6", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 16:00:00"), "8", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 13:40:00"), "9", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 11:20:00"), "10", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 07:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 09:30:00"), "12", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 08:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 11:00:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 14:00:00"), "4", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 14:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 16:00:00"), "9", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 16:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 18:00:00"), "11", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 19:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 21:00:00"), "15", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 20:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 23:00:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 19:40:00"), "3", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 15:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 17:30:00"), "4", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 14:00:00"), "15", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 09:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 11:10:00"), "16", i2);	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 20:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 23:00:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 17:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 19:30:00"), "2", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 15:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 17:00:00"), "3", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 14:00:00"), "14", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 09:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 11:00:00"), "16", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 08:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 11:00:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 11:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 13:30:00"), "4", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 17:00:00"), "5", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 17:40:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 19:20:00"), "9", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 20:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 21:40:00"), "11", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 20:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 23:00:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 17:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 18:40:00"), "16", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 16:00:00"), "17", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 13:30:00"), "18", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 09:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 11:00:00"), "2", i2);	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 13:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 16:30:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 17:15:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 20:15:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 11:30:00"), "18", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 11:45:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 14:45:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 15:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 17:00:00"), "3", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 17:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 20:30:00"), "5", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 21:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 23:00:00"), "9", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 09:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 12:00:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 13:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 14:30:00"), "18", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 15:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 17:30:00"), "17", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 20:00:00"), "19", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 11 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 11 DAY), "%Y-%m-%d 14:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 11 DAY), "%Y-%m-%d 17:30:00"), "1", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 11 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 11 DAY), "%Y-%m-%d 19:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 11 DAY), "%Y-%m-%d 21:00:00"), "19", i2);
		INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 12 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 12 DAY), "%Y-%m-%d 14:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 12 DAY), "%Y-%m-%d 16:30:00"), "12", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 12 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 12 DAY), "%Y-%m-%d 19:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 12 DAY), "%Y-%m-%d 21:0:00"), "13", i2);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 13 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 13 DAY), "%Y-%m-%d 13:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 13 DAY), "%Y-%m-%d 15:00:00"), "19", i2);
      SET i2 = i2 + 6;
   END WHILE;
	   
   WHILE (i3 <= 78) DO
   	-- 이거 아래꺼 예매기록 넣기(20개)
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 19:30:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 22:30:00"), "1", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 17:00:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 19:00:00"), "7", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 14:40:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 16:20:00"), "3", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(NOW(), DATE_FORMAT(NOW(), "%Y-%m-%d 11:00:00"),  DATE_FORMAT(NOW(), "%Y-%m-%d 13:00:00"), "12", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 17:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 20:00:00"), "1", i3);
   	-- 이거 아래꺼 예매기록 넣기
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 14:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 16:30:00"), "7", i3);
   	-- 이거 아래꺼 예매기록 넣기
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 14:00:00"), "8", i3);
   	-- 이거 아래꺼 예매기록 넣기
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 1 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 09:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 1 DAY), "%Y-%m-%d 11:00:00"), "9", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 20:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 23:30:00"), "1", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 17:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 20:00:00"), "1", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 14:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 16:30:00"), "2", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 14:00:00"), "4", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 09:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 11:30:00"), "7", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 2 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 07:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 2 DAY), "%Y-%m-%d 09:00:00"), "13", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 13:00:00"), "1", i3); 
		INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 14:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 17:30:00"), "5", i3); 
		INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 20:00:00"), "14", i3); 
		INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 3 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 20:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 3 DAY), "%Y-%m-%d 22:30:00"), "15", i3); 
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 09:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 12:00:00"), "1", i3);   	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 12:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 14:00:00"), "6", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 14:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 15:50:00"), "10", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 16:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 18:30:00"), "14", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 4 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 19:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 4 DAY), "%Y-%m-%d 21:00:00"), "15", i3);	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 19:45:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 22:45:00"), "1", i3); 
		INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 14:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 16:00:00"), "6", i3); 
		INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 14:00:00"), "8", i3); 
		INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 5 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 5 DAY), "%Y-%m-%d 11:20:00"), "10", i3); 
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 21:00:00"), "1", i3);  	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 15:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 17:00:00"), "2", i3); 
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 14:00:00"), "8", i3); 
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 6 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 6 DAY), "%Y-%m-%d 11:30:00"), "13", i3); 
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 16:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 18:00:00"), "4", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 7 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 10:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 7 DAY), "%Y-%m-%d 11:30:00"), "18", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 20:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 23:00:00"), "1", i3);	
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 17:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 19:00:00"), "15", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 15:40:00"), "16", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 8 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 11:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 8 DAY), "%Y-%m-%d 13:00:00"), "17", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 11:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 13:00:00"), "15", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 9 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 9 DAY), "%Y-%m-%d 15:40:00"), "16", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 14:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 15:20:00"), "10", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 10 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 16:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 10 DAY), "%Y-%m-%d 17:40:00"), "19", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 11 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 11 DAY), "%Y-%m-%d 11:30:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 11 DAY), "%Y-%m-%d 13:30:00"), "15", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 11 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 11 DAY), "%Y-%m-%d 14:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 11 DAY), "%Y-%m-%d 16:00:00"), "16", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 12 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 12 DAY), "%Y-%m-%d 13:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 12 DAY), "%Y-%m-%d 16:00:00"), "1", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 12 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 12 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 12 DAY), "%Y-%m-%d 19:40:00"), "19", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 13 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 13 DAY), "%Y-%m-%d 17:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 13 DAY), "%Y-%m-%d 20:00:00"), "1", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 17 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 17 DAY), "%Y-%m-%d 13:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 17 DAY), "%Y-%m-%d 15:00:00"), "19", i3);
   	INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 15:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 17:00:00"), "19", i3);
      SET i3 = i3 + 9;
   END WHILE;
   -- 예외적으로 넣어주는 영화
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 09:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 11:00:00"), "19", 1);
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 12:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 13:40:00"), "19", 1);
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 14:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 16:00:00"), "19", 1);
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 07:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 09:00:00"), "19", 2);
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 18:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 19:40:00"), "19", 2);
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 21:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 23:00:00"), "19", 2);
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 08:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 10:00:00"), "19", 3);
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 11:00:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 12:40:00"), "19", 3);
   INSERT INTO `movie_information`(`miday`,`mistarttime`,`miendtime`,`mid`,`cid`) VALUES(DATE_ADD(NOW(), INTERVAL 19 DAY), DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 19:20:00"),  DATE_FORMAT(DATE_ADD(NOW(), INTERVAL 19 DAY), "%Y-%m-%d 21:00:00"), "19", 3);
END $$

-- 유령 회원을 가입시키는 프로시저
DELIMITER $$
CREATE PROCEDURE clone_member()
BEGIN
   DECLARE i1 INT DEFAULT 1; 
   DECLARE i2 INT DEFAULT 281;
   DECLARE i3 INT DEFAULT 561;
   DECLARE i4 INT DEFAULT 841;
   DECLARE val1 VARCHAR(20);
   DECLARE val2 VARCHAR(20);
   DECLARE val3 VARCHAR(20);
	DECLARE val4 VARCHAR(20);
	DECLARE val1_e VARCHAR(40);
   DECLARE val2_e VARCHAR(40);
   DECLARE val3_e VARCHAR(40);
	DECLARE val4_e VARCHAR(40);
   WHILE (i1 <= 280) DO 
   	SET val1 = CONCAT("temp", i1);
   	SET val1_e = CONCAT(val1, "@naver.com");
   	-- 멤버를 추가(비밀번호는 temp123456임)
      INSERT INTO `member` VALUE(val1, '$2a$10$5Drrozm9Wdak6PLfZf34jui2tVdhuqNCN5DE7us41hVdbHk12Dfzy', '임시계정', val1_e, '01012345678', '부산 부산진구 가야공원로 1', '303호', '1998-01-15', DATE_SUB(NOW(), INTERVAL 4 DAY), 'ROLE_USER');
      SET i1 = i1 + 1;
      
      SET val2 = CONCAT("temp", i2);
      SET val2_e = CONCAT(val2, "@google.com");
   	-- 멤버를 추가(비밀번호는 temp123456임)
      INSERT INTO `member` VALUE(val2, '$2a$10$5Drrozm9Wdak6PLfZf34jui2tVdhuqNCN5DE7us41hVdbHk12Dfzy', '임시사용자', val2_e, '01078654321', '부산 부산진구 가야공원로 3', '102호', '1997-03-15', DATE_SUB(NOW(), INTERVAL 15 DAY), 'ROLE_USER');
      SET i2 = i2 + 1;
      
      SET val3 = CONCAT("temp", i3);
      SET val3_e = CONCAT(val3, "@naver.com");
   	-- 멤버를 추가(비밀번호는 temp123456임)
      INSERT INTO `member` VALUE(val3, '$2a$10$5Drrozm9Wdak6PLfZf34jui2tVdhuqNCN5DE7us41hVdbHk12Dfzy', '유령계정', val3_e, '01056781234', '부산 부산진구 가야공원로 5', '1102호', '1999-11-25', DATE_SUB(NOW(), INTERVAL 8 DAY), 'ROLE_USER');
      SET i3 = i3 + 1;
      
      SET val4 = CONCAT("temp", i4);
      SET val4_e = CONCAT(val4, "@google.com");
   	-- 멤버를 추가(비밀번호는 temp123456임)
      INSERT INTO `member` VALUE(val4, '$2a$10$5Drrozm9Wdak6PLfZf34jui2tVdhuqNCN5DE7us41hVdbHk12Dfzy', '임시사용자', val4_e, '01043211234', '부산 부산진구 가야공원로 7', '503호', '2001-08-15', DATE_SUB(NOW(), INTERVAL 11 DAY), 'ROLE_USER');
      SET i4 = i4 + 1;
    END WHILE;
END $$

-- 상영관 좌석 넣는 프로시저
DELIMITER $$
CREATE PROCEDURE seat_add()
BEGIN
   DECLARE i1 INT DEFAULT 1;
   DECLARE i2 INT DEFAULT 2;
   DECLARE i3 INT DEFAULT 3;
   DECLARE j INT DEFAULT 1;
   DECLARE val VARCHAR(10);
   WHILE (i1 <= 78) DO
   	-- A로 시작하는 좌석
   	SET j = 1;
   	WHILE (j <= 10) DO
   		SET val = CONCAT("A", j);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i1);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i2);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i3);
			SET j = j + 1; 
		END WHILE;
		
		-- B로 시작하는 좌석
		SET j = 1;
		WHILE (j <= 10) DO
   		SET val = CONCAT("B", j);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i1);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i2);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i3);
			SET j = j + 1; 
		END WHILE;
		
		-- C로 시작하는 좌석
		SET j = 1;
		WHILE (j <= 10) DO
   		SET val = CONCAT("C", j);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i1);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i2);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i3);
			SET j = j + 1; 
		END WHILE;
		
		-- D로 시작하는 좌석
		SET j = 1;
		WHILE (j <= 10) DO
   		SET val = CONCAT("D", j);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i1);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i2);
			SET j = j + 1; 
		END WHILE;
		
		-- E로 시작하는 좌석
		SET j = 1;
		WHILE (j <= 10) DO
   		SET val = CONCAT("E", j);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i1);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i2);
			SET j = j + 1; 
		END WHILE;
		
		-- F로 시작하는 좌석
		SET j = 1;
		WHILE (j <= 10) DO
   		SET val = CONCAT("F", j);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i1);
			SET j = j + 1; 
		END WHILE;
		
		-- G로 시작하는 좌석
		SET j = 1;
		WHILE (j <= 10) DO
   		SET val = CONCAT("G", j);
			INSERT INTO `movie_seat`(`sname`,`cid`) VALUES(val, i1);
			SET j = j + 1; 
		END WHILE;
		
		-- i시리즈 변수 더하기
   	SET i1 = i1 + 3;
   	SET i2 = i2 + 3;
   	SET i3 = i3 + 3;
   END WHILE;
END $$

-- 예매기록 추가하는 프로시저
DELIMITER $$
CREATE PROCEDURE reservation_insert()
BEGIN
   DECLARE i INT DEFAULT 1;
   DECLARE j1 INT DEFAULT 1;
   DECLARE j2 INT DEFAULT 91;
   DECLARE j3 INT DEFAULT 131;
   DECLARE val VARCHAR(20);
   
   -- 똑똑똑 (상영 했다가 상영 끝난 영화 기록 추가)
   WHILE (i <= 70) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 40 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '1', val);
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 (영화 예매 기록 추가(오늘이전))
   SET i = 1;
   WHILE (i <= 70) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 12 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '2', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 카운트 (현재 상영중인 영화 예매 기록 추가(오늘이전))
   SET i = 1;
   WHILE (i <= 56) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 12 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '3', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 (현재 상영중인 영화 예매 기록 추가(오늘이전))
   SET i = 1;
   WHILE (i <= 50) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 10 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '4', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 (현재 상영중인 영화 예매 기록 추가(오늘이전))
   SET i = 1;
   WHILE (i <= 40) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 10 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '5', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 아바타 (현재 상영중인 영화 예매 기록 추가(오늘이전))
   SET i = 1;
   WHILE (i <= 7) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 10 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '6', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 (현재 상영중인 영화 예매 기록 추가(오늘))
   SET i = 71;
   WHILE (i <= 140) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 2 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '7', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 카운트  (현재 상영중인 영화 예매 기록 추가(오늘))
   SET i = 81;
   WHILE (i <= 150) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 2 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '8', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 (현재 상영중인 영화 예매 기록 추가(오늘))
   SET i = 151;
   WHILE (i <= 220) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '9', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 (현재 상영중인 영화 예매 기록 추가(오늘))
   SET i = 71;
   WHILE (i <= 126) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '10', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 201;
   WHILE (i <= 220) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 2 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '11', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 카운트  (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 231;
   WHILE (i <= 245) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 2 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '12', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 246;
   WHILE (i <= 260) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '13', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 281;
   WHILE (i <= 295) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '14', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 아바타 (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 1;
   WHILE (i <= 38) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '15', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 유령 (현재 상영중인 영화 예매 기록 추가(3일지남 -> 개봉직후))
   SET i = 901;
   WHILE (i <= 970) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '26', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 유령 (현재 상영중인 영화 예매 기록 추가(3일지남 -> 개봉직후))
   SET i = 1;
   WHILE (i <= 48) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '27', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 장화신은 고양이 (현재 상영중인 영화 예매 기록 추가(4일지남 -> 개봉직후))
   SET i = 1;
   WHILE (i <= 47) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '29', val);      
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 (현재 상영중인 영화 예매 기록 추가(하루지남)) -> 30자리
   SET i = 501;
   WHILE (i <= 530) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '1336', val); 
      SET i = i + 1;
   END WHILE;
   
   -- 어메이징 모리스 (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 1;
   WHILE (i <= 35) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '1340', val);      
      SET i = i + 1;
   END WHILE;

   -- 타이타닉 (현재 상영중인 영화 예매 기록 추가(오늘))
   SET i = 901;
   WHILE (i <= 920) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '2061', val);      
      SET i = i + 1;
   END WHILE;
  
  	-- 영웅 (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 1;
   WHILE (i <= 27) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(NOW(), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '2066', val);      
      SET i = i + 1;
   END WHILE;
  
  	-- 오늘밤, 세계에서 (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 1;
   WHILE (i <= 24) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(NOW(), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '2067', val);      
      SET i = i + 1;
   END WHILE;
  
  	-- 교섭 (현재 상영중인 영화 예매 기록 추가(하루지남))
   SET i = 1;
   WHILE (i <= 17) DO 
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(NOW(), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '1', '2068', val);      
      SET i = i + 1;
   END WHILE;
  
   -- 똑똑똑 A1 ~ C10
   SET i = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "1", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 똑똑똑 D1 ~ E10
   WHILE (j2 <= 129) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "1", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;
   
   -- 똑똑똑 F1 ~ G10
   WHILE (j3 <= 150) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j3, "1", i);
   	SET j3 = j3 + 1;
   	SET i = i + 1;
   END WHILE;
   
   -- 타이타닉  A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "2", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 D1 ~ E10
   SET j2 = 91;
   WHILE (j2 <= 129) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "2", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;

   -- 타이타닉 F1 ~ G10
   SET j3 = 131;
   WHILE (j3 <= 150) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j3, "2", i);
   	SET j3 = j3 + 1;
   	SET i = i + 1;
   END WHILE;
   
   -- 카운트  A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "3", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 카운트 D1 ~ E10
   SET j2 = 91;
   WHILE (j2 <= 129) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "3", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;

   -- 카운트 F1 ~ F6
   SET j3 = 131;
   WHILE (j3 <= 136) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j3, "3", i);
   	SET j3 = j3 + 1;
   	SET i = i + 1;
   END WHILE;
   
   -- 상견니 A1 ~ C10
   SET j1 = 152;
   WHILE (j1 <= 239) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "4", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 상견니 D1 ~ E10
   SET j2 = 242;
   WHILE (j2 <= 280) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "4", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 A1 ~ C10
   SET j1 = 152;
   WHILE (j1 <= 239) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "5", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 D1 ~ D10
   SET j2 = 242;
   WHILE (j2 <= 260) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "5", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;
   
   -- 아바타 A1 ~ A7
   SET j1 = 152;
   WHILE (j1 <= 170) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "6", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 타이타닉  A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "7", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 D1 ~ E10
   SET j2 = 91;
   WHILE (j2 <= 129) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "7", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;

   -- 타이타닉 F1 ~ G10
   SET j3 = 131;
   WHILE (j3 <= 150) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j3, "7", i);
   	SET j3 = j3 + 1;
   	SET i = i + 1;
   END WHILE;
   
   -- 카운트 A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "8", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 카운트 D1 ~ E10
   SET j2 = 91;
   WHILE (j2 <= 129) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "8", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;

   -- 카운트 F1 ~ G10
   SET j3 = 131;
   WHILE (j3 <= 150) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j3, "8", i);
   	SET j3 = j3 + 1;
   	SET i = i + 1;
   END WHILE;
   
   -- 상견니  A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "9", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 상견니 D1 ~ E10
   SET j2 = 91;
   WHILE (j2 <= 129) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "9", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;

   -- 상견니 F1 ~ G10
   SET j3 = 131;
   WHILE (j3 <= 150) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j3, "9", i);
   	SET j3 = j3 + 1;
   	SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨  A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "10", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 D1 ~ E10
   SET j2 = 91;
   WHILE (j2 <= 129) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "10", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;

   -- 젠틀맨 F1 ~ F6
   SET j3 = 131;
   WHILE (j3 <= 136) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j3, "10", i);
   	SET j3 = j3 + 1;
   	SET i = i + 1;
   END WHILE;

   -- 타이타닉  A1 ~ B10
   SET j1 = 1;
   WHILE (j1 <= 58) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "11", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 카운트 A1 ~ B5
   SET j1 = 1;
   WHILE (j1 <= 43) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "12", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 상견니  A1 ~ B5
   SET j1 = 1;
   WHILE (j1 <= 43) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "13", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨  A1 ~ B5
   SET j1 = 1;
   WHILE (j1 <= 43) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "14", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 아바타 A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "15", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 아바타 D1 ~ D8
   SET j2 = 91;
   WHILE (j2 <= 105) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "15", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;
      
   -- 유령 A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "26", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 유령 D1 ~ E10
   SET j2 = 91;
   WHILE (j2 <= 129) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "26", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;

   -- 유령 F1 ~ G10
   SET j3 = 131;
   WHILE (j3 <= 150) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j3, "26", i);
   	SET j3 = j3 + 1;
   	SET i = i + 1;
   END WHILE;
      
   -- 유령 A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "27", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 유령 D1 ~ E8
   SET j2 = 91;
   WHILE (j2 <= 125) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "27", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;
   
   -- 장화신은 고양이 A1 ~ C10
   SET j1 = 1;
   WHILE (j1 <= 88) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "29", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 장화신은 고양이 D1 ~ E7
   SET j2 = 91;
   WHILE (j2 <= 123) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "29", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 A1 ~ C5
   SET j1 = 2;
   WHILE (j1 <= 74) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "1336", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 D1 ~ D5
   SET j2 = 92;
   WHILE (j2 <= 100) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "1336", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;
   
   -- 어메이징 모리스 B1 ~ C10
   SET j1 = 32;
   WHILE (j1 <= 89) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "1340", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 어메이징 모리스 D1 ~ E5
   SET j2 = 92;
   WHILE (j2 <= 120) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j2, "1340", i);
   	SET j2 = j2 + 2;
   	SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 A1 ~ B10
   SET j1 = 3;
   WHILE (j1 <= 60) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "2061", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 영웅 A1 ~ C7
   SET j1 = 3;
   WHILE (j1 <= 81) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "2066", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;
   
   -- 오늘밤, 세계에서 A1 ~ C4
   SET j1 = 3;
   WHILE (j1 <= 72) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "2067", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;

	-- 교섭 A1 ~ B7
   SET j1 = 3;
   WHILE (j1 <= 51) DO 
   	INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(j1, "2068", i);
   	SET j1 = j1 + 3;
   	SET i = i + 1;
   END WHILE;   
END $$

-- 유령 회원을 통한 영화 좋아요와 관람평 늘리는 프로시저
DELIMITER $$
CREATE PROCEDURE clone_member_like()
BEGIN
   DECLARE i INT DEFAULT 2;
   DECLARE val VARCHAR(20);
   
   -- 타이타닉 관람평 45개 추가
   WHILE (i <= 46) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 5 MINUTE), 9, "관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)", DATE_SUB(NOW(), INTERVAL 6 DAY), 1, val);
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 관람평 23개 추가
   WHILE (i <= 69) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 5 MINUTE), 10, "관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)", DATE_SUB(NOW(), INTERVAL 6 DAY), 1, val);
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 좋아요 추가
   WHILE (i <= 1120) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 5 MINUTE), 1, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 카운트 관람평 30개 추가
   SET i = 2;
   WHILE (i <= 31) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 8 MINUTE), 8, "관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)", DATE_SUB(NOW(), INTERVAL 3 DAY), 2, val);
      SET i = i + 1;
   END WHILE;
   
   -- 카운트 관람평 27개 추가
   WHILE (i <= 58) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 8 MINUTE), 10, "관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)", DATE_SUB(NOW(), INTERVAL 3 DAY), 2, val);
      SET i = i + 1;
   END WHILE;
   
   -- 카운트 좋아요 추가
   WHILE (i <= 1000) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 8 MINUTE), 2, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 상견니 관람평 30개 추가
   SET i = 1;
   WHILE (i <= 30) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 12 MINUTE), 10, "관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)", DATE_SUB(NOW(), INTERVAL 2 DAY), 3, val);
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 관람평 12개 추가
   WHILE (i <= 42) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 12 MINUTE), 7, "관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)", DATE_SUB(NOW(), INTERVAL 2 DAY), 3, val);
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 좋아요 추가
   WHILE (i <= 250) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 12 MINUTE), 3, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 젠틀맨 관람평 20개 추가
   SET i = 1;
   WHILE (i <= 20) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 16 MINUTE), 9, "관람평을 위한 유령 관람평(작성예시는 id : temp31 ~ 56, pw : temp123456 으로 진행 --> 젠틀맨 가능)", DATE_SUB(NOW(), INTERVAL 2 DAY), 4, val);
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 관람평 10개 추가
   WHILE (i <= 30) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 16 MINUTE), 7, "관람평을 위한 유령 관람평(작성예시는 id : temp31 ~ 56, pw : temp123456 으로 진행 --> 젠틀맨 가능)", DATE_SUB(NOW(), INTERVAL 2 DAY), 4, val);
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 좋아요 추가
   WHILE (i <= 190) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 16 MINUTE), 4, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 아바타 관람평 6개 추가
   SET i = 2;
   WHILE (i <= 7) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 15 MINUTE), 8, "관람평을 위한 유령 관람평(작성예시는 id : temp1,  pw : temp123456 으로 진행 --> 아바타 가능)", DATE_SUB(NOW(), INTERVAL 2 DAY), 5, val);
      SET i = i + 1;
   END WHILE;
   
   -- 아바타 좋아요 추가
   WHILE (i <= 351) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 15 MINUTE), 5, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 어메이징 모리스 좋아요 추가
   SET i = 1;
   WHILE (i <= 180) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 22 MINUTE), 6, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 영웅 좋아요 추가
   SET i = 1;
   WHILE (i <= 150) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 18 MINUTE), 7, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 오늘밤, 세계에서 좋아요 추가
   SET i = 1;
   WHILE (i <= 90) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 35 MINUTE), 8, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 교섭 좋아요 추가
   SET i = 1;
   WHILE (i <= 80) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 38 MINUTE), 9, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 유령 좋아요 추가
   SET i = 1;
   WHILE (i <= 300) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 25 MINUTE), 15, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 장화신은 고양이 좋아요 추가
   SET i = 1;
   WHILE (i <= 310) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 23 MINUTE), 16, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 멍뭉이 좋아요 추가
   SET i = 1;
   WHILE (i <= 5) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 45 MINUTE), 20, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 페르시아어 수업 좋아요 추가
   SET i = 1;
   WHILE (i <= 7) DO 
   	SET val = CONCAT("temp", i);
      INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 40 MINUTE), 23, val);
      SET i = i + 1; 
   END WHILE;
   
   -- 똑똑똑 관람평 20개 추가 (예외 케이스)
   SET i = 1;
   WHILE (i <= 20) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 20 DAY), 8, "관람평을 위한 유령 관람평(이 영화는 상영했다가 종료한 영화입니다.)", DATE_SUB(NOW(), INTERVAL 20 DAY), 24, val);
      SET i = i + 1;
   END WHILE;
   
   -- 똑똑똑 관람평 5개 추가 (예외 케이스)
   WHILE (i <= 25) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `movie_member`(`umlike`, `umliketime`, `umscore`, `umcomment`, `umcommenttime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 18 DAY), 7, "관람평을 위한 유령 관람평(이 영화는 상영했다가 종료한 영화입니다.)", DATE_SUB(NOW(), INTERVAL 18 DAY), 24, val);
      SET i = i + 1;
   END WHILE;
	
	-- temp1 계정 아바타 좋아요 추가 (예외 케이스)
	INSERT INTO `movie_member`(`umlike`, `umliketime`, `mid`, `uid`) VALUES(1, DATE_SUB(NOW(), INTERVAL 15 MINUTE), 5, 'temp1');   
END $$

-- 관람평에 좋아요 추가하는 프로시저
DELIMITER $$
CREATE PROCEDURE comment_like_insert()
BEGIN
   DECLARE i INT DEFAULT 1;
   DECLARE val VARCHAR(20);
   
   -- 타이타닉 관람평 좋아요 추가(temp69 작성)
   WHILE (i <= 5) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 68);
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 관람평 좋아요 추가(temp67 작성)
   SET i = 1;
   WHILE (i <= 8) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 66);
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 관람평 좋아요 추가(temp31 작성)
   SET i = 1;
   WHILE (i <= 13) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 30);
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 관람평 좋아요 추가(temp13 작성)
   SET i = 1;
   WHILE (i <= 15) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 12);
      SET i = i + 1;
   END WHILE;
   
   -- 타이타닉 관람평 좋아요 추가(temp22 작성)
   SET i = 1;
   WHILE (i <= 17) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 21);
      SET i = i + 1;
   END WHILE;

   -- 카운트 관람평 좋아요 추가(temp58 작성)
   SET i = 1;
   WHILE (i <= 3) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 1176);
      SET i = i + 1;
   END WHILE;
   
   -- 카운트 관람평 좋아요 추가(temp57 작성)
   SET i = 1;
   WHILE (i <= 4) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 1175);
      SET i = i + 1;
   END WHILE;
   
   -- 카운트 관람평 좋아요 추가(temp20 작성)
   SET i = 1;
   WHILE (i <= 7) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 1138);
      SET i = i + 1;
   END WHILE;
   
   -- 카운트 관람평 좋아요 추가(temp2 작성)
   SET i = 1;
   WHILE (i <= 10) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 1120);
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 관람평 좋아요 추가(temp41 작성)
   SET i = 1;
   WHILE (i <= 10) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2159);
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 관람평 좋아요 추가(temp40 작성)
   SET i = 1;
   WHILE (i <= 7) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2158);
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 관람평 좋아요 추가(temp1 작성)
   SET i = 1;
   WHILE (i <= 9) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2119);
      SET i = i + 1;
   END WHILE;
   
   -- 상견니 관람평 좋아요 추가(temp16 작성)
   SET i = 1;
   WHILE (i <= 6) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2134);
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 관람평 좋아요 추가(temp30 작성)
   SET i = 1;
   WHILE (i <= 5) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2398);
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 관람평 좋아요 추가(temp27 작성)
   SET i = 1;
   WHILE (i <= 3) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2395);
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 관람평 좋아요 추가(temp15 작성)
   SET i = 1;
   WHILE (i <= 8) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2383);
      SET i = i + 1;
   END WHILE;
   
   -- 젠틀맨 관람평 좋아요 추가(temp1 작성)
   SET i = 1;
   WHILE (i <= 16) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2369);
      SET i = i + 1;
   END WHILE;
   
   -- 아바타 관람평 좋아요 추가(temp2 작성)
   SET i = 1;
   WHILE (i <= 8) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2559);
      SET i = i + 1;
   END WHILE;
   
   -- 아바타 관람평 좋아요 추가(temp6 작성)
   SET i = 10;
   WHILE (i <= 21) DO
   	SET val = CONCAT("temp", i);
   	INSERT INTO `comment_info`(`uid`, `umid`) VALUES(val, 2563);
      SET i = i + 1;
   END WHILE;
END $$

DELIMITER $$
CREATE PROCEDURE loopInsert()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 100 DO
        INSERT INTO board(btitle , bdetail, bdate,bclickindex,bcategory,uid)
          VALUES(concat('제목',i), concat('내용',i), '2023-03-25',0,"자유 게시판", "temp1");
        SET i = i + 1;
    END WHILE;
END$$


   
-- movie_information 추가
CALL movieinfo_insert();

-- 유령 회원 가입시키는 프로시저 실행
CALL clone_member();

-- 좌석 넣는 프로시저 실행
CALL seat_add();

-- 예매기록 추가 프로시저 실행
CALL reservation_insert();

-- 영화 좋아요 및 관람평 추가 프로시저 실행
CALL clone_member_like();

-- 관람평에 좋아요 추가하는 프로시저 실행
CALL comment_like_insert();


CALL loopInsert();



-- 최신순 조회 확인을 위한 임의 쿼리
UPDATE movie_member
SET umscore = 9, umcomment = '관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)', umcommenttime = DATE_SUB(NOW(), INTERVAL 10 MINUTE)
WHERE MID = 1 AND uid = 'temp21';

UPDATE movie_member
SET umscore = 9, umcomment = '관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)', umcommenttime = DATE_SUB(NOW(), INTERVAL 22 MINUTE)
WHERE MID = 1 AND uid = 'temp24';

UPDATE movie_member
SET umscore = 9, umcomment = '관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)', umcommenttime = DATE_SUB(NOW(), INTERVAL 8 MINUTE)
WHERE MID = 2 AND uid = 'temp10';

UPDATE movie_member
SET umscore = 9, umcomment = '관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)', umcommenttime = DATE_SUB(NOW(), INTERVAL 27 MINUTE)
WHERE MID = 2 AND uid = 'temp15';

UPDATE movie_member
SET umscore = 9, umcomment = '관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)', umcommenttime = DATE_SUB(NOW(), INTERVAL 11 MINUTE)
WHERE MID = 3 AND uid = 'temp5';

UPDATE movie_member
SET umscore = 9, umcomment = '관람평을 위한 유령 관람평(작성예시는 id : temp1, pw : temp123456 으로 진행 --> 타이타닉, 카운트, 아바타 가능)', umcommenttime = DATE_SUB(NOW(), INTERVAL 32 MINUTE)
WHERE MID = 3 AND uid = 'temp22';

UPDATE movie_member
SET umscore = 9, umcomment = '관람평을 위한 유령 관람평(작성예시는 id : temp31 ~ 56, pw : temp123456 으로 진행 --> 젠틀맨 가능)', umcommenttime = DATE_SUB(NOW(), INTERVAL 3 MINUTE)
WHERE MID = 4 AND uid = 'temp8';

UPDATE movie_member
SET umscore = 9, umcomment = '관람평을 위한 유령 관람평(작성예시는 id : temp31 ~ 56, pw : temp123456 으로 진행 --> 젠틀맨 가능)', umcommenttime = DATE_SUB(NOW(), INTERVAL 15 MINUTE)
WHERE MID = 4 AND uid = 'temp17';

/*
-- 예매 취소한 것들 확인하는 쿼리
SELECT *
FROM movie LEFT JOIN movie_information ON movie.mid = movie_information.mid LEFT JOIN movie_reservation ON movie_information.miid = movie_reservation.miid
WHERE movie_reservation.uid = 'temp1' AND movie_reservation.rstate = 0
ORDER BY movie_reservation.rcanceldate desc

// 모든 쿼리 걸때 6개월 이전 제한도 있어야함 **
-- 취소된거 확인할때는 rdate가 아니라 canceldate순으로 정렬 fasle랑(이건 취소된 쿼리)
SELECT mis.*
FROM movie_reservation AS mr LEFT JOIN movie_infoseat AS mis ON mr.rid = mis.rid
WHERE mr.uid = 'temp1' AND mr.rstate = false
ORDER BY rcanceldate DESC;


-- 여기에 join 시네마랑 극장 붙여서 보내면 됨  + 몇개만 뽑아서 검색하는거 고민(시간 붙이면 현재예매, 지난예매)
SELECT *
FROM movie LEFT JOIN movie_information ON movie.mid = movie_information.mid LEFT JOIN movie_reservation ON movie_information.miid = movie_reservation.miid
WHERE movie_reservation.uid = 'temp1' AND movie_reservation.rstate = 1
ORDER BY movie_reservation.rdate desc
-- 여기있는 수대로 나옴

-- 사용자가 예매한 좌석 불러오는 쿼리(스프링에선 entitygraph로 좌석 다 불러와야함)
SELECT mis.*
FROM movie_reservation AS mr LEFT JOIN movie_infoseat AS mis ON mr.rid = mis.rid
WHERE mr.uid = 'temp1' AND mr.rstate = true
ORDER BY rdate DESC;

-- 임의 데이터(몇개 더 넣어보기)
INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '40', '어른 1명, 아이 1명', '2', 'temporary_value', 'temporary_value', '테스트', '1', '30', 'temp1');
INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(1, "30", 981);
INSERT INTO `movie_infoseat`(`sid`,`miid`, `rid`) VALUES(4, "30", 981);


      


-- 여기서 뽑은 mid를 검색

INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '0', '21', 'temp1');      
INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '0', '21', 'temp1');      
INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '0', '21', 'temp1');      
INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '0', '21', 'temp1');      
INSERT INTO `movie_reservation`(`rdate`, `rprice`, `rpeople`, `rticket`, `rpayid`, `rtoken`, `rpaytype`, `rstate`, `miid`, `uid`) VALUES(DATE_SUB(NOW(), INTERVAL 1 DAY), '30', '어른 1명', '1', 'temporary_value', 'temporary_value', '테스트', '0', '21', 'temp1');      
      
SELECT * FROM movie_information
WHERE miid = 8;

select *
from member;
SELECT *
FROM comment_info;

SELECT *
FROM movie_member;

-- 예매가 가능한 영화들
-- 여기에 스프링에서 orderby 추가
SELECT *
FROM movie
WHERE mtitle LIKE '% %' and MID IN (SELECT DISTINCT MID
				  						  		FROM movie_information
										  		WHERE mistarttime >= ADDTIME(now(), '0:30:00'));


-- 예매가 불가능한 영화들(영화 포스터만 뜨고 아직 상영일정이 안나온 영화들)
-- 아무리 인기없는 영화라도 개봉하고 한번은 상영할테니깐 인기가 없어 상영에서 밀려난 영화들도 걸러짐
SELECT *
FROM movie
WHERE MID not IN (SELECT distinct mid
						FROM movie_information)
ORDER BY mdate;	
				  

-- 현재 상영작 (오늘 이전의 개봉했으면서, 오늘 이후의 예매가 가능한 영화들)
-- 여기에 스프링에서 orderby 추가
SELECT *
FROM movie
WHERE mtitle LIKE '%%' AND mdate <= DATE_FORMAT(NOW(),'%Y-%m-%d') and mid IN (SELECT DISTINCT MID
				  						  																FROM movie_information
																								  		WHERE mistarttime >= ADDTIME(now(), '0:30:00'));
				 
-- 상영 예정작(예매가 가능한 것)
-- 여기에 스프링에서 orderby 추가
SELECT *
FROM movie
WHERE mtitle LIKE '%%' AND mdate > DATE_FORMAT(NOW(), '%Y-%m-%d') AND MID IN (SELECT DISTINCT MID
																		    							FROM movie_information
																									   WHERE miday >= DATE_FORMAT(NOW(),'%Y-%m-%d'));

-- 상영 예정작(예매가 불가능한 것) --> 영화 포스터는 떴는데 예매는 불가능한거
-- 여기에 스프링에서 orderby 추가
SELECT *
FROM movie
WHERE MID not IN (SELECT distinct mid
						FROM movie_information);
-- 여기서 어느 시점 영화를 삭제했다고 생각도 해봐야혀



-- 예매가 가능한 영화의 reservation 갯수
SELECT COUNT(*)
FROM movie_reservation
WHERE miid IN (SELECT miid
					FROM movie_information
					WHERE MID IN (SELECT DISTINCT mid
									  FROM movie_information
									  WHERE mistarttime >= ADDTIME(now(), '0:30:00')));
													
						
-- 특정 영화의 reservation 갯수
SELECT COUNT(*)
FROM movie_reservation
WHERE miid IN (SELECT miid
					FROM movie_informationmovie
					WHERE MID = 4);
					
-- 특정 상영관에 특정시간대 예매 정보 확인하는거
SELECT *
FROM movie_information
WHERE cid = 1 AND (mistarttime BETWEEN '2023-04-06 09:30:01' AND '2023-04-06 12:29:59' OR miendtime BETWEEN '2023-04-06 09:30:01' AND '2023-04-06 12:29:59')
					
*/