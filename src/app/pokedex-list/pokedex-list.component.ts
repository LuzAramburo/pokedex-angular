import {Component, inject, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Router, RouterLink} from "@angular/router";
import {PokemonPokedex} from "../models/pokedex.model";
import {catchError, Observable, Subscription, throwError} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {PokemonResponse} from "../models/pokemon.model";

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
  private router = inject(Router)

  pokemons$: Observable<PokemonPokedex[]> | null = null
  error: null | string = null

  ngOnInit() {
    this.pokemonService.selectedPokemon.subscribe(
      (response) => {
        if (response) this.router.navigate(['/pokedex', response?.id])
      }
    )
    this.pokemons$ = this.pokemonService.getPokemons()
    catchError(err => {
      console.error(err)
      this.error = "Something went Wrong. Please try again later"
      return throwError(() => new Error("Something went wrong. Please try again later."));
    })
  }

  goToDetails(url: string) {
    this.pokemonService.getPokemonByUrl(url).subscribe()
  }
}
