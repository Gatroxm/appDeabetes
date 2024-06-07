import { NgIf } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  input,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Quiz } from 'src/app/shared/models/quiz.model';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {
  @Input() showModal!: boolean; // true para mostrar, false para ocultar
  @Input() quiz!: Quiz;
  @Output() closeModal = new EventEmitter<any>();

  #fb = inject(FormBuilder);

  formulario = this.#fb.group({
    name: '',
    value: '',
    date: '',
  });

  ngOnInit(): void {
    console.log(this.quiz);
    this.formulario.patchValue(this.quiz);
  }
  closed() {
    this.closeModal.emit(this.formulario.getRawValue());
  }
}
