import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { ReadUserDto } from 'src/app/shared/models/user.model';
import { NgIf } from '@angular/common';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-log-in',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export default class LogInComponent implements OnInit {

  loginRender=true

  #logInServices = inject(LoginService);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #userServices = inject(UserService)

  formLogin = this.#fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  formRegister = this.#fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required]],
    password: ['', [Validators.required]]

  });

  ngOnInit(): void {
    if (this.#logInServices.isAuthenticated()) {
      this.#router.navigate(['/']);
    }
  }

  ingresar() {
    this.formLogin.markAllAsTouched();
    if (this.formLogin.invalid) return;
    this.logIn(this.formLogin.getRawValue());
  }

  logIn(data:any){
    this.#logInServices.login(data).subscribe((resp: ReadUserDto) => {
      localStorage.setItem('email', data.email || '');
      this.#router.navigate(['/']);
    })
  }
  createUser(){
    this.formRegister.markAllAsTouched();
    if (this.formRegister.invalid) return;
    this.#userServices.createUser(this.formRegister.getRawValue()).subscribe((resp:any) =>{
      if(resp.ok){
        console.log({
          "email":resp.usuario.email,
          "password": this.formRegister.getRawValue().password
        })
        this.logIn({
          email:resp.usuario.email,
          password: this.formRegister.getRawValue().password
        });
      }
    })

  }
}
