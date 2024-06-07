import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '@services/login.service';
import { QuizService } from '@services/quiz.service';

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quiz-create.component.html',
  styleUrl: './quiz-create.component.css',
})
export class QuizCreateComponent implements OnInit {
  #fb = inject(FormBuilder);
  #quizService = inject(QuizService);
  #loginService = inject(LoginService);
  #router = inject(Router);

  quizForm = this.#fb.group({
    name: ['', [Validators.required]],
    value: ['', [Validators.required]],
    user: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.quizForm.patchValue({
      user: this.#loginService.currentUserExists().id,
    });
  }
  createQuiz() {
    console.log(this.quizForm.getRawValue());
    this.#quizService
      .createQuiz(this.quizForm.getRawValue())
      .subscribe((res) => {
        if (res.ok) {
          this.#router.navigate(['/quiz']);
        }
      });
  }
}
