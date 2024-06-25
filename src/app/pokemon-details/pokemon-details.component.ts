import {Component, inject, OnInit} from '@angular/core';
import {PokemonResponse} from "../models/pokemon.model";
import {PokemonService} from "../services/pokemon.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-pokemon-details',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterLink
  ],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.css'
})
export class PokemonDetailsComponent {
  private pokemonService = inject(PokemonService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  pokemon$ = this.pokemonService.selectedPokemon$

  goBack() {
    this.pokemonService.clearSelectedPokemon()
    this.router.navigate(['/pokedex'])
  }
}
