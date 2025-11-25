export interface Cliente {
  id?: number;
  nome_cliente: string;
  data_nascimento: string;
  email: string;
  telefone: string;
}

export interface Jogo {
  id?: number;
  nome_jogo: string;
  data_lancamento: string;
  genero: string;
  plataforma: string;
  preco: number;
  url: string;
  logoUrl: string
}
