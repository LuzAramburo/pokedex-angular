import {Component, inject, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {RouterLink} from "@angular/router";
import {PokemonPokedex} from "../models/pokedex.model";
import {map, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-pokedex-list',
  standalone: true,
  imports: [
    RouterLink,
    AsyncPipe
  ],
  templateUrl: './pokedex-list.component.html',
  styleUrl: './pokedex-list.component.css'
})
export class PokedexListComponent implements OnInit {
  private pokemonService = inject(PokemonService)

  pokemons: Observable<PokemonPokedex[]> | null = null
  error: null | string = null

  ngOnInit() {
    this.pokemons = this.pokemonService.getPokemons().pipe(
      map(response => response.results)
    )
  }
}
