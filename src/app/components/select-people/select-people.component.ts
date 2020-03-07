import { Component, OnInit, Input } from '@angular/core';
import { SelectPeopleService } from './select-people.service';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-select-people',
  templateUrl: './select-people.component.html',
  styleUrls: ['./select-people.component.scss']
})
export class SelectPeopleComponent implements OnInit {
  @Input() control: FormControl;

  people = [];

  constructor(private service: SelectPeopleService) { }

  ngOnInit() {
    this.service.getPeople().subscribe(response => {
      this.people = response;
    });
  }

}
