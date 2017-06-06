import { NgModule } from 'ng-metadata/core';

import { SsprStatusViewComponent } from './sspr-status-view.component';
import { SsprStatusConfigComponent } from './sspr-status-config.component';
import { SsprService } from "../../../app/services/sspr.service";
import { SsprServiceImpl } from '../../../app/services/impl/sspr.service.impl';

widgetDefinitionProvider.$inject = ['dashboardProvider'];
function widgetDefinitionProvider(dashboard) {
    dashboard.widget('sspr-status-widget', {
        title: 'SSPR Status Widget',
        description: 'Displays the status of a user in a Self Service Password Reset system',
        template: "<sspr-status-view widget-scope='$parent' />",
        edit: {
            template: "<sspr-status-config widget-scope='$parent' />"
        }
    });
}

// Define the SSPR Status Widget Module, which gets used in the main portal module:
@NgModule({
    imports: [
        'adf.provider'
    ],
    declarations: [
        SsprStatusViewComponent,
        SsprStatusConfigComponent
    ],
    providers: [
        widgetDefinitionProvider
    ]
})
export class SsprStatusWidget {
}
