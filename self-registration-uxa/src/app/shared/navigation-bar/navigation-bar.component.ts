import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.less']
})
export class NavigationBarComponent {

  @Input() navigation: NavigationBarItem[];

}

export interface NavigationBarItem {
  title: string;
  path: string;
}
