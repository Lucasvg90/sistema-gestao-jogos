import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/service/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent {
  titulo = 'Cadastro de Clientes';
  cliente: Cliente = {} as Cliente;
  dateInvalid = false;
  termosAceito = false;

  constructor(
    private service: ClientesService,
    private router: Router
  ) { }

  formatDateInput(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input) return;
    let digits = input.value.replace(/\D/g, '').slice(0,8);
    const parts: string[] = [];
    if (digits.length > 0) parts.push(digits.slice(0,2));
    if (digits.length > 2) parts.push(digits.slice(2,4));
    if (digits.length > 4) parts.push(digits.slice(4,8));
    const formatted = parts.join('/');
    input.value = formatted;
    this.cliente.data_nascimento = formatted;
    if (formatted.length === 10) {
      this.dateInvalid = !this.isValidDateDDMMYYYY(formatted);
    } else {
      this.dateInvalid = false;
    }
    setTimeout(() => { input.setSelectionRange(formatted.length, formatted.length); }, 0);
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
    return `${year}-${month}-${day}`;
  }

  submeter(form?: any) {
    // if form provided, validate
    if (form && form.invalid) {
      try { form.control.markAllAsTouched(); } catch {}
      return;
    }
    // Block submit if date invalid
    if (this.cliente.data_nascimento && !this.isValidDateDDMMYYYY(this.cliente.data_nascimento)) {
      this.dateInvalid = true;
      return;
    }

    // Convert date to ISO for backend consistency if present
    if (this.cliente.data_nascimento && this.cliente.data_nascimento.length === 10) {
      this.cliente.data_nascimento = this.toISODate(this.cliente.data_nascimento);
    }

    this.service.listar().subscribe({
      next: (clientes) => {
        const numericIds = clientes
          .map(c => c.id)
          .map(id => typeof id === 'number' ? id : parseInt(String(id), 10))
          .filter(n => !isNaN(n));
        const maxId = numericIds.length ? Math.max(...numericIds) : 0;
        // Assign id only if not already set
        if (!this.cliente.id) {
          this.cliente.id = maxId + 1;
        }
        this.service.incluir(this.cliente).subscribe({
          next: () => this.router.navigate(['/listar']),
          error: (postErr) => console.error('Erro ao cadastrar cliente:', postErr)
        });
      },
      error: (err) => {
        console.error('Erro ao buscar jogos para gerar id:', err);
        // Try to POST without id as a last resort
        this.service.incluir(this.cliente).subscribe({
          next: () => this.router.navigate(['/listar']),
          error: (postErr) => console.error('Erro ao cadastrar cliente sem id:', postErr)
        });
      }
    });
  }

}
