import { Component, OnInit, Input } from '@angular/core';
import { SecondCategory } from 'src/app/pages/models/secondcategory';
import { FirstCategory } from 'src/app/pages/models/firstcategory';

@Component({
  selector: 'app-secondcategory-edit',
  templateUrl: './secondcategory-edit.component.html',
  styleUrls: ['./secondcategory-edit.component.css']
})
export class SecondcategoryEditComponent implements OnInit {
  @Input() secondCategory: SecondCategory;
  @Input() firstCategories: FirstCategory[];
  constructor() { }

  ngOnInit() {

  }

}
