import { Component, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';

@Component({
  selector: 'app-updateuser',
  template: `
    <button (click)="upUser()">
      Updateuser
    </button>
  `
})
export class UpdateUserComponent {
  @Input() userid: string;

  constructor(private apollo: Apollo) {}

  upUser() {
    this.apollo.mutate({
      mutation: gql`
        mutation updateUser($userid: string!) {
            updateUser(userid: $userid) {
            id
            name
            title
            email
            birthday
          }
        }
      `,
      variables: {
        userid: this.userid,
      },
    }).subscribe();
  }
}
