import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'csfClient';
  currUser!: User | null;
  
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.autoLogin();
    
  }

  autoLogin() {

    this.currUser = JSON.parse(localStorage.getItem("userData")!);
    if (!this.currUser) {
      this.router.navigate(['']);
    }
    
    const expirationDate = this.currUser!.exp * 1000;
      if (new Date().getTime()<expirationDate && this.currUser) {
        this.router.navigate(['/home']);
      } else {
        this.logout()
      }
  }

  logout() {
    localStorage.removeItem("userData");
    this.currUser = null;
    this.router.navigate([''])
  }
}
