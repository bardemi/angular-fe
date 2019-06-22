import { CreateFamilienstandComponent } from './create-familienstand.component'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

@NgModule({
    declarations: [CreateFamilienstandComponent],
    exports: [CreateFamilienstandComponent],
    imports: [ReactiveFormsModule],
})
export class CreateFamilienstandModule {}