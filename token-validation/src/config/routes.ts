export default [
    '$stateProvider',
    '$urlRouterProvider',
    (
        $stateProvider: angular.ui.IStateProvider,
        $urlRouterProvider: angular.ui.IUrlRouterProvider
    ) => {
        $urlRouterProvider.otherwise('/');
        $stateProvider.state({ name: 'app', url: '/', component: 'applicationComponent' });
    }
];
