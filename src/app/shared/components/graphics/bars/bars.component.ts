import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SamplingService } from '@services/sampling.service';

@Component({
  selector: 'app-bars',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './bars.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BarsComponent implements OnInit {
  @Input('samplings') samplings: any;
  #SamplingService = inject(SamplingService);
  constructor() {
    this.#SamplingService.getSampling('123').subscribe((resp) => {
      console.log(resp);
    });
  }
  ngOnInit(): void {}
  view: [number, number] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
  };

  public single = [
    {
      name: 'Germany',
      value: 8940000,
    },
    {
      name: 'USA',
      value: 5000000,
    },
    {
      name: 'France',
      value: 7200000,
    },
    {
      name: 'UK',
      value: 6200000,
    },
  ];
}
