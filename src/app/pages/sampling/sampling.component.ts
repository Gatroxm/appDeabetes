import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-sampling',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sampling.component.html',
})
export class SamplingComponent {
  #fb = inject(FormBuilder);
  formSampling = this.#fb.nonNullable.group({
    muestra:[],
    fecha:[],
    hora:[],
    descripcon:[],
    jornada:[]
  });

  send(){
    this.formSampling.markAllAsTouched();
    if (this.formSampling.invalid) return;

    console.log(this.formSampling.getRawValue());
  }
}
