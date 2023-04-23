package csf.project.csfServer.controllers;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import csf.project.csfServer.models.CustomQuestion;
import csf.project.csfServer.models.CustomQuiz;
import csf.project.csfServer.models.Question;
import csf.project.csfServer.models.Score;
import csf.project.csfServer.repositories.RedisCache;
import csf.project.csfServer.services.TriviaService;
import csf.project.csfServer.services.UserService;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Controller
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class TriviaController {
    
    @Autowired
    private TriviaService triviaSvc;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private UserService userSvc;


    @GetMapping(path="/questions")
    @ResponseBody
    public ResponseEntity<String> getQuestions(@RequestParam String category, @RequestParam String difficulty) {
        //Instantiate list of questions
        List<Question> questions = new LinkedList<>();
        //get params from body
        Integer limit = 20;
        // System.out.println(category);
        // System.out.println(difficulty);

        String data = triviaSvc.getTriviaQuestions(category, difficulty, limit);
        JsonReader triviaReader = Json.createReader(new StringReader(data));
        JsonArray questionsJson = triviaReader.readArray();


        // //call external api
        // JsonArray questionsJson = triviaSvc.getTriviaQuestions(category, difficulty, limit);
        for (int i =0; i < questionsJson.size(); i++) {
            questions.add(Question.create((JsonObject) questionsJson.get(i)));
        }

        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (int j=0; j < questions.size(); j++) {
            arrBuilder.add(questions.get(j).toJson());
        }
        JsonArray payload = arrBuilder.build();

        return ResponseEntity.ok(payload.toString());

    } 

    @GetMapping(path="/leaderboard") 
    @ResponseBody
    public ResponseEntity<String> getLeaderboard() {
        List<Score> scores = userSvc.getAllHighscores();
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (Score score: scores) {
            arrBuilder.add(score.toJson());
        }
        JsonArray payload = arrBuilder.build();
        return ResponseEntity.ok(payload.toString());
    }

    @GetMapping(path="/getHighscore") 
    @ResponseBody
    public ResponseEntity<String> getHighscore(@RequestParam String username) {
        JsonReader reader = Json.createReader(new StringReader(username));
        JsonObject json = reader.readObject();
        String user = json.getString("username");

        Integer highscore = userSvc.getTriviaHighscore(user);
        return ResponseEntity.ok(highscore.toString());
        
    }

    @GetMapping(path="/getCustom/{id}") 
    @ResponseBody
    public ResponseEntity<String> getCustomQuiz(@PathVariable String id) {
        //Get the quiz from redis
        Optional<CustomQuiz> optQuiz = redisCache.getCustomQuiz(id);
        if (optQuiz.isEmpty()) {
            String error = "No such quiz exists!";
            JsonObject response = Json.createObjectBuilder()
                                        .add("error", error)
                                        .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response.toString());
        }

        CustomQuiz cq = optQuiz.get();
        return ResponseEntity.ok(cq.quizToJson().toString());
    }


    //custom quiz to Redis
    @PostMapping(path="/postCustom") 
    @ResponseBody
    public ResponseEntity<String> createCustomQuestion(@RequestBody String payload) {

        //Process payload
        System.out.println(payload);
        JsonReader reader = Json.createReader(new StringReader(payload));
        JsonObject json = reader.readObject();
        String id = json.getString("id");
        
        String question = json.getString("question");
        String correctAnswer = json.getString("correctAnswer");
        //get array of incorrect answers
        JsonArray incorrectJson = json.getJsonArray("incorrectAnswers");
        List<String> incorrectAnswers = new LinkedList<>();
        for (int i =0; i< incorrectJson.size(); i++) {
            incorrectAnswers.add(incorrectJson.get(i).toString());
        }       
        
        //Create question
        CustomQuestion cq = new CustomQuestion();
        cq.setCorrectAnswer(correctAnswer);
        cq.setIncorrectAnswers(incorrectAnswers);
        cq.setQuestion(question);

        //Retrieve quiz from cache
        Optional<CustomQuiz> optQuiz = redisCache.getCustomQuiz(id);

        //if empty, create new quiz
        if (optQuiz.isEmpty()) {
            //Create custom quiz
            CustomQuiz quiz = new CustomQuiz();
            quiz.setId(id);
            List<CustomQuestion> questionList = new LinkedList<>();
            questionList.add(cq);
            quiz.setQuestions(questionList);
            //save to redis
            redisCache.saveNewQuestion(quiz);
            JsonObject response = Json.createObjectBuilder()
                                    .add("message", "Quiz has been created!")
                                    .build();
            return ResponseEntity.ok(response.toString());

        } else {

            CustomQuiz quiz = optQuiz.get();
            redisCache.addNewQuestion(quiz.getId(), cq);
            JsonObject response = Json.createObjectBuilder()
                                    .add("message", "Quiz has been updated!")
                                    .build();
            return ResponseEntity.ok(response.toString());

        }





        

    }


    

}
