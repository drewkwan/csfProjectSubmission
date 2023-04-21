package csf.project.csfServer.repositories;

import java.io.StringReader;
import java.time.Duration;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import csf.project.csfServer.configs.RedisConfig;
import csf.project.csfServer.models.CustomQuestion;
import csf.project.csfServer.models.CustomQuiz;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Repository
public class RedisCache {
    @Autowired
    @Qualifier(RedisConfig.CACHE_TRIVIA)
    private RedisTemplate<String, String> redisTemplate;

    public void saveNewQuestion(CustomQuiz cq) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        //Get the list of existing question
        ops.set(cq.getId(), cq.quizToJson().toString(), Duration.ofHours(1));
    }

    public void addNewQuestion(String id, CustomQuestion question) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        Optional<CustomQuiz> optCustomQuiz = getCustomQuiz(id);
        CustomQuiz quiz = optCustomQuiz.get();
        quiz.addQuestion(question);
        ops.set(quiz.getId(), quiz.quizToJson().toString(), Duration.ofHours(1));
    }

    public Optional<CustomQuiz> getCustomQuiz(String id) {
        ValueOperations<String, String> ops = redisTemplate.opsForValue();
        String value = ops.get(id);
        System.out.println(value);
        if (value == null) {
            System.out.println("No quiz exists");
            return Optional.empty();
        }

        //read input
        JsonReader reader = Json.createReader(new StringReader(value));
        JsonObject results = reader.readObject();
        CustomQuiz cq = CustomQuiz.fromRedis(results);
        

        return Optional.of(cq);

    }
    
}
