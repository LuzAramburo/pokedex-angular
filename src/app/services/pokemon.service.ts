import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PokedexResponse} from "../models/pokedex.model";
import {PokemonResponse} from "../models/pokemon.model";
import {BehaviorSubject, catchError, map, Subject, tap, throwError} from "rxjs";

const baseUrl = "https://pokeapi.co/api/v2/pokemon"
const offset = 100

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)
  selectedPokemon = new BehaviorSubject<PokemonResponse | null>(null);

  getPokemons() {
    return this.http.get<PokedexResponse>(`${baseUrl}?limit=${offset}`).pipe(
      map(response => response.results)
    )
  }

  getPokemonByName(name: string) {
    return this.http.get<PokemonResponse>(`${baseUrl}/${name}`)
  }

  getPokemonByUrl(url: string) {
    return this.http.get<PokemonResponse>(url).pipe(
      tap(response => this.selectedPokemon.next(response))
    )
  }
}
