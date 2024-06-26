import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToasterComponent } from '@components/toast/toaster.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToasterComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'AppControlFront';
}
