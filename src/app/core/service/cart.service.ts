import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Jogo } from '../types/types';

const STORAGE_KEY = 'app_cart_items';

@Injectable({ providedIn: 'root' })
export class CartService {
  private itemsSubject = new BehaviorSubject<Jogo[]>(this.loadFromStorage());
  readonly items$: Observable<Jogo[]> = this.itemsSubject.asObservable();

  private loadFromStorage(): Jogo[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      return JSON.parse(raw) as Jogo[];
    } catch {
      return [];
    }
  }

  private saveToStorage(items: Jogo[]) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
  }

  getItems(): Jogo[] {
    return this.itemsSubject.getValue();
  }

  add(item: Jogo) {
    const items = [...this.getItems(), item];
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  removeByIndex(index: number) {
    const items = this.getItems().filter((_, i) => i !== index);
    this.itemsSubject.next(items);
    this.saveToStorage(items);
  }

  clear() {
    this.itemsSubject.next([]);
    this.saveToStorage([]);
  }

  count(): number {
    return this.getItems().length;
  }

  total(): number {
    return this.getItems().reduce((s, it) => s + (Number((it as any).preco) || 0), 0);
  }
}
