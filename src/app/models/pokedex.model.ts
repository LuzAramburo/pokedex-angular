export interface PokemonPokedex {
  name: string;
  url: string;
}

export interface PokedexResponse {
  count: number;
  next: string;
  previous?: any;
  results: PokemonPokedex[];
}
