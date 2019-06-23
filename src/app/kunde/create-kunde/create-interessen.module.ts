import { CommonModule } from '@angular/common'
import { CreateInteressenComponent } from './create-interessen.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateInteressenComponent],
    exports: [CreateInteressenComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateInteressenModule {}
