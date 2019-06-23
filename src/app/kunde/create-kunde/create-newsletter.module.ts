import { CommonModule } from '@angular/common'
import { CreateNewsletterComponent } from './create-newsletter.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateNewsletterComponent],
    exports: [CreateNewsletterComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateNewsletterModule {}
