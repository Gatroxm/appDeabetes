import { DatePipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NavigationExtras, Router, RouterLink } from '@angular/router';
import { ExcelService } from '@services/excel.service';
import { LoginService } from '@services/login.service';
import { SamplingService } from '@services/sampling.service';
import { SamplingDto } from 'src/app/shared/models/sampling.model';

@Component({
  selector: 'app-sampling-list',
  standalone: true,
  imports: [NgFor, RouterLink, DatePipe],
  templateUrl: './sampling-list.component.html',
})
export default class SamplingListComponent implements OnInit {
  
  #samplingService = inject(SamplingService);
  #router = inject(Router);
  #excelService = inject(ExcelService)
  #loginService = inject(LoginService);

  listSampling:SamplingDto[]=[];
  
  ngOnInit(): void {
    const id = sessionStorage.getItem('_id')
    this.#samplingService.getSampling(id).subscribe( resp => {
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
