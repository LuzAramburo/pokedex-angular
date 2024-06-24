import { Routes } from '@angular/router';
import {PokedexListComponent} from "./pokedex-list/pokedex-list.component";
import {PokemonDetailsComponent} from "./pokemon-details/pokemon-details.component";

export const routes: Routes = [
  {
    path: 'pokedex',
    component: PokedexListComponent
  },
  {
    path: 'pokedex/:pokemonId',
    component: PokemonDetailsComponent
  },
  {
    path: '',
    redirectTo: 'pokedex',
    pathMatch: 'full'
  }
];
