package csf.project.csfServer.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class User {
    @Id
    String username; 
    String password;
    int arcadeHighScore;
    int triviaHighscore;
    String triviaHighscoreCategory;

    @ManyToMany(fetch=FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name="user_role", joinColumns = {@JoinColumn(name="user_id")}, inverseJoinColumns = {@JoinColumn(name="role_id")})
    private Set<Role> roles = new HashSet<Role>();
    
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public int getArcadeHighScore() {
        return arcadeHighScore;
    }
    public void setArcadeHighScore(int arcadeHighScore) {
        this.arcadeHighScore = arcadeHighScore;
    }
    public int getTriviaHighscore() {
        return triviaHighscore;
    }
    public void setTriviaHighscore(int triviaHighscore) {
        this.triviaHighscore = triviaHighscore;
    }
    public String getTriviaHighscoreCategory() {
        return triviaHighscoreCategory;
    }
    public void setTriviaHighscoreCategory(String triviaHighscoreCategory) {
        this.triviaHighscoreCategory = triviaHighscoreCategory;
    }
    public Set<Role> getRoles() {
        return roles;
    }
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    
    
}
