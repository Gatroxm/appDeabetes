import { DecimalPipe, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [ ReactiveFormsModule, NgIf, DecimalPipe],
  templateUrl: './calculator.component.html',
})
export class CalculatorComponent implements OnInit  {
  #fb = inject(FormBuilder);
  
  total = 0;
  result = false;

  formCalculator = this.#fb.nonNullable.group({
    gramos:[0,Validators.required],
    quatityForUnit:[0, Validators.required]
  });

  ngOnInit(): void {
    this.formCalculator.patchValue({
      gramos: undefined,
      quatityForUnit:undefined
    })
  }

  calculator(){
    this.formCalculator.markAllAsTouched();
    if (this.formCalculator.invalid) return;

    this.total = (this.formCalculator.getRawValue().gramos / this.formCalculator.getRawValue().quatityForUnit);
    this.result = true;

  }
}
