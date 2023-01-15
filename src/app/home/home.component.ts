import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, forkJoin, map, of, switchMap, take, tap } from 'rxjs';
import { PokedexService } from '../@core/services/pokedex.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @Output() selected: any
  isLoading$ = new BehaviorSubject(false)
  displayedColumns: string[] = ['position', 'image', 'name'];
  lettersColumns: string[] = ['letter', 'count']
  lettersDataSource = new MatTableDataSource()
  dataSource = new MatTableDataSource<any>();
  data: any[] = [];
  lettersData: any

  @ViewChild('pokemonPaginator')
  pokemonPaginator!: MatPaginator;
  length = 10;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pokemons: any[] = [];

  pokemon$ = this.pokedex.getpokemons().pipe(
    tap(() => this.isLoading$.next(true)),
    switchMap((data: any) => [...data.results]),
    switchMap((p: any) => {
      return this.pokedex.getMorePokemonData(p.name).forEach((p) => this.data.push(p))
    }),
    tap(() => {
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.pokemonPaginator;
      this.lettersData = this.countFirstLetter(this.data)
      this.lettersDataSource = this.lettersData
      this.isLoading$.next(false)
    })
  )
  constructor(private pokedex: PokedexService) { }

  ngOnInit(): void {
  }


  countFirstLetter(arr: any[]) {
    const counts: any = {};
    const names = arr.map((p) => p.name)
    names.forEach(name => {
      const letter: string = name[0];
      if (counts[letter]) {
        counts[letter]++;
      } else {
        counts[letter] = 1;
      }
    });
    return Object.keys(counts).map(letter => {
      return { letter, count: counts[letter] };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getRow(row: any) {
    this.selected = row
  }

}
