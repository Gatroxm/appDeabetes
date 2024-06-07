
import { NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { SamplingService } from '@services/sampling.service';
import { ToastService } from '@services/toast.service';
import { SamplingDto } from 'src/app/shared/models/sampling.model';

@Component({
  selector: 'app-sampling-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './sampling-create.component.html',
})
export class SamplingCreateComponent implements OnInit {

  #samplingService = inject(SamplingService);
  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #toastService = inject(ToastService);
  #loginService = inject(LoginService);

  user!:any;
  edit = false;
  formSampling = this.#fb.nonNullable.group({
    muestra: [],
    fecha: [''],
    hora: [''],
    descripcon: [''],
    jornada: [''],
    user:[''],
    _id: [''],
  });

  ngOnInit(): void {
    this.user = this.#loginService.currentUserExists()
    this.formSampling.patchValue({
      user: this.user.id
    })
    this.#route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.edit = true;
        this.getMuestra(id);
      }
    });
  }

  send() {
    this.formSampling.markAllAsTouched();
    if (this.formSampling.invalid) return;

    if(this.edit){
      this.editMuestra(this.formSampling.getRawValue());
    } else {
      this.createMuestra(this.formSampling.getRawValue());
    }
  }

  getMuestra(id: string) {
    
    this.#samplingService.getSamplingById(id).subscribe(resp => {
      this.formSampling.patchValue({
        _id: resp.data._id,
        muestra: resp.data.muestra,
        descripcon: resp.data.descripcon,
        fecha: resp.data.fecha,
        hora: resp.data.hora,
        jornada: resp.data.jornada || '',
        user: this.user.id
      })
    })
  }

  createMuestra(muestra:SamplingDto){
    this.#samplingService.postSamplin(muestra).subscribe(resp=> {
      this.#toastService.dispatchToast({
        message: `${resp.mensaje}`,
        dispose: 'Aceptar',
      });
      this.#router.navigate(['sampling', resp.data._id]);
    });
  }

  editMuestra(muestra:SamplingDto){
    this.#samplingService.putSampling(muestra).subscribe(resp=> {
      this.#toastService.dispatchToast({
        message: `${resp.mensaje}`,
        dispose: 'Aceptar',
      });
      this.#router.navigate(['sampling']);
    });
  }
}
