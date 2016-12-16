---
name: Grids
description: |
  #### What
  Creates a data table.
  
  #### Types
  This is primarily used to show large, grouped data sets.  These can be filterable, paginated.
  
  #### Considerations
  These are considerations:
  - Pagination (for consistency sake we recommend always displaying it; though disabled if a single page)
  - Sorting
  - Multi-select
  - Mutli-actions (avoid multiple actions per row, use multi-select and global grid actions)
  
  ##### Pagination
  - Always show pagination bar.
  
  ##### Sorting
  Sorting is accomplished through clicking the header of the table cell.  This will sort the whole table (pagination and all).
  
  - Shift-clicking on the column will have secondary sorts.
  - Clicking on the same column will sort in opposite direction.
  - Arrows on column headers reflect the sort status.
  
  ##### Multi-Select
  If the grid allows selection of more than one row at a time; a first column of select boxes will be available to select the rows.
  - Grid actions are not to be repeated on a per-row basis.
  - On single select rows; if it's a single action; then clicking the row can affect that action.
  - On single select rows with multiple actions use the multi-select option, but restrict to a single row.
  
  ##### Actions
  The grid shown should have one selection box per row.  Having multiple check boxes will confuse user.  Select the row(s) and then choose the actions from the global area.
  - Table actions for the rows will typically appear in the top right area of the grid.
  - Grid actions should not be hidden behind dropdown menus. 
  
  #### Configuration
  - See the UI Grid API.
  
  #### Layout Options
  There are wireframes showing collapsible configuration options: 
  
  #### Links
  * [Angular UI Grid Site](http://ui-grid.info/)
  * [UI Grid API](http://ui-grid.info/docs/#/api)
  
html: |
  <div ng-controller="demoController">
    <div class="alerts-grid ui-grid" ui-grid="gridOptions" ui-grid-cellnav ui-grid-pagination ui-grid-selection ui-grid-resize-columns ui-grid-auto-resize grid-scroll>
    </div>
  </div>
  
---
```html
<div ui-i18n="en" ng-show="vm.loading !== 1 && !vm.fatalError" class="" style="">
  <div ui-i18n="en" class="alerts-grid ui-grid" ui-grid="vm.gridOptions" ui-grid-cellnav="" ui-grid-pagination="" ui-grid-selection="" ui-grid-resize-columns="" ui-grid-auto-resize="" grid-scroll="" ng-if="vm.gridTotalCount > 0" ng-style="vm.getTableHeight()">
  </div>
</div>
