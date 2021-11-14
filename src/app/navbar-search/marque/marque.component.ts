import {Component, Input, OnInit} from '@angular/core';
import {Marque} from '../../shared/interface/marque.interface';
import {MarqueService} from "../../shared/services/marque.service";


@Component({
  // tslint:disable-next-line:component-selector
  selector: '[app-marque]',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.scss']
})
export class MarqueComponent implements OnInit {
  @Input() marques! :Marque;
  nom!: any;

  constructor(private marqueServ:MarqueService) {
  }

  ngOnInit(): void {

  }

  status: boolean = false;




}








