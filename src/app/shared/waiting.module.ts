import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'

import { WaitingComponent } from './waiting.component'

@NgModule({
    declarations: [WaitingComponent],
    exports: [WaitingComponent],
    imports: [FontAwesomeModule],
})
export class WaitingModule {}
