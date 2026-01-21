import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/service/clientes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-alterar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './alterar.component.html',
  styleUrls: ['./alterar.component.css']
})
export class AlterarComponent implements OnInit{
  form!: FormGroup;
  clienteId!: string | number;
  originalCliente?: Cliente;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private clientesService: ClientesService
  ) { }

  ngOnInit(): void {
    // Recebe o ID como string da URL
    this.clienteId = this.route.snapshot.paramMap.get('id') as string;

    this.form = this.fb.group({
      nome: [''],
      email: [''],
      telefone: ['']
    });

    this.clientesService.buscarPorId(this.clienteId).subscribe(cliente => {
      //Se o cliente foi encontrado, atualiza os valores do formulário com os dados do cliente encontrado.
      if (cliente) {
        this.originalCliente = cliente;
        this.form.patchValue({
          nome: cliente.nome_cliente,
          email: cliente.email,
          telefone: cliente.telefone
        });
      }
    });
  }

  onSubmit() {
    if(this.form.valid){
      const values = this.form.value;
      const updated: Cliente = {
        // preserve other fields from original (e.g., data_nascimento) when present
        ...(this.originalCliente || {} as Cliente),
        id: this.clienteId,
        nome_cliente: values.nome,
        email: values.email,
        telefone: values.telefone
      };
      this.clientesService.editar(updated).subscribe({
        next: () => this.router.navigate(['/listar']),
        error: (err) => {
          console.error('Erro ao editar cliente', err);
          this.router.navigate(['/listar']);
        }
      });
    }
  }

}
