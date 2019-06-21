import { CommonModule } from '@angular/common'
import { ErrorMessageComponent } from './error-message.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'

@NgModule({
    declarations: [ErrorMessageComponent],
    exports: [ErrorMessageComponent],
    imports: [CommonModule, FontAwesomeModule],
})
export class ErrorMessageModule {}
