import { Component } from '@angular/core';
import { RouterLinkActive, RouterModule } from "@angular/router";
import { NavigationService } from '../core/service/navigation.service';

@Component({
  selector: 'app-inicial',
  imports: [RouterLinkActive, RouterModule],
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent {
  constructor(private nav: NavigationService) {}

  setModeClientes() {
    this.nav.setMode('clientes');
  }

  setModeJogos() {
    this.nav.setMode('jogos');
  }

}
