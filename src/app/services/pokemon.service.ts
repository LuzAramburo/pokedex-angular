import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PokedexResponse} from "../models/pokedex.model";
import {PokemonResponse} from "../models/pokemon.model";
import {BehaviorSubject, from, map, mergeMap, of, tap, toArray} from "rxjs";

const baseUrl = "https://pokeapi.co/api/v2/pokemon"
const offset = 52

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)

  private pokemonList = new BehaviorSubject<PokemonResponse[] | null>(null)
  pokemonList$ = this.pokemonList.asObservable()

  private selectedPokemon = new BehaviorSubject<PokemonResponse | null>(null);
  selectedPokemon$ = this.selectedPokemon.asObservable()

  getPokemons() {
    const cachedList = this.pokemonList.getValue();

    if (cachedList) return of(cachedList);

    return this.http.get<PokedexResponse>(`${baseUrl}?limit=${offset}`).pipe(
      map(response => response.results),
      mergeMap(pokemons => from(pokemons).pipe(
        mergeMap(pokemon =>
          this.http.get<PokemonResponse>(pokemon.url).pipe(
            map(pokemonResponse => ({
              ...pokemonResponse,
              url: pokemon.url
            })),
          )
        ),
        toArray()
      )),
      // tap(response => console.log(response)),
      tap(list => this.pokemonList.next(list))
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

  clearSelectedPokemon() {
    return this.selectedPokemon.next(null)
  }
}
