import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() type:
    | string
    | 'home'
    | 'edit'
    | 'delete'
    | 'quiz'
    | 'calculator'
    | 'sampling'
    | 'news'
    | 'menu'
    | 'title'
    | 'exit' = 'home';
}
