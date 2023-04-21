package csf.project.csfServer.models;

import java.util.LinkedList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

public class Question {
    private String category;
    private String id;
    private String correctAnswer;
    private List<String> incorrectAnswers;
    private String question;
    private String difficulty;

    public String getCategory() {
        return category;
    }
    public void setCategory(String category) {
        this.category = category;
    }
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getCorrectAnswer() {
        return correctAnswer;
    }
    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
    public List<String> getIncorrectAnswers() {
        return incorrectAnswers;
    }
    public void setIncorrectAnswers(List<String> incorrectAnswers) {
        this.incorrectAnswers = incorrectAnswers;
    }
    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
    }
    public String getDifficulty() {
        return difficulty;
    }
    public void setDifficulty(String difficulty) {
        this.difficulty = difficulty;
    }

    public static Question create(JsonObject doc) {
        Question q = new Question();
        q.setCategory(doc.getString("category"));
        q.setId(doc.getString("id"));
        q.setCorrectAnswer(doc.getString("correctAnswer"));
        //incorrect answers
        List<String> incorrectList = new LinkedList<>();
        JsonArray incorrectJson = doc.getJsonArray("incorrectAnswers");
        for (int i=0; i < incorrectJson.size(); i++) {
            incorrectList.add(incorrectJson.getString(i));
        }
        q.setIncorrectAnswers(incorrectList);
        q.setQuestion(doc.getString("question"));
        q.setDifficulty(doc.getString("difficulty"));
        return q;
        
    }

    public JsonObject toJson() {

        //convert incorrect answers to jsonArray
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (String q: incorrectAnswers) {
            arrBuilder.add(q);
        }
        JsonArray incorrectJsonArray = arrBuilder.build();

        return Json.createObjectBuilder()
                .add("category", category)
                .add("id", id)
                .add("correctAnswer", correctAnswer)
                .add("incorrectAnswers", incorrectJsonArray)
                .add("question", question)
                .add("difficulty", difficulty)
                .build();
    }
    
}
