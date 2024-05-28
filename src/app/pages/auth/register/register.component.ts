import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '@services/login.service';
import { Router } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: '../log-in/log-in.component.scss'
})
export class RegisterComponent implements OnInit {

  #router = inject(Router);
  #logInServices = inject(LoginService);

  ngOnInit(): void {
    if (this.#logInServices.isAuthenticated()) {
      this.#router.navigate(['/']);
    }

  }
}
