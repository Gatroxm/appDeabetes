import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewsDto } from '../shared/models/new.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseServiceNewsDto } from '../shared/models/response.model';

@Injectable()
export class NewsService {

  #apiUrl = environment.apiUrl;
  news = new BehaviorSubject<ResponseServiceNewsDto>({news:[], ok:true})

  constructor( private http: HttpClient) { }

  getNews(): Observable<ResponseServiceNewsDto>{
    this.http.get<ResponseServiceNewsDto>(`${this.#apiUrl}new`)
      .subscribe(resp => this.news.next(resp));
    return this.news
  }

  getNew(id:string){
    return this.http.get(`${this.#apiUrl}new/${id}`);
  }

  postNew(newCreated:NewsDto){
    return this.http.post(`${this.#apiUrl}new`, newCreated)
  }
  putNew(newCreated:NewsDto){
    return this.http.put(`${this.#apiUrl}new/${newCreated._id}`, newCreated)
  }

  deleteNew(id:string){
    return this.http.delete(`${this.#apiUrl}new/${id}`);
  }
}
