---
name: Popovers
description: |
  #### What
  Add small overlay content, like those found in iOS, to any element for housing secondary information.

  #### Use when
  When you have supporting, secondary information that needs to exposed in a drill-down fashion.
  
  #### Working Examples
  - Alert Detail Overview - Alert Fields Source/Target <br />
    <span style="color: gray">When hovering over the Source/Target titles you get a popover explaining what fields are shown in greater detail. </span>
  
  #### Usability
  - Do not include actions in a popover.
  - Close the popover as soon as people click/tap anywhere outside its bounds, including the control that reveals the popover.
  - Be aware of popover placement.  This can interfere with other actions or visibility.  We recommend left or right rather than top or left.
  
  #### Documentation
  - [Angular UI Bootstrap Popover Documentation](https://angular-ui.github.io/bootstrap/#/popover)
  
html: |
  <button popover-animation="true" uib-popover="I fade in and out!" type="button" popover-placement="left" class="btn btn-default">Popover</button>
  
  
---
```html
<button popover-animation="true" uib-popover="I fade in and out!" popover-placement="left" type="button" class="btn btn-default">Popover</button>

