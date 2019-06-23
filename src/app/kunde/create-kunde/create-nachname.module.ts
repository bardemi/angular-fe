import { CommonModule } from '@angular/common'
import { CreateNachnameComponent } from './create-nachname.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateNachnameComponent],
    exports: [CreateNachnameComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateNachnameModule {}
