import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';
import { Jogo } from '../../core/types/types';
import { JogosService } from '../../core/service/clientes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-alterar-jogo',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './alterar-jogo.component.html',
  styleUrl: './alterar-jogo.component.css'
})
export class AlterarJogoComponent implements OnInit{

   form!: FormGroup;
    jogoId!: number;
    jogoOriginal!: Jogo;
    jogoIds!: string;
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private fb: FormBuilder,
      private jogosService: JogosService
    ) { }
  
    ngOnInit(): void {
      this.jogoId = Number(this.route.snapshot.paramMap.get('id'));
      this.jogoIds = this.jogoId.toString();
  
      this.form = this.fb.group({
        preco: ['']
      });
  
      this.jogosService.buscarPorId(this.jogoId).subscribe(jogo => {
        //Se o jogo foi encontrado, atualiza os valores do formulário com os dados do jogo encontrado.
        if (jogo) {
          this.jogoOriginal = jogo;
          this.form.patchValue({
            preco: jogo.preco,
            
          });
        }
      });
    }
  
    onSubmit() {
      if(this.form.valid){
        const JogoAtualizado: Jogo = {
          ...this.jogoOriginal,
          preco: this.form.value.preco
      
        };
        this.jogosService.editar(JogoAtualizado).subscribe(() => {
          this.router.navigate(['/listar-jogo']);
        });
      }
    }

}
