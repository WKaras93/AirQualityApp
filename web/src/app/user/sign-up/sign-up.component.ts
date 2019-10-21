import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    };
  }

  resetForm(form?: NgForm) {
    if (form != null) {
      form.reset();
    }
    this.user = {
      username: '',
      email: '',
      firstname: '',
      lastname: '',
      password: ''
    };
  }

  registerUser() {
    this.userService.registerUser(this.user).subscribe(
      response => {
        alert('registration succeed');
      },
      error => console.log('error', error)
    );
  }
}
