import { Injectable } from '@angular/core';
import { Cliente } from '../types/types';
import { Jogo } from '../types/types';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  private readonly API = 'http://localhost:3000/clientes';
  constructor(private http: HttpClient) {}
  listar(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API);
  }

  incluir(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.API, cliente);
  }

  excluir(id: number | string): Observable<Cliente> {
    const url = `${this.API}/${id}`;
    return this.http.delete<Cliente>(url).pipe(
      catchError(err => {
        // fallback: try lookup by query ?id= and delete the found resource
        const q = `${this.API}?id=${id}`;
        return this.http.get<Cliente[]>(q).pipe(
          switchMap(list => {
            if (!list || list.length === 0) {
              return throwError(() => err);
            }
            const actualId = (list[0] as any).id;
            return this.http.delete<Cliente>(`${this.API}/${actualId}`);
          })
        );
      })
    );
  }

  editar(cliente: Cliente): Observable<Cliente> {
    const url = `${this.API}/${cliente.id}`
    return this.http.put<Cliente>(url, cliente)
  }
  
  buscarPorId(id: number): Observable<Cliente | undefined> {
    const url = `${this.API}?id=${id}`;
    return this.http.get<Cliente[]>(url).pipe(
      map(list => (list && list.length > 0 ? list[0] : undefined))
    );
  }
}

/* Planejo colocar abaixo uma classe parecida, só para os  jogos,
com tela de cadastro, listagem, exclusão e alteração de jogos também.
Só não sei ainda como colocar para comprar, mas isso aí, vejo dpskkk

mó preguiçakk
*/

@Injectable({
  providedIn: 'root',
})
export class JogosService {
  private readonly API = 'http://localhost:3000/jogos';
  constructor(private http: HttpClient) {}
  listar(): Observable<Jogo[]> {
    return this.http.get<Jogo[]>(this.API);
  }

  incluir(jogo: Jogo): Observable<Jogo> {
    return this.http.post<Jogo>(this.API, jogo);
  }
  
  excluir(id: number): Observable<Jogo> {
    return this.http.delete<Jogo>(this.API + `/${id}`);
  }
  
  editar(jogo: Jogo): Observable<Jogo> {
    const url = `${this.API}/${jogo.id}`
    return this.http.put<Jogo>(url, jogo)
  }
  
  buscarPorId(id: number): Observable<Jogo | undefined> {
    const url = `${this.API}?id=${id}`;
    return this.http.get<Jogo[]>(url).pipe(
      map(list => (list && list.length > 0 ? list[0] : undefined))
    );
  }
}