import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private toastSubject = new BehaviorSubject<string | null>(null);
  readonly toast$ = this.toastSubject.asObservable();

  show(message: string, duration = 3000) {
    this.toastSubject.next(message);
    if (duration > 0) {
      setTimeout(() => this.clear(), duration);
    }
  }

  clear() {
    this.toastSubject.next(null);
  }
}
