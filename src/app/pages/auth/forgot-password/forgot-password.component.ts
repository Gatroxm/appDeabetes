import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: '../log-in/log-in.component.scss'
})
export class ForgotPasswordComponent implements OnInit{

  #router = inject(Router);
  #logInServices = inject(LoginService);
  
  ngOnInit(): void {
    // if(this.#logInServices.isAuthenticated()){
    //   this.#router.navigate(['/']);
    // }
  }

}
