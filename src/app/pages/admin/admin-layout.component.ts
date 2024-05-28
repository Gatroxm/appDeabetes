import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { SideBarComponent } from '@components/side-bar/side-bar.component';
import TopBarComponent from '@components/top-bar/top-bar.component';
import { ToasterComponent } from '@components/toast/toaster.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterOutlet, SideBarComponent, NgClass, TopBarComponent, ToasterComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl:'./admin-layout.component.scss'
})
export class AdminLayoutComponent {

  show = false;

}
