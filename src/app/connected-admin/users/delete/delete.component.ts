import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

    userId = '';
    constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

    ngOnInit(): void {
      this.route.params.subscribe(data => {
        this.userId = data.id;
      });

      if (this.userId) {
        this.userService.deleteUser(this.userId).subscribe(data => {
          alert('Delete was successfully');
          this.router.navigate(['list']);

        }, err => {
          alert('Error !');
        });
      }
    }

}
