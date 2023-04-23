package csf.project.csfServer.services;

import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
public class TriviaService {

    
    public String getTriviaQuestions(String category, String difficulty, int limit) {
        
        final String URL_TRIVIA = "https://the-trivia-api.com/api/questions";

        String triviaURL = UriComponentsBuilder.fromUriString(URL_TRIVIA)
                       .queryParam("categories", category)
                       .queryParam("limit", 30)
                       .queryParam("difficulty", difficulty)
                       .toUriString();
        System.out.println(triviaURL);
        RequestEntity<Void> req = RequestEntity.get(triviaURL)
                                        .build();

        RestTemplate template = new RestTemplate();
        ResponseEntity<String> response = template.exchange(req, String.class);
        String payload = response.getBody();

        // System.out.println(payload);
        return payload;
        

    }

}