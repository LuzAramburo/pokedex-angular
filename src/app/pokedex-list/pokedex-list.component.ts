import {Component, inject, OnInit} from '@angular/core';
import {Pokemon, PokemonService} from "../services/pokemon.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pokedex-list',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './pokedex-list.component.html',
  styleUrl: './pokedex-list.component.css'
})
export class PokedexListComponent implements OnInit {
  private pokemonService = inject(PokemonService)

  pokemons: Pokemon[] = []
  isFetching = true
  error: null | string = null

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe({
      next: (response) => {
        this.pokemons = response.results
      }
    })
  }
}
