import { DatePipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '@services/login.service';
import { NewsService } from '@services/news.service';
import { NewsDto } from 'src/app/shared/models/new.model';
import { ReadUserDto } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-news-detail',
  standalone: true,
  imports: [NgIf, DatePipe],
  templateUrl: './news-detail.component.html',
})
export class NewsDetailComponent implements OnInit{

  #newsService = inject(NewsService);
  #route = inject(ActivatedRoute);
  #logInServices = inject(LoginService);

  user!:ReadUserDto;
  
  newResponse!:NewsDto;
  
  ngOnInit(): void {
    const respLogin = this.#logInServices.currentUserExists()
    this.user ={
      _id: respLogin.id,
      email: respLogin.usuario.email,
      role: respLogin.usuario.role,
      img: respLogin.usuario.img,
      token: respLogin.token,
    }
    this.#route.paramMap.subscribe(params => {
      const id = params.get('id');
      if(id){
        this.getNew(id)
      }
    })
    console.log(this.user)
  }
  
  getNew(id:string){
    this.#newsService.getNew(id).subscribe( (resp:any) => {
      console.log(resp)
      if(resp.ok){
        this.newResponse = resp.new
      }
    })
  }
}
