import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ClientesService } from '../../core/service/clientes.service';
import { Cliente } from '../../core/types/types';

@Component({
  selector: 'app-consultar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './consultar.component.html',
  styleUrl: './consultar.component.css'
})
export class ConsultarComponent {

  listaClientes: Cliente[] = [];
  idBusca: number | null = null;  
  clienteEncontrado: Cliente | null = null; 
  erroBusca: string = ''; 

  constructor( private clientesService: ClientesService) { }

  buscarCliente(): void {
    this.erroBusca = '';
    this.clienteEncontrado = null;

    if(this.idBusca != null) {

      const id = Number(this.idBusca); // ou: parseInt(this.idBusca as any, 10)
      if (isNaN(id)) {
      this.erroBusca = 'ID inválido';
      return;
      }

      this.clientesService.buscarPorId(id).subscribe({
        next: (cliente) => {
          if (cliente) {
            this.clienteEncontrado = cliente;
          } else {
            this.erroBusca = 'Cliente não localizado';
          }
        },
        error: () => {
          this.erroBusca = 'Erro ao buscar o cliente';
        }
      });
    }
  }

}
