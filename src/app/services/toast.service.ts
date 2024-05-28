import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { Toast } from '../shared/models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toastEvents: Observable<Toast>;
  private _toastEvents = new Subject<Toast>();

  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
  }

  dispatchToast(toastData: Toast) {
    this._toastEvents.next(toastData);
  }
}