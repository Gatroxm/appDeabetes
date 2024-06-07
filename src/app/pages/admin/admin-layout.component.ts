import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { SideBarComponent } from '@components/side-bar/side-bar.component';
import TopBarComponent from '@components/top-bar/top-bar.component';
import { ToasterComponent } from '@components/toast/toaster.component';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet, 
    SideBarComponent, 
    NgClass, 
    TopBarComponent, 
    ToasterComponent, 
    IconComponent,
    NgIf
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl:'./admin-layout.component.scss'
})
export class AdminLayoutComponent {

  show = false;

  showTogleMenu(){
    if(this.show){
      this.show = false
    } else {
      this.show = true
    }
  }
}
