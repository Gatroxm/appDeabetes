import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BannerComponent } from '@components/banner/banner.component';
import { LoginService } from '@services/login.service';
import { NewsService } from '@services/news.service';
import { NewsDto } from 'src/app/shared/models/new.model';
import { ReadUserDto } from 'src/app/shared/models/user.model';
import { TextDelimiterPipe } from 'src/app/shared/pipe/text-delimiter.pipe';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink ,BannerComponent, TextDelimiterPipe],
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit{
  #newsServices = inject(NewsService);
  logInServices = inject(LoginService);

  user!:ReadUserDto;
  news:NewsDto[] = [];
  
  ngOnInit(): void {
    this.getNews()
  }

  getNews(){
    this.news=[]
    this.#newsServices.getNews().subscribe( (resp:any) => {
      if(resp.ok) {
        this.news = resp.news
      }
    })
  }
  deleteNew(id:string =''){
    this.#newsServices.deleteNew(id).subscribe( (resp:any) => {
      if(resp.ok){
        this.getNews()
      }
    })
  }
}
