import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@components/icon/icon.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterLink, IconComponent],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() link!: any;
  @Input() icon!: any;
  @Input() title!: string;
}
