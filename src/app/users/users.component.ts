import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import gql from 'graphql-tag';
import {nc_user, Query} from '../types';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Observable<nc_user[]>;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.users = this.apollo.watchQuery<Query>({
      query: gql`
        query allusers {
          nc_user{
            id
            name
            email
            title
            birthday
          }
        }
      `,
    })
      .valueChanges
      .pipe(
        map(result => result.data.users)
      );
  }
  }

