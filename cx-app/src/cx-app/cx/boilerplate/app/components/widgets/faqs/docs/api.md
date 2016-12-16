# ADF API

This is a test markdown file that will describe the ADF API

You can see how to do the pluggable widget framework: http://wiki.esecurity.net:8090/display/SD/Pluggable+Widget+Framework

## ADF Events
* __adfToggleEditMode__: <span color="gray">$rootScope.$broadcast this event to toggle the editing of the Dashboard</span>
* __adfDashboardCollapseExpand__: <span color="gray">$rootScope.$broadcast this event to check the widget toggling state</span>
* __adfDashboardEditsCancelled__: <span color="gray">An internal ADF listener; this will set the edit mode on cancelling out of Dashboard Edit</span>
    ```js
    // This is the ADF function.
    $scope.$on("adfDashboardEditsCancelled", function () {
        $rootScope.isEditMode = false;
    });
    ```
* __widgetConfigChanged__: <span color="gray">An internal ADF listener; this will recompile the widget.</span>
    ```js
    // This is the ADF function.
    $scope.$on('widgetConfigChanged', function () {
      currentScope = compileWidget($scope, $element, currentScope);
    });
    ```
* __widgetReload__: <span color="gray">An internal ADF listener; this will recompile the widget.</span>
    ```js
    // bind reload function to an external ADF function
    $scope.reload = function () {
      $scope.$broadcast("widgetReload");
    };
    ```
* __startLoad__: <span color="gray">Used to start the Loading Spinner.  This loading template can be passed into ADF as a custom template.</span>
    ```js
    // This is how we currently show the loading screen until all calls are complete.  
    // We pass in the template with the brandingService.getLoadingTemplate call.
    $scope.$emit("startLoad", brandingService.getLoadingTemplate());
    ```
* __endLoad__: <span color="gray">Used to stop the loading template indicator.  Widget will remove the template and replace with the widget view template.</span>
    ```js
    // Now that all the calls are done; end the loading indicator.
    $scope.$emit("endLoad");
    ```
* __widgetError__: <span color="gray"></span>
* __widgetNotAllowed__: <span color="gray">If there is an error; you can call ADF to display an optional passed in Error Template.</span>
    ```js
    // Emit widgetNotAllowed by passing in the no permissions html template that needs to be displayed.
    $scope.$emit("widgetNotAllowed", notAllowedTemplate);
    ```
* __adfWidgetEnterEditMode__: <span color="gray"></span>
* __adfWidgetMovedInColumn__: <span color="gray"></span>
* __adfWidgetAddedToColumn__: <span color="gray"></span>
* __adfWidgetRemovedFromColumn__: <span color="gray"></span>
* __adfIsEditMode__: <span color="gray"></span>
* __adfDashboardChanged__: <span color="gray"></span>
* __adfDashboardEditsCancelled__: <span color="gray"></span>

