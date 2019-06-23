import { CommonModule } from '@angular/common'
import { CreateAdresseComponent } from './create-adresse.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateAdresseComponent],
    exports: [CreateAdresseComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateAdresseModule {}
