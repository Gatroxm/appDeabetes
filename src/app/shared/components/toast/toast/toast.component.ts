import { NgIf, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toast } from 'src/app/shared/models/toast.model';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ NgIf, TitleCasePipe],
  templateUrl: './toast.component.html',
  styles: [],
})
export class ToastComponent implements OnInit {
  @Input() toast!: Toast;
  @Output() disposeEvent = new EventEmitter();

  ngOnInit(): void {
    setTimeout(() => {
      this.dispose();
    }, this.toast.time || 5000);
  }

  dispose() {
    this.disposeEvent.emit();
  }
}