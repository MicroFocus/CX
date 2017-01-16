---
name: Alerts
description: |
  #### What
  Alerts are made using the [angular-growl-v2](https://github.com/JanStevens/angular-growl-2) library.  
  
  These are used in various wrapper calls, but this is the core of the both widget level and page level notifications.

  #### Use when
  For page level or widget level critical notifications.
  
  - __Widget Level__: Notification would appear inline across top portion of widget normally.  
  - __Page Level__: Notification would appear inline on page as needed.  It should be obvious as to what the notification is for; so it should be in a related, visible area. (Knowledge Base is a good example of inline page notifications.)
  - __Global Level__: This will occur rarely.  It will take place across the top of the page; as seen in Licensing.
  
  ######  What types of alerts?
  There are 4 basic alert types:
  - Warning
  - Info
  - Danger
  - Success
  
  #### Implement
  To implement just include the following directive: (note: limit-messages is optional, as is inline)
  ```html
  <div class="inline-notification" growl reference="1" inline="true" limit-messages="XXX"></div>
  ```
  
  #### Options /  Global Configuration
  When you have multiple, widget-level notifications on a page you need to be able to target a specific one.
  
  To do this use the reference ID.
  ```js
  growl.warning("This is only send to growl directive with referenceId = 1", {referenceId: 1});
  ```
  
  ###### Unique Messages: (default: true)
  Accept only unique messages as a new message. If a message is already displayed (text, severity and title are the same) then this message will not be added to the displayed message list.
   
   Set to false, to always display all messages regardless if they are already displayed or not. Uniqueness of messages is determined by the message text, severity and title.
 
  ```js
  app.config(["growlProvider", function(growlProvider) {
    growlProvider.onlyUniqueMessages(false);
  }]);
  ```
  ###### Reverse Order Messages (default: false)
  By default new messages are added to the bottom of the growl stack. This property allows to reverse the default order. When set to true new messages will be placed at the top of the stack (instead of the default bottom).
  
  ```js
  app.config(['growlProvider', function(growlProvider) {
    growlProvider.globalReversedOrder(true);
  }]);
  ```
  ###### Time-To-Live (TTL) (default: none)
  __Important__: Clicking on a growl message will disable the TTL. This is handy for longer messages and allows the user to completely read it. Dismissing the message is still possible by clicking on it again.
  
  The time to live of a messages can be controlled globally, globally per severity or per message. When the timer is over the message will be removed. Following example sets a global time to live for all the messages:
  
  ```js
  app.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive(5000);
  }]);
  ```
  or you can set per severity
  
  ```js
  app.config(['growlProvider', function(growlProvider) {
    growlProvider.globalTimeToLive({success: 1000, error: 2000, warning: 3000, info: 4000});
  }]);
  ```
  
  or by per-notification basis
  
  ```js
  growl.warning("Override global ttl setting", {ttl: 10000});
  ```
  
  ###### Time-To-Live Countdown (default: false)
  Messages will have a countdown timer representing the TTL. The countdown timer can be disabled on a global and per message basis.
  
  ```js
  app.config(['growlProvider', function(growlProvider) {
    growlProvider.globalDisableCountDown(true);
  }]);
  // or by messages:
  growl.warning("Does not have count down timer", {disableCountDown: true});
  ```
  
html: |
  <div ng-controller="demoController">
      <h4>Default Notifications - Limited to 2</h4>
      <div class="container-fluid">
          <div class="inline-notification" growl reference="1" inline="true" limit-messages="2"></div>
          <div class="btn-group" role="group">
              <button ng-click="basicUsage('warning', {referenceId: 1})" type="button" class="btn btn-warning">Warning</button>
              <button ng-click="basicUsage('info', {referenceId: 1})" type="button" class="btn btn-info">Info</button>
              <button ng-click="basicUsage('danger', {referenceId: 1})" type="button" class="btn btn-danger">Danger</button>
              <button ng-click="basicUsage('success', {referenceId: 1})" type="button" class="btn btn-success">Success</button>
          </div>
      </div>
      <h4>Custom Notifications</h4>
      <div class="container-fluid">
          <div class="inline-notification" growl reference="2" inline="true"></div>
          <div class="btn-group" role="group">
              <button ng-click="basicUsage('warning', {referenceId: 2, ttl: 10000, disableCountDown: false})" type="button" class="btn btn-warning">Time To Live</button>
              <button ng-click="basicUsage('info', {referenceId: 1})" type="button" class="btn btn-info">Target Default Notification</button>
          </div>
      </div>
  </div>


---
```html
<div ng-controller="demoController">
      <div class="container-fluid">
          <div class="inline-notification" growl reference="demoAlert" inline="true"></div>
          <div class="row">
              <div class="col-md-12">
              <button ng-click="basicUsage('warning', {referenceId: 1})" type="button" class="btn btn-warning">Warning</button>
              <button ng-click="basicUsage('info', {referenceId: 1})" type="button" class="btn btn-info">Info</button>
              <button ng-click="basicUsage('danger', {referenceId: 1})" type="button" class="btn btn-danger">Danger</button>
              <button ng-click="basicUsage('success', {referenceId: 1})" type="button" class="btn btn-success">Success</button>
              </div>
          </div>
      </div>
  </div>

```js
// Growl Function
$scope.basicUsage = function (type, config) {
    switch (type) {
        case "success":
            growl.success("<b>I'm</b> a success message and not unique", config);
            break;
        case "info":
            growl.info("I'm an info message", config);
            break;
        case "warning":
            growl.warning("I'm the warning message", config);
            break;
        default:
            growl.error("Ups, error message here!", config);
    }
};
/**
 * @name app.runBlock.growl_templateCache
 * @memberof app.runBlock
 * @desc
 *  This updates the templateCache for Angular-Growl.  Extended template to remove the `&times;` close cross.
 * @requires $templateCache
 * @requires growl
 */
$templateCache.put("templates/growl/growl.html", "" +
    "<div class=\"growl-container\" ng-class=\"wrapperClasses()\">" +
        "<div class=\"growl-item alert\" " +
            "ng-repeat=\"message in growlMessages.directives[referenceId].messages\" " +
            "ng-class=\"alertClasses(message)\" " +
            "ng-click=\"stopTimeoutClose(message)\">" +
            "<button type=\"button\"" +
                "class=\"close\"\ " +
                "data-dismiss=\"alert\" " +
                "aria-hidden=\"true\" " +
                "ng-click=\"growlMessages.deleteMessage(message)\"" +
                "ng-show=\"!message.disableCloseButton\">" +
                    " " +
            "</button>" +
            "<button type=\"button\"" +
                "class=\"close\"" +
                "aria-hidden=\"true\"" +
                "ng-show=\"showCountDown(message)\">" +
                    "{{ message.countdown }}" +
            "</button>" +
            "<h4 class=\"growl-title\" ng-show=\"message.title\" ng-bind=\"message.title\"></h4>" +
            "<div class=\"growl-message\" ng-bind-html=\"message.text\"></div>" +
        "</div>" +
    "</div>"
);
