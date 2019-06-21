import { CommonModule } from '@angular/common'
import { ErrorMessageModule } from '../../../shared/error-message.module'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SuchergebnisComponent } from './suchergebnis.component'
import { WaitingModule } from '../../../shared/waiting.module'

@NgModule({
    declarations: [SuchergebnisComponent],
    exports: [SuchergebnisComponent],
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        ErrorMessageModule,
        WaitingModule,
    ],
})
export class SuchergebnisModule {}
