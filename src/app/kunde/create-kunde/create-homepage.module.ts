import { CommonModule } from '@angular/common'
import { CreateHomepageComponent } from './create-homepage.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateHomepageComponent],
    exports: [CreateHomepageComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateHomepageModule {}
