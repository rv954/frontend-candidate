import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private apiUrl = 'http://localhost:5000';
  private lastSearchResults: any[] = [];
  private lastSearchTerm: string = '';
  private lastSearchColor: string = '';

  constructor(private http: HttpClient) {}

  search(term: string, color: string): Observable<any> {
    let params = {};
    if (term) params['term'] = term;
    if (color) params['color'] = color;

    return this.http.get(`${this.apiUrl}/search`, { params }).pipe(
      tap((response: any) => {
        this.lastSearchResults = response.matches;
        this.lastSearchTerm = term;
        this.lastSearchColor = color;
      })
    );
  }

  getLastSearchResults() {
    return this.lastSearchResults;
  }

  getLastSearchState() {
    return {
      results: this.lastSearchResults,
      term: this.lastSearchTerm,
      color: this.lastSearchColor,
    };
  }

  getDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/details/${id}`);
  }
}
