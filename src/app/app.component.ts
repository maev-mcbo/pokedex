import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-pokemon-app';

  constructor(

    private router: Router
  ) {
  }

  ngOnInit(): void {
    // this.pokemonService.findAll();
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/login']);
  }
}
