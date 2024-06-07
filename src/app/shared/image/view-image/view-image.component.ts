import { Component, Input, OnInit, inject } from '@angular/core';
import { ImagesService } from '@services/images.service';

@Component({
  selector: 'app-view-image',
  standalone: true,
  imports: [],
  templateUrl: './view-image.component.html',
  styleUrl: './view-image.component.css',
})
export class ViewImageComponent implements OnInit {
  @Input() type: 'usuario' | 'news' = 'usuario';
  @Input() imagen: any = '';

  img!: string;

  #imagenSercice = inject(ImagesService);

  ngOnInit(): void {
    this.img = this.#imagenSercice.getImagen(this.type, this.imagen);
    console.log(this.img);
  }
}
