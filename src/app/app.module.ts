import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import {UpdateUserComponent} from './users/updateuser.component';

// export function createApollo(httpLink: HttpLink) {
//   return {
//     link: httpLink.create({uri: 'https://localhost/graphql'}),
//     cache: new InMemoryCache(),
//   };
// }
// Apollo
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule, GraphQLModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
