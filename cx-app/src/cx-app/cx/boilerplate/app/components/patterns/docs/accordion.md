---
name: Accordion Dynamic
description: |
  #### What
  Puts modules of content into a linear stack of panels that can be closed and opened independently of each other. The accordion also helps in shortening a page and making it more scannable.

  #### Use when
  The content modules are mutually exclusive. Content modules can consist of a list of items, links or text blocks.
  
  #### Working Examples
  - Escalate Modal
  
  #### Usability
  Longer pages can benefit users. Accordions shorten pages and reduce scrolling, but they increase the interaction cost by requiring people to decide on topic headings.
  
  An accordion menu is a vertically stacked list of headers that can be clicked to reveal or hide content associated with them. It is one of many ways you can expose content to users in a progressive manner. Allowing people to have control over the content by expanding it or deferring it for later lets them decide what to read and what to ignore. Giving people control is #3 on the list of the top heuristics for usable design. In theory, this concept sounds reasonably human centered.
  
  - [Accordions Are Not Always the Answer for Complex Content](https://www.nngroup.com/articles/accordions-complex-content/)
  
html: |
  <div ng-controller="demoController">
      <div id="accordion" class="radio-list-mega">
          <div class="rbm-list-item">
              <label>
                  <input type="radio" 
                         name="incidentSelection" 
                         class="pull-right ng-pristine ng-untouched ng-valid" 
                         value="100">
                  <div class="rbm-content">
                      <div class="row">
                          <div class="col-sm-8">
                              <h5 class="rbm-content-title heading-5">
                      <span class="strong">
                          Test Rule - Event Search
                      </span>
                              </h5>
                          </div>
                          <div class="col-sm-4">
                              <button translate="" class="btn btn-link btn-sm pull-right">
                                  Relevance: 100
                              </button>
                          </div>
                      </div>
                      <p>Test</p>
                      <div id="collapse" uib-collapse="!isActive" class="rbm-content-details collapse">
                          <div class="row">
                              <div class="col-sm-3">
                                  <div>
                                      <div class="label-block-inline">
                                          <span translate="">Category:</span><span class="label-block-value">An incident related to behavior that doesn't fit in another category.</span>
                                      </div>
                                  </div>
                                  <div>
                                      <div class="label-block-inline">
                                          <span translate="">State:</span><span class="label-block-value">Open</span></div>
                                  </div>
                              </div>
                              <div class="col-sm-3">
                                  <div>
                                      <div class="label-block-inline">
                                          <span translate="">Originator:</span><span class="label-block-value">admin</span>
                                      </div>
                                  </div>
                                  <div>
                                      <div class="label-block-inline">
                                          <span translate="">Responsible:</span><span class="label-block-value">admin</span>
                                      </div>
                                  </div>
                              </div>
                              <div class="col-sm-6">
                                  <div>
                                      <div class="label-block-inline">
                                          <span translate=""><span>Created date:</span></span><span class="label-block-value">4 days ago</span>
                                      </div>
                                  </div>
                                  <div>
                                      <div class="label-block-inline">
                                          <span translate="">Last modified date:</span><span class="label-block-value">4 days ago</span><span
                                              class="label-block-value">( Oct 21, 2016 2:59:52 PM )</span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </label>
              <a href="" 
                 data-toggle="collapse"
                 data-target="collapse"
                 data-parent="accordion"
                 ng-class="{'btn-toggle-details': !isActive, 'btn-toggle-details btn-collapse': isActive}"
                 class="btn-toggle-details"
                 ng-init="isActive = false"
                 ng-click="isActive = !isActive"></a>
          </div>
      </div>
  </div>
  
  
  
  
---
```js
angular
    .module("app.patterns")
    .controller("demoController", ["$scope"], function ($scope) {
        var vm = this;
        activate();

        function activate () {
            $scope.oneAtATime = true;
            $scope.groups = [
                {
                    title: "Dynamic Group Header - 1",
                    content: "Dynamic Group Body - 1"
                },
                {
                    title: "Dynamic Group Header - 2",
                    content: "Dynamic Group Body - 2"
                }
            ];
    
            $scope.items = ["Item 1", "Item 2", "Item 3"];
        }

        $scope.addItem = function () {
            var newItemNo = $scope.items.length + 1;
            $scope.items.push("Item " + newItemNo);
        };

        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };
    }
}
```html
<div ng-controller="demoController">
    <accordion close-others="oneAtATime">
        <accordion-group heading="{{ group.title }}" ng-repeat="group in groups">
            {{ group.content }}
        </accordion-group>
        <accordion-group heading="Dynamic Body Content">
            <p>The body of the accordion group grows to fit the contents</p>
            <button class="btn btn-default btn-sm" ng-click="addItem()">Add Item</button>
            <div ng-repeat="item in items">{{item}}</div>
        </accordion-group>
    </accordion>
</div>
