import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginDto } from '../shared/models/login.model';
import { ReadUserDto } from '../shared/models/user.model';

@Injectable()
export class LoginService {

  #apiUrl = environment.apiUrl;

  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router,) { }

  login(data: LoginDto) {
    return this.http.post<any>(`${this.#apiUrl}login`, data).pipe(
      tap(usuario => {
        this.signOauth(usuario)
      }
      )
    );
  }
  signOauth(data: ReadUserDto) {

    this.setToken(data.token);
    this.saveSessionStorage(data);
    this.router.navigate(['']);
  }
  currentUserExists() {
    const currentUser = sessionStorage.getItem('user');
    return JSON.parse(currentUser || 'null');
  }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
    localStorage.setItem('token', token); // Almacena el token en el almacenamiento local para mantener la sesión
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('token')
    }
    return this.token;
  }

  saveSessionStorage(user: ReadUserDto) {

    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('role', JSON.stringify(user.role));
  }

  logOut() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('role');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
