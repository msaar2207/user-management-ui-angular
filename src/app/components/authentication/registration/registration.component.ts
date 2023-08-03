import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/authServices/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  initRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const user: User = this.registrationForm.value;
      this.authService.registerUser(user).subscribe(
        response => {
          // Handle successful registration
          console.log('Registration successful:', response);
        },
        error => {
          // Handle error during registration
          console.error('Registration failed:', error);
        }
      );
    }
  }
}
