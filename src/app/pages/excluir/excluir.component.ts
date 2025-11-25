import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Importações corretas
import { ClientesService } from '../../core/service/clientes.service';


@Component({
  selector: 'app-excluir',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './excluir.component.html',
  styleUrl: './excluir.component.css'
})
export class ExcluirComponent {

  idExcluir: number | null = null;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor( private clientesService: ClientesService,
                private router: Router ) {}
    

  excluirCliente(): void {
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    if (this.idExcluir != null) {
      this.clientesService.excluir(this.idExcluir).subscribe({
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
