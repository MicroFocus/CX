---
name: Panel - List
description: |
  #### What
  Add a searchable, tabbable panel interface to both modals and to single page views.

  #### Use when
  When you have supporting, secondary information that is in a long, complex list.
  
  #### Working Examples
  - Owner Browser in Assign Modal
  
  #### Usability
  
html: |
  <div class="col-md-6">
    <label translate>Owner browser</label>
    <p class="small" translate>
      Assign a user or role as the owner of the alert
      <div class="spacer-out-v-sm">
        <user-role-tenant-chooser users-permission-filter="'manageAlerts'" 
          roles-permission-filter="'manageAlerts'"
          hide-tenants='true'
          selected-Obj="vm.selectedOwnerObj"
          on-selection-changed="vm.selectionObjChanged(selectedObj)">
      </div>
      <div class="spacer-in-v-sm">
        <button class="btn btn-sm btn-default" type="button" ng-click="vm.isShowOwnerBrowser = 0">
          <i class="icon icon-hide"></i>
          <span translate>Hide owner browser</span>
        </button>
      </div>
    </p>
  </div>

  
  
---
```html
  <div class="col-md-6">
    <label translate>Owner browser</label>
    <p class="small" translate>
      Assign a user or role as the owner of the alert
      <div class="spacer-out-v-sm">
        <user-role-tenant-chooser users-permission-filter="'manageAlerts'" 
          roles-permission-filter="'manageAlerts'"
          hide-tenants='true'
          selected-Obj="vm.selectedOwnerObj"
          on-selection-changed="vm.selectionObjChanged(selectedObj)">
      </div>
      <div class="spacer-in-v-sm">
        <button class="btn btn-sm btn-default" type="button" ng-click="vm.isShowOwnerBrowser = 0">
          <i class="icon icon-hide"></i>
          <span translate>Hide owner browser</span>
        </button>
      </div>
    </p>
  </div>

