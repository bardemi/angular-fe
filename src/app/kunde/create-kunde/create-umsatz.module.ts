import { CommonModule } from '@angular/common'
import { CreateUmsatzComponent } from './create-umsatz.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateUmsatzComponent],
    exports: [CreateUmsatzComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateUmsatzModule {}
