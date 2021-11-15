import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit, OnDestroy {
  subs: Subscription = new Subscription();
    userId = '';
    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

    ngOnInit(): void {
      this.subs.add(this.route.params.subscribe(data => {
        this.userId = data.id;
      }));

      if (this.userId) {
        this.subs.add(this.userService.deleteUser(this.userId).subscribe(data => {
          alert('Delete was successfully');
          this.router.navigate(['list']);

        }, err => {
          alert('Error !');
        }));
      }
    }
    ngOnDestroy(): void {
      if (this.subs) this.subs.unsubscribe();
    }
}
