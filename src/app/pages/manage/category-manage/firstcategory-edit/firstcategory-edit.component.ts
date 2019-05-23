import { Component, OnInit, Input } from '@angular/core';
import { FirstCategory } from 'src/app/pages/models/firstcategory';

@Component({
  selector: 'app-firstcategory-edit',
  templateUrl: './firstcategory-edit.component.html',
  styleUrls: ['./firstcategory-edit.component.css']
})
export class FirstcategoryEditComponent implements OnInit {

  @Input() firstCategory: FirstCategory;

  constructor() { }

  ngOnInit() {
  }

}
