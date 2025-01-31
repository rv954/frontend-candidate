import { Component, OnInit } from '@angular/core';

import { PersonService } from '../person.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  term: string = '';
  color: string = '';
  results: any[] = [];
  errorMessage: string = '';

  constructor(private personService: PersonService) {}
  ngOnInit(): void {
    const lastState = this.personService.getLastSearchState();
    this.term = lastState.term;
    this.color = lastState.color;
    this.results = lastState.results;

    if (this.results.length > 0) {
      this.errorMessage = '';
    }
  }

  search() {
    this.personService.search(this.term, this.color).subscribe({
      next: (data) => {
        this.results = data.matches;
        this.errorMessage = this.results.length
          ? ''
          : 'No results found';
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while searching';
      },
    });
  }
}
