import { NgClass, NgIf, Location, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { UiService } from '@services/ui.service';
import { ConfigurationTopBar } from '../../models/ui.dto';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [NgIf, NgClass, UpperCasePipe],
  templateUrl: './top-bar.component.html',
})
export default class TopBarComponent implements OnInit {
  uiService = inject(UiService);
  topBar!: ConfigurationTopBar;
  title = ''

  private history: string[] = [];
  private router = inject(Router);
  private location = inject(Location);
  private titleService = inject(Title);

  ngOnInit(): void {
    this.title = this.titleService.getTitle();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(this.titleService.getTitle())
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  goBack() {
    this.title = this.titleService.getTitle();
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");
    }
  }

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
}
