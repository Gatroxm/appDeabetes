import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { ExcelService } from '@services/excel.service';
import { SamplingService } from '@services/sampling.service';
import { SamplingDto } from 'src/app/shared/models/sampling.model';

@Component({
  selector: 'app-sampling-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './sampling-list.component.html',
})
export default class SamplingListComponent implements OnInit {
  
  #samplingService = inject(SamplingService);
  #router = inject(Router);
  #excelService = inject(ExcelService)

  listSampling:SamplingDto[]=[];
  
  ngOnInit(): void {
    this.#samplingService.getSampling().subscribe( resp => {
      if(resp.ok){
        this.listSampling = resp.data;
      }
    });
  }

  redirect(id:string = ''){
    const queryParams = {id: id};
    const navigationExtras: NavigationExtras = {
      queryParams
    };
    this.#router.navigate(['sampling/form'], navigationExtras);
  }
  exportTable(): void {
    this.#excelService.exportTableToExcel('excel-table', 'table_data');
  }
}
