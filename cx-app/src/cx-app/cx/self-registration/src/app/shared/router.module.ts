import { Ng1StateDeclaration, StateProvider } from 'angular-ui-router';
import { UrlRouterProvider } from 'angular-ui-router/lib/urlRouterProvider';

export class RouterModule {
    static forRoot( ROUTES: Ng1StateDeclaration[] ) {
        stateConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
        function stateConfig( $stateProvider: StateProvider, $urlRouterProvider: UrlRouterProvider ) {
            // Loop over the state definitions and register them
            ROUTES.forEach( function( state ) {
                $stateProvider.state( state );
            } );

            // Set page1 as the default to use if no route was specified
            $urlRouterProvider.otherwise('page1');
        }

        return stateConfig
    }
}
