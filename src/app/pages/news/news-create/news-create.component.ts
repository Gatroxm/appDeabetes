import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BannerComponent } from '@components/banner/banner.component';
import { NewsService } from '@services/news.service';
import { AngularEditorModule } from '@wfpena/angular-wysiwyg';
import { NewsDto } from 'src/app/shared/models/new.model';


@Component({
  selector: 'app-news-create',
  standalone: true,
  imports: [BannerComponent,  ReactiveFormsModule, AngularEditorModule],
  templateUrl: './news-create.component.html',
})
export class NewsCreateComponent implements OnInit {
  #fb = inject(FormBuilder);
  #newsService = inject(NewsService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  edit=false;

  formNew = this.#fb.nonNullable.group({
    _id:[''],
    title:[''],
    author:[''],
    exerpt:[''],
    content:['']
  })
  
  ngOnInit(): void {
    this.#route.paramMap.subscribe(param =>{
      const id = param.get('id');
      if(id){
        this.edit = true;
        this.getNewById(id);
      }
    });
  }
  
  getNewById(id:string){
    this.#newsService.getNew(id).subscribe( (resp:any) =>{
      if(resp.ok){

        this.formNew.patchValue({
          _id: resp.new._id,
          author: resp.new.author,
          exerpt: resp.new.exerpt,
          content: resp.new.content,
          title: resp.new.title,
        })
      }
    })
  }

  guardar(){
    this.formNew.markAllAsTouched();
    if (this.formNew.invalid) return;
    if(this.edit){
      this.#newsService.putNew(this.formNew.getRawValue()).subscribe((resp:any)=>{
        if(resp.ok){
          this.#router.navigate(['news', resp.news._id])
        }
      })
    }else {
      this.#newsService.postNew(this.formNew.getRawValue()).subscribe((resp:any)=>{
      if(resp.ok){
        this.#router.navigate(['news'])
      }
      })
    }
  }
}
