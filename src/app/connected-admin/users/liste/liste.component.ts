import {AfterViewInit, ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../../shared/services/user.service";
import {MdbTableDirective, MdbTablePaginationComponent} from "ng-uikit-pro-standard";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeUsersComponent implements OnInit, AfterViewInit, OnDestroy {
  subs: Subscription = new Subscription();
  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination!: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable!: MdbTableDirective
  @HostListener('input') oninput() {
    this.searchItems();
  }
  listOfUsers: any = '';
  elements: any = [];
  previous: any = [];
  searchText: string = '';

  constructor(private userService: UserService,private cdRef: ChangeDetectorRef) {  }

  searchItems() {
    const prev = this.mdbTable.getDataSource();
    if (!this.searchText) {
      this.mdbTable.setDataSource(this.previous);
      this.elements = this.mdbTable.getDataSource();
    }
    if (this.searchText) {
      this.elements = this.mdbTable.searchLocalDataBy(this.searchText);
      this.mdbTable.setDataSource(prev);
    }
  }
  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(15);
    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    this.subs.add(this.userService.findAllUsers().subscribe(data => {
      this.listOfUsers = data;
    }));
    for (let i = 1; i <= 15; i++) {
      this.elements.push({
        id: i,
        first: {nick: 'Nick ' + i, name: 'Name ' + i},
        last: 'Name ' + i,
        handle: 'Handle ' + i
      });
    }

    this.mdbTable.setDataSource(this.elements);
    this.elements = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }
}
