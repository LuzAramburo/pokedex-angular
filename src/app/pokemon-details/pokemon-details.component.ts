import {Component, inject, OnInit} from '@angular/core';
import {PokemonResponse} from "../models/pokemon.model";
import {PokemonService} from "../services/pokemon.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
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
export class PokemonDetailsComponent implements OnInit {
  private pokemonService = inject(PokemonService)
  private route = inject(ActivatedRoute)
  pokemon$!: Observable<PokemonResponse>;

  ngOnInit() {
    const pokemonName = this.route.snapshot.params['pokemonId'];

    this.pokemon$ = this.pokemonService.getPokemonByName(pokemonName)

  }
}
