import { CreateGeschlechtComponent } from './create-geschlecht.component'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateGeschlechtComponent],
    exports: [CreateGeschlechtComponent],
    imports: [ReactiveFormsModule],
})
export class CreateGeschlechtModule {}
