package csf.project.csfServer.models;

import java.util.LinkedList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

public class CustomQuestion {

    private String question;
    private String correctAnswer;
    private List<String> incorrectAnswers;

    public String getQuestion() {
        return question;
    }
    public void setQuestion(String question) {
        this.question = question;
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

    public static CustomQuestion fromRedis(JsonObject doc) {
        final CustomQuestion cq = new CustomQuestion();
        cq.setQuestion(doc.getString("question"));
        cq.setCorrectAnswer(doc.getString("correctAnswer"));
        //incorrectAnswers
        List<String> incorrectList = new LinkedList<>();
        JsonArray incorrectJson = doc.getJsonArray("incorrectAnswers");
        for (int i=0; i< incorrectJson.size();i++) {
            incorrectList.add(incorrectJson.getString(i));
        }
        cq.setIncorrectAnswers(incorrectList);
        return cq;

        
    }
    public JsonObject toJson() {
        //convert incorrect answers to jsonArray
        JsonArrayBuilder arrBuilder = Json.createArrayBuilder();
        for (String q: incorrectAnswers) {
            arrBuilder.add(q);
        }
        JsonArray incorrectJsonArray = arrBuilder.build();

        return Json.createObjectBuilder()
                .add("question", question)
                .add("correctAnswer", correctAnswer)
                .add("incorrectAnswers", incorrectJsonArray)
                .build();
    }



}
