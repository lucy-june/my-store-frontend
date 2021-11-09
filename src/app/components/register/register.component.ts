import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username: string;
  emailAdress: string;
  password: string;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
    this.username = '';
    this.emailAdress = '';
    this.password = '';
   }

  ngOnInit(): void {
    const user = {
      name: this.username,
      email: this.emailAdress,
      password: this.password
    }
  }

  onSubmit(): void {
    const user = {
      name: this.username,
      email: this.emailAdress,
      password: this.password
    }
    alert(`${this.emailAdress} has successfully signed in!`);
    //this.userService.postUser(user);
    this.authService.signUp(user).subscribe((res) => {
      console.log("User is logged in " + JSON.stringify(res));
      this.router.navigateByUrl('/').then(() => {
        window.location.reload();
      })
    })
  }


}
