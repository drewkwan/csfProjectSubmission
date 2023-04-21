package csf.project.csfServer.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import csf.project.csfServer.models.JwtRequest;
import csf.project.csfServer.models.JwtResponse;
import csf.project.csfServer.services.JwtService;

@RestController
@CrossOrigin
public class JwtController {
    
    @Autowired
    private JwtService jwtService;

    @PostMapping(path="/login")
    // public ResponseEntity<String> createJwtToken(@RequestBody JwtRequest request) throws Exception {
    public JwtResponse createJwtToken(@RequestBody JwtRequest request) throws Exception {
        return jwtService.createJwtToken(request);
        // return ResponseEntity.ok(response.toJson().toString());
    }
}
