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
  Users: Observable<nc_user[]>;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.Users = this.apollo.watchQuery<Query>({
      query: gql`
        query allusers {
          nc_users{
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
        map(result => {
           console.log(JSON.stringify(result.data));
          return result.data.nc_users;
        })
      );
  }
  }

