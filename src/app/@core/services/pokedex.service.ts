import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, take, tap } from 'rxjs';
import { environment } from 'src/enviroments/env';

@Injectable({
  providedIn: 'root'
})
export class PokedexService {

  baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getpokemons(): any {
    return this.http.get(`${this.baseUrl}/pokemon?limit=800`)
  }

  getMorePokemonData(name: string) {
    return this.http.get(`${this.baseUrl}/pokemon/${name}/`)
  }

}
