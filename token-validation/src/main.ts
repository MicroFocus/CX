import { bootstrap, module } from 'angular';
import routes from './config/routes';
import ApplicationComponent from './components/application/application.component';
import GromitService from './services/gromit-service';

module('app', [
    'ui.router'
])
    .config(routes)
    .component('applicationComponent', ApplicationComponent)
    .service('gromitService', GromitService)
    .run((gromitService) => {
        gromitService.init();
    });

bootstrap(document, ['app', 'ngAnimate', 'ngAria', 'ngMaterial']);
