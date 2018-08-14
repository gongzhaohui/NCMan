import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User = {
    _key: 'gong',
    _id: 'users/gong',
    name: 'gongzhaohui',
    email: 'dfg005@dfg.com.cn',
    birthday: new Date('1971-04-30'),
    title: 'IT'
  };
  constructor() { }

  ngOnInit() {
  }

}
