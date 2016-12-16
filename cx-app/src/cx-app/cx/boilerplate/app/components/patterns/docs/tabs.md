---
name: Tabs
description: |
  #### What
  Creates a series of subtabs, using the angular-ui tabset directives.
  
  #### Types
  There are primary tabs (seen on Alert Detail View), which form primary page separation.
  
  #### Considerations
  These are considerations
  - Try not to nest tabs directly (subtabs).  Pattern typically isn't clear to users.
  - Tab title length is a concern, especially with i18n.
  - No actions in a tab header.

  #### Links
  [Angular UI Documentation for Tabs](https://angular-ui.github.io/bootstrap/#/tabs)
  
html: |
  <div ng-controller="demoController">
    <uib-tabset>
      <uib-tab ng-repeat="tab in groups"
         heading="{{ tab.title }}">
        <div id="{{ tab.title | lowercase }}">
          <div class="tab-pane fade in">
            {{ tab.content }}
          </div>
        </div>
      </uib-tab>
    </uib-tabset>
  </div>
  
---
```html
<uib-tabset>
  <uib-tabset>
    <uib-tab ng-repeat="tab in groups"
       heading="{{ tab.title }}">
      <div id="{{ tab.title | lowercase }}">
        <div class="tab-pane fade in">
          {{ tab.content }}
        </div>
      </div>
    </uib-tab>
  </uib-tabset>
</uib-tabset>
