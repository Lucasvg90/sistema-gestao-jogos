import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';
import { NavigationService, AppMode } from '../core/service/navigation.service';
import { CartService } from '../core/service/cart.service';

@Component({
  standalone: true,
  selector: 'app-cabecalho',
  imports: [RouterModule, CommonModule],
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit, OnDestroy {
  mode: AppMode = null;
  cartCount = 0;
  private sub?: Subscription;
  private routerSub?: Subscription;
  private cartSub?: Subscription;

  constructor(private nav: NavigationService, private router: Router, private cart: CartService) {}

  ngOnInit(): void {
    this.sub = this.nav.mode$.subscribe(m => this.mode = m);

    // Sync mode with current route so header reflects direct URL access
    this.setModeFromUrl(this.router.url);

    this.routerSub = this.router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
    ).subscribe(e => {
      this.setModeFromUrl(e.urlAfterRedirects || e.url);
    });
    this.cartSub = this.cart.items$.subscribe(items => this.cartCount = items.length);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.routerSub?.unsubscribe();
    this.cartSub?.unsubscribe();
  }

  private setModeFromUrl(url: string) {
    // normalize path (remove query params/hash)
    const path = url.split('?')[0].split('#')[0];

    if (path === '/' || path === '' || path === '/inicial') {
      this.nav.clear();
      return;
    }

    // jogos routes
    const jogosPrefixes = ['/listar-jogo', '/cadastrar-jogo', '/consultar-jogo', '/excluir-jogo', '/alterar-jogo', '/carrinho'];
    const clientesPrefixes = ['/listar', '/cadastrar', '/consultar', '/excluir', '/alterar'];

    if (jogosPrefixes.some(p => path.startsWith(p))) {
      this.nav.setMode('jogos');
      return;
    }

    if (clientesPrefixes.some(p => path.startsWith(p))) {
      this.nav.setMode('clientes');
      return;
    }

    // default
    this.nav.clear();
  }

  goInicial(): void {
    this.nav.clear();
    this.router.navigate(['/']);
  }

}