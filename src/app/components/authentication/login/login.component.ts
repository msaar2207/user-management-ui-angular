import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar
import { AuthService } from 'src/app/services/authServices/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe(
        success => {
          if (success) {
            // Redirect to the user-list page on successful login.
            this.router.navigate(['/users']);
          } else {
            // Show login failed notification
            this.snackBar.open('Login failed. Invalid credentials.', 'Close', { duration: 3000 });
          }
        },
        error => {
          // Handle login errors (show an error notification)
          this.snackBar.open('An error occurred while logging in.', 'Close', { duration: 3000 });
        }
      );
    }
  }
  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }
}
