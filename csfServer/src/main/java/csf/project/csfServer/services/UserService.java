package csf.project.csfServer.services;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import csf.project.csfServer.dao.RoleDao;
import csf.project.csfServer.dao.UserDao;
import csf.project.csfServer.models.Role;
import csf.project.csfServer.models.Score;
import csf.project.csfServer.models.User;
import csf.project.csfServer.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private UserDao userDao;

    @Autowired 
    private RoleDao roleDao;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public Integer createUser(String username, String password) {
        return userRepo.createUser(username, password);
    }

    public List<Score> getAllHighscores() {
        SqlRowSet rs = userRepo.getAllHighscores();
        List<Score> scores = new LinkedList<>();
        while (rs.next()) {
            scores.add(Score.create(rs));
        }
        return scores;
    }

    public List<String> getAllUsers() {
        SqlRowSet rs = userRepo.getAllUsers();
        List<String> users = new LinkedList<>();
        while (rs.next()) {
            String username = rs.getString("username");
            users.add(username);
        }
        return users;
    }

    public Integer getTriviaHighscore(String username) {
        return userRepo.getTriviaHighScore(username);
    }

    // @Transactional()
    public void insertScore(String username, String category, int score) {
        //get users highscore
        int currHighscore = getTriviaHighscore(username);
        if (score> currHighscore) {
            userRepo.updateUserTriviaHighscore(score, category, username);
            userRepo.insertTriviaScoreInLeaderboard(username, category, score);
        } else {
            userRepo.insertTriviaScoreInLeaderboard(username, category, score);
        }
        
    }

    public void initRolesAndUser() {
        Role adminRole = new Role();
        adminRole.setRoleName("Admin");
        adminRole.setRoleDescription("Admin role with elevated privileges");
        roleDao.save(adminRole);

        Role userRole = new Role();
        userRole.setRoleName("User");
        userRole.setRoleDescription("Default user role for newly created users");
        roleDao.save(userRole);

        User adminUser = new User();
        adminUser.setUsername("adminUserBossMan");
        adminUser.setPassword(getEncodedPassword("adminPassword"));
        Set<Role> adminRoles = new HashSet<>();
        adminRoles.add(adminRole);
        adminUser.setRoles(adminRoles);
        userDao.save(adminUser);
    }

    public User registerNewUser(User user) {
        Role role = roleDao.findById("User").get();
        Set<Role> userRoles = new HashSet<>();
        userRoles.add(role);
        user.setRoles(userRoles);
        user.setPassword(getEncodedPassword(user.getPassword()));

        return userDao.save(user);
    }


    public String getEncodedPassword(String password) {
        return passwordEncoder.encode(password);
    }

}
