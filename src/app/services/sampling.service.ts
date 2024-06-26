import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginService } from './login.service';
import { ResponseServiceDTO } from '../shared/models/response.model';
import { SamplingDto } from '../shared/models/sampling.model';

@Injectable()
export class SamplingService {
  #loginService = inject(LoginService);
  #apiUrl = environment.apiUrl;
  userId = this.#loginService.currentUserExists();

  simpling = new BehaviorSubject<ResponseServiceDTO>({ data: [], ok: true });

  constructor(private http: HttpClient) {}

  public getSampling(id: any): Observable<ResponseServiceDTO> {
    this.http
      .get<ResponseServiceDTO>(
        `${this.#apiUrl}sampling/byUser/${this.userId.id ? this.userId.id : id}`
      )
      .subscribe((resp) => this.simpling.next(resp));
    return this.simpling;
  }

  public getSamplingById(id: string): Observable<ResponseServiceDTO> {
    return this.http.get<ResponseServiceDTO>(`${this.#apiUrl}sampling/${id}`);
  }

  public postSamplin(sampling: SamplingDto): Observable<ResponseServiceDTO> {
    return this.http.post<ResponseServiceDTO>(
      `${this.#apiUrl}sampling/`,
      sampling
    );
  }

  public putSampling(sampling: SamplingDto): Observable<ResponseServiceDTO> {
    return this.http.put<ResponseServiceDTO>(
      `${this.#apiUrl}sampling/${sampling._id}`,
      sampling
    );
  }

  public searchSampling(param: string) {
    return this.http.get<ResponseServiceDTO>(
      `${
        this.#apiUrl
      }sampling/?muestra=${param}&fecha=${param}&jornada=${param}`
    );
  }
}
