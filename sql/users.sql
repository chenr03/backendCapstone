CREATE TABLE Users (
	userId INT PRIMARY KEY AUTO_INCREMENT,
  	username varchar(100),
  	passwordHash varchar(100)
);

CREATE TABLE Game (
  userId INT,
  courseId INT,
  gameId INT PRIMARY KEY AUTO_INCREMENT,
  gameName varchar(100),
  FOREIGN KEY (userId) REFERENCES Users (userId),
  FOREIGN KEY (courseId) REFERENCES Course (courseId)
  );


CREATE TABLE Course (
  courseId INT PRIMARY KEY AUTO_INCREMENT,
  courseName varchar(100),
  Hole1 varchar(100),
  Hole2 varchar(100),
  Hole3 varchar(100),
  Hole4 varchar(100),
  Hole5 varchar(100),
  Hole6 varchar(100),
  Hole7 varchar(100),
  Hole8 varchar(100),
  Hole9 varchar(100),
  Hole10 varchar(100),
  Hole11 varchar(100),
  Hole12 varchar(100),
  Hole13 varchar(100),
  Hole14 varchar(100),
  Hole15 varchar(100),
  Hole16 varchar(100),
  Hole17 varchar(100),
  Hole18 varchar(100)

	);

CREATE TABLE Players (
	gameId INT,
  	playerId INT PRIMARY KEY AUTO_INCREMENT,
  	playerName varchar(100),
  	FOREIGN KEY (gameId) REFERENCES Game (gameId),
  	Hole1Score varchar(100),
  	Hole2Score varchar(100),
  	Hole3Score varchar(100),
  	Hole4Score varchar(100),
  	Hole5Score varchar(100),
  	Hole6Score varchar(100),
  	Hole7Score varchar(100),
  	Hole8Score varchar(100),
  	Hole9Score varchar(100),
  	Hole10Score varchar(100),
  	Hole11Score varchar(100),
  	Hole12Score varchar(100),
  	Hole13Score varchar(100),
  	Hole14Score varchar(100),
  	Hole15Score varchar(100),
  	Hole16Score varchar(100),
  	Hole17Score varchar(100),
  	Hole18Score varchar(100)
);