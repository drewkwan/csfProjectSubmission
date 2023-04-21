import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { LoginData } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {



  registrationForm!: FormGroup;
  loginForm!: FormGroup;

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router: Router, private userSvc: UserService) {
    
  }

  ngOnInit() {
    this.registrationForm = this.createRegistrationForm()
    this.loginForm = this.createLoginForm()
  }

  createRegistrationForm(): FormGroup {  
    return this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }

  loginUser() {
    console.log(this.loginForm.value)
    const formData:LoginData = this.loginForm.value;
    this.authSvc.login(formData).then(response=>{

      const token = response.jwtToken;      
      this.userSvc.decodeUser(token);
      this.router.navigate(['/home']);
    }).catch(error => {
      console.log(error)
    })

  }

  submitForm() {
    const formData = this.registrationForm.value;
    this.authSvc.register(formData)

  }

  createLoginForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
  }
  

}
