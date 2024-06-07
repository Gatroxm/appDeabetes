import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ImagesService {

  #apiUrl = environment.apiUrl;
  constructor(private http:HttpClient) { }

  getImagen(type:string, id:string){
    return `${this.#apiUrl}images/${type}/${id}`;
  }

  uploadImage(
    imagen:File,
    type: 'usuario' | 'news',
    id:string
  ) {
    const formData = new FormData();
    formData.append('imagen', imagen);
    console.log(formData)

    return this.http.put(`${this.#apiUrl}upload/${type}/${id}`,formData)
  }

}
