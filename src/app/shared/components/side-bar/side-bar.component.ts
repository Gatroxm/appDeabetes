import { NgClass, NgIf, NgStyle } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [NgIf, NgClass, RouterLink, IconComponent, NgStyle],
  templateUrl: './side-bar.component.html',
})
export class SideBarComponent implements OnInit {
  
  @Input() showIcons:boolean = false;
  
  #logInServices = inject(LoginService);
  show = false;
  user!:any;
  ngOnInit(): void {
      this.user = this.#logInServices.currentUserExists().usuario;
  }
  logout(){
    this.#logInServices.logOut();
  }
}
