package csf.project.csfServer.controllers;

import java.io.StringReader;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import csf.project.csfServer.dao.RoleDao;
import csf.project.csfServer.models.JwtRequest;
import csf.project.csfServer.models.JwtResponse;
import csf.project.csfServer.models.Role;
import csf.project.csfServer.models.User;
import csf.project.csfServer.services.JwtService;
import csf.project.csfServer.services.UserService;
import jakarta.annotation.PostConstruct;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@RestController
@CrossOrigin
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private RoleDao roleDao;

    @Autowired
    private UserService userService;

    @PostConstruct
    public void initRolesAndUsers() {
        userService.initRolesAndUser();
    }
    
    @PostMapping("/registerUser")
    public User registerNewUser(@RequestBody User user) {
        Role role = roleDao.findById("User").get();
        Set<Role> roles = new HashSet<>();
        roles.add(role);
        user.setRoles(roles);
        return userService.registerNewUser(user);
    }

    @PostMapping(path="/login")
    // public ResponseEntity<String> createJwtToken(@RequestBody JwtRequest request) throws Exception {
    public JwtResponse createJwtToken(@RequestBody JwtRequest request) throws Exception {
        System.out.println("Logging in user");
        return jwtService.createJwtToken(request);
        // return ResponseEntity.ok(response.toJson().toString());
    }

    @GetMapping("/forAdmins")
    @PreAuthorize("hasRole('Admin')")
    public String forAdmin() {
        return "This URL is only accessible to admin users.";
    }

    @GetMapping("/forUsers") 
    @PreAuthorize("hasRole('User')")
    public String forUsers() {
        return "This URL is accessible to all users.";
    }

    @GetMapping(path="/getAllUsers", produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> getAllUsers() {
        List<String> users = userService.getAllUsers();
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (String user : users) {
            JsonObject json = Json.createObjectBuilder()
                                    .add("username", user)
                                    .build();
            arrBuilder.add(json);
        }
        JsonArray payload = arrBuilder.build();
        System.out.println(payload.toString());
        return ResponseEntity.ok(payload.toString());
    }

    @PostMapping(path="/createUser", consumes =MediaType.APPLICATION_JSON_VALUE) 
    @ResponseBody
    public ResponseEntity<String> createUser(@RequestBody String body) {
        
        //get user details
        JsonReader reader = Json.createReader(new StringReader(body));
        JsonObject json = reader.readObject();
        String username = json.getString("username");
        String password = json.getString("password");

        //create user
        int count = userService.createUser(username, password);

        if (count == 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User failed to create");
        }

        JsonObject payload = Json.createObjectBuilder()
                            .add("message", "user %s successfully created".formatted(username))
                            .build();

        return ResponseEntity.ok(payload.toString());


    }

    @GetMapping(path="/getTriviaHighscore")
    @ResponseBody
    public ResponseEntity<String> getTriviaHighScore(@RequestParam String username) {
        Integer highscore = userService.getTriviaHighscore(username);
        JsonObject response = Json.createObjectBuilder()
                            .add("highscore", highscore)
                            .build();
        return ResponseEntity.ok(response.toString());
        
    }
    
    @PutMapping(path="/updateTriviaHighscore", consumes = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ResponseEntity<String> postTriviaHighscore(@RequestBody String body) {

        //get highscore
        JsonReader reader = Json.createReader(new StringReader(body));
        JsonObject json = reader.readObject();
        int highscore = json.getInt("highscore");
        String username = json.getString("username");
        String category = json.getString("category");

        userService.insertScore(username, category, highscore);
        JsonObject response = Json.createObjectBuilder()
                            .add("message", "score updated successfully")
                            .build();
        return ResponseEntity.ok(response.toString());
    }


}
