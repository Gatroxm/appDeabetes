import { NgClass, NgIf, Location, UpperCasePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { UiService } from '@services/ui.service';
import { ConfigurationTopBar } from '../../models/ui.dto';
import { filter } from 'rxjs';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [NgIf, NgClass, UpperCasePipe],
  templateUrl: './top-bar.component.html',
})
export default class TopBarComponent implements OnInit {
  uiService = inject(UiService);
  topBar!: ConfigurationTopBar;
  titulo = ''
  bg=''

  history: string[] = [];
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private titleService = inject(Title);

  ngOnInit(): void {
    // Escucha los eventos de navegación del router
    this.router.events
      // Filtra los eventos para quedarse solo con los de tipo NavigationEnd
      .pipe(filter(event => event instanceof NavigationEnd))
      // Se suscribe a los eventos filtrados
      .subscribe(() => {
        // Obtiene la ruta raíz del componente
        let currentRoute = this.route.root;
        // Mientras la ruta tenga hijos, se mueve al primer hijo
        while (currentRoute.children.length > 0) {
          currentRoute = currentRoute.children[0];
        }
        // Actualiza el título del componente con el dato 'title' o 'titulo' de la ruta actual
        this.titulo = currentRoute.snapshot.data['title'] || currentRoute.snapshot.data['titulo'];
        // Actualiza el fondo del componente con el dato 'background' de la ruta actual
        this.bg = currentRoute.snapshot.data['background'];
      });
  
    // Se suscribe a los datos de la ruta actual
    this.route.data.subscribe(data => {
      // Actualiza el título del componente con el dato 'title' o 'titulo' de la ruta actual
      this.titulo = data['title'] || data['titulo'];
      // Actualiza el fondo del componente con el dato 'background' de la ruta actual
      this.bg = data['background'];
    });
  }



  goBack() {
    this.titulo = this.titleService.getTitle();
    console.log(this.history)
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl("/");

    }
  }

  toggleSidebar() {
    this.uiService.toggleSidebar();
  }
}
