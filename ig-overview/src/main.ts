import { bootstrap, module } from 'angular';
import routes from './config/routes';
import ApplicationComponent from './components/application/application.component';
import DashboardComponent from './components/dashboard/dashboard.component';
import GromitService from './services/gromit-service';

module('app', [
    'ui.router',
    'ng-ias'
])
    .config(routes)
    .component('applicationComponent', ApplicationComponent)
    .component('dashboardComponent', DashboardComponent)
    .service('gromitService', GromitService)
    .run((gromitService) => {
        gromitService.init();
    });

bootstrap(document, ['app', 'ngAnimate', 'ngAria', 'ngMaterial']);
