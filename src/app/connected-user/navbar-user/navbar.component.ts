import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponentUser implements OnInit {
userId = localStorage.getItem('userId');
  constructor() { }

  ngOnInit(): void {
  }

}
