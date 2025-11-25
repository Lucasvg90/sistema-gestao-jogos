import { Component, OnInit } from '@angular/core';
import { Jogo } from '../../core/types/types';
import { JogosService } from '../../core/service/clientes.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart.service';
import { ToastService } from '../../core/service/toast.service';

@Component({
  selector: 'app-listar-jogo',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './listar-jogo.component.html',
  styleUrls: ['./listar-jogo.component.css']
})
export class ListarJogoComponent implements OnInit{
  listaJogos: Jogo[] = [];
  platformLabels: Record<string, string> = {
    pc: 'PC',
    ps: 'PlayStation',
    ps2: 'PlayStation 2',
    ps3: 'PlayStation 3',
    ps4: 'PlayStation 4',
    ps5: 'PlayStation 5',
    xbox: 'Xbox',
    xbox360: 'Xbox 360',
    xboxone: 'Xbox One',
    xboxSS: 'Xbox Series S/X',
    nes: 'Nintendo',
    snes: 'Super Nintendo',
    n64: 'Nintendo 64',
    ngc: 'Nintendo GameCube',
    wii: 'Nintendo Wii',
    wiiu: 'Nintendo Wii U',
    ns: 'Nintendo Switch',
    outra: 'Outra'
  };
  constructor(private service: JogosService,
    private router: Router,
    private cart: CartService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.carregarJogos();
  }

  carregarJogos() {
    this.service.listar().subscribe((jogos) => {
      this.listaJogos = jogos;
    });
  }

  getPlatformLabel(key?: string | null): string {
    if (!key) return '—';
    return this.platformLabels[key] ?? key;
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

    // Common dd/mm/yyyy or mm/dd/yyyy (ambiguous) -> assume user input is dd/mm/yyyy
    const parts = s.split(/[\/\-]/);
    if (parts.length === 3 && parts[2].length === 4) {
      const p0 = parseInt(parts[0], 10);
      const p1 = parseInt(parts[1], 10);
      const p2 = parts[2];
      // If first part > 12, it's definitely day
      if (p0 > 12) return `${pad(p0)}/${pad(p1)}/${p2}`;
      // Otherwise assume dd/mm/yyyy (user locale)
      return `${pad(parts[0])}/${pad(parts[1])}/${p2}`;
    }

    // Try parsing with Date as fallback
    const parsed = new Date(s);
    if (!isNaN(parsed.getTime())) {
      const dd = pad(parsed.getDate());
      const mm = pad(parsed.getMonth() + 1);
      const yyyy = parsed.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }

    // Fallback: return raw string
    return s;
  }

  excluir(id: number) {
    this.service.excluir(id).subscribe(() => {
      this.listaJogos = this.listaJogos.filter(jogo => jogo.id !== id);
    });
}

  addToCart(jogo: Jogo) {
    this.cart.add(jogo);
    // show toast feedback
    this.toast.show(`O jogo ${jogo.nome_jogo} foi adicionado ao carrinho`, 3000);
  }

}
