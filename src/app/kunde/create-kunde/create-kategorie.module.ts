import { CommonModule } from '@angular/common'
import { CreateKategorieComponent } from './create-kategorie.component'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateKategorieComponent],
    exports: [CreateKategorieComponent],
    imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class CreateKategorieModule {}
