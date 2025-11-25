import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../core/types/types';
import { ClientesService } from '../../core/service/clientes.service';
import {Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../core/service/toast.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit{
  listaClientes: Cliente[] = [];
  constructor(private service: ClientesService,
    private router: Router,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes() {
    this.service.listar().subscribe((clientes) => {
      this.listaClientes = clientes;
    });
  }

  formatDateBR(value: any): string {
    if (!value && value !== 0) return '';
    const s = String(value).trim();
    const pad = (v: string | number) => String(v).padStart(2, '0');

    // ISO formats: yyyy-mm-dd or yyyy/mm/dd
    const iso = s.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);
    if (iso) {
      const [_, y, m, d] = iso;
      return `${pad(d)}/${pad(m)}/${y}`;
    }

    // Common dd/mm/yyyy or mm/dd/yyyy (ambiguous) -> assume dd/mm/yyyy
    const parts = s.split(/[\/\-]/);
    if (parts.length === 3 && parts[2].length === 4) {
      const p0 = parseInt(parts[0], 10);
      const p1 = parseInt(parts[1], 10);
      const p2 = parts[2];
      if (p0 > 12) return `${pad(p0)}/${pad(p1)}/${p2}`;
      return `${pad(parts[0])}/${pad(parts[1])}/${p2}`;
    }

    const parsed = new Date(s);
    if (!isNaN(parsed.getTime())) {
      const dd = pad(parsed.getDate());
      const mm = pad(parsed.getMonth() + 1);
      const yyyy = parsed.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }

    return s;
  }

  excluir(id: number) {
    const nid = Number(id);
    this.service.excluir(nid).subscribe({
      next: () => {
        this.listaClientes = this.listaClientes.filter(cliente => Number((cliente as any).id) !== nid);
        this.toast.show('Cliente excluído', 2500);
      },
      error: (err) => {
        console.error('Erro ao excluir cliente', err);
        this.toast.show('Erro ao excluir cliente', 3500);
      }
    });
}
}