import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/authServices/auth.service';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.user = this.authService.user;
  }

  ngOnInit(): void {
    const options = {
      strings: ['', 'Full-Stack', 'WEB', 'Backend', 'Angular', 'React'],
      typeSpeed: 120,
      backSpeed: 100,
      loop: true,
    };

    const typed = new Typed('.typed', options);
    typed.reset(true)
  }
  logout() {
    this.authService.logout()
      .pipe(
        tap(__ => this.router.navigate(['/login']))
      )
      .subscribe();
  }

}
