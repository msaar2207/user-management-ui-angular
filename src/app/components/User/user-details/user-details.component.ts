import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/userServices/user.service';
import { User } from '../../../models/user/user.model';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user!: User;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id') || '';
    this.getUserDetails(userId);
  }

  getUserDetails(id: string) {
    this.userService.getUserById(id).subscribe(user => this.user = user);
  }
}
