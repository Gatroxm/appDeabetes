import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConfigurationTopBar } from '../shared/models/ui.dto';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private router = inject(Router);

  topBar: Observable<ConfigurationTopBar>;
  isOpenSidebar = new BehaviorSubject<boolean>(false);
  private _topBar = new Subject<ConfigurationTopBar>();

  constructor() {
    this.topBar = this._topBar.asObservable();
  }

  public setToolbar(settings: Partial<ConfigurationTopBar>) {
    const defaultTopBar: ConfigurationTopBar = {
      title: {
        value: '',
        visible: true,
      },
    };
    this._topBar.next(Object.assign(defaultTopBar, settings));
  }

  goTo(url = ''): void {
    this.router.navigate([`/${url}`]);
  }

  toggleSidebar(value?: boolean) {
    this.isOpenSidebar.next(value ?? !this.isOpenSidebar.value);
  }
}