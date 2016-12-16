---
name: Dropdown Menu
description: |
  #### What
  Dropdown is a simple directive which will toggle a dropdown menu on click or programmatically.

  #### Use when
  - Try to avoid dropdown menus for:
    - Long data lists
    - Known data to user
    - States
  - We don't use Mega Menus.
  
  #### Working Examples
  - User Menu in Global Nav.
  - Alert Details - Manage Alerts
  
  #### Usability
  Drop-down menus are often more trouble than they are worth and can be confusing because Web designers use them for several different purposes. Also, scrolling menus reduce usability when they prevent users from seeing all their options in a single glance. source: [NN/G](https://www.nngroup.com/articles/drop-down-menus-use-sparingly/)
  
  All too often mobile forms make use of dropdown menus for input when simpler or more appropriate controls would work better. Here's several alternatives to dropdowns to consider in your designs and why. source: [Luke W](http://www.lukew.com/ff/entry.asp?1950)
  
  - Dropdown menus should tried to be avoided.
  
  #### Documentation
  - [Angular UI Bootstrap Popover Documentation](https://angular-ui.github.io/bootstrap/#/dropdown)
  
html: |
  <h5>Personal Nav</h5>
  <div id="global-navbar-menu" uib-collapse="vm.isCollapsed" class="collapsed navbar-collapse in collapse" aria-expanded="true" aria-hidden="false" style="height: auto;">
    <ul class="nav navbar-nav navbar-right">
      <li uib-dropdown="" uib-keyword-nav="" class="dropdown"><a id="global-nav-user-dropdown" uib-dropdown-toggle="" href="" aria-label="vm.userDropdownAriaLabel" class="active ng-binding dropdown-toggle" aria-haspopup="true" aria-expanded="false"><span class="icon icon-user"></span>Boilerplate User<span class="caret"></span></a>
        <ul role="menu" aria-labelledby="global-nav-user-dropdown" class="uib-dropdown-menu dropdown-menu-global-nav dropdown-menu">
          <li class="menuitem"><a href="" ng-click="vm.logout($event)"><span class="icon icon-power-off"></span><span translate=""><span class="ng-scope">Log Out</span></span></a></li>
        </ul>
      </li>
    </ul>
  </div>
  
---
```html
  <h5>Personal Nav</h5>
  <div id="global-navbar-menu" uib-collapse="vm.isCollapsed" class="collapsed navbar-collapse in collapse" aria-expanded="true" aria-hidden="false" style="height: auto;">
    <ul class="nav navbar-nav navbar-right">
      <li uib-dropdown="" uib-keyword-nav="" class="dropdown"><a id="global-nav-user-dropdown" uib-dropdown-toggle="" href="" aria-label="vm.userDropdownAriaLabel" class="active ng-binding dropdown-toggle" aria-haspopup="true" aria-expanded="false"><span class="icon icon-user"></span>Boilerplate User<span class="caret"></span></a>
        <ul role="menu" aria-labelledby="global-nav-user-dropdown" class="uib-dropdown-menu dropdown-menu-global-nav dropdown-menu">
          <li class="menuitem"><a href="" ng-click="vm.logout($event)"><span class="icon icon-power-off"></span><span translate=""><span class="ng-scope">Log Out</span></span></a></li>
        </ul>
      </li>
    </ul>
  </div>

