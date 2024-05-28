import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {
  
  
  #logInServices = inject(LoginService);
  show = false;

  ngOnInit(): void {
    setTimeout(() => {
      
      console.log(this.#logInServices.currentUserExists())
    }, 1100);
  }
  logout(){
    this.#logInServices.logOut();
  }
}
