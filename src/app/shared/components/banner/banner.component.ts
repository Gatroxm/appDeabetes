import { NgIf } from '@angular/common';
import { Component, Input, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '@services/login.service';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './banner.component.html',
})
export class BannerComponent implements OnInit{

  @Input() title!:string;
  @Input() btnName!:string;
  @Input() url!:string;
  
  logInServices = inject(LoginService);
  
  role!:string;
  
  ngOnInit(): void {
    this.role = this.logInServices.currentUserExists().usuario.role
  }


}
