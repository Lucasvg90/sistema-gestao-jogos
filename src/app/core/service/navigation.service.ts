import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type AppMode = 'clientes' | 'jogos' | null;

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private modeSubject = new BehaviorSubject<AppMode>(null);
  readonly mode$: Observable<AppMode> = this.modeSubject.asObservable();

  setMode(mode: AppMode) {
    this.modeSubject.next(mode);
  }

  clear() {
    this.modeSubject.next(null);
  }
}
