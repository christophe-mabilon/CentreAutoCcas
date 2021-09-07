import {Component, Input, OnInit} from '@angular/core';
import {Marque} from '../../shared/interface/marque.interface';


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-marque]',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.scss']
})
export class MarqueComponent implements OnInit {
  @Input() marques! :any;
  selectedMarques: any;
  nom!: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  status: boolean = false;




}








