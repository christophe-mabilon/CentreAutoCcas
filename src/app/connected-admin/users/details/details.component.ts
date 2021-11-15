import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import {ActivatedRoute} from "@angular/router";
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
  userId: any = '';

  showUser: any;
  constructor(private userServ: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.subs.add(this.route.params.subscribe(data => {
      this.userId = data.id;
    }));
    this.subs.add(this.userServ.showUser(this.userId).subscribe(data => {
      this.showUser = data;
    }));
    }

    ngOnDestroy(): void {
      if (this.subs) this.subs.unsubscribe();
    }

}
