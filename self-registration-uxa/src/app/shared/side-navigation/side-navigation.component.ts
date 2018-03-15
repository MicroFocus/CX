import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.less']
})
export class SideNavigationComponent {

  @Input() navigation: SideNavigationItem[];

  open: boolean = true;

}

export interface SideNavigationItem {
  icon: string;
  title: string;
  path: string;
}
