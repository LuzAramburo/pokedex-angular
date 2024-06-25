import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PokedexResponse} from "../models/pokedex.model";
import {PokemonResponse} from "../models/pokemon.model";
import {Observable} from "rxjs";

const baseUrl = "https://pokeapi.co/api/v2/pokemon"
const offset = 100

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)

  getPokemons () {
    return this.http.get<PokedexResponse>(`${baseUrl}?limit=${offset}`)
  }

  getPokemonByName(name: string) {
    return this.http.get<PokemonResponse>(`${baseUrl}/${name}`)
  }

  getPokemonByUrl(url: string) {
    return this.http.get<PokemonResponse>(url)
  }
}
