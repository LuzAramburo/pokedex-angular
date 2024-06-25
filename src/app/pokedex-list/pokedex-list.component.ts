import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Router, RouterLink} from "@angular/router";
import {catchError, throwError} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {PokemonDetails} from "../models/pokemon.model";

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
  private destroyRef = inject(DestroyRef)

  pokemons$ = this.pokemonService.pokemonList$
  error: null | string = null

  ngOnInit() {
    const sub = this.pokemonService.getPokemons().pipe(
      catchError(err => {
        console.error(err)
        this.error = "Something went Wrong. Please try again later"
        return throwError(() => new Error("Something went wrong. Please try again later."));
      })
    ).subscribe()

    this.destroyRef.onDestroy(() => {
      sub.unsubscribe()
    })
  }

  goToDetails(pokemon: PokemonDetails) {
    this.pokemonService.selectPokemon(pokemon)
    this.router.navigate(['/pokedex', pokemon.id])
  }
}
