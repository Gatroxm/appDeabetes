import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IconComponent } from '@components/icon/icon.component';
import { QuizService } from '@services/quiz.service';
import { Quiz } from 'src/app/shared/models/quiz.model';
import { ModalEditComponent } from '../components/modal-edit/modal-edit.component';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [NgFor, DatePipe, IconComponent, ModalEditComponent, NgIf],
  templateUrl: './quiz-list.component.html',
})
export class QuizListComponent implements OnInit {
  #quizService = inject(QuizService);

  quizList: Quiz[] = [];
  showModal: boolean = false;
  quiz: Quiz = {} as Quiz;

  ngOnInit(): void {
    this.#quizService.getAllQuiz().subscribe((res) => {
      if (res.ok) {
        this.quizList = res.data;
      }
    });
  }

  edit(quiz: Quiz) {
    this.quiz = quiz;
    this.showModal = true;
  }
  closeModal(data: any) {
    this.quiz = data;
    this.showModal = false;
  }

  deleteQuiz(quiz: Quiz) {
    this.#quizService.deleteQuiz(quiz._id).subscribe((res) => {
      if (res.ok) {
        this.quizList = res.data;
      }
    });
  }
}
