import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SamplingService } from '@services/sampling.service';
import { SamplingDto } from 'src/app/shared/models/sampling.model';


@Component({
  selector: 'app-sampling-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './sampling-detail.component.html'
})
export class SamplingDetailComponent implements OnInit{
  
  #samplingService = inject(SamplingService);
  #route = inject(ActivatedRoute);

  samplig!: SamplingDto;

  ngOnInit(): void {

    this.#route.paramMap.subscribe(params => {
      const id = params.get('id')
      if (id) {
        this.getMuestra(id);
      }
    });
    
  }

  getMuestra(id: string) {
    this.#samplingService.getSamplingById(id).subscribe(resp => {
      console.log(resp)
      this.samplig = resp.data;
    })
  }

  
}
