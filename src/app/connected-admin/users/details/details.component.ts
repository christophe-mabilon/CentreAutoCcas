import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  userId: any = '';

  showUser: any;
  constructor(private userServ: UserService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe(data => {
      this.userId = data.id;
    });
    this.userServ.showUser(this.userId).subscribe(data => {
      this.showUser = data;
      console.log('user'+data);
    });


    }

}
