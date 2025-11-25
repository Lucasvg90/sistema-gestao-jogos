import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'sistema_jogo_logged';

  login(username: string, password: string): boolean {
    // Credenciais fixas para ambiente de desenvolvimento
    const user = (username || '').trim();
    const pass = (password || '').toString();

    const isValid = user === 'admin' && pass === 'admin';
    if (isValid) {
      localStorage.setItem(this.storageKey, 'true');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }
}
