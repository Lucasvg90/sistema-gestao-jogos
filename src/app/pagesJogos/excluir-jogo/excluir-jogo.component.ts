import { Component } from '@angular/core';
import { JogosService } from '../../core/service/clientes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-excluir-jogo',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './excluir-jogo.component.html',
  styleUrl: './excluir-jogo.component.css'
})
export class ExcluirJogoComponent {

  idExcluir: string = ''; // Mude para string

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private jogosService: JogosService,
              private router: Router) {}

  excluirJogo(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.idExcluir && this.idExcluir.trim() !== '') {
      this.jogosService.excluir(this.idExcluir).subscribe({
        next: () => {
          this.mensagemSucesso = 'Jogo excluído com sucesso.';
          this.idExcluir = '';
          // Navegar de volta para a lista após exclusão bem-sucedida
          setTimeout(() => this.router.navigate(['/listar-jogo']), 1500);
        },
        error: (err) => {
          console.error('Erro:', err);
          this.mensagemErro = 'Erro ao excluir o jogo. Verifique se o ID está correto.';
        }
      });
    } else {
      this.mensagemErro = 'Por favor, informe um ID válido.';
    }
  }
}
