import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models/user.model';

@Injectable()
export class UserService {

  #apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  createUser(user: any) {
    return this.http.post(
      `${this.#apiUrl}user`,
      user
    );
  }

  UpdateUser(user:User){
    return this.http.put(`${this.#apiUrl}user/${user._id}`, user);
  }

  
}
