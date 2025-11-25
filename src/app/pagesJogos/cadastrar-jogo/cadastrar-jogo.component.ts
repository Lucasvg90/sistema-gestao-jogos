import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Jogo } from '../../core/types/types';
import { JogosService } from '../../core/service/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar-jogo',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar-jogo.component.html',
  styleUrls: ['./cadastrar-jogo.component.css']
})
export class CadastrarJogoComponent {

  titulo = 'Cadastro de Jogos';
  jogo: Jogo = {} as Jogo;
  plataformas: string[] = [
    'PC', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5',
    'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series S/X',
    'Nintendo', 'Super Nintendo', 'Nintendo 64', 'Nintendo GameCube', 'Nintendo Wii', 'Nintendo Wii U', 'Nintendo Switch',
    'Outra'
  ];

  constructor(
    private service: JogosService,
    private router: Router
  ) { }

  dateInvalid: boolean = false;

  submeter() {
    // Block submit if date is invalid
    if (this.jogo.data_lancamento && !this.isValidDateDDMMYYYY(this.jogo.data_lancamento)) {
      this.dateInvalid = true;
      return;
    }

    // Convert date to ISO (yyyy-mm-dd) for backend consistency if present
    if (this.jogo.data_lancamento && this.jogo.data_lancamento.length === 10) {
      this.jogo.data_lancamento = this.toISODate(this.jogo.data_lancamento);
    }

    // Compute a numeric auto-increment id client-side and then POST.
    // This ensures new jogos get numeric ids even if backend currently stores non-numeric ids.
    this.service.listar().subscribe({
      next: (jogos) => {
        const numericIds = jogos
          .map(j => j.id)
          .map(id => typeof id === 'number' ? id : parseInt(String(id), 10))
          .filter(n => !isNaN(n));
        const maxId = numericIds.length ? Math.max(...numericIds) : 0;
        // Assign id only if not already set
        if (!this.jogo.id) {
          this.jogo.id = maxId + 1;
        }
        this.service.incluir(this.jogo).subscribe({
          next: () => this.router.navigate(['/listar-jogo']),
          error: (postErr) => console.error('Erro ao cadastrar jogo:', postErr)
        });
      },
      error: (err) => {
        console.error('Erro ao buscar jogos para gerar id:', err);
        // Try to POST without id as a last resort
        this.service.incluir(this.jogo).subscribe({
          next: () => this.router.navigate(['/listar-jogo']),
          error: (postErr) => console.error('Erro ao cadastrar jogo sem id:', postErr)
        });
      }
    });
  }

  formatDateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    // keep only digits
    let digits = input.value.replace(/\D/g, '').slice(0,8);
    const parts: string[] = [];
    if (digits.length > 0) {
      parts.push(digits.slice(0, 2));
    }
    if (digits.length > 2) {
      parts.push(digits.slice(2, 4));
    }
    if (digits.length > 4) {
      parts.push(digits.slice(4, 8));
    }
    const formatted = parts.join('/');
    // update the input value and the model
    input.value = formatted;
    this.jogo.data_lancamento = formatted;
    // live validation: only mark invalid when full length entered
    if (formatted.length === 10) {
      this.dateInvalid = !this.isValidDateDDMMYYYY(formatted);
    } else {
      this.dateInvalid = false;
    }
    // keep caret at end
    setTimeout(() => {
      input.setSelectionRange(formatted.length, formatted.length);
    }, 0);
  }

  private isValidDateDDMMYYYY(value: string): boolean {
    if (!value || typeof value !== 'string') return false;
    const m = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return false;
    const day = parseInt(m[1], 10);
    const month = parseInt(m[2], 10);
    const year = parseInt(m[3], 10);
    if (month < 1 || month > 12) return false;
    if (day < 1) return false;
    const monthLengths = [31, (this.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (day > monthLengths[month - 1]) return false;
    return true;
  }

  private isLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  private toISODate(ddmmyyyy: string): string {
    const m = ddmmyyyy.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (!m) return ddmmyyyy;
    const day = m[1];
    const month = m[2];
    const year = m[3];
    return `${year}-${month}-${day}`; // yyyy-mm-dd
  }

}
