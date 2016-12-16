---
name: Navigation
description: |
  #### What
  High-level Navigation Patterns.  How a user interacts with your applications 'levels'
  
  #### Types
  **Global Navigation**  
  - The global navigation bar is the top-level black bar in the application. 
  - *note:* The Global Nav encompasses the Personal Nav
  
  **Personal**  
  - This is the dropdown menu associated with the individual user.
  - USER-FOCUSED
    - Profile (when profile is developed)
    
  **Administrative**  
  - This is the dropdown menu associated with the individual user.
    - __note__: Administration here is associated with the users priviliges; thus under their dropdown.
    - __note__: Horizontal bars or other grouping mechanisms can be used to seperate out these groups.
  - API Documentation
    - Logout
  
  **Primary**
  - The left-hand expandable bar.
  - GROUPINGS:
    - Top-level Data Views
      - Threat Dashboard
    - Top-level Administrative Views
      - Security Health
    - Top-level Informational/Flat/Empty Views
    
  **Secondary**
  - TBD
    
  **Tertiary**
  - Currently tabs set at a high page-level grouping.

  #### When to Use
  
  * Global
    * You don't use; it's already set in the app.
  * Personal
    * When you have account specific pages that belong to that user.  Configuration pages.  Password and Profile Pages.
  * Primary
    * When you have a top level element of Sentinel to Expose.
  
  
html: |
  <h5>Global Nav</h5>
  <nav id="global-nav" class="navbar-default navbar-global">
    <div class="container-fluid">
      <div class="navbar-header"><a ui-sref="root" aria-label="BOILERPLATE LABEL" title="Boilerplate" class="navbar-brand app-brand" href="#"></a>
        <button type="button" ng-click="vm.isCollapsed = !vm.isCollapsed" class="navbar-toggle"><span translate="" class="sr-only"><span class="ng-scope">Toggle navigation</span></span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
      </div>
      <div id="global-navbar-menu" uib-collapse="vm.isCollapsed" class="collapsed navbar-collapse in collapse" aria-expanded="true" aria-hidden="false" style="height: auto;">
        <ul class="nav navbar-nav navbar-right">
          <li uib-dropdown="" uib-keyword-nav="" class="dropdown"><a id="global-nav-user-dropdown" uib-dropdown-toggle="" href="" aria-label="vm.userDropdownAriaLabel" class="active ng-binding dropdown-toggle" aria-haspopup="true" aria-expanded="false"><span class="icon icon-user"></span>Boilerplate User<span class="caret"></span></a>
            <ul role="menu" aria-labelledby="global-nav-user-dropdown" class="uib-dropdown-menu dropdown-menu-global-nav dropdown-menu">
              <li class="menuitem"><a href="" ng-click="vm.logout($event)"><span class="icon icon-power-off"></span><span translate=""><span class="ng-scope">Log Out</span></span></a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <br /><br />
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
-----
```html
<nav id="global-nav" class="navbar-default navbar-global">
  <div class="container-fluid">
    <div class="navbar-header"><a ui-sref="root" aria-label="BOILERPLATE LABEL" title="Boilerplate" class="navbar-brand app-brand" href="#"></a>
      <button type="button" ng-click="vm.isCollapsed = !vm.isCollapsed" class="navbar-toggle"><span translate="" class="sr-only"><span class="ng-scope">Toggle navigation</span></span><span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></button>
    </div>
    <div id="global-navbar-menu" uib-collapse="vm.isCollapsed" class="collapsed navbar-collapse in collapse" aria-expanded="true" aria-hidden="false" style="height: auto;">
      <ul class="nav navbar-nav navbar-right">
        <li uib-dropdown="" uib-keyword-nav="" class="dropdown"><a id="global-nav-user-dropdown" uib-dropdown-toggle="" href="" aria-label="vm.userDropdownAriaLabel" class="active ng-binding dropdown-toggle" aria-haspopup="true" aria-expanded="false"><span class="icon icon-user"></span>Boilerplate User<span class="caret"></span></a>
          <ul role="menu" aria-labelledby="global-nav-user-dropdown" class="uib-dropdown-menu dropdown-menu-global-nav dropdown-menu">
            <li class="menuitem"><a href="" ng-click="vm.logout($event)"><span class="icon icon-power-off"></span><span translate=""><span class="ng-scope">Log Out</span></span></a></li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</nav>
