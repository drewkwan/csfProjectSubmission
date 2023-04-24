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
  loading:boolean = false;

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
    this.userList = [];
    this.loading=true;
    console.log(this.registrationForm.value);
    const username:string = this.registrationForm.get('username')?.value;
    //check if username exists
    this.userSvc.getAllUsers().then(response=> {
      for (let i=0; i<response.length; i++) {
        this.userList.push(response[i].username);
      }  if (this.userList.includes(username)) {
        console.log(username)
        this.loading=false;
        alert("Username already exists");
        this.displayErrorMessage = true;
        this.router.navigate(['/register']);
      } else {
        this.authSvc.register(this.registrationForm.value).then(response => {
          console.log(response)
          this.loading=false;
          alert(`User ${username} created successfully!`)
          this.router.navigate(['']);
        }).catch(error => {
          console.error(error);
          this.displayErrorMessage=true;
        })
    
        this.router.navigate(['/home']);
      }
    });

    
  }

}
