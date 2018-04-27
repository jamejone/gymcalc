import { Component, OnInit } from '@angular/core';
import { EquivalentLiftCalcModel } from '../equivalent-lift-calc-model';


@Component({
  selector: 'app-equivalent-lift-calc',
  templateUrl: './equivalent-lift-calc.component.html',
  styleUrls: ['./equivalent-lift-calc.component.css']
})
export class EquivalentLiftCalcComponent implements OnInit {

  model: EquivalentLiftCalcModel = {
    weight: 135,
    sex: 'Male'
  };

  constructor() { }

  ngOnInit() {
  }

}
