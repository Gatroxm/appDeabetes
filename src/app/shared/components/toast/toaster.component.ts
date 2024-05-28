import { ChangeDetectorRef, Component, Input, OnInit, inject } from '@angular/core';
import { ToastService } from '@services/toast.service';
import { ToastComponent } from './toast/toast.component';
import { NgFor } from '@angular/common';
import { Toast } from '../../models/toast.model';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [ToastComponent ,NgFor],
  templateUrl: './toaster.component.html',
})
export class ToasterComponent implements OnInit{
  #toastService = inject(ToastService);
  #cdr = inject(ChangeDetectorRef);
  toastList: Toast[] = [];

  ngOnInit(): void {
    this.initToast();
  }

  initToast() {
    this.#toastService.toastEvents.subscribe((toastEvent: Toast) => {
      this.toastList.push(toastEvent);
      this.#cdr.detectChanges();
    });
  }

  dispose(index: number) {
    this.toastList.splice(index, 1);
    this.#cdr.detectChanges();
  }
}
