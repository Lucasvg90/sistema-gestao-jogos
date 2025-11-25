import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/service/cart.service';
import { Jogo } from '../../core/types/types';

@Component({
  selector: 'app-carrinho',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho.component.html',
  styleUrl: './carrinho.component.css'
})
export class CarrinhoComponent implements OnInit, OnDestroy {
  items: Jogo[] = [];
  total = 0;
  count = 0;
  private sub?: Subscription;

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.sub = this.cart.items$.subscribe(items => {
      this.items = items;
      this.count = items.length;
      this.total = items.reduce((s, it) => s + (Number((it as any).preco) || 0), 0);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  remove(index: number) {
    this.cart.removeByIndex(index);
  }

  finalizar() {
    if (this.count === 0) return alert('Carrinho vazio');
    // In a real app you'd call a checkout API — here we'll clear and confirm
    const totalStr = this.total.toFixed(2);
    this.cart.clear();
    alert(`Sua compra fictícia foi realizada!\nO valor total foi: R$ ${totalStr}\nAproveite sua jogatina e espero vê-lo novamente!`);
  }
}
