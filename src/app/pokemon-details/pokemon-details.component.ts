import {Component, inject} from '@angular/core';
import {PokemonService} from "../services/pokemon.service";
import {Router, RouterLink} from "@angular/router";
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
  private router = inject(Router)
  pokemon$ = this.pokemonService.selectedPokemon$

  goBack() {
    this.pokemonService.clearSelectedPokemon()
    this.router.navigate(['/pokedex'])
  }
}
