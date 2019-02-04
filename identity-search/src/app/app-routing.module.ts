import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentitySearchComponent } from './identity-search/identity-search.component';

const routes: Routes = [
  { path : 'identity-search', component : IdentitySearchComponent },
  { path : 'external-search', component : IdentitySearchComponent, data: {searchForExternal: true} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
