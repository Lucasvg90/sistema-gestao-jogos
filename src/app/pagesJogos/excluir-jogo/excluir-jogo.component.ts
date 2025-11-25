import { Component } from '@angular/core';
import { JogosService } from '../../core/service/clientes.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Importações corretas

@Component({
  selector: 'app-excluir-jogo',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './excluir-jogo.component.html',
  styleUrl: './excluir-jogo.component.css'
})
export class ExcluirJogoComponent {

  idExcluir: number | null = null;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor( private jogosService: JogosService,
                private router: Router ) {}
    

  excluirJogo(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.idExcluir != null) {
      this.jogosService.excluir(this.idExcluir).subscribe({
        next: () => {
          this.mensagemSucesso = 'Cliente excluído com sucesso.';
          // Navegar de volta para a lista após exclusão bem-sucedida
          this.router.navigate(['/listar']);
        },
        error: () => {
          this.mensagemErro = 'Erro ao excluir o cliente. Verifique se o ID está correto.';
        }
      });
    }
  }

}
