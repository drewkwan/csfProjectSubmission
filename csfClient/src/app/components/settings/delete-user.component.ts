import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {
  constructor(public dialogRef: MatDialogRef<DeleteUserComponent>, private fb: FormBuilder, private userSvc: UserService, private router:Router) {}

  deleteForm!: FormGroup;
  currUser!: User;

  ngOnInit(): void {
    this.deleteForm= this.createDeleteForm();
  }

  
  createDeleteForm(): FormGroup {
    return this.fb.group({
      username: this.fb.control('', [Validators.required])
    })
  }

  
  deleteUser() {
    console.log(this.deleteForm.value)
    const username = this.deleteForm.get('username')?.value;
    const currUser = JSON.parse(localStorage.getItem('userData')!)
    if (username==currUser.sub) {
      this.userSvc.deleteUser(username).then(response=> {
        console.log(response)
        alert("User successfully deleted!");
        this.dialogRef.close();
        localStorage.removeItem('userData');
        this.router.navigate([''])
      }).catch(err=> {
        console.error(err);
        alert("Delete failed! Check that username matches current user!")
        this.decline()
      })
    } else {
      alert("Username does not match current user");
      this.dialogRef.close();
    }
    
  }

  decline() {
    this.dialogRef.close();
  }
}
