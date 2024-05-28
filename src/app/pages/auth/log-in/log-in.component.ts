import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { ReadUserDto } from 'src/app/shared/models/user.model';
import { NgIf } from '@angular/common';

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

  formLogin = this.#fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  formRegister = this.#fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    user: ['', [Validators.required]],
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
    this.#logInServices.login(this.formLogin.getRawValue()).subscribe((resp: ReadUserDto) => {
      localStorage.setItem('email', this.formLogin.getRawValue().email || '');
      this.#router.navigate(['/']);
    })
  }

  createUser(){
    this.formRegister.markAllAsTouched();
    if (this.formRegister.invalid) return;
    console.log(this.formRegister.getRawValue())
  }
}
