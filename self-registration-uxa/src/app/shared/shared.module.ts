import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    SideNavigationComponent,
    NavigationBarComponent
  ],
  exports: [
    SideNavigationComponent,
    NavigationBarComponent
  ]
})
export class SharedModule { }
