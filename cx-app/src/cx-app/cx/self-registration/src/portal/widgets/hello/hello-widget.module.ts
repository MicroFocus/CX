import { NgModule } from 'ng-metadata/core';

import { HelloViewComponent } from './hello-view.component';
import { HelloConfigComponent } from './hello-config.component';
import { HelloService } from './hello.service';

// Define the Hello Widget, which is made up of the <hello-view> and <hello-config> components.
helloWidgetProvider.$inject = ['dashboardProvider'];
function helloWidgetProvider(dashboard) {
    dashboard.widget('hello-widget', {
        title: 'Hello Widget',
        description: 'Demonstrates the ability to use Angular components in Angular Dashboard Framework',
        template: "<hello-view widget-scope='$parent' />",
        edit: {
            template: "<hello-config widget-scope='$parent' />"
        },
        config: {
            initialMessage: 'This message needs to be changed'
        }
    });
}

// Define the Hello Module, which gets used in the main portal module:
@NgModule({
    imports: [
        'adf.provider'
    ],
    declarations: [
        HelloViewComponent,
        HelloConfigComponent
    ],
    providers: [
        helloWidgetProvider,
        HelloService
    ]
})
export class HelloWidget {
}
