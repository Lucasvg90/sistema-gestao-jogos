import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/service/auth.guard';
import { InicialComponent } from './inicial/inicial.component';

import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { ConsultarComponent } from './pages/consultar/consultar.component';
import { AlterarComponent } from './pages/alterar/alterar.component';
import { ExcluirComponent } from './pages/excluir/excluir.component';
import { ListarComponent } from './pages/listar/listar.component';

import { AlterarJogoComponent } from './pagesJogos/alterar-jogo/alterar-jogo.component';
import { CadastrarJogoComponent } from './pagesJogos/cadastrar-jogo/cadastrar-jogo.component';
import { ListarJogoComponent } from './pagesJogos/listar-jogo/listar-jogo.component';
import { ConsultarJogoComponent } from './pagesJogos/consultar-jogo/consultar-jogo.component';
import { ExcluirJogoComponent } from './pagesJogos/excluir-jogo/excluir-jogo.component';
import { CarrinhoComponent } from './pagesJogos/carrinho/carrinho.component';


export const routes: Routes = [
  // Clientes
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'inicial', component: InicialComponent, title: 'Página Inicial', canActivate: [AuthGuard] },
  { path: 'cadastrar', component: CadastrarComponent, title:'Cadastrar Cliente', canActivate: [AuthGuard] },
  { path: 'consultar', component: ConsultarComponent, title:'Consultar Cliente' , canActivate: [AuthGuard]},
  { path: 'alterar/:id', component: AlterarComponent, title:'Alterar Cliente', canActivate: [AuthGuard] },
  { path: 'excluir', component: ExcluirComponent, title:'Excluir Cliente', canActivate: [AuthGuard] },
  { path: 'listar', component: ListarComponent, title:'Listar Cliente', canActivate: [AuthGuard] },

  // Jogos
  { path: 'cadastrar-jogo', component: CadastrarJogoComponent, title:'Cadastrar Jogo', canActivate: [AuthGuard] },
  { path: 'listar-jogo', component: ListarJogoComponent, title:'Listar Jogo', canActivate: [AuthGuard] },
  { path: 'consultar-jogo', component: ConsultarJogoComponent, title:'Consultar Jogo', canActivate: [AuthGuard] },
  { path: 'excluir-jogo', component: ExcluirJogoComponent, title:'Excluir Jogo', canActivate: [AuthGuard] }, 
  { path: 'alterar-jogo/:id', component: AlterarJogoComponent, title: 'Alterar Detalhes', canActivate: [AuthGuard]},
  { path: 'carrinho', component: CarrinhoComponent, title: 'Carrinho de Compras', canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' }
];