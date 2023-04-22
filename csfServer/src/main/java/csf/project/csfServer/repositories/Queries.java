package csf.project.csfServer.repositories;

public class Queries {
    public static final String SQL_GET_ALL_USERS = "SELECT * FROM user";
    public static final String SQL_CREATE_USER ="INSERT INTO user(username, password) VALUES(?,?)";
    public static final String SQL_GET_TRIVIA_HIGHSCORE = "SELECT trivia_highscore FROM user where username=?";
    public static final String SQL_UPDATE_TRIVIA_HIGHSCORE = "UPDATE user SET trivia_highscore=?, trivia_highscore_category=? WHERE username=?";
    public static final String SQL_INSERT_TRIVIA_SCORE = "INSERT INTO triviahighscore(username, category, highscore) VALUES(?,?,?)";
    public static final String SQL_GET_ALL_TRIVIA_HIGHSCORES = "SELECT * FROM triviahighscore ORDER BY highscore DESC LIMIT 20";
    public static final String SQL_DELETE_FROM_USER_ROLE = "DELETE FROM user_role WHERE user_id=?";
    public static final String SQL_DELETE_FROM_HIGHSCORES = "DELETE FROM triviahighscore WHERE username=?";
    public static final String SQL_DELETE_FROM_USER = "DELETE FROM user WHERE username=?";

}
