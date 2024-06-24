import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PokemonResponse} from "../models/pokedex.model";

const baseUrl = "https://pokeapi.co/api/v2/pokemon"
const offset = 100

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)

  getPokemons () {
    return this.http.get<PokemonResponse>(`${baseUrl}?limit=${offset}`)
  }
}
