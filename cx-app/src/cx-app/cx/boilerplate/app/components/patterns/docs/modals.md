---
name: Modals
description: |
  #### What
  Opens a floating window.  Typically with a small, related bit of information or relation actions to the larger data element on the primary screen.
  
  #### Types
  ##### Small Modal
  The small modal is used for small actions or acknowledgement for related information.  The small modal is used to direct focus and action.
  
  ##### Normal (medium) Modal
  The normal modal, used for sub-information that isn't primary, but has value.  Actions are often represented within the Normal Modal.
  
  ##### Wide (full) Modal
  For complex actions or views; the wide modal is meant for those groupings that require multiple columns, or a data-grid.  
  
  * NOTE: Try and keep actions to a minimum, or a singular flow within this modal.
  
  #### Considerations
  These are considerations to using modals
  * The usability often decreases if a user has to scroll down in a modal.
  * Modal information should be related or an extension to the information on the 'parent'/'launching' window.
  * Modals being launched off of modals are BAD; do not use this pattern.

  #### Links
  * Angular UI Bootstrap Modals (0.14.3): http://angular-ui.github.io/bootstrap/versioned-docs/0.14.3/#/modal
  
  
html: |
  <div ng-controller="demoController">
      <button type="button" class="btn btn-default" ng-click="open()">Open me!</button>
      <button type="button" class="btn btn-default" ng-click="open('lg')">Large modal</button>
      <button type="button" class="btn btn-default" ng-click="open('sm')">Small modal</button>
      <button type="button" class="btn btn-default" ng-click="toggleAnimation()">Toggle Animation ({{ animationsEnabled }})</button>
      <div ng-show="selected">Selection from a modal: {{ selected }}</div>
  </div>
---
```html
  <div ng-controller="demoController">
      <button type="button" class="btn btn-default" ng-click="open()">Open me!</button>
      <button type="button" class="btn btn-default" ng-click="open('lg')">Large modal</button>
      <button type="button" class="btn btn-default" ng-click="open('sm')">Small modal</button>
      <button type="button" class="btn btn-default" ng-click="toggleAnimation()">Toggle Animation ({{ animationsEnabled }})</button>
      <div ng-show="selected">Selection from a modal: {{ selected }}</div>
  </div>
```js
  // demoController
  $scope.open = function (size) {
      var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: "demoModal",
          controller: "demoModalInstanceController",
          size: size,
          resolve: {
              items: function () {
                  return $scope.items;
              }
          }
      });
      logger.info("SCOPE OPEN", $scope.items);
  
      modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
      }, function () {
          $log.info("Modal dismissed at: " + new Date());
      });
  };
  // Modal Controller
  /**
   * @ngdoc function
   * @name modalDemoController
   * @memberof app.patterns
   */
  function ModalDemoController ($scope, logger, $uibModalInstance, items) {
      logger.info("MODAL: ITEMS2: ", items);
      $scope.items = items;
      $scope.selected = {
          item: $scope.items[0]
      };
  
      /**
       * Yes function for modal.
       */
      $scope.ok = function () {
          $uibModalInstance.close($scope.selected.item);
      };
  
      /**
       * No function for modal.
       */
      $scope.cancel = function () {
          $uibModalInstance.dismiss("cancel");
      };
  }
