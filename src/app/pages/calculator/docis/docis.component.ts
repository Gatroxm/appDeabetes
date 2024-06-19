import { DecimalPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-docis',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './docis.component.html',
  styleUrl: './docis.component.css',
})
export class DocisComponent implements OnInit {
  #fb = inject(FormBuilder);

  insulina_basal: any[] = [];
  insulina_antes_de_comer = 0;
  formDocis = this.#fb.nonNullable.group({
    peso: [0, Validators.required],
    carboidratosDiarios: [0, Validators.required],
    quatityForUnit: [0, Validators.required],
  });

  ngOnInit(): void {
    this.formDocis.patchValue({
      peso: undefined,
      carboidratosDiarios: undefined,
      quatityForUnit: undefined,
    });
  }

  calculator() {
    this.formDocis.markAllAsTouched();
    if (this.formDocis.invalid) return;

    this.insulina_basal[0] = this.formDocis.getRawValue().peso * 0.2;
    const carboidratosDiario =
      this.formDocis.getRawValue().carboidratosDiarios / 3;
    this.insulina_antes_de_comer =
      carboidratosDiario / this.formDocis.getRawValue().quatityForUnit;

    console.log(carboidratosDiario);
  }
}
