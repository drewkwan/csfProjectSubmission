import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registrationForm!: FormGroup;
  displayErrorMessage!: boolean;
  userList: string[] = [];


  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router, private authSvc: AuthService) { }
  
  ngOnInit() {
    this.registrationForm = this.createRegistrationForm();
  }

  createRegistrationForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control('',[Validators.required]),
      password: this.fb.control('',[Validators.required])
    })
  }

  isFormInvalid(): boolean {
    return this.registrationForm.invalid;
  }

  register() {
    console.log(this.registrationForm.value);
    const username = this.registrationForm.get('username')?.value;
    const password = this.registrationForm.get('password')?.value;
    //check if username exists
    this.userSvc.getAllUsers().subscribe(response=> {
      console.log("List of users: ", response)
      this.userList = response;
    });

    for (let i =0; i<=this.userList.length; i++) {
      if (username === this.userList[i])
        this.displayErrorMessage = true;
        this.router.navigate(['/register']);
    }

    this.authSvc.register(this.registrationForm.value).then(response => {
      console.log(response)
    }).catch(error => {
      console.error(error);
      this.displayErrorMessage=true;
    })

    this.router.navigate(['/home']);
  }

}
