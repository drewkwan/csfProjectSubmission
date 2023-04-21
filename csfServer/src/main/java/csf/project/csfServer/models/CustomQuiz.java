package csf.project.csfServer.models;

import java.util.LinkedList;
import java.util.List;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;

public class CustomQuiz {

    private String id;
    private List<CustomQuestion> questions;

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public List<CustomQuestion> getQuestions() {
        return questions;
    }
    public void setQuestions(List<CustomQuestion> questions) {
        this.questions = questions;
    }
    public void addQuestion(CustomQuestion question) {
        this.questions.add(question);
    }

    public static CustomQuiz fromRedis(JsonObject doc) {
        final CustomQuiz quiz = new CustomQuiz();
        quiz.setId(doc.getString("id"));
        JsonArray questionsJson = doc.getJsonArray("questions");
        List<CustomQuestion> questions = new LinkedList<>();
        for (int i =0; i<questionsJson.size(); i++) {
            questions.add(CustomQuestion.fromRedis(questionsJson.getJsonObject(i)));
        }
        quiz.setQuestions(questions);
        return quiz;

    }

    public JsonObject quizToJson() {

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder();
        for (int i=0; i< questions.size(); i++) {
            arrayBuilder.add(questions.get(i).toJson());
        }

        JsonArray questionsJson = arrayBuilder.build();
        return Json.createObjectBuilder()
                .add("id", id)
                .add("questions", questionsJson)
                .build();
    }

}
