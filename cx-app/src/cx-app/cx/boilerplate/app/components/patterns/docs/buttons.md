---
name: Buttons
description: |
  #### What
  The rules on what and how to implement actionable buttons within the app.

  #### Use when
  You have a direct action you want the user to partake.  Clicking the button will make something happen.
  
  #### Working Examples
  * Escalate Button on Alert Grid/Alert Details
  * Assign User on Alert Grid/Alert Details
  * Manage Alert Menu on Alert Details
    
  #### Types
  * Single Buttons
  * Button Actions
  * Button Menu
  
  #### Implement
  
  #### Options / Global Configuration
  ##### Button Groups
  To create a button group create a wrapper div with the class `btn-group`.  Each button within this group with join together to create one seamless bar.
  ##### Colors
  - Primary: Add class `btn-primary`
  - Secondary: Add class `btn-info`
  - Warning: Add class `btn-warning`
  
  #### Usability / Considerations
  * Be aware of when you have more than 5-7 actions; those are typically too many actions for the user to dissemenate easily.  You can typically group actions down; once you have more than 5-7 actions. 
  * Icons are not neccessary for each button.
  * Color coding are for the following button states:
    - Primary page action
    - Error
    - Secondary color highlighting a group of buttons.
    - Disabled states

  #### Links
  [Angular UI Documentation for Buttons](https://angular-ui.github.io/bootstrap/#/buttons)
  
html: |
  <div class="row">
    <div class="col-md-12">
      <h5 translate>Button Menu</h5>
      <div class="btn-group">
        <div uib-dropdown="" class="btn-group pull-right spacer-out-left-sm dropdown">
          <button id="dropdownMenu" uib-dropdown-toggle="" class="btn btn-default dropdown-toggle" aria-haspopup="true" aria-expanded="false">
            <i class="icon icon-settings"></i>
            <span translate="">Manage</span>
            <span class="caret"></span>
          </button>
          <ul role="menu" aria-labelledby="dropdownMenu" uib-dropdown-menu="" class="dropdown-menu">
            <li>
              <a href="" ng-click="pc.escalate()">
                <i class="icon icon-arrow-up"></i>
                <span translate>Escalate</span>
              </a>
            </li>
            <li>
              <a href="" ng-click="pc.openModal('assign')">
                <i class="icon icon-users"></i>
                <span translate>Assign</span>
              </a>
            </li>
            <li>
              <a href="" ng-click="pc.openModal('edit')">
                <i class="icon icon-pencil"></i>
                <span translate>Edit</span>
              </a>
            </li>
            <li>
              <a href="" ng-click="pc.openModal('comment')">
                <i class="icon icon-comment-outline"></i>
                <span translate>Comment</span>
              </a>
            </li>
            <li>
              <a href="" ng-click="pc.openModal('close')">
                <i class="icon icon-cross-circle"></i>
                <span translate>Close</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <h5 translate>Button Group and Button Colors</h5>
      <div class="btn-group">
        <button class="btn btn-group btn-primary">
          <i class="icon icon-edit"></i>
          <span translate>Edit</span>
        </button>
        <button class="btn btn-group btn-warning">
          <i class="icon icon-warning"></i>
          <span translate>Edit Error</span>
        </button>
        <button class="btn btn-group btn-info">
          <i class="icon icon-info"></i>
          <span translate>Info (secondary) button</span>
        </button>
      </div>
    </div>
    <div class="col-md-12">
      <h5 translate>Button with icon</h5>
      <div class="row">
        <div class="col-md-5">
          <button class="btn btn-default">
            <i class="icon icon-refresh"></i>
            <span translate>Refresh</span>
          </button>
        </div>
        <div class="col-md-1">
          <p>vs:</p>
        </div>
        <div class="col-md-6">
          <button class="btn btn-default">
            <span translate>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
---
```html
  <div class="row">
    <div class="col-md-12">
      <h5 translate>Button Menu</h5>
      <div class="btn-group">
        <div uib-dropdown="" class="btn-group pull-right spacer-out-left-sm dropdown">
          <button id="dropdownMenu" uib-dropdown-toggle="" class="btn btn-default dropdown-toggle" aria-haspopup="true" aria-expanded="false">
            <i class="icon icon-settings"></i>
            <span translate="">Manage</span>
            <span class="caret"></span>
          </button>
          <ul role="menu" aria-labelledby="dropdownMenu" uib-dropdown-menu="" class="dropdown-menu">
            <li>
              <a href="" ng-click="pc.escalate()">
                <i class="icon icon-arrow-up"></i>
                <span translate>Escalate</span>
              </a>
            </li>
            <li>
              <a href="" ng-click="pc.openModal('assign')">
                <i class="icon icon-users"></i>
                <span translate>Assign</span>
              </a>
            </li>
            <li>
              <a href="" ng-click="pc.openModal('edit')">
                <i class="icon icon-pencil"></i>
                <span translate>Edit</span>
              </a>
            </li>
            <li>
              <a href="" ng-click="pc.openModal('comment')">
                <i class="icon icon-comment-outline"></i>
                <span translate>Comment</span>
              </a>
            </li>
            <li>
              <a href="" ng-click="pc.openModal('close')">
                <i class="icon icon-cross-circle"></i>
                <span translate>Close</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-12">
      <h5 translate>Button Group and Button Colors</h5>
      <div class="btn-group">
        <button class="btn btn-group btn-primary">
          <i class="icon icon-edit"></i>
          <span translate>Edit</span>
        </button>
        <button class="btn btn-group btn-warning">
          <i class="icon icon-warning"></i>
          <span translate>Edit Error</span>
        </button>
        <button class="btn btn-group btn-info">
          <i class="icon icon-info"></i>
          <span translate>Info (secondary) button</span>
        </button>
      </div>
    </div>
    <div class="col-md-12">
      <h5 translate>Button with icon</h5>
      <div class="row">
        <div class="col-md-5">
          <button class="btn btn-default">
            <i class="icon icon-refresh"></i>
            <span translate>Refresh</span>
          </button>
        </div>
        <div class="col-md-1">
          <p>vs:</p>
        </div>
        <div class="col-md-6">
          <button class="btn btn-default">
            <span translate>Refresh</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  
