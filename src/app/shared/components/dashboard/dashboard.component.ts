import { Component, NO_ERRORS_SCHEMA, OnInit, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { IconComponent } from '@components/icon/icon.component';
import { User } from '../../models/user.model';
import { LoginService } from '@services/login.service';
import { SamplingService } from '@services/sampling.service';
import { BarsComponent } from '@components/graphics/bars/bars.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardComponent, IconComponent, BarsComponent, NgIf],
  templateUrl: './dashboard.component.html',
  schemas: [NO_ERRORS_SCHEMA],
})
export class DashboardComponent implements OnInit {
  #loginService = inject(LoginService);
  user!: User;
  #SamplingService = inject(SamplingService);

  samplings: any[] = [];
  ngOnInit(): void {
    this.user = this.#loginService.currentUserExists().usuario;
    console.log(this.user);
  }
}
