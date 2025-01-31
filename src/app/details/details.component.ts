import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonService } from '../person.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  person: any;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.personService.getDetails(+id).subscribe({
      next: (data) => {
        this.person = data;
      },
      error: (error) => {
        this.errorMessage =
          'An error occurred while fetching details';
      },
    });
  }
}
