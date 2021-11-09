import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  emailAdress: string;
  password: string;
  errors: string;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.emailAdress = '';
    this.password = '';
    this.errors = '';
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const user: User = {
      email: this.emailAdress,
      password: this.password
    }
    // this.userService.logInUser(user);
    this.authService.signIn(user).subscribe(
      res => {
        console.log("User is logged in" + JSON.stringify(res));
        alert(`${this.emailAdress} has successfully signed in!`)
      },
      error => {
        this.errors = error;
      },
      () => {
        this.router.navigateByUrl('/').then(() => {
          window.location.reload();
        })
      }
    )
  }
}
