package csf.project.csfServer.models;

import org.springframework.jdbc.support.rowset.SqlRowSet;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Score {
    private String username;
    private String category;
    private int score;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public int getScore() {
        return score;
    }
    public void setScore(int score) {
        this.score = score;
    }

    public static Score create(SqlRowSet rs) {
        Score score = new Score();
        score.setUsername(rs.getString("username"));
        String category = rs.getString("category").replace("_", " ").toUpperCase();
        score.setCategory(category);
        score.setScore(rs.getInt("highscore"));
        return score;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                    .add("username", username)
                    .add("category", category)
                    .add("score", score)
                    .build();
    }

    
}
