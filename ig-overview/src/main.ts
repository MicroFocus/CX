import { bootstrap, module } from 'angular';
import routes from './config/routes';
import ApplicationComponent from './components/application/application.component';
import DashboardComponent from './components/dashboard/dashboard.component';


module('app', [
    'ui.router'
])
    .config(routes)
    .component('applicationComponent', ApplicationComponent)
    .component('dashboardComponent', DashboardComponent);

bootstrap(document, ['app', 'ngAnimate', 'ngAria', 'ngMaterial']);
