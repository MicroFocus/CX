import { Component } from '@angular/core';
import { PageHeaderNavigationItem, PageHeaderIconMenu, ColorService, colorSets } from '@ux-aspects/ux-aspects';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators/filter';
import { first } from 'rxjs/operators/first';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  items: PageHeaderNavigationItem[] = [
    {
      title: 'Registration',
      select: () => this._router.navigate(['self-registration'])
    },
  ];

  constructor(private _router: Router, private _colorService: ColorService) {

    // perform initial navigation - required in a hybrid application
    _router.initialNavigation();

    // initially select the correct page header item
    _router.events.pipe(filter(event => event instanceof NavigationEnd), first()).subscribe((event: NavigationEnd) => {
      event.urlAfterRedirects.startsWith('/self-registration') ? this.items[0].selected = true : this.items[1].selected = true;
    });

    // Enable Micro Focus color palette
    _colorService.setColorSet(colorSets.microFocus);
  }
}
