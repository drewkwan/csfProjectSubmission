package csf.project.csfServer.repositories;

import static csf.project.csfServer.repositories.Queries.*;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public SqlRowSet getAllUsers() {
        return jdbcTemplate.queryForRowSet(SQL_GET_ALL_USERS);
    }

    public Integer createUser(String username, String password) {
        return jdbcTemplate.update(SQL_CREATE_USER, username, password);
    }
    
    public Integer getTriviaHighScore(String username) {
        Integer highscore = 0;
        final SqlRowSet rs = jdbcTemplate.queryForRowSet(SQL_GET_TRIVIA_HIGHSCORE, username);
        while (rs.next()){
            highscore = rs.getInt("trivia_highscore");
        }
        return highscore;
        
    }

    public Integer updateUserTriviaHighscore(Integer highscore, String category, String username) {
        return jdbcTemplate.update(SQL_UPDATE_TRIVIA_HIGHSCORE, highscore, category, username);

    }

    public Integer insertTriviaScoreInLeaderboard(String username, String category, Integer highscore) {
        return jdbcTemplate.update(SQL_INSERT_TRIVIA_SCORE, username, category, highscore);
    }

    public SqlRowSet getAllHighscores() {
        return jdbcTemplate.queryForRowSet(SQL_GET_ALL_TRIVIA_HIGHSCORES);
    }

    


}
