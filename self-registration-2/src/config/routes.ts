export default [
    '$stateProvider',
    '$urlRouterProvider',
    (
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider
    ) => {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state({ name: 'app', abstract: true, component: 'applicationComponent' });
        $stateProvider.state({ name: 'app.registration', url: '/', component: 'registrationComponent' });
        $stateProvider.state({ name: 'app.registration-success', url: '/', component: 'registrationSuccessComponent' });
    }
];
