import { NgIf, UpperCasePipe } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BarsComponent } from '@components/graphics/bars/bars.component';
import { ImagesService } from '@services/images.service';
import { LoginService } from '@services/login.service';
import { SamplingService } from '@services/sampling.service';
import { UserService } from '@services/user.service';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { ViewImageComponent } from 'src/app/shared/image/view-image/view-image.component';
import { SamplingDto } from 'src/app/shared/models/sampling.model';
import { User } from 'src/app/shared/models/user.model';

interface ChartData {
  name: string;
  value: number;
}
@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    ViewImageComponent,
    UpperCasePipe,
    ReactiveFormsModule,
    NgIf,
    NgxChartsModule,
  ],
  templateUrl: './user-detail.component.html',
  schemas: [NO_ERRORS_SCHEMA],
})
export class UserDetailComponent implements OnInit {
  #LoginServices = inject(LoginService);
  #imagenService = inject(ImagesService);
  #userService = inject(UserService);
  #SamplingService = inject(SamplingService);
  #router = inject(Router);
  #fb = inject(FormBuilder);

  // public single: any = [];
  view: [number, number] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Fechas';
  showYAxisLabel = true;
  yAxisLabel = 'Glucometrias';
  Below = 'below';
  legendPosition: any = 'below';
  legendTitle: any = 'Ultimas 10 fechas de tomas de glucometrias';

  colorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      '#5AA454',
      '#A10A28',
      '#C7B42C',
      '#AAAAAA',
      '#1F77B4',
      '#FF7F0E',
      '#2CA02C',
      '#D62728',
      '#9467BD',
      '#8C564B',
    ],
  };
  public single: ChartData[] = [];
  viewChart: boolean = false;
  formUser = this.#fb.nonNullable.group({
    name: ['', [Validators.required]],
    password: [''],
    password2: [''],
    role: [''],
    email: [''],
    sexo: [''],
    telefono: [''],
    peso: [''],
  });
  imagenSubir!: File;
  imgTemp!: any;
  imagen!: string;
  user!: User;
  uploadImagen: boolean = false;

  ngOnInit(): void {
    this.user = this.#LoginServices.currentUserExists().usuario;
    this.imagen = this.user.img ? this.user.img : '';
    this.formUser.patchValue({
      name: this.user.name,
      role: this.user.role,
      email: this.user.email,
      peso: this.user.peso,
      sexo: this.user.sexo,
      telefono: this.user.telefono,
    });
    this.#SamplingService.getSampling(this.user._id).subscribe((resp: any) => {
      if (resp.data.length > 0) {
        resp.data.forEach((element: any, index: number) => {
          if (index < 10) {
            const date = new Date(element.fecha);
            const formatter = new Intl.DateTimeFormat('es-ES', {
              day: 'numeric',
              month: 'short',
            });
            const formattedDate = formatter.format(date);
            this.single.push({
              name: `${element.jornada} - ${formattedDate}`,
              value: element.muestra,
            });
          }
        });
        this.viewChart = true;
      }
    });
  }

  cambiarImagen(event: any): any {
    this.imagenSubir = event.target.files[0];
    this.uploadImagen = true;
    if (!event.target.files[0]) {
      return (this.imgTemp = null);
    }
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onloadend = () => {
      this.imgTemp = reader.result || null;
    };
  }

  saved() {
    console.log(this.formUser.invalid);
    this.formUser.markAllAsTouched();
    if (this.formUser.invalid) return;
    console.log(
      this.formUser.getRawValue().password ===
        this.formUser.getRawValue().password2
    );
    if (
      this.formUser.getRawValue().password ===
      this.formUser.getRawValue().password2
    ) {
      const user = {
        _id: this.user._id,
        name: this.formUser.getRawValue().name,
        role: this.formUser.getRawValue().role,
        email: this.formUser.getRawValue().email,
        password: this.formUser.getRawValue().password,
        sexo: this.formUser.getRawValue().sexo,
        peso: this.formUser.getRawValue().peso,
        telefono: this.formUser.getRawValue().telefono,
      };
      this.#userService.UpdateUser(user).subscribe((resp: any) => {
        if (resp.ok) {
          this.resetSesionStorage(resp.usuario);
          if (this.uploadImagen) {
            this.#imagenService
              .uploadImage(this.imagenSubir, 'usuario', this.user._id)
              .subscribe((resp: any) => {
                if (resp.ok) {
                  this.resetSesionStorage(resp.usuario);
                  this.imagen = resp.usuario.img;
                }
              });
          }
          console.log(resp);
          this.#router.navigate(['/user']);
        }
      });
    } else {
      // retornar el toastbar
    }
  }
  resetSesionStorage(resp: any) {
    sessionStorage.removeItem('user');
    const respuesta = {
      id: resp._id,
      ok: true,
      usuario: resp,
    };
    sessionStorage.setItem('user', JSON.stringify(respuesta));
    this.user = this.#LoginServices.currentUserExists().usuario;
  }
}
