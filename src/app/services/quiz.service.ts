import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from '../shared/models/quiz.model';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  #loginService = inject(LoginService);
  #apiUrl = environment.apiUrl;

  userId = this.#loginService.currentUserExists();
  constructor(private http: HttpClient) {}

  getAllQuiz(): Observable<any> {
    return this.http.get(`${this.#apiUrl}quiz/by-user/${this.userId.id}`);
  }

  getQuiz(id: string): Observable<any> {
    return this.http.get(`${this.#apiUrl}quiz/${id}`);
  }
  createQuiz(quiz: any): Observable<any> {
    return this.http.post(`${this.#apiUrl}quiz`, quiz);
  }

  updateQuiz(quiz: Quiz): Observable<any> {
    return this.http.put(`${this.#apiUrl}quiz/${quiz._id}`, quiz);
  }

  deleteQuiz(id: any): Observable<any> {
    return this.http.delete(`${this.#apiUrl}quiz/${id}`);
  }
}
