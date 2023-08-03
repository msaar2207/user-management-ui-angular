import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/models/user/user.model';
import { environment } from 'src/environments/environment';

let gapi: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  private userSubj: BehaviorSubject<User> = new BehaviorSubject<User>({});
  user$: Observable<User> = this.userSubj.asObservable();
  private isGoogleScriptLoaded = false;

  constructor(private http: HttpClient) {
    // Initialize isLoggedIn based on whether there's a token in local storage
    this.isLoggedInSubject.next(!!localStorage.getItem('token'));
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password }).pipe(
      map(response => {
        if (response && response.token) {
          // Assuming the backend returns a token and user upon successful login
          this.isLoggedInSubject.next(true);
          // Save the token in local storage or a secure cookie for future API requests
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.userSubj.next(response.user);
          return true;
        } else {
          this.isLoggedInSubject.next(false);
          return false;
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        this.isLoggedInSubject.next(false);
        return of(false);
      })
    );
  }
  registerUser(user: User): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post<any>(url, user);
  }
  logout(): Observable<any> {
    const url = `${this.apiUrl}/logout`;
    return this.http.post<any>(url, {}).pipe(
      tap(__ => {
        this.isLoggedInSubject.next(false);
        // Clear the token from local storage or the secure cookie
        localStorage.removeItem('token');
      })
    )
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.value;
  }
  get user() {
    console.log('user', this.userSubj.value, 'json user', localStorage.getItem('user'))
    return Object.keys(this.userSubj.value).length ? this.userSubj.value : JSON.parse(localStorage.getItem('user') || '')
  }
  async loginWithGoogle(): Promise<void> {
    try {
      if (!this.isGoogleScriptLoaded) {
        await this.loadGoogleSignInScript();
      }

      const googleUser = await this.getGoogleUser();

      const id_token = googleUser.getAuthResponse().id_token;

      // Call your backend API to handle the Google login (Replace YOUR_GOOGLE_LOGIN_ENDPOINT)
      const response = await this.http.post<any>('YOUR_GOOGLE_LOGIN_ENDPOINT', { id_token }).toPromise();

      if (response && response.token) {
        // Assuming the backend returns a token upon successful login
        this.isLoggedInSubject.next(true);
        // Save the token in local storage or a secure cookie for future API requests
        localStorage.setItem('token', response.token);
      } else {
        this.isLoggedInSubject.next(false);
      }
    } catch (error) {
      console.error('Google login failed:', error);
      this.isLoggedInSubject.next(false);
    }
  }

  private async loadGoogleSignInScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/platform.js';
      script.onload = () => {
        this.isGoogleScriptLoaded = true;
        resolve();
      };
      script.onerror = (error) => {
        this.isGoogleScriptLoaded = false;
        reject(error);
      };
      document.body.appendChild(script);
    });
  }

  private getGoogleUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      (window as any).gapi.load('auth2', () => {
        (window as any).gapi.auth2.init({
          client_id: '618289446220-r1buf99356ggtu3acburfh4uj5u2btff.apps.googleusercontent.com'
        }).then(() => {
          const auth2 = (window as any).gapi.auth2.getAuthInstance();
          auth2.signIn().then(
            (googleUser: any) => resolve(googleUser),
            (error: any) => reject(error)
          );
        });
      });
    });
  }

}
