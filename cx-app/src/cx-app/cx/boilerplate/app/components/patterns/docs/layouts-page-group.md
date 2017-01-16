---
name: Dashboard View
description: |
  #### What
  Used when multiple views into a subarea of the application.  Widgets provide the specific subviews on this page.
  
  #### Admin/Master Dashboard
  * Not a dashboard layout.
  
  #### Tabs
  Angular UI Tabs provide the page-level navigation into the subareas.

  #### Working Examples
  - Alert Details
  
  #### Usability
  Page-level actions are typically constrained in about a 50% page-width container.  This limits the width; especially at longer translations.  
  * Beware of hiding actions behind dropdowns; ensure transparency of the action to location.
  
  #### Wireframes
  * [Alert Detail Wireframes](https://netiq.mybalsamiq.com/projects/sentineld6/D6%20-%20Alert%20details%20page%20-%20Overview)
  * [Alert Detail History Wireframe](https://netiq.mybalsamiq.com/projects/sentineld6/D6%20-%20Alert%20details%20-%20History)
  
  #### Links
  [Angular UI Documentation for Tabs](https://angular-ui.github.io/bootstrap/#/tabs)
  
html: |
  <img src="https://netiq.mybalsamiq.com/mockups/5327392.png?key=11f7fd94e33907ede64cecf8d286896b5ba4a869" style="max-width: 100%;" />
-----
```html
<html ng-app="app" lang="en" ng-strict-di="">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title ng-bind="$state.current.data.pageTitle">Sentinel - Alert Details</title>
    <link rel="stylesheet" href="_assets/css/vendor.css">
    <link rel="stylesheet" href="_assets/css/app.css">
    <link id="theme" rel="stylesheet" href="/styles/theme.css">
    <script src="i18n/angular-locale_en.js"></script>
    <script src="app.js"></script>
</head>
<body>
<div ui-view="login.content"></div>
<div ui-view="navigation.global">
    <div id="nav-header-wrapper" class="nav-header-wrapper">
        <div growl="" reference="globalSystemNotificationId" inline="true" class="global-system-notification"></div>
        <nav id="global-nav" class="navbar-default navbar-global">
            <div class="container-fluid">
                <div class="navbar-header">...</div>
                <div id="global-navbar-menu" uib-collapse="vm.isCollapsed" class="collapsed navbar-collapse in collapse"
                     aria-expanded="true" aria-hidden="false" style="height: auto;">
                    <ul class="nav navbar-nav navbar-right">
                        <li uib-dropdown="" uib-keyword-nav="" class="dropdown">
                            Personal Navigation
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</div>
<div growl="" class="global-notifications-wrapper">
    <div class="growl-container growl-fixed top-right" ng-class="wrapperClasses()">
</div>
<div id="nav-content-wrapper" class="nav-content-wrapper">
    <div ui-view="navigation.sidebar">
        <div ng-class="{'expanded':vm.isSidebarOpen === true, 'collapsed':vm.isSidebarOpen === false}" class="navbar-primary fade-in hidden-phone">
            GLOBAL NAVIGATION
        </div>
    </div>
    <!-- uiView: main.content -->
    <div id="main-content" ui-view="main.content"
         ng-class="{'expanded':isSidebarOpen === true, 'collapsed':isSidebarOpen === false}"
         class="main-content fade-in scrolling" style="">
        <div class="main-content-wrapper-white">
            <div class="container-fluid main-content-container">
                <div class="row">
                    <div class="col-sm-8">
                        <h2 class="heading-1">PAGE HEADER</h2>
                    </div>
                    <div class="col-sm-4">
                        <div class="btn-group spacer-out-top-base pull-right">
                            PAGE LEVEL ACTIONS
                        </div>
                    </div>
                </div>
            </div>
            <div active="active" class="tabs-flat">
                <ul class="nav nav-tabs" ng-class="{'nav-stacked': vertical, 'nav-justified': justified}"
                    ng-transclude="">
                    <li ng-class="{active: active, disabled: disabled}" index="0"
                        active="states['alert-details.overview']" class="active">
                        PAGE LEVEL TABS
                    </li>
                </ul>
                <div class="tab-content">
                    <div class="tab-pane active" ng-repeat="tab in tabs" ng-class="{active: tab.active}"
                         uib-tab-content-transclude="tab">
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid main-content-container-spaced">
            <!-- uiView: alertViewDetail -->
            <div ui-view="alertViewDetail">
                <div class="row gutter-sm">
                    <div class="col-md-7">
                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="row">
                                    PANEL BODY
                                </div>
                                <div role="group" aria-label="Alert Detail Actions" class="btn-group spacer-out-v-md">
                                    ACTIONS
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="panel panel-default">
                            <div class="panel-heading">
                                <h3 id="alert" translate="" class="panel-title">
                                    <span>Alert Fields</span>
                                </h3>
                                <div class="panel-actions">
                                    <a ui-sref="alert-details.all-fields" translate=""
                                                              class="btn btn-link"
                                                              href=""><span>Show All</span></a>
                                </div>
                            </div>
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <h4 id="source" translate="" class="spacer-out-top-none text-watermark"><span>Source</span>
                                        </h4>
                                        <div class="value-strong-first">
                                            SUPPORTING COLUMN TEXT
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <h4 id="target" translate="" class="spacer-out-top-none text-watermark"><span>Target</span>
                                        </h4>
                                        <div class="value-strong-first">
                                            SUPPORTING COLUMN TEXT
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script src="_assets/js/vendor.js"></script>
</body>
</html>
