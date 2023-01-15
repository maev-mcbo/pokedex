import { Component, Input } from '@angular/core';
import { BehaviorSubject, combineLatest, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { PokedexService } from 'src/app/@core/services/pokedex.service';


@Component({
  selector: 'app-poke-detail',
  templateUrl: './poke-detail.component.html',
  styleUrls: ['./poke-detail.component.scss']
})

export class PokeDetailComponent {
  pokemon$ = new BehaviorSubject<any>({})

  @Input() set pokemon(value: any) {

    this.pokemon$.next(value)
  }
  constructor() {

  }

}
