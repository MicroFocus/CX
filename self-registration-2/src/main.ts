import { bootstrap, module } from 'angular';
import routes from './config/routes';
import ApplicationComponent from './components/application/application.component';
import DashboardComponent from './components/dashboard/dashboard.component';
import RegistrationComponent from './components/registration/registration.component';

module('app', [
    'ui.router'
])
    .config(routes)
    .component('applicationComponent', ApplicationComponent)
    .component('dashboardComponent', DashboardComponent)
    .component('registrationComponent', RegistrationComponent);

bootstrap(document, ['app', 'ngAnimate', 'ngAria']);
